import { useState } from "react";
import Join from "./pages/Join";
import Game from "./pages/Game";

export default function App() {
  const [username, setUsername] = useState<string | null>(
    localStorage.getItem("username"),
  );

  const handleJoin = (name: string) => {
    localStorage.setItem("username", name);

    setUsername(name);
  };

  return (
    <div className="app-container">
      {username ? <Game username={username} /> : <Join onJoin={handleJoin} />}
    </div>
  );
}
