// pages/api/markAsFavorite.js

import { markAsFavorite } from "../../backend/mongoDB";

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const { userId, gifId, gifUrl } = req.body;
      const marked = await markAsFavorite(userId, gifId, gifUrl);
      if (marked) {
        res.status(200).json({ message: "Marked as favorite" });
      } else {
        res.status(500).json({ message: "Error marking as favorite" });
      }
    } catch (error) {
      console.error("Error marking as favorite:", error);
      res.status(500).json({ message: "Error marking as favorite" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
