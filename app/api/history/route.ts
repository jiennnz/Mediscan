import { dbConnect } from "@/lib/server/dbConnect";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import { getSession } from "@/lib/server/auth";

export async function GET(request: NextRequest) {
  await dbConnect();
  const session = await getSession(); // Assuming getSession takes a request object
  const userId = session?.sessionData?.id ?? null;

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized access" }, { status: 401 });
  }

  try {
    // Retrieve pagination details from URL search parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") ?? "1");
    const limit = parseInt(url.searchParams.get("limit") ?? "7");

    // Connecting directly to MongoDB collection
    const db = mongoose.connection.db;
    const collection = db.collection("diagnoses");

    // Fetch additional items for pagination
    const items = await collection
      .find({ userId: new mongoose.Types.ObjectId(userId) }) // Filtering by userId
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray();

    const totalItems = await collection.countDocuments({
      userId: new mongoose.Types.ObjectId(userId),
    });
    const totalPages = Math.ceil(totalItems / limit);

    return NextResponse.json({ items, totalItems, totalPages });
  } catch (error) {
    console.error("Server error while fetching data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
