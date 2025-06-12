const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  questionType: {
    type: String,
    enum: ["PICTURE", "MULTI_TEXT", 'PIC_TEXT'],
    required: true,
  },
  questionText: {
    type: String,
    required: true,
  },
  options: {
    type: [String],
    required: true,
  },
  imgUrl: {
    type: String,
    require: this.questionType === 'PIC_TEXT'
  },
  correctIndex: {
    type: Number,
    required: true,
  },
  myResponse: {
    type: String,
    required: false,
  }
});

module.exports = QuizQuestion = mongoose.model("QuizQuestion", schema);
