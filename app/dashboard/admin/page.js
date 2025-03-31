"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    organizer: "",
    registrationLink: "",
    eventType: "Technical",
    department: "CSE",
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    const res = await fetch("/api/events/get");
    const data = await res.json();
    setEvents(data.events);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData(event);
  };

  const handleSubmit = async () => {
    const method = selectedEvent ? "PUT" : "POST";
    const url = selectedEvent ? "/api/events/edit" : "/api/events/add";

    // No need for token authorization anymore
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData, eventId: selectedEvent?._id }),
    });

    if (response.ok) {
      alert(selectedEvent ? "Event updated!" : "Event added!");
      setSelectedEvent(null);
      setFormData({
        title: "",
        description: "",
        location: "",
        date: "",
        time: "",
        organizer: "",
        registrationLink: "",
        eventType: "Technical",
        department: "CSE",
      });
      fetchEvents();
    } else {
      const errorData = await response.json();
      alert(errorData.message || "Something went wrong.");
    }
  };

  const handleDelete = async (eventId) => {
    if (confirm("Are you sure you want to delete this event?")) {
      await fetch("/api/events/delete", {
        method: "DELETE",
        body: JSON.stringify({ eventId }),
      });
      fetchEvents();
    }
  };

  const handleComplete = async (eventId) => {
    await fetch("/api/events/complete", {
      method: "PUT",
      body: JSON.stringify({ eventId }),
    });
    fetchEvents();
  };

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
      <input
        name="title"
        placeholder="Title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <input
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleInputChange}
      />
      <input
        name="date"
        type="date"
        value={formData.date}
        onChange={handleInputChange}
      />
      <input
        name="time"
        type="time"
        value={formData.time}
        onChange={handleInputChange}
      />
      <input
        name="organizer"
        placeholder="Organizer"
        value={formData.organizer}
        onChange={handleInputChange}
      />
      <input
        name="registrationLink"
        placeholder="Registration Link"
        value={formData.registrationLink}
        onChange={handleInputChange}
      />
      <select
        name="eventType"
        value={formData.eventType}
        onChange={handleInputChange}
      >
        <option>Technical</option>
        <option>Non-Technical</option>
        <option>Symposium</option>
        <option>Guest Lecture</option>
      </select>
      <select
        name="department"
        value={formData.department}
        onChange={handleInputChange}
      >
        <option>CSE</option>
        <option>IT</option>
        <option>CSBS</option>
        <option>AIDS</option>
        <option>AIML</option>
        <option>ECE</option>
        <option>EEE</option>
        <option>MECH</option>
      </select>
      <button onClick={handleSubmit}>
        {selectedEvent ? "Update Event" : "Add Event"}
      </button>

      <h2>Existing Events</h2>
      {events.map((event) => (
        <div key={event._id} className="event-card">
          <h3>{event.title}</h3>
          <p>{event.description}</p>
          <button onClick={() => handleEdit(event)}>Edit</button>
          <button onClick={() => handleDelete(event._id)}>Delete</button>
          <button onClick={() => handleComplete(event._id)}>
            Mark as Completed
          </button>
        </div>
      ))}
    </div>
  );
}
