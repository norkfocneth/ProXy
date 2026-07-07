/* ============================================================
   PROXY — Syllabus Engine
   Handles data loading, tab switching, and card rendering
   ============================================================ */

const cseSyllabusData = {
  1: {
    desc: "Build your foundation. Master the basics.",
    subjects: [
      {
        code: "BS-111",
        icon: "√x",
        title: "Applied Mathematics - I",
        shortDesc: "Calculus, Matrices, Differential Equations",
        units: [
          { num: "Unit I", topics: "Matrices, Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Diagonalization of matrices." },
          { num: "Unit II", topics: "Differential Calculus: Successive differentiation, Leibnitz theorem, Taylor's and Maclaurin's series, Curvature." },
          { num: "Unit III", topics: "Partial Differentiation: Euler's theorem, Jacobians, Taylor's series for two variables, Maxima and Minima." },
          { num: "Unit IV", topics: "Integral Calculus: Double and triple integrals, Change of order, Area and volume calculation." }
        ]
      },
      {
        code: "BS-112",
        icon: "⚛",
        title: "Applied Physics - I",
        shortDesc: "Mechanics, Waves, Optics",
        units: [
          { num: "Unit I", topics: "Interference: Coherent sources, Young's double slit, Newton's rings, Michelson interferometer." },
          { num: "Unit II", topics: "Diffraction: Fraunhofer diffraction, Single slit, Double slit, Diffraction grating, Resolving power." },
          { num: "Unit III", topics: "Polarization: Double refraction, Nicol prism, Production and detection of polarized light, Polarimeters." },
          { num: "Unit IV", topics: "Lasers & Fiber Optics: Einstein's coefficients, Ruby laser, He-Ne laser, Optical fibers, Numerical aperture." }
        ]
      },
      {
        code: "BS-113",
        icon: "🔬",
        title: "Applied Chemistry",
        shortDesc: "Physical, Organic & Inorganic Chemistry",
        units: [
          { num: "Unit I", topics: "Water Technology: Hardness of water, estimation by EDTA, boiler troubles, water softening processes." },
          { num: "Unit II", topics: "Fuels & Combustion: Classification, Calorific value determination, coal analysis, petroleum cracking." },
          { num: "Unit III", topics: "Polymers & Composite Materials: Monomers, polymerization types, thermoplastics, thermosetting resins, biopolymers." },
          { num: "Unit IV", topics: "Corrosion & its Control: Chemical and electrochemical corrosion, protective coatings, cathodic protection." }
        ]
      },
      {
        code: "CS-101",
        icon: "</>",
        title: "Programming in C",
        shortDesc: "C Fundamentals, Control Flow, Functions",
        units: [
          { num: "Unit I", topics: "Basics of Computers, Algorithms, Flowcharts, C fundamentals: Data types, operators, expressions." },
          { num: "Unit II", topics: "Control Statements: Decision making, branching, looping structures, arrays and strings." },
          { num: "Unit III", topics: "Functions: Parameter passing, recursion. Structures and Unions, preprocessors." },
          { num: "Unit IV", topics: "Pointers: Pointer arithmetic, dynamic memory allocation. File handling in C." }
        ]
      },
      {
        code: "ES-105",
        icon: "🔌",
        title: "Basic Electrical Engineering",
        shortDesc: "Circuit Laws, KCL, KVL, Network Theorems",
        units: [
          { num: "Unit I", topics: "DC Circuits: Mesh and Node analysis, Network theorems: Thevenin, Norton, Superposition, Maximum Power Transfer." },
          { num: "Unit II", topics: "AC Circuits: Single phase RLC series and parallel circuits, phasor diagrams, resonance." },
          { num: "Unit III", topics: "Transformers: Principles of operation, EMF equation, equivalent circuit, efficiency and regulation." },
          { num: "Unit IV", topics: "Electrical Machines: DC machines operating principles, single phase induction motors, three-phase systems." }
        ]
      },
      {
        code: "ES-107",
        icon: "📐",
        title: "Engineering Graphics",
        shortDesc: "Lines, Projections, Dimensions",
        units: [
          { num: "Unit I", topics: "Introduction to Engineering Drawing, Sheet layouts, scales, lines and lettering." },
          { num: "Unit II", topics: "Projections of Points and Straight Lines, orthographic projections, traces of lines." },
          { num: "Unit III", topics: "Projections of Solids, section of solids, development of surfaces of solids." },
          { num: "Unit IV", topics: "Isometric Projections, conversion of orthographic views into isometric views, CAD basics." }
        ]
      }
    ]
  },
  2: {
    desc: "Strengthen core engineering and programming constructs.",
    subjects: [
      {
        code: "BS-121",
        icon: "∫",
        title: "Applied Mathematics - II",
        shortDesc: "Differential Equations, Vector Calculus",
        units: [
          { num: "Unit I", topics: "Ordinary Differential Equations: First order exact equations, linear differential equations of higher order." },
          { num: "Unit II", topics: "Orthogonal Trajectories, Cauchy-Euler equations, method of variation of parameters." },
          { num: "Unit III", topics: "Vector Calculus: Gradient, divergence, curl, line integrals, Green's, Gauss's, and Stokes' theorems." },
          { num: "Unit IV", topics: "Laplace Transforms: Transforms of elementary functions, inverse Laplace transforms, convolution theorem." }
        ]
      },
      {
        code: "BS-122",
        icon: "🔬",
        title: "Applied Physics - II",
        shortDesc: "Electromagnetism, Quantum Physics, Solids",
        units: [
          { num: "Unit I", topics: "Electromagnetic Theory: Gauss's law, Ampere's law, Faraday's law, Maxwell's equations." },
          { num: "Unit II", topics: "Quantum Mechanics: de Broglie waves, Heisenberg uncertainty principle, Schrodinger wave equation." },
          { num: "Unit III", topics: "Statistical Mechanics: Maxwell-Boltzmann, Bose-Einstein, and Fermi-Dirac statistics." },
          { num: "Unit IV", topics: "Solid State Physics: Crystal structure, Bravais lattices, band theory of solids, superconductors." }
        ]
      },
      {
        code: "CS-122",
        icon: "++",
        title: "Programming in C++",
        shortDesc: "OOP concepts, Classes, Inheritance",
        units: [
          { num: "Unit I", topics: "OOP basics, C++ vs C, Classes, Objects, constructors and destructors." },
          { num: "Unit II", topics: "Operator overloading, function overloading, friend functions." },
          { num: "Unit III", topics: "Inheritance: Single, multiple, hierarchical, virtual base classes. Polymorphism." },
          { num: "Unit IV", topics: "Templates, exception handling, standard template library (STL)." }
        ]
      }
    ]
  },
  3: {
    desc: "Core algorithms and hardware representation.",
    subjects: [
      {
        code: "CS-201",
        icon: "∑",
        title: "Discrete Structure",
        shortDesc: "Sets, Relations, Functions, Graphs",
        units: [
          { num: "Unit I", topics: "Set Theory, relations, equivalence relations, partial orderings, functions." },
          { num: "Unit II", topics: "Propositional logic, predicate logic, inference rules, mathematical induction." },
          { num: "Unit III", topics: "Algebraic structures: Semigroups, monoids, groups, rings, fields." },
          { num: "Unit IV", topics: "Graph Theory: Paths, cycles, Eulerian & Hamiltonian paths, trees, graph coloring." }
        ]
      },
      {
        code: "CS-203",
        icon: "🏗",
        title: "Data Structures",
        shortDesc: "Linear & Non-linear data representation",
        units: [
          { num: "Unit I", topics: "Complexity analysis, arrays, linked lists (single, double, circular)." },
          { num: "Unit II", topics: "Stacks, Queues, recursion, implementation using arrays & linked lists." },
          { num: "Unit III", topics: "Trees: Binary trees, traversals, AVL trees, B-trees, heaps." },
          { num: "Unit IV", topics: "Graphs: Representation, BFS, DFS. Searching & Sorting algorithms, hashing." }
        ]
      }
    ]
  },
  4: {
    desc: "Systems, platforms and information design.",
    subjects: [
      {
        code: "CS-222",
        icon: "💻",
        title: "Operating Systems",
        shortDesc: "Processes, Memory, I/O and Files",
        units: [
          { num: "Unit I", topics: "OS overview, process state transitions, CPU scheduling algorithms." },
          { num: "Unit II", topics: "Process synchronization: Semaphores, monitors, classical synchronization problems. Deadlocks." },
          { num: "Unit III", topics: "Memory management: Paging, segmentation, virtual memory page replacement." },
          { num: "Unit IV", topics: "File systems structure, disk scheduling algorithms, security and protection." }
        ]
      }
    ]
  },
  5: {
    desc: "Distributed networks and modern web engines.",
    subjects: [
      {
        code: "CS-301",
        icon: "🌐",
        title: "Computer Networks",
        shortDesc: "OSI Reference Model, TCP/IP Suite",
        units: [
          { num: "Unit I", topics: "Introduction to networks, physical layer encoding, transmission media, topologies." },
          { num: "Unit II", topics: "Data link layer: Framing, error control, sliding window protocols, MAC sublayer." },
          { num: "Unit III", topics: "Network layer: IP addressing, routing algorithms (OSPF, BGP), congestion control." },
          { num: "Unit IV", topics: "Transport layer: TCP, UDP, congestion control. Application layer protocols (HTTP, DNS)." }
        ]
      }
    ]
  },
  6: {
    desc: "Advanced cognitive models and intelligent engines.",
    subjects: [
      {
        code: "CS-322",
        icon: "🤖",
        title: "Artificial Intelligence",
        shortDesc: "Heuristics, Knowledge & Inference systems",
        units: [
          { num: "Unit I", topics: "AI overview, state space search, heuristic search: A* algorithm, game playing." },
          { num: "Unit II", topics: "Knowledge representation, predicate logic, resolution, semantic networks." },
          { num: "Unit III", topics: "Reasoning under uncertainty, Bayesian networks, fuzzy logic basics." },
          { num: "Unit IV", topics: "Planning, Machine learning introduction, Expert systems, NLP overview." }
        ]
      }
    ]
  },
  7: {
    desc: "Distributed design, mobile engines, and major projects.",
    subjects: [
      {
        code: "CS-401",
        icon: "📱",
        title: "Mobile Computing",
        shortDesc: "Wireless networks, cellular concepts, GSM",
        units: [
          { num: "Unit I", topics: "Mobile computing architecture, cellular networks, GSM systems, GPRS." },
          { num: "Unit II", topics: "Wireless LAN, IEEE 802.11 architecture, MAC layer, Bluetooth." },
          { num: "Unit III", topics: "Mobile network layer: Mobile IP, DHCP. Mobile transport layer: TCP optimization." },
          { num: "Unit IV", topics: "Mobile application platforms: Android, iOS, mobile ad-hoc networks (MANET)." }
        ]
      }
    ]
  },
  8: {
    desc: "Specialization, industry readiness, and final project defense.",
    subjects: [
      {
        code: "CS-422",
        icon: "☁",
        title: "Cloud Computing",
        shortDesc: "Virtualization, SaaS, PaaS, IaaS architectures",
        units: [
          { num: "Unit I", topics: "Cloud computing reference model, virtualization technologies, hypervisors." },
          { num: "Unit II", topics: "Cloud services models: Infrastructure (IaaS), Platform (PaaS), Software (SaaS)." },
          { num: "Unit III", topics: "Cloud storage models, resource management, security issues in clouds." },
          { num: "Unit IV", topics: "Case studies: AWS, Google Cloud, Microsoft Azure, Docker & Kubernetes." }
        ]
      }
    ]
  }
};

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('semesterSelector')) {
    setupSemesterSelector();
    renderSemester(1); // default load
  }
});

// Connect pill tabs to display
function setupSemesterSelector() {
  const container = document.getElementById('semesterSelector');
  const buttons = container.querySelectorAll('.sem-pill-btn');
  
  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const sem = btn.dataset.sem;
      renderSemester(sem);
    });
  });
}

// Render active semester card view
function renderSemester(sem) {
  const data = cseSyllabusData[sem];
  if (!data) return;

  // Update text details
  document.getElementById('currentSemName').innerText = `${sem === '1' ? '1st' : sem === '2' ? '2nd' : sem === '3' ? '3rd' : sem + 'th'} Semester`;
  document.getElementById('currentSubjectsCount').innerText = `${data.subjects.length} Subjects`;
  document.getElementById('currentSemDesc').innerText = data.desc;
  
  // Update PDF download link subtext
  document.getElementById('pdfDownloadSubtext').innerText = `${sem === '1' ? '1st' : sem === '2' ? '2nd' : sem === '3' ? '3rd' : sem + 'th'} Semester Complete PDF`;

  const listContainer = document.getElementById('subjectAccordions');
  if (!listContainer) return;
  listContainer.innerHTML = '';

  // Build Accordion Subject Rows
  data.subjects.forEach((subject, idx) => {
    const row = document.createElement('div');
    row.className = 'subject-row';
    if (idx === 0) row.classList.add('open'); // Expand first subject by default

    // Determine correct relative link prefix depending on current page location
    const isPagesDir = window.location.pathname.includes('/pages/');
    const basePrefix = isPagesDir ? '' : 'pages/';

    row.innerHTML = `
      <div class="subject-summary">
        <div class="subject-row-icon">${subject.icon}</div>
        <div class="subject-row-info">
          <span class="subject-row-title">${subject.title}</span>
          <span class="subject-row-desc">${subject.shortDesc}</span>
        </div>
        <div class="subject-row-meta">
          <span class="subject-code-badge">${subject.code}</span>
          <span class="chevron-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
          </span>
        </div>
      </div>
      <div class="subject-details">
        <div class="syllabus-units">
          ${subject.units.map(unit => `
            <div class="unit-box">
              <div class="unit-title">${unit.num}</div>
              <div class="unit-topics">${unit.topics}</div>
            </div>
          `).join('')}
        </div>
        <div class="unit-actions-row">
          <a href="${basePrefix}notes.html" class="action-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            View Notes
          </a>
          <a href="${basePrefix}pyqs.html" class="action-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
            View PYQs
          </a>
        </div>
      </div>
    `;

    // Handle Expand / Collapse clicks
    const summary = row.querySelector('.subject-summary');
    summary.addEventListener('click', () => {
      const isOpen = row.classList.contains('open');
      
      // Collapse all others
      listContainer.querySelectorAll('.subject-row').forEach(r => r.classList.remove('open'));
      
      if (!isOpen) {
        row.classList.add('open');
      }
    });

    listContainer.appendChild(row);
  });
}
