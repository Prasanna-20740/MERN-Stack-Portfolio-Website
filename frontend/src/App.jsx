import { useCallback, useEffect, useState } from "react";
import "./App.css";

const profileImage = "/images/profile.png";

const skills = [
  { name: "Manual Testing", level: "90%", type: "STLC & Test Cases", icon: "✓" },
  { name: "Selenium WebDriver", level: "80%", type: "Automation Testing", icon: "⚡" },
  { name: "API Testing (Postman)", level: "85%", type: "REST API Validation", icon: "⇄" },
  { name: "Java & JavaScript", level: "75%", type: "Test Scripting", icon: "JS" },
  { name: "SQL & DB Testing", level: "80%", type: "Data Verification", icon: "🗄" },
  { name: "JIRA & Bug Tracking", level: "85%", type: "Defect Lifecycle", icon: "🐞" },
  { name: "TestNG & Frameworks", level: "75%", type: "Test Execution", icon: "⚙" },
  { name: "Git & GitHub", level: "75%", type: "Version Control", icon: "⌘" },
];

const services = [
  {
    title: "Manual & Functional Testing",
    text: "Comprehensive test scenario planning, test case execution, regression testing, and exploratory testing across user flows.",
    tag: "01 / MANUAL",
    image: "/images/manual-testing.jpg",
  },
  {
    title: "Automation Testing",
    text: "Automated test suites using Selenium WebDriver and frameworks to accelerate regression cycles and eliminate manual overhead.",
    tag: "02 / AUTOMATION",
    image: "/images/automation-testing.jpg",
  },
  {
    title: "API & Integration Testing",
    text: "Validating RESTful endpoints, status codes, response payloads, edge cases, and data integrity using Postman.",
    tag: "03 / API",
    image: "/images/api-testing.jpg",
  },
  {
    title: "Defect Tracking & QA Reporting",
    text: "Systematic bug reporting in JIRA with reproducible steps, expected vs. actual outcomes, severity tags, and regression verification.",
    tag: "04 / QA",
    image: "/images/defect-tracking.jpg",
  },
];

const projects = [
  {
    number: "01",
    title: "Daily News Portal - QA Suite",
    category: "Manual & Automation Testing",
    images: [
      { url: "/images/daily-news-admin-clean.png", label: "Admin Workspace" },
      { url: "/images/daily-news-portal-clean.png", label: "Public Portal" },
    ],
    image: "/images/daily-news-admin-clean.png",
    text: "Comprehensive testing covering user authentication, news publishing workflows, cross-browser compatibility, and defect tracking.",
    tech: ["Selenium", "Manual Testing", "Test Cases", "Postman", "Bug Reporting"],
    github: "YOUR_DAILY_NEWS_GITHUB_LINK",
  },
  {
    number: "02",
    title: "Registration System - API & UI Testing",
    category: "Functional & API Testing",
    image: "/images/registration-app-clean.png",
    text: "End-to-end testing of user registration flows, input validation rules, boundary values, and REST API response assertions using Postman.",
    tech: ["Postman", "REST APIs", "Validation Testing", "Jira", "Black-Box QA"],
    github: "https://github.com/Prasanna-20740/car-dealership-web-application",
  },
  {
    number: "03",
    title: "Automation Testing Framework",
    category: "Automation Framework",
    image: "/images/automation-framework.jpg",
    text: "Modular test automation suite leveraging Page Object Model (POM), data-driven testing, and automated test execution reporting.",
    tech: ["Selenium", "TestNG", "Java", "POM Design", "Git"],
    github: "YOUR_PORTFOLIO_GITHUB_LINK",
  },
];

const certificates = [
  {
    number: "01",
    title: "Software Testing & QA Fundamentals",
    provider: "Add certificate provider",
    detail: "Manual testing methodologies, SDLC, STLC, test case design, and defect lifecycle.",
  },
  {
    number: "02",
    title: "Selenium Automation Testing",
    provider: "Add certificate provider",
    detail: "Web automation using Selenium WebDriver, locators, TestNG, and automated assertions.",
  },
  {
    number: "03",
    title: "API Testing with Postman",
    provider: "Add certificate provider",
    detail: "REST API testing, request collections, status validations, and environment variables.",
  },
];

const heroHeadlines = [
  {
    testId: "TC-01",
    tabLabel: "Manual QA & Precision",
    shortLabel: "Manual QA",
    command: "assert.quality(system) === 100%",
    prefix: "Ensuring",
    highlight: "software quality",
    suffix: "with precision.",
    speed: "14ms",
    statusBadge: "100% PASS",
  },
  {
    testId: "TC-02",
    tabLabel: "Selenium Automation",
    shortLabel: "Selenium",
    command: "driver.validateRegression() === PASS",
    prefix: "Automating",
    highlight: "regression test suites",
    suffix: "with Selenium.",
    speed: "28ms",
    statusBadge: "E2E VERIFIED",
  },
  {
    testId: "TC-03",
    tabLabel: "API & Zero Defects",
    shortLabel: "API Testing",
    command: "postman.checkStatus(200) && bugs === 0",
    prefix: "Delivering",
    highlight: "zero-defect releases",
    suffix: "with API & STLC.",
    speed: "19ms",
    statusBadge: "200 OK ZERO BUG",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dailyNewsView, setDailyNewsView] = useState(0);
  const [headlineIndex, setHeadlineIndex] = useState(0);
  const [animPhase, setAnimPhase] = useState("active"); // "active" | "exiting" | "entering"
  const [testStatus, setTestStatus] = useState("passed"); // "testing" | "passed"
  const [cycleKey, setCycleKey] = useState(0);

  const switchHeadline = useCallback(
    (targetIndex) => {
      if (targetIndex === headlineIndex) return;
      setAnimPhase("exiting");
      setTestStatus("testing");

      setTimeout(() => {
        setHeadlineIndex(targetIndex);
        setAnimPhase("entering");
        setCycleKey((k) => k + 1);

        setTimeout(() => {
          setAnimPhase("active");
          setTestStatus("passed");
        }, 40);
      }, 320);
    },
    [headlineIndex]
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setAnimPhase("exiting");
      setTestStatus("testing");

      setTimeout(() => {
        setHeadlineIndex((prev) => (prev + 1) % heroHeadlines.length);
        setAnimPhase("entering");

        setTimeout(() => {
          setAnimPhase("active");
          setTestStatus("passed");
        }, 40);
      }, 320);
    }, 4500);

    return () => clearInterval(timer);
  }, [cycleKey]);

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = ["home", "about", "skills", "services", "projects", "education", "internship", "contact"];
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const scrollPos = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sectionIds[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const targets = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -50px 0px" }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  const navMenuItems = ["Home", "About", "Skills", "Services", "Projects", "Education", "Experience", "Contact"];

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-glow" aria-hidden="true" />
        <div className="navbar-laser-top" aria-hidden="true" />

        <a href="#home" className="brand" onClick={closeMenu} aria-label="Prasanna home">
          <span className="brand-mark-wrap">
            <span className="brand-mark">P</span>
            <span className="brand-ring" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <strong className="brand-title">Prasanna P</strong>
            <span className="brand-role-badge">
              <span className="brand-live-dot" aria-hidden="true" />
              <span>QA ENGINEER</span>
            </span>
          </span>
        </a>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`} aria-label="Primary navigation">
          <div className="nav-capsule">
            {navMenuItems.map((item, index) => {
              const targetId = item === "Experience" ? "internship" : item.toLowerCase();
              const isActive = activeSection === targetId;
              return (
                <a
                  key={item}
                  href={`#${targetId}`}
                  onClick={closeMenu}
                  className={`nav-item ${isActive ? "active" : ""}`}
                  style={{ "--nav-index": index }}
                >
                  <span className="nav-link-text">{item}</span>
                  {isActive && <span className="nav-active-pill" aria-hidden="true" />}
                </a>
              );
            })}
          </div>

          {/* Quick Action inside Mobile Drawer */}
          <div className="mobile-drawer-footer">
            <a href="#contact" className="mobile-drawer-cta" onClick={closeMenu}>
              <span>⚡ Hire QA Specialist</span>
              <span>↗</span>
            </a>
          </div>
        </nav>

        <div className="navbar-actions">
          <a href="#contact" className="nav-cta-btn" onClick={closeMenu}>
            <span className="nav-cta-pulse" aria-hidden="true" />
            <span>Hire QA</span>
            <span className="nav-cta-arrow" aria-hidden="true">↗</span>
          </a>

          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
            title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
          >
            <span className="theme-icon" aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
          </button>

          <button
            className={`menu-toggle ${menuOpen ? "active" : ""}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="hero-content">
            <div className="hero-text">
              <div className="hero-top-badges">
                <div className="availability">
                  <span className="pulse-dot" />
                  Available for QA Opportunities
                </div>
                <div className="qa-live-pill">
                  <span className="qa-pill-icon">✓</span>
                  <span>AUTOMATED TEST SUITE: 100% PASS</span>
                  <span className="qa-ping" />
                </div>
              </div>

              <div className="qa-headline-header">
                <p className="eyebrow">HELLO, I'M PRASANNA</p>
                <div className="qa-test-runner-badge">
                  <span className={`test-pulse-dot ${testStatus}`} />
                  <span className="test-id">{heroHeadlines[headlineIndex].testId}</span>
                  <span className="test-divider">|</span>
                  <span className="test-cmd">
                    {testStatus === "testing" ? (
                      <span className="cmd-running">RUNNING: {heroHeadlines[headlineIndex].command}...</span>
                    ) : (
                      <span className="cmd-passed">✓ PASSED [{heroHeadlines[headlineIndex].speed}]</span>
                    )}
                  </span>
                </div>
              </div>

              {/* Interactive 3-Step QA Story Progress Tabs */}
              <div className="qa-story-tabs" role="tablist" aria-label="QA Testing Headlines">
                {heroHeadlines.map((item, idx) => {
                  const isActive = headlineIndex === idx;
                  return (
                    <button
                      key={item.testId}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`qa-story-tab ${isActive ? "active" : ""}`}
                      onClick={() => switchHeadline(idx)}
                      title={`Switch to ${item.tabLabel}`}
                    >
                      <div className="qa-story-progress-track">
                        <div
                          key={`${idx}-${cycleKey}`}
                          className={`qa-story-progress-bar ${isActive ? "running" : ""}`}
                        />
                      </div>
                      <div className="qa-story-tab-label">
                        <span className="qa-story-tab-num">{item.testId}</span>
                        <span className="qa-story-tab-text full-label">{item.tabLabel}</span>
                        <span className="qa-story-tab-text short-label">{item.shortLabel}</span>
                        {isActive && <span className="qa-story-tab-badge">{item.statusBadge}</span>}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* 3D Kinetic Masked Heading Viewport */}
              <div className="hero-rotator-viewport">
                <div
                  className={`hero-rotator-scan-overlay ${
                    animPhase === "exiting" ? "scanning" : ""
                  }`}
                  aria-hidden="true"
                />
                <h1
                  className={`hero-rotator ${
                    animPhase === "exiting"
                      ? "is-exiting"
                      : animPhase === "entering"
                      ? "is-entering"
                      : "is-active"
                  }`}
                >
                  <span className="qa-laser-beam" aria-hidden="true" />
                  <span className="rotator-prefix">{heroHeadlines[headlineIndex].prefix}</span>{" "}
                  <span className="hero-highlight-wave">{heroHeadlines[headlineIndex].highlight}</span>{" "}
                  <span className="rotator-suffix">{heroHeadlines[headlineIndex].suffix}</span>
                </h1>
              </div>
              <p className="hero-description">
                Software Testing Engineer focused on Manual Testing, Selenium Automation,
                API validation, and delivering reliable, bug-free web applications with
                high quality standards.
              </p>

              <div className="hero-buttons">
                <a href="#projects" className="btn primary-btn">
                  Explore Test Work <span>↗</span>
                </a>
                <a href="#contact" className="btn secondary-btn">
                  Let's Connect
                </a>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>03+</strong>
                  <span>Test Projects</span>
                </div>
                <div>
                  <strong>08</strong>
                  <span>Core QA Skills</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>Quality Focus</span>
                </div>
              </div>
            </div>

            <div className="profile-stage">
              <div className="profile-radar-sweep" />
              <div className="profile-ring ring-one" />
              <div className="profile-ring ring-two" />
              <div className="profile-card">
                <div className="profile-top">
                  <span>QA WORKSPACE / 2026</span>
                  <span className="live-dot">● ENVIRONMENT READY</span>
                </div>
                <div className="profile-image-wrap">
                  <img src={profileImage} alt="Prasanna Profile" />
                  <div className="qa-scan-overlay" />
                </div>
                <div className="profile-bottom">
                  <div>
                    <strong>Prasanna P</strong>
                    <span>Software Testing Engineer</span>
                  </div>
                  <div className="profile-code">QA</div>
                </div>
              </div>

              {/* Testing-themed animated floating chips */}
              <div className="floating-chip chip-one">
                <span className="chip-status-pass">✓</span>
                <span>Selenium · 32 Tests Passed</span>
              </div>
              <div className="floating-chip chip-two">
                <span className="chip-status-api">⚡</span>
                <span>Postman API · 200 OK</span>
              </div>
              <div className="floating-chip chip-three">
                <span className="chip-status-bug">🐞</span>
                <span>JIRA · Zero Defects</span>
              </div>
              <div className="floating-chip chip-four">
                <span className="chip-status-shield">🛡</span>
                <span>STLC Verified Build</span>
              </div>

              {/* Live Automated Test Execution HUD widget */}
              <div className="qa-test-hud">
                <div className="qa-hud-header">
                  <span className="hud-indicator" />
                  <span className="hud-title">TEST RUNNER: AUTOMATED</span>
                  <span className="hud-timer">0.12s</span>
                </div>
                <div className="hud-lines">
                  <div className="hud-line line-1">
                    <span className="hud-badge">PASS</span>
                    <span className="hud-code">test_user_auth_flow()</span>
                  </div>
                  <div className="hud-line line-2">
                    <span className="hud-badge">PASS</span>
                    <span className="hud-code">verify_api_status_200()</span>
                  </div>
                  <div className="hud-line line-3">
                    <span className="hud-badge">PASS</span>
                    <span className="hud-code">cross_browser_layout()</span>
                  </div>
                </div>
                <div className="hud-progress">
                  <div className="hud-progress-bar" />
                </div>
              </div>
            </div>
          </div>

          <a href="#about" className="scroll-cue">
            <span>SCROLL TO EXPLORE</span>
            <b>↓</b>
          </a>
        </section>

        <section id="about" className="section about-section">
          <div className="section-heading reveal">
            <span className="section-index">01 / ABOUT</span>
            <h2>Ensuring quality through <span>rigorous testing.</span></h2>
          </div>

          <div className="about-layout">
            <div className="about-intro reveal">
              <p className="large-copy">
                I am a detail-oriented Software Testing Engineer dedicated to ensuring
                software reliability, functionality, and seamless user experiences.
              </p>
              <p>
                I believe high quality is achieved through thorough testing and proactive defect detection.
                From drafting comprehensive test cases and executing manual regression runs to writing
                Selenium automation scripts and validating REST APIs, I focus on identifying issues
                before they reach production.
              </p>
            </div>

            <div className="about-cards">
              <article className="about-mini reveal">
                <span>01</span>
                <h3>Plan</h3>
                <p>Analyze requirements, identify edge cases, and design detailed test scenarios and cases.</p>
              </article>
              <article className="about-mini reveal">
                <span>02</span>
                <h3>Test</h3>
                <p>Execute functional, regression, smoke, and API testing to uncover and track defects early.</p>
              </article>
              <article className="about-mini reveal">
                <span>03</span>
                <h3>Assure</h3>
                <p>Verify bug fixes, ensure cross-browser stability, and uphold high quality standards.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-heading center reveal">
            <span className="section-index">02 / SKILLS</span>
            <h2>A toolkit built for <span>quality assurance.</span></h2>
          </div>

          <div className="skills-layout">
            <div className="skills-copy reveal">
              <p className="skills-big">08</p>
              <h3>Testing Tools & Methods</h3>
              <p>
                My testing toolkit covers manual testing methodologies, automation suites,
                API testing tools, and defect management workflows.
              </p>
            </div>

            <div className="skills-grid">
              {skills.map((skill) => (
                <article className="skill-card reveal" key={skill.name}>
                  <div className="skill-icon">{skill.icon}</div>
                  <div className="skill-info">
                    <div className="skill-name">
                      <h3>{skill.name}</h3>
                      <span>{skill.level}</span>
                    </div>
                    <p>{skill.type}</p>
                    <div className="skill-line">
                      <span style={{ width: skill.level }} />
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="services" className="section services-section">
          <div className="section-heading reveal">
            <span className="section-index">03 / SERVICES</span>
            <h2>What I can <span>test & assure.</span></h2>
          </div>

          <div className="services-grid">
            {services.map((service) => (
              <article className="service-card reveal" key={service.title}>
                <div className="service-image">
                  <img src={service.image} alt={service.title} loading="lazy" />
                  <span>{service.tag}</span>
                </div>
                <div className="service-body">
                  <div className="service-number">↗</div>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="projects" className="section projects-section">
          <div className="projects-header reveal">
            <div>
              <span className="section-index">04 / SELECTED WORK</span>
              <h2>Projects & test suites showing <span>QA precision.</span></h2>
            </div>
            <p>
              A selection of manual, automation, and API testing projects developed to validate
              application stability and performance.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.number}>
                <div className="project-visual">
                  <img
                    src={
                      project.images
                        ? project.images[dailyNewsView].url
                        : project.image
                    }
                    alt={project.title}
                    loading="lazy"
                  />
                  {project.images && project.images.length > 1 && (
                    <div className="project-view-tabs">
                      {project.images.map((imgObj, idx) => (
                        <button
                          key={imgObj.label}
                          type="button"
                          className={`project-view-tab ${dailyNewsView === idx ? "active" : ""}`}
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setDailyNewsView(idx);
                          }}
                        >
                          {imgObj.label}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="project-overlay">
                    <span>{project.category}</span>
                    <strong>{project.number}</strong>
                  </div>
                </div>
                <div className="project-content">
                  <div className="project-meta">
                    <span>{project.number}</span>
                    <span>{project.category}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.text}</p>
                  <div className="project-tech">
                    {project.tech.map((tech) => (
                      <span key={tech}>{tech}</span>
                    ))}
                  </div>
                  <div className="project-buttons">
                    <a href="#contact" className="project-btn">
                      Discuss Project ↗
                    </a>
                    {project.github.startsWith("http") && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                      >
                        GitHub ↗
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="education" className="section education-section">
          <div className="section-heading center reveal">
            <span className="section-index">05 / EDUCATION</span>
            <h2>The foundation behind <span>the journey.</span></h2>
          </div>

          <div className="education-grid">
            <article className="education-card reveal">
              <span className="edu-year">2022 — 2026</span>
              <div className="edu-icon">EDU</div>
              <h3>B.Tech in Artificial Intelligence & Data Science</h3>
              <p><b>Dhanalakshmi Srinivasan Engineering college (Autonomous),<br></br> Perambalur-621 212.</b></p>
              <p>CGPA - 8.4</p>
            </article>
            <article className="education-card reveal">
              <span className="edu-year">2021 — 2022</span>
              <div className="edu-icon">HSC</div>
              <h3>State Board Of School Examination,Tamil Nadu</h3>
              <p><b>Sri Gnanaguru Vidyalaya Matriculation Higher Secondary School Tittagudi,Cuddalore-606 106.</b></p>
              <p>HSC - 71.83%</p>
            </article>
             
            
          </div>
        </section>

        <section id="certifications" className="section certification-section">
          <div className="section-heading reveal">
            <span className="section-index">06 / CERTIFICATIONS</span>
            <h2>Proof of <span>continuous learning.</span></h2>
          </div>

          <div className="certification-grid">
            {certificates.map((certificate) => (
              <article className="certificate-card reveal" key={certificate.number}>
                <div className="certificate-top">
                  <span>0{certificate.number.replace("0", "")}</span>
                  <span>VERIFIED LEARNING</span>
                </div>
                <div className="certificate-seal">✓</div>
                <h3>{certificate.title}</h3>
                <p>{certificate.provider}</p>
                <span className="certificate-detail">{certificate.detail}</span>
                <a href="#contact">View Certificate ↗</a>
              </article>
            ))}
          </div>
        </section>

        <section id="internship" className="section experience-section">
          <div className="section-heading center reveal">
            <span className="section-index">07 / EXPERIENCE</span>
            <h2>From testing concepts to <span>hands-on QA.</span></h2>
          </div>
{/* Experience / Internship 01 */}
<div className="experience-panel reveal">
  <div className="experience-side">
    <span className="experience-label">
      INTERNSHIP / PRACTICAL EXPERIENCE
    </span>
    <div className="experience-number">01</div>
    <p>2026</p>
  </div>

  <div className="experience-main">
    <div className="experience-title-row">
      <div>
        
        <h3>Z6 IT Technologies Pvt. Ltd. — Chennai</h3>
        <br></br>
        <span className="eyebrow">SOFTWARE TESTING & QA INTERNSHIP</span>
        <h3>Daily News Web Application – QA & Testing</h3>
      </div>
      <span className="experience-status">Hands-on</span>
    </div>

    <p className="experience-description">
     Completed a 3-month offline internship focused on manual and functional testing of the Daily News web application. Designed and executed comprehensive test cases, conducted regression testing, performed cross-browser testing, and reported defects to ensure smooth performance across news browsing and admin workflows.
    </p>

    <div className="experience-points">
      <div>
        <b>01</b>
        <span>Created detailed test scenarios and test cases covering user authentication, news publishing, and comments.</span>
      </div>

      <div>
        <b>02</b>
        <span>Conducted functional, smoke, and regression testing across various browsers and screen resolutions.</span>
      </div>

      <div>
        <b>03</b>
        <span>Identified, logged, and tracked functional defects with detailed reproduction steps and severity ratings.</span>
      </div>

      <div>
        <b>04</b>
        <span>Verified database records and backend updates using MySQL queries to confirm data integrity and accuracy.</span>
      </div>
    </div>

    <div className="experience-tech">
      {["Manual Testing", "Test Cases", "STLC", "Regression Testing", "MySQL", "Bug Tracking"].map(
        (item) => (
          <span key={item}>{item}</span>
        )
      )}
    </div>
  </div>
</div>

<br></br>

{/* Project / Practical Experience 02 */}
<div className="experience-panel reveal">
  <div className="experience-side">
    <span className="experience-label">
      PROJECT / PRACTICAL EXPERIENCE
    </span>
    <div className="experience-number">02</div>
    <p>2026</p>
  </div>

  <div className="experience-main">
    <div className="experience-title-row">
      <div>
        <span className="eyebrow">QA AUTOMATION & WEB TESTING</span>
        <h3>Web Application Test Automation Suite</h3>
      </div>
      <span className="experience-status">Project</span>
    </div>

    <p className="experience-description">
     Designed and implemented automated test suites for web applications using Selenium WebDriver. Automated repetitive regression test flows, validated responsive UI layouts, and ensured stable user journeys across key features.
    </p>

    <div className="experience-points">
      <div>
        <b>01</b>
        <span>Developed automated test scripts using Selenium WebDriver to validate critical user navigation and input forms.</span>
      </div>

      <div>
        <b>02</b>
        <span>Conducted cross-browser and responsive testing to guarantee UI consistency across various viewports.</span>
      </div>

      <div>
        <b>03</b>
        <span>Designed positive and negative test cases for form validation, edge cases, and boundary values.</span>
      </div>

      <div>
        <b>04</b>
        <span>Executed end-to-end regression and smoke test cycles prior to release deployment.</span>
      </div>
    </div>

    <div className="experience-tech">
      {["Selenium WebDriver", "Java", "TestNG", "Manual Testing", "Cross-Browser Testing"].map(
        (item) => (
          <span key={item}>{item}</span>
        )
      )}
    </div>
  </div>
</div>

<br></br>


{/* Project / Practical Experience 03 */}
<div className="experience-panel reveal">
  <div className="experience-side">
    <span className="experience-label">
      PROJECT / PRACTICAL EXPERIENCE
    </span>
    <div className="experience-number">03</div>
    <p>2026</p>
  </div>

  <div className="experience-main">
    <div className="experience-title-row">
      <div>
        <span className="eyebrow">FUNCTIONAL & DATABASE TESTING</span>
        <h3>Real Estate CRM (PropFlow) – QA & Testing</h3>
      </div>
      <span className="experience-status">Project</span>
    </div>

    <p className="experience-description">
      Performed end-to-end testing of the Real Estate CRM system, ensuring reliability of modules for property listings, lead management, and user permissions. Validated database integrity and verified business workflows.
    </p>

    <div className="experience-points">
      <div>
        <b>01</b>
        <span>Tested core CRM modules including property listings, unit management, and lead pipeline tracking.</span>
      </div>

      <div>
        <b>02</b>
        <span>Executed database testing using SQL queries to verify data consistency, transactions, and relations.</span>
      </div>

      <div>
        <b>03</b>
        <span>Validated role-based access control and user permission boundaries across admin and agent roles.</span>
      </div>

      <div>
        <b>04</b>
        <span>Collaborated on defect resolution, conducted retesting, and verified fixes for resolved issues.</span>
      </div>
    </div>

    <div className="experience-tech">
      {["Functional Testing", "SQL / Database Testing", "Jira", "STLC", "Test Execution"].map(
        (item) => (
          <span key={item}>{item}</span>
        )
      )}
    </div>
  </div>
</div>

        </section>

        <section className="resume-section">
          <div className="resume-glow" />
          <div className="resume-content reveal">
            <span className="section-index">LET'S WORK TOGETHER</span>
            <h2>Looking for a <span>dedicated QA tester?</span></h2>
            <p>Let's collaborate to ensure your software applications are reliable, bug-free, and high quality.</p>
          </div>
          <a href="/Prasanna_Resume.pdf" download="Prasanna_Resume.pdf" className="resume-btn reveal">
            Download Resume <span>↓</span>
          </a>
        </section>

        <section id="contact" className="section contact-section">
          <div className="section-heading reveal">
            <span className="section-index">08 / CONTACT</span>
            <h2>Let's start a <span>conversation.</span></h2>
          </div>

          <div className="contact-content">
            <div className="contact-info reveal">
              <p className="contact-lead">
                Looking for a Software Testing Engineer / QA Specialist for your
                team or an entry-level opportunity? Feel free to reach out.
              </p>
              <div className="contact-details">
                <a href="mailto:prasanna812005@gmail.com">
                  <span>Email</span>
                  prasanna812005@gmail.com
                </a>
                <div>
                  <span>Location</span>
                  Chennai, Tamil Nadu, India
                </div>
              </div>
              <div className="contact-socials">
                <a href="https://github.com/Prasanna-20740" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
                <a href="https://www.linkedin.com/in/prasanna-p-236156281/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
              </div>
            </div>

            <form
              className="contact-form reveal"
              onSubmit={async (e) => {
                e.preventDefault();
                const formData = new FormData(e.target);
                const data = {
                  name: formData.get("name"),
                  email: formData.get("email"),
                  subject: formData.get("subject"),
                  message: formData.get("message"),
                };

                try {
  const response = await fetch("https://mern-stack-portfolio-website.onrender.com/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
                  const result = await response.json();
                  if (result.success) {
                    alert("Message sent successfully!");
                    e.target.reset();
                  } else {
                    alert("Failed to send message");
                  }
                } catch (error) {
                  console.log(error);
                  alert("Server connection failed");
                }
              }}
            >
              <div className="form-row">
                <input name="name" type="text" placeholder="Your Name" required />
                <input name="email" type="email" placeholder="Your Email" required />
              </div>
              <input name="subject" type="text" placeholder="Subject" required />
              <textarea name="message" placeholder="Tell me about your testing requirements or role..." rows="6" required />
              <button type="submit">
                Send Message <span>↗</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-main-grid">
            {/* Column 1: Brand & Profile */}
            <div className="footer-col footer-col-brand">
              <a href="#home" className="footer-brand">
                <span className="brand-mark">P</span>
                Prasanna
              </a>
              <p className="footer-tagline">
                Software Testing Engineer dedicated to Manual QA, Selenium Automation, API Verification, and Defect Lifecycle Management.
              </p>
              <div className="footer-status-pill">
                <span className="status-dot" />
                <span>Open for QA & Testing Opportunities · Chennai, India</span>
              </div>
            </div>

            {/* Column 2: Navigation */}
            <div className="footer-col footer-col-nav">
              <h4 className="footer-col-title">Navigation</h4>
              <ul className="footer-nav-list">
                <li><a href="#home">Home</a></li>
                <li><a href="#skills">Skills & Tools</a></li>
                <li><a href="#services">QA Services</a></li>
                <li><a href="#projects">Testing Projects</a></li>
                <li><a href="#internship">Experience</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            {/* Column 3: Profiles & Connect */}
            <div className="footer-col footer-col-social">
              <h4 className="footer-col-title">Connect & Profiles</h4>
              <div className="footer-social-grid">
                <a
                  href="https://github.com/Prasanna-20740"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="footer-social-card"
                >
                  <span className="social-icon-box">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </span>
                  <div className="social-card-info">
                    <span className="social-card-label">GitHub</span>
                    <span className="social-card-detail">@Prasanna-20740</span>
                  </div>
                  <span className="social-card-arrow">↗</span>
                </a>

                <a
                  href="https://www.linkedin.com/in/prasanna-p-236156281/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="footer-social-card"
                >
                  <span className="social-icon-box">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.64 1.64 0 1 0 0-3.28 1.64 1.64 0 0 0 0 3.28m1.4 9.74v-8.37H5.06v8.37h2.8z" />
                    </svg>
                  </span>
                  <div className="social-card-info">
                    <span className="social-card-label">LinkedIn</span>
                    <span className="social-card-detail">Prasanna P</span>
                  </div>
                  <span className="social-card-arrow">↗</span>
                </a>

                <a
                  href="https://www.instagram.com/_.prasana._pv20/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="footer-social-card"
                >
                  <span className="social-icon-box">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                    </svg>
                  </span>
                  <div className="social-card-info">
                    <span className="social-card-label">Instagram</span>
                    <span className="social-card-detail">@_.prasana._pv20</span>
                  </div>
                  <span className="social-card-arrow">↗</span>
                </a>

                <a
                  href="mailto:prasanna812005@gmail.com"
                  aria-label="Email"
                  className="footer-social-card"
                >
                  <span className="social-icon-box">
                    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </span>
                  <div className="social-card-info">
                    <span className="social-card-label">Email</span>
                    <span className="social-card-detail">prasanna812005@gmail.com</span>
                  </div>
                  <span className="social-card-arrow">↗</span>
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <span>© 2026 Prasanna · Software Testing & QA Engineer</span>
            <span className="footer-bottom-tagline">Quality Assurance & Automation Testing Portfolio</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
