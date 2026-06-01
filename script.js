function selectJourney(type){

  const textarea = document.getElementById("userInput");

  textarea.value = `
I want a ${type} journey.
Help me transform emotionally and mentally through travel.
  `;

  textarea.scrollIntoView({
    behavior:"smooth"
  });

}

/* ================= GENERATE AI JOURNEY ================= */

async function generateAIJourney() {

  const input = document.getElementById("userInput").value;
  const result = document.getElementById("aiResult");

  if (!input) {

    result.innerHTML = `

      <div class="quote-section">

        <h2>Describe Your Emotion First ✨</h2>

        <p>
          Tell Identity Travel how you're feeling to begin your transformation journey.
        </p>

      </div>

    `;

    return;
  }

  // Auto scroll to result section
  document.getElementById("journeySection").scrollIntoView({
    behavior: "smooth"
  });

  // Premium loader
  result.innerHTML = `

    <div class="quote-section">

      <h2>Designing Your Journey ✨</h2>

      <p>
        AI is curating emotional experiences, healing destinations,
        and transformational moments for you.
      </p>

    </div>

  `;

  try {

    const response = await fetch("http://localhost:3000/api/journey", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ input })

    });

    const data = await response.json();

    result.innerHTML = generatePremiumJourney(data.result);

  } catch (error) {

    console.error(error);

    result.innerHTML = `

      <div class="quote-section">

        <h2>Something Went Wrong</h2>

        <p>
          Unable to generate your journey right now.
        </p>

      </div>

    `;

  }

}

/* ================= PREMIUM JOURNEY GENERATOR ================= */

function generatePremiumJourney(text) {

  const cards = [

    {
      title: "Disconnect & Breathe",
      image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
      content: "Slow down, disconnect from digital chaos, and reconnect with your thoughts through peaceful landscapes and mindful reflection."
    },

    {
      title: "Inner Healing",
      image: "https://images.unsplash.com/photo-1518509562904-e7ef99cdcc86?q=80&w=1200&auto=format&fit=crop",
      content: "Immerse yourself in healing experiences designed around mindfulness, emotional release, and personal calm."
    },

    {
      title: "Rediscover Yourself",
      image: "https://images.unsplash.com/photo-1493246507139-91e8fad9978e?q=80&w=1200&auto=format&fit=crop",
      content: "Explore unfamiliar cultures, quiet spaces, and reflective rituals that help you reconnect with your identity."
    },

    {
      title: "Transformation",
      image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop",
      content: "Return with clarity, emotional renewal, and a stronger understanding of who you want to become."
    }

  ];

  let html = "";

  cards.forEach((card, index) => {

    html += `

      <div class="timeline-card">

        <img class="timeline-image" src="${card.image}">

        <div class="timeline-content">

          <div class="timeline-day">
            Phase ${index + 1}
          </div>

          <div class="timeline-title">
            ${card.title}
          </div>

          <div class="timeline-text">
            ${card.content}
          </div>

        </div>

      </div>

    `;

  });

  html += `

    <div class="quote-section">

      <h2>Your Emotional Transformation</h2>

      <p>
        ${text}
      </p>

    </div>

  `;

  return html;

}