/* ========================================
   QADAN TRAVELS - JAVASCRIPT
   ======================================== */

// Tailwind Configuration
tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        primary: {
          50: "#fef7ee",
          100: "#fdedd3",
          200: "#fad7a5",
          300: "#f7b86d",
          400: "#f39233",
          500: "#f0730a",
          600: "#e15a05",
          700: "#ba4408",
          800: "#94360e",
          900: "#772e0f",
        },
        secondary: {
          50: "#f0f9ff",
          100: "#e0f2fe",
          200: "#bae6fd",
          300: "#7dd3fc",
          400: "#38bdf8",
          500: "#0ea5e9",
          600: "#0284c7",
          700: "#0369a1",
          800: "#075985",
          900: "#0c4a6e",
        },
        neutral: {
          50: "#fafafa",
          100: "#f5f5f5",
          200: "#e5e5e5",
          300: "#d4d4d4",
          400: "#a3a3a3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
        },
      },
      spacing: {
        18: "4.5rem",
        88: "22rem",
        128: "32rem",
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out",
        "slide-up": "slideUp 0.6s ease-out",
        "scale-in": "scaleIn 0.4s ease-out",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
      },
    },
  },
};

// Initialize AOS (Animate On Scroll)
AOS.init({
  duration: 800,
  easing: "ease-in-out",
  once: true,
  offset: 100,
  disable: false,
  startEvent: "DOMContentLoaded",
  initClassName: "aos-init",
  animatedClassName: "aos-animate",
  useClassNames: false,
  disableMutationObserver: false,
  debounceDelay: 50,
  throttleDelay: 99,
});

// Mobile Menu Functionality
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

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Active Navigation State
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Form Submission with Better UX
const form = document.querySelector("form");
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form data
    const formData = new FormData(form);
    const name = formData.get("name");

    // Show loading state
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = "Sending...";
    submitBtn.disabled = true;

    // Simulate form submission
    setTimeout(() => {
      // Reset form
      form.reset();

      // Show success message
      const successMessage = document.createElement("div");
      successMessage.className =
        "fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50";
      successMessage.textContent = `Thanks ${name}! I'll get back to you within 24 hours.`;
      document.body.appendChild(successMessage);

      // Remove success message after 5 seconds
      setTimeout(() => {
        successMessage.remove();
      }, 5000);

      // Reset button
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Loading Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("loaded");
    }
  });
}, observerOptions);

// Observe all elements with loading class
document.querySelectorAll(".loading").forEach((el) => {
  observer.observe(el);
});

// Parallax Effect for Hero Section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector("#home");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Package selection functionality
document.addEventListener("DOMContentLoaded", function () {
  // Add click listeners to package "Get Started" buttons
  const packageButtons = document.querySelectorAll('a[href="#contact"]');
  packageButtons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Find the package name from the parent card
      const packageCard = this.closest(".bg-white.rounded-2xl");
      if (packageCard) {
        const packageName = packageCard.querySelector("h3").textContent;

        // Scroll to contact form
        document
          .getElementById("contact")
          .scrollIntoView({ behavior: "smooth" });

        // Pre-fill the form with selected package
        setTimeout(() => {
          const selectElement = document.getElementById("collaboration-type");
          if (selectElement) {
            // Find matching option based on package name
            const options = selectElement.querySelectorAll("option");
            for (let option of options) {
              if (
                option.textContent
                  .toLowerCase()
                  .includes(packageName.toLowerCase())
              ) {
                selectElement.value = option.value;
                break;
              }
            }
          }

          // Focus on the first input field
          const nameInput = document.getElementById("name");
          if (nameInput) {
            nameInput.focus();
          }
        }, 500);
      }
    });
  });
});

// Legacy service selection function (for backward compatibility)
function selectService(serviceType) {
  // Scroll to contact form
  document.getElementById("contact").scrollIntoView({ behavior: "smooth" });

  // Pre-fill the form with selected service
  const selectElement = document.getElementById("collaboration-type");
  if (selectElement) {
    switch (serviceType) {
      case "story-mention":
        selectElement.value = "story-mention";
        break;
      case "story-reel":
        selectElement.value = "story-reel";
        break;
      case "complete":
        selectElement.value = "complete-content";
        break;
    }
  }

  // Add a small delay to ensure smooth scroll completes
  setTimeout(() => {
    // Focus on the first input field
    const nameInput = document.getElementById("name");
    if (nameInput) {
      nameInput.focus();
    }
  }, 500);
}

// Modal Functions (Currently Commented Out)
/*
function openPackagesModal() {
  document.getElementById("packagesModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closePackagesModal() {
  document.getElementById("packagesModal").classList.add("hidden");
  document.body.style.overflow = "auto";
}

function selectPackage(packageType) {
  // Close modal
  closePackagesModal();

  // Scroll to contact form
  document
    .getElementById("contact")
    .scrollIntoView({ behavior: "smooth" });

  // Pre-fill the form with selected package
  const selectElement = document.getElementById("collaboration-type");
  if (selectElement) {
    switch (packageType) {
      case "social-media":
        selectElement.value = "social-media";
        break;
      case "story-engagement":
        selectElement.value = "story-engagement";
        break;
      case "complete-content":
        selectElement.value = "complete-content";
        break;
      case "custom":
        selectElement.value = "custom";
        break;
    }
  }
}

// Modal event listeners
document
  .getElementById("packagesModal")
  .addEventListener("click", function (e) {
    if (e.target === this) {
      closePackagesModal();
    }
  });

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    closePackagesModal();
  }
});
*/
