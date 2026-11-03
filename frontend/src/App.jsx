import React, { useState, useEffect, useMemo } from "react";
import "./App.css";
import profileImg from "./assets/profile.png";
import { Icon } from "./components/Icons";
import {
  PERSONAL_INFO,
  WHY_HIRE_ME,
  SKILL_CATEGORIES,
  INTERNSHIPS,
  PROJECTS,
  EDUCATION,
  CERTIFICATIONS,
} from "./data/portfolioData";

export default function App() {

  // Theme toggle state (defaults to light or saved preference)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("portfolio-theme") || "light";
  });

  // Mobile navigation drawer toggle
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Avatar error fallback
  const [avatarError, setAvatarError] = useState(false);

  // Active section tracking for navbar
  const [activeSection, setActiveSection] = useState("hero");

  // Project Filter Tag
  const [projectFilter, setProjectFilter] = useState("all");

  // Skill Category Tab
  const [activeSkillCategory, setActiveSkillCategory] = useState("all");

  // Project Modal for details
  const [selectedProject, setSelectedProject] = useState(null);

  // Resume Modal
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Developer Terminal Tab State
  const [terminalTab, setTerminalTab] = useState("profile");

  // Toast Notification state
  const [toast, setToast] = useState({ show: false, message: "", type: "info" });

  // Scroll to top visibility
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Sync theme with document root & local storage
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("portfolio-theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    showToast(`Switched to ${nextTheme === "dark" ? "Dark" : "Light"} theme`, "info");
  };

  // Contact Form State
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState({
    submitting: false,
    submitted: false,
    error: null,
  });

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (mobileMenuOpen || resumeModalOpen || selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen, resumeModalOpen, selectedProject]);

  // Handle ESC key to dismiss drawer or modals
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setMobileMenuOpen(false);
        setResumeModalOpen(false);
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);

      const sections = ["hero", "about", "why-hire", "skills", "experience", "projects", "education", "contact"];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Show Toast Helper
  const showToast = (message, type = "info") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "info" });
    }, 3500);
  };

  // Copy to clipboard helper
  const handleCopy = (text, label) => {
    navigator.clipboard.writeText(text);
    showToast(`${label} copied to clipboard!`, "success");
  };

  // Filtered projects
  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return PROJECTS;
    if (projectFilter === "mern") {
      return PROJECTS.filter((p) => p.technologies.some((t) => t.toLowerCase().includes("react") && t.toLowerCase().includes("node") || t.toLowerCase().includes("mern")));
    }
    if (projectFilter === "react") {
      return PROJECTS.filter((p) => p.technologies.some((t) => t.toLowerCase().includes("react")));
    }
    if (projectFilter === "php") {
      return PROJECTS.filter((p) => p.technologies.some((t) => t.toLowerCase().includes("php")));
    }
    return PROJECTS;
  }, [projectFilter]);

  // Filtered Skills
  const visibleSkillCategories = useMemo(() => {
    if (activeSkillCategory === "all") return SKILL_CATEGORIES;
    return SKILL_CATEGORIES.filter((c) => c.id === activeSkillCategory);
  }, [activeSkillCategory]);

  // Handle Contact Form Submit
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast("Please fill in all required fields", "error");
      return;
    }

    // Basic email format check before dispatch
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email.trim())) {
      showToast("Please enter a valid email address", "error");
      return;
    }

    setFormStatus({ submitting: true, submitted: false, error: null });

    // Contact API endpoint:
    // 1. Explicit environment variable if provided
    // 2. Relative '/api/contact' which works natively on Vercel Serverless Function and Vite local proxy
    // 3. Fallback to live Render backend if hosted elsewhere
    const apiUrl = import.meta.env.VITE_API_URL 
      ? `${import.meta.env.VITE_API_URL}/api/contact`
      : "/api/contact";

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json().catch(() => null);

      if (response.ok && data?.success) {
        setFormStatus({ submitting: false, submitted: true, error: null });
        setFormData({ name: "", email: "", subject: "", message: "" });
        showToast(data.message || "Message sent successfully! Thank you for reaching out.", "success");
      } else {
        const errorMsg = data?.message || "Failed to send message. Please try again or reach out directly.";
        setFormStatus({ submitting: false, submitted: false, error: errorMsg });
        showToast(errorMsg, "error");
      }
    } catch (err) {
      console.error("Contact Form Network Error:", err);
      setFormStatus({ submitting: false, submitted: false, error: "Could not reach the server. Please check your connection." });
      showToast("Network error. Please try again or email directly.", "error");
    }
  };

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 60);
  };

  return (
    <div className="portfolio-app">
      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast-notification toast-${toast.type}`}>
          <Icon name={toast.type === "success" ? "check" : "sparkles"} size={18} />
          <span>{toast.message}</span>
        </div>
      )}

      {/* Navigation Bar */}
      <header className="navbar">
        <div className="nav-container">
          <a href="#hero" className="brand-logo" onClick={(e) => { e.preventDefault(); scrollToSection("hero"); }}>
            <span className="logo-box">P</span>
            <div className="logo-text">
              <span className="brand-name">{PERSONAL_INFO.name}</span>
              <span className="brand-tag">MERN Developer</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="desktop-nav">
            <button
              className={`nav-link ${activeSection === "hero" ? "active" : ""}`}
              onClick={() => scrollToSection("hero")}
            >
              Home
            </button>
            <button
              className={`nav-link ${activeSection === "about" ? "active" : ""}`}
              onClick={() => scrollToSection("about")}
            >
              About
            </button>
            <button
              className={`nav-link ${activeSection === "why-hire" ? "active" : ""}`}
              onClick={() => scrollToSection("why-hire")}
            >
              Why Hire Me
            </button>
            <button
              className={`nav-link ${activeSection === "skills" ? "active" : ""}`}
              onClick={() => scrollToSection("skills")}
            >
              Skills
            </button>
            <button
              className={`nav-link ${activeSection === "experience" ? "active" : ""}`}
              onClick={() => scrollToSection("experience")}
            >
              Experience
            </button>
            <button
              className={`nav-link ${activeSection === "projects" ? "active" : ""}`}
              onClick={() => scrollToSection("projects")}
            >
              Projects
            </button>
            <button
              className={`nav-link ${activeSection === "education" ? "active" : ""}`}
              onClick={() => scrollToSection("education")}
            >
              Education
            </button>
            <button
              className={`nav-link ${activeSection === "contact" ? "active" : ""}`}
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </button>
          </nav>

          {/* Actions: Resume & Mobile Menu */}
          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={toggleTheme}
              aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
            >
              <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
            </button>

            <button
              className="btn btn-primary btn-sm nav-resume-btn-mobile"
              onClick={() => setResumeModalOpen(true)}
              aria-label="View Resume"
            >
              <Icon name="download" size={14} />
              <span>Resume</span>
            </button>

            <button
              className="btn btn-outline btn-sm nav-resume-btn"
              onClick={() => setResumeModalOpen(true)}
              aria-label="View Resume"
            >
              <Icon name="download" size={15} />
              <span>Resume</span>
            </button>

            <button
              className="mobile-menu-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
            >
              <Icon name={mobileMenuOpen ? "x" : "menu"} size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer - Extracted outside navbar to prevent stacking/backdrop-filter containment */}
      <div
        className={`mobile-drawer ${mobileMenuOpen ? "open" : ""}`}
        onClick={() => setMobileMenuOpen(false)}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-drawer-content" onClick={(e) => e.stopPropagation()}>
          <div className="mobile-drawer-header">
            <div className="mobile-drawer-brand">
              <span className="logo-box">P</span>
              <div className="logo-text">
                <span className="brand-name">{PERSONAL_INFO.name}</span>
                <span className="brand-tag">MERN Developer</span>
              </div>
            </div>
            <div className="mobile-drawer-header-actions" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <button
                className="theme-toggle-btn"
                onClick={toggleTheme}
                aria-label={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
                title={`Switch to ${theme === "dark" ? "Light" : "Dark"} mode`}
              >
                <Icon name={theme === "dark" ? "sun" : "moon"} size={17} />
              </button>
              <button
                className="close-drawer-btn"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close Menu"
              >
                <Icon name="x" size={20} />
              </button>
            </div>
          </div>

          <nav className="mobile-nav-links">
            {[
              { id: "hero", label: "Home", icon: "home" },
              { id: "about", label: "About Me", icon: "user" },
              { id: "why-hire", label: "Why Hire Me (Recruiter)", icon: "sparkles" },
              { id: "skills", label: "Technical Skills", icon: "cpu" },
              { id: "experience", label: "Internships", icon: "briefcase" },
              { id: "projects", label: "Featured Projects", icon: "folder" },
              { id: "education", label: "Education & Certifications", icon: "award" },
              { id: "contact", label: "Contact", icon: "mail" },
            ].map((item) => (
              <button
                key={item.id}
                className={`mobile-nav-item ${activeSection === item.id ? "active" : ""}`}
                onClick={() => scrollToSection(item.id)}
              >
                <Icon name={item.icon} size={18} />
                <span>{item.label}</span>
              </button>
            ))}
          </nav>

          <div className="mobile-drawer-footer">
            <button
              className="btn btn-primary w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                setResumeModalOpen(true);
              }}
            >
              <Icon name="download" size={16} />
              <span>View & Download Resume</span>
            </button>

            <div className="mobile-socials">
              <a href={PERSONAL_INFO.github} target="_blank" rel="noreferrer" aria-label="GitHub">
                <Icon name="github" size={20} />
              </a>
              <a href={PERSONAL_INFO.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn">
                <Icon name="linkedin" size={20} />
              </a>
              <a
                href={`https://wa.me/916379567596?text=${encodeURIComponent("Hi Prasanna, I saw your portfolio and would like to connect!")}`}
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
              >
                <Icon name="whatsapp" size={20} />
              </a>
              <a href={`mailto:${PERSONAL_INFO.email}`} aria-label="Email">
                <Icon name="mail" size={20} />
              </a>
              <a href={`tel:${PERSONAL_INFO.phoneRaw}`} aria-label="Phone">
                <Icon name="phone" size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section id="hero" className="hero-section">
        {/* Ambient Animated Mesh Background */}
        <div className="hero-mesh-bg" aria-hidden="true">
          <div className="mesh-orb orb-1"></div>
          <div className="mesh-orb orb-2"></div>
          <div className="mesh-orb orb-3"></div>
          <div className="mesh-grid-pattern"></div>
        </div>

        <div className="container hero-container">
          {/* Left Column: Hero Content */}
          <div className="hero-content">
            {/* Top Live Badge */}
            <div className="hero-badge">
              <span className="pulsing-dot"></span>
              <span className="badge-text">Available for Full-Time & Freelance Roles</span>
              <span className="badge-arrow">→</span>
            </div>

            {/* Impact Headline */}
            <h1 className="hero-title">
              Crafting Scalable <br />
              <span className="highlight-text">Full-Stack MERN</span> <br />
              Digital Experiences.
            </h1>

            {/* Subtitle / Value Proposition */}
            <p className="hero-summary">
              Hi, I'm <strong>{PERSONAL_INFO.name}</strong>, a MERN Stack Developer specializing in high-performance React architectures, Node.js & Express REST APIs, and database engineering with MongoDB & MySQL.
            </p>

            {/* Action Buttons */}
            <div className="hero-cta-group">
              <button
                className="btn btn-primary btn-lg hero-action-btn"
                onClick={() => setResumeModalOpen(true)}
              >
                <Icon name="download" size={18} />
                <span>View & Download Resume</span>
              </button>

              <button
                className="btn btn-outline btn-lg hero-action-btn"
                onClick={() => scrollToSection("projects")}
              >
                <Icon name="sparkles" size={18} />
                <span>Explore Projects</span>
              </button>

              <button
                className="btn btn-ghost btn-lg hero-talk-btn"
                onClick={() => scrollToSection("contact")}
              >
                <Icon name="mail" size={18} />
                <span>Get in Touch</span>
              </button>
            </div>

            {/* Verified Credentials Chips */}
            <div className="hero-creds-strip">
              <div className="cred-chip">
                <span className="cred-icon">
                  <Icon name="graduation-cap" size={17} />
                </span>
                <div className="cred-text">
                  <strong>B.Tech AI & Data Science</strong>
                  <small>DSEC · CGPA 8.4</small>
                </div>
              </div>
              <div className="cred-chip">
                <span className="cred-icon">
                  <Icon name="briefcase" size={17} />
                </span>
                <div className="cred-text">
                  <strong>2 Industry Internships</strong>
                  <small>Z6 IT & NoviTech</small>
                </div>
              </div>
              <div className="cred-chip">
                <span className="cred-icon">
                  <Icon name="map-pin" size={17} />
                </span>
                <div className="cred-text">
                  <strong>{PERSONAL_INFO.location}</strong>
                  <small>Ready to Relocate</small>
                </div>
              </div>
            </div>

            {/* Social Connectivity Strip */}
            <div className="hero-meta-row">
              <span className="meta-label">Connect:</span>
              <a
                href={PERSONAL_INFO.github}
                target="_blank"
                rel="noreferrer"
                className="meta-link"
              >
                <Icon name="github" size={16} />
                <span>GitHub</span>
              </a>
              <a
                href={PERSONAL_INFO.linkedin}
                target="_blank"
                rel="noreferrer"
                className="meta-link"
              >
                <Icon name="linkedin" size={16} />
                <span>LinkedIn</span>
              </a>
              <a
                href={`https://wa.me/916379567596?text=${encodeURIComponent("Hi Prasanna, I saw your portfolio and would like to connect!")}`}
                target="_blank"
                rel="noreferrer"
                className="meta-link meta-link-whatsapp"
              >
                <Icon name="whatsapp" size={16} />
                <span>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right Column: Hero Visual Stage */}
          <div className="hero-visual">
            <div className="stage-glow"></div>
            <div className="hero-profile-card">
              {/* Profile Card Header with Live Status Tag */}
              <div className="profile-card-header">
                <div className="profile-status-pill">
                  <span className="status-live-dot"></span>
                  <span>MERN Developer</span>
                </div>
                <div className="window-dots">
                  <span className="dot red"></span>
                  <span className="dot yellow"></span>
                  <span className="dot green"></span>
                </div>
              </div>

              {/* Portrait Image Frame */}
              <div className="profile-portrait-wrap">
                {!avatarError ? (
                  <img
                    src={profileImg || PERSONAL_INFO.profileImage}
                    alt={PERSONAL_INFO.name}
                    className="profile-portrait-img"
                    onError={() => setAvatarError(true)}
                  />
                ) : (
                  <div className="profile-portrait-fallback">
                    <span>P</span>
                  </div>
                )}
                <div className="portrait-overlay-gradient"></div>
              </div>

              {/* Identity & Role Info */}
              <div className="profile-identity">
                <div className="identity-primary">
                  <h3 className="profile-name">{PERSONAL_INFO.name}</h3>
                  <span className="verified-badge" title="Verified Developer">✓</span>
                </div>
                <p className="profile-title">Full Stack Developer · React & Node</p>
              </div>

              {/* Interactive Mini Tech Deck */}
              <div className="tech-deck">
                <span className="deck-tag tag-react">
                  <Icon name="react" size={13} /> React 19
                </span>
                <span className="deck-tag tag-node">
                  <Icon name="node" size={13} /> Node.js
                </span>
                <span className="deck-tag tag-express">
                  <Icon name="zap" size={13} /> Express
                </span>
                <span className="deck-tag tag-mongo">
                  <Icon name="mongodb" size={13} /> MongoDB
                </span>
                <span className="deck-tag tag-sql">
                  <Icon name="database" size={13} /> MySQL
                </span>
              </div>

              {/* Floating Orbit Badges */}
              <div className="orbit-card orbit-left">
                <div className="orbit-icon">
                  <Icon name="zap" size={18} />
                </div>
                <div className="orbit-info">
                  <strong>15+ Projects</strong>
                  <small>Production Full Stack</small>
                </div>
              </div>

              <div className="orbit-card orbit-right">
                <div className="orbit-icon orbit-icon-star">
                  <Icon name="star" size={18} />
                </div>
                <div className="orbit-info">
                  <strong>8.4 CGPA</strong>
                  <small>AI & Data Science</small>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Live Statistics Strip */}
        <div className="hero-stats-banner">
          <div className="container stats-grid">
            {PERSONAL_INFO.stats.map((stat, idx) => (
              <div key={idx} className="stat-card">
                <div className="stat-value">{stat.value}</div>
                <div className="stat-label">{stat.label}</div>
                <div className="stat-sub">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Me Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Professional Profile</span>
            <h2 className="section-title">About</h2>
            <div className="section-title-bar"></div>
          </div>

          <div className="about-grid">
            <div className="about-text-card">
              <h3 className="about-subtitle">Full Stack Development & Engineering Foundations</h3>
              <p className="about-para">
                I am an entry-level software engineer and MERN stack developer equipped with a solid foundation in computer science and artificial intelligence from <strong>Dhanalakshmi Srinivasan Engineering College (CGPA: 8.4)</strong>.
              </p>
              <p className="about-para">
                Through hands-on internships at <strong>Z6 IT Technologies</strong> and <strong>NoviTech Info</strong>, along with developing multiple production-grade web applications, I have built real-world expertise in building modular React components, scalable Express.js backends, RESTful API endpoints, and database interactions using both MongoDB and MySQL.
              </p>

              <div className="about-highlights-grid">
                <div className="highlight-pill">
                  <Icon name="check" size={16} />
                  <span>Modular React & State Management</span>
                </div>
                <div className="highlight-pill">
                  <Icon name="check" size={16} />
                  <span>RESTful API & CRUD Architecture</span>
                </div>
                <div className="highlight-pill">
                  <Icon name="check" size={16} />
                  <span>JWT-Based Authentication</span>
                </div>
                <div className="highlight-pill">
                  <Icon name="check" size={16} />
                  <span>NoSQL (MongoDB) & Relational (MySQL)</span>
                </div>
              </div>
            </div>

            <div className="about-contact-card">
              <h3 className="about-subtitle">Quick Contact & Details</h3>
              <div className="contact-details-list">
                <div className="detail-item">
                  <span className="detail-label">Location:</span>
                  <span className="detail-value">{PERSONAL_INFO.location}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Email:</span>
                  <button
                    className="detail-copy-btn"
                    onClick={() => handleCopy(PERSONAL_INFO.email, "Email")}
                    title="Click to copy email"
                  >
                    <span>{PERSONAL_INFO.email}</span>
                    <Icon name="copy" size={14} />
                  </button>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Phone:</span>
                  <button
                    className="detail-copy-btn"
                    onClick={() => handleCopy(PERSONAL_INFO.phone, "Phone")}
                    title="Click to copy phone"
                  >
                    <span>{PERSONAL_INFO.phone}</span>
                    <Icon name="copy" size={14} />
                  </button>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Degree:</span>
                  <span className="detail-value">{EDUCATION.degree}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Availability:</span>
                  <span className="detail-value text-emerald">Immediate Joining</span>
                </div>
              </div>

              <div className="about-card-buttons">
                <button
                  className="btn btn-primary w-full"
                  onClick={() => setResumeModalOpen(true)}
                >
                  <Icon name="download" size={16} />
                  <span>Preview & Download Resume</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Hire Me / Recruiter Value Proposition Section */}
      <section id="why-hire" className="section why-hire-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Recruiter Fast-Track</span>
            <h2 className="section-title">Why Hire Prasanna P?</h2>
            <p className="section-desc">
              Proven core strengths, real-world development experience, and engineering value I deliver to your team.
            </p>
            <div className="section-title-bar"></div>
          </div>

          <div className="why-hire-grid">
            {WHY_HIRE_ME.map((item, idx) => (
              <div key={idx} className="why-hire-card">
                <div className="why-hire-header">
                  <div className="why-hire-icon-box">
                    <Icon name={item.icon} size={22} />
                  </div>
                  <span className="why-hire-badge">{item.badge}</span>
                </div>
                <h3 className="why-hire-title">{item.title}</h3>
                <p className="why-hire-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Skills Section */}
      <section id="skills" className="section skills-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Technical Competencies</span>
            <h2 className="section-title">Skills & Technologies</h2>
            <p className="section-desc">
              Core technologies and tools applied across frontend, backend, databases, and developer environments.
            </p>
            <div className="section-title-bar"></div>
          </div>

          {/* Category Tabs */}
          <div className="skill-tabs">
            <button
              className={`skill-tab-btn ${activeSkillCategory === "all" ? "active" : ""}`}
              onClick={() => setActiveSkillCategory("all")}
            >
              All Skills
            </button>
            <button
              className={`skill-tab-btn ${activeSkillCategory === "frontend" ? "active" : ""}`}
              onClick={() => setActiveSkillCategory("frontend")}
            >
              Frontend
            </button>
            <button
              className={`skill-tab-btn ${activeSkillCategory === "backend" ? "active" : ""}`}
              onClick={() => setActiveSkillCategory("backend")}
            >
              Backend & APIs
            </button>
            <button
              className={`skill-tab-btn ${activeSkillCategory === "database" ? "active" : ""}`}
              onClick={() => setActiveSkillCategory("database")}
            >
              Databases
            </button>
            <button
              className={`skill-tab-btn ${activeSkillCategory === "tools" ? "active" : ""}`}
              onClick={() => setActiveSkillCategory("tools")}
            >
              Tools & Security
            </button>
          </div>

          {/* Skills Grid */}
          <div className="skills-categories-grid">
            {visibleSkillCategories.map((cat) => (
              <div key={cat.id} className="skill-category-card">
                <div className="category-header">
                  <div className="category-icon-box">
                    <Icon name={cat.icon} size={20} />
                  </div>
                  <h3 className="category-title">{cat.title}</h3>
                </div>

                <div className="skills-list">
                  {cat.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="skill-item">
                      <div className="skill-header">
                        <span className="skill-name">{skill.name}</span>
                        <span className="skill-badge">{skill.badge}</span>
                      </div>
                      <p className="skill-desc">{skill.desc}</p>
                      <div className="skill-progress-track">
                        <div
                          className="skill-progress-bar"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Interactive Developer Terminal Showcase */}
          <div className="developer-terminal">
            <div className="terminal-header">
              <div className="terminal-dots">
                <span className="terminal-dot dot-red"></span>
                <span className="terminal-dot dot-yellow"></span>
                <span className="terminal-dot dot-green"></span>
              </div>
              <span className="terminal-title">prasanna-dev-profile.json • zsh</span>
              <button
                className="terminal-copy-btn"
                onClick={() =>
                  handleCopy(
                    JSON.stringify(
                      {
                        name: PERSONAL_INFO.name,
                        role: PERSONAL_INFO.title,
                        status: "Available for Hire (Immediate Joiner)",
                        degree: EDUCATION.degree,
                        cgpa: EDUCATION.cgpa,
                        internships: ["Z6 IT Technologies", "NoviTech Info"],
                        primaryStack: ["React 19", "Node.js", "Express.js", "MongoDB", "MySQL"],
                        contact: { email: PERSONAL_INFO.email, phone: PERSONAL_INFO.phone },
                      },
                      null,
                      2
                    ),
                    "Developer Profile JSON"
                  )
                }
              >
                <Icon name="copy" size={14} />
                <span>Copy JSON</span>
              </button>
            </div>

            <div className="terminal-tabs-row">
              <button
                className={`terminal-tab-btn ${terminalTab === "profile" ? "active" : ""}`}
                onClick={() => setTerminalTab("profile")}
              >
                candidate.json
              </button>
              <button
                className={`terminal-tab-btn ${terminalTab === "architecture" ? "active" : ""}`}
                onClick={() => setTerminalTab("architecture")}
              >
                architecture.config.js
              </button>
              <button
                className={`terminal-tab-btn ${terminalTab === "contact" ? "active" : ""}`}
                onClick={() => setTerminalTab("contact")}
              >
                recruiter-fast-track.sh
              </button>
            </div>

            <div className="terminal-body">
              {terminalTab === "profile" && (
                <pre className="terminal-code">
                  <code>
{`// prasanna.profile.json
{
  "name": "${PERSONAL_INFO.name}",
  "title": "${PERSONAL_INFO.title}",
  "status": "● Available for Full-Time / Internship Roles",
  "education": {
    "degree": "B.Tech AI & Data Science",
    "cgpa": "8.4 / 10.0",
    "graduation": "2026"
  
  "productionProjectsCount": 15,
  "readyToContribute": true
}`}
                  </code>
                </pre>
              )}

              {terminalTab === "architecture" && (
                <pre className="terminal-code">
                  <code>
{`// technical-architecture.js
export const engineeringProfile = {
  frontend: ["React.js (19)", "Hooks & State", "Component Architecture", "Responsive CSS3"],
  backend: ["Node.js", "Express.js", "RESTful Routing", "Middleware", "PHP"],
  database: ["MongoDB (Mongoose ODM)", "MySQL (Relational Tables & Joins)"],
  security: ["JWT Authentication", "CORS Configuration", "Input Sanitization"],
  tooling: ["Git / GitHub", "VS Code", "Vercel Deployment", "Postman", "XAMPP"]
};`}
                  </code>
                </pre>
              )}

              {terminalTab === "contact" && (
                <pre className="terminal-code">
                  <code>
{`# recruiter-fast-track.sh
$ curl -X GET https://api.prasanna.dev/v1/availability
> Status: 200 OK
> Candidate: Prasanna P (MERN Developer)
> Direct Email: ${PERSONAL_INFO.email}
> Phone & WhatsApp: ${PERSONAL_INFO.phone}
> Notice Period: Immediate / Ready to Join
> Location: Tamil Nadu, India (Open to Relocation / Remote)`}
                  </code>
                </pre>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Internship & Experience Section */}
      <section id="experience" className="section experience-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Work History</span>
            <h2 className="section-title">Internship Experience</h2>
            <p className="section-desc">
              Hands-on industry internships applying real-time web development and MERN full-stack architectures.
            </p>
            <div className="section-title-bar"></div>
          </div>

          <div className="timeline">
            {INTERNSHIPS.map((exp, idx) => (
              <div key={idx} className="timeline-item">
                <div className="timeline-marker">
                  <div className="timeline-dot"></div>
                  {idx !== INTERNSHIPS.length - 1 && <div className="timeline-line"></div>}
                </div>

                <div className="timeline-card">
                  <div className="timeline-card-header">
                    <div>
                      <div className="timeline-role-row">
                        <h3 className="timeline-role">{exp.role}</h3>
                        <span className="timeline-badge">{exp.badge}</span>
                      </div>
                      <h4 className="timeline-company">{exp.company}</h4>
                    </div>
                    <span className="timeline-period">{exp.period}</span>
                  </div>

                  <ul className="timeline-achievements">
                    {exp.achievements.map((item, aIdx) => (
                      <li key={aIdx}>
                        <Icon name="check" size={15} className="achievement-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="timeline-tech-tags">
                    {exp.tech.map((t, tIdx) => (
                      <span key={tIdx} className="tech-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects Section */}
      <section id="projects" className="section projects-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Portfolio Showcase</span>
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-desc">
              Full-stack applications developed with React.js, Node.js, Express, MongoDB, MySQL, and PHP.
            </p>
            <div className="section-title-bar"></div>
          </div>

          {/* Project Category Filter */}
          <div className="project-filter-bar">
            {[
              { id: "all", label: "All Projects (4)" },
              { id: "mern", label: "MERN Stack" },
              { id: "react", label: "React & Node" },
              { id: "php", label: "PHP & MySQL" },
            ].map((tab) => (
              <button
                key={tab.id}
                className={`filter-btn ${projectFilter === tab.id ? "active" : ""}`}
                onClick={() => setProjectFilter(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                <div className="project-media-box">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="project-img"
                      onError={(e) => {
                        e.target.style.display = "none";
                        e.target.nextSibling.style.display = "flex";
                      }}
                    />
                  ) : null}
                  <div
                    className="project-img-fallback"
                    style={{ display: project.image ? "none" : "flex" }}
                  >
                    <span className="fallback-emoji">
                      <Icon name={project.fallbackIcon || "code"} size={36} />
                    </span>
                    <span className="fallback-text">{project.title}</span>
                  </div>
                  <span className="project-card-badge">{project.badge}</span>
                </div>

                <div className="project-body">
                  <div className="project-category">{project.category}</div>
                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-overview">{project.overview}</p>

                  <ul className="project-bullet-list">
                    {project.bullets.slice(0, 2).map((b, bIdx) => (
                      <li key={bIdx}>
                        <span className="bullet-dot">•</span>
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="project-tags">
                    {project.technologies.map((tech, tIdx) => (
                      <span key={tIdx} className="tech-badge">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="project-card-actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-primary btn-sm"
                      >
                        <Icon name="external-link" size={15} />
                        <span>Live Demo</span>
                      </a>
                    )}

                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => setSelectedProject(project)}
                    >
                      <Icon name="sparkles" size={15} />
                      <span>Details</span>
                    </button>

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-ghost btn-icon-only"
                        title="View GitHub Repository"
                      >
                        <Icon name="github" size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Education & Certifications Section */}
      <section id="education" className="section education-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Academic & Credentials</span>
            <h2 className="section-title">Education & Certifications</h2>
            <div className="section-title-bar"></div>
          </div>

          <div className="education-grid">
            {/* Degree Card */}
            <div className="degree-card">
              <div className="degree-badge">
                <Icon name="graduation-cap" size={24} />
                <span>Undergraduate Degree</span>
              </div>
              <h3 className="degree-title">{EDUCATION.degree}</h3>
              <h4 className="institution-name">{EDUCATION.institution}</h4>
              <p className="institution-location">{EDUCATION.location}</p>

              <div className="degree-meta">
                <div className="cgpa-pill">
                  <span className="cgpa-label">Cumulative CGPA:</span>
                  <span className="cgpa-num">{EDUCATION.cgpa} / 10.0</span>
                </div>
                <div className="grad-pill">
                  <span className="grad-label">Graduation Year:</span>
                  <span className="grad-val">{EDUCATION.gradYear}</span>
                </div>
              </div>

              <p className="degree-desc">{EDUCATION.details}</p>
            </div>

            {/* Certifications Box */}
            <div className="certifications-container">
              <h3 className="certs-heading">
                <Icon name="award" size={22} />
                <span>Professional Certifications</span>
              </h3>

              <div className="certs-list">
                {CERTIFICATIONS.map((cert, cIdx) => (
                  <div key={cIdx} className="cert-card">
                    <div className="cert-icon-box">
                      <Icon name={cert.icon} size={18} />
                    </div>
                    <div className="cert-content">
                      <div className="cert-header-row">
                        <h4 className="cert-title">{cert.title}</h4>
                        <span className="cert-category-tag">{cert.category}</span>
                      </div>
                      <span className="cert-issuer">{cert.issuer}</span>
                      <p className="cert-desc">{cert.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section contact-section">
        <div className="container">
          <div className="section-header">
            <span className="section-eyebrow">Get In Touch</span>
            <h2 className="section-title">Contact & Connect</h2>
            <p className="section-desc">
              Have an open role, an exciting project, or want to connect? Send a message or reach out directly!
            </p>
            <div className="section-title-bar"></div>
          </div>

          <div className="contact-grid">
            {/* Contact Details Card */}
            <div className="contact-info-panel">
              <div className="recruiter-fast-track-box">
                <div className="fast-track-header">
                  <span className="pulsing-dot"></span>
                  <span className="fast-track-badge">Immediate Availability</span>
                </div>
                <h4 className="fast-track-title">Hiring for MERN / Software Roles?</h4>
                <p className="fast-track-desc">
                  Open to full-time or internship opportunities in Chennai, Bangalore, Hyderabad, Coimbatore, Trichy, or Remote.
                </p>
                <a
                  href={`https://wa.me/916379567596?text=${encodeURIComponent("Hi Prasanna, I saw your portfolio and would like to discuss a job opening at our company!")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary btn-sm fast-track-whatsapp-btn"
                >
                  <Icon name="whatsapp" size={16} />
                  <span>Quick WhatsApp Connect</span>
                </a>
              </div>

              <h3 className="panel-title">Let's discuss opportunities</h3>
              <p className="panel-text">
                I am actively seeking an entry-level software development role in full-stack web engineering, React.js, and Node.js development. Feel free to connect via phone, email, or LinkedIn.
              </p>

              <div className="contact-action-cards">
                <div className="contact-chip">
                  <div className="chip-icon">
                    <Icon name="mail" size={20} />
                  </div>
                  <div className="chip-info">
                    <span className="chip-label">Email Address</span>
                    <a href={`mailto:${PERSONAL_INFO.email}`} className="chip-value">
                      {PERSONAL_INFO.email}
                    </a>
                  </div>
                  <button
                    className="copy-chip-btn"
                    onClick={() => handleCopy(PERSONAL_INFO.email, "Email")}
                    title="Copy Email"
                  >
                    <Icon name="copy" size={16} />
                  </button>
                </div>

                <div className="contact-chip">
                  <div className="chip-icon">
                    <Icon name="phone" size={20} />
                  </div>
                  <div className="chip-info">
                    <span className="chip-label">Phone & WhatsApp</span>
                    <a href={`tel:${PERSONAL_INFO.phoneRaw}`} className="chip-value">
                      {PERSONAL_INFO.phone}
                    </a>
                  </div>
                  <button
                    className="copy-chip-btn"
                    onClick={() => handleCopy(PERSONAL_INFO.phone, "Phone")}
                    title="Copy Phone"
                  >
                    <Icon name="copy" size={16} />
                  </button>
                </div>

                <div className="contact-chip">
                  <div className="chip-icon">
                    <Icon name="map-pin" size={20} />
                  </div>
                  <div className="chip-info">
                    <span className="chip-label">Location</span>
                    <span className="chip-value">{PERSONAL_INFO.location}</span>
                  </div>
                </div>
              </div>

              <div className="social-links-bar">
                <a
                  href={`https://wa.me/916379567596?text=${encodeURIComponent("Hi Prasanna, I saw your portfolio and would like to connect!")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill whatsapp-pill"
                >
                  <Icon name="whatsapp" size={18} />
                  <span>WhatsApp Chat</span>
                </a>
                <a
                  href={PERSONAL_INFO.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  <Icon name="linkedin" size={18} />
                  <span>LinkedIn Profile</span>
                </a>
                <a
                  href={PERSONAL_INFO.github}
                  target="_blank"
                  rel="noreferrer"
                  className="social-pill"
                >
                  <Icon name="github" size={18} />
                  <span>GitHub Profile</span>
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form-panel">
              <form onSubmit={handleContactSubmit} className="contact-form">
                <h3 className="form-title">Send a Direct Message</h3>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name <span className="req">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. John Doe"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email Address <span className="req">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. john@example.com"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="subject" className="form-label">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. Software Engineer Opportunity"
                    className="form-input"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message" className="form-label">
                    Message <span className="req">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share your message or inquiry..."
                    className="form-textarea"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus.submitting}
                  className="btn btn-primary btn-lg w-full submit-btn"
                >
                  <Icon name="send" size={18} />
                  <span>{formStatus.submitting ? "Sending Message..." : "Send Message"}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container footer-content">
          <div className="footer-left">
            <span className="footer-brand">{PERSONAL_INFO.name}</span>
            <span className="footer-tagline">MERN Stack Developer • Portfolio 2026</span>
          </div>

          <div className="footer-links">
            <button onClick={() => scrollToSection("hero")}>Home</button>
            <button onClick={() => scrollToSection("about")}>About</button>
            <button onClick={() => scrollToSection("skills")}>Skills</button>
            <button onClick={() => scrollToSection("projects")}>Projects</button>
            <button onClick={() => scrollToSection("contact")}>Contact</button>
          </div>

          <div className="footer-right">
            <p className="copyright-text">
             
            </p>
          </div>
        </div>
      </footer>

      {/* Mobile Bottom Navigation Bar (App-like Dock) */}
      <nav className="mobile-bottom-nav" aria-label="Mobile Navigation">
        <button
          className={`mobile-bottom-nav-item ${activeSection === "hero" ? "active" : ""}`}
          onClick={() => scrollToSection("hero")}
          aria-label="Home"
        >
          <Icon name="home" size={20} />
          <span>Home</span>
        </button>
        <button
          className={`mobile-bottom-nav-item ${activeSection === "about" ? "active" : ""}`}
          onClick={() => scrollToSection("about")}
          aria-label="About"
        >
          <Icon name="user" size={20} />
          <span>About</span>
        </button>
        <button
          className={`mobile-bottom-nav-item ${activeSection === "skills" ? "active" : ""}`}
          onClick={() => scrollToSection("skills")}
          aria-label="Skills"
        >
          <Icon name="code" size={20} />
          <span>Skills</span>
        </button>
        <button
          className={`mobile-bottom-nav-item ${activeSection === "projects" || activeSection === "experience" ? "active" : ""}`}
          onClick={() => scrollToSection("projects")}
          aria-label="Projects"
        >
          <Icon name="briefcase" size={20} />
          <span>Projects</span>
        </button>
        <button
          className={`mobile-bottom-nav-item ${activeSection === "contact" ? "active" : ""}`}
          onClick={() => scrollToSection("contact")}
          aria-label="Contact"
        >
          <Icon name="send" size={20} />
          <span>Contact</span>
        </button>
      </nav>

      {/* Floating Scroll to Top */}
      {showScrollTop && (
        <button
          className="scroll-top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to Top"
        >
          <Icon name="arrow-up" size={20} />
        </button>
      )}

      {/* Project Details Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="modal-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-category">{selectedProject.category}</span>
                <h3 className="modal-title">{selectedProject.title}</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setSelectedProject(null)}
                aria-label="Close Modal"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="modal-body">
              {selectedProject.image && (
                <div className="modal-img-wrapper">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    className="modal-img"
                  />
                </div>
              )}

              <div className="modal-section">
                <h4>Project Overview</h4>
                <p>{selectedProject.overview}</p>
              </div>

              <div className="modal-section">
                <h4>Resume Key Contributions</h4>
                <ul className="modal-bullets">
                  {selectedProject.bullets.map((b, idx) => (
                    <li key={idx}>
                      <Icon name="check" size={16} />
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="modal-section">
                <h4>Key Technical Highlights</h4>
                <div className="modal-highlights">
                  {selectedProject.highlights.map((h, idx) => (
                    <span key={idx} className="highlight-tag">
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="modal-section">
                <h4>Technologies Used</h4>
                <div className="modal-tags">
                  {selectedProject.technologies.map((t, idx) => (
                    <span key={idx} className="tech-badge">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-footer">
              {selectedProject.liveUrl && (
                <a
                  href={selectedProject.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  <Icon name="external-link" size={16} />
                  <span>Open Live Application</span>
                </a>
              )}
              {selectedProject.githubUrl && (
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-outline"
                >
                  <Icon name="github" size={16} />
                  <span>GitHub Repository</span>
                </a>
              )}
              <button
                className="btn btn-ghost"
                onClick={() => setSelectedProject(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Resume Preview & Download Modal */}
      {resumeModalOpen && (
        <div className="modal-backdrop" onClick={() => setResumeModalOpen(false)}>
          <div className="modal-dialog resume-modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div>
                <span className="modal-category">Prasanna P • Resume</span>
                <h3 className="modal-title">MERN Stack Developer Resume</h3>
              </div>
              <button
                className="modal-close-btn"
                onClick={() => setResumeModalOpen(false)}
                aria-label="Close Modal"
              >
                <Icon name="x" size={20} />
              </button>
            </div>

            <div className="modal-body resume-modal-body">
              <div className="resume-embed-box">
                <iframe
                  src={`${PERSONAL_INFO.resumePdf}#toolbar=0`}
                  title="Prasanna P Resume"
                  className="resume-iframe"
                />
              </div>
            </div>

            <div className="modal-footer">
              <a
                href={PERSONAL_INFO.resumePdf}
                download="Prasanna_P_MERN_Resume.pdf"
                className="btn btn-primary"
              >
                <Icon name="download" size={16} />
                <span>Download PDF Resume</span>
              </a>
              <a
                href={PERSONAL_INFO.resumePdf}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline"
              >
                <Icon name="external-link" size={16} />
                <span>Open in New Tab</span>
              </a>
              <button
                className="btn btn-ghost"
                onClick={() => setResumeModalOpen(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
