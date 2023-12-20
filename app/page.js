// page.js
"use client";
import { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";

import {
  searchGiphy,
  markAsFavorite,
  getTrendingGifs,
} from "../pages/api/giphySearch";
import { UserAuth } from "./context/AuthContext";
import "./styles/styles.css"; // Import your CSS file
import "./styles/trending.css";

const Page = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const [offset, setOffset] = useState(0);

  const [trendingGifs, setTrendingGifs] = useState([]); // State to store trending GIFs
  const { checkLoggedIn } = UserAuth();
  const isLoggedIn = checkLoggedIn();

  const performSearch = async (query, offset = 0, limit = 10) => {
    try {
      setLoading(true);
      const gifs = await searchGiphy(query, offset, limit);
      setSearchResults(gifs);
    } catch (error) {
      console.error("Error searching GIFs:", error);
      setSearchResults([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Fetch trending GIFs when the page loads
    const fetchTrending = async () => {
      try {
        const trending = await getTrendingGifs(100); // Fetch trending GIFs
        setTrendingGifs(trending);
      } catch (error) {
        console.error("Error fetching trending GIFs:", error);
      }
    };

    fetchTrending();
  }, []); // Fetch only on initial page load

  const handleLoadMoreTrending = async () => {
    setLoadingMore(true);
    try {
      const moreTrending = await getMoreTrendingGifs(10, offset + 10);
      setTrendingGifs((prevGifs) => [...prevGifs, ...moreTrending]);
      setOffset(offset + 10);
    } catch (error) {
      console.error("Error fetching more trending GIFs:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      performSearch(searchQuery);
    }
  }, [searchQuery]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleLoadMore = () => {
    const currentOffset = searchResults.length;
    performSearch(searchQuery, currentOffset);
  };

  const handleFavorite = async (gifId) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      try {
        const userId = user.uid;
        console.log(userId);
        await markAsFavorite(userId, gifId);
        // Update state or perform actions after marking as favorite
      } catch (error) {
        console.error("Error marking as favorite:", error);
      }
    } else {
      console.error("User not logged in");
    }
  };

  return (
    <div className="main-container">
      <div>{isLoggedIn ? <p>You are logged in!</p> : <p>Not logged in</p>}</div>
      <input
        type="text"
        placeholder="Search GIFs"
        value={searchQuery}
        className="search-input"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <div className="gif-container">
        {loading ? (
          <p>Loading...</p>
        ) : (
          searchResults.map((gif) => (
            <div key={gif.id} className="gif-item">
              <img src={gif.images.original.url} alt={gif.title} />
              <button onClick={() => handleFavorite(gif.id)}>Fav</button>
            </div>
          ))
        )}
      </div>
      <button onClick={handleLoadMore} className="load-more-btn">
        Load More
      </button>
      {/* Trending */}
      <div className="trending-gifs">
        <h2>Trending GIFs</h2>
        <div className="gif-container">
          {trendingGifs.map((gif) => (
            <div key={gif.id} className="gif-item">
              <img src={gif.images.original.url} alt={gif.title} />
              <button onClick={() => handleFavorite(gif.id)}>Fav</button>
            </div>
          ))}
        </div>
        <button
          className="load-more-trending-btn"
          onClick={handleLoadMoreTrending}
        >
          {loadingMore ? "Loading..." : "Load More"}
        </button>
      </div>
    </div>
  );
};

export default Page;
