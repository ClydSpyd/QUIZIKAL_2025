const express = require("express");
const router = express.Router();
const Quiz = require("../models/Quiz");
const QuizQuestion = require("../models/QuizQuestion");
const {
  getQuizById,
  getQuizzesByCreator,
} = require("../utilities/QuizUtilities");

// get all quizzes
router.get("/", async (req, res) => {
  try {
    const quizzes = await Quiz.find();
    res.json(quizzes);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

// get quiz by ID
router.get("/:quizId", async (req, res) => {
  const { quizId } = req.params;
  console.log("quizId..: ", quizId);
  const { quizData, error } = await getQuizById(quizId);

  if (error) {
    return res.json(error);
  } else {
    res.json(quizData);
  }
});

// fetch quizzez by creator ID
router.get("/creator/:userId", async (req, res) => {
  const { userId } = req.params;
  const { quizzes, error } = await getQuizzesByCreator(userId);

  if (error) {
    return res.json(error);
  } else {
    res.json(quizzes);
  }
});

// update quiz data
router.post("/:quizId/update", async (req, res) => {
  const { quizData } = req.body;
  console.log("quizData: ", quizData);
  try {
    const quiz = await Quiz.findByIdAndUpdate(quizData._id, {
      $set: quizData,
    });
    console.log("quiz: ", quiz);
    res.json(quiz);
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

// create new quiz
router.post("/create", async (req, res) => {
  try {
    const newQuiz = new Quiz();
    console.log(newQuiz);
    res.json({ quizId: newQuiz.id });
    await newQuiz.save();
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});

router.post("/:quizId/delete", async (req, res) => {
  const { quizId } = req.params;

  try {
    const response = await Quiz.findByIdAndRemove(quizId);
    console.log(response);
    res.json(response);
  } catch (error) {
    res.json({ error: error.message });
  }
});

router.post("/addRound/:quizId", async (req, res) => {
  const { quizId } = req.params;
  console.log("quizId: ", quizId);
  try {
    const quiz = await Quiz.findById(quizId);
    console.log("quiz: ", quiz);
    quiz.rounds = [...quiz.rounds, []];
    await quiz.save();
    res.json({ quizData: quiz });
  } catch (error) {
    console.log(error.message);
    res.json({ error: error.message });
  }
});
module.exports = router;
