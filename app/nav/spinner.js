import React from "react";
import "../styles/styles.css"; // Import your CSS file

const Spinner = () => {
  return (
    <div className="spinner-container">
      {" "}
      {/* Adjust the container class */}
      <div className="spinner"></div>
    </div>
  );
};

export default Spinner;
