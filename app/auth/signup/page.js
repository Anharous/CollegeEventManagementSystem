"use client";

import { useState } from "react";
import Link from "next/link";
import "./signup.css"

export default function SignupPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "student",
  });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify(form),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    setMessage(data.message);
  };

  return (
    <div className="signup">
      <div className="signupleft">
        <h1 className="welcome">Welcome </h1>
        <h1>PEC Event Management System </h1>
        <p className="signcontent">
          An platform for managing and discovering college events effortlessly.
        </p>
        <p>Please sign in to continue</p>
        <p className="loginlink">
          Already have an account?{" "}
          <Link href="/auth/login">
            {" "}
            <b>Login here</b>
          </Link>
        </p>
      </div>
      <div className="signupContainer">
        <h1 className="head">Sign Up</h1>
        <form onSubmit={handleSubmit} className="form">
          <label >Name</label>
          <input
            type="text"
            placeholder="Your name.."
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="inputbox"
            required
          />
          <label >Email</label>
          <input
            type="email"
            placeholder="Your Email.."
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="inputbox"
            required
          />
          <label >Password</label>
          <input
            type="password"
            placeholder="Your Password.."
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            className="inputbox"
            required
          />
          <label >Are you??</label>
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="select"
          >
            <option value="student">Student</option>
            <option value="admin">Admin</option>
          </select>
          <button type="submit" className="signupbutton">
            Sign Up
          </button>
        </form>
        {message && <p className="mt-3">{message}</p>}
      </div>
    </div>
  );
}
