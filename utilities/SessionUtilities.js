const Session = require("../models/Session");

const getHostSocket = async (io) => {
  const sockets = await io.fetchSockets();
  return sockets.find((i) => i.isHost === 'true');
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
module.exports = {
  logUpdate,
  getHostSocket,
  getMyResponses,
};
