const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  activeQuiz: {
    type: mongoose.Schema.Types.ObjectId || null,
    ref: "Session",
    default: null,
  },
  quizzes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Quiz",
    default: null,
  },
});

module.exports = User = mongoose.model("User", schema);
