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
        },
        {
          code: "BS-112",
          icon: "⚛",
          title: "Applied Physics-1",
          shortDesc: "Mechanics, Wave Theory, and Optical Systems",
          units: [
            { num: "Unit I", topics: "Interference: Coherent sources, Young's double slit, Newton's rings, Michelson interferometer." },
            { num: "Unit II", topics: "Diffraction: Fraunhofer diffraction, Single slit, Double slit, Diffraction grating, Resolving power." },
            { num: "Unit III", topics: "Polarization: Double refraction, Nicol prism, Production and detection of polarized light, Polarimeters." },
            { num: "Unit IV", topics: "Lasers & Fiber Optics: Einstein's coefficients, Ruby laser, He-Ne laser, Optical fibers, Numerical aperture." }
          ]
        },
        {
          code: "BS-111",
          icon: "√x",
          title: "Applied Mathematics-1",
          shortDesc: "Calculus, Matrices, and Differential Equations",
          units: [
            { num: "Unit I", topics: "Matrices: Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Diagonalization of matrices." },
            { num: "Unit II", topics: "Differential Calculus: Successive differentiation, Leibnitz theorem, Taylor's and Maclaurin's series, Curvature." },
            { num: "Unit III", topics: "Partial Differentiation: Euler's theorem, Jacobians, Taylor's series for two variables, Maxima and Minima." },
            { num: "Unit IV", topics: "Integral Calculus: Double and triple integrals, Change of order, Area and volume calculation." }
          ]
        },
        {
          code: "ES-109",
          icon: "⚙️",
          title: "Manufacturing Processes",
          shortDesc: "Casting, Welding, Machining, and Metal Forming",
          units: [
            { num: "Unit I", topics: "Casting Processes: Pattern making, sand casting, melting furnaces, casting defects and inspection." },
            { num: "Unit II", topics: "Forming & Shaping: Hot and cold working of metals, forging, rolling, extrusion, wire drawing." },
            { num: "Unit III", topics: "Joining Processes: Gas welding, arc welding, resistance welding, brazing and soldering." },
            { num: "Unit IV", topics: "Machining & Sheet Metal: Lathe operations, drilling, shaping, milling, sheet metal operations and press tools." }
          ]
        },
        {
          code: "HS-101",
          icon: "🌱",
          title: "Environmental Science",
          shortDesc: "Ecology, Ecosystems, Biodiversity & Pollution Control",
          units: [
            { num: "Unit I", topics: "Fundamentals: The Multidisciplinary nature of environmental studies: Definition, components, scope and importance, need for public awareness; Natural Resources. Ecosystems: Concept, Structure and function of an ecosystem, Types, Functional Components, Different ecosystems, biogeochemical cycles. Biodiversity: Introduction to biodiversity, biogeographical classification, India as a mega diversity nation, endangered and endemic species of India, threats to biodiversity and conservation of biodiversity. Bioprospecting and Biopiracy" },
            { num: "Unit II", topics: "Environmental Pollution: (a) Air Pollution: Source, Types, effects on biosphere and Meterology, Air Quality, Control. (b) Water Pollution: Types and Sources. (c) Soil Pollution: Types and Control. (d) Noise Pollution: Effect, Control (e) Thermal Pollution. (f) Radiation Pollution (g) Solid waste Management, (h) Pollution Prevention, (i) Disaster Management" },
            { num: "Unit III", topics: "Social Issues and Environment: Concept of Sustainable Development; Urban problem related to energy; Water Conservation; Wasteland reclamation; Resettlement and Rehabilitation; Climate Change; Nuclear Accidents; Consumerism and Waste Products; Laws related to Environment, Pollution, Forest and Wild life; Environmental Impact Assessment." },
            { num: "Unit IV", topics: "Human Population and Environment: Population Growth, Human Rights, Family Welfare Programmes, Environment and Human Health, HIV/AIDS, Women and Child Welfare, Role of IT." }
          ]
        },
        {
          code: "ES-105",
          icon: "🔌",
          title: "Electrical Science",
          shortDesc: "DC/AC Circuits, Network Theorems, Transformers & Motors",
          units: [
            { num: "Unit I", topics: "DC Circuits: Passive circuit components, Basic laws of Electrical Engineering, Temperature Resistance Coefficients, voltage and current sources, Series and parallel circuits, power and energy, Kirchhoff's Laws, Nodal & Mesh Analysis, delta-star transformation, superposition theorem, Thevenin's theorem, Norton's theorem, maximum power transfer theorem, Time domain analysis of first Order RC & LC circuits." },
            { num: "Unit II", topics: "AC Circuits: Representation of sinusoidal waveforms, peak and rms values, phasor representation, real power, reactive power, apparent power, power factor, Analysis of single-phase ac circuits consisting of R, L, C, RL, RC, RLC combinations (series and parallel), resonance, Three phase balanced circuits, voltage and current relations in star and delta connections." },
            { num: "Unit III", topics: "D. C. Generators & Motors: Principle of operation of Generators & Motors, Speed Control of shunt motors, Flux control, Rheostatic control, voltage control, Speed control of series motors, A. C. Generators & Motors: Principle of operation, Revolving Magnetic field, Squirrel cage and phase wound rotor, Starting of Induction motors, Direct on line and Star Delta starters, Synchronous machines." },
            { num: "Unit IV", topics: "Transformers: Construction and principle of operation, equivalent circuit, losses in transformers, regulation and efficiency, Auto-transformer and three-phase transformer connections. Measuring Instruments: Electromagnetism, Different Torques in Indicating instruments, Moving Iron Instruments: Construction & Principle, Attraction and Repulsion type, Moving Coil instruments: Permanent Magnet type, Dynamometer type Instruments." }
          ]
        },
        {
          code: "BS-113",
          icon: "🔬",
          title: "Applied Chemistry-1",
          shortDesc: "Physical, Organic & Inorganic Engineering Chemistry",
          units: [
            { num: "Unit I", topics: "Water Technology: Hardness of water, estimation by EDTA, boiler troubles, water softening processes." },
            { num: "Unit II", topics: "Fuels & Combustion: Classification, Calorific value determination, coal analysis, petroleum cracking." },
            { num: "Unit III", topics: "Polymers & Composite Materials: Monomers, polymerization types, thermoplastics, thermosetting resins, biopolymers." },
            { num: "Unit IV", topics: "Corrosion & its Control: Chemical and electrochemical corrosion, protective coatings, cathodic protection." }
          ]
        },
        {
          code: "HS-102",
          icon: "💬",
          title: "Communication Skills",
          shortDesc: "Verbal & Written Communication, Technical Writing, Soft Skills",
          units: [
            { num: "Unit I", topics: "Role and Importance of Communications, Attributes of Communications, Verbal and Non-Verbal Communications, Verbal Communications Skills, Non-verbal Communication Methods, Body Language, Barriers to Communications, Socio-psychological barriers, Inter-Cultural barriers, Overcoming barriers, Communication Mediums: Characterization and Choice of medium, Effective Communication: Correctness, Clarity, Conciseness, Courtesy, Group Communication: Meetings (types, purpose), Group Discussions, Conduct of Meeting, Participant Role, Making Presentations." },
            { num: "Unit II", topics: "Spoken and Written English: Attributes of spoken and written communication, Formal & Informal Communication, Variation in between Indian, British and American English. Etiquette and Manners: Personal Behaviour, Greetings, Introductions, Telephone Etiquette. Vocabulary Development: Dictionaries and Thesaurus, Words often confused, generally used one word substitutions, Comprehension." },
            { num: "Unit III", topics: "Letter writing: Planning the message, Planning Content, Structure, Language use, Layout, enquires and replies, asking for or giving quotations, Bargaining letters, Seller's reply, etc.; Complaints and Replies; Memos, Circulars and notices; Paragraph Writing, Writing Scientific and Technical Reports: Types, Structure, Drafting and Delivering a Speech: Understanding the Environment, Understanding the Audience, Text preparing, Composition, Practicing, Commemorative Speeches, Welcome and Introduction, Farewell and Send-offs, Condolence" },
            { num: "Unit IV", topics: "Articles: Indefinite, Definite; Tenses: Present, Past, Future, Perfect (Present, Past and Future), Tenses in conditional sentences; Active and Passive Voice: Formation, conversion; Direct and Indirect Speech, Degrees of Comparison, Common errors, Concepts of Learning and Listening" }
          ]
        },
        {
          code: "CS-101",
          icon: "</>",
          title: "Programming in C",
          shortDesc: "Algorithms, Syntax, Control structures, and Files",
          units: [
            { num: "Unit I", topics: "Introduction to Programming: Computer system, components of a computer system, computing environments, computer languages, creating and running programs, Preprocessor, Compilation process, role of linker, idea of invocation and execution of a programme. Algorithms: Representation using flowcharts, pseudocode. Introduction to C language: History of C, basic structure of C programs, process of compiling and running a C program, C tokens, keywords, identifiers, constants, strings, special symbols, variables, data types, I/O statements. Interconversion of variables. Operators and expressions: Operators, arithmetic, relational and logical, assignment operators, increment and decrement operators, bitwise and conditional operators, special operators, operator precedence and associativity, evaluation of expressions, type conversions in expressions." },
            { num: "Unit II", topics: "Control structures: Decision statements; if and switch statement; Loop control statements: while, for and do while loops, jump statements, break, continue, goto statements. Arrays: Concepts, One dimensional array, declaration and initialization of one dimensional arrays, two dimensional arrays, initialization and accessing, multi dimensional arrays. Functions: User defined and built-in Functions, storage classes, Parameter passing in functions, call by value, Passing arrays to functions: idea of call by reference, Recursion. Strings: Arrays of characters, variable length character strings, inputting character strings, character library functions, string handling functions." },
            { num: "Unit III", topics: "Pointers: Pointer basics, pointer arithmetic, pointers to pointers, generic pointers, array of pointers, functions returning pointers, Dynamic memory allocation. Pointers to functions. Pointers and Strings Structures and unions: Structure definition, initialization, accessing structures, nested structures, arrays of structures, structures and functions, self referential structures, unions, typedef, enumerations. File handling: command line arguments, File modes, basic file operations read, write and append. Scope and life of variables, multi-file programming." },
            { num: "Unit IV", topics: "C99 extensions. 'C' Standard Libraries: stdio.h, stdlib.h, assert.h, math.h, time.h, ctype.h, setjmp.h, string.h, stdarg.h, unistd.h. Basic Algorithms: Finding Factorial, Fibonacci series, Linear and Binary Searching, Basic Sorting Algorithms- Bubble sort, Insertion sort and Selection sort. Find the square root of a number, array order reversal, reversal of a string." }
          ]
        }
      ]
    },
    2: {
      desc: "Strengthen core engineering constructs and object-oriented paradigms.",
      subjects: [
        {
          code: "CS-101",
          icon: "</>",
          title: "Programming in C",
          shortDesc: "Algorithms, Syntax, Control structures, and Files",
          units: [
            { num: "Unit I", topics: "Introduction to Programming: Computer system, components of a computer system, computing environments, computer languages, creating and running programs, Preprocessor, Compilation process, role of linker, idea of invocation and execution of a programme. Algorithms: Representation using flowcharts, pseudocode. Introduction to C language: History of C, basic structure of C programs, process of compiling and running a C program, C tokens, keywords, identifiers, constants, strings, special symbols, variables, data types, I/O statements. Interconversion of variables. Operators and expressions: Operators, arithmetic, relational and logical, assignment operators, increment and decrement operators, bitwise and conditional operators, special operators, operator precedence and associativity, evaluation of expressions, type conversions in expressions." },
            { num: "Unit II", topics: "Control structures: Decision statements; if and switch statement; Loop control statements: while, for and do while loops, jump statements, break, continue, goto statements. Arrays: Concepts, One dimensional array, declaration and initialization of one dimensional arrays, two dimensional arrays, initialization and accessing, multi dimensional arrays. Functions: User defined and built-in Functions, storage classes, Parameter passing in functions, call by value, Passing arrays to functions: idea of call by reference, Recursion. Strings: Arrays of characters, variable length character strings, inputting character strings, character library functions, string handling functions." },
            { num: "Unit III", topics: "Pointers: Pointer basics, pointer arithmetic, pointers to pointers, generic pointers, array of pointers, functions returning pointers, Dynamic memory allocation. Pointers to functions. Pointers and Strings Structures and unions: Structure definition, initialization, accessing structures, nested structures, arrays of structures, structures and functions, self referential structures, unions, typedef, enumerations. File handling: command line arguments, File modes, basic file operations read, write and append. Scope and life of variables, multi-file programming." },
            { num: "Unit IV", topics: "C99 extensions. 'C' Standard Libraries: stdio.h, stdlib.h, assert.h, math.h, time.h, ctype.h, setjmp.h, string.h, stdarg.h, unistd.h. Basic Algorithms: Finding Factorial, Fibonacci series, Linear and Binary Searching, Basic Sorting Algorithms- Bubble sort, Insertion sort and Selection sort. Find the square root of a number, array order reversal, reversal of a string." }
          ]
        },
        {
          code: "BS-121",
          icon: "∫",
          title: "Applied Mathematics 2",
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
          title: "Applied Physics 2",
          shortDesc: "Electromagnetism, Solid State Physics, and Quantum Mechanics",
          units: [
            { num: "Unit I", topics: "Electromagnetic Theory: Gauss's law, Ampere's law, Faraday's law, Maxwell's equations." },
            { num: "Unit II", topics: "Quantum Mechanics: de Broglie waves, Heisenberg uncertainty principle, Schrodinger wave equation." },
            { num: "Unit III", topics: "Statistical Mechanics: Maxwell-Boltzmann, Bose-Einstein, and Fermi-Dirac statistics." },
            { num: "Unit IV", topics: "Solid State Physics: Crystal structure, Bravais lattices, band theory of solids, superconductors." }
          ]
        },
        {
          code: "ES-108",
          icon: "🧱",
          title: "Engineering Mechanics",
          shortDesc: "Statics, Force Systems, Friction, and Structural Mechanics",
          units: [
            { num: "Unit I", topics: "Force System: Introduction, force, principle of transmissibility of force, resultant of a force system, resolution of a force, moment of force about a line, Varigon's theorem, couple, resolution of force into force and a couple, properties of couple and their application to engineering problems. Equilibrium: Force body diagram, equations of equilibrium and their applications to engineering problems, equilibrium of two force and three force members. Distributed Forces: Determination of center of gravity, center of mass and centroid by direct integration and by the method of composite bodies, mass moment of inertia and area moment of inertia by direct integration and composite bodies method, radius of gyration, parallel axis theorem, polar moment of inertial." },
            { num: "Unit II", topics: "Structure: Plane truss, perfect and imperfect truss, assumption in the truss analysis, analysis of perfect plane trusses by the method of joints, method of section and graphical method. Friction: Static and Kinetic friction, laws of dry friction, co-efficient of friction, angle of friction, angle of repose, cone of friction, frictional lock, friction in flat pivot and collar bearing, friction in flat belts." },
            { num: "Unit III", topics: "Kinematics of Particles: Rectilinear motion, plane curvilinear motion, rectangular coordinates, normal and tangential coordinates. Kinetics of Particles: Equation of motion, rectilinear motion and curvilinear motion, work-energy equation, conservation of energy, concept of impulse and momentum, conservation of momentum, impact of bodies, co-efficient of restitution, loss of energy during impact." },
            { num: "Unit IV", topics: "Kinematics of Rigid Bodies: Concept of rigid body, types of rigid body motion, absolute motion, introduction to relative velocity, relative acceleration (Corioli's component excluded) and instantaneous center of zero velocity, Velocity and acceleration. Kinetics of Rigid Bodies: Equation of motion, translatory motion and fixed axis rotation, application of work energy principles to rigid bodies conservation of energy. Beam: Introduction, types of loading, methods for the reactions of a beam, space diagram, types of end supports, beams subjected to couple." }
          ]
        },
        {
          code: "ES-105",
          icon: "🔌",
          title: "Electrical Science",
          shortDesc: "DC/AC Circuits, Network Theorems, Transformers & Motors",
          units: [
            { num: "Unit I", topics: "DC Circuits: Passive circuit components, Basic laws of Electrical Engineering, Temperature Resistance Coefficients, voltage and current sources, Series and parallel circuits, power and energy, Kirchhoff's Laws, Nodal & Mesh Analysis, delta-star transformation, superposition theorem, Thevenin's theorem, Norton's theorem, maximum power transfer theorem, Time domain analysis of first Order RC & LC circuits." },
            { num: "Unit II", topics: "AC Circuits: Representation of sinusoidal waveforms, peak and rms values, phasor representation, real power, reactive power, apparent power, power factor, Analysis of single-phase ac circuits consisting of R, L, C, RL, RC, RLC combinations (series and parallel), resonance, Three phase balanced circuits, voltage and current relations in star and delta connections." },
            { num: "Unit III", topics: "D. C. Generators & Motors: Principle of operation of Generators & Motors, Speed Control of shunt motors, Flux control, Rheostatic control, voltage control, Speed control of series motors, A. C. Generators & Motors: Principle of operation, Revolving Magnetic field, Squirrel cage and phase wound rotor, Starting of Induction motors, Direct on line and Star Delta starters, Synchronous machines." },
            { num: "Unit IV", topics: "Transformers: Construction and principle of operation, equivalent circuit, losses in transformers, regulation and efficiency, Auto-transformer and three-phase transformer connections. Measuring Instruments: Electromagnetism, Different Torques in Indicating instruments, Moving Iron Instruments: Construction & Principle, Attraction and Repulsion type, Moving Coil instruments: Permanent Magnet type, Dynamometer type Instruments." }
          ]
        },
        {
          code: "HS-102",
          icon: "💬",
          title: "Communication Skills",
          shortDesc: "Grammar, Technical Writing, and Group Discussions",
          units: [
            { num: "Unit I", topics: "Role and Importance of Communications, Attributes of Communications, Verbal and Non-Verbal Communications, Verbal Communications Skills, Non-verbal Communication Methods, Body Language, Barriers to Communications, Socio-psychological barriers, Inter-Cultural barriers, Overcoming barriers, Communication Mediums: Characterization and Choice of medium, Effective Communication: Correctness, Clarity, Conciseness, Courtesy, Group Communication: Meetings (types, purpose), Group Discussions, Conduct of Meeting, Participant Role, Making Presentations." },
            { num: "Unit II", topics: "Spoken and Written English: Attributes of spoken and written communication, Formal & Informal Communication, Variation in between Indian, British and American English. Etiquette and Manners: Personal Behaviour, Greetings, Introductions, Telephone Etiquette. Vocabulary Development: Dictionaries and Thesaurus, Words often confused, generally used one word substitutions, Comprehension." },
            { num: "Unit III", topics: "Letter writing: Planning the message, Planning Content, Structure, Language use, Layout, enquires and replies, asking for or giving quotations, Bargaining letters, Seller's reply, etc.; Complaints and Replies; Memos, Circulars and notices; Paragraph Writing, Writing Scientific and Technical Reports: Types, Structure, Drafting and Delivering a Speech: Understanding the Environment, Understanding the Audience, Text preparing, Composition, Practicing, Commemorative Speeches, Welcome and Introduction, Farewell and Send-offs, Condolence" },
            { num: "Unit IV", topics: "Articles: Indefinite, Definite; Tenses: Present, Past, Future, Perfect (Present, Past and Future), Tenses in conditional sentences; Active and Passive Voice: Formation, conversion; Direct and Indirect Speech, Degrees of Comparison, Common errors, Concepts of Learning and Listening" }
          ]
        },
        {
          code: "HS-101",
          icon: "🌱",
          title: "Environmental Science",
          shortDesc: "Ecology, Ecosystems, Biodiversity & Pollution Control",
          units: [
            { num: "Unit I", topics: "Fundamentals: The Multidisciplinary nature of environmental studies: Definition, components, scope and importance, need for public awareness; Natural Resources. Ecosystems: Concept, Structure and function of an ecosystem, Types, Functional Components, Different ecosystems, biogeochemical cycles. Biodiversity: Introduction to biodiversity, biogeographical classification, India as a mega diversity nation, endangered and endemic species of India, threats to biodiversity and conservation of biodiversity. Bioprospecting and Biopiracy" },
            { num: "Unit II", topics: "Environmental Pollution: (a) Air Pollution: Source, Types, effects on biosphere and Meterology, Air Quality, Control. (b) Water Pollution: Types and Sources. (c) Soil Pollution: Types and Control. (d) Noise Pollution: Effect, Control (e) Thermal Pollution. (f) Radiation Pollution (g) Solid waste Management, (h) Pollution Prevention, (i) Disaster Management" },
            { num: "Unit III", topics: "Social Issues and Environment: Concept of Sustainable Development; Urban problem related to energy; Water Conservation; Wasteland reclamation; Resettlement and Rehabilitation; Climate Change; Nuclear Accidents; Consumerism and Waste Products; Laws related to Environment, Pollution, Forest and Wild life; Environmental Impact Assessment." },
            { num: "Unit IV", topics: "Human Population and Environment: Population Growth, Human Rights, Family Welfare Programmes, Environment and Human Health, HIV/AIDS, Women and Child Welfare, Role of IT." }
          ]
        },
        {
          code: "BS-113",
          icon: "🔬",
          title: "Applied Chemistry-1",
          shortDesc: "Physical, Organic & Inorganic Engineering Chemistry",
          units: [
            { num: "Unit I", topics: "Water Technology: Hardness of water, estimation by EDTA, boiler troubles, water softening processes." },
            { num: "Unit II", topics: "Fuels & Combustion: Classification, Calorific value determination, coal analysis, petroleum cracking." },
            { num: "Unit III", topics: "Polymers & Composite Materials: Monomers, polymerization types, thermoplastics, thermosetting resins, biopolymers." },
            { num: "Unit IV", topics: "Corrosion & its Control: Chemical and electrochemical corrosion, protective coatings, cathodic protection." }
          ]
        },
        {
          code: "ES-110",
          icon: "🛠",
          title: "Workshop",
          shortDesc: "Fitting, Carpentry, Foundry, Welding, and Machine Shop Practice",
          units: [
            { num: "Unit I", topics: "Fitting Shop: Fitting tools, layout marking, measuring tools, sawing, filing, tapping and dieing operations." },
            { num: "Unit II", topics: "Carpentry Shop: Timber classification, seasoning, carpentry tools, joints (halving, mortise & tenon, dovetail)." },
            { num: "Unit III", topics: "Foundry & Welding Shop: Molding sands, cores, pattern types, arc & gas welding joint preparations." },
            { num: "Unit IV", topics: "Sheet Metal & Machine Shop: Sheet metal tools, joints, seams, lathe machine operations, safety practices." }
          ]
        }
      ]
    },
    3: {
      desc: "Explore core algorithms, discrete structures, digital design, object oriented paradigms, and computational methods.",
      subjects: [
        {
          code: "BS-203",
          icon: "∫",
          title: "Computational Methods (CSE)",
          shortDesc: "Root Finding, Interpolation, Numerical Integration, and Differential Equations",
          units: [
            { num: "Unit I", topics: "Review of Taylor Series, Rolle's Theorem and Mean Value Theorem, Approximations and Errors in numerical computations, Data representation and computer arithmetic, Loss of significance in computation, Location of roots of equation: Bisection method (convergence analysis and implementation), Newton Method (convergence analysis and implementation), Secant Method (convergence analysis and implementation), Unconstrained one variable function minimization by Fibonacci search, Golden Section Search and Newton's method, Multivariate function minimization by the method of steepest descent, Nelder-Mead Algorithm." },
            { num: "Unit II", topics: "Interpolation: Assumptions for interpolation, errors in polynomial interpolation, Finite differences, Gregory-Newton's Forward Interpolation, Gregory-Newton's backward Interpolation, Lagrange's Interpolation, Newton's divided difference interpolation, Numerical Integration: Definite Integral, Newton-Cote's Quadrature formula, Trapezoidal Rule, Simpson's one-third rule, Simpson's three-eight rule, Errors in quadrature formulae, Romberg's Algorithm, Gaussian Quadrature formula." },
            { num: "Unit III", topics: "System of Linear Algebraic Equations: Existence of solution, Gauss elimination method and its computational effort, concept of Pivoting, Gauss Jordan method and its computational effort, Triangular Matrix factorization methods: Dolittle algorithm, Crout's Algorithm, Cholesky method, Eigen value problem: Power method, Approximation by Spline Function: First-Degree and second degree Splines, Natural Cubic Splines, B Splines, Interpolation and Approximation" },
            { num: "Unit IV", topics: "Numerical solution of ordinary Differential Equations: Picard's method, Taylor series method, Euler's and Runge-Kutta's methods, Predictor-corrector methods: Euler's Predictor-Corrector method, Adams-Bashforth method, Milne's method, Numerical Solution of Partial Differential equations: Parabolic, Hyperbolic, and elliptic equations, Implementation to be done in C/C++" }
          ]
        },
        {
          code: "CS-201",
          icon: "∑",
          title: "Discrete Mathematics",
          shortDesc: "Sets, Logic, Relations, Functions, Group Theory, and Graph Theory",
          units: [
            { num: "Unit I", topics: "Sets, Logic, and Relation: Sets, Subsets, powerset, operations on sets, Propositional Logic, Rules of inferences in propositional logic, Quantifiers, Predicates and validity, Predicate Logic, normal forms, Proof Techniques- Direct Proof, Proof by Contraposition, and proof by contradiction, Principle of inclusion and exclusion, pigeonhole principle, permutation and combination, Principle of Well Ordering, principle of mathematical induction, principle of complete induction, Relation, properties of binary relation, equivalence relation and class, closures (symmetric, reflexive, and transitive)." },
            { num: "Unit II", topics: "Functions, Order relations and Boolean Algebra: Functions, Growth of functions, Permutation functions, Partially ordered sets, lattices, Boolean algebra, Minimization of Boolean Expressions, GCD, LCM, prime numbers, Recurrence relations, solution methods for linear, first-order recurrence relations with constant coefficients, generating functions, Analysis of Algorithms involving recurrence relations, solution method for a divide-and-conquer recurrence relation, Masters theorem (with proof)." },
            { num: "Unit III", topics: "Group theory: Semi-group, Monoid, Groups, Group identity and uniqueness, inverse and its uniqueness, isomorphism and homomorphism, subgroups, Cosets and Lagrange’s theorem, Permutation group and Cayley’s theorem (without proof), Normal subgroup and quotient groups, Groups and Coding." },
            { num: "Unit IV", topics: "Graph theory: Graph Terminology, Planar graphs, Euler's formula (proof), Euler and Hamiltonian path/circuit, Chromatic number of a graph, five color theorem (proof), Shortest path and minimal spanning trees and algorithms, Depth-first and breadth first search, trees associated with DFS & BFS, Connected components, Complexity Analysis of graph MST." }
          ]
        },
        {
          code: "CS-203",
          icon: "🏗",
          title: "Data Structures",
          shortDesc: "Arrays, Stacks, Queues, Sparse Matrices, Trees, Graphs, Sorting and Hashing",
          units: [
            { num: "Unit I", topics: "Overview of data structure, Basics of Algorithm Analysis including Running Time Calculations, Abstract Data Types, Arrays, Arrays and Pointers, Multidimensional Array, String processing, General Lists and List ADT, List manipulations, Single, double and circular lists, Stacks and Stack ADT, Stack Manipulation, Prefix, infix and postfix expressions, recursion, Queues and Queue ADT, Queue manipulation." },
            { num: "Unit II", topics: "Sparse Matrix Representation (Array and Link List representation) and arithmetic (addition, subtraction and multiplication), polynomials and polynomial arithmetic, Trees, Properties of Trees, Binary trees, Binary Tree traversal, Tree manipulation algorithms, Expression trees and their usage, binary search trees, AVL Trees, Heaps and their implementation, Priority Queues, B-Trees, B* Tree, B+ Tree" },
            { num: "Unit III", topics: "Sorting concept, order, stability, Selection sorts (straight, heap), insertion sort (Straight Insertion, Shell sort), Exchange Sort (Bubble, quicksort), Merge sort (External Sorting) (Natural merge, balanced merge and polyphase merge), Searching – List search, sequential search, binary search, hashing methods, collision resolution in hashing" },
            { num: "Unit IV", topics: "Disjoint sets representation, union find algorithm, Graphs, Graph representation, Graph Traversals and their implementations (BFS and DFS), Minimum Spanning Tree algorithms, Shortest Path Algorithms" }
          ]
        },
        {
          code: "CS-205",
          icon: "🖥",
          title: "Digital Logic and Computer Design",
          shortDesc: "Boolean Algebra, Combinational and Sequential Circuits, Computer Organization and Arithmetic",
          units: [
            { num: "Unit I", topics: "Boolean Algebra and Combinational Logic: Review of number systems, signed, unsigned, fixed point, floating point numbers, Binary Codes, Boolean algebra – basic postulates, theorems, Simplification of Boolean function using Karnaugh map and Quine-McCluskey method – Implementations of combinational logic functions using gates, Adders, Subtractors, Magnitude comparator, encoder and decoders, multiplexers, code converters, parity generator/checker, implementation of combinational circuits using multiplexers." },
            { num: "Unit II", topics: "Sequential Circuits: General model of sequential circuits, Flip-flops, latches, level triggering, edge triggering, master slave configuration, concept of state diagram, state table, state reduction procedures, Design of synchronous sequential circuits, up/down and modulus counters, shift registers, Ring counter, Johnson counter, timing diagram, serial adder, sequence detector, Programmable Logic Array (PLA), Programmable Array Logic (PAL), Memory Unit, Random Access Memory." },
            { num: "Unit III", topics: "Basic Computer organization: Stored Program Organization, Computer registers, bus system, instruction set completeness, instruction cycle, Register Transfer Language, Arithmetic, Logic and Shift Micro-operations, Instruction Codes, Design of a simple computer, Design of Arithmetic Logic unit, shifter, Design of a simple hardwired control unit, Programming the basic computer, Machine language instructions, assembly language, Microprogrammed control, Horizontal and Vertical Microprogramming, Central Processing Unit, instruction sets and formats, addressing modes, data paths, RISC and CISC characteristics." },
            { num: "Unit IV", topics: "Computer Arithmetic, addition, subtraction, multiplication and division algorithms, Input-Output Organization, Modes of data transfer, Interrupt cycle, direct memory access, Input-Output processor, Memory Organization, Memory Hierarchy, Associative Memory, Cache Memory, Internal and external Memory, Virtual Memory." }
          ]
        },
        {
          code: "CS-207",
          icon: "⚙",
          title: "Object Oriented Programming",
          shortDesc: "OOP Concepts, Classes, Inheritance, Polymorphism, Streams, Exception Handling, and STL",
          units: [
            { num: "Unit I", topics: "Object Oriented Programming Paradigm, Basic Concepts of Object Oriented Programming, Benefits of Object Oriented Programming, Object Oriented Languages, Applications of Object Oriented Programming, C++ Programming Language, Tokens, Keywords, Identifiers and Constants, Data Types, Type Compatibility, Variables, Operators in C++, Implicit Type Conversions, Operator Precedence, The Main Function, Function Prototyping, Call by Reference, Return by Reference, Inline Functions, Function Overloading, Friend Functions, default parameter value." },
            { num: "Unit II", topics: "Specifying a class, Member Functions, Encapsulation, information hiding, abstract data types, objects & classes, Static Member Functions, Arrays of Objects, Constructors & Destructors, Parameterized Constructors, Copy Constructors, Dynamic Constructors, Destructors, identity and behaviour of an object, C++ garbage collection, dynamic memory allocation, Explicit Type Conversions, Operator Overloading." },
            { num: "Unit III", topics: "Inheritance, inheritance methods, Class hierarchy, derivation – public, private & protected, aggregation, Inheritance Constructors, composition vs. classification hierarchies, Containership, Initialization List, Polymorphism, categorization of polymorphic techniques, polymorphism by parameter, parametric polymorphism, generic function – template function, function overriding, run time polymorphism, virtual functions." },
            { num: "Unit IV", topics: "Standard C++ classes, using multiple inheritance, persistent objects, streams and files, namespaces, exception handling, generic classes, standard template library, organization and containers, standard containers, algorithm and Function objects, iterators and allocators, strings, streams, manipulators, user defined manipulators, vectors." }
          ]
        }
      ]
    },
    4: {
      desc: "Understand circuits, java programming, computational models, database systems, and technical correspondence.",
      subjects: [
        {
          code: "BS-204",
          icon: "📊",
          title: "Probability, Statistics and Linear Programming",
          shortDesc: "Probability Distributions, Hypothesis Testing, Simplex Methods, and Duality",
          units: [
            { num: "Unit I", topics: "Probability: Random variables, Probability distributions (Binomial, Poisson, Normal), Joint and marginal distributions." },
            { num: "Unit II", topics: "Statistics: Sampling theory, Estimation, Hypothesis testing (t-test, F-test, Chi-square test), Regression & Correlation." },
            { num: "Unit III", topics: "Linear Programming: Mathematical formulation of LPP, Graphical method, Simplex method, Artificial variable techniques (Big-M, Two-Phase)." },
            { num: "Unit IV", topics: "Duality in LPP, Dual simplex method, Transportation and Assignment problems." }
          ]
        },
        {
          code: "CS-204",
          icon: "📁",
          title: "Database Management Systems",
          shortDesc: "ER Diagrams, Relational Algebra, SQL, Normalization, and Concurrency Control",
          units: [
            { num: "Unit I", topics: "DBMS Overview: Database architecture, data models, ER diagrams, Relational model." },
            { num: "Unit II", topics: "Relational Query Languages: Relational algebra, SQL (DDL, DML, DQL), Joins, Subqueries." },
            { num: "Unit III", topics: "Relational Database Design: Functional dependencies, Normalization (1NF, 2NF, 3NF, BCNF)." },
            { num: "Unit IV", topics: "Transaction & Concurrency: ACID properties, Serializability, Concurrency control protocols (Locking, Timestamping)." }
          ]
        },
        {
          code: "CS-206",
          icon: "💻",
          title: "Theory of Computation",
          shortDesc: "Finite Automata, Regular Expressions, CFGs, PDAs, and Turing Machines",
          units: [
            { num: "Unit I", topics: "Finite Automata: DFA, NFA, Regular Expressions, Pumping Lemma for regular languages." },
            { num: "Unit II", topics: "Context-Free Grammars: CFGs, Chomsky Normal Form, Greibach Normal Form, Pumping Lemma for CFLs." },
            { num: "Unit III", topics: "Pushdown Automata: PDA design, equivalence with CFGs, Deterministic PDAs." },
            { num: "Unit IV", topics: "Turing Machines: TM design, Halting problem, Undecidability, P and NP complexity classes." }
          ]
        },
        {
          code: "CS-208",
          icon: "🔌",
          title: "Circuits and Systems",
          shortDesc: "Continuous & Discrete Time Signals, Fourier & Z-Transforms, Network Theorems, and Filters",
          units: [
            { num: "Unit I", topics: "Introduction to Signals & Systems, Continuous-time and Discrete-time signals, Laplace Transform." },
            { num: "Unit II", topics: "Fourier Series and Fourier Transform, Z-Transform, analysis of LTI systems." },
            { num: "Unit III", topics: "Network Theorems: Superposition, Thevenin's, Norton's, Maximum Power Transfer, Two-Port Network parameters (Z, Y, ABCD, h)." },
            { num: "Unit IV", topics: "State Variable Analysis of Circuits, Filters (Butterworth, Chebyshev), Passive and Active network synthesis." }
          ]
        },
        {
          code: "CS-210",
          icon: "☕",
          title: "Programming in Java",
          shortDesc: "OOP Constructs, Multi-threading, Collections Framework, GUI and JDBC",
          units: [
            { num: "Unit I", topics: "Introduction to Java, JDK, JVM, Basic syntax, OOP concepts: Classes, Objects, Inheritance, Polymorphism." },
            { num: "Unit II", topics: "Interfaces, Packages, Exception Handling, I/O Streams (File Handling)." },
            { num: "Unit III", topics: "Multithreading: Thread creation, lifecycle, synchronization. Collections Framework: List, Set, Map." },
            { num: "Unit IV", topics: "AWT & Swing for GUI, Event Handling, JDBC database connectivity." }
          ]
        },
        {
          code: "HS-202",
          icon: "✍",
          title: "Technical Writing",
          shortDesc: "Technical Correspondence, Audience Analysis, Proposals, Reports, and Citations",
          units: [
            { num: "Unit I", topics: "Introduction to Technical Communication: Objectives, characteristics, audience analysis." },
            { num: "Unit II", topics: "Technical Writing Genres: Reports, manuals, proposals, specs, instructions." },
            { num: "Unit III", topics: "Professional Correspondence: Resumes, cover letters, business emails, letters." },
            { num: "Unit IV", topics: "Research Papers & Presentations: Formatting, citations (IEEE, APA), oral presentation skills." }
          ]
        }
      ]
    },
    5: {
      desc: "Master algorithm design, networking protocols, compiler foundations, and systems engineering.",
      subjects: [
        {
          code: "CS-301",
          icon: "⚙",
          title: "Compiler Design",
          shortDesc: "Lexical Analysis, Parsers, Syntax-Directed Translation, and Code Generation",
          units: [
            { num: "Unit I", topics: "Compilers and translators, need of translators, structure of compiler: its different phases, compiler construction tools, Lexical analysis: Role of lexical analyzer, Input Buffering, A simple approach to the design of Lexical Analyzers, Specification and recognition of tokens, Finite automata, From regular expressions to automata, and vice versa, minimizing number of states of DFA, A language for specifying Lexical Analyzers, Design and implementation of lexical analyzer." },
            { num: "Unit II", topics: "The role of the parser, Context free grammars, Writing a grammar: Lexical versus Syntactic analysis, Eliminating ambiguity, Elimination of left recursion, Left factoring, Top Down Parsing: Recursive- Decent parsing, Non-recursive Predictive parsing, LL(1) grammars, Bottom Up Parsing: Shift Reduce Parsing, Operator precedence parsing, LR Parsing: SLR, LALR and Canonical LR parser, Parser Generators." },
            { num: "Unit III", topics: "Syntax Directed Translation: Syntax directed definitions, Evaluation orders for SDD's, construction of syntax trees, syntax directed translation schemes, implementation of syntax directed translation, Intermediate Code Generation: Kinds of intermediate code: Postfix notation, Parse trees and syntax trees, Three-address code, quadruples and triples, Semantic Analysis: Types and Declarations, Translation of Expressions, Type checking." },
            { num: "Unit IV", topics: "Symbol Table: Symbol tables, its contents, Data Structure for Symbol Table: lists, trees, linked lists, hash tables, Error Detection and Recovery: Errors, lexical phase errors, syntactic phase errors, semantic errors, Error seen by each phase. Code Optimization: The principal sources of optimizations, Loop optimization, Basic blocks and Flow Graphs, DAG representation of basic blocks, Code Generation: Issues in the design of code generation, A simple target machine mode, A Simple Code Generator, Peep-hole optimization, Register allocation and assignment." }
          ]
        },
        {
          code: "CS-303",
          icon: "🌐",
          title: "Computer Networks",
          shortDesc: "OSI Stack, Ethernet, Routing Protocols, TCP/UDP, and App Protocols",
          units: [
            { num: "Unit I", topics: "Data Communications: Components, Networks, The Internet, Protocols and Standards, Network Models: The OSI Model, TCP/IP Protocol Suite , A Comparison of the OSI and TCP/IP Reference Models, Addressing, Physical Layer: Analog and Digital Signals, Transmission modes, Transmission Media: Guided Media, Unguided Media, Review of Error Detection and Correction codes. Switching: Circuit switching (space-division, time division and space-time division), packet switching (virtual circuit and Datagram approach), message switching." },
            { num: "Unit II", topics: "Data Link Layer: Design issues, Data Link Control and Protocols: Flow and Error Control, Stop-and-wait ARQ. Sliding window protocol, Go-Back-N ARQ, Selective Repeat ARQ, HDLC, Point-to -Point Access: PPP Point -to-Point Protocol, PPP Stack, Medium Access Sub layer: Channel allocation problem, Controlled Access, Channelization, multiple access protocols, IEEE standard 802.3 & 802.11 for LANS and WLAN, high-speed LANs, Token ring, Token Bus, FDDI based LAN, Network Devices-repeaters, hubs, switches bridges." },
            { num: "Unit III", topics: "Network Layer: Design issues, Routing algorithms, Congestion control algorithms, Host to Host Delivery: Internetworking, addressing and routing, IP addressing (class full & Classless), Subnet, Network Layer Protocols: ARP, IPV4, ICMP, IPV6 ad ICMPV6." },
            { num: "Unit IV", topics: "Transport Layer: Process to Process Delivery: UDP; TCP, congestion control and Quality of service. Application Layer: Client Server Model, Socket Interface, Domain Name System (DNS): Electronic Mail (SMTP), file transfer (FTP), HTTP and WWW." }
          ]
        },
        {
          code: "HS-305",
          icon: "📈",
          title: "Economics for Engineers",
          shortDesc: "Engineering Economics, Microeconomics, Cost Analysis, and Financial Valuation",
          units: [
            { num: "Unit I", topics: "Introduction: Economics Definition, Basic economic problems, Resource constraints and welfare maximization. Microand Macro economics. Production Possibility Curve.Circular flow of economic activities. Basics of Demand, Supply and Equilibrium: Demand side and supply side of the market. Factors affecting demand & supply. Elasticity of demand & supply – price, income and cross-price elasticity. Market equilibrium price." },
            { num: "Unit II", topics: "Theory of Consumer Choice: Theory of Utility and consumer's equilibrium.Indifference Curve analysis, Budget Constraints, Consumer Equilibrium. Demand forecasting:Regression Technique, Time-series, Smoothing Techniques: Exponential, Moving AveragesMethod" },
            { num: "Unit III", topics: "Cost Theory and Analysis:Nature and types of cost, Cost functions- short run and long run, Economies and diseconomies of scale Market Structure:Market structure and degree of competitionPerfect competition, Monopoly, Monopolistic competition, Oligopoly" },
            { num: "Unit IV", topics: "National Income Accounting:Overview of Macroeconomics, Basic concepts of NationalIncome Accounting Macro Economics Issues: Introduction to Business Cycle, Inflation-causes,consequences and remedies: Monetary and Fiscal policy." }
          ]
        },
        {
          code: "CS-307",
          icon: "✍",
          title: "Software Engineering",
          shortDesc: "SDLC Models, Requirements Engineering, Testing, and Maintenance",
          units: [
            { num: "Unit I", topics: "Introduction to Software- Nature of Software, Introduction to Software Engineering, Software Engineering Layers, Software Myths, The Software Processes, Project, Product, Process Models: A Generic Process Model, Waterfall Model, Incremental Process Models, Evolutionary Process Models, Spiral Model. COCOMO Model. UML diagrams and DFDs" },
            { num: "Unit II", topics: "Requirements Engineering- Functional and Non-Functional Requirements, The Software Requirements Document, Requirements Specification, Requirements Engineering, Requirements Elicitation and Analysis, Requirement Validation, Requirement Management, DFD, Data Dictionary. Introduction to ER diagrams" },
            { num: "Unit III", topics: "Software Design- Design concepts and principles - Abstraction - Refinement - Modularity Cohesion coupling, Architectural design, Detailed Design Transaction Transformation, Refactoring of designs, Object-oriented Design User-Interface Design. Software Testing: White-Box Testing, Black Box Testing. Stress Testing. Alpha, Beta, and Acceptance Testing. Debugging." },
            { num: "Unit IV", topics: "Software Maintenance and Management- Software Maintenance, Types of Maintenance, Software Configuration Management, Overview of RE-engineering Reverse Engineering, Reliability: Failure and Faults, Reliability Models. Quality and Risk Management: Product Metrics, Software Measurements, Metrics for Software Quality, Risk Management: Software Risks, Risk Identification, Risk Projection, Risk Refinements, Risk Mitigation Monitoring and Management (RMMM). Overview Of Quality Management. CMM, ISO 9000, and Six Sigma." }
          ]
        },
        {
          code: "CS-309",
          icon: "📐",
          title: "Algorithm Design and Analysis",
          shortDesc: "Asymptotic Notation, Divide & Conquer, Greedy, Dynamic Programming, and NP-Completeness",
          units: [
            { num: "Unit I", topics: "Asymptotic notations for time and space complexity, Big-Oh notation, Θ notation, Ω notation, the little-oh notation, the little-omega notation, Recurrence relations: iteration method, recursion tree method, substitution method, master method (with proof), subtract and conquer master method(with proof), Data Structures for Disjoint Sets, Medians and Order statistics. Complexity analysis, Insertion sort, Merge Sort, Quick sort. Strassen's algorithm for Matrix Multiplications." },
            { num: "Unit II", topics: "Dynamic Programming: Ingredients of Dynamic Programming, emphasis on optimal substructure , overlapping substructures, memorization. Matrix Chain Multiplication, Longest common subsequence and optimal binary search trees problems, 0-1 knapsack problem, Binomial coefficient computation through dynamic programming. Floyd Warshall algorithm." },
            { num: "Unit III", topics: "Greedy Algorithms: Elements of Greedy strategy, overview of local and global optima, matroid, Activity selection problem, Fractional Knapsack problem, Huffman Codes, A task scheduling problem. Minimum Spanning Trees: Kruskal's and Prim's Algorithm, Single source shortest path: Dijkstra's and Bellman Ford Algorithm(with proof of correctness of algorithms)." },
            { num: "Unit IV", topics: "String matching: The naïve String Matching algorithm, The Rabin-Karp Algorithm, String Matching with finite automata, The Knuth-Morris Pratt algorithm. NP-Complete Problem: Polynomial-time verification, NP-Completeness and Reducibility, NP-Completeness Proof, NP –hard ,Case study of NP-Complete problems (vertex cover problem, clique problem)." }
          ]
        },
        {
          code: "CS-311",
          icon: "💻",
          title: "Operating System CSE",
          shortDesc: "CPU Scheduling, Synchronization, Memory Management, and Disk Scheduling",
          units: [
            { num: "Unit I", topics: "Introduction: What is an Operating System, Simple Batch Systems, Multi-programmed Batches systems, Time Sharing Systems, Personal-computer systems, Parallel systems, Distributed Systems, Real-Time Systems, OS – A Resource Manager. Processes: Introduction, Process states, process management, Interrupts, Interprocess Communication. Threads: Introduction, Thread states, Thread Operation, Threading Models. Processor Scheduling: Scheduling levels, preemptive vs no preemptive scheduling, priorities, scheduling objective, scheduling criteria, scheduling algorithms, demand scheduling, real time scheduling." },
            { num: "Unit II", topics: "Process Synchronization: Mutual exclusion, software solution to Mutual exclusion problem, hardware solution to Mutual exclusion problem, semaphores, Critical section problems. Case study on Dining philosopher problem, Barber shop problem etc. Memory Organization & Management: Memory Organization, Memory Hierarchy, Memory Management Strategies, Contiguous versus non- Contiguous memory allocation, Partition Management Techniques, Logical versus Physical Address space, swapping, Paging, Segmentation, Segmentation with Paging Virtual Memory: Demand Paging, Page Replacement, Page-replacement Algorithms, Performance of Demand Paging, Thrashing, Demand Segmentation, and Overlay Concepts." },
            { num: "Unit III", topics: "Deadlocks: examples of deadlock, resource concepts, necessary conditions for deadlock, deadlock solution, deadlock prevention, deadlock avoidance with Bankers algorithms, deadlock detection, deadlock recovery. Device Management: Disk Scheduling Strategies, Rotational Optimization, System Consideration, Caching and Buffering." },
            { num: "Unit IV", topics: "File System: Introduction, File Organization, Logical File System, Physical File System, File Allocation strategy, Free Space Management, File Access Control, Data Access Techniques, Data Integrity Protection, Case study on file system viz FAT32, NTFS, Ext2/Ext3 etc." }
          ]
        }
      ]
    },
    6: {
      desc: "Explore intelligent systems, modern web platforms, advanced software frameworks, and statistical modelling.",
      subjects: [
        {
          code: "HS-302",
          icon: "🕊",
          title: "Universal Human Values",
          shortDesc: "Ethics, Value Education, Harmony in Self, Family, Society, and Nature",
          units: [
            { num: "Unit I", topics: "Introduction-Basic Human Aspiration, its fulfillment through All-encompassing Resolution. The basic human aspirations and their fulfillment through Right understanding and Resolution, Right understanding and Resolution as the activities of the Self, Self being central to Human Existence; All-encompassing Resolution for a Human Being, its details and solution of problems in the light of Resolution." },
            { num: "Unit II", topics: "Understanding Human Being. Understanding the human being comprehensively as the first step and the core theme of this course; human being as co-existence of the self and the body; the activities and potentialities of the self; Basis for harmony/contradiction in the self." },
            { num: "Unit III", topics: "Understanding Nature and Existence. A comprehensive understanding (knowledge) about the existence, Nature being included; the need and process of inner evolution (through self-exploration, self-awareness and self-evaluation), particularly awakening to activities of the Self: Realization, Understanding and Contemplation in the Self (Realization of Co-Existence, Understanding of Harmony in Nature and Contemplation of Participation of Human in this harmony/order leading to comprehensive knowledge about the existence)." },
            { num: "Unit IV", topics: "Understanding Human Conduct, All-encompassing Resolution & Holistic Way of Living. Understanding Human Conduct, different aspects of All-encompassing Resolution (understanding, wisdom, science etc.), Holistic way of living for Human Being with All-encompassing Resolution covering all four dimensions of human endeavor viz., realization, thought, behavior and work (participation in the larger order) leading to harmony at all levels from Self to Nature and entire Existence." }
          ]
        },
        {
          code: "CS-304",
          icon: "🌐",
          title: "Web Technologies",
          shortDesc: "HTML5, CSS3, JavaScript, Client-Server Architectures, and Web APIs",
          units: [
            { num: "Unit I", topics: "HTML: Basic Syntax, Standard HTML Document Structure, Basic Text Markup, Html styles, Elements, Attributes, Heading, Layouts, I frames Images, Hypertext Links, Lists, Tables, Forms, Dynamic HTML. CSS: Need for CSS, introduction to CSS, basic syntax and structure, using CSS, background images, colors, and properties, manipulating texts, using fonts, borders, boxes, margins, padding lists, positioning using CSS, CSS2, The Box Model, Working with XML: Document Type Definition (DTD), XML schemas, Document object model, Parsers -DOM, and SAX. Introduction to XHTML: XML, Meta tags, Character entities, frames, and frame sets." },
            { num: "Unit II", topics: "JavaScript - Client-side scripting, Introduction to JavaScript, Objects, Primitives Operations and Expressions, Control Statements, Arrays, Functions, Constructors, JavaScript, and objects, JavaScript own objects, the DOM and web browser environments, forms and validations. Introduction to JSP: The Anatomy of a JSP Page, JSP Processing, Declarations, Directives, Expressions, Code Snippets, implicit objects, Using Beans in JSP Pages, Using Cookies and session for session tracking, connecting to database in JSP." },
            { num: "Unit III", topics: "Introduction to Server-Side Development with PHP, what is Server-Side Development, A Web Server's Responsibilities, Quick Tour of PHP, Introduction and basic syntax of PHP, decision and looping with examples, PHP and HTML, Arrays, Functions, Browser control and detection, string, Form processing, Files, Advance Features: Cookies and Sessions." },
            { num: "Unit IV", topics: "PHP and MySQL: Basic commands with PHP examples, Connection to the server, creating a database, selecting a database, listing database, listing table names, creating a table, inserting data, altering tables, queries, deleting the database, deleting data, and tables, PHP my admin and database bugs. Managing State, The Problem of State in Web Applications, Passing Information via Query Strings, Passing Information via the URL Path, Cookies, Serialization, Session State." }
          ]
        },
        {
          code: "CS-306",
          icon: "🐍",
          title: "Programming in Python",
          shortDesc: "Python Fundamentals, Data Structures, OOP, Modules, and File I/O",
          units: [
            { num: "Unit I", topics: "Introduction, Python Basics: Entering Expressions into the Interactive Shell, The Integer, Floating-Point, and String Data Types, String Concatenation and Replication, Storing Values in Variables, Your First Program, Dissecting Your Program. Flow control: Boolean Values, Comparison Operators, Boolean Operators, Mixing Boolean and Comparison Operators, Elements of Flow Control, Program Execution, Flow Control Statements, Importing Modules, Ending a Program Early with sys.exit()" },
            { num: "Unit II", topics: "Functions: def Statements with Parameters, Return Values and return Statements, The None Value, Keyword Arguments and print(), Local and Global Scope, The global Statement, Exception Handling. Lists: The List Data Type, Working with Lists, Augmented Assignment Operators, Methods. Dictionaries and Structuring Data: The Dictionary Data Type, Pretty Printing, Using Data Structures to Model Real-World Things. Manipulating Strings - Working with Strings, Useful String Methods" },
            { num: "Unit III", topics: "Reading and Writing Files: Files and File Paths, The os.path Module, The File Reading/Writing Process, Saving Variables with the shelve Module, Saving Variables with the pprint.pformat() Function. Organizing Files: The shutil Module, Walking a Directory Tree, Compressing Files with the zipfile Module" },
            { num: "Unit IV", topics: "Web Scraping: Project: MAPIT.PY with the web browser Module, Downloading Files from the Web with the requests Module, Saving Downloaded Files to the Hard Drive, HTML" }
          ]
        },
        {
          code: "BS-308",
          icon: "📊",
          title: "Statistics, Statistical Modelling and Simulation",
          shortDesc: "Probability Distributions, Hypothesis Testing, Regression, and Simulation Models",
          units: [
            { num: "Unit I", topics: "Statistics: Introduction & Descriptive Statistics- mean, median, mode, variance, and standard deviation. Data Visualization, Introduction to Probability Distributions. Hypothesis testing, Linear Algebra and Population Statistics, Mathematical Methods and Probability Theory, Sampling Distributions and Statistical Inference, Quantitative analysis." },
            { num: "Unit II", topics: "Statistical Modelling: Linear models, regression analysis, analysis of variance, applications in various fields. Gauss-Markov theorem; geometry of least squares, subspace formulation of linear models, orthogonal projections; regression models, factorial experiments, analysis of covariance and model formulae; regression diagnostics, residuals, influence diagnostics, transformations, Box-Cox models, model selection and model building strategies, logistic regression models; Poisson regression models." },
            { num: "Unit III", topics: "Data Analytics: Describe classes of open and closed set. Apply the concept of compactness. Describe Metric space - Metric in Rn. Use the concept of Cauchy sequence, completeness, compactness and connectedness to solve the problems." },
            { num: "Unit IV", topics: "Advanced concepts in Data Analytics: Describe vector space, subspaces, independence of vectors, basis and dimension. Describe Eigen values, Eigen vectors and related results." }
          ]
        },
        {
          code: "HS-310",
          icon: "🏢",
          title: "Principles of Management for Engineers",
          shortDesc: "Management Functions, Organizational Behavior, Project Leadership, and Ethics",
          units: [
            { num: "Unit I", topics: "Introduction to Managers and Management: Management an Overview, Definition of Management, Role of Management, Functions of Managers, Levels of Management, Management Skills and Organizational Hierarchy, Social and Ethical Responsibilities of Management: Arguments for and against Social Responsibilities of Business, Social Stakeholders, Measuring Social Responsiveness and Managerial Ethics, Omnipotent and Symbolic View, Characteristics and importance of organizational culture, Relevance of political, legal, economic and Cultural environments to global business, Structures and techniques organizations use as they go international." },
            { num: "Unit II", topics: "Planning: Nature & Purpose, Steps involved in Planning, Objectives, Setting Objectives, Process of Managing by Objectives, Strategies, Policies & Planning Premises, Competitor Intelligence, Benchmarking, Forecasting, Decision-Making, Directing: Scope, Human Factors, Creativity and Innovation, Harmonizing Objectives, Leadership, Types of Leadership, Directing, Managers as leaders, Early Leadership Theories...Trait Theories, Behavioral Theories, Managerial Grid, Contingency Theories of Leadership, Directing ...PathGoal Theory, contemporary views of Leadership, CrossCultural Leadership, Leadership Training, Substitutes of Leadership." },
            { num: "Unit III", topics: "Organizing: Organizing, Benefits and Limitations-De-Centralization and Delegation of Authority, Authority versus Power, Mechanistic Versus Organic Organization, Common Organizational Designs, Contemporary Organizational Designs and Contingency Factors, The Learning Organization Nature and Purpose, Formal and Informal Organization, Organization Chart, Structure and Process, Departmentalization by difference strategies, Line and Staff authority- Benefits and Limitations-De-Centralization and Delegation of Authority Versus, Staffing, Human Resource Inventory, Job Analysis, Job Description, Recruitment and." },
            { num: "Unit IV", topics: "Controlling: Controlling, Introduction to Controlling System and process of Controlling, Requirements for effective control, The planning Control link, The process of control, types of control The Budget as Control Technique, Information Technology in Controlling, Productivity, Problems and Management, Control of Overall Performance, Direct and Preventive Control, Financial Controls, Tools for measuring organizational Performance, Contemporary issues in control Workplace concerns, employee theft, employee violence." }
          ]
        },
        {
          code: "CS-312",
          icon: "☕",
          title: "Advanced Java Programming",
          shortDesc: "Java EE, Servlets, JSP, Hibernate, Spring Framework, and Microservices",
          units: [
            { num: "Unit I", topics: "Introduction to Java, Inheritance, Exception Handling, Multithreading, Applet Programming, Connecting to a Server, Implementing Servers, Making URL Connections, Socket Programming" },
            { num: "Unit II", topics: "Preparing a Class to be a Java Bean, Creating a Java Bean, Java Bean Properties, Types of beans, Stateful Session bean, Stateless Session bean, Entity bean, Servlet Overview and Architecture, Interface Servlet and the Servlet LifeCycle, Handling HTTP GET Requests, Handling HTTP POST Requests, Session Tracking, Cookies" },
            { num: "Unit III", topics: "JSP: Introduction, Java Server Pages Overview, Implicit Objects, Scripting, Standard Actions, Directives, Custom Tag Libraries" },
            { num: "Unit IV", topics: "The Roles of Client and Server, Remote Method Invocations, Setup for Remote Method Invocation, Parameter Passing in Remote Methods, Introduction of HB, HB Architecture" }
          ]
        },
        {
          code: "CS-302",
          icon: "🤖",
          title: "Artificial Intelligence",
          shortDesc: "Heuristic Search, Knowledge Representation, Fuzzy Logic, and Expert Systems",
          units: [
            { num: "Unit I", topics: "AI Definition, Problems, The Foundations of Artificial Intelligence, Techniques, Models, Defining Problem as a state space search, production system, Intelligent Agents: Agents and Environments, Characteristics, Search methods and issues in the design of search problems." },
            { num: "Unit II", topics: "Knowledge representation issues, mapping, frame problem. Predicate logic, facts in logic, representing instance and Isa relationship, Resolution, procedural and declarative knowledge, matching, control knowledge. Symbolic reasoning under uncertainty, Non monotonic reasoning, statistical reasoning." },
            { num: "Unit III", topics: "Game Playing, minimax search, Alfa beta cutoffs, Natural Language Processing, Learning, Explanation-based learning, discovery, analogy, Neural net learning and Genetic Learning." },
            { num: "Unit IV", topics: "Fuzzy logic systems, Perception and action, Expert systems, Inference in BayesianNetworks, K-means Clustering Algorithm, Machine learning." }
          ]
        },
        {
          code: "CS-314",
          icon: "🧠",
          title: "Machine Learning",
          shortDesc: "Supervised Learning, Neural Networks, Clustering, and Model Evaluation",
          units: [
            { num: "Unit I", topics: "Introduction: Machine learning, terminologies in machine learning, Perspectives and issues in machine learning, application of Machine learning, Types of machine learning: supervised, unsupervised, semi-supervised learning. Review of probability, Basic Linear Algebra in Machine Learning Techniques, Dataset and its types, Data preprocessing, Bias and Variance in Machine learning, Function approximation, Overfitting" },
            { num: "Unit II", topics: "Regression Analysis in Machine Learning: Introduction to regression and its terminologies, Types of regression, Logistic Regression Simple Linear regression: Introduction to Simple Linear Regression and its assumption, Simple Linear Regression Model Building,Ordinary Least square estimation, Properties of the least-squares estimators and the fitted regression model, Interval estimation in simple linear regression, Residuals Multiple Linear Regression: Multiple linear regression model and its assumption, Interpret Multiple Linear Regression Output(R-Square, Standard error, F, Significance F, Cofficient P values), Access the fit of multiple linear regression model (R squared, Standard error) Feature Selection and Dimensionality Reduction: PCA, LDA, ICA" },
            { num: "Unit III", topics: "Introduction to Classification and Classification Algorithms: What is Classification? General Approach to Classification, k-Nearest Neighbor Algorithm, Random Forests, Fuzzy Set Approaches Support Vector Machine: Introduction, Types of support vector kernel - (Linear kernel, polynomial kernel, and Gaussiankernel), Hyperplane - (Decision surface), Properties of SVM, and Issues in SVM. Decision Trees: Decision tree learning algorithm,ID-3algorithm, Inductive bias, Entropy and information theory, Information gain,Issues in Decision tree learning. Bayesian Learning - Bayes theorem, Concept learning, Bayes Optimal Classifier, Naïve Bayes classifier, Bayesian belief networks, EM algorithm Ensemble Methods: Bagging, Boosting and AdaBoost and XBoost, Classification Model Evaluation and Selection: Sensitivity, Specificity, Positive Predictive Value, Negative Predictive Value, Lift Curves and Gain Curves, ROC Curves, Misclassification Cost Adjustment to Reflect Real-World Concerns, Decision Cost/Benefit Analysis" },
            { num: "Unit IV", topics: "Introduction to Cluster Analysis and Clustering Methods: The Clustering Task and the Requirements for Cluster Analysis , Overview of Some Basic Clustering Methods :- k-Means Clustering, k-Medoids Clustering, Density-Based Clustering: DBSCAN - Density-Based Clustering Based on Connected Regions with High Density, Gaussian Mixture Model algorithm , Balance Iterative Reducing and Clustering using Hierarchies (BIRCH) , Affinity Propagation clustering algorithm,Mean-Shift clustering algorithm, ordering Points to Identify the Clustering Structure (OPTICS) algorithm, Agglomerative Hierarchy clustering algorithm, Divisive Hierarchical, Measuring Clustering Goodness" }
          ]
        },
        {
          code: "CS-316",
          icon: "⚡",
          title: "Operating System AIML",
          shortDesc: "OS Kernels, Resource Scheduling, Virtual Memory, and Parallel Execution for AI",
          units: [
            { num: "Unit I", topics: "Introduction: Operating system and function, Evolution of operating system, Batch, Interactive, Time Sharing and Real Time System, System protection. Operating System Structure: System Components, System structure, Operating System Services. CPU Scheduling: Scheduling Concept, process scheduling strategies- First-Come, First-Served (FCFS) Scheduling, Shortest-Job-Next (SJN) Scheduling, Priority Scheduling, Shortest Remaining Time, Round Robin (RR) Scheduling, Multiple-Level Queues Scheduling, Performance Criteria of Scheduling Algorithm, Evolution, Multiprocessor Scheduling." },
            { num: "Unit II", topics: "Concurrent Processes: Process concept, Principle of Concurrency, Producer Consumer Problem, Critical Section problem, Semaphores, Binary and counting semaphores, P() and V() operations, Classical problems in Concurrency, Inter Process Communication, Process Generation, Process Scheduling. Deadlocks: examples of deadlock, resource concepts, necessary conditions for deadlock, deadlock solution, deadlock prevention, deadlock avoidance with Bankers algorithms, deadlock detection, deadlock recovery." },
            { num: "Unit III", topics: "Memory Organization & Management: Memory Organization, Memory Hierarchy, Memory Management Strategies, Contiguous versus non- Contiguous memory allocation, Partition Management Techniques, Logical versus Physical Address space, swapping, Paging, Segmentation, Segmentation with Paging Virtual Memory: Demand Paging, Page Replacement, Page-replacement Algorithms, Performance of Demand Paging, Thrashing, Demand Segmentation, and Overlay Concepts." },
            { num: "Unit IV", topics: "I/O Device and the organization: I/O Device and the organization of the I/O function, I/O Buffering, Disk I/O, Disk Scheduling Algorithms, File system: File Concepts, attributes, operations, File organization and Access mechanism, disk space allocation methods, Directory structure, free disk space management, File sharing, Implementation issues. Case studies: Unix system, Windows XP." }
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
        },
        {
          code: "BS-112",
          icon: "⚛",
          title: "Applied Physics-1",
          shortDesc: "Mechanics, Wave Theory, and Optical Systems",
          units: [
            { num: "Unit I", topics: "Interference: Coherent sources, Young's double slit, Newton's rings, Michelson interferometer." },
            { num: "Unit II", topics: "Diffraction: Fraunhofer diffraction, Single slit, Double slit, Diffraction grating, Resolving power." },
            { num: "Unit III", topics: "Polarization: Double refraction, Nicol prism, Production and detection of polarized light, Polarimeters." },
            { num: "Unit IV", topics: "Lasers & Fiber Optics: Einstein's coefficients, Ruby laser, He-Ne laser, Optical fibers, Numerical aperture." }
          ]
        },
        {
          code: "BS-111",
          icon: "√x",
          title: "Applied Mathematics-1",
          shortDesc: "Calculus, Matrices, and Differential Equations",
          units: [
            { num: "Unit I", topics: "Matrices: Eigenvalues, Eigenvectors, Cayley-Hamilton Theorem, Diagonalization of matrices." },
            { num: "Unit II", topics: "Differential Calculus: Successive differentiation, Leibnitz theorem, Taylor's and Maclaurin's series, Curvature." },
            { num: "Unit III", topics: "Partial Differentiation: Euler's theorem, Jacobians, Taylor's series for two variables, Maxima and Minima." },
            { num: "Unit IV", topics: "Integral Calculus: Double and triple integrals, Change of order, Area and volume calculation." }
          ]
        },
        {
          code: "ES-109",
          icon: "⚙️",
          title: "Manufacturing Processes",
          shortDesc: "Casting, Welding, Machining, and Metal Forming",
          units: [
            { num: "Unit I", topics: "Casting Processes: Pattern making, sand casting, melting furnaces, casting defects and inspection." },
            { num: "Unit II", topics: "Forming & Shaping: Hot and cold working of metals, forging, rolling, extrusion, wire drawing." },
            { num: "Unit III", topics: "Joining Processes: Gas welding, arc welding, resistance welding, brazing and soldering." },
            { num: "Unit IV", topics: "Machining & Sheet Metal: Lathe operations, drilling, shaping, milling, sheet metal operations and press tools." }
          ]
        },
        {
          code: "HS-101",
          icon: "🌱",
          title: "Environmental Science",
          shortDesc: "Ecology, Ecosystems, Biodiversity & Pollution Control",
          units: [
            { num: "Unit I", topics: "Fundamentals: The Multidisciplinary nature of environmental studies: Definition, components, scope and importance, need for public awareness; Natural Resources. Ecosystems: Concept, Structure and function of an ecosystem, Types, Functional Components, Different ecosystems, biogeochemical cycles. Biodiversity: Introduction to biodiversity, biogeographical classification, India as a mega diversity nation, endangered and endemic species of India, threats to biodiversity and conservation of biodiversity. Bioprospecting and Biopiracy" },
            { num: "Unit II", topics: "Environmental Pollution: (a) Air Pollution: Source, Types, effects on biosphere and Meterology, Air Quality, Control. (b) Water Pollution: Types and Sources. (c) Soil Pollution: Types and Control. (d) Noise Pollution: Effect, Control (e) Thermal Pollution. (f) Radiation Pollution (g) Solid waste Management, (h) Pollution Prevention, (i) Disaster Management" },
            { num: "Unit III", topics: "Social Issues and Environment: Concept of Sustainable Development; Urban problem related to energy; Water Conservation; Wasteland reclamation; Resettlement and Rehabilitation; Climate Change; Nuclear Accidents; Consumerism and Waste Products; Laws related to Environment, Pollution, Forest and Wild life; Environmental Impact Assessment." },
            { num: "Unit IV", topics: "Human Population and Environment: Population Growth, Human Rights, Family Welfare Programmes, Environment and Human Health, HIV/AIDS, Women and Child Welfare, Role of IT." }
          ]
        },
        {
          code: "ES-105",
          icon: "🔌",
          title: "Electrical Science",
          shortDesc: "DC/AC Circuits, Network Theorems, Transformers & Motors",
          units: [
            { num: "Unit I", topics: "DC Circuits: Passive circuit components, Basic laws of Electrical Engineering, Temperature Resistance Coefficients, voltage and current sources, Series and parallel circuits, power and energy, Kirchhoff's Laws, Nodal & Mesh Analysis, delta-star transformation, superposition theorem, Thevenin's theorem, Norton's theorem, maximum power transfer theorem, Time domain analysis of first Order RC & LC circuits." },
            { num: "Unit II", topics: "AC Circuits: Representation of sinusoidal waveforms, peak and rms values, phasor representation, real power, reactive power, apparent power, power factor, Analysis of single-phase ac circuits consisting of R, L, C, RL, RC, RLC combinations (series and parallel), resonance, Three phase balanced circuits, voltage and current relations in star and delta connections." },
            { num: "Unit III", topics: "D. C. Generators & Motors: Principle of operation of Generators & Motors, Speed Control of shunt motors, Flux control, Rheostatic control, voltage control, Speed control of series motors, A. C. Generators & Motors: Principle of operation, Revolving Magnetic field, Squirrel cage and phase wound rotor, Starting of Induction motors, Direct on line and Star Delta starters, Synchronous machines." },
            { num: "Unit IV", topics: "Transformers: Construction and principle of operation, equivalent circuit, losses in transformers, regulation and efficiency, Auto-transformer and three-phase transformer connections. Measuring Instruments: Electromagnetism, Different Torques in Indicating instruments, Moving Iron Instruments: Construction & Principle, Attraction and Repulsion type, Moving Coil instruments: Permanent Magnet type, Dynamometer type Instruments." }
          ]
        },
        {
          code: "BS-113",
          icon: "🔬",
          title: "Applied Chemistry-1",
          shortDesc: "Physical, Organic & Inorganic Engineering Chemistry",
          units: [
            { num: "Unit I", topics: "Water Technology: Hardness of water, estimation by EDTA, boiler troubles, water softening processes." },
            { num: "Unit II", topics: "Fuels & Combustion: Classification, Calorific value determination, coal analysis, petroleum cracking." },
            { num: "Unit III", topics: "Polymers & Composite Materials: Monomers, polymerization types, thermoplastics, thermosetting resins, biopolymers." },
            { num: "Unit IV", topics: "Corrosion & its Control: Chemical and electrochemical corrosion, protective coatings, cathodic protection." }
          ]
        },
        {
          code: "HS-102",
          icon: "💬",
          title: "Communication Skills",
          shortDesc: "Verbal & Written Communication, Technical Writing, Soft Skills",
          units: [
            { num: "Unit I", topics: "Role and Importance of Communications, Attributes of Communications, Verbal and Non-Verbal Communications, Verbal Communications Skills, Non-verbal Communication Methods, Body Language, Barriers to Communications, Socio-psychological barriers, Inter-Cultural barriers, Overcoming barriers, Communication Mediums: Characterization and Choice of medium, Effective Communication: Correctness, Clarity, Conciseness, Courtesy, Group Communication: Meetings (types, purpose), Group Discussions, Conduct of Meeting, Participant Role, Making Presentations." },
            { num: "Unit II", topics: "Spoken and Written English: Attributes of spoken and written communication, Formal & Informal Communication, Variation in between Indian, British and American English. Etiquette and Manners: Personal Behaviour, Greetings, Introductions, Telephone Etiquette. Vocabulary Development: Dictionaries and Thesaurus, Words often confused, generally used one word substitutions, Comprehension." },
            { num: "Unit III", topics: "Letter writing: Planning the message, Planning Content, Structure, Language use, Layout, enquires and replies, asking for or giving quotations, Bargaining letters, Seller's reply, etc.; Complaints and Replies; Memos, Circulars and notices; Paragraph Writing, Writing Scientific and Technical Reports: Types, Structure, Drafting and Delivering a Speech: Understanding the Environment, Understanding the Audience, Text preparing, Composition, Practicing, Commemorative Speeches, Welcome and Introduction, Farewell and Send-offs, Condolence" },
            { num: "Unit IV", topics: "Articles: Indefinite, Definite; Tenses: Present, Past, Future, Perfect (Present, Past and Future), Tenses in conditional sentences; Active and Passive Voice: Formation, conversion; Direct and Indirect Speech, Degrees of Comparison, Common errors, Concepts of Learning and Listening" }
          ]
        },
        {
          code: "CS-101",
          icon: "</>",
          title: "Programming in C",
          shortDesc: "Algorithms, Syntax, Control structures, and Files",
          units: [
            { num: "Unit I", topics: "Introduction to Programming: Computer system, components of a computer system, computing environments, computer languages, creating and running programs, Preprocessor, Compilation process, role of linker, idea of invocation and execution of a programme. Algorithms: Representation using flowcharts, pseudocode. Introduction to C language: History of C, basic structure of C programs, process of compiling and running a C program, C tokens, keywords, identifiers, constants, strings, special symbols, variables, data types, I/O statements. Interconversion of variables. Operators and expressions: Operators, arithmetic, relational and logical, assignment operators, increment and decrement operators, bitwise and conditional operators, special operators, operator precedence and associativity, evaluation of expressions, type conversions in expressions." },
            { num: "Unit II", topics: "Control structures: Decision statements; if and switch statement; Loop control statements: while, for and do while loops, jump statements, break, continue, goto statements. Arrays: Concepts, One dimensional array, declaration and initialization of one dimensional arrays, two dimensional arrays, initialization and accessing, multi dimensional arrays. Functions: User defined and built-in Functions, storage classes, Parameter passing in functions, call by value, Passing arrays to functions: idea of call by reference, Recursion. Strings: Arrays of characters, variable length character strings, inputting character strings, character library functions, string handling functions." },
            { num: "Unit III", topics: "Pointers: Pointer basics, pointer arithmetic, pointers to pointers, generic pointers, array of pointers, functions returning pointers, Dynamic memory allocation. Pointers to functions. Pointers and Strings Structures and unions: Structure definition, initialization, accessing structures, nested structures, arrays of structures, structures and functions, self referential structures, unions, typedef, enumerations. File handling: command line arguments, File modes, basic file operations read, write and append. Scope and life of variables, multi-file programming." },
            { num: "Unit IV", topics: "C99 extensions. 'C' Standard Libraries: stdio.h, stdlib.h, assert.h, math.h, time.h, ctype.h, setjmp.h, string.h, stdarg.h, unistd.h. Basic Algorithms: Finding Factorial, Fibonacci series, Linear and Binary Searching, Basic Sorting Algorithms- Bubble sort, Insertion sort and Selection sort. Find the square root of a number, array order reversal, reversal of a string." }
          ]
        }
      ]
    },
    2: {
      desc: "Strengthen core engineering constructs and object-oriented paradigms.",
      subjects: [
        {
          code: "CS-101",
          icon: "</>",
          title: "Programming in C",
          shortDesc: "Algorithms, Syntax, Control structures, and Files",
          units: [
            { num: "Unit I", topics: "Introduction to Programming: Computer system, components of a computer system, computing environments, computer languages, creating and running programs, Preprocessor, Compilation process, role of linker, idea of invocation and execution of a programme. Algorithms: Representation using flowcharts, pseudocode. Introduction to C language: History of C, basic structure of C programs, process of compiling and running a C program, C tokens, keywords, identifiers, constants, strings, special symbols, variables, data types, I/O statements. Interconversion of variables. Operators and expressions: Operators, arithmetic, relational and logical, assignment operators, increment and decrement operators, bitwise and conditional operators, special operators, operator precedence and associativity, evaluation of expressions, type conversions in expressions." },
            { num: "Unit II", topics: "Control structures: Decision statements; if and switch statement; Loop control statements: while, for and do while loops, jump statements, break, continue, goto statements. Arrays: Concepts, One dimensional array, declaration and initialization of one dimensional arrays, two dimensional arrays, initialization and accessing, multi dimensional arrays. Functions: User defined and built-in Functions, storage classes, Parameter passing in functions, call by value, Passing arrays to functions: idea of call by reference, Recursion. Strings: Arrays of characters, variable length character strings, inputting character strings, character library functions, string handling functions." },
            { num: "Unit III", topics: "Pointers: Pointer basics, pointer arithmetic, pointers to pointers, generic pointers, array of pointers, functions returning pointers, Dynamic memory allocation. Pointers to functions. Pointers and Strings Structures and unions: Structure definition, initialization, accessing structures, nested structures, arrays of structures, structures and functions, self referential structures, unions, typedef, enumerations. File handling: command line arguments, File modes, basic file operations read, write and append. Scope and life of variables, multi-file programming." },
            { num: "Unit IV", topics: "C99 extensions. 'C' Standard Libraries: stdio.h, stdlib.h, assert.h, math.h, time.h, ctype.h, setjmp.h, string.h, stdarg.h, unistd.h. Basic Algorithms: Finding Factorial, Fibonacci series, Linear and Binary Searching, Basic Sorting Algorithms- Bubble sort, Insertion sort and Selection sort. Find the square root of a number, array order reversal, reversal of a string." }
          ]
        },
        {
          code: "BS-121",
          icon: "∫",
          title: "Applied Mathematics 2",
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
          title: "Applied Physics 2",
          shortDesc: "Electromagnetism, Solid State Physics, and Quantum Mechanics",
          units: [
            { num: "Unit I", topics: "Electromagnetic Theory: Gauss's law, Ampere's law, Faraday's law, Maxwell's equations." },
            { num: "Unit II", topics: "Quantum Mechanics: de Broglie waves, Heisenberg uncertainty principle, Schrodinger wave equation." },
            { num: "Unit III", topics: "Statistical Mechanics: Maxwell-Boltzmann, Bose-Einstein, and Fermi-Dirac statistics." },
            { num: "Unit IV", topics: "Solid State Physics: Crystal structure, Bravais lattices, band theory of solids, superconductors." }
          ]
        },
        {
          code: "ES-108",
          icon: "🧱",
          title: "Engineering Mechanics",
          shortDesc: "Statics, Force Systems, Friction, and Structural Mechanics",
          units: [
            { num: "Unit I", topics: "Force System: Introduction, force, principle of transmissibility of force, resultant of a force system, resolution of a force, moment of force about a line, Varigon's theorem, couple, resolution of force into force and a couple, properties of couple and their application to engineering problems. Equilibrium: Force body diagram, equations of equilibrium and their applications to engineering problems, equilibrium of two force and three force members. Distributed Forces: Determination of center of gravity, center of mass and centroid by direct integration and by the method of composite bodies, mass moment of inertia and area moment of inertia by direct integration and composite bodies method, radius of gyration, parallel axis theorem, polar moment of inertial." },
            { num: "Unit II", topics: "Structure: Plane truss, perfect and imperfect truss, assumption in the truss analysis, analysis of perfect plane trusses by the method of joints, method of section and graphical method. Friction: Static and Kinetic friction, laws of dry friction, co-efficient of friction, angle of friction, angle of repose, cone of friction, frictional lock, friction in flat pivot and collar bearing, friction in flat belts." },
            { num: "Unit III", topics: "Kinematics of Particles: Rectilinear motion, plane curvilinear motion, rectangular coordinates, normal and tangential coordinates. Kinetics of Particles: Equation of motion, rectilinear motion and curvilinear motion, work-energy equation, conservation of energy, concept of impulse and momentum, conservation of momentum, impact of bodies, co-efficient of restitution, loss of energy during impact." },
            { num: "Unit IV", topics: "Kinematics of Rigid Bodies: Concept of rigid body, types of rigid body motion, absolute motion, introduction to relative velocity, relative acceleration (Corioli's component excluded) and instantaneous center of zero velocity, Velocity and acceleration. Kinetics of Rigid Bodies: Equation of motion, translatory motion and fixed axis rotation, application of work energy principles to rigid bodies conservation of energy. Beam: Introduction, types of loading, methods for the reactions of a beam, space diagram, types of end supports, beams subjected to couple." }
          ]
        },
        {
          code: "ES-105",
          icon: "🔌",
          title: "Electrical Science",
          shortDesc: "DC/AC Circuits, Network Theorems, Transformers & Motors",
          units: [
            { num: "Unit I", topics: "DC Circuits: Passive circuit components, Basic laws of Electrical Engineering, Temperature Resistance Coefficients, voltage and current sources, Series and parallel circuits, power and energy, Kirchhoff's Laws, Nodal & Mesh Analysis, delta-star transformation, superposition theorem, Thevenin's theorem, Norton's theorem, maximum power transfer theorem, Time domain analysis of first Order RC & LC circuits." },
            { num: "Unit II", topics: "AC Circuits: Representation of sinusoidal waveforms, peak and rms values, phasor representation, real power, reactive power, apparent power, power factor, Analysis of single-phase ac circuits consisting of R, L, C, RL, RC, RLC combinations (series and parallel), resonance, Three phase balanced circuits, voltage and current relations in star and delta connections." },
            { num: "Unit III", topics: "D. C. Generators & Motors: Principle of operation of Generators & Motors, Speed Control of shunt motors, Flux control, Rheostatic control, voltage control, Speed control of series motors, A. C. Generators & Motors: Principle of operation, Revolving Magnetic field, Squirrel cage and phase wound rotor, Starting of Induction motors, Direct on line and Star Delta starters, Synchronous machines." },
            { num: "Unit IV", topics: "Transformers: Construction and principle of operation, equivalent circuit, losses in transformers, regulation and efficiency, Auto-transformer and three-phase transformer connections. Measuring Instruments: Electromagnetism, Different Torques in Indicating instruments, Moving Iron Instruments: Construction & Principle, Attraction and Repulsion type, Moving Coil instruments: Permanent Magnet type, Dynamometer type Instruments." }
          ]
        },
        {
          code: "HS-102",
          icon: "💬",
          title: "Communication Skills",
          shortDesc: "Grammar, Technical Writing, and Group Discussions",
          units: [
            { num: "Unit I", topics: "Role and Importance of Communications, Attributes of Communications, Verbal and Non-Verbal Communications, Verbal Communications Skills, Non-verbal Communication Methods, Body Language, Barriers to Communications, Socio-psychological barriers, Inter-Cultural barriers, Overcoming barriers, Communication Mediums: Characterization and Choice of medium, Effective Communication: Correctness, Clarity, Conciseness, Courtesy, Group Communication: Meetings (types, purpose), Group Discussions, Conduct of Meeting, Participant Role, Making Presentations." },
            { num: "Unit II", topics: "Spoken and Written English: Attributes of spoken and written communication, Formal & Informal Communication, Variation in between Indian, British and American English. Etiquette and Manners: Personal Behaviour, Greetings, Introductions, Telephone Etiquette. Vocabulary Development: Dictionaries and Thesaurus, Words often confused, generally used one word substitutions, Comprehension." },
            { num: "Unit III", topics: "Letter writing: Planning the message, Planning Content, Structure, Language use, Layout, enquires and replies, asking for or giving quotations, Bargaining letters, Seller's reply, etc.; Complaints and Replies; Memos, Circulars and notices; Paragraph Writing, Writing Scientific and Technical Reports: Types, Structure, Drafting and Delivering a Speech: Understanding the Environment, Understanding the Audience, Text preparing, Composition, Practicing, Commemorative Speeches, Welcome and Introduction, Farewell and Send-offs, Condolence" },
            { num: "Unit IV", topics: "Articles: Indefinite, Definite; Tenses: Present, Past, Future, Perfect (Present, Past and Future), Tenses in conditional sentences; Active and Passive Voice: Formation, conversion; Direct and Indirect Speech, Degrees of Comparison, Common errors, Concepts of Learning and Listening" }
          ]
        },
        {
          code: "HS-101",
          icon: "🌱",
          title: "Environmental Science",
          shortDesc: "Ecology, Ecosystems, Biodiversity & Pollution Control",
          units: [
            { num: "Unit I", topics: "Fundamentals: The Multidisciplinary nature of environmental studies: Definition, components, scope and importance, need for public awareness; Natural Resources. Ecosystems: Concept, Structure and function of an ecosystem, Types, Functional Components, Different ecosystems, biogeochemical cycles. Biodiversity: Introduction to biodiversity, biogeographical classification, India as a mega diversity nation, endangered and endemic species of India, threats to biodiversity and conservation of biodiversity. Bioprospecting and Biopiracy" },
            { num: "Unit II", topics: "Environmental Pollution: (a) Air Pollution: Source, Types, effects on biosphere and Meterology, Air Quality, Control. (b) Water Pollution: Types and Sources. (c) Soil Pollution: Types and Control. (d) Noise Pollution: Effect, Control (e) Thermal Pollution. (f) Radiation Pollution (g) Solid waste Management, (h) Pollution Prevention, (i) Disaster Management" },
            { num: "Unit III", topics: "Social Issues and Environment: Concept of Sustainable Development; Urban problem related to energy; Water Conservation; Wasteland reclamation; Resettlement and Rehabilitation; Climate Change; Nuclear Accidents; Consumerism and Waste Products; Laws related to Environment, Pollution, Forest and Wild life; Environmental Impact Assessment." },
            { num: "Unit IV", topics: "Human Population and Environment: Population Growth, Human Rights, Family Welfare Programmes, Environment and Human Health, HIV/AIDS, Women and Child Welfare, Role of IT." }
          ]
        },
        {
          code: "BS-113",
          icon: "🔬",
          title: "Applied Chemistry-1",
          shortDesc: "Physical, Organic & Inorganic Engineering Chemistry",
          units: [
            { num: "Unit I", topics: "Water Technology: Hardness of water, estimation by EDTA, boiler troubles, water softening processes." },
            { num: "Unit II", topics: "Fuels & Combustion: Classification, Calorific value determination, coal analysis, petroleum cracking." },
            { num: "Unit III", topics: "Polymers & Composite Materials: Monomers, polymerization types, thermoplastics, thermosetting resins, biopolymers." },
            { num: "Unit IV", topics: "Corrosion & its Control: Chemical and electrochemical corrosion, protective coatings, cathodic protection." }
          ]
        },
        {
          code: "ES-110",
          icon: "🛠",
          title: "Workshop",
          shortDesc: "Fitting, Carpentry, Foundry, Welding, and Machine Shop Practice",
          units: [
            { num: "Unit I", topics: "Fitting Shop: Fitting tools, layout marking, measuring tools, sawing, filing, tapping and dieing operations." },
            { num: "Unit II", topics: "Carpentry Shop: Timber classification, seasoning, carpentry tools, joints (halving, mortise & tenon, dovetail)." },
            { num: "Unit III", topics: "Foundry & Welding Shop: Molding sands, cores, pattern types, arc & gas welding joint preparations." },
            { num: "Unit IV", topics: "Sheet Metal & Machine Shop: Sheet metal tools, joints, seams, lathe machine operations, safety practices." }
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
      desc: "Implement databases, network layers, machine learning models, software processes, and technical correspondence.",
      subjects: [
        {
          code: "IT-208",
          icon: "⚙",
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
          title: "Computer Networks and Internet Protocols",
          shortDesc: "OSI Reference Model, TCP/IP Suite, Routing Algorithms, and Internet Protocols",
          units: [
            { num: "Unit I", topics: "Introduction to networks, physical layer encoding, transmission media, topologies." },
            { num: "Unit II", topics: "Data link layer: Framing, error control, sliding window protocols, MAC sublayer." },
            { num: "Unit III", topics: "Network layer: IP addressing, routing algorithms (OSPF, BGP), congestion control." },
            { num: "Unit IV", topics: "Transport & Application: TCP, UDP, HTTP, DNS, SMTP, network security basics." }
          ]
        },
        {
          code: "IT-206",
          icon: "💻",
          title: "Fundamentals of Machine Learning",
          shortDesc: "Supervised and Unsupervised Learning, Regression, SVM, Decision Trees, and Clustering",
          units: [
            { num: "Unit I", topics: "Introduction to Machine Learning: Supervised, Unsupervised, Reinforcement learning. Linear Regression, Gradient Descent." },
            { num: "Unit II", topics: "Classification: Logistic Regression, Decision Trees, Naive Bayes, Support Vector Machines (SVM), K-Nearest Neighbors (KNN)." },
            { num: "Unit III", topics: "Clustering & Unsupervised Learning: K-Means clustering, hierarchical clustering, Principal Component Analysis (PCA)." },
            { num: "Unit IV", topics: "Model Evaluation: Bias-variance tradeoff, cross-validation, precision, recall, ROC curves, confusion matrix." }
          ]
        },
        {
          code: "HS-204",
          icon: "✍",
          title: "Effective Technical Writing",
          shortDesc: "Technical Correspondence, Audience Analysis, Proposals, Reports, and Citations",
          units: [
            { num: "Unit I", topics: "Introduction to Technical Communication: Objectives, characteristics, audience analysis." },
            { num: "Unit II", topics: "Technical Writing Genres: Reports, manuals, proposals, specs, instructions." },
            { num: "Unit III", topics: "Professional Correspondence: Resumes, cover letters, business emails, letters." },
            { num: "Unit IV", topics: "Research Papers & Presentations: Formatting, citations (IEEE, APA), oral presentation skills." }
          ]
        },
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
        }
      ]
    },
    5: {
      desc: "Apply advanced computer organization, algorithm analysis, IoT frameworks, and deep learning architectures.",
      subjects: [
        {
          code: "IT-301",
          icon: "🖥",
          title: "Computer Organisation and Architecture",
          shortDesc: "Register Transfer, CPU Design, Microprogramming, and Memory Hierarchies",
          units: [
            { num: "Unit I", topics: "Register Transfer Language: Register transfer language, bus and memory transfer, bus architecture using multiplexer and tri-state buffer, micro-operation: arithmetic, logical, shift micro-operation with hardware implementation, arithmetic logic shift unit. Computer Organization and Design: Instruction codes, general computer registers with common bus system, computer instructions: memory reference, register reference, input-output instructions, timing and control, instruction cycle, input-output configuration, and interrupt cycle. Levels of programming languages: Machine language, Assembly language, High level language." },
            { num: "Unit II", topics: "Central processing Unit: Introduction, general register organization, stack organization, instruction format, addressing modes. Overview of GPU, CPU vs GPU computing difference. Memory Hierarchy: Introduction, basics of cache, measuring and improving of cache performance, cache memory: associative mapping, direct mapping, set-associative mapping, cache writing and initialization, virtual memory, common framework for memory hierarchies. Case study of PIV and AMD opteron memory hierarchies." },
            { num: "Unit III", topics: "Parallel Computer Models: The state of computing, classification of parallel computers, multiprocessors and multicomputers, multivector and SIMD computers. Program and Network Properties: conditions of parallelism, data and resource dependences, hardware and software parallelism, program partitioning and scheduling, grain size and latency, program flow mechanisms, control flow versus data flow, data flow Architecture, demand driven mechanisms, comparisons of flow mechanisms." },
            { num: "Unit IV", topics: "Pipelining: Introduction to Flynn's classification, arithmetic pipeline, instruction pipeline, pipeline conflict and hazards, RISC pipeline, vector processing. Arithmetic for Computers: Unsigned, signed 1's, 2's compliment notations, addition, subtraction, multiplication and division (hardware implementation), CPU performance and its factors, evaluating performance of CPU." }
          ]
        },
        {
          code: "HS-303",
          icon: "💡",
          title: "Principles of Entrepreneurship",
          shortDesc: "Entrepreneurship Mindset, Business Plan, Opportunity Identification, and Venture Capital",
          units: [
            { num: "Unit I", topics: "Entrepreneurial perspective: Foundation, Nature and development of entrepreneurship, importance of entrepreneurs, Entrepreneurial Mind, Individual entrepreneur, Types of entrepreneurs, Entrepreneurship in India." },
            { num: "Unit II", topics: "Beginning Considerations: Creativity and developing business ideas; Creating and starting the venture; Building a competitive advantage; Opportunity recognition, Opportunity assessment; Legal issues." },
            { num: "Unit III", topics: "Developing Financial Plans: Sources of Funds, Managing Cash Flow, Creating a successful Financial Plan, Developing a business plan." },
            { num: "Unit IV", topics: "Developing Marketing Plans: Developing a powerful Marketing Plan, E-commerce, Integrated Marketing Communications. Leading Considerations: Developing Team, Inviting candidates to join team, Leadership model." }
          ]
        },
        {
          code: "IT-305",
          icon: "📐",
          title: "Design and Analysis of Algorithms",
          shortDesc: "Asymptotic Notation, Divide & Conquer, Greedy, Dynamic Programming, and NP-Completeness",
          units: [
            { num: "Unit I", topics: "Introduction to Algorithms: Time Complexity and Space Complexity, Asymptotic analysis, Growth rates, some common bounds (constant, logarithmic, linear, polynomial, exponential), Complexity Analysis techniques: Master theorem, Substitution Method, Iteration Method, Time complexity of Recursive algorithms. art of problem-solving and decision making, role of data structure in algorithm design, Basic algorithmic structures of problem-solving and optimization algorithms, constraints, solution space, and feasible reasons, and representation of solution space. Sorting and searching algorithms: Selection sort, bubble sort, insertion sort, Sorting in linear time, count sort, Linear search." },
            { num: "Unit II", topics: "Divide and Conquer Algorithms: Overview of Divide and Conquer algorithms, Quick sort, Merge sort, Heap sort, Binary search, Matrix Multiplication, Convex hull and Searching, Closest Pair of Points. Greedy Algorithms: Greedy methods with examples, Huffman Coding, Knapsack, Minimum cost Spanning trees - Prim's and Kruskal's algorithms, Single source shortest paths - Dijkstra's and Bellman Ford algorithms." },
            { num: "Unit III", topics: "Dynamic programming: Dynamic programming with examples such as Knapsack, shortest path in graph All pair shortest paths -Warshal's and Floyd's algorithms, Resource allocation problem. Backtracking, Branch and Bound with examples such as Traveling Salesman Problem, longest common sequence, n-Queen Problem." },
            { num: "Unit IV", topics: "Graph Algorithms: Graphs and their Representations, Graph Traversal Techniques: Breadth First Search (BFS) and Depth First Search (DFS), Applications of BFS and DFS, Bipartite graphs. Graph Coloring, Hamiltonian Cycles and Sum of subsets. Computational complexity: Problem classes: P, NP, NP-complete, NP-hard. Reduction. The satisfiability problem, vertex cover, independent set and clique problems Cook's theorem.Examples of NP-complete problems." }
          ]
        },
        {
          code: "IT-307",
          icon: "⚡",
          title: "Operating System AIML",
          shortDesc: "OS Kernels, Resource Scheduling, Virtual Memory, and Parallel Execution for AI",
          units: [
            { num: "Unit I", topics: "Introduction: Operating system and function, Evolution of operating system, Batch, Interactive, Time Sharing and Real Time System, System protection. Operating System Structure: System Components, System structure, Operating System Services. CPU Scheduling: Scheduling Concept, process scheduling strategies- First-Come, First-Served (FCFS) Scheduling, Shortest-Job-Next (SJN) Scheduling, Priority Scheduling, Shortest Remaining Time, Round Robin (RR) Scheduling, Multiple-Level Queues Scheduling, Performance Criteria of Scheduling Algorithm, Evolution, Multiprocessor Scheduling." },
            { num: "Unit II", topics: "Concurrent Processes: Process concept, Principle of Concurrency, Producer Consumer Problem, Critical Section problem, Semaphores, Binary and counting semaphores, P() and V() operations, Classical problems in Concurrency, Inter Process Communication, Process Generation, Process Scheduling. Deadlocks: examples of deadlock, resource concepts, necessary conditions for deadlock, deadlock solution, deadlock prevention, deadlock avoidance with Bankers algorithms, deadlock detection, deadlock recovery." },
            { num: "Unit III", topics: "Memory Organization & Management: Memory Organization, Memory Hierarchy, Memory Management Strategies, Contiguous versus non- Contiguous memory allocation, Partition Management Techniques, Logical versus Physical Address space, swapping, Paging, Segmentation, Segmentation with Paging Virtual Memory: Demand Paging, Page Replacement, Page-replacement Algorithms, Performance of Demand Paging, Thrashing, Demand Segmentation, and Overlay Concepts." },
            { num: "Unit IV", topics: "I/O Device and the organization: I/O Device and the organization of the I/O function, I/O Buffering, Disk I/O, Disk Scheduling Algorithms, File system: File Concepts, attributes, operations, File organization and Access mechanism, disk space allocation methods, Directory structure, free disk space management, File sharing, Implementation issues. Case studies: Unix system, Windows XP." }
          ]
        },
        {
          code: "IT-309",
          icon: "🌐",
          title: "Introduction to Internet of Things",
          shortDesc: "IoT Protocols, Sensor Networks, Embedded Hardware (Arduino/Raspberry Pi), and Cloud Analytics",
          units: [
            { num: "Unit I", topics: "Connected Devices, internet principles: internet communications-An overview, Physical Design of IoT, Logical Design of IoT, IoT standards, IoT generic architecture and IoT protocols. IoT future trends, Understand IoT Applications and Examples. Understand various IoT architectures based on applications. Understand different classes of sensors and actuators. Sensors: sensor terminology,sensor dynamics and specifications. Understand the basics of hardware design needed to build useful circuits using basic sensors and actuators." },
            { num: "Unit II", topics: "Communication protocols and Arduino Programming: Understand various network protocols used in IoT, Understand various communication protocols (SPI, I2C, UART). Design and develop Arduino code needed to communicate the microcontroller with sensors and actuators, build circuits using IoT supported Hardware platforms such as Arduino, ESP8266 etc., Use of software libraries with an Arduino sketch that allows a programmer to use complicated hardware without dealing with complexity, Learning IoT application programming and build solutions for real life problems and test them in Arduino and Node MCU environments. Understand various wireless Technologies for IoT and its range, frequency and applications." },
            { num: "Unit III", topics: "Fundamentals of IEEE 802.15.4, Zigbee and 6LOWPAN: Importance of IEEE 802.15.4 MAC and IEEE 802.15.4 PHY layer in constrained networks and their header format, Importance of Zigbee technology and its applications, use of IPv6 in IoT Environments, Understanding importance of IPv6 and how constrained nodes deal with bigger headers (IPv6). Understand IPv6 over LowPower WPAN (6LoWPAN) and role of 6LoWPAN in wireless sensor network. Various routing techniques in constrained network. Understanding IoT Application Layer Protocols: HTTP, CoAP Message Queuing Telemetry Transport (MeTT)." },
            { num: "Unit IV", topics: "Application areas and Real-time Case Studies: Role of big data, cloud computing and data analytics in a typical IoT system. Analyze various case studies implementing IoT in real world environment and find out the solutions of various deployment issues. Smart parking system, Smart irrigation system-block diagram, sensors, modules on Arduino and Node MCU." }
          ]
        },
        {
          code: "IT-311",
          icon: "🧠",
          title: "Fundamentals of Deep Learning",
          shortDesc: "Neural Networks, Backpropagation, CNNs, RNNs, LSTMs, and Transformers",
          units: [
            { num: "Unit I", topics: "Introduction to Deep Learning: Introduction to Deep Learning, Bayesian Learning, Overview of Shallow Machine Learning, Difference between Deep Learning and Shallow Learning, Linear Classifiers ,Loss Function and Optimization Techniques -Gradient Descent and batch optimization." },
            { num: "Unit II", topics: "Introduction to Neural Network: Introduction to Neural Network, Biological Neuron, Idea of computational units, McCulloch–Pitts unit and Thresholding logic Artificial Neural Networks: Single Layer Neural Network, Multilayer Perceptron, Back Propagation through time. Architectural Design Issues." },
            { num: "Unit III", topics: "Training deep neural networks: Difficulty of training deep neural networks, Activation Function, Evaluating, Improving and Tuning the ANN. Hyper parameters Vs Parameters, Greedy layer wise training, Recurrent Neural Networks, Long Short-Term Memory, Gated Recurrent Units, Bidirectional LSTMs, Bidirectional RNNs." },
            { num: "Unit IV", topics: "Convolutional Neural Networks: Convolutional Neural Networks, Building blocks of CNN, Transfer Learning , Pooling Layers , Convolutional Neural Network Architectures.Well known case studies: LeNet, AlexNet, VGG-16, ResNet, Inception Net.Applications in Vision, Speech, and Audio-Video." }
          ]
        },
        {
          code: "IT-313",
          icon: "📐",
          title: "Algorithm Design and Analysis",
          shortDesc: "Asymptotic Notation, Divide & Conquer, Greedy, Dynamic Programming, and NP-Completeness",
          units: [
            { num: "Unit I", topics: "Asymptotic notations for time and space complexity, Big-Oh notation, Θ notation, Ω notation, the little-oh notation, the little-omega notation, Recurrence relations: iteration method, recursion tree method, substitution method, master method (with proof), subtract and conquer master method(with proof), Data Structures for Disjoint Sets, Medians and Order statistics. Complexity analysis, Insertion sort, Merge Sort, Quick sort. Strassen's algorithm for Matrix Multiplications." },
            { num: "Unit II", topics: "Dynamic Programming: Ingredients of Dynamic Programming, emphasis on optimal substructure , overlapping substructures, memorization. Matrix Chain Multiplication, Longest common subsequence and optimal binary search trees problems, 0-1 knapsack problem, Binomial coefficient computation through dynamic programming. Floyd Warshall algorithm." },
            { num: "Unit III", topics: "Greedy Algorithms: Elements of Greedy strategy, overview of local and global optima, matroid, Activity selection problem, Fractional Knapsack problem, Huffman Codes, A task scheduling problem. Minimum Spanning Trees: Kruskal’s and Prim’s Algorithm, Single source shortest path: Dijkstra’s and Bellman Ford Algorithm(with proof of correctness of algorithms)." },
            { num: "Unit IV", topics: "String matching: The naïve String Matching algorithm, The Rabin-Karp Algorithm, String Matching with finite automata, The Knuth-Morris Pratt algorithm. NP-Complete Problem: Polynomial-time verification, NP-Completeness and Reducibility, NP-Completeness Proof, NP –hard ,Case study of NP-Complete problems (vertex cover problem, clique problem)." }
          ]
        },
        {
          code: "IT-315",
          icon: "💻",
          title: "Operating System CSE",
          shortDesc: "CPU Scheduling, Synchronization, Memory Management, and Disk Scheduling",
          units: [
            { num: "Unit I", topics: "Introduction: What is an Operating System, Simple Batch Systems, Multi-programmed Batches systems, Time Sharing Systems, Personal-computer systems, Parallel systems, Distributed Systems, Real-Time Systems, OS – A Resource Manager. Processes: Introduction, Process states, process management, Interrupts, Interprocess Communication. Threads: Introduction, Thread states, Thread Operation, Threading Models. Processor Scheduling: Scheduling levels, preemptive vs no preemptive scheduling, priorities, scheduling objective, scheduling criteria, scheduling algorithms, demand scheduling, real time scheduling." },
            { num: "Unit II", topics: "Process Synchronization: Mutual exclusion, software solution to Mutual exclusion problem, hardware solution to Mutual exclusion problem, semaphores, Critical section problems. Case study on Dining philosopher problem, Barber shop problem etc. Memory Organization & Management: Memory Organization, Memory Hierarchy, Memory Management Strategies, Contiguous versus non- Contiguous memory allocation, Partition Management Techniques, Logical versus Physical Address space, swapping, Paging, Segmentation, Segmentation with Paging Virtual Memory: Demand Paging, Page Replacement, Page-replacement Algorithms, Performance of Demand Paging, Thrashing, Demand Segmentation, and Overlay Concepts." },
            { num: "Unit III", topics: "Deadlocks: examples of deadlock, resource concepts, necessary conditions for deadlock, deadlock solution, deadlock prevention, deadlock avoidance with Bankers algorithms, deadlock detection, deadlock recovery. Device Management: Disk Scheduling Strategies, Rotational Optimization, System Consideration, Caching and Buffering." },
            { num: "Unit IV", topics: "File System: Introduction, File Organization, Logical File System, Physical File System, File Allocation strategy, Free Space Management, File Access Control, Data Access Techniques, Data Integrity Protection, Case study on file system viz FAT32, NTFS, Ext2/Ext3 etc." }
          ]
        }
      ]
    },
    6: {
      desc: "Optimize web engines, machine learning models, programming paradigms, and AI modules.",
      subjects: [
        {
          code: "IT-302",
          icon: "🌐",
          title: "Web Technologies",
          shortDesc: "HTML5, CSS3, JavaScript, Client-Server Architectures, and Web APIs",
          units: [
            { num: "Unit I", topics: "HTML: Basic Syntax, Standard HTML Document Structure, Basic Text Markup, Html styles, Elements, Attributes, Heading, Layouts, I frames Images, Hypertext Links, Lists, Tables, Forms, Dynamic HTML. CSS: Need for CSS, introduction to CSS, basic syntax and structure, using CSS, background images, colors, and properties, manipulating texts, using fonts, borders, boxes, margins, padding lists, positioning using CSS, CSS2, The Box Model, Working with XML: Document Type Definition (DTD), XML schemas, Document object model, Parsers -DOM, and SAX. Introduction to XHTML: XML, Meta tags, Character entities, frames, and frame sets." },
            { num: "Unit II", topics: "JavaScript - Client-side scripting, Introduction to JavaScript, Objects, Primitives Operations and Expressions, Control Statements, Arrays, Functions, Constructors, JavaScript, and objects, JavaScript own objects, the DOM and web browser environments, forms and validations. Introduction to JSP: The Anatomy of a JSP Page, JSP Processing, Declarations, Directives, Expressions, Code Snippets, implicit objects, Using Beans in JSP Pages, Using Cookies and session for session tracking, connecting to database in JSP." },
            { num: "Unit III", topics: "Introduction to Server-Side Development with PHP, what is Server-Side Development, A Web Server's Responsibilities, Quick Tour of PHP, Introduction and basic syntax of PHP, decision and looping with examples, PHP and HTML, Arrays, Functions, Browser control and detection, string, Form processing, Files, Advance Features: Cookies and Sessions." },
            { num: "Unit IV", topics: "PHP and MySQL: Basic commands with PHP examples, Connection to the server, creating a database, selecting a database, listing database, listing table names, creating a table, inserting data, altering tables, queries, deleting the database, deleting data, and tables, PHP my admin and database bugs. Managing State, The Problem of State in Web Applications, Passing Information via Query Strings, Passing Information via the URL Path, Cookies, Serialization, Session State." }
          ]
        },
        {
          code: "IT-304",
          icon: "🐍",
          title: "Programming in Python",
          shortDesc: "Python Fundamentals, Data Structures, OOP, Modules, and File I/O",
          units: [
            { num: "Unit I", topics: "Introduction, Python Basics: Entering Expressions into the Interactive Shell, The Integer, Floating-Point, and String Data Types, String Concatenation and Replication, Storing Values in Variables, Your First Program, Dissecting Your Program. Flow control: Boolean Values, Comparison Operators, Boolean Operators, Mixing Boolean and Comparison Operators, Elements of Flow Control, Program Execution, Flow Control Statements, Importing Modules, Ending a Program Early with sys.exit()" },
            { num: "Unit II", topics: "Functions: def Statements with Parameters, Return Values and return Statements, The None Value, Keyword Arguments and print(), Local and Global Scope, The global Statement, Exception Handling. Lists: The List Data Type, Working with Lists, Augmented Assignment Operators, Methods. Dictionaries and Structuring Data: The Dictionary Data Type, Pretty Printing, Using Data Structures to Model Real-World Things. Manipulating Strings - Working with Strings, Useful String Methods" },
            { num: "Unit III", topics: "Reading and Writing Files: Files and File Paths, The os.path Module, The File Reading/Writing Process, Saving Variables with the shelve Module, Saving Variables with the pprint.pformat() Function. Organizing Files: The shutil Module, Walking a Directory Tree, Compressing Files with the zipfile Module" },
            { num: "Unit IV", topics: "Web Scraping: Project: MAPIT.PY with the web browser Module, Downloading Files from the Web with the requests Module, Saving Downloaded Files to the Hard Drive, HTML" }
          ]
        },
        {
          code: "IT-306",
          icon: "☕",
          title: "Advanced Java Programming",
          shortDesc: "Java EE, Servlets, JSP, Hibernate, Spring Framework, and Microservices",
          units: [
            { num: "Unit I", topics: "Introduction to Java, Inheritance, Exception Handling, Multithreading, Applet Programming, Connecting to a Server, Implementing Servers, Making URL Connections, Socket Programming" },
            { num: "Unit II", topics: "Preparing a Class to be a Java Bean, Creating a Java Bean, Java Bean Properties, Types of beans, Stateful Session bean, Stateless Session bean, Entity bean, Servlet Overview and Architecture, Interface Servlet and the Servlet LifeCycle, Handling HTTP GET Requests, Handling HTTP POST Requests, Session Tracking, Cookies" },
            { num: "Unit III", topics: "JSP: Introduction, Java Server Pages Overview, Implicit Objects, Scripting, Standard Actions, Directives, Custom Tag Libraries" },
            { num: "Unit IV", topics: "The Roles of Client and Server, Remote Method Invocations, Setup for Remote Method Invocation, Parameter Passing in Remote Methods, Introduction of HB, HB Architecture" }
          ]
        },
        {
          code: "IT-308",
          icon: "🤖",
          title: "Artificial Intelligence",
          shortDesc: "Heuristic Search, Knowledge Representation, Fuzzy Logic, and Expert Systems",
          units: [
            { num: "Unit I", topics: "AI Definition, Problems, The Foundations of Artificial Intelligence, Techniques, Models, Defining Problem as a state space search, production system, Intelligent Agents: Agents and Environments, Characteristics, Search methods and issues in the design of search problems." },
            { num: "Unit II", topics: "Knowledge representation issues, mapping, frame problem. Predicate logic, facts in logic, representing instance and Isa relationship, Resolution, procedural and declarative knowledge, matching, control knowledge. Symbolic reasoning under uncertainty, Non monotonic reasoning, statistical reasoning." },
            { num: "Unit III", topics: "Game Playing, minimax search, Alfa beta cutoffs, Natural Language Processing, Learning, Explanation-based learning, discovery, analogy, Neural net learning and Genetic Learning." },
            { num: "Unit IV", topics: "Fuzzy logic systems, Perception and action, Expert systems, Inference in BayesianNetworks, K-means Clustering Algorithm, Machine learning." }
          ]
        },
        {
          code: "IT-310",
          icon: "🧠",
          title: "Machine Learning",
          shortDesc: "Supervised Learning, Neural Networks, Clustering, and Model Evaluation",
          units: [
            { num: "Unit I", topics: "Introduction: Machine learning, terminologies in machine learning, Perspectives and issues in machine learning, application of Machine learning, Types of machine learning: supervised, unsupervised, semi-supervised learning. Review of probability, Basic Linear Algebra in Machine Learning Techniques, Dataset and its types, Data preprocessing, Bias and Variance in Machine learning, Function approximation, Overfitting" },
            { num: "Unit II", topics: "Regression Analysis in Machine Learning: Introduction to regression and its terminologies, Types of regression, Logistic Regression Simple Linear regression: Introduction to Simple Linear Regression and its assumption, Simple Linear Regression Model Building,Ordinary Least square estimation, Properties of the least-squares estimators and the fitted regression model, Interval estimation in simple linear regression, Residuals Multiple Linear Regression: Multiple linear regression model and its assumption, Interpret Multiple Linear Regression Output(R-Square, Standard error, F, Significance F, Cofficient P values), Access the fit of multiple linear regression model (R squared, Standard error) Feature Selection and Dimensionality Reduction: PCA, LDA, ICA" },
            { num: "Unit III", topics: "Introduction to Classification and Classification Algorithms: What is Classification? General Approach to Classification, k-Nearest Neighbor Algorithm, Random Forests, Fuzzy Set Approaches Support Vector Machine: Introduction, Types of support vector kernel - (Linear kernel, polynomial kernel, and Gaussiankernel), Hyperplane - (Decision surface), Properties of SVM, and Issues in SVM. Decision Trees: Decision tree learning algorithm,ID-3algorithm, Inductive bias, Entropy and information theory, Information gain,Issues in Decision tree learning. Bayesian Learning - Bayes theorem, Concept learning, Bayes Optimal Classifier, Naïve Bayes classifier, Bayesian belief networks, EM algorithm Ensemble Methods: Bagging, Boosting and AdaBoost and XBoost, Classification Model Evaluation and Selection: Sensitivity, Specificity, Positive Predictive Value, Negative Predictive Value, Lift Curves and Gain Curves, ROC Curves, Misclassification Cost Adjustment to Reflect Real-World Concerns, Decision Cost/Benefit Analysis" },
            { num: "Unit IV", topics: "Introduction to Cluster Analysis and Clustering Methods: The Clustering Task and the Requirements for Cluster Analysis , Overview of Some Basic Clustering Methods :- k-Means Clustering, k-Medoids Clustering, Density-Based Clustering: DBSCAN - Density-Based Clustering Based on Connected Regions with High Density, Gaussian Mixture Model algorithm , Balance Iterative Reducing and Clustering using Hierarchies (BIRCH) , Affinity Propagation clustering algorithm,Mean-Shift clustering algorithm, ordering Points to Identify the Clustering Structure (OPTICS) algorithm, Agglomerative Hierarchy clustering algorithm, Divisive Hierarchical, Measuring Clustering Goodness" }
          ]
        },
        {
          code: "IT-312",
          icon: "⚡",
          title: "Operating System AIML",
          shortDesc: "OS Kernels, Resource Scheduling, Virtual Memory, and Parallel Execution for AI",
          units: [
            { num: "Unit I", topics: "Introduction: Operating system and function, Evolution of operating system, Batch, Interactive, Time Sharing and Real Time System, System protection. Operating System Structure: System Components, System structure, Operating System Services. CPU Scheduling: Scheduling Concept, process scheduling strategies- First-Come, First-Served (FCFS) Scheduling, Shortest-Job-Next (SJN) Scheduling, Priority Scheduling, Shortest Remaining Time, Round Robin (RR) Scheduling, Multiple-Level Queues Scheduling, Performance Criteria of Scheduling Algorithm, Evolution, Multiprocessor Scheduling." },
            { num: "Unit II", topics: "Concurrent Processes: Process concept, Principle of Concurrency, Producer Consumer Problem, Critical Section problem, Semaphores, Binary and counting semaphores, P() and V() operations, Classical problems in Concurrency, Inter Process Communication, Process Generation, Process Scheduling. Deadlocks: examples of deadlock, resource concepts, necessary conditions for deadlock, deadlock solution, deadlock prevention, deadlock avoidance with Bankers algorithms, deadlock detection, deadlock recovery." },
            { num: "Unit III", topics: "Memory Organization & Management: Memory Organization, Memory Hierarchy, Memory Management Strategies, Contiguous versus non- Contiguous memory allocation, Partition Management Techniques, Logical versus Physical Address space, swapping, Paging, Segmentation, Segmentation with Paging Virtual Memory: Demand Paging, Page Replacement, Page-replacement Algorithms, Performance of Demand Paging, Thrashing, Demand Segmentation, and Overlay Concepts." },
            { num: "Unit IV", topics: "I/O Device and the organization: I/O Device and the organization of the I/O function, I/O Buffering, Disk I/O, Disk Scheduling Algorithms, File system: File Concepts, attributes, operations, File organization and Access mechanism, disk space allocation methods, Directory structure, free disk space management, File sharing, Implementation issues. Case studies: Unix system, Windows XP." }
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
    3: ["Analog Communication", "Data Structures", "Analog Electronics-1", "Computational Methods (CSE)", "Digital Logic and Computer Design", "Signals and Systems"],
    4: ["Probability, Statistics and Linear Programming", "Network Analysis and Synthesis", "Technical Writing", "Microprocessors and Microcontrollers", "Digital Communications", "Analog Electronics-II", "Electromagnetic Field Theory"],
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
      
      // Smooth scroll to syllabus section
      const syllabusSect = document.getElementById('syllabus-section');
      if (syllabusSect) {
        syllabusSect.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
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
