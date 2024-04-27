document.addEventListener("DOMContentLoaded", function () {
  // Function to generate table of contents
  function generateTableOfContents() {
    // Find the parent container of the publish date element
    var publishDateContainer =
      document.querySelector(".publish-date").parentNode;

    // Check if publish date container exists
    if (!publishDateContainer) {
      console.error("Publish date container not found.");
      return;
    }

    // Create a container for the table of contents
    var tocContainer = document.createElement("div");
    tocContainer.classList.add("table-of-contents");

    // Generate table of contents HTML
    var tocHTML = "<h2>Table of Contents</h2><ul>";

    // Select all headings within the article content
    var headings = document.querySelectorAll("h2, h3, h4, h5, h6");

    // Check if headings exist
    if (!headings || headings.length === 0) {
      console.warn("No headings found in the article content.");
      return;
    }

    // Loop through each heading and generate table of contents entries
    headings.forEach(function (heading) {
      // Get the heading text and ID
      var headingText = heading.innerText;
      var headingId = heading.id;

      // If heading doesn't have an ID, generate one
      if (!headingId) {
        headingId = "heading-" + Math.random().toString(36).substr(2, 9);
        heading.id = headingId;
      }

      // Create a list item with a link to the heading
      tocHTML +=
        '<li><a class="toc-link" href="#' +
        headingId +
        '">' +
        headingText +
        "</a></li>";
    });

    // Close the table of contents HTML
    tocHTML += "</ul>";

    // Set the generated table of contents HTML to the container
    tocContainer.innerHTML = tocHTML;

    // Insert the table of contents after the publish date container
    publishDateContainer.parentNode.insertBefore(
      tocContainer,
      publishDateContainer.nextSibling
    );

    // Add click event listener to table of contents links
    var tocLinks = document.querySelectorAll(".toc-link");
    tocLinks.forEach(function (link) {
      link.addEventListener("click", function (event) {
        event.preventDefault(); // Prevent default link behavior
        var targetId = link.getAttribute("href").substring(1); // Get target ID
        var targetElement = document.getElementById(targetId); // Get target element
        if (targetElement) {
          var offset = 80; // Adjust this value to accommodate the height of your sticky navigation bar
          var targetPosition =
            targetElement.getBoundingClientRect().top +
            window.pageYOffset -
            offset;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Call the function to generate the table of contents
  generateTableOfContents();
});
