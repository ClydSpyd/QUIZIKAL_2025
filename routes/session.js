const express = require("express");
const Session = require("../models/Session");
const {
  generateRandomAlphaNumeric,
  sessionCodeFromName,
} = require("../utilities/stringUtils");
const User = require("../models/User");
const {
  addNewSession,
  getSessionDataParticipant,
  getSessionData,
} = require("../services/session.service");
const router = express.Router();

// POST create session
router.post("/create", async (req, res) => {
  console.log("create session");
  const { quizId, sessionName, userId } = req.body;
  let sessionCode = sessionCodeFromName(sessionName);
  let sidecarCode = generateRandomAlphaNumeric(4, "uppercase");
  const newSession = new Session({
    sessionName,
    sessionCode,
    sidecarCode,
    quizData: quizId,
    createdBy: userId,
  });
  
  // Explicitly set a non-empty default value
  newSession.responses = { }; 
  
  await newSession.save();

  addNewSession(newSession);

  const user = await User.findById(userId);
  if (user) {
    user.activeSession = newSession._id;
    await user.save();
  }

  res.json({ sessionCode });
});

// GET fetch session data
router.get("/:sessionCode", async (req, res) => {
  console.log("get session");
  const { sessionCode } = req.params;

  try {
   const payload = await getSessionData(sessionCode);

    res.json(payload);
  } catch (error) {
    console.log(error);
    res.json({ error: error });
  }
});

// GET fetch participant session data
router.get("/participant/:combiCode", async (req, res) => {
  const { combiCode } = req.params;
  const [sessionCode, userId] = [combiCode.slice(0, 5), combiCode.slice(5)];

  try {
    const { payload } = await getSessionDataParticipant(sessionCode, userId);
    res.json(payload);
  } catch (error) {
    console.log("ERROR!!!");
    console.log(error);
    res.json({ error: error });
  }
});

// POST add participant to session
router.post("/:sessionCode/participant", async (req, res) => {
  const { sessionCode } = req.params;
  try {
    const session = await Session.findOne({ sessionCode }).populate("quizData");
    console.log({ X: session });
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    const userId = generateRandomAlphaNumeric(5, "uppercase");
    const idx = session.participants.size + 1;
    const username = `Participant ${idx}`;

    const userData = {
      id: userId,
      username: null,
      defaultName: username,
      status: "active",
      roundStatus: "pendingResponse",
    };

    session.participants.set(userId, userData);

    session.responses.set(
      userId,
      session.quizData.rounds.map((round) => Array(round.length).fill(null))
    );


    await session.save();

    res.json({ userId, username });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// PATCH update participant data
router.patch("/:sessionCode/participant/:userId", async (req, res) => {
  const { sessionCode, userId } = req.params;
  const { payload } = req.body;

  console.log("payload:", payload);

  try {
    const session = await Session.findOne({ sessionCode });

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    if (session.participants.has(userId)) {
      const participant = session.participants.get(userId);
      const allowedKeys = Object.keys(participant);

      for (const key of Object.keys(payload)) {
        if (!allowedKeys.includes(key)) {
          return res.status(400).json({
            error: `Invalid key: ${key}. Only existing keys can be updated.`,
          });
        }

        if (key === "id") {
          throw new Error("id cannot be updated");
        }

        if (key === "username") {
          const duplicate = Array.from(session.participants.values()).some(
            (p) =>
              p.username &&
              p.username.toLowerCase() === payload.username?.toLowerCase() &&
              p !== participant // Ensure we're not comparing with the same participant
          );
          if (duplicate) {
            return res
              .status(400)
              .json({ error: "Participant with username already exists" });
          }
        }
        participant[key] = payload[key];
      }

      session.markModified("participants");
      await session.save();

      return res.status(200).json({ message: "Participant updated" });
    } else {
      return res
        .status(404)
        .json({ error: "Participant not found in the session" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
