const mongoose = require("mongoose");

const QuizResultsSchema = new mongoose.Schema({
  quizId: {
    type: String,
    required: true
  },
  userResults: {
    type: Map,
    of: [Number],
    required: true
  }
});

module.exports = QuizResult = mongoose.model("QuizResults", QuizResultsSchema);