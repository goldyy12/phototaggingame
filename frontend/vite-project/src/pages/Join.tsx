import { useState } from "react";
import { joinGame } from "../GameJoin";
import "./Join.css";

export default function Join({ onJoin }: { onJoin: (name: string) => void }) {
  const [username, setUsername] = useState("");
  const [error, setError] = useState(""); // 1. Add error state

  const handleJoin = async () => {
    setError(""); // Reset error before trying

    if (!username.trim()) {
      setError("Enter a username!");
      return;
    }

    try {
      await joinGame(username);
      localStorage.setItem("username", username);
      onJoin(username);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="join-container">
      <div className="join-card">
        <h1>Join Game</h1>

        {error && <p style={{ color: "red", marginBottom: "10px" }}>{error}</p>}

        <input
          type="text"
          placeholder="Enter your username"
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (error) setError("");
          }}
        />

        <button onClick={handleJoin}>Join</button>
      </div>
    </div>
  );
}
