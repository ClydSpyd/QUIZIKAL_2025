const Session = require("../models/Session");
const Quiz = require("../models/Quiz");

const getHostSocket = async (io) => {
  const sockets = await io.fetchSockets();
  sockets.forEach((socket) => {
    console.log({
      id: socket.id,
      isHost: socket.isHost,
      isHost_HANDSHAKE: socket.handshake.query.isHost,
    });
  });
  return sockets.find((i) => i.handshake.query.isHost === 'true');
};

const getMyResponses = (responsesObj) => {
  // Find the maximum key to determine the length of the resulting array
  const maxKey = Math.max(...Object.keys(responsesObj).map(Number), 0);

  // Create the array using Array.from
  const resultArray = Array.from(
    { length: maxKey + 1 },
    (value, index) => responsesObj[index] || null
  );

  return resultArray;
};

const logUpdate = (socket, disconnect) => {
  const { username, sessionCode } = socket;
  if (!disconnect) {
    console.log(
      `SOCKET CONNECTION - username: ${username}, sessionCode: ${sessionCode}`
    );
  } else {
    console.log(
      `SOCKET DISCONNECTION - username: ${username}, sessionCode: ${sessionCode}`
    );
  }
};


const getResults = async (sessionCode, userId) => {
  // const session = await Session.findById(sessionId);
  const session = await Session.findOne({ sessionCode })
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
    const roundLengths = quiz.rounds.map(round => round.length);
    return [
      {
        userName:
          session.participants.get(userId)?.["username" || "defaultName"] ??
          "USER_" + userId,
        roundTotals: roundTotals,
        roundLengths: roundLengths,
        totalScore: roundTotals.reduce((acc, score) => acc + score, 0),
      },
    ];
  }

  // All users
  const allResults = {};
  for (const [userId, userResponses] of session.responses.entries()) {
    const roundTotals = evaluateUser(userResponses);
    const roundLengths = quiz.rounds.map(round => round.length);
    allResults[userId] = {
      userName:
        session.participants.get(userId)?.username ??
        session.participants.get(userId)?.defaultName ??
        `USER_${userId}`,
      roundTotals: roundTotals,
      roundLengths: roundLengths,
      totalScore: roundTotals.reduce((acc, score) => acc + score, 0),
      userStatus: session.participants.get(userId)?.status || "active",
    };
  }

  return allResults;
};

const getUserQuestionRespone = async (sessionCode, roundIdx, questionIdx) => {
  const session = await Session.findOne({ sessionCode }).populate("quizData");
  if (!session) return { error: "Session not found" };
  if(roundIdx > session.quizData.rounds.length  || questionIdx > session.quizData.rounds[roundIdx].length) {
    return { error: "Invalid round or question index" };
  }
  const obj = Object.fromEntries(session.get("responses"));
  const allResponses = Object.entries(obj).reduce(
    (acc, [userId, userResponses]) => {
      const response = userResponses?.[roundIdx]?.[questionIdx];
      if (response !== null && response !== undefined) {
        acc[userId] = response;
      }
      return acc;
    },
    {}
  );
  return { responses: allResponses };
}; 
    

module.exports = {
  logUpdate,
  getHostSocket,
  getMyResponses,
  getResults,
  getUserQuestionRespone
};
