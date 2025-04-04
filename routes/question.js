const express = require("express");
const Session = require("../models/Session");
const { getSessionByCode } = require("../services/session.service");
const QuizQuestion = require("../models/QuizQuestion");
const Quiz = require("../models/Quiz");
const { getQuestionClient } = require("../services/question.service");
const router = express.Router();

// @get RETREIVE ALL QUESTIONS
router.get("/", async (req, res) => {
  const allQuestions = await QuizQuestion.find();
  res.json(allQuestions);
});

// @GET retrieve one question
router.get("/:questionId", async (req, res) => {
  console.log("GET QUESTION");
  const { questionId } = req.params;
  const questionData = await QuizQuestion.findById(questionId);

  if (questionData) {
    res.json(questionData);
  } else {
    res.json({
      error: "QUESTION NOT FOUND",
    });
  }
});

// @POST create new question and add to quiz
router.post("/add", async (req, res) => {
  const { questionData, quizId, round } = req.body;
  console.log("quízId: ", quizId);

  try {
    console.log("questionData: ", questionData);
    delete questionData._id;
    const question = new QuizQuestion(questionData);
    await question.save();

    const quiz = await Quiz.findById(quizId);
    if (quiz.rounds[round]) {
      quiz.rounds[round].push(question);
    } else {
      quiz.rounds[round] = [question];
    }
    await quiz.save();

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message,
    });
  }
});

// @POST add existing question to quiz
router.post("/add/existing", async (req, res) => {
  const { quizId, roundIdx, questionIds } = req.body;
  console.log({ roundIdx, questionIds });
  try {
    // const question = QuizQuestion.findById(questionId);
    const quiz = await Quiz.findById(quizId);
    if (quiz.rounds[roundIdx]) {
      questionIds.forEach((id) => {
        quiz.rounds[roundIdx].push(id);
      });
    } else {
      quiz.rounds[roundIdx] = questionIds;
    }
    await quiz.save();

    res.json({
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message,
    });
  }
});

// @PATCH update existing question
router.patch("/:questionId", async (req, res) => {
  const { questionId } = req.params;
  const payload = req.body;
  console.log({ payload, options: payload.options });

  try {
    const updatedQuestion = await QuizQuestion.findOneAndUpdate(
      { _id: questionId }, // filter
      { $set: payload }, // update
      { new: true } // return the updated doc
    );

    res.json({
      updatedQuestion,
      success: true,
    });
  } catch (error) {
    console.log(error.message);
    res.json({
      error: error.message,
    });
  }
});

// @DELETE delete question from quiz
router.delete("/:quizId/:roundIdx/:questionIdx", async (req, res) => {
  try {
    const { quizId, roundIdx, questionIdx } = req.params;

    // Convert indexes to integers
    const roundIndex = parseInt(roundIdx);
    const questionIndex = parseInt(questionIdx);

    // Validate indexes
    if (isNaN(roundIndex) || isNaN(questionIndex)) {
      return res.status(400).json({ error: "Invalid round or question index" });
    }

    // Find the quiz by ID
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ error: "Quiz not found" });
    }

    // Ensure roundIndex is within range
    if (roundIndex < 0 || roundIndex >= quiz.rounds.length) {
      return res.status(400).json({ error: "Invalid round index" });
    }

    // Ensure questionIndex is within range
    if (questionIndex < 0 || questionIndex >= quiz.rounds[roundIndex].length) {
      return res.status(400).json({ error: "Invalid question index" });
    }

    // Remove the question from the round
    quiz.rounds[roundIndex].splice(questionIndex, 1);

    // Save the updated quiz document
    await quiz.save();

    res.json({ success: true, message: "Question removed from round", quiz });
  } catch (error) {
    console.error("Error removing question:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/participant", async (req, res) => {
  console.log("GET QUESTION");
  const { userId, sessionCode, roundIdx, questionIdx } = req.body;
  console.log({ sessionCode, roundIdx, questionIdx, userId });

  if (
    !userId ||
    !sessionCode ||
    roundIdx === undefined ||
    questionIdx === undefined
  ) {
    return res.status(404).json({ error: "missing required payload entries" });
  }
  const questionData = await getQuestionClient(
    sessionCode,
    roundIdx,
    questionIdx,
    userId
  );

  return res.json(questionData);
});
// router.get(
//   "/participant/:participantId/:sessionCode/:roundIdx/:questionIdx",
//   async (req, res) => {
//     console.log("GET QUESTION");
//     const { participantId, sessionCode, roundIdx, questionIdx } = req.params;
//     const { session } = await getSessionByCode(sessionCode, "quizData");
//     console.log("Ö", session);

//     if (!session) {
//       return res
//         .status(400)
//         .json({ error: `Session ${sessionCode} not found` });
//     }

//     if (+roundIdx > session?.quizData?.rounds.length - 1)
//       return res.json({ error: "invalid roundIdx" });

//     if (questionIdx > session?.quizData?.rounds[roundIdx]?.length - 1)
//       return res.json({ error: "invalid questionIdx" });

//     const questionId = session.quizData.rounds[roundIdx]?.[questionIdx];
//     const questionData = await QuizQuestion.findOne(questionId);

//     return res.json({ questionData, session });
//   }
// );

module.exports = router;
