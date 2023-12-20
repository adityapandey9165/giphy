// pages/api/giphySearch.js

const apiKey = "GlVGYHkr3WSBnllca54iNt0yFbjz7L65"; // GIPHY API key

const getTrendingGifs = async (limit = 10) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/trending?api_key=${apiKey}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching trending GIFs:", error);
    return [];
  }
};

const searchGiphy = async (query, offset = 0, limit = 10) => {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${query}&offset=${offset}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok.");
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching GIFs:", error);
    return [];
  }
};

const markAsFavorite = async (userId, gifId, gifUrl) => {
  // try {
  //   const { markAsFavorite } = require("../../../backend/mongoDB");
  //   await markAsFavorite(userId, gifId, gifUrl);
  //   // You can also update state or perform other actions after marking as favorite
  // } catch (error) {
  //   console.error("Error marking as favorite:", error);
  // }
};

export { searchGiphy, markAsFavorite, getTrendingGifs };
