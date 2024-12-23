document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Functionality
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

    // Hero Slider Functionality
    const heroSlides = document.querySelectorAll('.hero .slides');
    const heroPrevBtn = document.querySelector('.hero .prevs');
    const heroNextBtn = document.querySelector('.hero .nexts');
    let currentHeroSlide = 0;
    let isHeroAnimating = false;
    let heroInterval;

    // Fade out hero slide
    function fadeOutHero(element) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.classList.remove('active');
                resolve();
            }, 300);
        });
    }

    // Fade in hero slide
    function fadeInHero(element) {
        element.classList.add('active');
        setTimeout(() => {
            element.style.opacity = '1';
        }, 50);
    }

    // Update hero slide with animation
    async function updateHeroSlide(index) {
        if (isHeroAnimating) return;
        isHeroAnimating = true;

        // Fade out current slide
        await fadeOutHero(heroSlides[currentHeroSlide]);

        // Update current slide
        currentHeroSlide = (index + heroSlides.length) % heroSlides.length;
        
        // Fade in new slide
        fadeInHero(heroSlides[currentHeroSlide]);

        setTimeout(() => {
            isHeroAnimating = false;
        }, 300);
    }

    // Event listeners for hero navigation
    heroPrevBtn.addEventListener('click', () => {
        stopHeroSlideShow();
        updateHeroSlide(currentHeroSlide - 1);
        startHeroSlideShow();
    });

    heroNextBtn.addEventListener('click', () => {
        stopHeroSlideShow();
        updateHeroSlide(currentHeroSlide + 1);
        startHeroSlideShow();
    });

    // Auto-advance hero slides
    function startHeroSlideShow() {
        stopHeroSlideShow(); // Clear any existing interval
        heroInterval = setInterval(() => {
            updateHeroSlide(currentHeroSlide + 1);
        }, 5000); // Change slide every 5 seconds
    }

    function stopHeroSlideShow() {
        if (heroInterval) {
            clearInterval(heroInterval);
        }
    }

    // Pause slideshow on hover
    const heroSection = document.querySelector('.hero');
    heroSection.addEventListener('mouseenter', stopHeroSlideShow);
    heroSection.addEventListener('mouseleave', startHeroSlideShow);

    // Add keyboard navigation for hero slider
    document.addEventListener('keydown', (e) => {
        if (!isHeroAnimating) {
            if (e.key === 'ArrowLeft') {
                stopHeroSlideShow();
                updateHeroSlide(currentHeroSlide - 1);
                startHeroSlideShow();
            } else if (e.key === 'ArrowRight') {
                stopHeroSlideShow();
                updateHeroSlide(currentHeroSlide + 1);
                startHeroSlideShow();
            }
        }
    });

    // Initialize hero slider
    fadeInHero(heroSlides[0]);
    startHeroSlideShow();

    // Testimonial Slider
    const slides = document.querySelectorAll('.testimonial-slide');
    const dotsContainer = document.querySelector('.nav-dots');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');

    let currentSlide = 0;
    let isAnimating = false;

    // Create dots based on slides length
    slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = `nav-dots ${index === 0 ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            if (!isAnimating && currentSlide !== index) {
                updateSlide(index);
            }
        });
        dotsContainer.appendChild(dot);
    });

    // Update dots
    function updateDots() {
        document.querySelectorAll('.nav-dots').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Fade out content
    function fadeOut(element) {
        return new Promise(resolve => {
            element.style.opacity = '0';
            setTimeout(() => {
                element.classList.remove('active');
                resolve();
            }, 300);
        });
    }

    // Fade in content
    function fadeIn(element) {
        element.classList.add('active');
        setTimeout(() => {
            element.style.opacity = '1';
        }, 50);
    }

    // Update slide content with animation
    async function updateSlide(index) {
        if (isAnimating) return;
        isAnimating = true;

        // Fade out current slide
        await fadeOut(slides[currentSlide]);

        // Update current slide
        currentSlide = index;
        
        // Fade in new slide
        fadeIn(slides[currentSlide]);
        
        // Update navigation dots
        updateDots();

        setTimeout(() => {
            isAnimating = false;
        }, 300);
    }

    // Event listeners for navigation
    prevBtn.addEventListener('click', () => {
        if (!isAnimating) {
            const newIndex = (currentSlide - 1 + slides.length) % slides.length;
            updateSlide(newIndex);
        }
    });

    nextBtn.addEventListener('click', () => {
        if (!isAnimating) {
            const newIndex = (currentSlide + 1) % slides.length;
            updateSlide(newIndex);
        }
    });

    // Auto-advance slides
    let slideInterval;

    function startSlideShow() {
        slideInterval = setInterval(() => {
            const newIndex = (currentSlide + 1) % slides.length;
            updateSlide(newIndex);
        }, 5000); // Change slide every 5 seconds
    }

    function stopSlideShow() {
        clearInterval(slideInterval);
    }

    // Start/stop auto-advance on hover
    document.querySelector('.testimonial-content').addEventListener('mouseenter', stopSlideShow);
    document.querySelector('.testimonial-content').addEventListener('mouseleave', startSlideShow);

    // Initialize first slide
    updateSlide(0);
    startSlideShow();

    // Add keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!isAnimating) {
            if (e.key === 'ArrowLeft') {
                const newIndex = (currentSlide - 1 + slides.length) % slides.length;
                updateSlide(newIndex);
            } else if (e.key === 'ArrowRight') {
                const newIndex = (currentSlide + 1) % slides.length;
                updateSlide(newIndex);
            }
        }
    });

    // Responsive behavior
    function handleResponsive() {
        if (window.innerWidth > 780) {
            navLinks.classList.remove('show');
        }
    }

    window.addEventListener('resize', handleResponsive);
    handleResponsive();
});


document.addEventListener("DOMContentLoaded", function () {
    const testimonials = document.querySelectorAll(".testimonial");
    const dots = document.querySelectorAll(".nav-dot");
    const prevButton = document.querySelector(".prev");
    const nextButton = document.querySelector(".next");
    let currentIndex = 0;

    function showTestimonial(index) {
      testimonials.forEach((testimonial) =>
        testimonial.classList.remove("active")
      );
      dots.forEach((dot) => dot.classList.remove("active"));

      testimonials[index].classList.add("active");
      dots[index].classList.add("active");
    }

    function nextTestimonial() {
      currentIndex = (currentIndex + 1) % testimonials.length;
      showTestimonial(currentIndex);
    }

    function prevTestimonial() {
      currentIndex =
        (currentIndex - 1 + testimonials.length) % testimonials.length;
      showTestimonial(currentIndex);
    }

    dots.forEach((dot, index) => {
      dot.addEventListener("click", () => {
        currentIndex = index;
        showTestimonial(currentIndex);
      });
    });

    prevButton.addEventListener("click", prevTestimonial);
    nextButton.addEventListener("click", nextTestimonial);

    // Auto-rotate testimonials
    let interval = setInterval(nextTestimonial, 5000);

    // Pause auto-rotation on hover
    const testimonialSection = document.querySelector(
      ".testimonial-section"
    );
    testimonialSection.addEventListener("mouseenter", () => {
      clearInterval(interval);
    });

    testimonialSection.addEventListener("mouseleave", () => {
      interval = setInterval(nextTestimonial, 5000);
    });
  });