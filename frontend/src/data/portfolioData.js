// Portfolio Data extracted directly from Prasanna P's Resume
export const PERSONAL_INFO = {
  name: "Prasanna P",
  title: "MERN Full Stack Developer",
  badge: "Entry-Level Software Developer",
  location: "Chennai, Tamil Nadu, India",
  email: "Prasanna812005@gmail.com",
  phone: "+91 6379567596",
  phoneRaw: "+916379567596",
  linkedin: "https://www.linkedin.com/in/prasanna-p20/",
  linkedinDisplay: "linkedin.com/in/prasanna-p20",
  github: "https://github.com/Prasanna-20740",
  githubDisplay: "github.com/Prasanna-20740",
  resumePdf: "/Prasanna_Resume.pdf",
  profileImage: "/images/profile.png",
  shortBio:
    "Motivated MERN Stack Developer specializing in React.js, Node.js, Express & MongoDB. Experienced with 2 industry internships building scalable web applications and RESTful APIs.",
  summary:
    "Motivated MERN Stack Developer seeking an entry-level software development opportunity to apply skills in React.js, Node.js, Express.js, MongoDB, JavaScript, HTML and CSS. Experienced through internships and projects in building responsive web interfaces, reusable React components, RESTful APIs, CRUD operations, and database-driven applications. Eager to contribute to a development team, learn industry best practices, and deliver reliable, user-friendly web solutions.",
  stats: [
    { label: "Academic CGPA", value: "8.4", sub: "B.Tech AI & Data Science" },
    { label: "Industry Internships", value: "2", sub: "Web & MERN Full Stack" },
    { label: "Production Projects", value: "15+", sub: "Live Demos Available" },
    { label: "Certifications", value: "5", sub: "TCS iON, Testing & JS" },
  ],
};

export const WHY_HIRE_ME = [
  {
    icon: "code",
    title: "Full-Stack MERN Expertise",
    badge: "End-to-End Development",
    desc: "Skilled in building modular React 19 component architectures, scalable Node.js & Express REST APIs, and database schemas with MongoDB & MySQL.",
  },
  {
    icon: "briefcase",
    title: "2 Industry Internships",
    badge: "Production Experience",
    desc: "Hands-on experience at Z6 IT Technologies and NoviTech Info delivering responsive client web pages, JWT authentication, and API integrations.",
  },
  {
    icon: "award",
    title: "Strong Academic Foundations (8.4 CGPA)",
    badge: "B.Tech AI & Data Science",
    desc: "Rigorous analytical and problem-solving skills with solid grounding in data structures, algorithms, databases, and modern software engineering.",
  },
  {
    icon: "sparkles",
    title: "Clean Code & Rapid Execution",
    badge: "Immediate Joiner",
    desc: "Passionate about writing clean, maintainable, mobile-first code using Git version control. Available immediately for full-time or internship roles.",
  },
];

export const SKILL_CATEGORIES = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: "code",
    skills: [
      { name: "React.js", level: 92, badge: "Advanced", desc: "Component Architecture, Hooks, State & Props, Virtual DOM" },
      { name: "JavaScript (ES6+)", level: 90, badge: "Advanced", desc: "Async/Await, Promises, Closures, DOM Manipulation" },
      { name: "HTML5 & CSS3", level: 95, badge: "Expert", desc: "Semantic HTML, Flexbox, CSS Grid, Media Queries" },
      { name: "Responsive Web Design", level: 94, badge: "Expert", desc: "Mobile-First Design, Fluid Layouts, Cross-Browser Compatibility" },
    ],
  },
  {
    id: "backend",
    title: "Backend Development",
    icon: "server",
    skills: [
      { name: "Node.js", level: 88, badge: "Proficient", desc: "Event-driven runtime, NPM packages, Async I/O, Server setups" },
      { name: "Express.js", level: 90, badge: "Advanced", desc: "RESTful Routing, Middleware Chains, CORS, API Architecture" },
      { name: "RESTful APIs", level: 92, badge: "Advanced", desc: "CRUD Operations, HTTP status codes, JSON payload design" },
      { name: "PHP", level: 82, badge: "Intermediate", desc: "Server-side scripting, Session management, MySQL integration" },
    ],
  },
  {
    id: "database",
    title: "Databases & Storage",
    icon: "database",
    skills: [
      { name: "MongoDB", level: 88, badge: "Proficient", desc: "NoSQL document collections, BSON, Mongoose ODM schemas" },
      { name: "MySQL", level: 86, badge: "Proficient", desc: "Relational tables, Primary & Foreign keys, Complex Queries, Joins" },
      { name: "CRUD Operations", level: 94, badge: "Expert", desc: "Robust data creation, querying, updates, and deletion logic" },
    ],
  },
  {
    id: "tools",
    title: "Tools & Environments",
    icon: "tool",
    skills: [
      { name: "Git & GitHub", level: 88, badge: "Proficient", desc: "Version control, commit branching, remote repository management" },
      { name: "VS Code", level: 95, badge: "Expert", desc: "Primary IDE, linting, debugging, productivity extensions" },
      { name: "phpMyAdmin & XAMPP", level: 88, badge: "Proficient", desc: "Local server testing, database administration, SQL dumps" },
      { name: "JWT Authentication", level: 85, badge: "Proficient", desc: "Token generation, authorization headers, route protection" },
    ],
  },
];

export const INTERNSHIPS = [
  {
    role: "Website Development Intern",
    company: "Z6 IT Technologies Private Limited",
    period: "Jul 2026 – Sep 2026",
    badge: "Recent Internship",
    tech: ["HTML5", "CSS3", "JavaScript", "Responsive Design", "Cross-Browser UI"],
    achievements: [
      "Contributed to real-time website development projects as part of the core website team.",
      "Designed responsive landing pages using HTML, CSS, JavaScript, and frontend technologies.",
      "Developed an Event Management Page with responsive UI and structured content sections.",
      "Converted UI designs into responsive layouts and reusable frontend components.",
      "Supported website content updates, layout optimization, and cross-browser compatibility.",
    ],
  },
  {
    role: "MERN Full Stack Development Intern",
    company: "NoviTech Info",
    period: "Jul 2025 – Aug 2025",
    badge: "Full Stack Internship",
    tech: ["MongoDB", "Express.js", "React.js", "Node.js", "RESTful APIs", "JWT Auth"],
    achievements: [
      "Built full-stack applications using MongoDB, Express.js, React.js, and Node.js.",
      "Developed and integrated RESTful APIs with React frontend applications.",
      "Implemented JWT-based authentication and authorization.",
      "Used MongoDB for application data storage and backend integration.",
    ],
  },
];

export const PROJECTS = [
  {
    id: "student-registration",
    title: "Student Registration System",
    category: "Full Stack MERN & MySQL",
    filterTag: "react",
    badge: "Featured Application",
    technologies: ["React.js", "Node.js", "Express.js", "MySQL", "CSS3"],
    liveUrl: "https://mern-registration-project-1nx7-theta.vercel.app",
    githubUrl: "https://github.com/Prasanna-20740",
    image: "/images/student-registration-showcase.png",
    fallbackIcon: "graduation-cap",
    overview:
      "A complete full-stack web application designed for student enrollment, record submission, and secure database persistence.",
    bullets: [
      "Created an interactive student registration form with a React frontend and Express.js backend.",
      "Connected the application directly to MySQL to store, validate, and retrieve submitted student details.",
      "Engineered responsive form components with real-time field validation, error handling, and instant feedback.",
    ],
    highlights: [
      "React Form State Management",
      "Express REST API Endpoints",
      "MySQL Relational Storage",
      "Vercel Deployment & Live Demo",
    ],
  },
  {
    id: "mern-portfolio",
    title: "Personal Portfolio Website",
    category: "MERN Stack Application",
    filterTag: "mern",
    badge: "Full Stack Portfolio",
    technologies: ["MERN Stack", "React.js", "Node.js", "Express.js", "MongoDB", "CSS3"],
    liveUrl: "https://mern-stack-portfolio-website-khaki.vercel.app",
    githubUrl: "https://github.com/Prasanna-20740",
    image: "/images/mern-portfolio-showcase.png",
    fallbackIcon: "briefcase",
    overview:
      "A high-performance modern portfolio web application showcasing projects, technical competencies, and an interactive contact system backed by MongoDB.",
    bullets: [
      "Developed a modern, responsive portfolio website using the complete MERN stack architecture.",
      "Built reusable React components and RESTful APIs with Node.js and Express.js.",
      "Integrated MongoDB for dynamic portfolio data handling and seamless contact form submission management.",
    ],
    highlights: [
      "Custom Vanilla CSS Design System",
      "RESTful Contact API Integration",
      "MongoDB Database Records",
      "100% Mobile & Desktop Responsive",
    ],
  },
  {
    id: "propflow-crm",
    title: "PropFlow CRM Portal",
    category: "Database-Driven Web Portal",
    filterTag: "php",
    badge: "Commercial CRM",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3"],
    liveUrl: "https://propflowcrm.gt.tc",
    githubUrl: "https://github.com/Prasanna-20740",
    image: "/images/propflow-crm-showcase.png",
    fallbackIcon: "server",
    overview:
      "A property management CRM portal developed to streamline real estate records, inquiries, and customer interaction logs.",
    bullets: [
      "Developed a CRM portal for managing property-related information, client leads, and real estate records.",
      "Implemented database-driven backend functionality using PHP and structured MySQL relational schemas.",
      "Optimized query performance for rapid property record retrieval and categorized filtering.",
    ],
    highlights: [
      "PHP Server-Side Architecture",
      "MySQL Relational Data Design",
      "Lead & Property Tracking",
      "Live Production Deployment",
    ],
  },
  {
    id: "daily-news",
    title: "Daily News Update & Management System",
    category: "Dynamic Content Management System",
    filterTag: "php",
    badge: "Full CMS & Portal",
    technologies: ["HTML5", "CSS3", "JavaScript", "PHP", "MySQL", "XAMPP", "phpMyAdmin"],
    liveUrl: "https://github.com/Prasanna-20740",
    githubUrl: "https://github.com/Prasanna-20740",
    image: "/images/daily-news-showcase.png",
    adminImage: "/images/daily-news-admin-clean.png",
    fallbackIcon: "file-text",
    overview:
      "A comprehensive digital news portal featuring public readership interfaces, an authenticated administrative dashboard, dynamic categorization, and multimedia publishing.",
    bullets: [
      "Developed a dynamic news website with responsive public and admin interfaces.",
      "Built admin CRUD operations for news articles, categories, images, and videos.",
      "Implemented admin authentication and role-based access control.",
      "Integrated PHP and MySQL for dynamic content publishing with user registration, login, and comment functionality.",
    ],
    highlights: [
      "Complete Admin CRUD Engine",
      "Role-Based Access Control",
      "Multimedia & Video Upload Support",
      "User Comments & Interaction Flow",
    ],
  },
];

export const EDUCATION = {
  degree: "B.Tech – Artificial Intelligence and Data Science",
  institution: "Dhanalakshmi Srinivasan Engineering College (Autonomous)",
  location: "Perambalur, Tamil Nadu",
  cgpa: "8.4",
  gradYear: "2026",
  sslc: "98%",
  hsc: "72%",
  details:
    "Comprehensive engineering curriculum blending core software engineering, modern web technologies, data structures, algorithm design, relational & NoSQL databases, and machine learning fundamentals.",
};

export const CERTIFICATIONS = [
  {
    title: "Introduction to Software Testing",
    issuer: "Technical Certification",
    category: "Quality & Testing",
    icon: "check-circle",
    desc: "Test lifecycle, test cases, defect tracking, verification & validation methodologies.",
  },
  {
    title: "TCS iON Career Edge – Young Professional",
    issuer: "Tata Consultancy Services (TCS)",
    category: "Professional Development",
    icon: "award",
    desc: "Industry readiness, business communication, presentation, IT work culture, and problem-solving.",
  },
  {
    title: "Ultimate Beginner’s JavaScript Course",
    issuer: "Learnz Development Hub",
    category: "Web Development",
    icon: "code",
    desc: "Core JavaScript engine, async programming, DOM manipulation, ES6+ features, and web scripting.",
  },
  {
    title: "Microsoft Advanced Excel",
    issuer: "Microsoft Competency",
    category: "Data & Analytics",
    icon: "file-text",
    desc: "Complex data modeling, formulas, pivot tables, statistical analysis, and spreadsheet automation.",
  },
  {
    title: "GET – Junior Grade Typewriting English",
    issuer: "Government Technical Examination",
    category: "Technical Skill",
    icon: "edit-3",
    desc: "Accredited high-speed, precision keyboard typing and technical formatting proficiency.",
  },
];
