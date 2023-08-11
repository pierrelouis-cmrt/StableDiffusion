const cardContainer = document.getElementById("cardContainer");
let pcardsData = []; // Array to hold generated cards data
let isGeneratingCards = false; // Track whether cards are currently being generated

// Load JSON data
fetch("cards.json")
  .then(response => response.json())
  .then(cardsData => {
    pcardsData = cardsData; // Store the cards data

    // Function to create a card element
    function createCard(cardData) {
      const cardDiv = document.createElement("div");
      cardDiv.className = "card";
      cardDiv.innerHTML = `
        <div class="card__image-holder">
          <img class="card__image" src="${cardData.imageSrc}" />
        </div>
        <div class="card-title">
          <a class="toggle-info btn"> <span class="left"></span> <span class="right"></span> </a>
          <h2>${cardData.title}<small>${cardData.smallTitle}</small></h2>
        </div>
        <div class="card-flap flap1">
          <hr />
          <div class="card-description">${cardData.description}</div>
          <hr />
          <div class="card-flap flap2">
            <div class="card-actions"> <a class="btn" onclick="copyDescription(this)">Copy</a> </div>
          </div>
        </div>
      `;
      return cardDiv;
    }

    // Function to check if an element is visible in the viewport
    function isElementInViewport(el) {
      const rect = el.getBoundingClientRect();
      return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
      );
    }

    // Generate cards when visible
    function generateVisibleCards() {
      if (isGeneratingCards) return; // If cards are currently being generated, exit

      isGeneratingCards = true; // Set the generating flag

      let cardsToGenerate = pcardsData.filter(cardData => !cardData.generated && isElementInViewport(cardContainer));

      function generateNextCard() {
        if (cardsToGenerate.length === 0) {
          isGeneratingCards = false; // Reset the generating flag
          return;
        }

        const cardData = cardsToGenerate.shift(); // Get the first card to generate
        const card = createCard(cardData);
        cardContainer.appendChild(card);
        cardData.generated = true; // Mark the card as generated

        // Use setTimeout to introduce a delay between card generations
        setTimeout(generateNextCard, 50); // Adjust the delay as needed
      }

      generateNextCard(); // Start generating cards
    }

    // Call generateVisibleCards initially and on scroll
    generateVisibleCards();
    window.addEventListener("scroll", generateVisibleCards);
  });
