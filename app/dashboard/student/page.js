"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "./student.css";


export default function StudentDashboard() {
  const [events, setEvents] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDepartment, setSelectedDepartment] =
    useState("All Departments");
  const [selectedEventType, setSelectedEventType] = useState("");

  useEffect(() => {
    fetch("/api/events/get")
      .then((res) => res.json())
      .then((data) => setEvents(data.events));
  }, []);

  const filteredEvents = events.filter((event) => {
    return (
      event.title?.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedDepartment === "All Departments" ||
        event.department === selectedDepartment) &&
      (selectedEventType === "" || event.eventType === selectedEventType)
    );
  });

  return (
    <div className="studentContainer">
      <img src="/stdbg.png" alt="studentBackground" className="stdbg" />
      <div className="SearchContainer">
        {/* Department Filter */}
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
        >
          <option>All Departments</option>
          <option>CSE</option>
          <option>IT</option>
          <option>CSBS</option>
          <option>AIDS</option>
          <option>AIML</option>
          <option>ECE</option>
          <option>EEE</option>
          <option>MECH</option>
        </select>

        {/* Search Bar */}
        <input
          type="text"
          placeholder="Search events..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Event Type Filters */}
      <div className="eventButtons">
        <button onClick={() => setSelectedEventType("")}>All Events</button>
        <button onClick={() => setSelectedEventType("Technical")}>
          Technical Events
        </button>
        <button onClick={() => setSelectedEventType("Non-Technical")}>
          Non-Technical Events
        </button>
        <button onClick={() => setSelectedEventType("Symposium")}>
          Symposiums
        </button>
        <button onClick={() => setSelectedEventType("Guest Lecture")}>
          Guest Lectures
        </button>
      </div>
      <div className="eventContainer">
        {filteredEvents.length === 0 ? <p>No events available</p> : null}
        {filteredEvents.map((event) => (
          <div key={event._id} className="event-card">
            <img
              src={event.imageUrl}
              alt={event.title}
              className="event-image"
            />

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
    </div>
  );
}
