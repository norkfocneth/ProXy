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
        <li><a class="nav-link${activePage === 'Notes Provider' ? ' active' : ''}" href="/pages/notes-provider.html">Notes Provider</a></li>
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
        <li><a class="${activePage === 'Notes Provider' ? 'active' : ''}" href="/pages/notes-provider.html">Notes Provider</a></li>
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

/* ============================================================
   PROXY AI — Study Assistant (Local Engine & Floating Widget)
   ============================================================ */

const ProxyAI = {
  knowledge: {
    subjects: {
      "es-107": {
        name: "Engineering Graphics",
        code: "ES-107",
        sem: 1,
        important: [
          "Projections of points and straight lines",
          "Projections and section of solids",
          "Development of surfaces of solids",
          "Isometric projections and basic CAD commands"
        ],
        tips: "Maintain sheet neatness. Master orthographic to isometric conversions. Practice layout drawings and projections."
      },
      "bs-112": {
        name: "Applied Physics-1",
        code: "BS-112",
        sem: 1,
        important: [
          "Interference (Newton's Rings, Michelson Interferometer)",
          "Fraunhofer Diffraction (Single slit, Diffraction grating, Resolving power)",
          "Polarization (Nicol Prism, Double refraction)",
          "Lasers (Einstein's Coefficients, Ruby & He-Ne lasers) & Optical Fibers (Numerical Aperture)"
        ],
        tips: "Optics diagrams are extremely important. Memorize Einstein's coefficient derivations and practice Numerical Aperture formulas for optical fibers."
      },
      "bs-111": {
        name: "Applied Mathematics-1",
        code: "BS-111",
        sem: 1,
        important: [
          "Matrices (Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Diagonalization)",
          "Differential Calculus (Leibnitz Theorem, Maclaurin's and Taylor's Series)",
          "Partial Differentiation (Euler's Theorem, Jacobians, Maxima/Minima for 2 variables)",
          "Integral Calculus (Double/Triple Integrals, Area & Volume calculation)"
        ],
        tips: "Matrices & successive differentiation are scoring. Practice Leibnitz theorem proofs and double integration area calculations."
      },
      "es-109": {
        name: "Manufacturing Processes",
        code: "ES-109",
        sem: 1,
        important: [
          "Casting processes & pattern making",
          "Metal forming & shaping (forging, rolling, extrusion)",
          "Joining processes (arc welding, gas welding, brazing)",
          "Lathe machine & sheet metal operations"
        ],
        tips: "Focus on casting defect causes and neat diagrams of lathe operations and welding setups."
      },
      "hs-101": {
        name: "Environmental Science",
        code: "HS-101",
        sem: 1,
        important: [
          "Ecosystem structure, food chains & energy flow",
          "Natural resources conservation & management",
          "Air, water, soil, and noise pollution control",
          "Climate change, ozone depletion & environmental acts"
        ],
        tips: "Use bullet points and clear examples for environmental laws and pollution control methods."
      },
      "es-105": {
        name: "Electrical Science",
        code: "ES-105",
        sem: 1,
        important: [
          "DC Circuits: Thevenin, Norton, Superposition, Max Power Transfer theorems",
          "AC Circuits: Single phase RLC series/parallel, resonance",
          "Transformers: Principle, EMF equation, efficiency & regulation",
          "Electrical Machines: DC machines operating principles, single phase induction motors"
        ],
        tips: "Numericals on Network Theorems and RLC circuits are guaranteed. Draw neat phasor diagrams for AC circuit problems."
      },
      "bs-113": {
        name: "Applied Chemistry-1",
        code: "BS-113",
        sem: 1,
        important: [
          "Water Technology (EDTA estimation, boiler troubles, water softening)",
          "Fuels & Combustion (Calorific value determination, Coal analysis)",
          "Polymers (Thermoplastics vs Thermosetting, composite materials)",
          "Corrosion & its Control (Electrochemical corrosion, cathodic protection)"
        ],
        tips: "EDTA numericals and boiler troubles are very common. Focus on corrosion mechanisms and polymer structures."
      },
      "hs-102": {
        name: "Communication Skills",
        code: "HS-102",
        sem: 1,
        important: [
          "Communication process, barriers, verbal/non-verbal",
          "Grammar: Active-passive, direct-indirect, common errors",
          "Technical Writing: Letters, resumes, report writing, emails",
          "Speaking Skills: GDs, presentations, interviews"
        ],
        tips: "Write structured emails and resumes. Focus on report layout styles and professional letter formats."
      },
      "cs-101": {
        name: "Programming in C",
        code: "CS-101",
        sem: 1,
        important: [
          "C fundamentals: operators, expressions",
          "Control Structures: Loops (for, while, do-while), arrays and strings",
          "Functions: parameter passing (value vs reference), recursion",
          "Pointers: Pointer arithmetic, dynamic memory allocation (malloc, calloc), File handling"
        ],
        tips: "Draw dry-run tables for loops, write clear code with comments, and understand pointers and file I/O thoroughly."
      },
      "bs-121": {
        name: "Applied Mathematics 2",
        code: "BS-121",
        sem: 2,
        important: [
          "Ordinary Differential Equations (ODE of higher order, Variation of Parameters)",
          "Vector Calculus (Gradient, divergence, curl, Line integrals, Green's, Gauss, and Stokes' theorems)",
          "Laplace Transforms (Elementary transforms, inverse Laplace, Convolution theorem)"
        ],
        tips: "Laplace convolution and Vector integral theorems (Gauss divergence/Stokes) are very important. Practice steps carefully."
      },
      "bs-122": {
        name: "Applied Physics 2",
        code: "BS-122",
        sem: 2,
        important: [
          "Electromagnetic Theory (Maxwell's equations, displacement current)",
          "Quantum Mechanics (de Broglie waves, Heisenberg uncertainty, Schrodinger equation)",
          "Statistical Mechanics (Maxwell-Boltzmann, Bose-Einstein, Fermi-Dirac)",
          "Solid State Physics (Crystal structures, Bravais lattice, superconductivity)"
        ],
        tips: "Derivation of Maxwell's equations and Schrodinger's time-dependent/independent equations are core. Practice crystal structure definitions."
      },
      "es-110": {
        name: "Workshop",
        code: "ES-110",
        sem: 2,
        important: [
          "Fitting shop tools, filing, sawing, and tapping operations",
          "Carpentry shop joints & timber classification",
          "Welding & foundry shop joint preparations",
          "Machine shop lathe operations & safety practices"
        ],
        tips: "Focus on neat sketches of joints (dovetail, mortise & tenon) and lathe tool terminology."
      },
      "es-108": {
        name: "Engineering Mechanics",
        code: "ES-108",
        sem: 2,
        important: [
          "Force Systems: Coplanar concurrent forces, resultant, Lami's theorem",
          "Equilibrium of Rigid Bodies: Free body diagrams, trusses (Method of Joints)",
          "Centroid and Moment of Inertia (Parallel axis theorem)",
          "Friction: Laws, wedge friction, belt friction"
        ],
        tips: "Always draw a Free Body Diagram (FBD) first. Equilibrium equations sum(Fx)=0, sum(Fy)=0, sum(M)=0 solve most problems."
      },
      "cs-122": {
        name: "Programming in C++",
        code: "CS-122",
        sem: 2,
        important: [
          "OOP principles: Classes, Objects, constructors, destructors",
          "Function & Operator overloading, friend functions",
          "Inheritance (virtual base classes), Polymorphism (virtual functions)",
          "Templates, STL containers, Exception handling"
        ],
        tips: "Understand the memory layout of classes and virtual tables. Memorize templates and standard container methods (vector, list, map)."
      },
      "es-106": {
        name: "Basic Electronics Engineering",
        code: "ES-106",
        sem: 2,
        important: [
          "Semiconductor Diodes: PN junction, rectifiers, clippers/clampers",
          "BJT: CE/CB/CC configurations, biasing, load line analysis",
          "FET & MOSFET characteristics, Operational Amplifiers (Op-Amps)",
          "Digital Electronics: Number systems, Boolean algebra, Logic gates"
        ],
        tips: "Draw clean circuit diagrams. Memorize Op-Amp configurations (inverting, non-inverting, adder, differentiator) and BJT equations."
      },
      "es-108": {
        name: "Engineering Mechanics",
        code: "ES-108",
        sem: 2,
        important: [
          "Force Systems: Coplanar concurrent forces, resultant, Lami's theorem",
          "Equilibrium of Rigid Bodies: Free body diagrams, trusses (Method of Joints)",
          "Centroid and Moment of Inertia (Parallel axis theorem)",
          "Friction: Laws, wedge friction, belt friction"
        ],
        tips: "Always draw a Free Body Diagram (FBD) first. Equilibrium equations sum(Fx)=0, sum(Fy)=0, sum(M)=0 solve most problems."
      },
      "hs-102": {
        name: "Communication Skills",
        code: "HS-102",
        sem: 2,
        important: [
          "Communication process, barriers, verbal/non-verbal",
          "Grammar: Active-passive, direct-indirect, common errors",
          "Technical Writing: Letters, resumes, report writing, emails",
          "Speaking Skills: GDs, presentations, interviews"
        ],
        tips: "Write structured emails and resumes. Focus on report layout styles and professional letter formats."
      },
      "cs-201": {
        name: "Discrete Mathematics",
        code: "CS-201",
        sem: 3,
        important: [
          "Set theory, relations, partial orderings, functions",
          "Propositional and predicate logic, inference rules, mathematical induction",
          "Algebraic structures: Monoids, groups, rings, fields",
          "Graph Theory: Paths, Eulerian & Hamiltonian paths, trees, graph coloring"
        ],
        tips: "Practice logic truth tables, group proofs (identity, inverse), and graph theory algorithms (Eulerian path conditions)."
      },
      "cs-203": {
        name: "Data Structures",
        code: "CS-203",
        sem: 3,
        important: [
          "Complexity analysis, arrays, linked lists (single, double, circular)",
          "Stacks, Queues, recursion implementation",
          "Trees: Binary trees, traversals, AVL trees (rotations), B-trees, heaps",
          "Graphs: Representation, BFS, DFS, searching & sorting, hashing"
        ],
        tips: "Write step-by-step trace tables for sorting and AVL insertions. Understand recursive algorithms and time complexity."
      },
      "cs-205": {
        name: "Digital Logic and Computer Design",
        code: "CS-205",
        sem: 3,
        important: [
          "Register Transfer and Microoperations",
          "Basic Computer Organization: instruction cycle, registers, interrupts",
          "CPU Design: stack organization, addressing modes, RISC vs CISC",
          "Memory & Pipeline: Cache mapping, virtual memory, pipelining"
        ],
        tips: "Focus on cache mapping (direct, associative, set-associative) numericals and CPU addressing modes."
      },
      "cs-207": {
        name: "Object Oriented Programming",
        code: "CS-207",
        sem: 3,
        important: [
          "Java Basics: JVM, inheritance, polymorphism, interfaces, packages",
          "Exceptions & I/O: try-catch, custom exceptions, byte/character streams",
          "Multithreading: lifecycle, synchronization, inter-thread communication",
          "Applets & Swing event handling, JDBC connectivity"
        ],
        tips: "Be clear on dynamic method dispatch, thread synchronization concepts, and write clean Java fragments for exams."
      },
      "bs-203": {
        name: "Computational Methods (CSE)",
        code: "BS-203",
        sem: 3,
        important: [
          "Error Analysis, Bisection, Regula-Falsi, Newton-Raphson",
          "Gauss Elimination, Gauss-Jordan, Jacobi, Gauss-Seidel",
          "Newton's Interpolation, Trapezoidal, Simpson's 1/3 and 3/8 rules",
          "Taylor's Series, Euler's Method, Runge-Kutta 4th Order"
        ],
        tips: "Practice numeric algorithms carefully. Duality and formula steps carry high marks."
      },
      "cs-203-cse": {
        name: "DATA STRUCTURE CSE",
        code: "CS-203-CSE",
        sem: 3,
        important: [
          "Complexity analysis, arrays, linked lists (single, double, circular)",
          "Stacks, Queues, recursion implementation",
          "Trees: Binary trees, traversals, AVL trees (rotations), B-trees, heaps",
          "Graphs: Representation, BFS, DFS, searching & sorting, hashing"
        ],
        tips: "Write step-by-step trace tables for sorting and AVL insertions. Understand recursive algorithms and time complexity."
      },
      "bs-204": {
        name: "Probability, Statistics and Linear Programming",
        code: "BS-204",
        sem: 4,
        important: [
          "Probability distributions: Binomial, Poisson, Normal, Joint and marginal distributions",
          "Statistics: Sampling theory, Estimation, Hypothesis testing (t-test, F-test, Chi-square)",
          "Linear Programming: Graphical method, Simplex method, Big-M, Two-Phase methods",
          "Duality in LPP, Dual simplex method, Transportation and Assignment problems"
        ],
        tips: "Practice Simplex tables and big-M steps carefully. Joint distribution calculations and hypothesis testing are major marks."
      },
      "cs-204": {
        name: "Database Management Systems",
        code: "CS-204",
        sem: 4,
        important: [
          "Database Architecture, data independence, schemas, ER models",
          "Relational algebra, SQL commands (DDL, DML, DQL), Joins, Subqueries",
          "Relational Database Design: Functional dependencies, Normalization (1NF to BCNF)",
          "Transaction & Concurrency: ACID properties, Serializability, locking & timestamping protocols"
        ],
        tips: "Practice SQL queries and normalization decomp. Concurrency schedules and serializability checks are highly important."
      },
      "cs-206": {
        name: "Theory of Computation",
        code: "CS-206",
        sem: 4,
        important: [
          "Finite Automata: DFA, NFA conversion, regular expressions, pumping lemma",
          "Context-Free Grammars: CFGs, parsing, Chomsky and Greibach Normal Forms",
          "Pushdown Automata: PDA design, equivalence with CFGs",
          "Turing Machines: TM design, Halting problem, Undecidability, P/NP complexity"
        ],
        tips: "Ensure correct transitions for DFA/NFA and PDA designs. Master CFG normalizations and Turing Machine programming."
      },
      "cs-208": {
        name: "Circuits and Systems",
        code: "CS-208",
        sem: 4,
        important: [
          "Signals & Systems: Continuous/discrete, LTI systems, Laplace transform",
          "Fourier Series/Transform, Z-Transform, analysis of LTI systems",
          "Network Theorems: Thevenin, Norton, Superposition, Maximum Power, Two-port parameters (Z, Y, ABCD, h)",
          "State Variable Analysis of Circuits, filters (Butterworth, Chebyshev), passive/active synthesis"
        ],
        tips: "Make sure you master two-port parameter conversions and Laplace/Z-transform applications for system equations."
      },
      "cs-210": {
        name: "Programming in Java",
        code: "CS-210",
        sem: 4,
        important: [
          "Java basics, JVM, JDK, Classes, Objects, Inheritance, Polymorphism",
          "Interfaces, Packages, Exception handling, I/O streams file access",
          "Multithreading: Lifecycle, synchronization. Collections Framework (List, Set, Map)",
          "GUI programming with Swing/AWT, Event handling, JDBC database connection"
        ],
        tips: "Write clean, compile-ready Java code snippets for collections, exception try-catch blocks, and thread synchronization."
      },
      "hs-202": {
        name: "Technical Writing",
        code: "HS-202",
        sem: 4,
        important: [
          "Introduction to Technical Communication, characteristics, audience analysis",
          "Technical writing genres: Reports, manuals, proposals, specs",
          "Professional correspondence: Resumes, cover letters, emails, letters",
          "Research papers formatting & citations (IEEE, APA), oral presentations"
        ],
        tips: "Be familiar with resume structures, IEEE citation formats, and the standard layouts of reports and proposals."
      },
      "cs-301": {
        name: "Design & Analysis of Algorithms",
        code: "CS-301",
        sem: 5,
        important: [
          "Algorithm Analysis: Asymptotic notations, Master method",
          "Divide & Conquer, Greedy Algorithms: Merge sort, Quick sort, Knapsack, Huffman, Spanning trees",
          "Dynamic Programming, Backtracking: Matrix chain multiplication, LCS, 0/1 Knapsack, N-Queens",
          "Complexity Classes: P, NP, NP-Hard, NP-Complete problems"
        ],
        tips: "Practice dynamic programming state transitions and Master theorem recurrences. Standard algorithm steps (Dijkstra, Kruskal) are frequently asked."
      },
      "cs-303": {
        name: "Computer Networks",
        code: "CS-303",
        sem: 5,
        important: [
          "OSI and TCP/IP stack layers",
          "Data Link Layer: sliding window protocols, MAC sublayer framing, error control",
          "Network Layer: IP addressing, subnetting, routing (OSPF, BGP), congestion control",
          "Transport & App Layers: TCP vs UDP headers, DNS, HTTP, SMTP, network security"
        ],
        tips: "IP subnetting and TCP handshake diagrams are crucial. Learn sliding window protocol efficiency calculations."
      },
      "cs-305": {
        name: "Java Programming",
        code: "CS-305",
        sem: 5,
        important: [
          "Interfaces, packages, inner classes, Exception handling",
          "Collections framework: List, Set, Map, Generics, Serialization",
          "Socket programming, RMI architecture",
          "Servlet & JSP lifecycle, JDBC database connections"
        ],
        tips: "Draw the servlet lifecycle phase diagram and practice JDBC connection snippets."
      },
      "cs-307": {
        name: "Software Testing",
        code: "CS-307",
        sem: 5,
        important: [
          "Testing Concepts: Verification, validation, test suites",
          "Functional & Structural Testing: Boundary value, equivalence partitioning, path testing",
          "Specialized Testing: Integration, system, regression, acceptance testing",
          "Test automation: JUnit, Selenium frameworks"
        ],
        tips: "Master cyclomatic complexity calculations and equivalence class partition cases."
      },
      "cs-309": {
        name: "Compiler Design",
        code: "CS-309",
        sem: 5,
        important: [
          "Phases of compiler, Lexical Analyzer generation (LEX)",
          "Parsing Techniques: LL(1), LR parsing (SLR, LALR, CLR), parser generators (YACC)",
          "Syntax-Directed Translation: SDD, SDTS, intermediate code (three-address code)",
          "Code Optimization: loop optimization, data flow analysis, DAG"
        ],
        tips: "Practice LL(1) parsing table construction (FIRST and FOLLOW) and LR item sets."
      },
      "cs-302": {
        name: "Artificial Intelligence",
        code: "CS-302",
        sem: 6,
        important: [
          "State space search, heuristics (A*, AO*), minimax, alpha-beta pruning",
          "Knowledge representation, predicate logic, resolution, semantic nets",
          "Probabilistic reasoning under uncertainty, Bayesian networks, fuzzy logic",
          "NLP stages, expert systems, machine learning introduction"
        ],
        tips: "A* search trace and alpha-beta pruning trees are common numericals. Draw clear resolution trees."
      },
      "cs-304": {
        name: "Computer Graphics",
        code: "CS-304",
        sem: 6,
        important: [
          "Video display devices, scan conversion: DDA and Bresenham line/circle algorithms",
          "2D Transformations: translation, rotation, scaling, reflection, shearing. Cohen-Sutherland clipping",
          "3D Graphics: transformations, projection (parallel vs perspective), Bezier & B-Spline curves",
          "Rendering: Z-buffer, Phong & Gouraud shading, illumination models"
        ],
        tips: "DDA and Bresenham line/circle algorithm derivations are guaranteed. Learn 2D homogeneous transformation matrix multiplications."
      },
      "cs-306": {
        name: "Data Warehousing & Data Mining",
        code: "CS-306",
        sem: 6,
        important: [
          "Data Warehouse architecture, schemas (Star, Snowflake), OLAP operations",
          "Data preprocessing: cleaning, integration, reduction, transformation",
          "Association rule mining: Apriori algorithm, FP-Growth. Decision trees, Naive Bayes",
          "Clustering: K-means, hierarchical methods, outlier detection"
        ],
        tips: "Apriori calculation and Decision Tree entropy/gain calculations are very important."
      },
      "cs-308": {
        name: "Cryptography & Network Security",
        code: "CS-308",
        sem: 6,
        important: [
          "Symmetric key cryptography (DES, AES), block cipher modes",
          "Public key: RSA algorithm, Diffie-Hellman Key Exchange, ECC",
          "Hash functions (MD5, SHA-512), digital signatures, MACs",
          "Web security: IPSec, SSL/TLS, firewalls, IDS"
        ],
        tips: "RSA numerical encryption/decryption steps and Diffie-Hellman key math are highly scoring."
      },
      "es-312": {
        name: "Microprocessors & Microcontrollers",
        code: "ES-312",
        sem: 6,
        important: [
          "8085 Architecture: pin details, registers, timing diagrams",
          "8086: Internal architecture, segmentation, assembly instruction set",
          "Peripheral interfacing: 8255 PPI, 8253 PIT, 8259 PIC, DMA 8257",
          "8051 Microcontroller architecture, memory organization, SFRs"
        ],
        tips: "8086 bus cycle timing and assembly coding (like array sorting, addition) are core. Memorize peripheral control words."
      },
      "cs-401": {
        name: "Information Security",
        code: "CS-401",
        sem: 7,
        important: [
          "Security policies and models (Bell-LaPadula, Biba), access control",
          "Database security: SQL injection prevention, auditing",
          "IT Act, cyber laws, intellectual property rights (IPR)",
          "Intrusion detection, threat modeling, firewalls, cyber forensics"
        ],
        tips: "BLP and Biba transition rules are theoretical mainstays. Learn SQL injection mitigation techniques."
      },
      "cs-403": {
        name: "Software Project Management",
        code: "CS-403",
        sem: 7,
        important: [
          "Project plan lifecycle models, feasibility study",
          "Cost estimation: COCOMO models, Function Point analysis, PERT/CPM charts",
          "Risk management: mitigation, monitoring. Resource allocation",
          "Quality assurance: ISO 9001, CMMI levels, project team structures"
        ],
        tips: "Draw PERT/CPM networks to find critical path and slack times. Practice COCOMO cost/effort numericals."
      },
      "ec-405": {
        name: "Wireless Communication",
        code: "EC-405",
        sem: 7,
        important: [
          "Cellular concept: frequency reuse, handoff, co-channel interference",
          "Propagation: free-space path loss, multipath fading",
          "Access techniques: FDMA, TDMA, CDMA, OFDM, MIMO",
          "Standards: GSM, GPRS, LTE, 5G architectures"
        ],
        tips: "Cellular capacity and frequency reuse factor math are key. Draw clean GSM/GPRS architecture diagrams."
      },
      "cs-407": {
        name: "Machine Learning",
        code: "CS-407",
        sem: 7,
        important: [
          "Linear and logistic regression, decision trees, SVM",
          "Neural Networks: Perceptrons, backpropagation, CNNs, RNNs",
          "Unsupervised: K-means, PCA dimensionality reduction",
          "Reinforcement learning: MDP, Q-learning, deep Q-networks"
        ],
        tips: "Know the math behind gradient descent, SVM hyperplane equations, and draw feedforward neural network layouts."
      },
      "cs-402": {
        name: "Mobile Computing",
        code: "CS-402",
        sem: 8,
        important: [
          "Mobile architectures, GSM & GPRS networks",
          "Wireless LAN: 802.11 MAC layer protocols, Bluetooth",
          "Mobile network layer: Mobile IP routing, DHCP. Transport: Mobile TCP",
          "Mobile app platforms: Android vs iOS, MANET routing"
        ],
        tips: "Mobile IP routing registration phases and MANET routing protocols (AODV, DSR) are important."
      },
      "cs-404": {
        name: "Cloud Computing",
        code: "CS-404",
        sem: 8,
        important: [
          "Cloud model, virtualization types, hypervisors",
          "Service models: SaaS, PaaS, IaaS. Deployment models",
          "Cloud storage, resource scheduling, cloud security",
          "AWS, GCP, Azure, Docker & Kubernetes"
        ],
        tips: "Virtualization hypervisor architectures (Type-1 vs Type-2) and SaaS/PaaS/IaaS differences are essential."
      },
      "cs-406": {
        name: "Natural Language Processing",
        code: "CS-406",
        sem: 8,
        important: [
          "Tokenization, stemming, lemmatization, N-grams",
          "POS Tagging, Context-Free Grammars, dependency parsing",
          "Lexical semantics, WordNet, word embeddings (Word2Vec, GloVe)",
          "Machine translation, sentiment analysis, transformers (BERT, GPT)"
        ],
        tips: "N-gram probability math and POS tagger algorithms are highly scoring. Understand attention mechanisms."
      }
    },
    study: {
      general: "To score high in GGSIPU exams:<br>1. **Focus on past 5 years PYQs**—frequently repeated questions carry up to 70% weightage!<br>2. **Write structured theory answers** with clear headings, bullet points, and neat architecture/block diagrams.<br>3. **Solve numericals** in Math, Physics, BEE, Electronics, and DBMS Normalization/Scheduling first, as they award full marks.<br>4. **Download unit-wise PDF notes** from Proxy's Notes shelf to revise formula sheets and definitions quickly."
    },
    team: {
      intro: "Proxy was developed by a team of dedicated GGSIPU engineering students to make quality resources easily accessible to all:",
      members: {
        "arnav": "**Arnav Focneth** (Founder & Chief Architect): Designs and codes the Proxy educational engines, UI systems, and resources layout.",
        "manya": "**Manya Arya** (Content & Academic Lead): Compiles syllabus docs, compiles premium notes, PYQs, and organizes academic updates.",
        "priyanka": "**Priyanka Kaim** (Creative Designer): Creates stunning posters, social visuals, 3D mockups, landing page designs, and visual assets.",
        "samarth": "**Samarth Agnihotri** (QA & Operations): In charge of QA testing, device rendering compatibility, bugs debugging, and documentation."
      }
    }
  },

  getResponse(userText) {
    const text = userText.toLowerCase().trim();
    
    // Greeting & Small Talk
    if (/hi|hello|hey|greetings|yo/.test(text)) {
      return `Hey there! ⚡ I'm **Proxy AI**, your GGSIPU academic companion.
      <br><br>
      What semester are you in? Ask me about any semester or subject!
      <br><br>
      You can also try:
      <ul>
        <li>**"important topics for sem 3"**</li>
        <li>**"how to study maths 1"**</li>
        <li>**"who built this website?"**</li>
      </ul>`;
    }

    if (/how are you|how's it going|how do you do/.test(text)) {
      return `I'm doing great, thank you! I'm here and fully loaded to help you prepare for your GGSIPU exams. How is your preparation going?`;
    }

    if (/who are you|what is your name|what are you/.test(text)) {
      return `I am **Proxy AI** ⚡, a dedicated assistant built to help GGSIPU engineering students find notes, syllabus topics, and exam preparation strategies.`;
    }

    // Help
    if (/help|what can you do|features|info/.test(text)) {
      return `I can help you navigate GGSIPU engineering resources! Ask me anything about:
      <br><br>
      • **Syllabus**: "What is in semester 3 CSE?"<br>
      • **Important topics**: "important topics for DBMS"<br>
      • **Study tips**: "how to pass BEE"<br>
      • **Notes**: "download physics notes"<br>
      • **Founders**: "who made proxy"`;
    }

    // Thanks
    if (/thank|thanks|great|cool|awesome|helpful/.test(text)) {
      return `You're welcome! 😊 Let me know if you have any other questions. Good luck with your studies!`;
    }

    // Notes/PYQs/Roadmaps finder
    if (/notes|pyq|paper|roadmaps|syllabus/.test(text) && !/sem|semester|[1-8]/.test(text)) {
      if (/notes/.test(text)) {
        return `You can find premium curated notes on our **Notes page**. We divide subjects into 4 units matching the GGSIPU syllabus.
        <br><br>
        ➔ <a href="/pages/notes.html">Go to Notes Shelf 📚</a>`;
      }
      if (/pyq|paper/.test(text)) {
        return `You can access Previous Year Question (PYQ) papers organized by subject and year.
        <br><br>
        ➔ <a href="/pages/pyqs.html">Go to PYQs Database 📂</a>`;
      }
      if (/roadmap/.test(text)) {
        return `We have interactive roadmaps for career paths (Frontend, Backend, etc.).
        <br><br>
        ➔ <a href="/pages/roadmaps.html">Go to Career Roadmaps 🚀</a>`;
      }
    }

    // Founders
    if (/founder|team|who built|creator|made by|arnav|manya|priyanka|samarth/.test(text)) {
      let resp = `${this.knowledge.team.intro}<br><br>`;
      if (/arnav/.test(text)) resp += `• ${this.knowledge.team.members.arnav}<br>`;
      else if (/manya/.test(text)) resp += `• ${this.knowledge.team.members.manya}<br>`;
      else if (/priyanka/.test(text)) resp += `• ${this.knowledge.team.members.priyanka}<br>`;
      else if (/samarth/.test(text)) resp += `• ${this.knowledge.team.members.samarth}<br>`;
      else {
        resp += `• ${this.knowledge.team.members.arnav}<br><br>
                 • ${this.knowledge.team.members.manya}<br><br>
                 • ${this.knowledge.team.members.priyanka}<br><br>
                 • ${this.knowledge.team.members.samarth}<br><br>`;
      }
      resp += `➔ <a href="/pages/founders.html">View Team Page 👥</a>`;
      return resp;
    }

    // Dynamic Semester Resolution
    let semMatch = text.match(/semester\s*([1-8])|sem\s*([1-8])|([1-8])(st|nd|rd|th)\s*sem|([1-8])\s*semester/);
    let requestedSem = null;
    if (semMatch) {
      requestedSem = parseInt(semMatch[1] || semMatch[2] || semMatch[3] || semMatch[5]);
    } else {
      if (text.includes("first") || text.includes(" 1st") || text.includes(" 1 ")) requestedSem = 1;
      else if (text.includes("second") || text.includes(" 2nd") || text.includes(" 2 ")) requestedSem = 2;
      else if (text.includes("third") || text.includes(" 3rd") || text.includes(" 3 ")) requestedSem = 3;
      else if (text.includes("fourth") || text.includes(" 4th") || text.includes(" 4 ")) requestedSem = 4;
      else if (text.includes("fifth") || text.includes(" 5th") || text.includes(" 5 ")) requestedSem = 5;
      else if (text.includes("sixth") || text.includes(" 6th") || text.includes(" 6 ")) requestedSem = 6;
      else if (text.includes("seventh") || text.includes(" 7th") || text.includes(" 7 ")) requestedSem = 7;
      else if (text.includes("eighth") || text.includes(" 8th") || text.includes(" 8 ")) requestedSem = 8;
    }

    if (requestedSem && (/important|topic|syllabus|subject|all|list|read|study/.test(text) || text.includes("sem") || text.includes("semester"))) {
      const semSubjects = [];
      for (let key in this.knowledge.subjects) {
        if (this.knowledge.subjects[key].sem === requestedSem) {
          semSubjects.push(this.knowledge.subjects[key]);
        }
      }
      if (semSubjects.length > 0) {
        let response = `Here are the **important topics** for all subjects in **Semester ${requestedSem}**:<br><br>`;
        semSubjects.forEach(sub => {
          response += `<span style="font-size: 1.05rem; font-weight: 700; color: var(--accent, #7c3aed);">${sub.name} (${sub.code})</span><br>`;
          response += `**Important Topics:**<br>`;
          sub.important.forEach(item => {
            response += `• ${item}<br>`;
          });
          response += `*Study Tip:* ${sub.tips}<br>`;
          response += `➔ <a href="/pages/notes.html?subject=${sub.code}">Download Notes 📚</a><br><br>`;
        });
        return response;
      }
    }

    // General Study Strategy
    if (/how to study|how to pass|study tips|preparation|strategy/.test(text) && !/math|physics|chemistry|c\+\+|java|ds|algorithm|dbms|os|networks|compiler|bee|electronics|mechanics/.test(text)) {
      return `Here is a study strategy for GGSIPU exams:<br><br>${this.knowledge.study.general}`;
    }

    // Subject checks
    let foundSub = null;
    let isImportantQuery = /important|topic|unit|what is in|contents/.test(text);
    let isStudyQuery = /study|pass|prepare|how to/.test(text);

    const matches = {
      "math": ["math", "mathematics", "calc", "matrices", "laplace"],
      "physics": ["physics", "wave", "optics", "quantum"],
      "chemistry": ["chemistry", "polymer", "corrosion"],
      "cs-101": ["programming in c", " c ", "c programming"],
      "cs-122": ["programming in c++", "c++", "cpp"],
      "java": ["java", "oop java"],
      "cs-203": ["data structure", " ds ", "linked list", "tree", "graph"],
      "cs-208": ["algorithm", "ada", "complexity", "knapsack"],
      "cs-204": ["dbms", "database", "sql", "normalization"],
      "cs-206": ["operating system", " os ", "banker", "paging", "deadlock", "scheduling"],
      "compiler": ["compiler", "parser", "lex"],
      "networks": ["network", "networks", "tcp", "ip", "osi"],
      "testing": ["testing", "selenium", "junit"],
      "ai": ["artificial intelligence", " ai "],
      "graphics": ["graphics", "dda", "bresenham"],
      "crypto": ["crypto", "cryptography", "rsa", "aes", "security"],
      "cloud": ["cloud", "saas", "paas"],
      "mobile": ["mobile computing", "android", "ios"],
      "es-105": ["bee", "electrical", "thevenin", "norton", "transformer"],
      "es-106": ["electronics", "diode", "transistor", "op-amp"],
      "es-108": ["mechanics", "statics", "friction"],
      "hs-102": ["communication", "technical writing"]
    };

    for (let key in matches) {
      for (let keyword of matches[key]) {
        if (text.includes(keyword)) {
          if (key === "math") {
            if (text.includes("i ") || text.includes(" 1") || text.includes("first")) foundSub = "bs-111";
            else if (text.includes("ii") || text.includes(" 2") || text.includes("second")) foundSub = "bs-121";
            else if (text.includes("iv") || text.includes(" 4") || text.includes("fourth")) foundSub = "bs-204";
            else foundSub = "bs-111";
          } else if (key === "physics") {
            if (text.includes("ii") || text.includes(" 2")) foundSub = "bs-122";
            else foundSub = "bs-112";
          } else if (key === "java") {
            if (text.includes("advanced") || text.includes("enterprise") || text.includes("servlet")) foundSub = "cs-305";
            else foundSub = "cs-207";
          } else {
            foundSub = key;
          }
          break;
        }
      }
      if (foundSub) break;
    }

    if (foundSub && this.knowledge.subjects[foundSub]) {
      const sub = this.knowledge.subjects[foundSub];
      let response = `**${sub.name} (${sub.code})** — Semester ${sub.sem}<br><br>`;
      
      if (isImportantQuery) {
        response += `Here are the **important topics** to focus on:<br>`;
        sub.important.forEach(item => {
          response += `• ${item}<br>`;
        });
        response += `<br>${sub.tips}`;
      } else if (isStudyQuery) {
        response += `**Preparation strategy:**<br>${sub.tips}<br><br>Make sure to practice past papers on our PYQ page.`;
      } else {
        response += `**Important topics include:**<br>`;
        sub.important.slice(0, 3).forEach(item => {
          response += `• ${item}<br>`;
        });
        response += `<br>**Study advice:** ${sub.tips}`;
      }
      
      response += `<br><br>➔ <a href="/pages/notes.html?subject=${sub.code}">Download ${sub.code} Notes 📚</a>`;
      return response;
    }

    return `Hmm, I couldn't find a direct match for your question.
    <br><br>
    Proxy contains notes, roadmaps, and previous year papers for **GGSIPU Engineering**. If you're looking for notes or PYQs for a specific subject, try:
    <ul>
      <li>Searching for topics like **"Operating Systems important topics"** or **"Applied Maths study tips"**</li>
      <li>Visiting our <a href="/pages/notes.html">Notes page ➔</a></li>
      <li>Visiting our <a href="/pages/pyqs.html">PYQs page ➔</a></li>
    </ul>`;
  }
};


// Dynamic Injection of AI Assistant and Calculator Widgets
(function() {
  const isAIAssistantPage = window.location.pathname.includes('ai-assistant.html');
  
  // Inject CSS
  const style = document.createElement('style');
  style.textContent = `
    /* AI Bubble styles */
    .proxy-ai-bubble {
      position: fixed;
      bottom: 30px;
      right: 30px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: var(--accent-gradient, linear-gradient(135deg, #7c3aed 0%, #3b82f6 100%));
      border: 1px solid rgba(255,255,255,0.25);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(124, 58, 237, 0.35);
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .proxy-ai-bubble:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 12px 40px rgba(124, 58, 237, 0.5);
    }
    .proxy-ai-bubble:active {
      transform: scale(0.95);
    }
    .proxy-ai-bubble.active {
      transform: rotate(45deg) scale(0.9);
      background: var(--accent, #7c3aed);
    }

    /* Chat Card style */
    .proxy-ai-card {
      position: fixed;
      bottom: 100px;
      right: 30px;
      width: 380px;
      height: 580px;
      max-height: calc(100vh - 150px);
      background: var(--glass-bg-strong, rgba(255, 255, 255, 0.75));
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.6));
      border-radius: 24px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: var(--shadow-lg, 0 20px 50px rgba(0, 0, 0, 0.08));
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9998;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .proxy-ai-card.active {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* Card Header */
    .proxy-ai-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--glass-border-subtle, rgba(255, 255, 255, 0.35));
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255,255,255,0.08);
    }
    .proxy-ai-header-info {
      display: flex;
      flex-direction: column;
    }
    .proxy-ai-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary, #0f172a);
      display: flex;
      align-items: center;
      gap: 6px;
    }
    .proxy-ai-pulse-dot {
      width: 8px;
      height: 8px;
      background: #10b981;
      border-radius: 50%;
      box-shadow: 0 0 8px #10b981;
      animation: pulse-dot 2s infinite;
    }
    .proxy-ai-subtitle {
      font-size: 0.75rem;
      color: var(--text-muted, #94a3b8);
    }
    .proxy-ai-close {
      background: transparent;
      border: none;
      color: var(--text-secondary, #475569);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 50%;
      transition: background 0.2s;
    }
    .proxy-ai-close:hover {
      background: rgba(0,0,0,0.06);
      color: var(--text-primary, #0f172a);
    }

    /* Chat Messages */
    .proxy-ai-messages {
      flex: 1;
      padding: 1.25rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
      -webkit-overflow-scrolling: touch;
    }
    .proxy-ai-msg {
      max-width: 85%;
      padding: 0.85rem 1.1rem;
      border-radius: 18px;
      font-size: 0.92rem;
      line-height: 1.5;
      animation: msgFadeIn 0.3s ease forwards;
    }
    .proxy-ai-msg-user {
      background: var(--accent, #7c3aed);
      color: white;
      align-self: flex-end;
      border-bottom-right-radius: 4px;
    }
    .proxy-ai-msg-bot {
      background: rgba(0,0,0,0.05);
      color: var(--text-primary, #0f172a);
      align-self: flex-start;
      border-bottom-left-radius: 4px;
    }
    .proxy-ai-msg-bot a {
      color: var(--accent, #7c3aed);
      text-decoration: none;
      font-weight: 600;
      display: inline-flex;
      align-items: center;
      gap: 4px;
    }
    .proxy-ai-msg-bot a:hover {
      text-decoration: underline;
    }

    /* Chat Suggestions Chips */
    .proxy-ai-chips {
      display: flex;
      gap: 8px;
      overflow-x: auto;
      padding: 8px 1.25rem;
      scrollbar-width: none;
      flex-shrink: 0;
      border-top: 1px solid var(--glass-border-subtle, rgba(255,255,255,0.3));
    }
    .proxy-ai-chips::-webkit-scrollbar {
      display: none;
    }
    .proxy-ai-chip {
      padding: 6px 12px;
      background: rgba(124, 58, 237, 0.07);
      border: 1px solid rgba(124, 58, 237, 0.15);
      color: var(--accent, #7c3aed);
      font-size: 0.82rem;
      font-weight: 500;
      border-radius: 100px;
      cursor: pointer;
      white-space: nowrap;
      transition: all 0.2s;
    }
    .proxy-ai-chip:hover {
      background: var(--accent, #7c3aed);
      color: white;
      border-color: var(--accent, #7c3aed);
      transform: translateY(-1px);
    }

    /* Chat Footer Input */
    .proxy-ai-footer {
      padding: 1rem 1.25rem;
      border-top: 1px solid var(--glass-border-subtle, rgba(255,255,255,0.3));
      background: rgba(255,255,255,0.03);
      display: flex;
      gap: 8px;
    }
    .proxy-ai-input-wrapper {
      flex: 1;
      display: flex;
      background: var(--glass-bg-strong, rgba(255,255,255,0.65));
      border: 1px solid var(--glass-border, rgba(255,255,255,0.6));
      border-radius: 20px;
      padding: 4px 6px;
    }
    .proxy-ai-input {
      flex: 1;
      background: transparent;
      border: none;
      outline: none;
      padding: 6px 12px;
      color: var(--text-primary, #0f172a);
      font-size: 0.95rem;
    }
    .proxy-ai-send {
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background: var(--accent, #7c3aed);
      border: none;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s;
    }
    .proxy-ai-send:hover {
      background: var(--accent-hover, #6d28d9);
      transform: scale(1.05);
    }

    /* Bunk & CGPA Bubble Styles (Left Side) */
    .proxy-bunk-bubble {
      position: fixed;
      bottom: 30px;
      left: 30px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #f59e0b 0%, #ef4444 100%);
      border: 1px solid rgba(255,255,255,0.25);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(239, 68, 68, 0.35);
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .proxy-bunk-bubble:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 12px 40px rgba(239, 68, 68, 0.5);
    }
    .proxy-bunk-bubble:active {
      transform: scale(0.95);
    }
    .proxy-bunk-bubble.active {
      transform: rotate(45deg) scale(0.9);
      background: #ef4444;
    }

    .proxy-cgpa-bubble {
      position: fixed;
      bottom: 96px;
      left: 30px;
      width: 56px;
      height: 56px;
      border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #3b82f6 100%);
      border: 1px solid rgba(255,255,255,0.25);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      cursor: pointer;
      box-shadow: 0 8px 32px rgba(16, 185, 129, 0.35);
      z-index: 9999;
      transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
    }
    .proxy-cgpa-bubble:hover {
      transform: scale(1.1) translateY(-3px);
      box-shadow: 0 12px 40px rgba(16, 185, 129, 0.5);
    }
    .proxy-cgpa-bubble:active {
      transform: scale(0.95);
    }
    .proxy-cgpa-bubble.active {
      transform: scale(0.9);
      background: #10b981;
    }

    /* Left Side Tool Card Base Style */
    .proxy-tool-card {
      position: fixed;
      bottom: 100px;
      left: 30px;
      width: 380px;
      height: 560px;
      max-height: calc(100vh - 150px);
      background: var(--glass-bg-strong, rgba(255, 255, 255, 0.75));
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.6));
      border-radius: 24px;
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      box-shadow: var(--shadow-lg, 0 20px 50px rgba(0, 0, 0, 0.08));
      display: flex;
      flex-direction: column;
      overflow: hidden;
      z-index: 9998;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      transition: all 0.35s cubic-bezier(0.25, 1, 0.5, 1);
    }
    .proxy-tool-card.active {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: all;
    }

    /* Tool Card Elements */
    .proxy-tool-header {
      padding: 1.25rem 1.5rem;
      border-bottom: 1px solid var(--glass-border-subtle, rgba(255, 255, 255, 0.35));
      display: flex;
      align-items: center;
      justify-content: space-between;
      background: rgba(255,255,255,0.08);
    }
    .proxy-tool-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--text-primary, #0f172a);
    }
    .proxy-tool-close {
      background: transparent;
      border: none;
      color: var(--text-secondary, #475569);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 6px;
      border-radius: 50%;
      transition: background 0.2s;
    }
    .proxy-tool-close:hover {
      background: rgba(0,0,0,0.06);
      color: var(--text-primary, #0f172a);
    }

    .proxy-tabs {
      display: flex;
      border-bottom: 1px solid var(--glass-border-subtle, rgba(255,255,255,0.3));
      background: rgba(255,255,255,0.02);
      flex-shrink: 0;
    }
    .proxy-tab {
      flex: 1;
      padding: 12px;
      background: transparent;
      border: none;
      font-size: 0.9rem;
      font-weight: 600;
      color: var(--text-muted, #94a3b8);
      cursor: pointer;
      transition: all 0.2s;
      text-align: center;
    }
    .proxy-tab.active {
      color: var(--accent, #7c3aed);
      border-bottom: 2px solid var(--accent, #7c3aed);
      background: rgba(124, 58, 237, 0.04);
    }

    .proxy-tool-body {
      flex: 1;
      padding: 1.25rem;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .proxy-form-group {
      display: flex;
      flex-direction: column;
      gap: 6px;
    }
    .proxy-form-group label {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-secondary, #475569);
    }
    .proxy-input, .proxy-select {
      padding: 10px 14px;
      background: var(--glass-bg-strong, rgba(255,255,255,0.65));
      border: 1px solid var(--glass-border, rgba(255, 255, 255, 0.6));
      border-radius: 12px;
      color: var(--text-primary, #0f172a);
      font-size: 0.95rem;
      outline: none;
      transition: all 0.2s;
    }
    .proxy-input:focus, .proxy-select:focus {
      border-color: var(--accent, #7c3aed);
      box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.15);
    }
    .proxy-btn {
      padding: 12px;
      background: var(--accent, #7c3aed);
      border: none;
      border-radius: 12px;
      color: white;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.2s;
      flex-shrink: 0;
    }
    .proxy-btn:hover {
      background: var(--accent-hover, #6d28d9);
      transform: translateY(-1px);
    }
    .proxy-btn:active {
      transform: translateY(0);
    }

    /* Result Box styling */
    .proxy-result-box {
      margin-top: 10px;
      padding: 1rem;
      background: rgba(124, 58, 237, 0.06);
      border: 1px dashed rgba(124, 58, 237, 0.25);
      border-radius: 16px;
      display: none;
      flex-direction: column;
      gap: 8px;
      animation: msgFadeIn 0.3s ease forwards;
    }
    .proxy-result-title {
      font-size: 1.1rem;
      font-weight: 700;
      color: var(--accent, #7c3aed);
    }
    .proxy-result-comment {
      font-size: 0.92rem;
      font-style: italic;
      color: var(--text-primary, #0f172a);
      line-height: 1.4;
    }
    .proxy-result-detail {
      font-size: 0.85rem;
      color: var(--text-secondary, #475569);
      line-height: 1.4;
    }

    /* Progress bar */
    .proxy-progress-container {
      width: 100%;
      height: 8px;
      background: rgba(0,0,0,0.06);
      border-radius: 4px;
      overflow: hidden;
      margin-top: 4px;
    }
    .proxy-progress-bar {
      height: 100%;
      width: 0%;
      background: var(--accent, #7c3aed);
      border-radius: 4px;
      transition: width 0.5s ease-in-out;
    }

    /* Subject list in SGPA */
    .proxy-subject-row {
      display: grid;
      grid-template-columns: 1.5fr 0.6fr 1fr;
      align-items: center;
      gap: 10px;
      padding: 8px 0;
      border-bottom: 1px solid rgba(0,0,0,0.04);
    }
    .proxy-subject-name {
      font-size: 0.85rem;
      font-weight: 600;
      color: var(--text-primary, #0f172a);
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .proxy-subject-credit {
      font-size: 0.8rem;
      color: var(--text-muted, #94a3b8);
      text-align: center;
    }

    /* Keyframes */
    @keyframes pulse-dot {
      0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.4); }
      70% { box-shadow: 0 0 0 6px rgba(16, 185, 129, 0); }
      100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
    }
    @keyframes msgFadeIn {
      from { opacity: 0; transform: translateY(8px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Mobile responsive */
    @media (max-width: 768px) {
      .proxy-ai-card, .proxy-tool-card {
        width: 92%;
        right: 4%;
        left: 4%;
        bottom: 20px;
        height: 75vh;
      }
      .proxy-bunk-bubble {
        bottom: 30px;
        left: 20px;
      }
      .proxy-cgpa-bubble {
        bottom: 96px;
        left: 20px;
      }
      .proxy-ai-bubble {
        bottom: 30px;
        right: 20px;
      }
    }
  `;
  document.head.appendChild(style);

  if (isAIAssistantPage) {
    // Hook to existing UI on the ai-assistant page
    document.addEventListener('DOMContentLoaded', () => {
      const messagesContainer = document.querySelector('.chat-messages');
      const chatInput = document.querySelector('.chat-input');
      const sendBtn = document.querySelector('.chat-send-btn');

      if (!messagesContainer || !chatInput || !sendBtn) return;

      messagesContainer.innerHTML = `
        <div class="message message--ai">
          <div class="message-avatar">✨</div>
          <div class="message-bubble">
            Hi! I'm your Proxy AI. I can help you find notes, explain complex topics from your syllabus, or solve PYQs. What do you need help with today?
          </div>
        </div>
      `;

      function appendMessage(sender, text) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message message--${sender}`;
        msgDiv.innerHTML = `
          <div class="message-avatar">${sender === 'ai' ? '✨' : 'U'}</div>
          <div class="message-bubble">${text}</div>
        `;
        messagesContainer.appendChild(msgDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
      }

      function handleSendMessage() {
        const text = chatInput.value.trim();
        if (!text) return;
        
        appendMessage('user', text);
        chatInput.value = '';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'message message--ai typing-msg-temp';
        typingDiv.innerHTML = `
          <div class="message-avatar">✨</div>
          <div class="message-bubble" style="padding: 1rem 1.5rem;">
            <div class="typing-indicator">
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
              <div class="typing-dot"></div>
            </div>
          </div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        setTimeout(() => {
          typingDiv.remove();
          const response = ProxyAI.getResponse(text);
          appendMessage('ai', response);
        }, 1200);
      }

      sendBtn.addEventListener('click', handleSendMessage);
      chatInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSendMessage();
      });
    });
  }

  // Inject floating elements (except bubbles if on AI assistant page, but calculators are shown everywhere!)
  document.addEventListener('DOMContentLoaded', () => {
    // 1. Inject Right Side AI bubble and card if not on the dedicated AI page
    let bubble, card;
    if (!isAIAssistantPage) {
      bubble = document.createElement('div');
      bubble.className = 'proxy-ai-bubble';
      bubble.id = 'proxyAIBubble';
      bubble.innerHTML = '✨';
      
      card = document.createElement('div');
      card.className = 'proxy-ai-card';
      card.id = 'proxyAICard';
      card.innerHTML = `
        <div class="proxy-ai-header">
          <div class="proxy-ai-header-info">
            <span class="proxy-ai-title">Proxy AI <span class="proxy-ai-pulse-dot"></span></span>
            <span class="proxy-ai-subtitle">Your Academic Companion</span>
          </div>
          <button class="proxy-ai-close" id="proxyAIClose">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>
        <div class="proxy-ai-messages" id="proxyAIMessages">
          <div class="proxy-ai-msg proxy-ai-msg-bot">
            Hey! I am **Proxy AI** ⚡
            <br><br>
            I can help you navigate GGSIPU notes, PYQs, syllabus details, and study strategies. Ask me anything!
          </div>
        </div>
        <div class="proxy-ai-chips">
          <button class="proxy-ai-chip" data-query="Syllabus details">📚 Syllabus</button>
          <button class="proxy-ai-chip" data-query="Important topics for Data Structures">📝 Important Topics</button>
          <button class="proxy-ai-chip" data-query="How to study for BEE">🚀 Study Tips</button>
          <button class="proxy-ai-chip" data-query="Who built proxy?">👥 Founders</button>
        </div>
        <div class="proxy-ai-footer">
          <div class="proxy-ai-input-wrapper">
            <input type="text" class="proxy-ai-input" id="proxyAIInput" placeholder="Ask a question...">
          </div>
          <button class="proxy-ai-send" id="proxyAISend">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>
      `;
      document.body.appendChild(bubble);
      document.body.appendChild(card);
    }

    // 2. Inject Left Side Bunk and CGPA elements on every page
    const bunkBubble = document.createElement('div');
    bunkBubble.className = 'proxy-bunk-bubble';
    bunkBubble.id = 'proxyBunkBubble';
    bunkBubble.innerHTML = '🏫';

    const cgpaBubble = document.createElement('div');
    cgpaBubble.className = 'proxy-cgpa-bubble';
    cgpaBubble.id = 'proxyCGPABubble';
    cgpaBubble.innerHTML = '🎓';

    const bunkCard = document.createElement('div');
    bunkCard.className = 'proxy-tool-card';
    bunkCard.id = 'proxyBunkCard';
    bunkCard.innerHTML = `
      <div class="proxy-tool-header">
        <span class="proxy-tool-title">Bunk Calculator 🏫</span>
        <button class="proxy-tool-close" id="proxyBunkClose">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="proxy-tool-body">
        <div style="font-size: 0.82rem; color: var(--text-secondary, #475569); line-height: 1.4; margin-bottom: 6px;">
          GGSIPU requires at least **75% attendance**. Calculate if you can bunk or how many classes you must attend!
        </div>
        <div class="proxy-form-group">
          <label for="bunkAttended">Classes Attended so far</label>
          <input type="number" class="proxy-input" id="bunkAttended" min="0" placeholder="e.g. 15">
        </div>
        <div class="proxy-form-group">
          <label for="bunkTotal">Total Classes conducted so far</label>
          <input type="number" class="proxy-input" id="bunkTotal" min="1" placeholder="e.g. 20">
        </div>
        <button class="proxy-btn" id="btnCalculateBunk">Calculate Attendance 📊</button>
        
        <div class="proxy-result-box" id="bunkResultBox">
          <span class="proxy-result-title" id="bunkResultPercent">0% Attendance</span>
          <div class="proxy-progress-container">
            <div class="proxy-progress-bar" id="bunkProgressBar"></div>
          </div>
          <p class="proxy-result-comment" id="bunkResultComment"></p>
          <p class="proxy-result-detail" id="bunkResultDetail"></p>
        </div>
      </div>
    `;

    const cgpaCard = document.createElement('div');
    cgpaCard.className = 'proxy-tool-card';
    cgpaCard.id = 'proxyCGPACard';
    cgpaCard.innerHTML = `
      <div class="proxy-tool-header">
        <span class="proxy-tool-title">CGPA & SGPA Calculator 🎓</span>
        <button class="proxy-tool-close" id="proxyCGPAClose">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>
      </div>
      <div class="proxy-tabs">
        <button class="proxy-tab active" id="tabSGPA">SGPA Calculator</button>
        <button class="proxy-tab" id="tabCGPA">CGPA Calculator</button>
      </div>
      <div class="proxy-tool-body">
        <!-- SGPA Section -->
        <div id="sectionSGPA" style="display: flex; flex-direction: column; gap: 14px;">
          <div class="proxy-form-group">
            <label for="sgpaSemester">Select Semester</label>
            <select class="proxy-select" id="sgpaSemester">
              <option value="" disabled selected>Choose Semester...</option>
              <option value="1">Semester 1</option>
              <option value="2">Semester 2</option>
              <option value="3">Semester 3</option>
              <option value="4">Semester 4</option>
              <option value="5">Semester 5</option>
              <option value="6">Semester 6</option>
              <option value="7">Semester 7</option>
              <option value="8">Semester 8</option>
            </select>
          </div>
          <div id="sgpaSubjectsContainer" style="display: flex; flex-direction: column; gap: 8px; max-height: 250px; overflow-y: auto; padding-right: 4px;">
            <p style="font-size: 0.85rem; color: var(--text-muted, #94a3b8); text-align: center; margin: 10px 0;">Select a semester to load subjects.</p>
          </div>
          <button class="proxy-btn" id="btnCalculateSGPA" style="display: none;">Calculate SGPA 📊</button>
        </div>

        <!-- CGPA Section -->
        <div id="sectionCGPA" style="display: none; flex-direction: column; gap: 10px;">
          <p style="font-size: 0.82rem; color: var(--text-secondary, #475569); line-height: 1.4; margin-bottom: 2px;">Enter SGPAs below. We use standard semester credits to calculate your overall CGPA.</p>
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
            <div class="proxy-form-group">
              <label for="cgpaSem1">Sem 1 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem1" step="0.01" min="0" max="10" placeholder="e.g. 8.5">
            </div>
            <div class="proxy-form-group">
              <label for="cgpaSem2">Sem 2 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem2" step="0.01" min="0" max="10" placeholder="e.g. 8.2">
            </div>
            <div class="proxy-form-group">
              <label for="cgpaSem3">Sem 3 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem3" step="0.01" min="0" max="10" placeholder="e.g. 7.9">
            </div>
            <div class="proxy-form-group">
              <label for="cgpaSem4">Sem 4 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem4" step="0.01" min="0" max="10" placeholder="e.g. 8.0">
            </div>
            <div class="proxy-form-group">
              <label for="cgpaSem5">Sem 5 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem5" step="0.01" min="0" max="10" placeholder="e.g. 8.3">
            </div>
            <div class="proxy-form-group">
              <label for="cgpaSem6">Sem 6 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem6" step="0.01" min="0" max="10" placeholder="e.g. 8.6">
            </div>
            <div class="proxy-form-group">
              <label for="cgpaSem7">Sem 7 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem7" step="0.01" min="0" max="10" placeholder="e.g. 9.0">
            </div>
            <div class="proxy-form-group">
              <label for="cgpaSem8">Sem 8 SGPA</label>
              <input type="number" class="proxy-input" id="cgpaSem8" step="0.01" min="0" max="10" placeholder="e.g. 9.1">
            </div>
          </div>
          <button class="proxy-btn" id="btnCalculateCGPA">Calculate CGPA 📊</button>
        </div>

        <!-- Result Box Shared -->
        <div class="proxy-result-box" id="cgpaResultBox">
          <span class="proxy-result-title" id="cgpaResultTitle">Your Score</span>
          <p class="proxy-result-comment" id="cgpaResultComment"></p>
          <p class="proxy-result-detail" id="cgpaResultDetail"></p>
        </div>
      </div>
    `;

    document.body.appendChild(bunkBubble);
    document.body.appendChild(cgpaBubble);
    document.body.appendChild(bunkCard);
    document.body.appendChild(cgpaCard);

    // Helpers to manage toggling of widgets
    function closeAllWidgets() {
      bunkCard.classList.remove('active');
      bunkBubble.classList.remove('active');
      cgpaCard.classList.remove('active');
      cgpaBubble.classList.remove('active');
      if (card) {
        card.classList.remove('active');
        bubble.classList.remove('active');
        bubble.innerHTML = '✨';
      }
    }

    // Toggle Bunk Calculator
    bunkBubble.addEventListener('click', () => {
      const isOpen = bunkCard.classList.contains('active');
      closeAllWidgets();
      if (!isOpen) {
        bunkCard.classList.add('active');
        bunkBubble.classList.add('active');
      }
    });
    bunkCard.querySelector('#proxyBunkClose').addEventListener('click', closeAllWidgets);

    // Toggle CGPA Calculator
    cgpaBubble.addEventListener('click', () => {
      const isOpen = cgpaCard.classList.contains('active');
      closeAllWidgets();
      if (!isOpen) {
        cgpaCard.classList.add('active');
        cgpaBubble.classList.add('active');
      }
    });
    cgpaCard.querySelector('#proxyCGPAClose').addEventListener('click', closeAllWidgets);

    // AI Assistant toggle handler (if bubble/card exist)
    if (bubble && card) {
      bubble.addEventListener('click', () => {
        const isOpen = card.classList.contains('active');
        closeAllWidgets();
        if (!isOpen) {
          card.classList.add('active');
          bubble.classList.add('active');
          bubble.innerHTML = '✕';
          setTimeout(() => card.querySelector('#proxyAIInput').focus(), 150);
        }
      });
      card.querySelector('#proxyAIClose').addEventListener('click', closeAllWidgets);

      // Setup chat logic
      const msgsContainer = card.querySelector('#proxyAIMessages');
      const input = card.querySelector('#proxyAIInput');
      const sendBtn = card.querySelector('#proxyAISend');
      const chips = card.querySelectorAll('.proxy-ai-chip');

      function appendBotMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'proxy-ai-msg proxy-ai-msg-bot';
        msg.innerHTML = text;
        msgsContainer.appendChild(msg);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
      }

      function appendUserMessage(text) {
        const msg = document.createElement('div');
        msg.className = 'proxy-ai-msg proxy-ai-msg-user';
        msg.innerText = text;
        msgsContainer.appendChild(msg);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;
      }

      function handleSend(textToSend) {
        const query = textToSend || input.value.trim();
        if (!query) return;

        appendUserMessage(query);
        if (!textToSend) input.value = '';

        const typingDiv = document.createElement('div');
        typingDiv.className = 'proxy-ai-msg proxy-ai-msg-bot';
        typingDiv.innerHTML = `
          <div style="display:flex; gap: 4px; padding: 4px 0;">
            <div style="width:6px; height:6px; background:var(--text-muted, #94a3b8); border-radius:50%; animation: typing 1.4s infinite ease-in-out both;"></div>
            <div style="width:6px; height:6px; background:var(--text-muted, #94a3b8); border-radius:50%; animation: typing 1.4s infinite ease-in-out both; animation-delay: -0.32s;"></div>
            <div style="width:6px; height:6px; background:var(--text-muted, #94a3b8); border-radius:50%; animation: typing 1.4s infinite ease-in-out both; animation-delay: -0.16s;"></div>
          </div>
          <style>
            @keyframes typing {
              0%, 80%, 100% { transform: scale(0); }
              40% { transform: scale(1); }
            }
          </style>
        `;
        msgsContainer.appendChild(typingDiv);
        msgsContainer.scrollTop = msgsContainer.scrollHeight;

        setTimeout(() => {
          typingDiv.remove();
          const reply = ProxyAI.getResponse(query);
          appendBotMessage(reply);
        }, 1200);
      }

      sendBtn.addEventListener('click', () => handleSend());
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') handleSend();
      });

      chips.forEach(chip => {
        chip.addEventListener('click', () => {
          const query = chip.getAttribute('data-query');
          handleSend(query);
        });
      });
    }

    // ==========================================
    // BUNK CALCULATOR LOGIC
    // ==========================================
    const btnCalculateBunk = bunkCard.querySelector('#btnCalculateBunk');
    const bunkAttendedInput = bunkCard.querySelector('#bunkAttended');
    const bunkTotalInput = bunkCard.querySelector('#bunkTotal');
    const bunkResultBox = bunkCard.querySelector('#bunkResultBox');
    const bunkResultPercent = bunkCard.querySelector('#bunkResultPercent');
    const bunkProgressBar = bunkCard.querySelector('#bunkProgressBar');
    const bunkResultComment = bunkCard.querySelector('#bunkResultComment');
    const bunkResultDetail = bunkCard.querySelector('#bunkResultDetail');

    const bunkPositiveComments = [
      "Arre wah! Sarkaari damad banoge, full attendance! 💅",
      "Bade tejasvi log hain hamare paas! Ghumi-ghumi kar sakte ho thoda. 🌴",
      "Ghar waale proud hain tumpe! Safe zone me ho. 😎",
      "Attendance check pass! Topper vibes ultra pro max. 🚀"
    ];

    const bunkNegativeComments = [
      "Oh beta ji! Professor se dosti badhao, detention khatra mandra raha hai! 😱",
      "Proxy lagwane ka time aa gaya hai, ya chupchap class chale jao! 🏃‍♂️",
      "Ghar walo ko kya bologe? College me ghumi-ghumi band karo! 🙊",
      "Borderline danger zone! Attendance criteria 75% door dikh raha hai. 💀"
    ];

    btnCalculateBunk.addEventListener('click', () => {
      const A = parseInt(bunkAttendedInput.value);
      const H = parseInt(bunkTotalInput.value);

      if (isNaN(A) || isNaN(H) || A < 0 || H <= 0) {
        alert("Please enter valid attended and total classes (Total must be greater than 0).");
        return;
      }
      if (A > H) {
        alert("Classes attended cannot be greater than total classes held!");
        return;
      }

      const percent = parseFloat(((A / H) * 100).toFixed(1));
      bunkResultPercent.innerText = `${percent}% Attendance`;
      bunkProgressBar.style.width = `${percent}%`;

      if (percent >= 75) {
        bunkProgressBar.style.background = "#10b981"; // green
        const bunkLimit = Math.floor((4 * A - 3 * H) / 3);
        const comment = bunkPositiveComments[Math.floor(Math.random() * bunkPositiveComments.length)];
        
        bunkResultComment.innerText = comment;
        if (bunkLimit > 0) {
          bunkResultDetail.innerHTML = `You can consecutively bunk next **${bunkLimit}** class(es) safely without falling below 75%!`;
        } else {
          bunkResultDetail.innerHTML = `You are exactly at 75% attendance. Bunking any classes right now is risky!`;
        }
      } else {
        bunkProgressBar.style.background = "#ef4444"; // red
        const reqClasses = (3 * H) - (4 * A);
        const comment = bunkNegativeComments[Math.floor(Math.random() * bunkNegativeComments.length)];
        
        bunkResultComment.innerText = comment;
        bunkResultDetail.innerHTML = `You must attend the next **${reqClasses}** class(es) consecutively to cross GGSIPU's 75% attendance threshold!`;
      }

      bunkResultBox.style.display = 'flex';
      setTimeout(() => {
        bunkResultBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 80);
      setTimeout(() => {
        bunkResultBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);
    });

    // ==========================================
    // CGPA & SGPA CALCULATOR LOGIC
    // ==========================================
    const tabSGPA = cgpaCard.querySelector('#tabSGPA');
    const tabCGPA = cgpaCard.querySelector('#tabCGPA');
    const sectionSGPA = cgpaCard.querySelector('#sectionSGPA');
    const sectionCGPA = cgpaCard.querySelector('#sectionCGPA');
    const cgpaResultBox = cgpaCard.querySelector('#cgpaResultBox');
    const cgpaResultTitle = cgpaCard.querySelector('#cgpaResultTitle');
    const cgpaResultComment = cgpaCard.querySelector('#cgpaResultComment');
    const cgpaResultDetail = cgpaCard.querySelector('#cgpaResultDetail');

    // Tab Switching
    tabSGPA.addEventListener('click', () => {
      tabSGPA.classList.add('active');
      tabCGPA.classList.remove('active');
      sectionSGPA.style.display = 'flex';
      sectionCGPA.style.display = 'none';
      cgpaResultBox.style.display = 'none';
    });

    tabCGPA.addEventListener('click', () => {
      tabCGPA.classList.add('active');
      tabSGPA.classList.remove('active');
      sectionCGPA.style.display = 'flex';
      sectionSGPA.style.display = 'none';
      cgpaResultBox.style.display = 'none';
    });

    // Load subjects for SGPA
    const sgpaSemester = cgpaCard.querySelector('#sgpaSemester');
    const sgpaSubjectsContainer = cgpaCard.querySelector('#sgpaSubjectsContainer');
    const btnCalculateSGPA = cgpaCard.querySelector('#btnCalculateSGPA');

    // Credit mappings helper
    function getCreditForSubject(code) {
      code = code.toUpperCase();
      if (code.startsWith("BS-111") || code.startsWith("BS-121") || code.startsWith("BS-204")) return 4;
      if (code.startsWith("CS-101") || code.startsWith("CS-122") || code.startsWith("CS-201") || 
          code.startsWith("CS-203") || code.startsWith("CS-205") || code.startsWith("CS-207") || 
          code.startsWith("CS-204") || code.startsWith("CS-206") || code.startsWith("CS-208") || 
          code.startsWith("CS-301") || code.startsWith("CS-303") || code.startsWith("CS-305") || 
          code.startsWith("CS-309")) return 4;
      return 3;
    }

    sgpaSemester.addEventListener('change', () => {
      const sem = parseInt(sgpaSemester.value);
      if (isNaN(sem)) return;

      sgpaSubjectsContainer.innerHTML = '';
      const subjects = [];
      for (let key in ProxyAI.knowledge.subjects) {
        if (ProxyAI.knowledge.subjects[key].sem === sem) {
          subjects.push(ProxyAI.knowledge.subjects[key]);
        }
      }

      if (subjects.length === 0) {
        sgpaSubjectsContainer.innerHTML = '<p style="font-size: 0.85rem; color: var(--text-muted, #94a3b8); text-align: center; margin: 10px 0;">No subjects found for this semester.</p>';
        btnCalculateSGPA.style.display = 'none';
        return;
      }

      subjects.forEach(sub => {
        const credit = getCreditForSubject(sub.code);
        const row = document.createElement('div');
        row.className = 'proxy-subject-row';
        row.dataset.code = sub.code;
        row.dataset.credit = credit;
        row.innerHTML = `
          <span class="proxy-subject-name" title="${sub.name}">${sub.name}</span>
          <span class="proxy-subject-credit">${credit} Cr</span>
          <select class="proxy-select sgpa-grade-select" style="padding: 4px 8px; font-size: 0.82rem; border-radius: 8px;">
            <option value="10">O (10)</option>
            <option value="9">A+ (9)</option>
            <option value="8">A (8)</option>
            <option value="7">B+ (7)</option>
            <option value="6">B (6)</option>
            <option value="5">C (5)</option>
            <option value="4">P (4)</option>
            <option value="0">F (0)</option>
          </select>
        `;
        sgpaSubjectsContainer.appendChild(row);
      });

      btnCalculateSGPA.style.display = 'block';
    });

    const scoreComments = [
      { max: 10, min: 9.0, text: "Aap toh devta hain! Universe ko control kar rahe ho. 🌌" },
      { max: 9.0, min: 8.0, text: "Bohot badhiya score! Placement cell wale aapko dhoond rahe honge. 💼" },
      { max: 8.0, min: 7.0, text: "Safe zone! GGSIPU standard pass. Party banti hai. 🎉" },
      { max: 7.0, min: 5.0, text: "Average score, thodi aur mehnat karni padegi dost! 📚" },
      { max: 5.0, min: 0.0, text: "Chud gaye guru! Agli baar backlog mat aane dena. 💀" }
    ];

    function getScoreComment(val) {
      for (let c of scoreComments) {
        if (val >= c.min && val <= c.max) return c.text;
      }
      return "Sahi khel gaye!";
    }

    // Calculate SGPA
    btnCalculateSGPA.addEventListener('click', () => {
      const rows = sgpaSubjectsContainer.querySelectorAll('.proxy-subject-row');
      let totalPoints = 0;
      let totalCredits = 0;

      rows.forEach(row => {
        const credit = parseFloat(row.dataset.credit);
        const gradeVal = parseFloat(row.querySelector('.sgpa-grade-select').value);
        totalPoints += (credit * gradeVal);
        totalCredits += credit;
      });

      if (totalCredits === 0) return;

      const sgpaVal = parseFloat((totalPoints / totalCredits).toFixed(2));
      cgpaResultTitle.innerText = `SGPA: ${sgpaVal}`;
      cgpaResultComment.innerText = getScoreComment(sgpaVal);
      cgpaResultDetail.innerHTML = `Total Credits: **${totalCredits}** | Grade Points: **${totalPoints}**`;
      cgpaResultBox.style.display = 'flex';
      setTimeout(() => {
        cgpaResultBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 80);
      setTimeout(() => {
        cgpaResultBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);
    });

    // Calculate CGPA
    const btnCalculateCGPA = cgpaCard.querySelector('#btnCalculateCGPA');
    const semCredits = [27, 27, 26, 26, 24, 24, 20, 20]; // GGSIPU Semester Credits

    btnCalculateCGPA.addEventListener('click', () => {
      let totalWeightedSGPA = 0;
      let totalCredits = 0;
      let inputCount = 0;

      for (let i = 1; i <= 8; i++) {
        const inputVal = parseFloat(cgpaCard.querySelector(`#cgpaSem${i}`).value);
        if (!isNaN(inputVal) && inputVal >= 0 && inputVal <= 10) {
          const cred = semCredits[i-1];
          totalWeightedSGPA += (inputVal * cred);
          totalCredits += cred;
          inputCount++;
        }
      }

      if (inputCount === 0) {
        alert("Please enter at least one valid semester SGPA (0 to 10).");
        return;
      }

      const cgpaVal = parseFloat((totalWeightedSGPA / totalCredits).toFixed(2));
      cgpaResultTitle.innerText = `CGPA: ${cgpaVal}`;
      cgpaResultComment.innerText = getScoreComment(cgpaVal);
      cgpaResultDetail.innerHTML = `Weighted average based on **${inputCount}** semester(s) | Calculated credits: **${totalCredits}**`;
      cgpaResultBox.style.display = 'flex';
      setTimeout(() => {
        cgpaResultBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 80);
      setTimeout(() => {
        cgpaResultBox.scrollIntoView({ behavior: 'smooth', block: 'end' });
      }, 50);
    });
  });
})();
