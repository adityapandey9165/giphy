import { useContext, createContext, useState, useEffect } from "react";
import { signInWithPopup, signOut, GoogleAuthProvider } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const logOut = () => {
    signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    setIsLoggedIn(!!user); // Set isLoggedIn based on the user value
  }, [user]);

  const checkLoggedIn = () => {
    return isLoggedIn; // Return whether the user is logged in or not
  };
  return (
    <AuthContext.Provider value={{ user, googleSignIn, logOut, checkLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
