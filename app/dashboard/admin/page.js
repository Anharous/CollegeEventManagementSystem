"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import "./admin.css"

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
    imageUrl: "",
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
        imageUrl: "",
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
    <div className="adminContainer">
      <img src="/adminbg.png" alt="AdminBackground" className="adminbg" />
      <h1>Admin Dashboard</h1>
      <div className="addEventContainer">
        <h2>{selectedEvent ? "Edit Event" : "Add Event"}</h2>
        <div className="addDetails">
          <div>
            <label>Title</label>
            <input
              name="title"
              placeholder="Title"
              value={formData.title}
              onChange={handleInputChange}
            />
            <label>Description</label>
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              id="decp"
            />
            <br />
            <label>Location</label>
            <input
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleInputChange}
            />
            <label>Date</label>
            <input
              name="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
            />
            <label>Time</label>
            <input
              name="time"
              type="time"
              value={formData.time}
              onChange={handleInputChange}
            />
          </div>
          <div className="addRight">
            <label>Organizer</label>
            <input
              name="organizer"
              placeholder="Organizer"
              value={formData.organizer}
              onChange={handleInputChange}
            />
            <label>Registration Link</label>
            <input
              name="registrationLink"
              placeholder="Registration Link"
              value={formData.registrationLink}
              onChange={handleInputChange}
            />
            <label>Event Poster</label>
            <input
              name="imageUrl"
              placeholder="Event Image URL"
              value={formData.imageUrl}
              onChange={handleInputChange}
            />
            <label>Event Type</label>
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
            <label>Department</label>
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
          </div>
        </div>
        <button onClick={handleSubmit} className="addButton">
          {selectedEvent ? "Update Event" : "Add Event"}
        </button>
      </div>
      <div className="line"></div>
      <h2 className="edithead">Existing Events</h2>
      <div className="editEventContainer">
        {events.map((event) => (
          <div key={event._id} className="event-card">
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <button onClick={() => handleEdit(event)}>Edit</button>
            <button onClick={() => handleDelete(event._id)} className="deletebtn">Delete </button>
            <button onClick={() => handleComplete(event._id)}>
              Mark as Completed
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
