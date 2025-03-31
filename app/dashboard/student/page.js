"use client";
import { useState, useEffect } from "react";
import "./student.css"

export default function StudentDashboard() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch("/api/events/get")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  return (
    <div>
      <h1>Available Events</h1>
      {events.length === 0 ? <p>No events available</p> : null}
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <p>
            <strong>Date:</strong> {event.date} | <strong>Time:</strong>{" "}
            {event.time}
          </p>
          <p>
            <strong>Location:</strong> {event.location}
          </p>
          <p>
            <strong>Organizer:</strong> {event.organizer}
          </p>
          <p>
            <strong>Event Type:</strong> {event.eventType}
          </p>
          <p>
            <strong>Department:</strong> {event.department}
          </p>
          {event.registrationLink && (
            <a
              href={event.registrationLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button>Register Here</button>
            </a>
          )}
        </div>
      ))}
    </div>
  );
}
