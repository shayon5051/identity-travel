const journeyImages = {

  healer: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    "https://images.unsplash.com/photo-1494526585095-c41746248156e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  ],

  thinker: [
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1469474968028-56623f02e42e",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e"
  ],

  explorer: [
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    "https://images.unsplash.com/photo-1441974231531-c6227db76b6e",
    "https://images.unsplash.com/photo-1470770841072-f978cf4d019e"
  ]

};

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

    const response = await fetch("https://identity-travel.onrender.com/api/journey", {

      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },

      body: JSON.stringify({ input })

    });

    const data = await response.json();
    console.log("API Response:", data);
    const archetype = data.archetype;
    const destination = data.destination;
    const theme = data.theme;
    const phases = data.phases;

    result.innerHTML = generatePremiumJourney(
    archetype,
    destination,
    theme,
    phases
    );

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

function generatePremiumJourney(archetype, destination, theme, phases) {

  let story = "";

if (archetype.includes("Healer")) {

    story = `
    You have been carrying more than you realize.

    This journey is designed to help you release mental noise,
    reconnect with yourself,
    and return with renewed energy.
    `;

}

else if (archetype.includes("Thinker")) {

    story = `
    You are searching for clarity, not answers.

    This journey creates space to reflect,
    question assumptions,
    and discover your next direction.
    `;

}

else if (archetype.includes("Explorer")) {

    story = `
    Growth is waiting outside your comfort zone.

    This journey is designed to help you embrace uncertainty,
    build confidence,
    and uncover strengths you haven't yet met.
    `;

}

console.log("Archetype:", archetype);
console.log("Story:", story);

    let html = `
    
    <div class="identity-reveal">

    <p class="identity-label">
        YOU ARE BECOMING
    </p>

    <h1 class="identity-title">
        ${archetype}
    </h1>

    <p class="identity-story">
    ${story}
</p>

    <div class="identity-details">

        <div class="detail-card">

            <div class="detail-label">
                📍 DESTINATION
            </div>

            <h3>${destination}</h3>

            <p>
                Sacred spaces designed for reflection and renewal.
            </p>

        </div>

        <div class="detail-card">

            <div class="detail-label">
                ✨ TRANSFORMATION
            </div>

            <h3>${theme}</h3>

            <p>
                The emotional shift this journey is designed to create.
            </p>

        </div>

    </div>

</div>

</div>

    <div class="timeline">
    `;

    phases.forEach((phase, index) => {

      let imageType = "healer";

if (archetype.includes("Thinker")) {
  imageType = "thinker";
}

if (archetype.includes("Explorer")) {
  imageType = "explorer";
}

const image = journeyImages[imageType][index];

        html += `

        <div class="timeline-card">

  <img
    src="${image}"
    class="timeline-image"
    alt="${phase.title}"
  >

  <div class="timeline-content">

                <div class="day-number">
                    Phase ${index + 1}
                </div>

                <h2>
                    ${phase.title}
                </h2>

                <p>
                    ${phase.description}
                </p>

            </div>

        </div>

        `;

    });

    html += `

    </div>

    <div class="transformation-quote">

        <h2>
            Your Transformation Begins Here
        </h2>

        <p>
            This journey is not about escaping life.

            It is about reconnecting with who you truly are.

            Every destination, every reflection, and every experience
            is designed to help you return stronger, calmer and more aligned.
        </p>

    </div>

    `;

    return html;

}