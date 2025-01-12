const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  quizName: { type: String, default: "Untitled Quiz" },
  questions: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "QuizQuestion" }],
    default: [],
  },
  rounds: {
    type: [[{ type: mongoose.Schema.Types.ObjectId, ref: "QuizQuestion" }]],
    default: [[]],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

module.exports = Quiz = mongoose.model("Quiz", schema);
