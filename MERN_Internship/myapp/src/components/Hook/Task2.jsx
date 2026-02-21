import React, { useState } from "react";

export default function ThemeToggle() {
  const [darkMode, setDarkMode] = useState(false);

  const containerStyle = {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    transition: "all 0.4s ease",
    backgroundColor: darkMode ? "#111827" : "#f3f4f6",
    color: darkMode ? "#f9fafb" : "#111827",
    fontFamily: "Arial"
  };

  const buttonStyle = {
    padding: "12px 20px",
    borderRadius: "10px",
    border: "none",
    cursor: "pointer",
    fontSize: "15px",
    fontWeight: "bold",
    marginTop: "20px",
    backgroundColor: darkMode ? "#facc15" : "#4f46e5",
    color: darkMode ? "black" : "white",
    transition: "0.3s"
  };

  return (
    <div style={containerStyle}>
      <h1>{darkMode ? "🌙 Dark Mode" : "☀️ Light Mode"}</h1>

      <button onClick={() => setDarkMode(!darkMode)} style={buttonStyle}>
        Switch to {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}

