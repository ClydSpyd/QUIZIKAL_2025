const { default: axios } = require("axios");
const express = require("express");
const router = express.Router();
const localQuestions = require("../data/image_choice.json");
const OpenAIApi = require("openai");

router.get("/image_round", async (req, res) => {
  const idx = Math.floor(Math.random() * localQuestions.length);
  res.json(localQuestions[idx]);
});

router.get("/", async (req, res) => {
  console.log("GET TRIVIA")
  if (!process.env.OPENAI_API_KEY) {
    console.error("OpenAI API key not configured");
    throw new Error("OpenAI API key not configured");
  }

  const openai = new OpenAIApi({
    apiKey: process.env.OPENAI_API_KEY,
  });
  const prompt =
    "provide an intermediate-difficult multiple choice general knowledge trivia question. Provide 1 correct answer and three incorrect answer. Return this information in a json with the following keys: question, correctAnswer, incorrectAnswers";

  try {
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo-instruct",
      prompt,
      temperature: 1.1,
      max_tokens: 1550,
    });
    console.log(completion)
    console.log(completion.choices[0])
    res.json(JSON.parse(completion.choices[0].text));
  } catch (error) {
    console.log(error)
    res.json({ error });
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
