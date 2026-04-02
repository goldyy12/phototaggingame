import prisma from "../db.js";
export const joinGame = async (req: any, res: any) => {
  const { username } = req.body;
  console.log("DB URL:", process.env.DATABASE_URL);
  try {
    const existingUser = await prisma.score.findFirst({
      where: { name: username },
    });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    const score = await prisma.score.create({
      data: { name: username, time: 0 },
    });
    res.json(score);
  } catch (error) {
    console.error("Error joining game:", error);
    res.status(500).json({ error: "Failed to join game" });
  }
};

export const submitScore = async (req: any, res: any) => {
  const { username, time } = req.body;
  try {
    const existingScore = await prisma.score.findFirst({
      where: { name: username },
    });

    if (existingScore) {
      if (time < existingScore.time || existingScore.time === 0) {
        const updated = await prisma.score.update({
          where: { id: existingScore.id },
          data: { time: time },
        });
        return res.json(updated);
      }
      return res.json(existingScore);
    }

    const newScore = await prisma.score.create({
      data: { name: username, time },
    });
    res.json(newScore);
  } catch (error) {
    console.error("Error submitting score:", error);
    res.status(500).json({ error: "Failed to submit score" });
  }
};

export const leaderboard = async (req: any, res: any) => {
  try {
    const scores = await prisma.score.findMany({
      orderBy: { time: "asc" },
      take: 10,
    });
    res.json(scores);
  } catch (error) {
    console.error("Error fetching leaderboard:", error);
    res.status(500).json({ error: "Failed to fetch leaderboard" });
  }
};
