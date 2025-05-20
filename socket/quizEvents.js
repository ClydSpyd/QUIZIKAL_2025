const Session = require("../models/Session");
const { getHostSocket } = require("../utilities/SessionUtilities");
const { updateSessionKeys, handleQuestionResponse, getRoundRespondees, socketToUserMap } = require("../services/session.service");

const handleQuizEvents = async (io, socket) => {
  const { sessionCode } = socket.handshake.query;
  // console.log("Ö sessionCode: ", sessionCode);

  socket.on("session-status-changed", (sessionStatus) => {
    io.emit("session-status-changed", { sessionStatus });
    updateSessionKeys(sessionCode, { status: sessionStatus });
  })

  socket.on("show-results", ({sessionIdx}) => {
    updateSessionKeys(sessionCode, { status: 'resultRound' });
    io.emit("show-results", { sessionIdx });
  })

  socket.on("set-round", ({roundIdx}) => {
    const respondees = getRoundRespondees(sessionCode, 0, roundIdx);
    console.log(`newRound: ${roundIdx}`);
    updateSessionKeys(sessionCode, {
      status: "pendingRound",
      roundIdx,
      questionIdx: 0,
    });
    io.emit("round-change", { roundIdx });
    io.emit("question-change", { questionIdx: 0, respondees });
    io.emit("session-status-changed", { sessionStatus: "pendingRound" });
  })

  socket.on("set-question", ({ questionIdx }) => {
    const respondees = getRoundRespondees(sessionCode, questionIdx);
    console.log('roundRespondees: ', respondees)
    updateSessionKeys(sessionCode, { questionIdx });
    io.emit("question-change", { questionIdx, respondees });
  });

  socket.on("question-response", async (payload) => {
    console.log("question-response", payload);
    const { responseIdx, roundIdx, questionIdx } = payload;
    const { sessionCode } = socket.handshake.query;
    const map = socketToUserMap
    
    if(responseIdx !== -1){
      // const updatedSession = await handleQuestionResponse(sessionCode, map[socket.id], responseIdx);

      const updatePath = `responses.${map[socket.id]}.${roundIdx}.${questionIdx}`;

      const updated = await Session.findOneAndUpdate(
        { sessionCode },
        { $set: { [updatePath]: Number(responseIdx) } },
        { new: true }
      );

      console.log("Updated session: ", updated);

    }
  })
};

module.exports = handleQuizEvents;