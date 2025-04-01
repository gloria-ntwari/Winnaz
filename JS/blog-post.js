document.addEventListener('DOMContentLoaded', function() {
  const menuIcon = document.querySelector('.menu-icon');
  const closeIcon = document.querySelector('.close-icon');
  const navLinks = document.querySelector('.nav-linkS');

  function toggleMenu() {
    navLinks.classList.toggle('show');
    document.body.style.overflow = navLinks.classList.contains('show') ? 'hidden' : 'auto';
  }

  menuIcon.addEventListener('click', toggleMenu);
  closeIcon.addEventListener('click', toggleMenu);

  // Close menu when clicking on a nav link
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', toggleMenu);
  });

  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    const isClickInsideMenu = navLinks.contains(event.target);
    const isClickOnMenuIcon = menuIcon.contains(event.target);

    if (!isClickInsideMenu && !isClickOnMenuIcon && navLinks.classList.contains('show')) {
      toggleMenu();
    }
  });

  // Close menu when window is resized to desktop view
  window.addEventListener('resize', function() {
    if (window.innerWidth > 768 && navLinks.classList.contains('show')) {
      navLinks.classList.remove('show');
      document.body.style.overflow = 'auto';
    }
  });
});

