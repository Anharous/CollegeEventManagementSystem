import clientPromise from "../../lib/mongodb";

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db("college-events");

    if (req.method === "GET") {
      const events = await db.collection("events").find({}).toArray();
      res.status(200).json(events);
    } else if (req.method === "POST") {
      const { name, date, location, participants } = req.body;
      const newEvent = { name, date, location, participants };

      await db.collection("events").insertOne(newEvent);
      res.status(201).json({ message: "Event added successfully!" });
    } else {
      res.status(405).json({ message: "Method Not Allowed" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
}
