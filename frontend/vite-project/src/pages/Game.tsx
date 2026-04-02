import React, { useState, useEffect } from "react";
import "./Game.css";
import api from "../Api";

interface Target {
  name: string;
  xPct: number;
  yPct: number;
  radius: number;
  logo: string;
}

const INITIAL_TARGETS: Target[] = [
  {
    name: "The Red Robot",
    xPct: 61.7,
    yPct: 0.8,
    radius: 0.6,
    logo: "/Untitled.png",
  },
  {
    name: "The Robot Dog",
    xPct: 16.28,
    yPct: 93.3,
    radius: 1,
    logo: "/Untitled2.png",
  },
  {
    name: "The Green Alien",
    xPct: 25.2,
    yPct: 37.64,
    radius: 1.5,
    logo: "/Untitled1.png",
  },
];

export default function Game({ username }: { username: string }) {
  const [targets, setTargets] = useState<Target[]>(INITIAL_TARGETS);
  const [menuPos, setMenuPos] = useState<{ x: number; y: number } | null>(null);
  const [showMenu, setShowMenu] = useState(false);
  const [finished, setFinished] = useState(false);
  const [foundTargets, setFoundTargets] = useState<Target[]>([]);
  const [timer, setTimer] = useState(0);
  const [logout, setLogout] = useState(false);
  const [leaderboard, setLeaderboard] = useState<
    Array<{ name: string; time: number }>
  >([]);
  const [showGameInfo, setShowGameInfo] = useState(true);
  const logoutHandler = () => {
    localStorage.removeItem("username");
    setLogout(true);
  };
  const handleClick = (e: React.MouseEvent<HTMLImageElement>) => {
    const target = e.target as HTMLImageElement;
    const rect = target.getBoundingClientRect();

    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMenuPos({ x, y });
    setShowMenu(true);

    console.log(`Clicked at: ${x.toFixed(2)}%, ${y.toFixed(2)}%`);
  };
  useEffect(() => {
    if (finished) return;
    if (logout) return;
    if (showGameInfo) return;

    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [finished]);
  const handleSelect = async (name: string) => {
    if (!menuPos) return;

    const foundItem = targets.find((item) => {
      const distance = Math.sqrt(
        Math.pow(menuPos.x - item.xPct, 2) + Math.pow(menuPos.y - item.yPct, 2),
      );
      return distance < item.radius;
    });

    if (foundItem && foundItem.name === name) {
      const newTargets = targets.filter((t) => t.name !== name);
      setTargets(newTargets);
      setFoundTargets([...foundTargets, foundItem]);
      if (newTargets.length === 0) {
        setFinished(true);
        alert("🎉 Congratulations! You found all the hidden objects!");
        await api.post("/submit-score", {
          username: username,
          time: timer,
        });
        const leaderboard = await api.get("/leaderboard");
        setLeaderboard(leaderboard.data);
        console.log("Leaderboard:", leaderboard.data);
      } else {
        console.log(`✅ Found: ${name}`);
      }
    } else {
      alert("❌ Wrong choice!");
    }

    setShowMenu(false);
  };

  return (
    <div className="game-container">
      <h1 className="title">Find the Hidden Objects</h1>
      <div className="game-wrapper">
        <img
          src="/image2.jpg"
          alt="Game Map"
          onClick={handleClick}
          className="game-image"
        />

        {/* HUD (icons + timer) */}
        <div className="hud">
          {INITIAL_TARGETS.map((item) => {
            const isFound = foundTargets.some((t) => t.name === item.name);

            return (
              <img
                key={item.name}
                src={item.logo}
                alt={item.name}
                className={`hud-icon ${isFound ? "found" : ""}`}
              />
            );
          })}

          <div className="timer">⏱ {timer}s</div>
        </div>
      </div>
      {showGameInfo && (
        <div className="game-info">
          <h2>How to Play:</h2>
          <p>
            Click on the image to find hidden objects. Select the correct object
            from the menu that appears. Find all objects as fast as you can!
          </p>
          <p>You will look for these hidden dudes:</p>
          <ul>
            {INITIAL_TARGETS.map((item) => (
              <li key={item.name} className="target-item">
                {item.name} <img src={item.logo} alt={item.name} />
              </li>
            ))}
          </ul>
          <button
            className="start-button"
            onClick={() => setShowGameInfo(false)}
          >
            Start Game
          </button>
        </div>
      )}

      {showMenu && menuPos && !finished && (
        <div
          className="menu"
          style={{
            top: `${menuPos.y}%`,
            left: `${menuPos.x}%`,
          }}
        >
          {targets.map((item) => (
            <div
              key={item.name}
              onClick={() => handleSelect(item.name)}
              className="menu-item"
            >
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      )}

      {finished && (
        <div className="overlay">
          <div className="finish-screen">
            <p>🎉 Game Completed! 🎉</p>
            <button onClick={() => window.location.reload()}>Play Again</button>

            <h2>🏆 Leaderboard 🏆</h2>
            <ul>
              {leaderboard.map((player, index) => (
                <li key={index}>
                  {index + 1}. {player.name} - {player.time}s
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                logoutHandler();
                window.location.reload();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
