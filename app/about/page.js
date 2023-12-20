import React from "react";
import "./about.css";

const AboutPage = () => {
  return (
    <div className="about-page">
      <h1>About Our Site</h1>
      <p>
        Welcome to our GIF sharing platform! We are dedicated to providing you
        with an engaging experience where you can discover, save, and share your
        favorite GIFs.
      </p>
      <h2>Features</h2>
      <ul>
        <li>Search for GIFs using the Giphy API</li>
        <li>Explore trending GIFs from various categories</li>
        <li>Sign in using Firebase authentication, powered by Google</li>
      </ul>
      <h2>Our Mission</h2>
      <p>
        Our mission is to create a user-friendly platform that brings joy and
        laughter to people through the world of GIFs. We believe in providing an
        easy-to-use interface for seamless GIF discovery and sharing.
      </p>
      <h2>Contact Us</h2>
      <p>
        Have questions or feedback? Feel free to reach out to us at
        <a href="https://www.linkedin.com/in/adityapandey9165/">Linkedin.</a>
      </p>
    </div>
  );
};

export default AboutPage;
