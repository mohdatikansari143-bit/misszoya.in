import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Posts from "./Posts.jsx";
import Admin from "./Admin.jsx";

function App() {
  return (
    <>
      <nav style={{
        position: "sticky",
        top: 0,
        zIndex: 10,
        display: "flex",
        justifyContent: "space-between",
        padding: "14px 18px",
        background: "#090909",
        borderBottom: "1px solid #222"
      }}>
        <strong>Trex Wallet</strong>
        <div style={{display: "flex", gap: 16}}>
          <Link style={{color:"#fff", textDecoration:"none"}} to="/">Posts</Link>
          <Link style={{color:"#fff", textDecoration:"none"}} to="/admin">Admin</Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Posts />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
