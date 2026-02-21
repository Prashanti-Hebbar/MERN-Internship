import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const containerStyle = {
    textAlign: "center",
    margin: "50px auto",
    padding: "30px",
    width: "350px",
    borderRadius: "15px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.1)",
    backgroundColor: "#f9fafb",
    fontFamily: "Arial"
  };

  const buttonStyle = {
    padding: "10px 18px",
    margin: "8px",
    borderRadius: "8px",
    border: "none",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
    transition: "0.3s"
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: "20px" }}>Counter</h2>

      <h1 style={{ fontSize: "40px", color: "#4f46e5" }}>{count}</h1>

      <div>
        <button
          style={{ ...buttonStyle, backgroundColor: "#22c55e", color: "white" }}
          onClick={() => setCount(count + 1)}
        >
          Increment
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#ef4444", color: "white" }}
          onClick={() => setCount(count - 1)}
        >
          Decrement
        </button>

        <button
          style={{ ...buttonStyle, backgroundColor: "#6b7280", color: "white" }}
          onClick={() => setCount(0)}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Counter;