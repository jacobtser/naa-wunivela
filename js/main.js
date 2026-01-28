// ==========================================
// NAA-WUNI VELA - COMPLETE JAVASCRIPT WITH ALL FIXES
// ==========================================

"use strict";

// Configuration
const CONFIG = {
  formspreeId: "https://formspree.io/f/mnjjgnpz",
  animationDuration: 400,
  scrollOffset: 80,
  theme: {
    light: "light",
    dark: "dark",
  },
};

// Team Data
const TEAM_DATA = [
  {
    name: "Stephen Andrews Dobia",
    role: "Founder & CEO",
    bio: "Visionary leader with 5+ years in sustainable agriculture and premium shea products. Passionate about empowering local communities.",
    image: "assets/images/team/Stephen.png",
    social: {
      facebook: "https://www.fb.com/l/6lp1kJRRR",
      instagram: "https://www.instagram.com/invites/contact/?igsh=4jksbir9p26p&utm_content=u5imiah",
      linkedin: "https://www.linkedin.com/in/stephen-andrews-dobia-298733322/?originalSubdomain=gh",
    },
  },
  {
    name: "Ayeh Kwabena-Koranteng William",
    role: "Sales & Marketing Director",
    bio: "Expert in market analytics and international sales. Leads our global expansion efforts.",
    image: "assets/images/team/William.jpg",
  },
  {
    name: "Mr. Francis Nibanje Siibu",
    role: "Advisor & Mentor - Sustainability",
    bio: "Provides strategic guidance on sustainable development practices and community benefits.",
    image: "assets/images/team/Mr. Francis.jpg",
  },
  {
    name: "Mr. John Wobil",
    role: "Business Coach",
    bio: "Provides essential mentorship in business development and strategic planning.",
    image: "assets/images/team/Mr. John.jpg",
  },
  {
    name: "Jacob Tser Doku",
    role: "Head of Development",
    bio: "Expert in web development and digital innovation. Ensures our online presence reflects our brand excellence.",
    image: "assets/images/team/Jacob.jpg",
    social: {
      facebook: "https://www.facebook.com/jacob.tser/",
      twitter: "https://x.com/JacobTser418",
      linkedin: "https://www.linkedin.com/in/jacob-tser-doku-1360a8202/overlay/contact-info/",
      github: "https://github.com/jacobtser",
      ID: "https://angelbluef65-tech.github.io/my_portfolio/",
    },
  },
  {
    name: "Mma Alima",
    role: "Women's Collective Lead",
    bio: "Coordinates and organizes local women for sustainable shea production. Community leader and advocate.",
    image: "assets/images/team/Mma.jpg",
  },
];

// Testimonials Data
const TESTIMONIALS_DATA = [
  {
    text: "Naa-Wuni Vela's shea butter has transformed my skincare routine. The quality is exceptional and my skin has never felt better!",
    author: "Grace",
    location: "Accra, Ghana",
    rating: "★★★★★",
  },
  {
    text: "As a professional esthetician, I only recommend the best products to my clients. Naa-Wuni Vela is now my go-to shea butter brand.",
    author: "Christabel",
    location: "Kumasi, Ghana",
    rating: "★★★★★",
  },
  {
    text: "Not only is the product amazing, but knowing it supports women in Ghana makes it even more special. Truly ethical beauty.",
    author: "Dora",
    location: "Kumasi, Ghana",
    rating: "★★★★★",
  },
  {
    text: "The best shea butter I've ever used! My family loves it for everything from skin care to minor burns and cuts.",
    author: "Madam Grace",
    location: "Kumasi, Ghana",
    rating: "★★★★★",
  },
  {
    text: "Outstanding quality and exceptional customer service. Their commitment to sustainability is truly inspiring.",
    author: "Linda Mburu",
    location: "Nalerigu, Ghana",
    rating: "★★★★★",
  },
];

// Global State
let currentTheme = CONFIG.theme.light;
let currentTestimonial = 0;
let testimonialInterval;
let isScrolling = false;
let heroSlideInterval;

// DOM Elements
const elements = {
  body: document.body,
  navbar: document.getElementById("navbar"),
  navMenu: document.getElementById("navMenu"),
  hamburger: document.getElementById("hamburger"),
  themeToggle: document.getElementById("themeToggle"),
  backToTop: document.getElementById("backToTop"),
  loadingSpinner: document.getElementById("loadingSpinner"),
  contactForm: document.getElementById("contactForm"),
};

// ==========================================
// PRELOAD & HERO BACKGROUND FIXES
// ==========================================

// Preload hero images for immediate display
function preloadHeroImages() {
  console.log("Preloading hero images...");
  
  const heroImages = [
    'assets/images/1.png',
    'assets/images/2.png',
    'assets/images/3.png',
    'assets/images/4.png',
    'assets/images/5.jpeg'
  ];
  
  // Preload all images
  heroImages.forEach(src => {
    const img = new Image();
    img.src = src;
  });
  
  // Set first slide as active immediately
  setTimeout(() => {
    const slides = document.querySelectorAll('.hero-slide');
    if (slides.length > 0) {
      slides[0].classList.add('active');
      slides[0].style.opacity = '1';
    }
  }, 100);
}

// Enhanced team card initialization with compact layout
function initializeTeamEnhanced() {
  const teamGrid = document.getElementById("teamGrid");
  if (!teamGrid) return;

  teamGrid.innerHTML = TEAM_DATA.map(
    (member, index) => `
    <div class="team-member-card animate-fade-in" style="animation-delay: ${index * 0.15}s">
      <div class="team-member-image">
        <img src="${member.image}" alt="${member.name}" loading="lazy" onerror="this.onerror=null;this.src='assets/images/placeholder.png';">
        <div class="team-member-overlay">
          <div class="social-links">
            ${
              member.social
                ? Object.entries(member.social)
                    .filter(([_, url]) => url && url.trim() !== '')
                    .map(
                      ([platform, url]) => `
                      <a href="${url}" class="social-link ${platform}" target="_blank" rel="noopener noreferrer" title="${platform}">
                        <i class="fab fa-${platform}"></i>
                      </a>
                      `
                    )
                    .join("")
                : ''
            }
          </div>
        </div>
      </div>
      <div class="team-member-info">
        <h4>${member.name}</h4>
        <p class="team-member-role">${member.role}</p>
        <p class="team-member-bio">${member.bio}</p>
      </div>
    </div>
    `
  ).join("");
}

// Enhanced hero slider initialization
function initializeHeroSliderEnhanced() {
  const slides = document.querySelectorAll(".hero-slide");
  if (slides.length < 2) return;

  // Set first slide as active immediately
  slides[0].classList.add("active");
  slides[0].style.opacity = "1";

  let currentSlide = 0;

  function showNextSlide() {
    slides[currentSlide].classList.remove("active");
    slides[currentSlide].style.opacity = "0";
    
    currentSlide = (currentSlide + 1) % slides.length;
    
    slides[currentSlide].classList.add("active");
    slides[currentSlide].style.opacity = "1";
  }

  // Start slideshow after 5 seconds
  setTimeout(() => {
    heroSlideInterval = setInterval(showNextSlide, 5);
  }, 5);

  // Pause on hover
  const hero = document.querySelector(".hero");
  if (hero) {
    hero.addEventListener("mouseenter", () => {
      clearInterval(heroSlideInterval);
    });
    hero.addEventListener("mouseleave", () => {
      clearInterval(heroSlideInterval);
      heroSlideInterval = setInterval(showNextSlide, 2000);
    });
  }
}

// Image loading validation for supporters
function validateSupportersImages() {
  const supporterImages = document.querySelectorAll('.supporter-image img');
  
  supporterImages.forEach(img => {
    img.onerror = function() {
      const parent = this.parentElement;
      const role = parent.closest('.supporter-card').querySelector('.supporter-role')?.textContent || '';
      
      let iconClass = 'fa-user';
      if (role.includes('Conservation') || role.includes('Sustainability')) {
        iconClass = 'fa-leaf';
      } else if (role.includes('Business') || role.includes('Coach')) {
        iconClass = 'fa-briefcase';
      } else if (role.includes('Founder') || role.includes('CEO')) {
        iconClass = 'fa-crown';
      }
      
      parent.innerHTML = `
        <div class="placeholder-icon">
          <i class="fas ${iconClass} fa-2x"></i>
        </div>
      `;
    };
    
    if (img.complete && img.naturalHeight === 0) {
      img.onerror();
    }
  });
}

// ========== INITIALIZATION ==========

// Initialize Application
function initApp() {
  console.log("%c Naa-Wuni Vela", "color: #D4AF37; font-size: 18px; font-weight: bold;");
  console.log("%cPremium Natural Shea Butter", "color: #2C1810; font-size: 14px;");

  // Preload hero images immediately
  preloadHeroImages();

  // Hide loading spinner
  hideLoading();

  // Initialize all components
  initializeTheme();
  initializeNavigation();
  initializeHeroSliderEnhanced();
  initializeProducts();
  initializeTeamEnhanced();
  initializeTestimonials();
  initializeTabs();
  initializeScrollAnimations();
  initializeBackToTop();
  initializeCounters();
  initializeVideoHandler();
  
  // Validate supporter images
  setTimeout(validateSupportersImages, 1000);

  // Add event listeners
  addEventListeners();

  // Initial checks
  checkScrollPosition();
  updateActiveNavLink();
  
  console.log("App initialization complete");
}

// Hide Loading Spinner
function hideLoading() {
  if (elements.loadingSpinner) {
    elements.loadingSpinner.style.opacity = "0";
    setTimeout(() => {
      elements.loadingSpinner.style.display = "none";
    }, 300);
  }
}

// ========== THEME MANAGEMENT ==========
function initializeTheme() {
  const savedTheme = localStorage.getItem("naawuni_theme") || CONFIG.theme.light;
  setTheme(savedTheme);
  updateThemeIcon(savedTheme);
}

function setTheme(theme) {
  currentTheme = theme;
  elements.body.setAttribute("data-theme", theme);
  localStorage.setItem("naawuni_theme", theme);
}

function updateThemeIcon(theme) {
  if (!elements.themeToggle) return;
  const icon = elements.themeToggle.querySelector("i");
  if (!icon) return;
  icon.className = theme === CONFIG.theme.dark ? "fas fa-sun" : "fas fa-moon";
}

function toggleTheme() {
  const newTheme = currentTheme === CONFIG.theme.light ? CONFIG.theme.dark : CONFIG.theme.light;
  setTheme(newTheme);
  updateThemeIcon(newTheme);
}

// ========== NAVIGATION ==========
function initializeNavigation() {
  if (!elements.hamburger || !elements.navMenu) return;

  elements.hamburger.addEventListener("click", () => {
    elements.hamburger.classList.toggle("active");
    elements.navMenu.classList.toggle("active");
    document.body.style.overflow = elements.navMenu.classList.contains("active") ? "hidden" : "";
  });

  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      elements.hamburger.classList.remove("active");
      elements.navMenu.classList.remove("active");
      document.body.style.overflow = "";
    });
  });

  document.addEventListener("click", (e) => {
    if (!elements.navMenu.contains(e.target) && !elements.hamburger.contains(e.target) && elements.navMenu.classList.contains("active")) {
      elements.hamburger.classList.remove("active");
      elements.navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  });
}

// ========== PRODUCTS ==========
function initializeProducts() {
  const productsData = [
    {
      name: "Pure Shea Butter",
      description: "100% natural, unrefined shea butter straight from Ghana. Perfect for skin and hair care.",
      price: "GHc250.00",
      image: "assets/images/shearr.jpg",
features: ["Unrefined", "Grade A", "Cold Pr      essed", "No Additives"],
      badge: "Best Seller",
    },
    {
      name: "Pure Shea Butter",
      description: "Content",
      price: "Shea content",
      image: "assets/images/shea.jpg",
      features: ["Unrefined", "Grade A", "Cold Pressed", "No Additives"],
      badge: "Content",
    },
    {
      name: "Shea Soap",
      description: "Handmade shea soap with organic herbs and essential oils. Gentle and nourishing.",
      price: "GHc15.00",
      image: "assets/images/soap.png",
      features: ["Organic Herbs", "Handmade", "Natural Fragrance", "Eco-friendly"],
      badge: "New",
    },
  ];

  const productsGrid = document.getElementById("productsGrid");
  if (!productsGrid) return;

  productsGrid.innerHTML = "";

  productsData.forEach((product, index) => {
    const productCard = createProductCard(product, index);
    productsGrid.appendChild(productCard);
  });
}

function createProductCard(product, index) {
  const card = document.createElement("div");
  card.className = "product-card animate-fade-in";
  card.style.animationDelay = `${index * 0.1}s`;

  card.innerHTML = `
    ${product.badge ? `<div class="product-badge">${product.badge}</div>` : ""}
    <div class="product-image">
      <img src="${product.image}" alt="${product.name}" loading="lazy">
    </div>
    <div class="product-info">
      <h3>${product.name}</h3>
      <p class="product-description">${product.description}</p>
      <div class="product-features">
        ${product.features.map((feature) => `<span class="feature-tag">${feature}</span>`).join("")}
      </div>

      </div>
    </div>
  `;

  return card;
}

function handleProductClick(productName) {
  alert(`"${productName}" added to cart! 🛒\n\nThank you for your interest. Our full e-commerce functionality is coming soon!`);
}

// ========== TESTIMONIALS ==========
function initializeTestimonials() {
  const slider = document.getElementById("testimonialsSlider");
  const dotsContainer = document.getElementById("testimonialDots");

  if (!slider || !dotsContainer) return;

  // Create testimonials
  slider.innerHTML = TESTIMONIALS_DATA.map(
    (testimonial, index) => `
    <div class="testimonial-slide ${index === 0 ? "active" : ""}" data-index="${index}">
      <div class="testimonial-content">
        <div class="testimonial-rating">${testimonial.rating}</div>
        <p class="testimonial-text">"${testimonial.text}"</p>
        <div class="testimonial-author">
          <div class="author-info">
            <h5>${testimonial.author}</h5>
            <p class="author-location">${testimonial.location}</p>
          </div>
        </div>
      </div>
    </div>
  `,
  ).join("");

  // Create dots
  dotsContainer.innerHTML = TESTIMONIALS_DATA.map(
    (_, index) => `
    <div class="testimonial-dot ${index === 0 ? "active" : ""}" data-index="${index}"></div>
  `,
  ).join("");

  // Add click events to dots
  document.querySelectorAll(".testimonial-dot").forEach((dot) => {
    dot.addEventListener("click", (e) => {
      currentTestimonial = parseInt(e.target.dataset.index);
      updateTestimonial();
    });
  });

  // Start auto-rotation
  startTestimonialRotation();
}

function updateTestimonial() {
  const slides = document.querySelectorAll(".testimonial-slide");
  const dots = document.querySelectorAll(".testimonial-dot");

  slides.forEach((slide) => slide.classList.remove("active"));
  dots.forEach((dot) => dot.classList.remove("active"));

  slides[currentTestimonial].classList.add("active");
  dots[currentTestimonial].classList.add("active");
}

function startTestimonialRotation() {
  testimonialInterval = setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS_DATA.length;
    updateTestimonial();
  }, 6000);
}

function nextTestimonial() {
  clearInterval(testimonialInterval);
  currentTestimonial = (currentTestimonial + 1) % TESTIMONIALS_DATA.length;
  updateTestimonial();
  startTestimonialRotation();
}

function prevTestimonial() {
  clearInterval(testimonialInterval);
  currentTestimonial = (currentTestimonial - 1 + TESTIMONIALS_DATA.length) % TESTIMONIALS_DATA.length;
  updateTestimonial();
  startTestimonialRotation();
}

// ========== TABS FUNCTIONALITY ==========
function initializeTabs() {
  const tabButtons = document.querySelectorAll(".tab-button");
  const tabContents = document.querySelectorAll(".tab-content");

  // Set supporters tab as active by default
  const supportersTab = document.getElementById("supporters-tab");
  const supportersButton = document.querySelector('.tab-button[data-tab="supporters"]');
  
  if (supportersTab && supportersButton) {
    // Remove active from all
    tabContents.forEach(tab => tab.classList.remove("active"));
    tabButtons.forEach(btn => btn.classList.remove("active"));
    
    // Add active to supporters
    supportersTab.classList.add("active");
    supportersButton.classList.add("active");
  }

  tabButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const tabId = button.dataset.tab;

      // Remove active class from all buttons and contents
      tabButtons.forEach((btn) => btn.classList.remove("active"));
      tabContents.forEach((content) => content.classList.remove("active"));

      // Add active class to clicked button
      button.classList.add("active");

      // Show corresponding content
      const targetContent = document.getElementById(`${tabId}-tab`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });
}

// ========== ANIMATED COUNTERS ==========
function initializeCounters() {
  const counters = document.querySelectorAll(".stat-number");

  counters.forEach((counter) => {
    const target = parseInt(counter.dataset.count);
    const suffix = counter.textContent.includes("K") ? "K" : "";
    const duration = 2000;
    const step = target / (duration / 16);

    let current = 0;

    const updateCounter = () => {
      current += step;
      if (current >= target) {
        current = target;
        counter.textContent = suffix ? `${target / 1000}${suffix}` : target;
      } else {
        counter.textContent = suffix ? `${Math.floor(current / 1000)}${suffix}` : Math.floor(current);
        requestAnimationFrame(updateCounter);
      }
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            updateCounter();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 },
    );

    observer.observe(counter);
  });
}

// ========== SCROLL ANIMATIONS ==========
function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-visible");
      }
    });
  }, observerOptions);

  document.querySelectorAll(".animate-fade-in, .animate-slide-up, .animate-slide-left, .animate-slide-right").forEach((el) => {
    observer.observe(el);
  });
}

// ========== BACK TO TOP ==========
function initializeBackToTop() {
  if (!elements.backToTop) return;

  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      elements.backToTop.classList.add("visible");
    } else {
      elements.backToTop.classList.remove("visible");
    }
  });

  elements.backToTop.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
}

// ========== VIDEO HANDLER ==========
function initializeVideoHandler() {
  const videoContainers = document.querySelectorAll(".video-container");
  videoContainers.forEach((container) => {
    console.log("Video container ready:", container.id);
  });
}

// ========== UTILITY FUNCTIONS ==========
function scrollToSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (!section) return;

  const navbarHeight = elements.navbar ? elements.navbar.offsetHeight : 0;
  const sectionTop = section.offsetTop - navbarHeight - 20;

  window.scrollTo({
    top: sectionTop,
    behavior: "smooth",
  });

  updateActiveNavLink();

  if (sectionId === "about") {
    const firstTabButton = document.querySelector('.tab-button[data-tab="story"]');
    if (firstTabButton) {
      firstTabButton.click();
    }
  }
}

function updateActiveNavLink() {
  if (isScrolling) return;

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-link");

  let currentSection = "";
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.offsetHeight;

    if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
      currentSection = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.classList.add("active");
    }
  });
}

function checkScrollPosition() {
  if (window.scrollY > 50) {
    elements.navbar.classList.add("scrolled");
  } else {
    elements.navbar.classList.remove("scrolled");
  }
}

// ========== EVENT LISTENERS ==========
function addEventListeners() {
  // Theme toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener("click", toggleTheme);
  }

  // Window scroll
  window.addEventListener("scroll", () => {
    isScrolling = true;
    checkScrollPosition();
    updateActiveNavLink();

    clearTimeout(window.scrollTimer);
    window.scrollTimer = setTimeout(() => {
      isScrolling = false;
    }, 100);
  });

  // Window resize
  window.addEventListener("resize", debounce(() => {
    if (window.innerWidth > 768 && elements.navMenu.classList.contains("active")) {
      elements.hamburger.classList.remove("active");
      elements.navMenu.classList.remove("active");
      document.body.style.overflow = "";
    }
  }, 250));
}

// ========== HELPER FUNCTIONS ==========
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// ========== GLOBAL EXPORTS ==========
window.scrollToSection = scrollToSection;
window.handleProductClick = handleProductClick;
window.nextTestimonial = nextTestimonial;
window.prevTestimonial = prevTestimonial;
window.initApp = initApp;

// Initialize when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initApp);
} else {
  initApp();
}