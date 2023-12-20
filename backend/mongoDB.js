// backend/mongoDB
const { MongoClient } = require("mongodb");

// Connection URI for your MongoDB database
const uri =
  "mongodb+srv://adityapandey9165:EfUCFS97V7rFKT3T@cluster0.k0yjvd3.mongodb.net/";

// Create a new MongoClient instance
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connect to the MongoDB cluster
async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

// Connect to MongoDB when your application starts
connectToMongoDB();

// Define the collection for storing favorite GIFs
const favoriteGifsCollection = "favoriteGifs"; // Replace with your collection name

// Function to mark a GIF as favorite in MongoDB
const markAsFavorite = async (userId, gifId, gifUrl) => {
  try {
    const database = client.db("adityapandey9165");
    const collection = database.collection(favoriteGifsCollection);
    await collection.insertOne({ userId, gifId, gifUrl });
    console.log("Marked as favorite:", gifId);
  } catch (error) {
    console.error("Error marking as favorite:", error);
  }
};

// Function to retrieve a user's favorite GIFs from MongoDB
const getFavorites = async (userId) => {
  try {
    const database = client.db("adityapandey9165");
    const collection = database.collection(favoriteGifsCollection);
    const favorites = await collection.find({ userId }).toArray();
    return favorites.map((favorite) => favorite.gifUrl);
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return [];
  }
};

module.exports = { markAsFavorite, getFavorites };
