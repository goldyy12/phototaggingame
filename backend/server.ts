import express from "express";
import cors from "cors";
import prisma from "./db.js";
import registerGameRoutes from "./routes/game.routes.js";

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  cors({
    origin: [
      "https://phototaggingame-s55x.vercel.app",
      "https://phototaggingame.vercel.app",
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  }),
);

registerGameRoutes(app);

app.get("/", async (req, res) => {
  try {
    res.json("hello world");
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch characters" });
  }
});

if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 4000;
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export default app;
