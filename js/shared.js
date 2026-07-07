/* ============================================================
   PROXY — Shared JavaScript
   Navbar, Search Overlay (Ctrl+K), Theme Toggle, Cube Engine
   ============================================================ */

// ── Navbar HTML Injection ──
function injectNavbar(activePage = 'Home') {
  const navbarHTML = `
    <nav class="navbar" id="mainNavbar">
      <a href="/index.html" class="nav-left">
        <svg class="logo-icon" viewBox="0 0 24 24">
          <path d="M12 2L14.85 9.15L22 12L14.85 14.85L12 22L9.15 14.85L2 12L9.15 9.15L12 2Z"/>
        </svg>
        <span class="logo-text">Proxy</span>
      </a>
      
      <ul class="nav-center">
        <li><a class="nav-link${activePage === 'Home' ? ' active' : ''}" href="/index.html">Home</a></li>
        <li><a class="nav-link${activePage === 'Syllabus' ? ' active' : ''}" href="/pages/syllabus.html">Syllabus</a></li>
        <li><a class="nav-link${activePage === 'Notes' ? ' active' : ''}" href="/pages/notes.html">Notes</a></li>
        <li><a class="nav-link${activePage === 'PYQs' ? ' active' : ''}" href="/pages/pyqs.html">PYQs</a></li>
        <li><a class="nav-link${activePage === 'Faculty' ? ' active' : ''}" href="/pages/faculty.html">Faculty</a></li>
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
        <input type="text" class="search-modal-input" id="searchModalInput" placeholder="Search notes, PYQs, subjects, faculty..." autofocus>
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
        <li><a class="${activePage === 'Syllabus' ? 'active' : ''}" href="/pages/syllabus.html">Syllabus</a></li>
        <li><a class="${activePage === 'Notes' ? 'active' : ''}" href="/pages/notes.html">Notes</a></li>
        <li><a class="${activePage === 'PYQs' ? 'active' : ''}" href="/pages/pyqs.html">PYQs</a></li>
        <li><a class="${activePage === 'Faculty' ? 'active' : ''}" href="/pages/faculty.html">Faculty</a></li>
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

// ── Export for use ──
window.ProxyUI = {
  injectNavbar,
  setupSearchOverlay,
  setupCubeInteractions,
  injectBackgroundGlows,
  setupCarousel,
};
