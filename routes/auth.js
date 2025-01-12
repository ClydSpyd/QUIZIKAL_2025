const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

const createNewUser = async ({ username, password }) => {
  try {
    // generate hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    // create user
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    // save user
    await newUser.save();

    return { newUser };
  } catch (error) {
    return { error };
  }
};

// register new user
router.post("/register", async (req, res) => {
  // email + password + validate repeat pass + username + avatar
  const { username, password } = req.body;

  const messages = [];
  // check username not null
  if (!username) {
    messages.push("Username not provided");
  }
  // check if password are not null
  if (!password) {
    messages.push("Email or password not provided");
  }

  // check username or email do not already exists
  const existingUser = await User.findOne({ username: username.toLowerCase() });
  if (existingUser) {
    messages.push(`Username '${username.toLowerCase()}' already exists`);
  }

  // return error if any
  if (messages.length > 0) {
    return res.status(400).send({ error: messages });
  }

  // create new user
  const { newUser, error } = await createNewUser({
    username: username.toLowerCase(),
    password,
  });

  // return error is any
  if (error) return res.status(500).json(error);

  // remove password attribute
  delete newUser.password;

  res.status(201).json(newUser);
});

router.post("/login", async (req, res) => {
  console.log("login POST");
  
  const { username, password } = req.body;
  
  if (username == null)
    return res
      .status(400)
      .json({ error: "Username or email should be provided" });

  let user = await User.findOne({ username: username.toLowerCase() })
    // .populate("activeQuiz", "sessionName sessionCode")

  if (!user) {
    return res.status(404).json({ error: "User not found"});
  }

  console.log(user)
  // validate password
  if (await bcrypt.compare(password, user.password)) {
    res.status(200).json({ id: user._id, username: user.username });
  } else {
    console.log("PASSWORD MISMATCH")
    res.status(401).json({ error: "Authentication failed" });
  }

});

module.exports = router;
