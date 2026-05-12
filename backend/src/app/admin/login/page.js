"use client";

import { useState } from "react";

const wrapStyle = {
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontFamily: "Arial, sans-serif",
};

const cardStyle = {
  width: "320px",
  padding: "24px",
  border: "1px solid #d9d9d9",
  borderRadius: "12px",
};

const inputStyle = {
  width: "100%",
  padding: "8px 10px",
  border: "1px solid #c4c4c4",
  borderRadius: "8px",
  marginTop: "4px",
};

export default function AdminLoginPage() {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
      window.location.href = "/admin";
    } catch (submitError) {
      setError(submitError.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={wrapStyle}>
      <form onSubmit={submit} style={cardStyle}>
        <h1 style={{ marginTop: 0 }}>Admin login</h1>

        <label htmlFor="username">Username</label>
        <input
          id="username"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          style={inputStyle}
        />

        <label htmlFor="password" style={{ marginTop: "12px", display: "block" }}>
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          style={inputStyle}
        />

        {error ? <p style={{ color: "#b00020" }}>{error}</p> : null}
        <button
          type="submit"
          disabled={loading}
          style={{ ...inputStyle, marginTop: "14px", cursor: "pointer" }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
