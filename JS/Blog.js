document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const navLinks = document.querySelector('.main-nav-links');

  function toggleMenu() {
    navLinks.classList.toggle('show');
    closeIcon.classList.toggle('show');
  }

  function closeMenu() {
    navLinks.classList.remove('show');
    closeIcon.classList.remove('show');
  }

  menuIcon.addEventListener('click', toggleMenu);
  closeIcon.addEventListener('click', closeMenu);

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);
    
    if (!isClickInsideMenu && !isClickOnMenuIcon && navLinks.classList.contains('show')) {
      closeMenu();
    }
  });
});

