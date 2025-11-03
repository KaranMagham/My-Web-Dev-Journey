import clientPromise from "@/app/lib/mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const client = await clientPromise;
    const db = client.db("wealthflow");

    const userEmail = session.user.email;
    const settings = await db.collection("settings").findOne({ email: userEmail });

    if (!settings) {
      return Response.json({ success: true, data: {} }); // Empty if first time
    }

    return Response.json({ success: true, data: settings });
  } catch (error) {
    console.error("GET /api/settings error:", error);
    return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req) {
  const session = await getServerSession(authOptions);
  if (!session) {
    return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const client = await clientPromise;
    const db = client.db("wealthflow");

    const userEmail = session.user.email;

    const updated = await db.collection("settings").findOneAndUpdate(
      { email: userEmail },
      {
        $set: {
          email: userEmail,
          ...body,
          updatedAt: new Date(),
        },
        $setOnInsert: { createdAt: new Date() },
      },
      { upsert: true, returnDocument: "after" }
    );

    return Response.json({ success: true, data: updated.value });
  } catch (error) {
    console.error("POST /api/settings error:", error);
    return Response.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
