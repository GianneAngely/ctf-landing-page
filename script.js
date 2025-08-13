document.addEventListener("DOMContentLoaded", () => {
  // 1. Mobile Menu Toggle
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navMenu = document.querySelector(".nav-menu");

  mobileMenuBtn.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });

  // 2. Dropdown Toggle for Mobile
  const dropdowns = document.querySelectorAll(".nav-menu .dropdown");
  dropdowns.forEach((dropdown) => {
    const button = dropdown.querySelector(".dropbtn");
    button.addEventListener("click", (e) => {
      if (window.innerWidth < 992) {
        // Prevent link behavior on mobile if it's a dropdown button
        e.preventDefault();
        dropdown.classList.toggle("open");
      }
    });
  });

  // 3. Countdown Timer
  const countdown = () => {
    const eventDate = new Date("August 23, 2025 13:00:00").getTime();
    const now = new Date().getTime();
    const distance = eventDate - now;

    if (distance < 0) {
      document.getElementById("timer").innerHTML = "The event has started!";
      clearInterval(timerInterval);
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerText = String(days).padStart(2, "0");
    document.getElementById("hours").innerText = String(hours).padStart(2, "0");
    document.getElementById("minutes").innerText = String(minutes).padStart(
      2,
      "0"
    );
    document.getElementById("seconds").innerText = String(seconds).padStart(
      2,
      "0"
    );
  };

  // Check if the timer element exists before setting the interval
  if (document.getElementById("timer")) {
    const timerInterval = setInterval(countdown, 1000);
    countdown(); // Initial call
  }

  // 4. FAQ Accordion
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    question.addEventListener("click", () => {
      const currentlyActive = document.querySelector(".faq-question.active");
      if (currentlyActive && currentlyActive !== question) {
        currentlyActive.classList.remove("active");
        currentlyActive.nextElementSibling.style.maxHeight = 0;
      }

      question.classList.toggle("active");
      const answer = question.nextElementSibling;
      if (question.classList.contains("active")) {
        answer.style.maxHeight = answer.scrollHeight + "px";
      } else {
        answer.style.maxHeight = 0;
      }
    });
  });

  // 5. On-Scroll Animations
  const animatedElements = document.querySelectorAll(
    ".card, .timeline-item, .prize-card, .theme-card, section h2, .hero-text, .partner-logo, .faq-item"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
    }
  );

  animatedElements.forEach((el) => {
    el.classList.add("animated");
    observer.observe(el);
  });
});
