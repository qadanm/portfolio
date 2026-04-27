/* ========================================
   NAVIGATION CONTEXT SYSTEM
   ======================================== */

// Navigation context detection
function detectPageContext() {
  const path = window.location.pathname;
  const filename = path.split("/").pop();

  // Determine page type
  if (filename === "index.html" || filename === "" || filename === "travels/") {
    return "home";
  } else if (filename === "blog.html" || filename === "why-blog-posts.html") {
    return "blog-page";
  } else if (path.includes("/posts/")) {
    return "blog-post";
  }

  return "home"; // Default fallback
}

// Load navigation component
function loadNavigation() {
  const context = detectPageContext();
  const navContainer = document.getElementById("navigation-container");

  if (!navContainer) return;

  let navPath;
  if (context === "blog-post") {
    navPath = "../assets/components/blog-navigation.html";
  } else if (context === "blog-page") {
    navPath = "assets/components/blog-navigation.html";
  } else {
    navPath = "assets/components/navigation.html";
  }

  fetch(navPath)
    .then((response) => response.text())
    .then((html) => {
      navContainer.innerHTML = html;
      initializeNavigation();
      // Initialize scroll-based active states after navigation is loaded
      initializeScrollBasedActiveStates();
    })
    .catch((error) => {
      console.error("Error loading navigation:", error);
      // Fallback navigation
      navContainer.innerHTML = createFallbackNavigation(context);
      initializeNavigation();
      // Initialize scroll-based active states after fallback navigation is loaded
      initializeScrollBasedActiveStates();
    });
}

// Load footer component
function loadFooter() {
  const context = detectPageContext();
  const footerContainer = document.getElementById("footer-container");

  if (!footerContainer) return;

  let footerPath;
  if (context === "blog-post") {
    footerPath = "../assets/components/blog-footer.html";
  } else if (context === "blog-page") {
    footerPath = "assets/components/blog-footer.html";
  } else {
    footerPath = "assets/components/footer.html";
  }

  fetch(footerPath)
    .then((response) => response.text())
    .then((html) => {
      footerContainer.innerHTML = html;
    })
    .catch((error) => {
      console.error("Error loading footer:", error);
      // Fallback footer
      footerContainer.innerHTML = createFallbackFooter(context);
    });
}

// Initialize navigation functionality
function initializeNavigation() {
  // Mobile menu toggle
  const mobileMenuButton = document.getElementById("mobile-menu-button");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuButton && mobileMenu) {
    mobileMenuButton.addEventListener("click", () => {
      mobileMenu.classList.toggle("open");
    });

    // Close mobile menu when clicking on a link
    const mobileMenuLinks = mobileMenu.querySelectorAll("a");
    mobileMenuLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.remove("open");
      });
    });
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
        });
      }
    });
  });

  // Update active navigation based on context
  updateActiveNavigation(context);
}

// Initialize scroll-based active states (runs after navigation is loaded)
function initializeScrollBasedActiveStates() {
  const context = detectPageContext();

  // Only run scroll-based active states on home page
  if (context !== "home") return;

  // Small delay to ensure DOM is fully ready
  setTimeout(() => {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    if (sections.length === 0 || navLinks.length === 0) {
      console.log(
        "No sections or nav links found for scroll-based active states"
      );
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: "0px",
      threshold: 0.3,
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href && href.includes(entry.target.id)) {
              link.classList.add("active");
            }
          });
        }
      });
    }, observerOptions);

    sections.forEach((section) => {
      observer.observe(section);
    });

    console.log(
      `Initialized scroll-based active states for ${sections.length} sections`
    );
  }, 100);
}

// Update active navigation based on context
function updateActiveNavigation(context) {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.classList.remove("active");

    const href = link.getAttribute("href");
    if (!href) return;

    // Determine if this link should be active
    if (context === "home" && (href === "index.html" || href === "#")) {
      link.classList.add("active");
    } else if (context === "blog-page" && href.includes("blog.html")) {
      link.classList.add("active");
    } else if (context === "blog-post" && href.includes("blog.html")) {
      link.classList.add("active");
    }
  });
}

// Fallback navigation for when fetch fails
function createFallbackNavigation(context) {
  if (context === "blog-post") {
    return `
      <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="logo-circle">
                <img src="../assets/images/logo.jpg" alt="Qadan Travels Logo" />
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">Qadan Travels</h1>
                <p class="text-xs text-gray-500">Content Creator</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <a href="../index.html" class="text-gray-600 hover:text-gray-900 transition-colors">← Back to Home</a>
              <a href="blog.html" class="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  } else if (context === "blog-page") {
    return `
      <nav class="bg-white shadow-sm sticky top-0 z-50">
        <div class="max-w-6xl mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
              <div class="logo-circle">
                <img src="assets/images/logo.jpg" alt="Qadan Travels Logo" />
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">Qadan Travels</h1>
                <p class="text-xs text-gray-500">Content Creator</p>
              </div>
            </div>
            <div class="flex items-center space-x-4">
              <a href="index.html" class="text-gray-600 hover:text-gray-900 transition-colors">← Back to Home</a>
              <a href="blog.html" class="text-gray-600 hover:text-gray-900 transition-colors">Blog</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  } else {
    return `
      <nav class="fixed top-0 w-full bg-white/95 backdrop-blur-lg z-50 border-b border-neutral-200">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">
            <div class="flex items-center space-x-3">
              <div class="logo-circle">
                <img src="assets/images/logo.jpg" alt="Qadan Travels Logo" />
              </div>
              <div>
                <h1 class="text-xl font-bold text-neutral-900">Qadan Travels</h1>
                <p class="text-xs text-neutral-500">Content Creator</p>
              </div>
            </div>
            <div class="hidden md:flex items-center space-x-8">
              <a href="index.html" class="nav-link text-neutral-600 hover:text-neutral-900 transition-colors">Home</a>
              <a href="index.html#about" class="nav-link text-neutral-600 hover:text-neutral-900 transition-colors">About</a>
              <a href="index.html#services" class="nav-link text-neutral-600 hover:text-neutral-900 transition-colors">Services</a>
              <a href="index.html#portfolio" class="nav-link text-neutral-600 hover:text-neutral-900 transition-colors">Portfolio</a>
              <a href="blog.html" class="nav-link text-neutral-600 hover:text-neutral-900 transition-colors">Blog</a>
              <a href="index.html#contact" class="nav-link text-neutral-600 hover:text-neutral-900 transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </nav>
    `;
  }
}

// Fallback footer for when fetch fails
function createFallbackFooter(context) {
  if (context === "blog-post") {
    return `
      <footer class="bg-gray-900 text-white py-12 mt-16">
        <div class="max-w-4xl mx-auto px-4 text-center">
          <div class="flex items-center justify-center space-x-3 mb-6">
            <div class="logo-circle">
              <img src="../assets/images/logo.jpg" alt="Qadan Travels Logo" />
            </div>
            <div>
              <h3 class="text-xl font-bold">Qadan Travels</h3>
              <p class="text-sm text-gray-400">Content Creator</p>
            </div>
          </div>
          <p class="text-gray-400 mb-6">
            Content creator based in South Bay, LA. Creating Google reviews, SEO content, and professional photos that help local businesses grow.
          </p>
          <div class="flex justify-center space-x-6">
            <a href="../index.html" class="text-gray-400 hover:text-white transition-colors">Home</a>
            <a href="../index.html#about" class="text-gray-400 hover:text-white transition-colors">About</a>
            <a href="../index.html#contact" class="text-gray-400 hover:text-white transition-colors">Contact</a>
            <a href="blog.html" class="text-gray-400 hover:text-white transition-colors">Blog</a>
          </div>
        </div>
      </footer>
    `;
  } else {
    return `
      <footer class="bg-neutral-900 text-white py-16 mt-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center">
            <div class="flex items-center justify-center space-x-3 mb-6">
              <div class="logo-circle">
                <img src="assets/images/logo.jpg" alt="Qadan Travels Logo" />
              </div>
              <div>
                <h3 class="text-xl font-bold">Qadan Travels</h3>
                <p class="text-sm text-neutral-400">Content Creator</p>
              </div>
            </div>
            <p class="text-neutral-400 mb-6">
              Content creator based in South Bay, LA. Creating Google reviews, SEO content, and professional photos that help local businesses grow.
            </p>
            <div class="flex justify-center space-x-6">
              <a href="index.html" class="text-neutral-400 hover:text-white transition-colors">Home</a>
              <a href="index.html#about" class="text-neutral-400 hover:text-white transition-colors">About</a>
              <a href="index.html#services" class="text-neutral-400 hover:text-white transition-colors">Services</a>
              <a href="blog.html" class="text-neutral-400 hover:text-white transition-colors">Blog</a>
              <a href="index.html#contact" class="text-neutral-400 hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

// Initialize the navigation system when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  loadNavigation();
  loadFooter();
});
