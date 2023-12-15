require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors")

const app = express();

// mongoose.connect(process.env.DATABASE_URL);

// const db = mongoose.connection;
// db.on("error", (error) => console.error(error));
// db.once("open", () => console.log("Connected to database"));
// CONNECT DATABASE
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useCreateIndex: true
})
.then(()=> console.log('DB connected'))
.catch((err)=> console.log(err));

app.use(express.json());
app.use(cors())

const authRouter = require("./routes/auth");
app.use("/api/auth", authRouter);

app.listen(process.env.AUTH_PORT, () =>
  console.log(`Auth Server started on port ${process.env.AUTH_PORT}`)
);
