require("dotenv").config();
const express = require("express");
const path = require("path");
const livereload = require("livereload");
const connectLiveReload = require("connect-livereload");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3001;

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("MONGODB_URI is not defined in the environment variables");
  process.exit(1);
}

mongoose.connect(mongoUri);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const characterController = require('./controllers/characterController');
const skillController = require('./controllers/skillController'); 
const spellController = require('./controllers/spellController');
const userRouter = require("./controllers/userController");

// Middleware
app.use(
  cors({
    credentials: true,
    origin: ["http://localhost:5173"],
  })
);
app.options("*", cors());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));

// Routes
app.use('/characters', characterController);
app.use('/skills', skillController);
app.use('/spells', spellController);
app.use("/users", userRouter);

// Basic route for homepage
app.get("/", (req, res) => {
  res.send("Welcome to the D&D Character Sheet App!");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});