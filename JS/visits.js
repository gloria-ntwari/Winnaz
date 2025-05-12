document.addEventListener('DOMContentLoaded', function() {
    const menuIcon = document.querySelector('.menu-icon');
    const closeIcon = document.querySelector('.close-icon');
    const navLinks = document.querySelector('.nav-link');
  
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

  
  const videoIds = {
    'Half-Day Field visits': 'W37yz6h5dyk?si=xcT-ERp_3_Zg3kZX',
    'Become Winnaz Master Taster!': 'SLFW9H3UFG0?si=DRHd74e7OrNgPtv3',
    'Agronomist -for-a-day': '3bVL5FRpbd0?si=_fEa9csf4Z9csUkd',
    'Produce your own box of crisps': 'hGpqBQybNqs?si=P8iWhSFLygUGpzLo'
};

document.querySelectorAll('.play-button').forEach(button => {
    button.addEventListener('click', () => {
        const videoContainer = button.closest('.image-container');
        const img = videoContainer.querySelector('img');
        const cardTitle = button.closest('.visit-card').querySelector('h2').textContent.trim();
        const videoId = videoIds[cardTitle] || 'rpGSjgaimgw'; // Default to the Winnaz video if not found

        const video = document.createElement('iframe');
        video.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&showinfo=0`;
        video.width = img.width;
        video.height = img.height;
        video.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture';
        video.allowFullscreen = true;
        video.frameBorder = '0';

        // Set proper styling for responsive video
        video.style.position = 'absolute';
        video.style.top = '0';
        video.style.left = '0';
        video.style.width = '100%';
        video.style.height = '100%';

        // Make container relative for absolute positioning of video
        videoContainer.style.position = 'relative';
        videoContainer.style.paddingTop = '56.25%'; // 16:9 aspect ratio

        // Replace image with video
        videoContainer.innerHTML = '';
        videoContainer.appendChild(video);

        // Hide play button
        button.style.display = 'none';
    });
});

// Add error handling for videos
window.addEventListener('error', function(e) {
    if (e.target.tagName.toLowerCase() === 'iframe') {
        const errorMsg = document.createElement('div');
        errorMsg.textContent = 'Sorry, this video is currently unavailable. Please try again later.';
        errorMsg.style.position = 'absolute';
        errorMsg.style.top = '50%';
        errorMsg.style.left = '50%';
        errorMsg.style.transform = 'translate(-50%, -50%)';
        errorMsg.style.backgroundColor = 'rgba(0,0,0,0.7)';
        errorMsg.style.color = 'white';
        errorMsg.style.padding = '20px';
        errorMsg.style.borderRadius = '5px';
        errorMsg.style.textAlign = 'center';
        e.target.parentNode.appendChild(errorMsg);
    }
}, true);