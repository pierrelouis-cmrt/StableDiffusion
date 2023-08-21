      // Function to show the selected content and title
      function showContent(contentName) {
        // Hide all content divs
        const contentDivs = document.querySelectorAll('.content-howto, .content-more, .content-faq, .content-credits, .content-errors');
        contentDivs.forEach(div => {
          div.style.display = 'none';
        });

        // Hide all titles
        const titleDivs = document.querySelectorAll('.title div');
        titleDivs.forEach(div => {
          div.style.display = 'none';
        });

        // Show the selected content div and title
        const selectedContentDiv = document.querySelector(`.content-${contentName}`);
        const selectedTitleDiv = document.querySelector(`.title-${contentName}`);
        if (selectedContentDiv && selectedTitleDiv) {
          selectedContentDiv.style.display = 'block';
          selectedTitleDiv.style.display = 'block';
        }
      }

      // Select the "How To?" button and title by default
      showContent('howto');