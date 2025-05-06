tailwind.config = { darkMode: 'class' }

const menuButton = document.getElementById('menu-button');
const mobileMenu = document.getElementById('mobile-menu');
const darkToggle = document.getElementById('dark-toggle');
const closeMenuButton = document.getElementById('close-menu');
/* const logo = document.querySelector('logo'); */


// Toggle mobile menu
menuButton.addEventListener('click', () => {
  mobileMenu.classList.toggle('-translate-y-full');
  mobileMenu.classList.toggle('translate-y-0');
});

// Close menu when clicking a link
document.querySelectorAll('#mobile-menu a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('-translate-y-full');
    mobileMenu.classList.remove('translate-y-0');
  });
});

  // Close menu on clicking the "X" button
  closeMenuButton.addEventListener('click', () => {
  mobileMenu.classList.add('-translate-y-full');
  mobileMenu.classList.remove('translate-y-0');
});


//Refresh page on click 

// Ensure the DOM is fully loaded before attaching the event
document.addEventListener('DOMContentLoaded', function() {
  // Get the logo element
  const logo = document.querySelector('#logo');

  // Add click event listener
  logo.addEventListener('click', function(event) {
    // Prevent the default anchor link behavior (scrolling)
    event.preventDefault();

    // Scroll smoothly to the #hero section
    document.querySelector('#hero').scrollIntoView({ behavior: 'smooth' });

    // Optionally, refresh the page after a delay (for smoother experience)
    setTimeout(function() {
      location.reload();
    }, 500); // 0.5 second delay before refreshing the page
  });
});


// Loader
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  const content = document.getElementById('content');
  loader.style.opacity = '0';
  setTimeout(() => {
    loader.style.display = 'none';
    content.classList.remove('opacity-0');
  }, 500);
});



AOS.init({
  once: true,
  startEvent: 'DOMContentLoaded',
  duration: 800,
  easing: 'ease-in-out',
});





