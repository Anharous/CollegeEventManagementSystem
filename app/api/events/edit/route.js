import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/lib/models/event";

export async function PUT(req) {
  try {
    const {
      eventId,
      title,
      description,
      location,
      date,
      time,
      organizer,
      registrationLink,
      eventType,
      department,
      imageUrl,
    } = await req.json();
    await connectToDatabase();

    const updatedEvent = await Event.findByIdAndUpdate(
      eventId,
      {
        title,
        description,
        location,
        date,
        time,
        organizer,
        registrationLink,
        eventType,
        department,
        imageUrl,
      },
      { new: true }
    );

    return NextResponse.json(
      { success: true, event: updatedEvent },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating event:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
