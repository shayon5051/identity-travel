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

    let archetype = "🌿 The Healer";
    let destination = "Bali";
    let theme = "Self Discovery";
    let journeyType = "healer";

    const text = input.toLowerCase();

    // Emotional detection

    if (
      text.includes("burnt out") ||
      text.includes("tired") ||
      text.includes("exhausted")
    ) {

      archetype = "🌿 The Healer";
      destination = "Bali";
      theme = "Deep Healing";
      journeyType = "healer";

    }

    else if (
      text.includes("lost") ||
      text.includes("confused")
    ) {

      archetype = "🧠 The Thinker";
      destination = "Bhutan";
      theme = "Clarity";
      journeyType = "thinker";

    }

    else if (
      text.includes("fear") ||
      text.includes("confidence")
    ) {

      archetype = "🏔 The Explorer";
      destination = "Iceland";
      theme = "Courage";
      journeyType = "explorer";

    }

    else if (
      text.includes("heartbreak") ||
      text.includes("breakup")
    ) {

      archetype = "🌿 The Healer";
      destination = "Kyoto";
      theme = "Emotional Recovery";
      journeyType = "healer";

    }

    else if (
      text.includes("peace")
    ) {

      archetype = "🌿 The Healer";
      destination = "Rishikesh";
      theme = "Inner Calm";
      journeyType = "healer";

    }

    
let phases = [];
if (journeyType === "healer") {

phases = [

{
title:"Disconnect",
description:"Release the noise and step away from the digital world."
},

{
title:"Heal",
description:"Reconnect with nature and allow your mind to rest."
},

{
title:"Reflect",
description:"Journal and explore what truly matters."
},

{
title:"Restore",
description:"Build new habits and healthier energy."
},

{
title:"Renew",
description:"Step forward with intention and calm."
}

];

}

if (journeyType === "thinker") {

phases = [

{
title:"Silence",
description:"Create space away from constant stimulation."
},

{
title:"Reflection",
description:"Observe your thoughts without judgment."
},

{
title:"Identity Audit",
description:"Question what truly defines you."
},

{
title:"Purpose Discovery",
description:"Explore what gives your life meaning."
},

{
title:"Future Vision",
description:"Design your next chapter."
}

];

}

if (journeyType === "explorer") {

phases = [

{
title:"Challenge",
description:"Leave your comfort zone."
},

{
title:"Adventure",
description:"Experience something physically demanding."
},

{
title:"Resilience",
description:"Push through discomfort."
},

{
title:"Courage",
description:"Trust yourself in uncertainty."
},

{
title:"Transformation",
description:"Return stronger than before."
}

];

}

    res.json({

  archetype,
  destination,
  theme,
  phases

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