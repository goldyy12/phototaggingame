import express from "express";
import cors from "cors";

import prisma from "./db";
import registerGameRoutes from "./routes/game.routes";

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

registerGameRoutes(app);

app.get("/api/characters", async (req, res) => {
  const characters = await prisma.character.findMany();
  res.json(characters);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
