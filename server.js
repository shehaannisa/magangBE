require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

const {
  authenticateToken,
  regenerateAccessToken,
} = require("./server/middleware/auth");

const userRouter = require("./server/routes/auth");
const quizRouter = require("./server/routes/quiz");
const gameRouter = require("./server/routes/game");
const playerResultRouter = require("./server/routes/playerResult");
const leaderboardRouter = require("./server/routes/leaderboard");

mongoose.connect(process.env.DATABASE_URL);

const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to database"));

app.use(express.json({limit: '5mb'}));
app.use(cors());
app.use(authenticateToken);
//app.use(regenerateAccessToken);

app.use("/api/users", userRouter);
app.use("/api/quizes", quizRouter);
app.use("/api/games", gameRouter);
app.use("/api/playerResults", playerResultRouter);
app.use("/api/leaderboard", leaderboardRouter)

app.listen(process.env.PORT || 3000, () =>
  console.log(`Server started on port ${process.env.PORT}`)
);
