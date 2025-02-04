const Session = require("../models/Session");
const { getQuizById } = require("../utilities/QuizUtilities");
const { getQuestionClient } = require("./question.service");

const sessions = {};

const connectedUsers = {};
const socketToUserMap = {};

const getLocalSessions = () => sessions;

const getSessionByCode = async (sessionCode, populate) => {
  console.log("GET")
  const session = await Session.findOne({ sessionCode }).populate(populate).lean();

  console.log(session)
  if (!session) {
    console.log("RETURNING ERROR RES")
    return { error: `Session ${sessionCode} not found` };
  }

  return { session };
  console.log("öö ", sessions);
  return sessions[sessionCode];
};

const getConnectedUsers = (sessionCode) => sessions[sessionCode].connectedUsers;

const addNewSession = (session) => {
  sessions[session.sessionCode] = session;
};

const getSessionData = async (sessionCode) => {
  const session = await Session.findOne({ sessionCode }).lean();
  console.log({session})
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
  socket.emit("session-data-host", {
    roundIdx: session?.roundIdx,
    questionIdx: session?.questionIdx,
    sessionStatus: session?.sessionStatus,
  });
  io.emit("users", Object.values(connectedUsers));
};

const handleClientConnection = async (socket) => {
  console.log("HANDLE CLIENT", "ÖÖÖ");

  const { sessionCode, username, userId } = socket.handshake.query;
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
      console.log("🎉 SUCCESS");
      // Send only to the new connection
      socket.emit("session-data-client", {
        roundIdx: sessionData?.roundIdx,
        questionIdx: sessionData?.questionIdx,
        sessionStatus: sessionData?.sessionStatus,
        roundStatus: sessionData?.userData.roundStatus,
        questionData
      });


    }
  } catch (error) {
    console.log("ÖÖ->ERROR", error);
  }
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
  getSessionData
};
