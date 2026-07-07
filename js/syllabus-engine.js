/* ============================================================
   PROXY — Syllabus Engine
   Handles data loading, tab switching, and card rendering
   ============================================================ */

const syllabusData = {
  1: [
    { code: 'BAS-103', name: 'Engineering Mathematics-I', credits: 4, units: ['Matrices', 'Differential Calculus', 'Integral Calculus', 'Vector Calculus'], icon: '∑' },
    { code: 'BAS-101', name: 'Applied Physics-I', credits: 4, units: ['Wave Optics', 'Interference', 'Diffraction', 'Laser & Fiber Optics'], icon: '⚛️' },
    { code: 'BAS-105', name: 'Applied Chemistry', credits: 4, units: ['Atomic Structure', 'Chemical Bonding', 'Corrosion', 'Polymers'], icon: '🧪' },
    { code: 'BAS-107', name: 'Manufacturing Processes', credits: 4, units: ['Casting', 'Welding', 'Forming', 'Machining'], icon: '⚙️' },
    { code: 'BCC-101', name: 'Fundamentals of Computers', credits: 4, units: ['Hardware', 'Software', 'Programming Basics', 'MS Office'], icon: '💻' },
    { code: 'BHM-101', name: 'Professional Communication', credits: 2, units: ['Communication Theory', 'Writing Skills', 'Presentation'], icon: '🗣️' },
  ],
  2: [
    { code: 'BAS-203', name: 'Engineering Mathematics-II', credits: 4, units: ['Differential Equations', 'Complex Variables', 'Statistics', 'Numerical Methods'], icon: '∫' },
    { code: 'BAS-201', name: 'Applied Physics-II', credits: 4, units: ['Electrostatics', 'Magnetism', 'EMF', 'Semiconductor'], icon: '🔬' },
    { code: 'BEE-201', name: 'Electrical Engineering', credits: 4, units: ['DC Circuits', 'AC Circuits', 'Transformers', 'Machines'], icon: '⚡' },
    { code: 'BME-201', name: 'Engineering Mechanics', credits: 4, units: ['Force Systems', 'Centroid', 'Friction', 'Kinematics'], icon: '🏗️' },
    { code: 'BCS-201', name: 'C Programming', credits: 4, units: ['Data Types', 'Control Flow', 'Functions', 'Pointers & Structs'], icon: '🔤' },
    { code: 'BHM-201', name: 'Environmental Science', credits: 4, units: ['Ecosystems', 'Pollution', 'Resources', 'Sustainability'], icon: '🌿' },
  ],
  3: [
    { code: 'BCS-301', name: 'Data Structures', credits: 4, units: ['Arrays & Linked Lists', 'Stacks & Queues', 'Trees', 'Graphs & Hashing'], icon: '🏗️' },
    { code: 'BCS-302', name: 'Computer Organization', credits: 4, units: ['Number Systems', 'ALU Design', 'Memory', 'I/O Organization'], icon: '🖥️' },
    { code: 'BCS-303', name: 'Discrete Mathematics', credits: 4, units: ['Sets & Logic', 'Relations', 'Graph Theory', 'Combinatorics'], icon: '🔢' },
    { code: 'BCS-304', name: 'Object Oriented Programming', credits: 4, units: ['Classes & Objects', 'Inheritance', 'Polymorphism', 'Exception Handling'], icon: '📦' },
    { code: 'BCS-305', name: 'Digital Electronics', credits: 4, units: ['Boolean Algebra', 'Combinational Circuits', 'Sequential Circuits', 'Registers & Counters'], icon: '🔌' },
    { code: 'BAS-303', name: 'Engineering Mathematics-III', credits: 4, units: ['Laplace Transform', 'Fourier Series', 'Z-Transform', 'PDE'], icon: '📐' },
    { code: 'BHM-301', name: 'Economics for Engineers', credits: 2, units: ['Micro Economics', 'Macro Economics', 'Engineering Economy'], icon: '📊' },
  ],
  4: [
    { code: 'BCS-401', name: 'Operating System', credits: 4, units: ['Process Management', 'Memory Management', 'File Systems', 'Deadlocks'], icon: '🖥️' },
    { code: 'BCS-402', name: 'Theory of Computation', credits: 4, units: ['Finite Automata', 'Context-Free Grammar', 'Turing Machines', 'Decidability'], icon: '🧮' },
    { code: 'BCS-403', name: 'Database Management', credits: 4, units: ['ER Model', 'SQL', 'Normalization', 'Transactions'], icon: '🗄️' },
    { code: 'BCS-404', name: 'Design & Analysis of Algorithms', credits: 4, units: ['Divide & Conquer', 'Greedy', 'Dynamic Programming', 'NP-Completeness'], icon: '⚡' },
    { code: 'BCS-405', name: 'Microprocessors', credits: 4, units: ['8085 Architecture', '8086 Architecture', 'Interfacing', 'Programming'], icon: '💾' },
    { code: 'BCS-406', name: 'Software Engineering', credits: 4, units: ['SDLC Models', 'Requirements', 'Design', 'Testing'], icon: '🔧' },
    { code: 'BHM-401', name: 'Industrial Management', credits: 2, units: ['Planning', 'Organizing', 'Quality Management'], icon: '📋' },
  ],
  5: [
    { code: 'BCS-501', name: 'Computer Networks', credits: 4, units: ['OSI & TCP/IP', 'Data Link Layer', 'Network Layer', 'Transport & Application'], icon: '🌐' },
    { code: 'BCS-502', name: 'Web Technology', credits: 4, units: ['HTML & CSS', 'JavaScript', 'PHP & MySQL', 'Frameworks'], icon: '🕸️' },
    { code: 'BCS-503', name: 'Artificial Intelligence', credits: 4, units: ['Search Algorithms', 'Knowledge Representation', 'Machine Learning Basics', 'NLP Intro'], icon: '🤖' },
    { code: 'BCS-504', name: 'Java Programming', credits: 4, units: ['OOP in Java', 'Multithreading', 'Collections', 'JDBC & Servlets'], icon: '☕' },
    { code: 'BCS-505', name: 'Computer Graphics', credits: 4, units: ['Line Drawing', 'Transformations', '3D Viewing', 'Clipping'], icon: '🎨' },
    { code: 'BHM-501', name: 'IPR & Patenting', credits: 2, units: ['Patents', 'Copyrights', 'Trademarks'], icon: '📜' },
  ],
  6: [
    { code: 'BCS-601', name: 'Compiler Design', credits: 4, units: ['Lexical Analysis', 'Parsing', 'Semantic Analysis', 'Code Generation'], icon: '🔧' },
    { code: 'BCS-602', name: 'Machine Learning', credits: 4, units: ['Regression', 'Classification', 'Clustering', 'Neural Networks'], icon: '🧠' },
    { code: 'BCS-603', name: 'Information Security', credits: 4, units: ['Cryptography', 'Network Security', 'System Security', 'Web Security'], icon: '🔒' },
    { code: 'BCS-604', name: 'Cloud Computing', credits: 4, units: ['Virtualization', 'Cloud Services', 'Deployment', 'Security'], icon: '☁️' },
    { code: 'BCS-605', name: 'Python Programming', credits: 4, units: ['Basics', 'Data Structures', 'OOP', 'Libraries'], icon: '🐍' },
    { code: 'BHM-601', name: 'Entrepreneurship', credits: 2, units: ['Startup Ecosystem', 'Business Plan', 'Funding'], icon: '🚀' },
  ],
  7: [
    { code: 'BCS-701', name: 'Big Data Analytics', credits: 4, units: ['Hadoop', 'MapReduce', 'Spark', 'NoSQL'], icon: '📊' },
    { code: 'BCS-702', name: 'Deep Learning', credits: 4, units: ['CNN', 'RNN', 'GAN', 'Transfer Learning'], icon: '🧠' },
    { code: 'BCS-703', name: 'IoT & Embedded Systems', credits: 4, units: ['Sensors', 'Arduino', 'Raspberry Pi', 'MQTT'], icon: '📡' },
    { code: 'BCS-704', name: 'Blockchain Technology', credits: 4, units: ['Consensus', 'Smart Contracts', 'Ethereum', 'DApps'], icon: '⛓️' },
    { code: 'BCS-751', name: 'Major Project-I', credits: 6, units: ['Problem Statement', 'Literature Survey', 'Implementation'], icon: '🏆' },
  ],
  8: [
    { code: 'BCS-801', name: 'Quantum Computing', credits: 4, units: ['Qubits', 'Quantum Gates', 'Algorithms', 'Applications'], icon: '⚛️' },
    { code: 'BCS-851', name: 'Major Project-II', credits: 12, units: ['Final Implementation', 'Testing', 'Documentation', 'Presentation'], icon: '🎓' },
    { code: 'BCS-852', name: 'Internship / Training', credits: 4, units: ['Industry Experience', 'Report Submission'], icon: '💼' },
  ]
};

document.addEventListener('DOMContentLoaded', () => {
  setupSyllabus();
});

function setupSyllabus() {
  const grid = document.getElementById('subjectsGrid');
  const tabs = document.querySelectorAll('.semester-tab');

  if (!grid || tabs.length === 0) return;

  function renderCards(sem) {
    const data = syllabusData[sem] || [];
    if (data.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-icon">📭</div>
          <h3>Coming Soon</h3>
          <p>Syllabus for this semester will be added shortly.</p>
        </div>`;
      return;
    }

    grid.innerHTML = data.map(subject => `
      <div class="subject-card">
        <div class="card-top">
          <div class="card-icon">${subject.icon}</div>
          <span class="card-code">${subject.code}</span>
        </div>
        <div class="card-name">${subject.name}</div>
        <div class="card-meta">
          <div class="card-meta-item">
            <span class="meta-label">Credits</span>
            <span class="meta-value">${subject.credits}</span>
          </div>
          <div class="card-meta-item">
            <span class="meta-label">Units</span>
            <span class="meta-value">${subject.units.length}</span>
          </div>
        </div>
        <div class="card-units">
          ${subject.units.map(u => `<span class="unit-tag">${u}</span>`).join('')}
        </div>
        <div class="card-actions">
          <a href="#notes" class="card-btn card-btn--ghost">📚 Notes</a>
          <a href="#pyqs" class="card-btn card-btn--ghost">📄 PYQs</a>
        </div>
      </div>
    `).join('');

    // Stagger animation
    const cards = grid.querySelectorAll('.subject-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.transition = `all 0.4s ${0.05 * i}s cubic-bezier(0.2, 0.8, 0.2, 1)`;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        });
      });
    });
  }

  // Event Listeners for Tabs
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      renderCards(tab.dataset.sem);
    });
  });

  // Initial render
  renderCards(1);
}
