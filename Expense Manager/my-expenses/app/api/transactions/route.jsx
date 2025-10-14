import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";

// GET → fetch all saved transactions
export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db("wealthflow");
    const collection = db.collection("transactions");
    const transactions = await collection.find({}).sort({ date: -1 }).toArray();

    return new Response(JSON.stringify({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return new Response(JSON.stringify({
      success: false,
      error: "Failed to fetch transactions"
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// POST → insert or update transaction
export async function POST(request) {
  try {
    const body = await request.json();

    // Validation
    if (!body.amount || !body.type || !body.date) {
      return new Response(JSON.stringify({
        success: false,
        error: "Missing required fields (amount, type, date)"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("wealthflow");
    const collection = db.collection("transactions");

    // Update transaction if _id exists
    if (body._id) {
      const { _id, ...updateFields } = body;
      const id = new ObjectId(_id);
      const result = await collection.updateOne({ _id: id }, { $set: updateFields });

      if (result.matchedCount === 0) {
        return new Response(JSON.stringify({
          success: false,
          error: "Transaction not found"
        }), {
          status: 404,
          headers: { "Content-Type": "application/json" },
        });
      }

      // Optionally, fetch the updated document
      const updatedDoc = await collection.findOne({ _id: id });

      return new Response(JSON.stringify({
        success: true,
        message: "Transaction updated successfully",
        data: updatedDoc
      }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Insert new transaction
    const result = await collection.insertOne(body);

    return new Response(JSON.stringify({
      success: true,
      message: "Transaction added successfully",
      data: { ...body, _id: result.insertedId }
    }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error adding/updating transaction:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
