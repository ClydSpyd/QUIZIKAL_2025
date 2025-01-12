const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ["PICTURE", "MULTI_TEXT"],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: this.type !== "TEXT",
  },
  correctIndex: {
    type: Number,
    required: this.type !== "TEXT",
  },
});

module.exports = QuizQuestion = mongoose.model("QuizQuestion", schema);
