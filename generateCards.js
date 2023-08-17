const cardContainer = document.getElementById("cardContainer");
let pcardsData = []; // Array to hold generated cards data

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

    // Generate all cards
    pcardsData.forEach(cardData => {
      const card = createCard(cardData);
      cardContainer.appendChild(card);
    });
  });
