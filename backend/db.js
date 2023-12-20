// backend/db.js
const { MongoClient } = require("./node_modules/mongodb");
require("dotenv").config();

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

async function markAsFavorite(userId, gifId, gifUrl) {
  try {
    const database = client.db("adityapandey9165");
    const collection = database.collection("favoriteGifs");
    await collection.insertOne({ userId, gifId, gifUrl });
    console.log("Marked as favorite:", gifId);
  } catch (error) {
    console.error("Error marking as favorite:", error);
  }
}

async function getFavorites(userId) {
  try {
    const database = client.db("adityapandey9165");
    const collection = database.collection("favoriteGifs");
    const favorites = await collection.find({ userId }).toArray();
    return favorites.map((favorite) => favorite.gifUrl);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
}

module.exports = { connectToMongoDB, markAsFavorite, getFavorites };
