import { hash } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import User from "@/lib/models/user";

export async function POST(req) {
  try {
    const { name, email, password, role } = await req.json();

    // Connect to MongoDB
    await connectToDatabase();

    // Hash Password
    const hashedPassword = await hash(password, 10);

    // Create a New User
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    return Response.json(
      { message: "User created successfully!" },
      { status: 201 }
    );
  } catch (error) {
    return Response.json(
      { message: "Error creating user", error },
      { status: 500 }
    );
  }
}
