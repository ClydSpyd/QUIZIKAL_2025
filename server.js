const express = require("express");
require("dotenv").config();
const http = require("http");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
const initSocket = require("./socket");
const { swaggerUi, swaggerSpec } = require("./swagger");

const app = express();
const port = process.env.PORT || 8888;
const server = http.createServer(app);

connectDB();

app.use(cors());
app.use(express.json({ extended: false })); //body parser

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/quiz", require("./routes/quiz"));
app.use("/api/session", require("./routes/session"));
app.use("/api/user", require("./routes/user"));
app.use("/api/question", require("./routes/question"));
app.use("/api/trivia", require("./routes/trivia"));

app.get(["/api"], (_, res) => {
  res.sendFile(__dirname + "/index.html");
});

// Serve static files from client/build in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/dist")));

  // Catch-all route to serve the React app's index.html for any other routes
  app.get("*", (_, res) => {
    res.sendFile(path.join(__dirname, "client/dist", "index.html"));
  });
}

initSocket(server);

server.listen(port, () => {
  console.log(`📚📚📚 QUIZIKAL started on port:${port} 📚📚📚`);
});
