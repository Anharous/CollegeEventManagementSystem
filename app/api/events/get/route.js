import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/lib/models/event";

export async function GET() {
  try {
    await connectToDatabase();
    const events = await Event.find({});
    return NextResponse.json({ events }, { status: 200 });
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
