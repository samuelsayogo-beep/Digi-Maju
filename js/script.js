document.addEventListener("DOMContentLoaded", () => {
  // ==========================================================================
  // 1. PRELOADER & LOADING REMOVAL
  // ==========================================================================
  const preloader = document.querySelector(".preloader");
  window.addEventListener("load", () => {
    setTimeout(() => {
      preloader.style.opacity = "0";
      setTimeout(() => (preloader.style.display = "none"), 500);
    }, 400); // Durasi delay estetik
  });

  // ==========================================================================
  // 2. CUSTOM CURSOR INTEGRATION (SMOOTH & GLOW)
  // ==========================================================================
  const cursor = document.querySelector(".custom-cursor");
  const cursorBlur = document.querySelector(".custom-cursor-blur");

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX}px`;
    cursor.style.top = `${e.clientY}px`;

    // Efek spring/delay pada blur cursor luar
    setTimeout(() => {
      cursorBlur.style.left = `${e.clientX}px`;
      cursorBlur.style.top = `${e.clientY}px`;
    }, 50);
  });

  // Perubahan cursor saat hover elemen interaktif
  const interactiveElements = document.querySelectorAll(
    "a, button, .service-card, .tab-btn",
  );
  interactiveElements.forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(2.5)";
      cursor.style.background = "rgba(0, 242, 254, 0.2)";
      cursorBlur.style.transform = "translate(-50%, -50%) scale(1.5)";
      cursorBlur.style.borderColor = "rgba(225, 0, 255, 0.8)";
    });
    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "translate(-50%, -50%) scale(1)";
      cursor.style.background = "var(--primary-blue)";
      cursorBlur.style.transform = "translate(-50%, -50%) scale(1)";
      cursorBlur.style.borderColor = "rgba(0, 242, 254, 0.4)";
    });
  });

  // ==========================================================================
  // 3. STICKY NAVBAR & ACTIVE INDICATOR
  // ==========================================================================
  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section");

  window.addEventListener("scroll", () => {
    // Sticky background effect
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Active Link Indicator berbasis posisi scroll page
    let currentSectionId = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active-nav");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active-nav");
      }
    });
  });

  // ==========================================================================
  // 4. MOBILE HAMBURGER MENU
  // ==========================================================================
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");

  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("active");
    menuToggle.firstElementChild.classList.toggle("fa-bars");
    menuToggle.firstElementChild.classList.toggle("fa-xmark");
  });

  // Menutup menu mobile saat link diklik
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active");
      menuToggle.firstElementChild.classList.add("fa-bars");
      menuToggle.firstElementChild.classList.remove("fa-xmark");
    });
  });

  // ==========================================================================
  // 5. TYPING EFFECT (HERO SECTION)
  // ==========================================================================
  const typingElement = document.querySelector(".typing-text");
  const words = JSON.parse(typingElement.getAttribute("data-words"));
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      typingElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentWord.length) {
      typeSpeed = 1500; // Delay saat kata selesai diketik
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 500; // Delay sebelum mulai mengetik kata baru
    }

    setTimeout(type, typeSpeed);
  }
  type();

  // ==========================================================================
  // 6. REVEAL ANIMATION ON SCROLL
  // ==========================================================================
  const revealElements = document.querySelectorAll(".reveal");

  function checkReveal() {
    const triggerBottom = window.innerHeight * 0.85;
    revealElements.forEach((el) => {
      const elTop = el.getBoundingClientRect().top;
      if (elTop < triggerBottom) {
        el.classList.add("active");
      }
    });
  }
  window.addEventListener("scroll", checkReveal);
  checkReveal(); // Jalankan sekali di awal load

  // ==========================================================================
  // 7. COUNTER STATISTIK ANIMATION
  // ==========================================================================
  const counters = document.querySelectorAll(".counter");
  let counterActivated = false;

  function startCounters() {
    counters.forEach((counter) => {
      counter.innerText = "0";
      const updateCounter = () => {
        const target = +counter.getAttribute("data-target");
        const current = +counter.innerText;
        const increment = target / 40; // Kecepatan counter bertambah

        if (current < target) {
          counter.innerText = `${Math.ceil(current + increment)}`;
          setTimeout(updateCounter, 25);
        } else {
          counter.innerText =
            target +
            (target === 100
              ? "+"
              : target === 300
                ? "%"
                : target === 24
                  ? " /7"
                  : "");
        }
      };
      updateCounter();
    });
  }

  // Memicu counter saat section statistik terlihat di layar
  window.addEventListener("scroll", () => {
    const statsSection = document.getElementById("fitur");
    const sectionTop = statsSection.getBoundingClientRect().top;
    if (sectionTop < window.innerHeight * 0.75 && !counterActivated) {
      startCounters();
      counterActivated = true;
    }
  });

  // ==========================================================================
  // 8. INTERACTIVE SHOWCASE TABS
  // ==========================================================================
  const tabBtns = document.querySelectorAll(".tab-btn");
  const tabContents = document.querySelectorAll(".tab-content");

  tabBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      tabBtns.forEach((b) => b.classList.remove("active"));
      tabContents.forEach((c) => c.classList.remove("active"));

      btn.classList.add("active");
      const tabId = btn.getAttribute("data-tab");
      document.getElementById(tabId).classList.add("active");
    });
  });

  // ==========================================================================
  // 9. AUTOMATIC GLASSMORPHISM TESTIMONIAL SLIDER
  // ==========================================================================
  const testimonialCards = document.querySelectorAll(".testimonial-card");
  const dotNavs = document.querySelectorAll(".dot-nav");
  let currentSlide = 0;
  let slideInterval;

  function showSlide(index) {
    testimonialCards.forEach((card) => card.classList.remove("active"));
    dotNavs.forEach((dot) => dot.classList.remove("active"));

    testimonialCards[index].classList.add("active");
    dotNavs[index].classList.add("active");
    currentSlide = index;
  }

  function nextSlide() {
    let next = (currentSlide + 1) % testimonialCards.length;
    showSlide(next);
  }

  function startSlideTimer() {
    slideInterval = setInterval(nextSlide, 5000); // Berpindah setiap 5 detik
  }

  dotNavs.forEach((dot) => {
    dot.addEventListener("click", () => {
      clearInterval(slideInterval);
      const slideIndex = parseInt(dot.getAttribute("data-slide"));
      showSlide(slideIndex);
      startSlideTimer();
    });
  });

  startSlideTimer();

  // ==========================================================================
  // 10. MOUSE PARALLAX / INTERACTION (HERO VISUAL MOCKUP)
  // ==========================================================================
  const heroVisual = document.querySelector(".hero-visual");
  const heroCard = document.querySelector(".interactive-card-hero");

  if (heroVisual && heroCard) {
    heroVisual.addEventListener("mousemove", (e) => {
      const rect = heroVisual.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Rotasi halus mengikuti arah kursor user
      heroCard.style.transform = `perspective(1000px) rotateY(${x * 0.05}deg) rotateX(${-y * 0.05}deg)`;
    });

    heroVisual.addEventListener("mouseleave", () => {
      heroCard.style.transform =
        "perspective(1000px) rotateY(-10deg) rotateX(10deg)";
    });
  }
});
