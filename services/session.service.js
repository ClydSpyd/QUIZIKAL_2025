const Session = require("../models/Session");
const { getQuizById } = require("../utilities/QuizUtilities");
const { getQuestionClient } = require("./question.service");

const sessions = {};

const connectedUsers = {};
const socketToUserMap = {};

const getLocalSessions = () => sessions;

const getSessionByCode = async (sessionCode, populate) => {
  // console.log("GET")
  const session = await Session.findOne({ sessionCode }).populate(populate).lean();

  // console.log(session)
  if (!session) {
    console.log("RETURNING ERROR RES")
    return { error: `Session ${sessionCode} not found` };
  }

  return session;
  
  return sessions[sessionCode];
};

const getConnectedUsers = (sessionCode) => sessions[sessionCode].connectedUsers;

const addNewSession = (session) => {
  sessions[session.sessionCode] = session;
};

const getSessionData = async (sessionCode) => {
  // console.log("GET SESSION DATA", sessionCode);
  const session = await Session.findOne({ sessionCode }).lean();
  // console.log({session})
  if (!session) {
    return { error: `Session ${sessionCode} not found` };
  }

  const participants = Object.fromEntries(
    Object.entries(session.participants).filter(
      ([key, value]) => value.status == "active"
    )
  );
  
  const { quizData } = await getQuizById(session.quizData);
  return { session: { ...session, participants }, quizData };
};

const getSessionDataParticipant = async (sessionCode, userId) => {
  try {
    const session = await Session.findOne({ sessionCode });
    if (!session) {
      throw new Error("Session not found");
    }
    const { roundIdx, questionIdx, sessionStatus, sessionName } = session;

    const userData = session.participants.get(userId);
    if (!userData || userData.status !== "active") {
      return { error: "User not found" };
    }
    const payload = {
      sessionCode,
      sessionName,
      userData,
      roundIdx,
      questionIdx,
      sessionStatus,
    };
    return { payload };
  } catch (error) {
    return { error: error };
  }
};

const handleHostConnection = async (io, socket) => {
  console.log("HöST CONNECTED");
  const { sessionCode } = socket.handshake.query;
  const { session } = await getSessionData(sessionCode);
  socket.sessionCode = sessionCode;
  socket.sessionId = session._id;
  socket.emit("session-data-host", {
    roundIdx: session?.roundIdx,
    questionIdx: session?.questionIdx,
    sessionStatus: session?.sessionStatus,
  });
  io.emit("users", Object.values(connectedUsers));
};

const handleClientConnection = async (socket) => {
  // console.log("HANDLE CLIENT", "ÖÖÖ");

  const { sessionCode, username, userId } = socket.handshake.query;
  // console.log("öÖ", { sessionCode, username, userId });
  connectedUsers[userId] = { id: socket.id, username, userId };
  socketToUserMap[socket.id] = userId;

  try {
    const { payload: sessionData, error } = await getSessionDataParticipant(
      sessionCode,
      userId
    );

    if (error) {
      console.log("ÖERRÖR", error);
      socket.emit("socket-error", { message: error.message });
    } else {

      const questionData = await getQuestionClient(
        sessionCode,
        sessionData.roundIdx,
        sessionData.questionIdx,
        userId
      );
      // console.log("🎉 SUCCESS");
      // Send only to the new connection
      socket.emit("session-data-client", {
        roundIdx: sessionData?.roundIdx,
        questionIdx: sessionData?.questionIdx,
        sessionStatus: sessionData?.sessionStatus,
        roundStatus: sessionData?.userData.roundStatus,
        questionData
      });

      socket.broadcast.emit("users", Object.values(connectedUsers));
    }
  } catch (error) {
    console.log("ÖÖ->ERROR", error);
  }
};

/**
 * update a session with the provided partial data.
 * @param {String} sessionId - The ID of the session to update.
 * @param {Object} updateData - The partial session object with the fields to update.
 * @returns {Promise<Object>} - The updated session object.
 */
const updateSession = async (sessionId, updateData) => {
  try {
    if (!sessionId || typeof updateData !== "object") {
      throw new Error("Invalid session ID or update data");
    }

    const updatedSession = await Session.findByIdAndUpdate(
      sessionId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedSession) {
      throw new Error("Session not found");
    }

    return updatedSession;
  } catch (error) {
    console.error("Error updating session:", error);
    throw error;
  }
};

const handleQuestionResponse = async (sessionCode, username, responseIdx) => {
  const session = await getSessionByCode(sessionCode);
  if (!session) return;

  console.log("Ö");
  console.log({ username, responseIdx, questionIdx: session.questionIdx });

  session.responses[username];

  if (!session.responses[username]) session.responses[username] = {};

  if (!session.responses[username][session.roundIdx])
    session.responses[username][session.roundIdx] = {};

  session.responses[username][session.roundIdx][session.questionIdx] =
    Number(responseIdx);

  console.log("ÖÖÖÖÖ", session.responses[username][session.roundIdx]);
  return session;
};

module.exports = {
  getSessionByCode,
  getConnectedUsers,
  addNewSession,
  getLocalSessions,
  getSessionDataParticipant,
  handleClientConnection,
  handleHostConnection,
  connectedUsers,
  socketToUserMap,
  getSessionData,
  updateSession,
  handleQuestionResponse,
};
