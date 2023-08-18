// Custom shuffle function to shuffle array elements randomly
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

// Fetch the JSON data from the promptmodifiers.json file
fetch('promptmodifiers.json')
  .then(response => response.json())
  .then(data => {
    const cardsContainer = document.getElementById('cards-container');
    const categories = data.map(category => category);

    // Shuffle the categories randomly
    shuffleArray(categories);

    // Generate cards dynamically based on the shuffled categories
    categories.forEach(category => {
      const tagNumber = categories.indexOf(category) + 1;

      category.options.forEach(option => {
        const card = document.createElement('div');
        card.classList.add('card');

        const title = document.createElement('span');
        title.classList.add('card-title');
        // Generate a unique two-word title based on the option content
        const titleWords = option.split(', ')[0].split(' ');
        const cardTitle = titleWords.map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
        title.textContent = cardTitle;
        card.appendChild(title);

        const cardTags = document.createElement('div');
        cardTags.classList.add('card-tags');
        // Add tag-0 to all cards
        const tag0 = document.createElement('div');
        tag0.classList.add('card-tag', 'tag-0');
        tag0.textContent = 'Add-on';
        cardTags.appendChild(tag0);
        // Add the corresponding tag from the category
        const secondTag = document.createElement('div');
        secondTag.classList.add('card-tag', `tag-${tagNumber}`);
        secondTag.textContent = category.name;
        cardTags.appendChild(secondTag);
        card.appendChild(cardTags);

        const cardDescription = document.createElement('span');
        cardDescription.classList.add('card-description');
        cardDescription.textContent = option;
        card.appendChild(cardDescription);

        cardsContainer.appendChild(card);
      });
    });
  });