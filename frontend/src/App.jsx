import { useEffect, useState } from "react";
import "./App.css";

import profileImage from "./assets/profile.png.png";
import dailyNewsImage from "./assets/daily-news.png.jpg";
import registrationImage from "./assets/registration-app.png.jpg";
import portfolioImage from "./assets/mern-portfolio.png.jpg";

const skills = [
  { name: "React.js", level: "75%", type: "Frontend", icon: "⚛" },
  { name: "JavaScript", level: "80%", type: "Logic & Interactions", icon: "JS" },
  { name: "HTML5", level: "90%", type: "Semantic Structure", icon: "</>" },
  { name: "CSS3", level: "85%", type: "Responsive UI", icon: "✦" },
  { name: "Node.js", level: "70%", type: "Backend", icon: "N" },
  { name: "Express.js", level: "70%", type: "REST APIs", icon: "E" },
  { name: "MongoDB", level: "70%", type: "Database", icon: "M" },
  { name: "Git & GitHub", level: "75%", type: "Version Control", icon: "⌘" },
];

const services = [
  {
    title: "Web Development",
    text: "Responsive websites with clean layouts, smooth interactions and a strong focus on usability.",
    tag: "01 / BUILD",
    image:
      "https://wallpaperaccess.com/full/4635743.jpg",
  },
  {
    title: "React Frontend",
    text: "Component-based interfaces that are reusable, responsive and easy to maintain.",
    tag: "02 / UI",
    image:
      "https://files.ably.io/ghost/prod/2023/11/best-react-component-libraries.png",
  },
  {
    title: "Backend & APIs",
    text: "Node.js and Express.js APIs designed to connect frontend applications with real data.",
    tag: "03 / API",
    image:
      "https://cdn.prod.website-files.com/670cce27577a0eeb27e1c56b/68baa017d66d08ad06092e46_software%20development%20tools.webp",
  },
  {
    title: "Database Solutions",
    text: "MongoDB data structures for practical applications, user information and content management.",
    tag: "04 / DATA",
    image:
      "https://wallpaperaccess.com/full/6484192.jpg",
  },
];

const projects = [
  {
    number: "01",
    title: "Daily News Website",
    category: "Full-stack Web Application",
    image: dailyNewsImage,
    text: "A complete news platform with a public-facing website and an admin workflow for managing news content.",
    tech: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    github: "YOUR_DAILY_NEWS_GITHUB_LINK",
  },
  {
    number: "02",
    title: "Registration System",
    category: "MERN Application",
    image: registrationImage,
    text: "A full-stack registration application that connects a React interface with Node.js, Express.js and MongoDB.",
    tech: ["React", "Node.js", "Express", "MongoDB"],
    github: "https://github.com/Prasanna-20740/car-dealership-web-application",
  },
  {
    number: "03",
    title: "MERN Portfolio",
    category: "Personal Portfolio",
    image: portfolioImage,
    text: "A responsive portfolio designed to present development skills, projects, education and professional journey.",
    tech: ["React", "CSS", "JavaScript", "Responsive UI"],
    github: "YOUR_PORTFOLIO_GITHUB_LINK",
  },
];

const certificates = [
  {
    number: "01",
    title: "MERN Stack Development",
    provider: "Add certificate provider",
    detail: "Frontend, backend, API and database fundamentals.",
  },
  {
    number: "02",
    title: "Web Development",
    provider: "Add certificate provider",
    detail: "Responsive website development and modern UI practices.",
  },
  {
    number: "03",
    title: "JavaScript",
    provider: "Add certificate provider",
    detail: "Core JavaScript concepts, DOM and interactive web development.",
  },
];

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
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

  return (
    <div className={darkMode ? "app dark-mode" : "app"}>
      <header className={`navbar ${scrolled ? "scrolled" : ""}`}>
        <div className="navbar-glow" aria-hidden="true" />

        <a href="#home" className="brand" onClick={closeMenu} aria-label="Prasanna home">
          <span className="brand-mark-wrap">
            <span className="brand-mark">P</span>
            <span className="brand-ring" aria-hidden="true" />
          </span>
          <span className="brand-copy">
            <strong>Prasanna</strong>
            <small>DEVELOPER</small>
          </span>
        </a>

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

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          {["Home", "About", "Skills", "Services", "Projects", "Education", "Experience", "Contact"].map(
            (item, index) => (
              <a
                key={item}
                href={`#${item === "Experience" ? "internship" : item.toLowerCase()}`}
                onClick={closeMenu}
                style={{ "--nav-index": index }}
              >
                <span className="nav-link-text">{item}</span>
                <span className="nav-link-dot" aria-hidden="true" />
              </a>
            )
          )}
          <button
            className="theme-btn"
            onClick={() => setDarkMode(!darkMode)}
            aria-label="Toggle theme"
          >
            <span className="theme-icon" aria-hidden="true">{darkMode ? "☀" : "☾"}</span>
          </button>
        </nav>
      </header>

      <main>
        <section id="home" className="hero">
          <div className="hero-orb orb-one" />
          <div className="hero-orb orb-two" />

          <div className="hero-content">
            <div className="hero-text">
              <div className="availability">
                <span className="pulse-dot" />
                Available for opportunities
              </div>

              <p className="eyebrow">HELLO, I'M PRASANNA</p>
              <h1>
                I build <span>digital experiences</span> that feel simple.
              </h1>
              <p className="hero-description">
                MERN Stack Developer focused on building responsive, practical and
                user-friendly web applications with modern frontend and backend
                technologies.
              </p>

              <div className="hero-buttons">
                <a href="#projects" className="btn primary-btn">
                  Explore Projects <span>↗</span>
                </a>
                <a href="#contact" className="btn secondary-btn">
                  Let's Connect
                </a>
              </div>

              <div className="hero-stats">
                <div>
                  <strong>03+</strong>
                  <span>Projects</span>
                </div>
                <div>
                  <strong>08</strong>
                  <span>Core Skills</span>
                </div>
                <div>
                  <strong>∞</strong>
                  <span>Learning Mode</span>
                </div>
              </div>
            </div>

            <div className="profile-stage">
              <div className="profile-ring ring-one" />
              <div className="profile-ring ring-two" />
              <div className="profile-card">
                <div className="profile-top">
                  <span>PROFILE / 2026</span>
                  <span className="live-dot">● ONLINE</span>
                </div>
                <div className="profile-image-wrap">
                  <img src={profileImage} alt="Prasanna Profile" />
                </div>
                <div className="profile-bottom">
                  <div>
                    <strong>Prasanna P</strong>
                    <span>MERN Stack Developer</span>
                  </div>
                  <div className="profile-code">&lt;/&gt;</div>
                </div>
              </div>
              <div className="floating-chip chip-one">React.js</div>
              <div className="floating-chip chip-two">Node.js</div>
              <div className="floating-chip chip-three">MongoDB</div>
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
            <h2>Turning curiosity into <span>real projects.</span></h2>
          </div>

          <div className="about-layout">
            <div className="about-intro reveal">
              <p className="large-copy">
                I am a passionate web developer who enjoys transforming ideas into
                clean and functional web experiences.
              </p>
              <p>
                I learn by building. From responsive interfaces to backend APIs and
                database-driven applications, I focus on understanding how each part
                of a web application works together.
              </p>
            </div>

            <div className="about-cards">
              <article className="about-mini reveal">
                <span>01</span>
                <h3>Build</h3>
                <p>Learn through practical projects instead of only theory.</p>
              </article>
              <article className="about-mini reveal">
                <span>02</span>
                <h3>Improve</h3>
                <p>Refine UI, code quality, responsiveness and user experience.</p>
              </article>
              <article className="about-mini reveal">
                <span>03</span>
                <h3>Grow</h3>
                <p>Keep exploring tools and technologies used in real products.</p>
              </article>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills-section">
          <div className="section-heading center reveal">
            <span className="section-index">02 / SKILLS</span>
            <h2>A toolkit built for <span>full-stack work.</span></h2>
          </div>

          <div className="skills-layout">
            <div className="skills-copy reveal">
              <p className="skills-big">08</p>
              <h3>Technologies I work with</h3>
              <p>
                My current stack covers the core technologies I use to design,
                develop and connect modern web applications.
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
            <h2>What I can <span>build for you.</span></h2>
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
              <h2>Projects that show <span>how I think.</span></h2>
            </div>
            <p>
              A selection of practical applications built while learning and
              improving my development workflow.
            </p>
          </div>

          <div className="projects-grid">
            {projects.map((project) => (
              <article className="project-card reveal" key={project.number}>
                <div className="project-visual">
                  <img src={project.image} alt={project.title} loading="lazy" />
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
            <h2>From learning to <span>hands-on practice.</span></h2>
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
        <span className="eyebrow">FULL-STACK WEB DEVELOPMENT</span>
        <h3>Daily News Web Application</h3>
      </div>
      <span className="experience-status">Hands-on</span>
    </div>

    <p className="experience-description">
     Completed a 3-month offline internship, where I developed a dynamic Daily News web application with a user-friendly interface for browsing and managing news content. Implemented category-based news publishing, user authentication, comments, video content, and an admin panel using frontend and backend technologies.
    </p>

    <div className="experience-points">
      <div>
        <b>01</b>
        <span>Built responsive pages for displaying daily news, categories and detailed articles.</span>
      </div>

      <div>
        <b>02</b>
        <span>Developed an admin panel to manage news, categories, users and content.</span>
      </div>

      <div>
        <b>03</b>
        <span>Implemented user registration, login and commenting functionality with PHP and MySQL.</span>
      </div>

      <div>
        <b>04</b>
        <span>Integrated database-driven content and improved application usability through JavaScript and responsive UI design.</span>
      </div>
    </div>

    <div className="experience-tech">
      {["HTML", "CSS", "JavaScript", "PHP", "MySQL", "XAMPP"].map(
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
        <span className="eyebrow">MERN STACK DEVELOPMENT</span>
        <h3>Personal Portfolio Website</h3>
      </div>
      <span className="experience-status">Project</span>
    </div>

    <p className="experience-description">
     Developed a modern and responsive personal portfolio website using the MERN Stack to showcase my skills, projects, internship experience and professional profile. Implemented dynamic content management, reusable React components and a Node.js backend with MongoDB integration.
    </p>

    <div className="experience-points">
      <div>
        <b>01</b>
        <span>Designed a responsive and modern portfolio interface using React.js.</span>
      </div>

      <div>
        <b>02</b>
        <span>Created reusable components for skills, projects, experience and contact sections.</span>
      </div>

      <div>
        <b>03</b>
        <span>Developed backend APIs using Node.js and Express.js.</span>
      </div>

      <div>
        <b>04</b>
        <span>Integrated MongoDB for storing and managing portfolio data.</span>
      </div>
    </div>

    <div className="experience-tech">
      {["HTML", "CSS", "JavaScript", "React.js", "Node.js", "Express.js", "MongoDB"].map(
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
    <div className="experience-number">03</div>
    <p>2026</p>
  </div>

  <div className="experience-main">
    <div className="experience-title-row">
      <div>
        <span className="eyebrow">FULL-STACK WEB DEVELOPMENT</span>
        <h3>Real Estate CRM – PropFlow</h3>
      </div>
      <span className="experience-status">Project</span>
    </div>

    <p className="experience-description">
      Developed a web-based Real Estate CRM to manage properties, buildings, units, leads and sales activities through a centralized platform. Implemented property management, lead tracking, sales pipeline and database-driven features with a responsive user interface.
    </p>

    <div className="experience-points">
      <div>
        <b>01</b>
        <span>Built modules to manage properties, buildings and individual units.</span>
      </div>

      <div>
        <b>02</b>
        <span>Implemented lead management and sales pipeline tracking.</span>
      </div>

      <div>
        <b>03</b>
        <span>Developed database-driven features using PHP and MySQL.</span>
      </div>

      <div>
        <b>04</b>
        <span>Designed a responsive and user-friendly CRM interface for efficient data management.</span>
      </div>
    </div>

    <div className="experience-tech">
      {["HTML", "CSS", "JavaScript", "PHP", "MySQL", "XAMPP"].map(
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
            <h2>Have a <span>project in mind?</span></h2>
            <p>Let's turn your idea into a clean, responsive and useful web experience.</p>
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
                Looking for a developer for a web project or an entry-level
                opportunity? Feel free to reach out.
              </p>
              <div className="contact-details">
                <a href="mailto:your-email@gmail.com">
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
              <textarea name="message" placeholder="Tell me about your project..." rows="6" required />
              <button type="submit">
                Send Message <span>↗</span>
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-top">
          <a href="#home" className="footer-brand">
            <span className="brand-mark">P</span>
            Prasanna
          </a>
          <p>MERN Stack Developer · Chennai, India</p>
          <div className="footer-links">
            <a href="#home">Home</a>
            <a href="#projects">Projects</a>
            <a href="#internship">Experience</a>
            <a href="#contact">Contact</a>
          </div>
        </div>
        <div className="copyright">
          <span>© 2026 Prasanna</span>
          <span>Designed & built with React</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
