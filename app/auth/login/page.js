"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import "./login.css";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    console.log("Login Response:", data); // Debugging

    if (res.ok && data.user) {
      alert("Login Successful!");

      // Redirect based on user role
      if (data.user.role === "admin") {
        router.push("/dashboard/admin");
      } else {
        router.push("/dashboard/student");
      }
    } else {
      alert(data.message || "Invalid credentials");
    }
  };



  return (
    <div className="logincontainer">
      <h1 className="head">Login</h1>
      <label>Email</label>
      <input
        type="email"
        placeholder="Email"
        className="mt-4 p-2 border rounded"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label>Password</label>
      <input
        type="password"
        placeholder="Password"
        className="mt-4 p-2 border rounded"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded"
        onClick={handleLogin}
      >
        Login
      </button>
    </div>
  );
}
