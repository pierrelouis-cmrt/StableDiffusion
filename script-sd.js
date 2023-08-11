// -------------------------------------------------
// Nav Bar
// -------------------------------------------------
let selectedItem = null;

// Get navigation and filter items
const navItems = document.querySelectorAll('a.button');
const filterItems = document.querySelectorAll('a.button-filter');

// Explicitly select ALL filter on init
const allFilter = document.querySelector('a.button-filter[data-filter="all"]');
allFilter.classList.add('selected');
let selectedFilter = allFilter;

// Get the search button
const searchBtn = document.getElementById('searchButton');

// Add event listeners
navItems.forEach(item => {
	item.addEventListener('click', selectNavItem);
});

filterItems.forEach(item => {
	item.addEventListener('click', selectFilter);
});

function selectNavItem() {
	// Unselect search button if home clicked
	if (this.classList.contains('selected')) {
		searchBtn.classList.remove('selected');
	}

	if (this === selectedItem) {
		this.classList.remove('selected');
		selectedItem = null;
	} else {
		this.classList.add('selected');
		if (selectedItem) {
			selectedItem.classList.remove('selected');
		}
		selectedItem = this;
	}
}

function selectFilter() {
	if (this === selectedFilter) return;

	if (selectedFilter) {
		selectedFilter.classList.remove('selected');
	}

	this.classList.add('selected');
	selectedFilter = this;

	// Unselect nav item if selected
	if (selectedItem) {
		selectedItem.classList.remove('selected');
		selectedItem = null;
	}
}

// Search button logic
const searchInput = searchBtn.querySelector('input.search');

searchBtn.addEventListener('click', e => {
	e.preventDefault();
	searchInput.focus();
});


// Home button delay
document.getElementById("delayButton").addEventListener("click", function(event) {
	event.preventDefault();
	this.disabled = true;
	setTimeout(() => {
		window.open(this.href, "_blank");
		this.disabled = false;
	}, 0);
});

// MOBILE NAV BAR -----------------

// Selected status of filter buttons
const buttonFilters = document.querySelectorAll('.mbutton-filter');

// Add event listener to each button-filter
buttonFilters.forEach(button => {
	button.addEventListener('click', () => {
		// Remove the 'selected' class from all button-filters
		buttonFilters.forEach(btn => btn.classList.remove('selected'));
		// Add the 'selected' class to the clicked button-filter
		button.classList.add('selected');
	});
});

// Explicitly select ALL filter on init
const allmFilter = document.querySelector('.mbutton-filter[data-filter="all"]');
allmFilter.classList.add('selected');
let mselectedFilter = allmFilter;

// -------------------------------------------------
// Positive cards system
// -------------------------------------------------


$(document).ready(function() {
  var zindex = 100;

  $("div.pcards").on("click", "div.card", function(e) {
    e.preventDefault();

    var isShowing = false;

    if ($(this).hasClass("show")) {
      isShowing = true;
    }

    if ($("div.pcards").hasClass("showing")) {
      $("div.card.show").removeClass("show");

      if (isShowing) {
        $("div.pcards").removeClass("showing");
      } else {
        $(this).css({
          zIndex: zindex
        }).addClass("show");
      }

      zindex++;
    } else {
      $("div.pcards").addClass("showing");
      $(this).css({
        zIndex: zindex
      }).addClass("show");

      zindex++;
    }
  });
});


// -------------------------------------------------
// Copy buttons pcards
// -------------------------------------------------

function copyDescription(button) {
	var cardElement = button.closest('.card');
	var descriptionToCopy = cardElement.querySelector('.card-description').innerText;
	button.innerText = 'Copied!';

	// Use the Clipboard API to copy the text
	navigator.clipboard.writeText(descriptionToCopy).then(function() {
		// Set a timeout to revert the button text to "Copy" after a brief delay (e.g., 2 seconds)
		setTimeout(function() {
			button.innerText = 'Copy';
		}, 2000);
	}).catch(function(err) {
		console.error('Failed to copy: ', err);
		button.innerText = 'Copy';
	});
}


// -------------------------------------------------
// Copy buttons ncards
// -------------------------------------------------

function copyText(button) {
	var contentElement = button.parentElement;
	var textToCopy = contentElement.querySelector('.ncopy').innerText;
	button.innerText = 'Copied!';

	// Use the Clipboard API to copy the text
	navigator.clipboard.writeText(textToCopy).then(function() {
		// Set a timeout to revert the button text to "Copy" after a brief delay (e.g., 2 seconds)
		setTimeout(function() {
			button.innerText = 'Copy';
		}, 2000);
	}).catch(function(err) {
		console.error('Failed to copy: ', err);
		button.innerText = 'Copy';
	});
}



// -------------------------------------------------
// Filter system
// -------------------------------------------------

let currentFilter = 'all'; // Variable to keep track of the currently selected filter

// Desktop Nav

const filterBtns = document.querySelectorAll('.button-filter');
const pcards = document.querySelector('.pcards');
const ncards = document.querySelector('.ncards');

filterBtns.forEach(btn => {
	btn.addEventListener('click', filterCards);
});

function filterCards() {
	currentFilter = this.dataset.filter; // Update the currentFilter variable

	if (currentFilter === 'all') {
		pcards.style.display = 'flex';
		ncards.style.display = 'flex';
	}

	if (currentFilter === 'positive') {
		pcards.style.display = 'flex';
		ncards.style.display = 'none';
	}

	if (currentFilter === 'negative') {
		pcards.style.display = 'none';
		ncards.style.display = 'grid';
	}

	// After applying the filter, also perform a search if there's a search query
	const searchQuery = searchInputDesktopNav.value;
	filterResults(searchQuery);
}


// Mobile Nav 

const mobileFilterBtns = document.querySelectorAll('.mbutton-filter');

mobileFilterBtns.forEach(btn => {
	btn.addEventListener('click', mfilterCards);
});

function mfilterCards() {
	currentFilter = this.dataset.filter; // Update the currentFilter variable

	if (currentFilter === 'all') {
		pcards.style.display = 'flex';
		ncards.style.display = 'flex';
	}

	if (currentFilter === 'positive') {
		pcards.style.display = 'flex';
		ncards.style.display = 'none';
	}

	if (currentFilter === 'negative') {
		pcards.style.display = 'none';
		ncards.style.display = 'grid';
	}

	// After applying the filter, also perform a search if there's a search query
	const searchQuery = searchInputMobileNav.value;
	filterResults(searchQuery);
}

// -------------------------------------------------
// Search system 
// -------------------------------------------------

// Function to update the grid layout of .ncards based on the number of visible cards
function updateNCardsGridLayout() {
	const visibleCards = document.querySelectorAll(".ncard[style='display: grid;']");
	const numVisibleCards = visibleCards.length;

	const ncardsContainer = document.querySelector(".ncards");

	// Update the grid layout
	function updateLayout(gridColumns) {
		ncardsContainer.style.setProperty('grid-template-columns', `repeat(${gridColumns}, minmax(0, 1fr))`);

		// Check if .ncards need to be centered
		if (gridColumns < 4) {
			ncardsContainer.classList.add("centered");
		} else {
			ncardsContainer.classList.remove("centered");
		}
	}

	// Check if the current filter is "ALL" or "negative"
	if (currentFilter === 'all') {
		// Use as many columns as visible cards
		updateLayout(numVisibleCards);
	}
}

// Function to filter the cards based on the search query
function filterResults(searchQuery = "") {
    const query = searchQuery.toLowerCase().trim();
    let atLeastOnePositiveCardMatches = false;
    let atLeastOneNegativeCardMatches = false;

    // Select positive cards and negative cards within the appropriate containers
    const positiveCards = document.querySelectorAll('.pcards .card');
    const negativeCards = document.querySelectorAll('.ncards .ncard');

    // Loop through each positive card
    positiveCards.forEach((card) => {
        const cardTitle = card.querySelector(".card-title h2")?.innerText || "";
        const cardSmallTitle = card.querySelector(".card-title small")?.innerText || "";
        const cardDescription = card.querySelector(".card-description")?.innerText || "";

        const cardMatches =
            cardTitle.toLowerCase().includes(query) ||
            cardSmallTitle.toLowerCase().includes(query) ||
            cardDescription.toLowerCase().includes(query);

        if (cardMatches) {
            card.style.display = "inline-block";
            atLeastOnePositiveCardMatches = true;
        } else {
            card.style.display = "none";
        }
    });

    // Loop through each negative card
    negativeCards.forEach((card) => {
        const cardTitle = card.querySelector(".ntitle")?.innerText || "";
        const cardDescription = card.querySelector(".description")?.innerText || "";
        const cardCopy = card.querySelector(".ncopy")?.innerText || "";

        const cardMatches =
            cardTitle.toLowerCase().includes(query) ||
            cardDescription.toLowerCase().includes(query) ||
            cardCopy.toLowerCase().includes(query);

        if (cardMatches) {
            card.style.display = "inline-block";
            atLeastOneNegativeCardMatches = true;
        } else {
            card.style.display = "none";
        }
    });

    // Update the grid layout after filtering
    updateNCardsGridLayout();

    // Show a no results message if no cards match the search query
	const noResultsMessage = document.querySelector(".no-results");
	if (
		(currentFilter === "positive" && !atLeastOnePositiveCardMatches) ||
		(currentFilter === "negative" && !atLeastOneNegativeCardMatches) ||
		(currentFilter === "all" && !atLeastOnePositiveCardMatches && !atLeastOneNegativeCardMatches)
	) {
		noResultsMessage.style.display = "block";
	} else {
		noResultsMessage.style.display = "none";
	}
}

// Attach event listener to the search input in the desktop nav bar
const searchInputDesktopNav = document.getElementById("searchInput");
searchInputDesktopNav.addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    filterResults(searchQuery);
});

// Attach event listener to the search input in the mobile nav bar
const searchInputMobileNav = document.querySelector('label input[type="text"]');
searchInputMobileNav.addEventListener("input", (event) => {
    const searchQuery = event.target.value;
    filterResults(searchQuery);
});

// Close the menu and the keyboard when Enter key is pressed in the search input
const menuCheckbox = document.querySelector('input[aria-label="checkbox-menu"]');
searchInputMobileNav.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        menuCheckbox.checked = false; // Uncheck the checkbox to close the menu
        searchInputMobileNav.blur(); // Remove focus from the input to close the keyboard
    }
});


// Call the updateNCardsGridLayout function on page load to set the initial layout
window.addEventListener("load", updateNCardsGridLayout);