tailwind.config = { darkMode: "class" };

// Apply saved theme early (before DOMContentLoaded)
let savedTheme = localStorage.getItem('theme');
if (!savedTheme) {
  savedTheme = 'dark';
  localStorage.setItem('theme', 'dark');
}
if (savedTheme === 'dark') {
  document.documentElement.classList.add('dark');
} else {
  document.documentElement.classList.remove('dark');
}

// Update dark mode icon
function updateDarkIcon() {
  const isDark = document.documentElement.classList.contains('dark');
  const darkToggle = document.getElementById('dark-toggle');
  if (darkToggle) {
    darkToggle.textContent = isDark ? '☀️' : '🌙';
  }
}

// Load includes (navbar, footer)
const includes = [
  { id: "navbar-placeholder", file: "navbar.html" },
  { id: "footer-placeholder", file: "footer.html" }
];

document.addEventListener("DOMContentLoaded", function () {
  includes.forEach((include) => {
    fetch(include.file)
      .then((response) => {
        if (!response.ok) throw new Error(`Failed to load ${include.file}`);
        return response.text();
      })
      .then((data) => {
        document.getElementById(include.id).innerHTML = data;

        if (include.id === "navbar-placeholder") {
          // Wait for elements to exist
          const menuButton = document.getElementById("menu-button");
          const mobileMenu = document.getElementById("mobile-menu");
          const darkToggle = document.getElementById("dark-toggle");
          const closeMenuButton = document.getElementById("close-menu");
          const logo = document.querySelector("#logo");

          if (menuButton && mobileMenu) {
            menuButton.addEventListener("click", () => {
              mobileMenu.classList.toggle("-translate-y-full");
              mobileMenu.classList.toggle("translate-y-0");
            });

            document.querySelectorAll("#mobile-menu a").forEach((link) => {
              link.addEventListener("click", (event) => {
                mobileMenu.classList.add("-translate-y-full");
                mobileMenu.classList.remove("translate-y-0");

                const href = link.getAttribute("href");
                if (href && href.startsWith("index.html#")) {
                  if (
                    window.location.pathname.endsWith("index.html") ||
                    window.location.pathname === "/"
                  ) {
                    event.preventDefault();
                    const targetId = href.split("#")[1];
                    const targetEl = document.getElementById(targetId);
                    if (targetEl) {
                      targetEl.scrollIntoView({ behavior: "smooth" });
                      history.replaceState(null, null, `#${targetId}`);
                    }
                  }
                }
              });
            });
          }

          if (closeMenuButton && mobileMenu) {
            closeMenuButton.addEventListener("click", () => {
              mobileMenu.classList.add("-translate-y-full");
              mobileMenu.classList.remove("translate-y-0");
            });
          }

          if (logo) {
            logo.addEventListener("click", function (event) {
              event.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            });
          }

          if (darkToggle) {
            // Initial icon
            updateDarkIcon();

            // Toggle theme
            darkToggle.addEventListener("click", () => {
              const html = document.documentElement;
              html.classList.toggle("dark");
              localStorage.setItem("theme", html.classList.contains("dark") ? "dark" : "light");
              updateDarkIcon();
            });
          }
        }
      })
      .catch((error) => console.error(`Error loading ${include.file}:`, error));
  });
});

// Loader fade out
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  const content = document.getElementById("content");
  loader.style.opacity = "0";
  setTimeout(() => {
    loader.style.display = "none";
    content.classList.remove("opacity-0");
  }, 500);
});

// AOS init
AOS.init({
  once: true,
  startEvent: "DOMContentLoaded",
  duration: 800,
  easing: "ease-in-out",
});

// Hide horizontal overflow
window.addEventListener("load", () => {
  document.body.style.overflowX = "hidden";
});

// Scroll to target if hash exists
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
