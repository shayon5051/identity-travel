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

    console.log("Incoming:", input);

    let mood = "self-discovery";
    let destination = "Bali";
    let energy = "healing";

    const text = input.toLowerCase();

    // Emotional detection

    if (
      text.includes("burnt out") ||
      text.includes("tired") ||
      text.includes("exhausted")
    ) {

      mood = "deep rest and healing";
      destination = "Bali";
      energy = "peaceful healing";

    }

    else if (
      text.includes("lost") ||
      text.includes("confused")
    ) {

      mood = "clarity and direction";
      destination = "Himachal";
      energy = "reflection";

    }

    else if (
      text.includes("fear") ||
      text.includes("confidence")
    ) {

      mood = "confidence and courage";
      destination = "Iceland";
      energy = "adventure";

    }

    else if (
      text.includes("heartbreak") ||
      text.includes("breakup")
    ) {

      mood = "emotional recovery";
      destination = "Kyoto";
      energy = "self-love";

    }

    else if (
      text.includes("peace")
    ) {

      mood = "inner calm and grounding";
      destination = "Rishikesh";
      energy = "mindfulness";

    }

    /* ================= AI-LIKE RESPONSE ================= */

    const response = `

🌍 Your 5-Day Identity Journey

Theme: ${mood}

Recommended Destination:
${destination}

Energy:
${energy}

Day 1 — Disconnect
• Digital detox
• Sunset journaling
• Reflect on what drains your energy

Day 2 — Slow Down
• Nature walk
• Meditation session
• Practice mindful breathing

Day 3 — Explore Yourself
• Visit a cultural/artistic place
• Write about your ideal future self
• Try something unfamiliar

Day 4 — Rebuild Identity
• Solo café reflection
• Create a new life vision
• List habits to leave behind

Day 5 — Transformation
• Sunrise gratitude session
• Write your “new identity statement”
• Design your next 30 days intentionally

✨ This journey is not about escaping life.
It’s about rediscovering who you truly are.

`;

    res.json({
      result: response
    });

  } catch (error) {

    console.error(error);

    res.status(500).json({
      result: "Error generating journey."
    });

  }

});

/* ================= START SERVER ================= */

const PORT = 3000;

app.listen(PORT, () => {

  console.log(`🚀 Server running on port ${PORT}`);

});