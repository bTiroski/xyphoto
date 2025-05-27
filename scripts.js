tailwind.config = { darkMode: "class" };

document.addEventListener("DOMContentLoaded", function () {
  // Load navbar.html and insert into placeholder
  fetch("navbar.html")
    .then((response) => response.text())
    .then((data) => {
      document.getElementById("navbar-placeholder").innerHTML = data;

      // After navbar is loaded, attach event listeners

      const menuButton = document.getElementById("menu-button");
      const mobileMenu = document.getElementById("mobile-menu");
      const darkToggle = document.getElementById("dark-toggle");
      const closeMenuButton = document.getElementById("close-menu");
      const logo = document.querySelector("#logo");

      // Toggle mobile menu
      menuButton.addEventListener("click", () => {
        mobileMenu.classList.toggle("-translate-y-full");
        mobileMenu.classList.toggle("translate-y-0");
      });

      // Close menu when clicking a link
      document.querySelectorAll("#mobile-menu a").forEach((link) => {
        link.addEventListener("click", (event) => {
          mobileMenu.classList.add("-translate-y-full");
          mobileMenu.classList.remove("translate-y-0");

          // Added logic for index.html# section links:
          const href = link.getAttribute("href");
          if (href && href.startsWith("index.html#")) {
            // If we are already on index.html or root
            if (
              window.location.pathname.endsWith("index.html") ||
              window.location.pathname === "/"
            ) {
              event.preventDefault(); // prevent page reload

              const targetId = href.split("#")[1];
              const targetEl = document.getElementById(targetId);
              if (targetEl) {
                targetEl.scrollIntoView({ behavior: "smooth" });
                // Change URL hash without reload
                history.replaceState(null, null, `#${targetId}`);
              }
            }
            // If we are on another page, do not prevent default, allow navigation
          }
        });
      });

      // Close menu on clicking the "X" button
      closeMenuButton.addEventListener("click", () => {
        mobileMenu.classList.add("-translate-y-full");
        mobileMenu.classList.remove("translate-y-0");
      });

      // Logo click scroll to top
      logo.addEventListener("click", function (event) {
        event.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });

      // Dark mode toggle
      darkToggle.addEventListener("click", () => {
        document.documentElement.classList.toggle("dark");
        if (document.documentElement.classList.contains("dark")) {
          localStorage.setItem("theme", "dark");
        } else {
          localStorage.setItem("theme", "light");
        }
      });

      // On page load, set theme from localStorage
      if (
        localStorage.getItem("theme") === "dark" ||
        (!("theme" in localStorage) &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    })
    .catch((error) => console.error("Error loading navbar:", error));
});

// Loader
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
    content.classList.remove("opacity-0");
  }, 500);
});

AOS.init({
  once: true,
  startEvent: "DOMContentLoaded",
  duration: 800,
  easing: "ease-in-out",
});

window.addEventListener("load", () => {
  document.body.style.overflowX = "hidden";
});

// Scroll to target section if on index.html with a hash in the URL
window.addEventListener("load", () => {
  if (window.location.hash) {
    const targetEl = document.querySelector(window.location.hash);
    if (targetEl) {
      setTimeout(() => {
        targetEl.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  }
});
