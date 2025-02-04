const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  sessionName: {
    type: String,
    required: true,
  },
  sessionCode: {
    type: String,
    required: true,
  },
  sidecarCode: {
    type: String,
    required: true,
  },
  roundIdx: {
    type: Number,
    default: 0,
  },
  questionIdx: {
    type: Number,
    default: 0,
  },
  participants: {
    type: Map,
    of: Object,
    default: new Map(),
  },
  responses: {
    type: Map,
    of: [[String]], // Each userId maps to an array of arrays
    default: () => new Map(),
  },
  sessionStatus: {
    type: String,
    default: "pending",
  },
  quizData: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Quiz",
    required: true,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  createdAt: { type: Date, default: Date.now },
  endedAt: { type: Date, required: false },
});

module.exports = Session = mongoose.model("Session", schema);