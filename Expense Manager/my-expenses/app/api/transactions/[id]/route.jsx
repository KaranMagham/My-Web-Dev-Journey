import clientPromise from "@/app/lib/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";


// PUT → update transaction by id
export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    const body = await request.json();

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: "Transaction ID is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Validation
    if (!body.amount || !body.type || !body.date) {
      return NextResponse.json({ success: false, error: "..." }, { status: 400 });
    }

    const client = await clientPromise;
    const db = client.db("wealthflow");
    const collection = db.collection("transactions");

    const objectId = new ObjectId(id);
    const result = await collection.findOneAndUpdate(
      { _id: objectId },
      { $set: body },
      { returnDocument: "after" } // returns updated doc
    );


    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: "Transaction not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Fetch the updated document
    const updatedDoc = await collection.findOne({ _id: objectId });

    return new Response(JSON.stringify({
      success: true,
      message: "Transaction updated successfully",
      data: updatedDoc
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error updating transaction:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

// DELETE → remove transaction by id
export async function DELETE(request, { params }) {
  try {
    const { id } = await params;

    if (!id) {
      return new Response(JSON.stringify({
        success: false,
        error: "Transaction ID is required"
      }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const client = await clientPromise;
    const db = client.db("wealthflow");
    const collection = db.collection("transactions");

    const result = await collection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return new Response(JSON.stringify({
        success: false,
        error: "Transaction not found"
      }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({
      success: true,
      message: "Transaction deleted successfully"
    }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Error deleting transaction:", err);
    return new Response(JSON.stringify({
      success: false,
      error: err.message
    }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
