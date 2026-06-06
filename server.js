import dotenv from "dotenv";
dotenv.config();

import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash"
});

import express from "express";
import cors from "cors";

const app = express();

app.use(cors());
app.use(express.json());

/* ================= TEST ROUTE ================= */

app.get("/", (req, res) => {
  res.send("🚀 Identity Travel Server Running");
});

/* ================= AI JOURNEY ROUTE ================= */

app.post("/api/journey", async (req, res) => {

  try {

    const { input } = req.body;

    const prompt = `
You are Identity Travel AI.

Analyze the user's emotional state.

Return ONLY valid JSON.

{
  "archetype":"",
  "destination":"",
  "theme":"",
  "story":"",
  "phases":[
    {
      "title":"",
      "description":""
    }
  ]
}

User Input:
${input}
`;

    const result = await model.generateContent(prompt);

    const text = result.response.text();

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const journey = JSON.parse(cleaned);

    res.json(journey);

  } catch (error) {

    console.error(error);

    res.status(500).json({
      error: "Error generating journey."
    });

  }

});


/* ================= START SERVER ================= */

const PORT = 3000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});