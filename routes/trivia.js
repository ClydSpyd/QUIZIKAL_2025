const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const localQuestions = require("../data/image_choice.json");
const { OpenAI } = require("openai");

router.get("/image_round", async (req, res) => {
  const idx = Math.floor(Math.random() * localQuestions.length);
  res.json(localQuestions[idx]);
});

router.get("/", async (req, res) => {
  console.log("GET TRIVIA");

  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key not configured");
    return res.status(500).json({ error: "OpenAI API key not configured" });
  }

  const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a trivia question generator that always returns a single JSON object with the following keys: 'question' (string), 'correctAnswer' (string), and 'incorrectAnswers' (array of 3 strings). Do not include explanations or anything outside the JSON object.",
        },
        {
          role: "user",
          content:
            "Give me one intermediate-difficulty general knowledge multiple choice trivia question with one correct answer and three incorrect answers.",
        },
      ],
      temperature: 1.1,
      max_tokens: 300,
    });

    const content = response.choices[0].message.content;

    // Attempt to parse the JSON part safely
    const match = content?.match(/{[\s\S]*}/);
    if (!match) throw new Error("No valid JSON found in OpenAI response");

    const parsed = JSON.parse(match[0]);
    return res.json(parsed);
  } catch (error) {
    console.error("Trivia generation failed:", error);
    return res.status(500).json({
      error: "Failed to generate trivia question",
      details: error.message,
    });
  }
});

router.get("/ninja", async (req, res) => {
  const categories = [
    "artliterature",
    "language",
    "sciencenature",
    "general",
    "fooddrink",
    "peopleplaces",
    "geography",
    "historyholidays",
    "entertainment",
    "toysgames",
    "music",
    "mathematics",
    "religionmythology",
    "sportsleisure",
  ];

  console.log("GET TRIVIA");
  const url = "https://api.api-ninjas.com/v1/trivia";
  const headers = {
    "X-Api-Key": process.env.API_NINJA_KEY,
  };
  const { data } = await axios.get(url, { headers });

  res.json({ data });
});

module.exports = router;
