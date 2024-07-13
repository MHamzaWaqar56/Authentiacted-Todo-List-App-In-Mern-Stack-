const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const connectDB = require("./Config/db.js");
const cors = require("cors");
const authRoute = require("./routes/authRoute.js");
const todoListRoute = require("./routes/todoListRoute.js");

dotenv.config();

connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// define routes
app.use("/auth", authRoute);
app.use("/todolist", todoListRoute);

// PORT
const PORT = process.env.PORT;

// api listening
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} 🔥`.bgMagenta.white);
});
