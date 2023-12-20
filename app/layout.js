"use client";
import Navbar from "./nav/Navbar";
import { AuthContextProvider } from "./context/AuthContext";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthContextProvider>
          {" "}
          <Navbar />
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
