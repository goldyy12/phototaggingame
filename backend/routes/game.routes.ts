import {
  joinGame,
  submitScore,
  leaderboard,
} from "../controllers/gameController.js";

export default function registerGameRoutes(app: any) {
  app.post("/api/join", joinGame);
  app.post("/api/submit-score", submitScore);
  app.get("/api/leaderboard", leaderboard);
}
