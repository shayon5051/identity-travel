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

    let html = `
    
    <div class="journey-summary">

        <div class="summary-badge">
            ${archetype}
        </div>

        <div class="summary-badge">
            📍 ${destination}
        </div>

        <div class="summary-badge">
            ✨ ${theme}
        </div>

    </div>

    <div class="timeline">
    `;

    phases.forEach((phase, index) => {

        html += `

        <div class="timeline-card">

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