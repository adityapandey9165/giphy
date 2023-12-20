"use client";
// NAVBAR
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { UserAuth } from "../context/AuthContext";
import "../styles/styles.css"; // Import your CSS file
const Navbar = () => {
  const { user, googleSignIn, logOut } = UserAuth();
  const [loading, setLoading] = useState(true);

  const handleSignIn = async () => {
    try {
      await googleSignIn(); // This function should trigger a redirect, not a pop-up
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const checkAuthentication = async () => {
      await new Promise((resolve) => setTimeout(resolve, 50));
      setLoading(false);
    };
    checkAuthentication();
  }, [user]);

  return (
    <div className="nav">
      <ul>
        <li>
          <Link className="nav-item" href="/">
            <>Home</>
          </Link>
        </li>
        <li>
          <Link className="nav-item" href="/about">
            About
          </Link>
        </li>

        {!user ? null : (
          <li>
            <Link className="nav-item" href="/profile">
              favorites
            </Link>
          </li>
        )}
      </ul>

      {loading ? null : !user ? (
        <ul className="nav-item">
          <li className="sign-in" onClick={handleSignIn}>
            <svg></svg>
            <span> Sign In With Google</span>
          </li>
        </ul>
      ) : (
        <ul className="nav-item">
          <li className="loggedin">
            <span>
              <p className="user-info">Welcome, {user.displayName}</p>
            </span>
            <span>
              <p className="sign-out" onClick={handleSignOut}>
                Sign out
              </p>
            </span>
          </li>
        </ul>
      )}
    </div>
  );
};

export default Navbar;
