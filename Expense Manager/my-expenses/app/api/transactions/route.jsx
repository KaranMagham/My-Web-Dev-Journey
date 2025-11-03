import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../auth/[...nextauth]/route";

// helper to convert _id to string
const serialize = (doc) => {
  const { _id, ...rest } = doc;
  return { _id: _id?.toString?.() ?? _id, ...rest };
};

// GET → fetch only transactions for the signed-in user
export async function GET(request) {
  try {
    const session = await getServerSession(authOptions);
    // TEMP debug: remove after you confirm session presence
    console.log("transactions GET session:", session?.user?.email);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }

    const userEmail = session.user.email;
    const client = await clientPromise;
    const db = client.db("wealthflow");
    const collection = db.collection("transactions");

    const transactions = await collection.find({ userEmail }).sort({ date: -1 }).toArray();
    const data = transactions.map(serialize);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Transactions fetched successfully",
        data,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to fetch transactions",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

// POST → insert or update transaction (only for the signed-in user)
export async function POST(request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new Response(JSON.stringify({ success: false, error: "Unauthorized" }), {
        status: 401,
        headers: { "Content-Type": "application/json" },
      });
    }
    const userEmail = session.user.email;

    const body = await request.json();

    // Validation
    if (!body.amount || !body.type || !body.date) {
      return new Response(
        JSON.stringify({
          success: false,
          error: "Missing required fields (amount, type, date)",
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const client = await clientPromise;
    const db = client.db("wealthflow");
    const collection = db.collection("transactions");

    // Update transaction if _id exists
    if (body._id) {
      const { _id, ...updateFields } = body;
      const id = new ObjectId(_id);
      const existing = await collection.findOne({ _id: id });

      if (!existing) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Transaction not found",
          }),
          {
            status: 404,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      // ensure the transaction belongs to the current user
      if (existing.userEmail !== userEmail) {
        return new Response(
          JSON.stringify({
            success: false,
            error: "Forbidden - cannot modify another user's transaction",
          }),
          {
            status: 403,
            headers: { "Content-Type": "application/json" },
          }
        );
      }

      const result = await collection.updateOne({ _id: id }, { $set: updateFields });

      // fetch the updated document
      const updatedDoc = await collection.findOne({ _id: id });

      return new Response(
        JSON.stringify({
          success: true,
          message: "Transaction updated successfully",
          data: serialize(updatedDoc),
        }),
        {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Insert new transaction (attach userEmail)
    const newDoc = {
      ...body,
      userEmail,
      createdAt: new Date(),
    };

    const result = await collection.insertOne(newDoc);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Transaction added successfully",
        data: { ...serialize(newDoc), _id: result.insertedId.toString() },
      }),
      {
        status: 201,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Error adding/updating transaction:", err);
    return new Response(
      JSON.stringify({
        success: false,
        error: err.message || "Internal server error",
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
