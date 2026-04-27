import React from "react";
import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <div>
      <Navbar />

      <div style={{ display: "flex" }}>
        <div style={{ width: "220px", minHeight: "100vh", background: "#1e1e2f" }}>
          {/* Sidebar later */}
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          {children}
        </div>
      </div>
    </div>
  );
}