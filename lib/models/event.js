import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  organizer: { type: String, required: true },
  registrationLink: { type: String },
  eventType: {
    type: String,
    enum: ["Technical", "Non-Technical", "Symposium", "Guest Lecture"],
    required: true,
  },
  department: {
    type: String,
    enum: ["CSE", "IT", "CSBS", "AIDS", "AIML", "ECE", "EEE", "MECH"],
    required: true,
  },
  imageUrl: { type: String, required: true, default: "/default-event.png" },
  completed: { type: Boolean, default: false },
});

const Event = mongoose.models.Event || mongoose.model("Event", EventSchema);

export default Event;
