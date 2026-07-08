/* ============================================================
   PROXY — Shared JavaScript
   Navbar, Search Overlay (Ctrl+K), Theme Toggle, Cube Engine
   ============================================================ */

// ── Navbar HTML Injection ──
function injectNavbar(activePage = 'Home') {
  const navbarHTML = `
    <nav class="navbar" id="mainNavbar">
      <a href="/index.html" class="nav-left">
        <span class="logo-text"><span>P</span>ro<span>X</span>y</span>
      </a>
      
      <ul class="nav-center">
        <li><a class="nav-link${activePage === 'Home' ? ' active' : ''}" href="/index.html">Home</a></li>
        <li><a class="nav-link${activePage === 'Syllabus' ? ' active' : ''}" href="/index.html#syllabus-section">Syllabus</a></li>
        <li><a class="nav-link${activePage === 'Notes' ? ' active' : ''}" href="/pages/notes.html">Notes</a></li>
        <li><a class="nav-link${activePage === 'PYQs' ? ' active' : ''}" href="/pages/pyqs.html">PYQs</a></li>
        <li><a class="nav-link${activePage === 'Founders' ? ' active' : ''}" href="/pages/founders.html">Founders</a></li>
        <li><a class="nav-link${activePage === 'Roadmaps' ? ' active' : ''}" href="/pages/roadmaps.html">Roadmaps</a></li>
        <li><a class="nav-link${activePage === 'More' ? ' active' : ''}" href="#">More</a></li>
      </ul>

      <div class="nav-right">
        <div class="search-wrapper" id="searchTrigger">
          <svg class="search-icon" viewBox="0 0 24 24">
            <path d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/>
          </svg>
          <input type="text" class="search-input" placeholder="Search resources..." readonly>
          <span class="search-shortcut">Ctrl+K</span>
        </div>

        <button class="theme-toggle" id="themeToggle">
          <svg class="theme-icon" viewBox="0 0 24 24">
            <path d="M12.3 22h-.1c-5.5 0-10-4.5-10-10S6.7 2 12.2 2c.5 0 .9.3 1 .8s-.1.9-.6 1.2c-3.1 2-5.1 5.4-5.1 9.3 0 3.9 2 7.3 5.1 9.3.4.3.6.7.5 1.1-.1.4-.5.7-.9.7z"/>
          </svg>
        </button>

        <a href="#" class="btn-signin">Sign In</a>

        <!-- Hamburger Icon for Mobile -->
        <button class="mobile-nav-toggle" id="mobileNavToggle">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
        </button>
      </div>
    </nav>
  `;

  // Search Overlay
  const searchOverlayHTML = `
    <div class="search-overlay" id="searchOverlay">
      <div class="search-modal">
        <input type="text" class="search-modal-input" id="searchModalInput" placeholder="Search notes, PYQs, subjects, founders..." autofocus>
        <div class="search-modal-hint">
          <span>Type to search across everything</span>
          <span><kbd>Esc</kbd> to close</span>
        </div>
      </div>
    </div>
  `;

  // Mobile menu links overlay
  const mobileMenuOverlayHTML = `
    <div class="mobile-menu-overlay" id="mobileMenuOverlay" style="display: none;">
      <ul class="mobile-menu-links">
        <li><a class="${activePage === 'Home' ? 'active' : ''}" href="/index.html">Home</a></li>
        <li><a class="${activePage === 'Syllabus' ? 'active' : ''}" href="/index.html#syllabus-section">Syllabus</a></li>
        <li><a class="${activePage === 'Notes' ? 'active' : ''}" href="/pages/notes.html">Notes</a></li>
        <li><a class="${activePage === 'PYQs' ? 'active' : ''}" href="/pages/pyqs.html">PYQs</a></li>
        <li><a class="${activePage === 'Founders' ? 'active' : ''}" href="/pages/founders.html">Founders</a></li>
        <li><a class="${activePage === 'Roadmaps' ? 'active' : ''}" href="/pages/roadmaps.html">Roadmaps</a></li>
      </ul>
    </div>
  `;

  // Inject
  document.body.insertAdjacentHTML('afterbegin', mobileMenuOverlayHTML);
  document.body.insertAdjacentHTML('afterbegin', searchOverlayHTML);
  document.body.insertAdjacentHTML('afterbegin', navbarHTML);

  // Hide mobile menu overlay by default using inline style to guarantee it is hidden on desktop immediately
  const overlay = document.getElementById('mobileMenuOverlay');
  if (overlay) {
    overlay.style.display = 'none';
  }

  // Setup listeners
  setupSearchOverlay();
  setupMobileMenuToggle();
}

function setupMobileMenuToggle() {
  const toggle = document.getElementById('mobileNavToggle');
  const overlay = document.getElementById('mobileMenuOverlay');
  
  if (toggle && overlay) {
    toggle.addEventListener('click', () => {
      overlay.classList.toggle('active');
      const isActive = overlay.classList.contains('active');
      
      // Update hamburger SVG to close (X) when active and toggle display inline style
      if (isActive) {
        toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>`;
        overlay.style.display = 'flex';
      } else {
        toggle.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>`;
        overlay.style.display = 'none';
      }
    });
  }
}

// ── Search Overlay (Ctrl+K Spotlight) ──
function setupSearchOverlay() {
  const overlay = document.getElementById('searchOverlay');
  const modalInput = document.getElementById('searchModalInput');
  const searchTrigger = document.getElementById('searchTrigger');

  if (!overlay) return;

  // Ctrl+K to open
  document.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      openSearch();
    }
    if (e.key === 'Escape') {
      closeSearch();
    }
  });

  // Click on search bar to open
  if (searchTrigger) {
    searchTrigger.addEventListener('click', (e) => {
      e.preventDefault();
      openSearch();
    });
  }

  // Click backdrop to close
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeSearch();
    }
  });

  function openSearch() {
    overlay.classList.add('active');
    setTimeout(() => modalInput?.focus(), 100);
  }

  function closeSearch() {
    overlay.classList.remove('active');
    if (modalInput) modalInput.value = '';
  }
}

// ── 3D Cube Interaction Engine ──
function setupCubeInteractions() {
  const wrappers = document.querySelectorAll('.cube-wrapper');

  wrappers.forEach(wrapper => {
    const cube = wrapper.querySelector('.cube-scene');
    if (!cube) return;

    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Rotate cube toward cursor
      const rotX = -y / 4 - 12;
      const rotY = x / 4 + 22;
      cube.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.06)`;
    });

    wrapper.addEventListener('mouseleave', () => {
      cube.style.transform = 'rotateX(-12deg) rotateY(22deg) scale(1)';
    });
  });
}

// ── Background Glow Injection ──
function injectBackgroundGlows() {
  const glowsHTML = `
    <div class="bg-glow bg-glow--purple"></div>
    <div class="bg-glow bg-glow--blue"></div>
  `;
  document.body.insertAdjacentHTML('afterbegin', glowsHTML);
}

// ── Carousel Navigation ──
function setupCarousel(carouselId, prevId, nextId, scrollAmount = 300) {
  const carousel = document.getElementById(carouselId);
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);

  if (prev && carousel) {
    prev.addEventListener('click', () => {
      carousel.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    });
  }

  if (next && carousel) {
    next.addEventListener('click', () => {
      carousel.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    });
  }
}

// ── Netflix-Style Cinematic Intro ──
function injectCinematicIntro() {
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    @import url('https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap');

    /* ── Cinematic Intro Overlay ── */
    #proxyIntro {
      position: fixed;
      inset: 0;
      z-index: 99999;
      background: #000000;
      display: flex;
      align-items: center;
      justify-content: center;
      pointer-events: all;
      transition: opacity 0.8s cubic-bezier(0.25, 1, 0.5, 1);
      overflow: hidden;
    }
    #proxyIntro.fade-out {
      opacity: 0;
      pointer-events: none;
    }
    
    /* Ambient Moving Light Glows */
    .intro-glow {
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      opacity: 0;
      transition: opacity 2s ease;
      filter: blur(120px);
    }
    .intro-glow-pink {
      width: 55vw;
      height: 55vw;
      background: radial-gradient(circle, rgba(255, 77, 109, 0.18) 0%, transparent 70%);
      top: 10%;
      left: 10%;
    }
    .intro-glow-purple {
      width: 65vw;
      height: 65vw;
      background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
      bottom: 5%;
      right: 5%;
    }
    
    @keyframes slowPulsePink {
      0%, 100% { transform: scale(1) translate(0, 0); opacity: 0.7; }
      50% { transform: scale(1.15) translate(4vw, -3vh); opacity: 1; }
    }
    @keyframes slowPulsePurple {
      0%, 100% { transform: scale(1.15) translate(0, 0); opacity: 0.7; }
      50% { transform: scale(1) translate(-4vw, 3vh); opacity: 1; }
    }
    
    .intro-glow-pink.visible {
      opacity: 1;
      animation: slowPulsePink 10s ease-in-out infinite alternate;
    }
    .intro-glow-purple.visible {
      opacity: 1;
      animation: slowPulsePurple 12s ease-in-out infinite alternate;
    }

    .intro-letters {
      display: flex;
      align-items: baseline;
      gap: 0.02em;
      white-space: nowrap;
      transform-origin: center center;
      transition: transform 1.5s cubic-bezier(0.25, 1, 0.5, 1),
                  filter 1.5s cubic-bezier(0.25, 1, 0.5, 1),
                  opacity 1.5s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .intro-letters.zoom {
      transform: scale(1.8) translateZ(100px);
      filter: blur(20px);
      opacity: 0;
    }
    
    .intro-letter {
      font-family: 'Great Vibes', cursive;
      font-size: clamp(6.5rem, 18vw, 15rem);
      font-weight: 400;
      letter-spacing: 0.02em;
      color: #ffffff;
      opacity: 0;
      filter: blur(20px);
      transform: translateY(40px) scale(0.85);
      display: inline-block;
      transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                  transform 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                  filter 1.2s cubic-bezier(0.16, 1, 0.3, 1),
                  text-shadow 0.8s ease;
    }
    .intro-letter.visible {
      opacity: 1;
      filter: blur(0);
      transform: translateY(0) scale(1);
    }
    
    /* Hyper-realistic Glow Colors */
    .intro-letter.red {
      color: #ff85a1; /* Soft pink-red */
      text-shadow: 0 0 20px rgba(255, 117, 143, 0.6),
                   0 0 40px rgba(255, 77, 109, 0.4),
                   0 0 80px rgba(255, 77, 109, 0.2),
                   0 0 150px rgba(255, 77, 109, 0.1);
    }
    .intro-letter.white {
      color: #fff5f6; /* White with a hint of rose */
      text-shadow: 0 0 15px rgba(255, 255, 255, 0.5),
                   0 0 35px rgba(255, 240, 243, 0.3),
                   0 0 70px rgba(255, 240, 243, 0.1);
    }
  `;
  document.head.appendChild(style);

  // Inject HTML
  const intro = document.createElement('div');
  intro.id = 'proxyIntro';
  intro.innerHTML = `
    <div class="intro-glow intro-glow-pink" id="introGlowPink"></div>
    <div class="intro-glow intro-glow-purple" id="introGlowPurple"></div>
    <div class="intro-letters" id="introLetters">
      <span class="intro-letter red" data-delay="500">P</span>
      <span class="intro-letter white" data-delay="1100">r</span>
      <span class="intro-letter white" data-delay="1700">o</span>
      <span class="intro-letter red" data-delay="2300">X</span>
      <span class="intro-letter white" data-delay="2900">y</span>
    </div>
  `;
  document.body.prepend(intro);

  // Animate letters one-by-one
  const letters = intro.querySelectorAll('.intro-letter');
  const lettersContainer = intro.querySelector('#introLetters');

  letters.forEach(letter => {
    const delay = parseInt(letter.dataset.delay);
    setTimeout(() => {
      letter.classList.add('visible');
    }, delay);
  });

  // Show ambient glows
  setTimeout(() => {
    const pinkGlow = intro.querySelector('#introGlowPink');
    const purpleGlow = intro.querySelector('#introGlowPurple');
    if (pinkGlow) pinkGlow.classList.add('visible');
    if (purpleGlow) purpleGlow.classList.add('visible');
  }, 300);

  // After all letters visible — brief pause, then zoom toward camera
  setTimeout(() => {
    lettersContainer.classList.add('zoom');
  }, 4000);

  // Fade out the intro overlay
  setTimeout(() => {
    intro.classList.add('fade-out');
  }, 4600);

  // Remove from DOM completely
  setTimeout(() => {
    intro.remove();
    style.remove();
  }, 5400);
}

// ── Auto-inject intro on every page ──
(function() {
  // We determine if we should play the intro:
  // 1. If 'site_loaded' is not set in sessionStorage (first time opening the website in this tab/session).
  // 2. OR if the page is a manual reload.
  const isReload = (
    window.performance &&
    window.performance.getEntriesByType &&
    window.performance.getEntriesByType('navigation')[0] &&
    window.performance.getEntriesByType('navigation')[0].type === 'reload'
  ) || (
    window.performance &&
    window.performance.navigation &&
    window.performance.navigation.type === 1
  );

  let hasLoaded = false;
  try {
    hasLoaded = sessionStorage.getItem('site_loaded');
  } catch (e) {
    // If sessionStorage is disabled (e.g., sandbox or strict privacy settings), fallback to false
    hasLoaded = false;
  }

  if (!hasLoaded || isReload) {
    // Inject immediately so the black screen covers the page before any paint
    injectCinematicIntro();
    try {
      // Mark as loaded so subsequent navigation in the same session skips the intro
      sessionStorage.setItem('site_loaded', 'true');
    } catch (e) {}
  }
})();

// ── Export for use ──
window.ProxyUI = {
  injectNavbar,
  setupSearchOverlay,
  setupCubeInteractions,
  injectBackgroundGlows,
  setupCarousel,
  injectCinematicIntro,
};

// Global smooth scroll interceptor for home section links
document.addEventListener('DOMContentLoaded', () => {
  document.body.addEventListener('click', (e) => {
    const link = e.target.closest('a');
    if (!link) return;
    const href = link.getAttribute('href');
    if (href && (href.startsWith('/index.html#') || href.startsWith('index.html#') || href.startsWith('#'))) {
      const isHome = window.location.pathname === '/' || window.location.pathname === '/index.html' || window.location.pathname.endsWith('/index.html');
      
      // If we are on home page, intercept click to smooth scroll
      if (isHome) {
        const hashParts = href.split('#');
        const targetId = hashParts[1];
        if (targetId) {
          e.preventDefault();
          const targetElement = document.getElementById(targetId);
          if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            // Close mobile menu overlay if active
            const overlay = document.getElementById('mobileMenuOverlay');
            if (overlay && (overlay.classList.contains('active') || overlay.style.display === 'flex')) {
              overlay.classList.remove('active');
              overlay.style.display = 'none';
            }
            history.pushState(null, null, `#${targetId}`);
          }
        }
      }
    }
  });

  // If page loads with a hash, smooth scroll to it
  const hash = window.location.hash;
  if (hash) {
    setTimeout(() => {
      const target = document.getElementById(hash.substring(1));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 450);
  }
});
