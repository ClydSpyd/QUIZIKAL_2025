const express = require("express");
const Session = require("../models/Session");
const {
  generateRandomAlphaNumeric,
  sessionCodeFromName,
} = require("../utilities/stringUtils");
const User = require("../models/User");
const { addNewSession } = require("../services/session.service");
const router = express.Router();
const { getQuizById } = require("../utilities/QuizUtilities");

router.post("/create", async (req, res) => {
  console.log("create session");
  const { quizId, sessionName, userId } = req.body;
  let sessionCode = sessionCodeFromName(sessionName);
  let sidecarCode = generateRandomAlphaNumeric(4, "uppercase");
  const newSession = new Session({
    sessionName,
    sessionCode,
    sidecarCode,
    quizId,
    createdBy: userId,
  });

  console.log("NEWSESSION:", newSession);

  await newSession.save();
  addNewSession(newSession);

  const user = await User.findById(userId);
  if (user) {
    user.activeSession = newSession._id;
    await user.save();
  }

  res.json({ sessionCode });
});

router.get("/:sessionCode", async (req, res) => {
  console.log("get session");
  const { sessionCode } = req.params;

  try {
    // const session = await Session.findOne({sessionCode}).populate("quizId"); // @todo chamge name of quizId key to "quizData", populate questions data
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res
        .status(400)
        .json({ error: `Session ${sessionCode} not found` });
    }

    const { quizData } = await getQuizById(session.quizId);
    res.json({ session, quizData });
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

router.post("/:sessionCode/participant", async (req, res) => {
  const { sessionCode } = req.params;
  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const userId = generateRandomAlphaNumeric(5, "uppercase");
    const idx = session.participants.size + 1; // Use .size to get the count
    const username = `Participant ${idx}`;

    session.participants.set(userId, username); // Use .set() to add to the Map

    await session.save();

    res.json({ userId, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
