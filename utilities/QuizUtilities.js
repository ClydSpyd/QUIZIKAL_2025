const Quiz = require("../models/Quiz");
const Session = require("../models/Session");

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

const getResults = async (sessionId, userId) => {
  const session = await Session.findById(sessionId);
  if (!session) return { error: "Session not found" };

  const quiz = await Quiz.findById(session.quizData).populate({
    path: "rounds",
    model: QuizQuestion,
  });
  if (!quiz) return { error: "Quiz not found" };

  const correctIndexes = quiz.rounds.map(round =>
    round.map(q => q.correctIndex)
  );

const evaluateUser = (userResponses) =>
  correctIndexes.map((round, i) =>
    round.reduce((score, correctIdx, j) => {
      const response = userResponses?.[i]?.[j];

      if (
        response !== null &&
        response !== undefined &&
        Number.isFinite(+response) &&
        +response === correctIdx
      ) {
        return score + 1;
      }

      return score;
    }, 0)
  );

  if (userId) {
    const userResponses = session.responses.get(userId);
    if (!userResponses) return { error: "User responses not found" };
    const roundTotals = evaluateUser(userResponses);
    return {
      userName:
        session.participants.get(userId)?.["username" || "defaultName"] ??
        "USER_" + userId,
      roundTotals: roundTotals,
      totalScore: roundTotals.reduce((acc, score) => acc + score, 0),
    };
  }

  // All users
  const allResults = {};
  for (const [userId, userResponses] of session.responses.entries()) {
    const roundTotals = evaluateUser(userResponses);
    allResults[userId] = {
      userName:
        session.participants.get(userId)?.username ??
        session.participants.get(userId)?.defaultName ??
        `USER_${userId}`,
      roundTotals: roundTotals,
      totalScore: roundTotals.reduce((acc, score) => acc + score, 0),
    };
  }

  return allResults;
};



module.exports = {
  getQuizById,
  getQuizzesByCreator,
  getResults,
};
