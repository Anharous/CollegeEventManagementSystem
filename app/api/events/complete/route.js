import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/lib/models/event";

export async function PUT(req) {
  try {
    const { eventId } = await req.json();
    await connectToDatabase();

    const completedEvent = await Event.findByIdAndUpdate(
      eventId,
      { completed: true },
      { new: true }
    );

    return NextResponse.json(
      { success: true, event: completedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error marking event as completed:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
