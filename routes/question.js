const express = require("express");
const Session = require("../models/Session");
const { getSessionByCode } = require("../services/session.service");
const QuizQuestion = require("../models/QuizQuestion");
const router = express.Router();

router.get("/participant", async (req, res) => {
  console.log("GET QUESTION");

  res.json({ hello: "world" });
});
router.get(
  "/participant/:participantId/:sessionCode/:roundIdx/:questionIdx",
  async (req, res) => {
    console.log("GET QUESTION");
    const { participantId, sessionCode, roundIdx, questionIdx } = req.params;
    const { session } = await getSessionByCode(sessionCode, "quizData");
    console.log("Ö", session);

    if (!session) {
      return res
        .status(400)
        .json({ error: `Session ${sessionCode} not found` });
    }

    if (+roundIdx > session?.quizData?.rounds.length - 1)
      return res.json({ error: "invalid roundIdx" });

    if (questionIdx > session?.quizData?.rounds[roundIdx]?.length - 1)
      return res.json({ error: "invalid questionIdx" });

    const questionId = session.quizData.rounds[roundIdx]?.[questionIdx];
    const questionData = await QuizQuestion.findOne(questionId);

    return res.json({ questionData, session });
  }
);

module.exports = router;
