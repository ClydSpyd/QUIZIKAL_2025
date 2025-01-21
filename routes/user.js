const express = require("express");
const router = express.Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const users = await User.find().select(['-password']);
  res.json(users);
})

router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  const user = await User.findById(userId).select(["-password"]).populate({
    path: "activeSession", // Path to populate
    select: "-createdAt -createdBy -quizId", // Include field1 and field2, exclude fieldToExclude
  });
  res.json(user);
})


module.exports = router;