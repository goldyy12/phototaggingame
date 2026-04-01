import { useState } from "react";

import { joinGame } from "../GameJoin";
import "./Join.css";

export default function Join({ onJoin }: { onJoin: (name: string) => void }) {
  const [username, setUsername] = useState("");

  const handleJoin = async () => {
    if (!username.trim()) {
      alert("Enter a username!");
      return;
    }

    try {
      await joinGame(username);

      localStorage.setItem("username", username);

      onJoin(username);
    } catch (err) {
      alert("Failed to join game,error: " + err);
    }
  };

  return (
    <div className="join-container">
      <div className="join-card"></div>
      <h1>Join Game</h1>

      <input
        type="text"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />

      <button onClick={handleJoin}>Join</button>
    </div>
  );
}
