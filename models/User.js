const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  activeSession: {
    type: mongoose.Schema.Types.ObjectId || null,
    ref: "Session",
    default: null,
  },
  quizzes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Quiz",
    default: [],
  },
});

module.exports = User = mongoose.model("User", schema);
