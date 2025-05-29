tailwind.config = { darkMode: "class" };

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

          // Додади логика само за navbar
          if (include.id === "navbar-placeholder") {
            // Attach navbar-related listeners
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
              darkToggle.addEventListener("click", () => {
                document.documentElement.classList.toggle("dark");
                localStorage.setItem(
                  "theme",
                  document.documentElement.classList.contains("dark")
                    ? "dark"
                    : "light"
                );
              });

              // Apply saved theme on load
              if (
                localStorage.getItem("theme") === "dark" ||
                (!("theme" in localStorage) &&
                  window.matchMedia("(prefers-color-scheme: dark)").matches)
              ) {
                document.documentElement.classList.add("dark");
              } else {
                document.documentElement.classList.remove("dark");
              }
            }
          }
        })
        .catch((error) => console.error(`Error loading ${include.file}:`, error));
    });
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
