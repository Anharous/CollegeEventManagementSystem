import jwt from "jsonwebtoken";

export function verifyToken(req) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1]; // Get token from headers
    if (!token) return null;

    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    return null;
  }
}
