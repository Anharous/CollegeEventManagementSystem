import { compare } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/user";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    const { email, password } = await req.json();
    await connectToDatabase();

    const user = await User.findOne({ email });

    console.log("User found in DB:", user); // ✅ Log user details in the terminal

    if (!user) {
      console.log("❌ User not found!");
      return new Response(JSON.stringify({ message: "User not found" }), {
        status: 401,
      });
    }

    const isPasswordValid = await compare(password, user.password);

    console.log("Password comparison result:", isPasswordValid); // ✅ Log password check result

    if (!isPasswordValid) {
      console.log("❌ Invalid password!");
      return new Response(JSON.stringify({ message: "Invalid credentials" }), {
        status: 401,
      });
    }
    // ✅ Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log("✅ Login successful!");
    return new Response(JSON.stringify({ message: "Login successful", user }), {
      status: 200,
    });
  } catch (error) {
    console.error("Server error:", error.message);
    return new Response(
      JSON.stringify({ message: "Server error", error: error.message }),
      { status: 500 }
    );
  }
}
