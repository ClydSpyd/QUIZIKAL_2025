const Quiz = require("../models/Quiz");

const getQuizById = async (quizId) => {
  try {
    const quizData = await Quiz.findById(quizId).populate({
      path: "rounds",
      model: QuizQuestion,
    });
    const filtered = quizData?.rounds.map((round) =>
      round.filter((i) => !!i.questionText)
    );
    if (quizData) quizData.rounds = filtered;
    return { quizData };
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};

const getQuizzesByCreator = async (userId) => {
  try {
    const quizzes = await Quiz.find({ createdBy: userId });
    return { quizzes };
  } catch (error) {
    console.log(error.message);
    return { error: error.message };
  }
};

module.exports = {
  getQuizById,
  getQuizzesByCreator,
};
