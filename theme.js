
// Функција за апдејт на иконата
function updateDarkIcon() {
    const isDark = document.documentElement.classList.contains('dark');
    const darkToggle = document.getElementById('dark-toggle');
    if (darkToggle) {
      darkToggle.textContent = isDark ? '☀️' : '🌙';
    }
  }
  
  // Примени зачувана тема при вчитување
  window.addEventListener('DOMContentLoaded', () => {
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
  
    updateDarkIcon();
  
    // Toggle функционалност ако постои копче
    const darkToggle = document.getElementById('dark-toggle');
    if (darkToggle) {
      darkToggle.addEventListener('click', () => {
        const html = document.documentElement;
  
        if (html.classList.contains('dark')) {
          html.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          html.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
  
        // Без reload
        updateDarkIcon();
      });
    }
  });
  