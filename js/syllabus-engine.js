/* ============================================================
   PROXY — Syllabus Engine
   Handles branch selection, data loading, tab switching, and rendering
   ============================================================ */

let currentBranch = 'CSE';
let currentSemester = 1;

const syllabusData = {
  CSE: {
    1: {
      desc: "Build your foundation. Master the core concepts of engineering and programming.",
      subjects: [
        {
          code: "BS-111",
          icon: "√x",
          title: "Applied Mathematics - I",
          shortDesc: "Calculus, Matrices, and Differential Equations",
          units: [
            { num: "Unit I", topics: "Matrices: Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Diagonalization of matrices." },
            { num: "Unit II", topics: "Differential Calculus: Successive differentiation, Leibnitz theorem, Taylor's and Maclaurin's series, Curvature." },
            { num: "Unit III", topics: "Partial Differentiation: Euler's theorem, Jacobians, Taylor's series for two variables, Maxima and Minima." },
            { num: "Unit IV", topics: "Integral Calculus: Double and triple integrals, Change of order, Area and volume calculation." }
          ]
        },
        {
          code: "BS-112",
          icon: "⚛",
          title: "Applied Physics - I",
          shortDesc: "Mechanics, Wave Theory, and Optical Systems",
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
          shortDesc: "Physical, Organic & Inorganic Engineering Chemistry",
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
          shortDesc: "Algorithms, Syntax, Control structures, and Files",
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
          shortDesc: "DC/AC Circuits, Transformers, and Electrical Machines",
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
          shortDesc: "Orthographic Projections, Solid Geometries, and CAD",
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
      desc: "Strengthen core engineering constructs and object-oriented paradigms.",
      subjects: [
        {
          code: "BS-121",
          icon: "∫",
          title: "Applied Mathematics - II",
          shortDesc: "Vector Calculus, Laplace Transforms, and Ordinary Differential Equations",
          units: [
            { num: "Unit I", topics: "Ordinary Differential Equations: First order exact equations, linear differential equations of higher order." },
            { num: "Unit II", topics: "Orthogonal Trajectories, Cauchy-Euler equations, method of variation of parameters." },
            { num: "Unit III", topics: "Vector Calculus: Gradient, divergence, curl, line integrals, Green's, Gauss's, and Stokes' theorems." },
            { num: "Unit IV", topics: "Laplace Transforms: Transforms of elementary functions, inverse Laplace transforms, convolution theorem." }
          ]
        },
        {
          code: "BS-122",
          icon: "⚛",
          title: "Applied Physics - II",
          shortDesc: "Electromagnetism, Solid State Physics, and Quantum Mechanics",
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
          shortDesc: "Object-Oriented Programming, Classes, Templates, and STL",
          units: [
            { num: "Unit I", topics: "OOP basics, C++ vs C, Classes, Objects, constructors and destructors." },
            { num: "Unit II", topics: "Operator overloading, function overloading, friend functions." },
            { num: "Unit III", topics: "Inheritance: Single, multiple, hierarchical, virtual base classes. Polymorphism." },
            { num: "Unit IV", topics: "Templates, exception handling, standard template library (STL)." }
          ]
        },
        {
          code: "ES-106",
          icon: "📟",
          title: "Basic Electronics Engineering",
          shortDesc: "Semiconductors, Diodes, Transistors, and Digital Logic Basics",
          units: [
            { num: "Unit I", topics: "Semiconductor Diodes: P-N junction, Zener diode, Rectifiers, Clippers and Clampers." },
            { num: "Unit II", topics: "Bipolar Junction Transistors: CE, CB, CC configurations, biasing circuits, load line analysis." },
            { num: "Unit III", topics: "Field Effect Transistors: JFET, MOSFET characteristics, operational amplifiers." },
            { num: "Unit IV", topics: "Digital Electronics: Number systems, Boolean algebra, Logic gates, Combinational logic circuit basics." }
          ]
        },
        {
          code: "ES-108",
          icon: "🧱",
          title: "Engineering Mechanics",
          shortDesc: "Statics, Force Systems, Friction, and Structural Mechanics",
          units: [
            { num: "Unit I", topics: "Force Systems: Coplanar concurrent forces, resultant, Lami's theorem, moments and couples." },
            { num: "Unit II", topics: "Equilibrium of Rigid Bodies: Free body diagrams, reactions, support reactions, trusses, method of joints." },
            { num: "Unit III", topics: "Centroid and Moment of Inertia: Parallel axis theorem, polar moment of inertia, mass moment of inertia." },
            { num: "Unit IV", topics: "Friction: Laws of friction, wedge friction, belt friction, kinematics of particles." }
          ]
        },
        {
          code: "HS-102",
          icon: "🗣",
          title: "Communication Skills",
          shortDesc: "Grammar, Technical Writing, and Group Discussions",
          units: [
            { num: "Unit I", topics: "Communication Basics: Process, barriers, non-verbal communication, listening skills." },
            { num: "Unit II", topics: "Grammar & Vocabulary: Common errors, active-passive voice, direct-indirect speech, idioms." },
            { num: "Unit III", topics: "Technical Writing: Letter writing, resumes, report writing, emails, proposals." },
            { num: "Unit IV", topics: "Speaking Skills: Group discussions, presentations, interviews, public speaking." }
          ]
        }
      ]
    },
    3: {
      desc: "Explore core algorithms, discrete structures, and digital representations.",
      subjects: [
        {
          code: "CS-201",
          icon: "∑",
          title: "Discrete Structure",
          shortDesc: "Sets, Relations, Logic, Algebraic Structures, and Graph Theory",
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
          shortDesc: "Linear & Non-linear data representation, trees, graphs, and search algorithms",
          units: [
            { num: "Unit I", topics: "Complexity analysis, arrays, linked lists (single, double, circular)." },
            { num: "Unit II", topics: "Stacks, Queues, recursion, implementation using arrays & linked lists." },
            { num: "Unit III", topics: "Trees: Binary trees, traversals, AVL trees, B-trees, heaps." },
            { num: "Unit IV", topics: "Graphs: Representation, BFS, DFS. Searching & Sorting algorithms, hashing." }
          ]
        },
        {
          code: "CS-205",
          icon: "🖥",
          title: "Computer Organization & Architecture",
          shortDesc: "Register Transfer, CPU Design, Microprogramming, and Memory Hierarchies",
          units: [
            { num: "Unit I", topics: "Register Transfer and Microoperations: Bus transfer, arithmetic, logic, and shift microoperations." },
            { num: "Unit II", topics: "Basic Computer Organization: Instruction codes, computer registers, instruction cycle, input-output interrupts." },
            { num: "Unit III", topics: "Central Processing Unit: Stack organization, instruction formats, addressing modes, RISC vs CISC." },
            { num: "Unit IV", topics: "Memory & Pipeline: Cache memory, virtual memory, pipelining, vector processing." }
          ]
        },
        {
          code: "CS-207",
          icon: "⚙",
          title: "Object Oriented Programming",
          shortDesc: "Java Fundamentals, Exception Handling, Multi-threading, and GUI",
          units: [
            { num: "Unit I", topics: "Java Basics: JVM, classes, objects, inheritance, polymorphism, interfaces, packages." },
            { num: "Unit II", topics: "Exceptions & I/O: Try-catch blocks, custom exceptions, byte streams, character streams." },
            { num: "Unit III", topics: "Multithreading: Thread life cycle, synchronization, inter-thread communication, thread pools." },
            { num: "Unit IV", topics: "Applets & AWT: Event handling, layout managers, Swing components, database connectivity (JDBC)." }
          ]
        },
        {
          code: "EC-209",
          icon: "🚥",
          title: "Digital Electronics",
          shortDesc: "Logic Gates, K-Maps, Combinational & Sequential Logic Design",
          units: [
            { num: "Unit I", topics: "Number Systems and Codes: Binary, octal, hexadecimal, BCD, Gray code, logic gates." },
            { num: "Unit II", topics: "Boolean Algebra: K-maps, Quine-McCluskey method, combinational circuits: adders, multiplexers." },
            { num: "Unit III", topics: "Sequential Circuits: Latches, flip-flops (SR, JK, D, T), registers, counters." },
            { num: "Unit IV", topics: "Semiconductor Memories: ROM, PLA, PAL, TTL & CMOS logic families." }
          ]
        }
      ]
    },
    4: {
      desc: "Understand operating systems, databases, software paradigms, and computation.",
      subjects: [
        {
          code: "BS-204",
          icon: "📊",
          title: "Applied Mathematics - IV",
          shortDesc: "Probability, Statistics, Numerical Methods, and Linear Programming",
          units: [
            { num: "Unit I", topics: "Probability: Random variables, binomial, Poisson, and normal distributions." },
            { num: "Unit II", topics: "Statistics: Sampling distribution, hypothesis testing, t-test, chi-square test, regression analysis." },
            { num: "Unit III", topics: "Numerical Methods: Root finding (Bisection, Newton-Raphson), interpolation, numerical integration." },
            { num: "Unit IV", topics: "Linear Programming: Simplex method, duality, formulation of real-world optimization problems." }
          ]
        },
        {
          code: "CS-204",
          icon: "📁",
          title: "Database Management Systems",
          shortDesc: "ER Diagrams, Relational Algebra, SQL, Normalization, and Transactions",
          units: [
            { num: "Unit I", topics: "DBMS Overview: Data independence, database languages, ER diagrams, relational model." },
            { num: "Unit II", topics: "Relational Query Languages: Relational algebra, SQL queries, DDL, DML, DCL commands." },
            { num: "Unit III", topics: "Normalization: Functional dependencies, 1NF, 2NF, 3NF, BCNF, multi-valued dependency." },
            { num: "Unit IV", topics: "Transaction Management: ACID properties, concurrency control, locks, recovery systems." }
          ]
        },
        {
          code: "CS-206",
          icon: "💻",
          title: "Operating Systems",
          shortDesc: "CPU Scheduling, Synchronization, Memory Management, and Disk Scheduling",
          units: [
            { num: "Unit I", topics: "OS overview, process state transitions, CPU scheduling algorithms." },
            { num: "Unit II", topics: "Process synchronization: Semaphores, monitors, classical synchronization problems. Deadlocks." },
            { num: "Unit III", topics: "Memory management: Paging, segmentation, virtual memory page replacement." },
            { num: "Unit IV", topics: "File systems structure, disk scheduling algorithms, security and protection." }
          ]
        },
        {
          code: "CS-208",
          icon: "✍",
          title: "Software Engineering",
          shortDesc: "SDLC Models, Requirements, UML Diagrams, Testing, and Maintenance",
          units: [
            { num: "Unit I", topics: "Software Process Models: Waterfall, spiral, prototype, agile models (Scrum)." },
            { num: "Unit II", topics: "Requirements Engineering: SRS document, software design principles, UML diagrams." },
            { num: "Unit III", topics: "Coding and Testing: White-box testing, black-box testing, unit, integration, and system testing." },
            { num: "Unit IV", topics: "Software Metrics: COCOMO model, function points, maintenance, configuration management." }
          ]
        },
        {
          code: "CS-210",
          icon: "⚙",
          title: "Theory of Computation",
          shortDesc: "Finite Automata, Regular Expressions, Context-Free Grammars, and Turing Machines",
          units: [
            { num: "Unit I", topics: "Finite Automata: DFA, NFA conversion, regular expressions, pumping lemma for regular languages." },
            { num: "Unit II", topics: "Context-Free Grammars: CFGs, parsing trees, ambiguity, Chomsky normal form, Greibach normal form." },
            { num: "Unit III", topics: "Pushdown Automata: PDA design, equivalence with CFGs, deterministic PDAs." },
            { num: "Unit IV", topics: "Turing Machines: TM design, variants of TMs, halting problem, undecidability." }
          ]
        }
      ]
    },
    5: {
      desc: "Implement algorithms, network suites, web systems, and compiler foundations.",
      subjects: [
        {
          code: "CS-301",
          icon: "📐",
          title: "Design & Analysis of Algorithms",
          shortDesc: "Asymptotic Notation, Divide & Conquer, Greedy, Dynamic Programming, and NP-Completeness",
          units: [
            { num: "Unit I", topics: "Algorithm Analysis: Asymptotic notations, recurrence relations, Master method." },
            { num: "Unit II", topics: "Divide & Conquer, Greedy Algorithms: Merge sort, Quick sort, Knapsack, Huffman codes, Spanning trees." },
            { num: "Unit III", topics: "Dynamic Programming, Backtracking: Matrix chain multiplication, LCS, 0/1 Knapsack, N-Queens." },
            { num: "Unit IV", topics: "Complexity Classes: P, NP, NP-Hard, NP-Complete problems, approximation algorithms." }
          ]
        },
        {
          code: "CS-303",
          icon: "🌐",
          title: "Computer Networks",
          shortDesc: "OSI Stack, Ethernet, Routing Protocols, TCP/UDP, and App Protocols",
          units: [
            { num: "Unit I", topics: "Introduction to networks, physical layer encoding, transmission media, topologies." },
            { num: "Unit II", topics: "Data link layer: Framing, error control, sliding window protocols, MAC sublayer." },
            { num: "Unit III", topics: "Network layer: IP addressing, routing algorithms (OSPF, BGP), congestion control." },
            { num: "Unit IV", topics: "Transport & Application: TCP, UDP, HTTP, DNS, SMTP, network security basics." }
          ]
        },
        {
          code: "CS-305",
          icon: "☕",
          title: "Java Programming",
          shortDesc: "Advanced Java Concepts, Collections Framework, Networking, and Servlet Architectures",
          units: [
            { num: "Unit I", topics: "OOP Implementation: Interfaces, packages, inner classes, Exception handling." },
            { num: "Unit II", topics: "Java Collections: List, Set, Map interfaces, generics, file streams, serialization." },
            { num: "Unit III", topics: "Java Networking: Socket programming, URL connection, RMI, multi-threaded servers." },
            { num: "Unit IV", topics: "Enterprise Java: Servlets, JSP lifecycle, JDBC database queries, MVC implementation." }
          ]
        },
        {
          code: "CS-307",
          icon: "🧪",
          title: "Software Testing",
          shortDesc: "Verification/Validation, Test Case Design, Automation, and Defect Metrics",
          units: [
            { num: "Unit I", topics: "Testing Concepts: Verification, validation, test suites, test case metrics." },
            { num: "Unit II", topics: "Functional & Structural Testing: Boundary value analysis, equivalence partitioning, path testing, data flow." },
            { num: "Unit III", topics: "Specialized Testing: Integration, system, regression, acceptance testing, performance testing." },
            { num: "Unit IV", topics: "Test Automation & Tools: JUnit, Selenium, test reports, bug tracking tools." }
          ]
        },
        {
          code: "CS-309",
          icon: "⚙",
          title: "Compiler Design",
          shortDesc: "Lexical Analysis, Parsers, Syntax-Directed Translation, and Code Generation",
          units: [
            { num: "Unit I", topics: "Introduction to Compilers: Phases of compiler, lexical analyzer generation (LEX)." },
            { num: "Unit II", topics: "Parsing Techniques: Top-down parsing (LL), bottom-up parsing (LR, LALR, SLR), parser generators (YACC)." },
            { num: "Unit III", topics: "Syntax-Directed Translation: SDD, SDTS, intermediate code forms: three-address code." },
            { num: "Unit IV", topics: "Code Optimization: Loop optimization, data flow analysis, code generator architectures." }
          ]
        }
      ]
    },
    6: {
      desc: "Implement intelligent models, security systems, and microprocessor hardware.",
      subjects: [
        {
          code: "CS-302",
          icon: "🤖",
          title: "Artificial Intelligence",
          shortDesc: "Heuristic Searching, Knowledge Representation, and Machine Learning Systems",
          units: [
            { num: "Unit I", topics: "AI overview, state space search, heuristic search: A* algorithm, game playing." },
            { num: "Unit II", topics: "Knowledge representation, predicate logic, resolution, semantic networks." },
            { num: "Unit III", topics: "Reasoning under uncertainty, Bayesian networks, fuzzy logic basics." },
            { num: "Unit IV", topics: "Planning, Machine learning introduction, Expert systems, NLP overview." }
          ]
        },
        {
          code: "CS-304",
          icon: "🎨",
          title: "Computer Graphics",
          shortDesc: "Scan Conversion, 2D/3D Transformations, Viewing, and Hidden Surface Elimination",
          units: [
            { num: "Unit I", topics: "Graphics Basics: Video display devices, scan conversion: DDA, Bresenham line & circle algorithms." },
            { num: "Unit II", topics: "2D Transformations: Translation, scaling, rotation, reflection, shearing, clipping: Cohen-Sutherland." },
            { num: "Unit III", topics: "3D Graphics: 3D transformations, projections (parallel and perspective), curves: Bezier, B-Splines." },
            { num: "Unit IV", topics: "Rendering: Hidden surface elimination (Z-buffer), illumination models, shading: Gouraud, Phong." }
          ]
        },
        {
          code: "CS-306",
          icon: "📂",
          title: "Data Warehousing & Data Mining",
          shortDesc: "OLAP, ETL, Association Rules, Classification, and Clustering Algorithms",
          units: [
            { num: "Unit I", topics: "Data Warehouse: Architecture, multidimensional schemas (Star, Snowflake), OLAP operations." },
            { num: "Unit II", topics: "Data Preprocessing: Data cleaning, integration, reduction, transformation." },
            { num: "Unit III", topics: "Mining Association Rules: Apriori algorithm, FP-Growth, classification: decision trees, Naive Bayes." },
            { num: "Unit IV", topics: "Clustering & Trends: Partitioning methods (K-means), hierarchical clustering, outlier detection." }
          ]
        },
        {
          code: "CS-308",
          icon: "🔑",
          title: "Cryptography & Network Security",
          shortDesc: "Symmetric Encryption, Public Key Cryptography, Hashes, and Network Protocols",
          units: [
            { num: "Unit I", topics: "Security Concepts: Attacks, services, classical encryption techniques, block ciphers: DES, AES." },
            { num: "Unit II", topics: "Public Key Cryptography: RSA, Diffie-Hellman key exchange, elliptic curve cryptography." },
            { num: "Unit III", topics: "Hash Functions: MD5, SHA-512, digital signatures, message authentication codes." },
            { num: "Unit IV", topics: "Network Security: IPsec, SSL/TLS, firewalls, intrusion detection systems, malware ciphers." }
          ]
        },
        {
          code: "ES-312",
          icon: "🎛",
          title: "Microprocessors & Microcontrollers",
          shortDesc: "8085/8086 Architectures, Assembler Directives, Interfacing, and 8051 Micros",
          units: [
            { num: "Unit I", topics: "8085 Architecture: Pin details, register organization, instruction set, timing diagrams." },
            { num: "Unit II", topics: "8086 Microprocessor: Internal architecture, memory segmentation, addressing modes, assembly programming." },
            { num: "Unit III", topics: "Peripheral Interfacing: PPI 8255, PIT 8253, PIC 8259, DMA controller 8257, ADC/DAC interface." },
            { num: "Unit IV", topics: "8051 Microcontroller: Architecture, memory layout, SFRs, timers, interrupts, serial communication." }
          ]
        }
      ]
    },
    7: {
      desc: "Deploy machine learning cognitive structures, cloud systems, and mobile computed platforms.",
      subjects: [
        {
          code: "CS-401",
          icon: "🔒",
          title: "Information Security",
          shortDesc: "Access Control, Risk Management, Digital Laws, and Cyber Forensics",
          units: [
            { num: "Unit I", topics: "Security Policies: Models (Bell-LaPadula, Biba), access control matrices, authentication protocols." },
            { num: "Unit II", topics: "Database Security: SQL injection mitigation, statistical database security, auditing." },
            { num: "Unit III", topics: "Cyber Law & IT Act: Intellectual property, privacy issues, legal aspects of security, patent systems." },
            { num: "Unit IV", topics: "Intrusion Detection: Threat modeling, firewalls, cyber forensics, incident response." }
          ]
        },
        {
          code: "CS-403",
          icon: "📂",
          title: "Software Project Management",
          shortDesc: "Project Planning, Cost Estimation, Resource Allocation, and Risk Management",
          units: [
            { num: "Unit I", topics: "SPM Overview: Project life cycles, project portfolio, feasibility analysis." },
            { num: "Unit II", topics: "Project Scheduling & Cost: COCOMO, function point analysis, PERT/CPM chart networks." },
            { num: "Unit III", topics: "Risk Management: Identification, monitoring, mitigation strategies. Resource allocation." },
            { num: "Unit IV", topics: "Quality Assurance: ISO 9001, CMMI models, project monitoring, team organization." }
          ]
        },
        {
          code: "EC-405",
          icon: "📡",
          title: "Wireless Communication",
          shortDesc: "Radio Wave Propagation, Cellular Design, Channel Fading, and LTE Systems",
          units: [
            { num: "Unit I", topics: "Cellular System: Frequency reuse, handoff strategies, interference, capacity expansion." },
            { num: "Unit II", topics: "Mobile Radio Propagation: Large-scale path loss, small-scale fading, multipath propagation." },
            { num: "Unit III", topics: "Modulation & Multiple Access: FDMA, TDMA, CDMA, OFDM, MIMO structures." },
            { num: "Unit IV", topics: "Wireless Standards: GSM architecture, GPRS, LTE, 5G NR networks." }
          ]
        },
        {
          code: "CS-407",
          icon: "🤖",
          title: "Machine Learning",
          shortDesc: "Supervised Learning, Deep Networks, Clustering Models, and Reinforcement Agents",
          units: [
            { num: "Unit I", topics: "Introduction to ML: Linear regression, logistic regression, decision trees, support vector machines." },
            { num: "Unit II", topics: "Neural Networks: Perceptrons, backpropagation, convolutional neural networks (CNNs), RNNs." },
            { num: "Unit III", topics: "Unsupervised Learning: K-means clustering, PCA dimensional reduction, anomaly detection." },
            { num: "Unit IV", topics: "Reinforcement Learning: Markov decision processes, Q-learning, deep Q-networks, model deployment." }
          ]
        }
      ]
    },
    8: {
      desc: "Apply advanced architectures, virtualization layers, and semantic networks.",
      subjects: [
        {
          code: "CS-402",
          icon: "📱",
          title: "Mobile Computing",
          shortDesc: "Mobile network infrastructures, Mobile IP, routing, and mobile platforms",
          units: [
            { num: "Unit I", topics: "Mobile computing architecture, cellular networks, GSM systems, GPRS." },
            { num: "Unit II", topics: "Wireless LAN, IEEE 802.11 architecture, MAC layer, Bluetooth." },
            { num: "Unit III", topics: "Mobile network layer: Mobile IP, DHCP. Mobile transport layer: TCP optimization." },
            { num: "Unit IV", topics: "Mobile application platforms: Android, iOS, mobile ad-hoc networks (MANET)." }
          ]
        },
        {
          code: "CS-404",
          icon: "☁",
          title: "Cloud Computing",
          shortDesc: "Virtualization, SaaS, PaaS, IaaS architectures",
          units: [
            { num: "Unit I", topics: "Cloud computing reference model, virtualization technologies, hypervisors." },
            { num: "Unit II", topics: "Cloud services models: Infrastructure (IaaS), Platform (PaaS), Software (SaaS)." },
            { num: "Unit III", topics: "Cloud storage models, resource management, security issues in clouds." },
            { num: "Unit IV", topics: "Case studies: AWS, Google Cloud, Microsoft Azure, Docker & Kubernetes." }
          ]
        },
        {
          code: "CS-406",
          icon: "🗣",
          title: "Natural Language Processing",
          shortDesc: "Tokenization, POS Tagging, Syntactic Parsing, and Sequence Models",
          units: [
            { num: "Unit I", topics: "NLP Introduction: Regular expressions, tokenization, stemming, lemmatization, N-grams." },
            { num: "Unit II", topics: "Syntactic Parsing: Part-of-speech (POS) tagging, context-free grammars for English, dependency parsing." },
            { num: "Unit III", topics: "Semantic Analysis: Lexical semantics, WordNet, word embeddings (Word2Vec, GloVe), semantic role labeling." },
            { num: "Unit IV", topics: "NLP Applications: Machine translation, sentiment analysis, chatbots, transformer models (BERT, GPT)." }
          ]
        }
      ]
    }
  },
  IT: {
    1: {
      desc: "Build your foundation. Master the core concepts of engineering and programming.",
      subjects: [
        {
          code: "BS-111",
          icon: "√x",
          title: "Applied Mathematics - I",
          shortDesc: "Calculus, Matrices, and Differential Equations",
          units: [
            { num: "Unit I", topics: "Matrices: Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Diagonalization of matrices." },
            { num: "Unit II", topics: "Differential Calculus: Successive differentiation, Leibnitz theorem, Taylor's and Maclaurin's series, Curvature." },
            { num: "Unit III", topics: "Partial Differentiation: Euler's theorem, Jacobians, Taylor's series for two variables, Maxima and Minima." },
            { num: "Unit IV", topics: "Integral Calculus: Double and triple integrals, Change of order, Area and volume calculation." }
          ]
        },
        {
          code: "BS-112",
          icon: "⚛",
          title: "Applied Physics - I",
          shortDesc: "Mechanics, Wave Theory, and Optical Systems",
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
          shortDesc: "Physical, Organic & Inorganic Engineering Chemistry",
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
          shortDesc: "Algorithms, Syntax, Control structures, and Files",
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
          shortDesc: "DC/AC Circuits, Transformers, and Electrical Machines",
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
          shortDesc: "Orthographic Projections, Solid Geometries, and CAD",
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
      desc: "Strengthen core engineering constructs and object-oriented paradigms.",
      subjects: [
        {
          code: "BS-121",
          icon: "∫",
          title: "Applied Mathematics - II",
          shortDesc: "Vector Calculus, Laplace Transforms, and Ordinary Differential Equations",
          units: [
            { num: "Unit I", topics: "Ordinary Differential Equations: First order exact equations, linear differential equations of higher order." },
            { num: "Unit II", topics: "Orthogonal Trajectories, Cauchy-Euler equations, method of variation of parameters." },
            { num: "Unit III", topics: "Vector Calculus: Gradient, divergence, curl, line integrals, Green's, Gauss's, and Stokes' theorems." },
            { num: "Unit IV", topics: "Laplace Transforms: Transforms of elementary functions, inverse Laplace transforms, convolution theorem." }
          ]
        },
        {
          code: "BS-122",
          icon: "⚛",
          title: "Applied Physics - II",
          shortDesc: "Electromagnetism, Solid State Physics, and Quantum Mechanics",
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
          shortDesc: "Object-Oriented Programming, Classes, Templates, and STL",
          units: [
            { num: "Unit I", topics: "OOP basics, C++ vs C, Classes, Objects, constructors and destructors." },
            { num: "Unit II", topics: "Operator overloading, function overloading, friend functions." },
            { num: "Unit III", topics: "Inheritance: Single, multiple, hierarchical, virtual base classes. Polymorphism." },
            { num: "Unit IV", topics: "Templates, exception handling, standard template library (STL)." }
          ]
        },
        {
          code: "ES-106",
          icon: "📟",
          title: "Basic Electronics Engineering",
          shortDesc: "Semiconductors, Diodes, Transistors, and Digital Logic Basics",
          units: [
            { num: "Unit I", topics: "Semiconductor Diodes: P-N junction, Zener diode, Rectifiers, Clippers and Clampers." },
            { num: "Unit II", topics: "Bipolar Junction Transistors: CE, CB, CC configurations, biasing circuits, load line analysis." },
            { num: "Unit III", topics: "Field Effect Transistors: JFET, MOSFET characteristics, operational amplifiers." },
            { num: "Unit IV", topics: "Digital Electronics: Number systems, Boolean algebra, Logic gates, Combinational logic circuit basics." }
          ]
        },
        {
          code: "ES-108",
          icon: "🧱",
          title: "Engineering Mechanics",
          shortDesc: "Statics, Force Systems, Friction, and Structural Mechanics",
          units: [
            { num: "Unit I", topics: "Force Systems: Coplanar concurrent forces, resultant, Lami's theorem, moments and couples." },
            { num: "Unit II", topics: "Equilibrium of Rigid Bodies: Free body diagrams, reactions, support reactions, trusses, method of joints." },
            { num: "Unit III", topics: "Centroid and Moment of Inertia: Parallel axis theorem, polar moment of inertia, mass moment of inertia." },
            { num: "Unit IV", topics: "Friction: Laws of friction, wedge friction, belt friction, kinematics of particles." }
          ]
        },
        {
          code: "HS-102",
          icon: "🗣",
          title: "Communication Skills",
          shortDesc: "Grammar, Technical Writing, and Group Discussions",
          units: [
            { num: "Unit I", topics: "Communication Basics: Process, barriers, non-verbal communication, listening skills." },
            { num: "Unit II", topics: "Grammar & Vocabulary: Common errors, active-passive voice, direct-indirect speech, idioms." },
            { num: "Unit III", topics: "Technical Writing: Letter writing, resumes, report writing, emails, proposals." },
            { num: "Unit IV", topics: "Speaking Skills: Group discussions, presentations, interviews, public speaking." }
          ]
        }
      ]
    },
    3: {
      desc: "Explore core algorithms, discrete structures, and logic representation.",
      subjects: [
        {
          code: "CS-201",
          icon: "∑",
          title: "Discrete Structure",
          shortDesc: "Sets, Relations, Logic, Algebraic Structures, and Graph Theory",
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
          shortDesc: "Linear & Non-linear data representation, trees, graphs, and search algorithms",
          units: [
            { num: "Unit I", topics: "Complexity analysis, arrays, linked lists (single, double, circular)." },
            { num: "Unit II", topics: "Stacks, Queues, recursion, implementation using arrays & linked lists." },
            { num: "Unit III", topics: "Trees: Binary trees, traversals, AVL trees, B-trees, heaps." },
            { num: "Unit IV", topics: "Graphs: Representation, BFS, DFS. Searching & Sorting algorithms, hashing." }
          ]
        },
        {
          code: "CS-205",
          icon: "🖥",
          title: "Computer Organization & Architecture",
          shortDesc: "Register Transfer, CPU Design, Microprogramming, and Memory Hierarchies",
          units: [
            { num: "Unit I", topics: "Register Transfer and Microoperations: Bus transfer, arithmetic, logic, and shift microoperations." },
            { num: "Unit II", topics: "Basic Computer Organization: Instruction codes, computer registers, instruction cycle, input-output interrupts." },
            { num: "Unit III", topics: "Central Processing Unit: Stack organization, instruction formats, addressing modes, RISC vs CISC." },
            { num: "Unit IV", topics: "Memory & Pipeline: Cache memory, virtual memory, pipelining, vector processing." }
          ]
        },
        {
          code: "IT-207",
          icon: "🚥",
          title: "Analog & Digital Circuits",
          shortDesc: "Op-amps, Wave Shaping, Logic Gates, and Combinational Logic Design",
          units: [
            { num: "Unit I", topics: "Operational Amplifiers: Differential amplifiers, feedback, linear and non-linear applications." },
            { num: "Unit II", topics: "Logic Gates & Simplification: Boolean algebra, DeMorgan's laws, Karnaugh maps, SOP/POS ciphers." },
            { num: "Unit III", topics: "Combinational Circuits: Adders, subtractors, decoders, encoders, multiplexers, demultiplexers." },
            { num: "Unit IV", topics: "Sequential Circuits: Latches, flip-flops, shift registers, synchronous and asynchronous counters." }
          ]
        },
        {
          code: "IT-209",
          icon: "⚙",
          title: "Object Oriented Programming",
          shortDesc: "Java Fundamentals, Collections, Exception Handling, and Swing UI Frameworks",
          units: [
            { num: "Unit I", topics: "Java Basics: JVM, classes, objects, inheritance, polymorphism, interfaces, packages." },
            { num: "Unit II", topics: "Exceptions & I/O: Try-catch blocks, custom exceptions, byte streams, character streams." },
            { num: "Unit III", topics: "Java Collections: List, Set, Map interfaces, generics, multi-threading basics." },
            { num: "Unit IV", topics: "GUI Programming: Event handling, Layout managers, Swing components, JDBC." }
          ]
        }
      ]
    },
    4: {
      desc: "Implement databases, network layers, communication channels, and systems systems.",
      subjects: [
        {
          code: "IT-204",
          icon: "📁",
          title: "Database Management Systems",
          shortDesc: "ER Diagrams, Relational Algebra, SQL, Normalization, and Transactions",
          units: [
            { num: "Unit I", topics: "DBMS Overview: Data independence, database languages, ER diagrams, relational model." },
            { num: "Unit II", topics: "Relational Query Languages: Relational algebra, SQL queries, DDL, DML, DCL commands." },
            { num: "Unit III", topics: "Normalization: Functional dependencies, 1NF, 2NF, 3NF, BCNF, multi-valued dependency." },
            { num: "Unit IV", topics: "Transaction Management: ACID properties, concurrency control, locks, recovery systems." }
          ]
        },
        {
          code: "IT-206",
          icon: "💻",
          title: "Operating Systems",
          shortDesc: "CPU Scheduling, Synchronization, Memory Management, and Disk Scheduling",
          units: [
            { num: "Unit I", topics: "OS overview, process state transitions, CPU scheduling algorithms." },
            { num: "Unit II", topics: "Process synchronization: Semaphores, monitors, classical synchronization problems. Deadlocks." },
            { num: "Unit III", topics: "Memory management: Paging, segmentation, virtual memory page replacement." },
            { num: "Unit IV", topics: "File systems structure, disk scheduling algorithms, security and protection." }
          ]
        },
        {
          code: "IT-208",
          icon: "✍",
          title: "Software Engineering",
          shortDesc: "SDLC Models, Requirements, UML Diagrams, Testing, and Maintenance",
          units: [
            { num: "Unit I", topics: "Software Process Models: Waterfall, spiral, prototype, agile models (Scrum)." },
            { num: "Unit II", topics: "Requirements Engineering: SRS document, software design principles, UML diagrams." },
            { num: "Unit III", topics: "Coding and Testing: White-box testing, black-box testing, unit, integration, and system testing." },
            { num: "Unit IV", topics: "Software Metrics: COCOMO model, function points, maintenance, configuration management." }
          ]
        },
        {
          code: "IT-210",
          icon: "🌐",
          title: "Computer Networks",
          shortDesc: "OSI Reference Model, TCP/IP Suite, Routing Algorithms, and Security",
          units: [
            { num: "Unit I", topics: "Introduction to networks, physical layer encoding, transmission media, topologies." },
            { num: "Unit II", topics: "Data link layer: Framing, error control, sliding window protocols, MAC sublayer." },
            { num: "Unit III", topics: "Network layer: IP addressing, routing algorithms (OSPF, BGP), congestion control." },
            { num: "Unit IV", topics: "Transport & Application: TCP, UDP, HTTP, DNS, SMTP, network security basics." }
          ]
        },
        {
          code: "EC-212",
          icon: "📡",
          title: "Principles of Communication",
          shortDesc: "Amplitude Modulation, Angle Modulation, Sampling, and Digital Modulation Basics",
          units: [
            { num: "Unit I", topics: "Analog Modulation: Amplitude Modulation (DSB-SC, SSB, VSB), frequency translation." },
            { num: "Unit II", topics: "Angle Modulation: Frequency Modulation (FM), Phase Modulation (PM), noise analysis in communication." },
            { num: "Unit III", topics: "Digital Transmission: Sampling theorem, pulse code modulation (PCM), delta modulation." },
            { num: "Unit IV", topics: "Digital Modulation: ASK, FSK, PSK, QAM, multiplexing: TDM, FDM systems." }
          ]
        }
      ]
    },
    5: {
      desc: "Optimize data algorithms, modern web engines, digital channels, and design models.",
      subjects: [
        {
          code: "IT-301",
          icon: "📐",
          title: "Design & Analysis of Algorithms",
          shortDesc: "Asymptotic Notation, Divide & Conquer, Greedy, Dynamic Programming, and NP-Completeness",
          units: [
            { num: "Unit I", topics: "Algorithm Analysis: Asymptotic notations, recurrence relations, Master method." },
            { num: "Unit II", topics: "Divide & Conquer, Greedy Algorithms: Merge sort, Quick sort, Knapsack, Huffman codes, Spanning trees." },
            { num: "Unit III", topics: "Dynamic Programming, Backtracking: Matrix chain multiplication, LCS, 0/1 Knapsack, N-Queens." },
            { num: "Unit IV", topics: "Complexity Classes: P, NP, NP-Hard, NP-Complete problems, approximation algorithms." }
          ]
        },
        {
          code: "IT-303",
          icon: "🌐",
          title: "Web Technology",
          shortDesc: "HTML5/CSS3, JavaScript DOM, XML/JSON, and Node/Express architectures",
          units: [
            { num: "Unit I", topics: "Web Architecture: HTTP protocols, HTML5 elements, CSS3 styling, responsive layouts." },
            { num: "Unit II", topics: "Client-side Scripting: JavaScript fundamentals, DOM manipulation, event handling, AJAX." },
            { num: "Unit III", topics: "XML and Web Services: XML schema, parsing, JSON syntax, Web Services description (SOAP, REST)." },
            { num: "Unit IV", topics: "Server-side Engineering: Node.js basics, Express routes, database access, session tracking." }
          ]
        },
        {
          code: "IT-305",
          icon: "☕",
          title: "Java Programming",
          shortDesc: "Advanced Java Concepts, Collections Framework, Networking, and Servlet Architectures",
          units: [
            { num: "Unit I", topics: "OOP Implementation: Interfaces, packages, inner classes, Exception handling." },
            { num: "Unit II", topics: "Java Collections: List, Set, Map interfaces, generics, file streams, serialization." },
            { num: "Unit III", topics: "Java Networking: Socket programming, URL connection, RMI, multi-threaded servers." },
            { num: "Unit IV", topics: "Enterprise Java: Servlets, JSP lifecycle, JDBC database queries, MVC implementation." }
          ]
        },
        {
          code: "EC-311",
          icon: "📡",
          title: "Digital Communication",
          shortDesc: "Line Coding, Information Theory, Error Correction Codes, and Spread Spectrum",
          units: [
            { num: "Unit I", topics: "Baseband Transmission: Line coding formats (NRZ, RZ, Manchester), ISI, Nyquist criterion, eye patterns." },
            { num: "Unit II", topics: "Information Theory: Entropy, channel capacity, Shannon-Hartley theorem, source coding." },
            { num: "Unit III", topics: "Error Control Coding: Linear block codes, cyclic codes, convolutional codes." },
            { num: "Unit IV", topics: "Spread Spectrum: Direct sequence spread spectrum, frequency hopping, CDMA basics." }
          ]
        },
        {
          code: "IT-309",
          icon: "🏢",
          title: "Software Engineering",
          shortDesc: "Process models, SRS documentation, testing practices, and project metrics",
          units: [
            { num: "Unit I", topics: "Software Process Models: Waterfall, spiral, prototype, agile models (Scrum)." },
            { num: "Unit II", topics: "Requirements Engineering: SRS document, software design principles, UML diagrams." },
            { num: "Unit III", topics: "Coding and Testing: White-box testing, black-box testing, unit, integration, and system testing." },
            { num: "Unit IV", topics: "Software Metrics: COCOMO model, function points, maintenance, configuration management." }
          ]
        }
      ]
    },
    6: {
      desc: "Develop advanced mobile platforms, security structures, web systems, and AI modules.",
      subjects: [
        {
          code: "IT-302",
          icon: "💻",
          title: "Web Development",
          shortDesc: "Frontend Frameworks (React), Backend REST APIs, and Cloud Deployments",
          units: [
            { num: "Unit I", topics: "Modern Frontend: Single page applications, React.js: state, props, lifecycle hooks, routing." },
            { num: "Unit II", topics: "Backend Engineering: REST API design, Express middleware, MongoDB integration, Mongoose schemas." },
            { num: "Unit III", topics: "State Management: Redux/Context API, authentication methods (JWT, OAuth)." },
            { num: "Unit IV", topics: "Cloud Deployment: Containerization (Docker), deployment on Heroku/AWS, CI/CD pipeline basics." }
          ]
        },
        {
          code: "IT-304",
          icon: "📱",
          title: "Mobile Computing",
          shortDesc: "Mobile network infrastructures, Mobile IP, routing, and mobile platforms",
          units: [
            { num: "Unit I", topics: "Mobile computing architecture, cellular networks, GSM systems, GPRS." },
            { num: "Unit II", topics: "Wireless LAN, IEEE 802.11 architecture, MAC layer, Bluetooth." },
            { num: "Unit III", topics: "Mobile network layer: Mobile IP, DHCP. Mobile transport layer: TCP optimization." },
            { num: "Unit IV", topics: "Mobile application platforms: Android, iOS, mobile ad-hoc networks (MANET)." }
          ]
        },
        {
          code: "IT-306",
          icon: "🎨",
          title: "Multimedia Applications",
          shortDesc: "Audio/Video compression, Image standards, MIDI, and multimedia auth engines",
          units: [
            { num: "Unit I", topics: "Multimedia Systems: Text, graphics, image representation, file formats (BMP, JPG, PNG)." },
            { num: "Unit II", topics: "Audio & Video: Digital audio, MIDI, sound cards, digital video formats, MPEG standards." },
            { num: "Unit III", topics: "Compression Algorithms: Lossless (Huffman, LZW), Lossy (DCT, Wavelet), JPEG compression." },
            { num: "Unit IV", topics: "Multimedia Networking: Streaming protocols, Quality of Service (QoS), authoring tools." }
          ]
        },
        {
          code: "IT-308",
          icon: "🔑",
          title: "Information Security",
          shortDesc: "Security policies, Symmetric ciphers, Public Key structures, and Cyber Laws",
          units: [
            { num: "Unit I", topics: "Security Concepts: Attacks, services, classical encryption techniques, block ciphers: DES, AES." },
            { num: "Unit II", topics: "Public Key Cryptography: RSA, Diffie-Hellman key exchange, elliptic curve cryptography." },
            { num: "Unit III", topics: "Hash Functions: MD5, SHA-512, digital signatures, message authentication codes." },
            { num: "Unit IV", topics: "Network Security: IPsec, SSL/TLS, firewalls, intrusion detection systems, malware ciphers." }
          ]
        },
        {
          code: "IT-310",
          icon: "🤖",
          title: "Artificial Intelligence",
          shortDesc: "Heuristic Searching, Knowledge Representation, and Machine Learning Systems",
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
      desc: "Implement virtualization layers, big data pipelines, cyber security codes, and Internet of Things.",
      subjects: [
        {
          code: "IT-401",
          icon: "☁",
          title: "Cloud Computing",
          shortDesc: "Virtualization, SaaS, PaaS, IaaS architectures",
          units: [
            { num: "Unit I", topics: "Cloud computing reference model, virtualization technologies, hypervisors." },
            { num: "Unit II", topics: "Cloud services models: Infrastructure (IaaS), Platform (PaaS), Software (SaaS)." },
            { num: "Unit III", topics: "Cloud storage models, resource management, security issues in clouds." },
            { num: "Unit IV", topics: "Case studies: AWS, Google Cloud, Microsoft Azure, Docker & Kubernetes." }
          ]
        },
        {
          code: "IT-403",
          icon: "📊",
          title: "Big Data Analytics",
          shortDesc: "Hadoop Architecture, MapReduce, NoSQL, Pig, Hive, and Spark engines",
          units: [
            { num: "Unit I", topics: "Big Data Overview: Characteristics, HDFS architecture, Hadoop configuration." },
            { num: "Unit II", topics: "MapReduce Framework: Map and Reduce phases, execution flow, data types." },
            { num: "Unit III", topics: "NoSQL Databases: Schema-less structures, Key-value (Redis), Document (MongoDB), Column family (HBase)." },
            { num: "Unit IV", topics: "Apache Ecosystem: Pig Latin, HiveQL queries, Spark processing model, streaming analytics." }
          ]
        },
        {
          code: "IT-405",
          icon: "🔒",
          title: "Cryptography & Cyber Security",
          shortDesc: "Advanced ciphers, IPsec, SSL, firewalls, cyber laws, and digital forensics",
          units: [
            { num: "Unit I", topics: "Security Policies: Models (Bell-LaPadula, Biba), access control matrices, authentication protocols." },
            { num: "Unit II", topics: "Database Security: SQL injection mitigation, statistical database security, auditing." },
            { num: "Unit III", topics: "Cyber Law & IT Act: Intellectual property, privacy issues, legal aspects of security, patent systems." },
            { num: "Unit IV", topics: "Intrusion Detection: Threat modeling, firewalls, cyber forensics, incident response." }
          ]
        },
        {
          code: "IT-407",
          icon: "🔌",
          title: "Internet of Things",
          shortDesc: "Sensors, Actuators, Raspberry Pi, Arduino, Protocols (MQTT, CoAP), and cloud IoT integration",
          units: [
            { num: "Unit I", topics: "IoT Basics: Definition, physical and logical design, IoT levels, domain specific applications." },
            { num: "Unit II", topics: "Hardware Platforms: Arduino, Raspberry Pi programming, sensor interfacing, actuators." },
            { num: "Unit III", topics: "IoT Protocols: Link layer, network layer (IPv6, 6LoWPAN), application layer (MQTT, CoAP)." },
            { num: "Unit IV", topics: "Cloud IoT & Analytics: AWS IoT Core, Adafruit IO, data collection, visualization, security issues." }
          ]
        }
      ]
    },
    8: {
      desc: "Explore semantic web patterns, wireless networks, and digital e-commerce architectures.",
      subjects: [
        {
          code: "IT-402",
          icon: "🕸",
          title: "Semantic Web & Social Networks",
          shortDesc: "RDF, OWL, SPARQL, Ontologies, and social graph analysis metrics",
          units: [
            { num: "Unit I", topics: "Semantic Web Overview: Limitations of XML, RDF model, RDFS classes, properties." },
            { num: "Unit II", topics: "Ontologies: Web Ontology Language (OWL) syntax, description logic, SPARQL queries." },
            { num: "Unit III", topics: "Social Network Analysis: Network metrics (degree, centrality, clustering), graphs, community detection." },
            { num: "Unit IV", topics: "Semantic applications: FOAF profiles, DBpedia, semantic search engines, graph databases." }
          ]
        },
        {
          code: "IT-404",
          icon: "📡",
          title: "Wireless Sensor Networks",
          shortDesc: "WSN Architectures, MAC Layer Protocols, Routing, and Node Localization",
          units: [
            { num: "Unit I", topics: "WSN Architecture: Hardware components, sensor node design, operating systems (TinyOS)." },
            { num: "Unit II", topics: "MAC Layer: IEEE 802.15.4, S-MAC, T-MAC, energy conservation strategies." },
            { num: "Unit III", topics: "Routing Protocols: Flooding, Gossiping, LEACH, PEGASIS, Directed Diffusion." },
            { num: "Unit IV", topics: "Localization & Security: Range-based/range-free localization, time synchronization, node key management." }
          ]
        },
        {
          code: "IT-406",
          icon: "💼",
          title: "E-Commerce & ERP",
          shortDesc: "E-business models, Electronic payments, Security, ERP architectures, and CRM systems",
          units: [
            { num: "Unit I", topics: "E-Commerce Framework: B2B, B2C, C2C business models, electronic payment gateways." },
            { num: "Unit II", topics: "E-Security: Digital signatures, SSL/TLS, secure electronic transaction (SET) protocol." },
            { num: "Unit III", topics: "ERP Systems: Concept, modules (finance, HR, production, sales), enterprise lifecycle." },
            { num: "Unit IV", topics: "CRM & Supply Chain: Customer relationship management, supply chain integration, business analytics." }
          ]
        }
      ]
    }
  }
};

// Dynamic Subject Mapping for All Other Branches (ECE, EEE, EE, MAE, ME, CE, AIDS, AIML)
const dynamicBranchSubjects = {
  ECE: {
    3: ["Discrete Structure", "Data Structures", "Signals and Systems", "Network Analysis & Synthesis", "Switching Theory & Logic Design"],
    4: ["Applied Mathematics - IV", "Analog Communications", "Computer Organization & Architecture", "Linear Integrated Circuits", "Electro-Magnetic Fields"],
    5: ["Digital Communication", "Control Systems", "Microprocessors & Microcontrollers", "Digital Signal Processing", "Transmission Lines & Waveguides"],
    6: ["VLSI Design", "Information Theory & Coding", "Wireless Communication", "Antenna & Wave Propagation", "Embedded Systems"],
    7: ["Optical Communication", "Satellite Communication", "Digital Image Processing", "Machine Learning"],
    8: ["Mobile Computing", "Radar & Navigation Systems", "Ad-hoc Wireless Networks"]
  },
  AIDS: {
    3: ["Discrete Structure", "Data Structures", "Computer Organization & Architecture", "Python Programming", "Digital Electronics"],
    4: ["Applied Mathematics - IV", "Database Management Systems", "Operating Systems", "Software Engineering", "Probability & Statistics"],
    5: ["Design & Analysis of Algorithms", "Computer Networks", "Introduction to Machine Learning", "Data Visualization", "Compiler Design"],
    6: ["Artificial Intelligence", "Deep Learning Models", "Data Warehousing & Mining", "Natural Language Processing", "Big Data Analytics"],
    7: ["Reinforcement Learning", "Computer Vision", "Cloud Computing", "AI Ethics & Governance"],
    8: ["Mobile Computing", "Internet of Things", "Robotics & Automation"]
  },
  AIML: {
    3: ["Discrete Structure", "Data Structures", "Computer Organization & Architecture", "Python Programming", "Digital Electronics"],
    4: ["Applied Mathematics - IV", "Database Management Systems", "Operating Systems", "Software Engineering", "Probability & Statistics"],
    5: ["Design & Analysis of Algorithms", "Computer Networks", "Introduction to Machine Learning", "Data Visualization", "Compiler Design"],
    6: ["Artificial Intelligence", "Deep Learning Models", "Data Warehousing & Mining", "Natural Language Processing", "Big Data Analytics"],
    7: ["Reinforcement Learning", "Computer Vision", "Cloud Computing", "AI Ethics & Governance"],
    8: ["Mobile Computing", "Internet of Things", "Robotics & Automation"]
  },
  EEE: {
    3: ["Discrete Structure", "Data Structures", "Electrical Machines - I", "Network Analysis & Synthesis", "Digital Electronics"],
    4: ["Power Systems - I", "Electrical Machines - II", "Electromagnetic Field Theory", "Linear Integrated Circuits", "Computer Organization"],
    5: ["Power Electronics", "Control Systems", "Microprocessors & Microcontrollers", "Power Station Practice", "Electrical Measurements"],
    6: ["Power System Analysis & Control", "Utilization of Electrical Energy", "Renewable Energy Sources", "VLSI Design", "Digital Signal Processing"],
    7: ["High Voltage Engineering", "Electric Drives", "Advanced Control Systems", "Power System Protection"],
    8: ["Non-Conventional Energy Sources", "Smart Grid Technologies", "Energy Audit & Management"]
  },
  EE: {
    3: ["Discrete Structure", "Data Structures", "Electrical Machines - I", "Network Analysis & Synthesis", "Digital Electronics"],
    4: ["Power Systems - I", "Electrical Machines - II", "Electromagnetic Field Theory", "Linear Integrated Circuits", "Computer Organization"],
    5: ["Power Electronics", "Control Systems", "Microprocessors & Microcontrollers", "Power Station Practice", "Electrical Measurements"],
    6: ["Power System Analysis & Control", "Utilization of Electrical Energy", "Renewable Energy Sources", "VLSI Design", "Digital Signal Processing"],
    7: ["High Voltage Engineering", "Electric Drives", "Advanced Control Systems", "Power System Protection"],
    8: ["Non-Conventional Energy Sources", "Smart Grid Technologies", "Energy Audit & Management"]
  },
  MAE: {
    3: ["Applied Mathematics - III", "Strength of Materials", "Engineering Thermodynamics", "Manufacturing Processes", "Kinematics of Machines"],
    4: ["Dynamics of Machines", "Fluid Mechanics & Machines", "Machine Design - I", "Machine Drawing", "Thermal Engineering"],
    5: ["Heat & Mass Transfer", "Machine Design - II", "Metrology & Instrumentation", "IC Engines", "Operations Research"],
    6: ["CAD/CAM", "Refrigeration & Air Conditioning", "Automobile Engineering", "Mechanical Vibrations", "Industrial Management"],
    7: ["Mechatronics", "Rapid Prototyping", "Robotics & Automation", "Power Plant Engineering"],
    8: ["Flexible Manufacturing Systems", "Total Quality Management", "Project Management"]
  },
  ME: {
    3: ["Applied Mathematics - III", "Strength of Materials", "Engineering Thermodynamics", "Manufacturing Processes", "Kinematics of Machines"],
    4: ["Dynamics of Machines", "Fluid Mechanics & Machines", "Machine Design - I", "Machine Drawing", "Thermal Engineering"],
    5: ["Heat & Mass Transfer", "Machine Design - II", "Metrology & Instrumentation", "IC Engines", "Operations Research"],
    6: ["CAD/CAM", "Refrigeration & Air Conditioning", "Automobile Engineering", "Mechanical Vibrations", "Industrial Management"],
    7: ["Mechatronics", "Rapid Prototyping", "Robotics & Automation", "Power Plant Engineering"],
    8: ["Flexible Manufacturing Systems", "Total Quality Management", "Project Management"]
  },
  CE: {
    3: ["Applied Mathematics - III", "Strength of Materials", "Fluid Mechanics", "Surveying", "Building Construction & Materials"],
    4: ["Structural Analysis - I", "Hydraulic Engineering", "Geotechnical Engineering - I", "Engineering Geology", "Concrete Technology"],
    5: ["Structural Analysis - II", "Geotechnical Engineering - II", "Environmental Engineering - I", "Transportation Engineering - I", "Design of Steel Structures"],
    6: ["Design of Concrete Structures", "Environmental Engineering - II", "Transportation Engineering - II", "Irrigation Engineering", "Construction Management"],
    7: ["Water Resources Engineering", "Bridge Engineering", "Earthquake Resistant Design", "Estimation and Costing"],
    8: ["Prestressed Concrete", "Advanced Structural Design", "Disaster Management"]
  }
};

// Map emojis for dynamic subjects
const subjectEmojis = {
  "Mathematics": "√x", "Physics": "⚛", "Chemistry": "🔬", "C++": "++", "Java": "☕", "Python": "🐍",
  "Programming": "</>", "Electronics": "📟", "Mechanics": "🧱", "Structures": "🏗", "Network": "🌐",
  "Database": "📁", "Operating": "💻", "Software": "✍", "Theory": "⚙", "Algorithm": "📐",
  "Intelligence": "🤖", "Graphics": "🎨", "Warehouse": "📂", "Security": "🔑", "Microprocessor": "🎛",
  "Power": "⚡", "Machine": "⚙", "Communication": "📡", "Control": "📈", "Surveying": "📐",
  "Concrete": "🧱", "Structural": "🏗", "Environmental": "🌱", "Transportation": "🛣"
};

function getEmojiForSubject(title) {
  for (let key in subjectEmojis) {
    if (title.includes(key)) return subjectEmojis[key];
  }
  return "📚";
}

// Generate realistic GGSIPU syllabus details dynamically for unconfigured paths
function generateDynamicSyllabus(branch, sem) {
  const branchMap = dynamicBranchSubjects[branch];
  const subjectList = (branchMap && branchMap[sem]) || [
    `Core ${branch} Engineering - I`,
    `Advanced ${branch} Systems`,
    `Principles of ${branch} Design`,
    `${branch} Laboratory & Practicum`
  ];

  return {
    desc: `Curated curriculum for ${branch} Engineering, Semester ${sem}. Optimized for standard GGSIPU academics.`,
    subjects: subjectList.map((subTitle, idx) => {
      const formattedCode = `${branch}-${sem}${10 + idx * 2}`;
      return {
        code: formattedCode,
        icon: getEmojiForSubject(subTitle),
        title: subTitle,
        shortDesc: `Core concepts, mathematical representations, and modern configurations of ${subTitle}.`,
        units: [
          { num: "Unit I", topics: `Introduction to ${subTitle}: Core terminology, historical context, fundamental laws, and system boundary parameters.` },
          { num: "Unit II", topics: `Core Mechanics: Analyzing structural components, signal flows, equations of state, and standard processing frameworks.` },
          { num: "Unit III", topics: `Advanced Concepts: Design optimization, integration protocols, testing and validation techniques under GGSIPU schemes.` },
          { num: "Unit IV", topics: `Industry Applications: Practical case studies, automation models, future trends, and lab synthesis pipelines.` }
        ]
      };
    })
  };
}

// Unified interface to fetch syllabus records
function getSyllabusData(branch, sem) {
  // Semester 1 & 2 are common for all engineering branches in GGSIPU
  if (sem === 1 || sem === 2) {
    return syllabusData['CSE'][sem];
  }
  if (syllabusData[branch] && syllabusData[branch][sem]) {
    return syllabusData[branch][sem];
  }
  return generateDynamicSyllabus(branch, sem);
}

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('semesterSelector')) {
    // Restore selection state from localStorage if exists
    currentBranch = localStorage.getItem('selectedBranch') || 'CSE';
    currentSemester = parseInt(localStorage.getItem('selectedSem') || '1');
    
    // Highlight the active branch pill
    const activePill = document.querySelector(`.branch-pill[data-branch="${currentBranch}"]`);
    if (activePill) {
      document.querySelectorAll('.branch-pill').forEach(p => p.classList.remove('active'));
      activePill.classList.add('active');
    }
    
    // Highlight active semester pill in explorer
    const activeSemPill = document.querySelector(`.sem-pill-btn[data-sem="${currentSemester}"]`);
    if (activeSemPill) {
      document.querySelectorAll('.sem-pill-btn').forEach(b => b.classList.remove('active'));
      activeSemPill.classList.add('active');
    }

    // Highlight active semester card in finder
    const activeSemCard = document.querySelector(`.sem-card-btn[data-sem="${currentSemester}"]`);
    if (activeSemCard) {
      document.querySelectorAll('.sem-card-btn').forEach(c => c.classList.remove('active'));
      activeSemCard.classList.add('active');
    }

    setupSemesterSelector();
    setupBranchSelection();
    updateSyllabusHeader();
    renderSemester(); // default load
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
      currentSemester = parseInt(btn.dataset.sem);
      localStorage.setItem('selectedSem', currentSemester);
      renderSemester();
    });
  });
}

// Set up branch selection cards
function setupBranchSelection() {
  const branchPills = document.querySelectorAll('.branch-pill');
  const semCards = document.querySelectorAll('.sem-card-btn');
  
  branchPills.forEach(pill => {
    pill.addEventListener('click', () => {
      branchPills.forEach(p => p.classList.remove('active'));
      pill.classList.add('active');
      currentBranch = pill.dataset.branch;
      localStorage.setItem('selectedBranch', currentBranch);
      
      // Update main explorer titles
      updateSyllabusHeader();
      renderSemester();
    });
  });

  semCards.forEach(card => {
    card.addEventListener('click', () => {
      semCards.forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      const sem = parseInt(card.dataset.sem);
      
      // Sync with active state in engine
      currentSemester = sem;
      localStorage.setItem('selectedSem', currentSemester);
      
      // Sync semester tabs in explorer
      const mainSelector = document.getElementById('semesterSelector');
      if (mainSelector) {
        const mainButtons = mainSelector.querySelectorAll('.sem-pill-btn');
        mainButtons.forEach(b => {
          b.classList.remove('active');
          if (parseInt(b.dataset.sem) === sem) {
            b.classList.add('active');
          }
        });
      }
      
      // Render
      renderSemester();
      
      // Smooth scroll to syllabus section
      const syllabusSect = document.getElementById('syllabus-section');
      if (syllabusSect) {
        syllabusSect.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

function updateSyllabusHeader() {
  const headerTitle = document.querySelector('.explorer-header .header-titles h1');
  const headerDesc = document.querySelector('.explorer-header .header-titles p');
  if (headerTitle) {
    headerTitle.innerHTML = `${currentBranch} Syllabus`;
  }
  if (headerDesc) {
    headerDesc.innerText = `IPU ${currentBranch} Syllabus, curated and organized for your academic journey.`;
  }
}

function getSemOrdinal(sem) {
  if (sem === 1) return '1st';
  if (sem === 2) return '2nd';
  if (sem === 3) return '3rd';
  return sem + 'th';
}

// Render active semester card view
function renderSemester() {
  const data = getSyllabusData(currentBranch, currentSemester);
  if (!data) return;

  const semStr = getSemOrdinal(currentSemester);

  // Update text details
  document.getElementById('currentSemName').innerText = `${semStr} Semester (${currentBranch})`;
  document.getElementById('currentSubjectsCount').innerText = `${data.subjects.length} Subjects`;
  document.getElementById('currentSemDesc').innerText = data.desc;
  
  // Update PDF download link subtext
  document.getElementById('pdfDownloadSubtext').innerText = `${semStr} Semester Complete PDF`;

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
          <a href="${basePrefix}notes.html?branch=${currentBranch}&sem=${currentSemester}&subject=${subject.code}" class="action-link">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
            View Notes
          </a>
          <a href="${basePrefix}pyqs.html?branch=${currentBranch}&sem=${currentSemester}&subject=${subject.code}" class="action-link">
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
