// app.js

const express = require("express");
const client = require("./db");
const app = express();

// Handle CORS if necessary

app.post("/markAsFavorite", async (req, res) => {
  try {
    const { userId, gifId, gifUrl } = req.body; // Get data from request body
    const database = client.db("adityapandey9165");
    const collection = database.collection("favoriteGifs");
    await collection.insertOne({ userId, gifId, gifUrl });
    console.log("Marked as favorite:", gifId);
    res.status(200).send("Marked as favorite");
  } catch (error) {
    console.error("Error marking as favorite:", error);
    res.status(500).send("Error marking as favorite");
  }
});

app.get("/getFavorites/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const database = client.db("adityapandey9165");
    const collection = database.collection("favoriteGifs");
    const favorites = await collection.find({ userId }).toArray();
    res.status(200).json(favorites);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    res.status(500).send("Error fetching favorites");
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
