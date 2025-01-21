const sessions = {};

const getLocalSessions = () => sessions;

const getSessionByCode = async (sessionCode) => {
  console.log("öö ", sessions);
  return sessions[sessionCode];
};

const getConnectedUsers = (sessionCode) => sessions[sessionCode].connectedUsers;

const addNewSession = (session) => {
  sessions[session.sessionCode] = session;
};

module.exports = {
  getSessionByCode,
  getConnectedUsers,
  addNewSession,
  getLocalSessions,
};
