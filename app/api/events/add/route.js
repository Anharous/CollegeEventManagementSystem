import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Event from "@/lib/models/event";

export async function POST(req) {
  try {
    console.log("🔹 Incoming request to add event...");

    // ✅ Parse request body
    const body = await req.json();
    console.log("📌 Received event data:", body);

    const {
      title,
      description,
      location,
      date,
      time,
      organizer,
      registrationLink,
      eventType,
      department,
    } = body;

    // ✅ Validate required fields
    if (
      !title ||
      !description ||
      !location ||
      !date ||
      !time ||
      !organizer ||
      !eventType ||
      !department
    ) {
      console.log("❌ Missing required fields.");
      return NextResponse.json(
        { message: "All fields are required!" },
        { status: 400 }
      );
    }

    // ✅ Connect to the database
    await connectToDatabase();
    console.log("✅ Database connected.");

    // ✅ Create and save the new event
    const newEvent = new Event({
      title,
      description,
      location,
      date,
      time,
      organizer,
      registrationLink,
      eventType,
      department,
      completed: false,
    });

    await newEvent.save();
    console.log("✅ Event successfully added!");

    return NextResponse.json(
      { message: "Event added successfully!" },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Error adding event:", error);
    return NextResponse.json(
      { message: "Server error! Please try again later." },
      { status: 500 }
    );
  }
}
