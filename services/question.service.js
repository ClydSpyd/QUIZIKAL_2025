const Session = require("../models/Session");

const getQuestionClient = async (sessionCode, roundIdx, questionIdx, userId) => {
  const session = await Session.findOne({ sessionCode })
    .populate("quizData")
    .lean();

  if (!session) {
    return { error: `Session ${sessionCode} not found` };
  }

  if (+roundIdx > session?.quizData?.rounds.length - 1)
    return { error: "invalid roundIdx" };

  if (questionIdx > session?.quizData?.rounds[roundIdx]?.length - 1)
    return { error: "invalid questionIdx" };

  const questionId = session.quizData.rounds[roundIdx]?.[questionIdx];
  const questionData = await QuizQuestion.findOne(questionId).lean();

  // console.log({ questionData });
  delete questionData?.correctIndex;

  const myResponse = session.responses[userId]?.[roundIdx][questionIdx];

  // console.log({ respoonses: session.responses[userId] });

  return { ...questionData, myResponse: myResponse ?? null };
};

module.exports = {
  getQuestionClient,
};
