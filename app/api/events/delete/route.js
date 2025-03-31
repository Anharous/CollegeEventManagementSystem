import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/lib/models/event";

export async function DELETE(req) {
  try {
    const { eventId } = await req.json();
    await connectToDatabase();

    await Event.findByIdAndDelete(eventId);

    return NextResponse.json(
      { success: true, message: "Event deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting event:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
