const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
  },
  sessionStatus: {
    type: String,
    default: "pending"
  },
  participants: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    default: [],
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, required: true, default: Date.now },
  endedAt: { type: Date, required: false },
  responses: {
    type: mongoose.Schema.Types.Mixed,
    default: {},
  },
  roundIdx: {
    type: Number,
    default: 0
  },
  questionIdx: {
    type: Number,
    default: 0
  },
});

module.exports = Session = mongoose.model("Session", schema);