"use client";
// favorites page// profile/page.js

import React, { useState, useEffect } from "react";
import { UserAuth } from "../context/AuthContext";
import Spinner from "../nav/spinner";
import "./fav.css";

const Profile = () => {
  const { user } = UserAuth();
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [isFavorited, setIsFavorited] = useState(false); // New state to track if the GIF is favorited

  useEffect(() => {
    const fetchFavoritesFromBackend = async () => {
      try {
        // Your existing code to fetch favorites from the backend...
      } catch (error) {
        console.error("Error fetching favorites:", error);
        setLoading(false);
      }
    };

    if (user) {
      fetchFavoritesFromBackend();
    }
  }, [user]);

  const handleFavoriteClick = async (gifUrl) => {
    try {
      // Assuming gifId is obtained somehow; for example, from the GIF object
      const gifId = generateGifId(gifUrl); // You may have your own logic to generate a unique ID for the GIF

      // Call the markAsFavorite function to mark the GIF as a favorite
      await markAsFavorite(user.uid, gifId, gifUrl);

      // Update the state to toggle the 'isFavorited' value
      setIsFavorited((prevState) => !prevState);
    } catch (error) {
      console.error("Error marking as favorite:", error);
    }
  };

  return (
    <div className="p-4">
      {loading ? (
        <Spinner />
      ) : user ? (
        <>
          <p>
            Welcome, {user.displayName} - you are logged in to the profile page
            - a protected route.
          </p>
          <h2>Your Favorites</h2>
          {favorites.length > 0 ? (
            <div className="favorites-container">
              {favorites.map((gifUrl) => (
                <div key={gifUrl} className="favorite-item">
                  <img src={gifUrl} alt="GIF" />
                  {/* Button to mark the GIF as a favorite */}
                  <button onClick={() => handleFavoriteClick(gifUrl)}>
                    {isFavorited ? (
                      <img
                        src="path_to_green_tick_icon.png"
                        alt="Green Tick"
                        className="green-tick-icon"
                      />
                    ) : (
                      "Favorite"
                    )}
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>No favorites found!</p>
          )}
        </>
      ) : (
        <p>You must be logged in to view this page - protected route.</p>
      )}
    </div>
  );
};

export default Profile;
