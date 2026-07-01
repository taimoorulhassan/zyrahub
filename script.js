/* ============================================================
   ZYRA HUB — MAIN JAVASCRIPT
   All interactive functionality for the website.
   Edit comments marked with "// EDIT:" to customize.
   ============================================================ */

'use strict';

/* ============================================================
   1. LOADING SCREEN
   Hides the loader once the page is fully loaded.
============================================================ */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (!loader) return;

  // Wait a minimum of 1.5s so the animation completes visually
  setTimeout(() => {
    loader.classList.add('hidden');

    // Remove from DOM after transition ends to free up z-index space
    loader.addEventListener('transitionend', () => loader.remove(), { once: true });
  }, 1800);
});


/* ============================================================
   2. STICKY NAVBAR
   Adds a "scrolled" class to the navbar when the user scrolls
   past 60px, which applies a background and shadow via CSS.
============================================================ */
const navbar = document.getElementById('navbar');

function handleNavbarScroll() {
  if (!navbar) return;
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });


/* ============================================================
   3. MOBILE MENU
   Hamburger button toggles the full-screen mobile nav overlay.
============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');
const mobileClose = document.getElementById('mobile-close');
const mobileLinks = document.querySelectorAll('.mobile-link');

function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('open');
  document.body.style.overflow = 'hidden'; // Prevent background scroll
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

if (hamburger)  hamburger.addEventListener('click', openMobileMenu);
if (mobileClose) mobileClose.addEventListener('click', closeMobileMenu);

// Close when a link is clicked
mobileLinks.forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});


/* ============================================================
   4. ACTIVE NAV LINK (Scroll Spy)
   Highlights the correct nav link as the user scrolls through sections.
============================================================ */
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function updateActiveNavLink() {
  let currentSection = '';
  const offset = 120; // Offset for sticky nav height

  sections.forEach(section => {
    const top = section.offsetTop - offset;
    if (window.scrollY >= top) {
      currentSection = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentSection}`) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNavLink, { passive: true });


/* ============================================================
   5. BACK TO TOP BUTTON
   Fades in when the user scrolls past 400px.
============================================================ */
const backToTopBtn = document.getElementById('back-to-top');

function handleBackToTop() {
  if (!backToTopBtn) return;
  if (window.scrollY > 400) {
    backToTopBtn.classList.add('visible');
  } else {
    backToTopBtn.classList.remove('visible');
  }
}

window.addEventListener('scroll', handleBackToTop, { passive: true });

if (backToTopBtn) {
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   6. SCROLL REVEAL ANIMATIONS
   Elements with the class "reveal" animate in when they enter
   the viewport. Uses IntersectionObserver for performance.
============================================================ */
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Stop observing after first reveal (one-shot animation)
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12, // Trigger when 12% of element is visible
    rootMargin: '0px 0px -40px 0px', // Slight bottom offset
  }
);

revealElements.forEach((el) => revealObserver.observe(el));


/* ============================================================
   7. ANIMATED STAT COUNTERS
   Numbers in the hero stats bar count up when they scroll
   into view.
============================================================ */
const statNumbers = document.querySelectorAll('.stat-num');

function animateCounter(el) {
  const target = parseInt(el.getAttribute('data-target'), 10);
  const duration = 1800; // ms
  const step = target / (duration / 16); // 60fps approx
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current);
  }, 16);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

statNumbers.forEach((num) => statsObserver.observe(num));


/* ============================================================
   8. PRODUCT TABS
   Switches between platform product grids (Amazon, Walmart, etc.)
============================================================ */
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    const targetTab = btn.getAttribute('data-tab');

    // Deactivate all tabs and buttons
    tabButtons.forEach((b) => b.classList.remove('active'));
    tabContents.forEach((c) => c.classList.remove('active'));

    // Activate clicked tab
    btn.classList.add('active');
    const target = document.getElementById(`tab-${targetTab}`);
    if (target) target.classList.add('active');
  });
});


/* ============================================================
   9. GENERATE PRODUCT PLACEHOLDERS
   Dynamically creates product image placeholder cards for each
   platform tab so you don't have to write them all by hand.
   
   EDIT: Replace the placeholder image URLs with real product images.
   Each platform has a configured count and color theme.
============================================================ */

// EDIT: Customize each platform's product settings here
const platformProducts = {
  amazon: {
    count: 25,          // Number of product slots
    color: 'FF9900',    // Placeholder color (hex without #)
    textColor: 'ffffff',
  },
  walmart: {
    count: 18,
    color: '007DC6',
    textColor: 'ffffff',
  },
  temu: {
    count: 10,
    color: 'FF6B35',
    textColor: 'ffffff',
  },
  tiktok: {
    count: 10,
    color: '010101',
    textColor: 'EE1D52',
  },
};

function generateProductCards() {
  Object.entries(platformProducts).forEach(([platform, config]) => {
    const container = document.getElementById(`products-${platform}`);
    if (!container) return;

    for (let i = 1; i <= config.count; i++) {
      const item = document.createElement('div');
      item.className = 'product-item';
      item.setAttribute('role', 'img');
      item.setAttribute('aria-label', `${platform} product ${i}`);

      // EDIT: Replace src with real product image path, e.g. './images/amazon-product-1.jpg'
      item.innerHTML = `
        <img 
          src="./images/products/${platform}-${i}.jpg" 
          alt="${platform} product ${i}" 
          loading="lazy"
        />
      `;

      container.appendChild(item);
    }
  });
}

generateProductCards();


/* ============================================================
   10. CONTACT FORM HANDLER
   Handles the Netlify form submission with a success message.
   
   NOTE: For Netlify deployment, the form uses data-netlify="true"
   and will work automatically. For local testing, the form won't
   submit but the success UI will still show for demo purposes.
============================================================ */
const contactForm = document.getElementById('contact-form');
const formSuccess = document.getElementById('form-success');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    const submitBtn = contactForm.querySelector('button[type="submit"]');

    // Show loading state on button
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // For Netlify: let the form submit normally (don't preventDefault)
    // For custom APIs: uncomment the block below and add your endpoint

    /*
    // --- Custom API submission example ---
    e.preventDefault();
    try {
      const formData = new FormData(contactForm);
      const response = await fetch('YOUR_API_ENDPOINT_HERE', {
        method: 'POST',
        body: formData,
      });
      if (response.ok) {
        contactForm.reset();
        if (formSuccess) formSuccess.style.display = 'flex';
      }
    } catch (error) {
      console.error('Form submission error:', error);
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;
    }
    */

    // Netlify handles the actual submission; this just updates UI
    // Remove the 2 lines below if using a custom API
    setTimeout(() => { submitBtn.innerHTML = originalText; submitBtn.disabled = false; }, 3000);
  });
}


/* ============================================================
   11. SMOOTH SCROLL FOR ALL ANCHOR LINKS
   Ensures all #hash links scroll smoothly and account for the
   fixed navbar height.
============================================================ */
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener('click', function (e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return; // Skip empty # links

    const target = document.querySelector(targetId);
    if (!target) return;

    e.preventDefault();

    const navbarHeight = navbar ? navbar.offsetHeight : 80;
    const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;

    window.scrollTo({ top: targetPosition, behavior: 'smooth' });
  });
});


/* ============================================================
   12. FOOTER — CURRENT YEAR
   Automatically updates the copyright year in the footer.
============================================================ */
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();


/* ============================================================
   13. NAVBAR — HERO SECTION SPECIAL HANDLING
   On the hero section (dark background), the logo text should
   be white. This adds/removes a class based on scroll position.
============================================================ */
function handleHeroNavColor() {
  if (!navbar) return;
  const heroHeight = document.getElementById('home')?.offsetHeight || 600;

  if (window.scrollY < heroHeight - 100) {
    navbar.classList.add('on-hero');
  } else {
    navbar.classList.remove('on-hero');
  }
}

// Add CSS for this dynamically
const heroNavStyle = document.createElement('style');
heroNavStyle.textContent = `
  .navbar.on-hero:not(.scrolled) .logo-text { color: #fff; }
  .navbar.on-hero:not(.scrolled) .nav-link { color: rgba(255,255,255,0.75); }
  .navbar.on-hero:not(.scrolled) .nav-link:hover,
  .navbar.on-hero:not(.scrolled) .nav-link.active { color: #fff; background: rgba(255,255,255,0.1); }
  .navbar.on-hero:not(.scrolled) .hamburger span { background: #fff; }
`;
document.head.appendChild(heroNavStyle);

window.addEventListener('scroll', handleHeroNavColor, { passive: true });
handleHeroNavColor(); // Run on page load


/* ============================================================
   14. TESTIMONIAL GALLERY — LIGHTBOX (Simple)
   Clicking a testimonial image shows it in a simple overlay.
============================================================ */
const testimonialCards = document.querySelectorAll('.testimonial-img-card img');

// Create lightbox elements
const lightbox = document.createElement('div');
lightbox.id = 'lightbox';
lightbox.style.cssText = `
  display:none; position:fixed; inset:0; z-index:9998;
  background:rgba(0,0,0,0.9); align-items:center; justify-content:center;
  cursor:zoom-out; padding:20px;
`;

const lightboxImg = document.createElement('img');
lightboxImg.style.cssText = `
  max-width:90vw; max-height:90vh; border-radius:12px;
  box-shadow: 0 24px 80px rgba(0,0,0,0.8);
`;

lightbox.appendChild(lightboxImg);
document.body.appendChild(lightbox);

testimonialCards.forEach((img) => {
  img.style.cursor = 'zoom-in';
  img.addEventListener('click', () => {
    lightboxImg.src = img.src;
    lightboxImg.alt = img.alt;
    lightbox.style.display = 'flex';
    document.body.style.overflow = 'hidden';
  });
});

lightbox.addEventListener('click', () => {
  lightbox.style.display = 'none';
  document.body.style.overflow = '';
});

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    lightbox.style.display = 'none';
    document.body.style.overflow = '';
  }
});


/* ============================================================
   END OF SCRIPT
   ============================================================
   
   HOW TO ADD MORE FEATURES:
   
   - Add a new product: Go to platformProducts object above
     and update the count, or replace the generated src with
     actual image paths after generating the HTML.
   
   - Change animation speed: Edit transition-delay values in
     CSS .reveal classes, or the 'duration' var in animateCounter().
   
   - Add form backend: Replace the Netlify form attributes with
     Formspree (action="https://formspree.io/f/YOUR_ID") or
     implement the custom API block in section 10.
   
   - Add Google Analytics: Paste your GA4 script tag in index.html
     just before the closing </head> tag.
============================================================ */
