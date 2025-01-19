// Tab switching functionality
const tabButtons = document.querySelectorAll(".tab-button");
tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    tabButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
  });
});

// Carousel dots functionality
const dots = document.querySelectorAll(".dot");
dots.forEach((dot, index) => {
  dot.addEventListener("click", () => {
    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");
    // Here you would typically slide the carousel to the corresponding position
  });
});

// Social share functionality
document.querySelectorAll(".social-icon").forEach((icon) => {
  icon.addEventListener("click", () => {
    // Here you would typically implement social sharing functionality
    alert("Sharing functionality would be implemented here");
  });
});

// Investment button functionality
document.querySelector(".invest-button").addEventListener("click", () => {
  // Here you would typically implement investment functionality
  alert("Investment process would start here");
});

// Testimonial Slider functionality
const testimonialContainer = document.querySelector(".testimonial-container");
const testimonials = document.querySelectorAll(".testimonial");
const prevButton = document.querySelector(".slider-prev");
const nextButton = document.querySelector(".slider-next");
const sliderNav = document.querySelector(".slider-nav");
let currentSlide = 0;
let autoSlideInterval;

// Create navigation dots
testimonials.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("slider-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => goToSlide(index));
  sliderNav.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll(".slider-dot").forEach((dot, index) => {
    dot.classList.toggle("active", index === currentSlide);
  });
}

function goToSlide(index) {
  currentSlide = index;
  testimonialContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
  updateDots();
  resetAutoSlide();
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % testimonials.length;
  goToSlide(currentSlide);
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + testimonials.length) % testimonials.length;
  goToSlide(currentSlide);
}

function resetAutoSlide() {
  clearInterval(autoSlideInterval);
  autoSlideInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
}

// Event listeners
nextButton.addEventListener("click", nextSlide);
prevButton.addEventListener("click", prevSlide);

// Start auto-sliding
resetAutoSlide();

// Pause auto-sliding when hovering over the slider
testimonialContainer.addEventListener("mouseenter", () =>
  clearInterval(autoSlideInterval)
);
testimonialContainer.addEventListener("mouseleave", resetAutoSlide);

// Add keyboard navigation
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    prevSlide();
  } else if (e.key === "ArrowRight") {
    nextSlide();
  }
});

// FAQ accordion functionality
document.querySelectorAll(".accordion-header").forEach((button) => {
  button.addEventListener("click", () => {
    const accordionContent = button.nextElementSibling;
    button.classList.toggle("active");

    if (button.classList.contains("active")) {
      accordionContent.classList.add("active");
    } else {
      accordionContent.classList.remove("active");
    }
  });
});
