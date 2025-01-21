const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
const port = process.env.PORT || 6969;
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json({ extended: false })); //body parser
app.use("/api/auth", require("./routes/auth"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/session", require("./routes/session"));
app.use("/api/user", require("./routes/user"));

app.get(["*"], (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.locals.trivia_questions;

server.listen(port, () => {
  console.log(`📚📚📚 QUIZIKAL started on port:${port} 📚📚📚`);
});
