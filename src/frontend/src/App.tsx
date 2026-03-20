import { Toaster } from "@/components/ui/sonner";
import {
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { CheckCircle, Download, Loader2 } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useActor } from "./hooks/useActor";
import { useSubmitContactMessage } from "./hooks/useQueries";
import AdminPage from "./pages/AdminPage";

// ── Portfolio page ──
function PortfolioPage() {
  const revealRefs = useRef<NodeListOf<Element> | null>(null);
  const { actor } = useActor();
  const submitMutation = useSubmitContactMessage();

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formSuccess, setFormSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            const children = e.target.querySelectorAll(
              ".skill-card, .project-card, .contact-link",
            );
            let i = 0;
            for (const child of Array.from(children)) {
              (child as HTMLElement).style.transitionDelay = `${i * 0.1}s`;
              i++;
            }
          }
        }
      },
      { threshold: 0.15 },
    );

    const els = document.querySelectorAll(".reveal");
    revealRefs.current = els;
    for (const el of Array.from(els)) {
      observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

  const handleProjectMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty("--mouse-x", `${x}px`);
    e.currentTarget.style.setProperty("--mouse-y", `${y}px`);
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!actor) {
      toast.error("Connection error. Please try again.");
      return;
    }
    try {
      await submitMutation.mutateAsync(form);
      setFormSuccess(true);
      setForm({ name: "", email: "", subject: "", message: "" });
      toast.success("Message transmitted successfully!");
    } catch (_err) {
      toast.error("Transmission failed. Please try again.");
    }
  };

  return (
    <>
      {/* Nav */}
      <nav className="portfolio-nav" data-ocid="nav.panel">
        <div className="nav-logo">
          R<span>R</span>K
        </div>
        <ul className="nav-links">
          <li>
            <a href="#about" data-ocid="nav.link">
              About
            </a>
          </li>
          <li>
            <a href="#experience" data-ocid="nav.link">
              Experience
            </a>
          </li>
          <li>
            <a href="#skills" data-ocid="nav.link">
              Skills
            </a>
          </li>
          <li>
            <a href="#projects" data-ocid="nav.link">
              Projects
            </a>
          </li>
          <li>
            <a href="#contact" data-ocid="nav.link">
              Contact
            </a>
          </li>
        </ul>
      </nav>

      {/* Hero */}
      <section
        id="hero"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "120px 60px 80px",
          position: "relative",
        }}
      >
        <div className="hero-glow" />
        <div className="hero-glow2" />

        <div className="hero-tag">Available for work</div>
        <h1 className="hero-name">
          Rohan Raj
          <br />
          <span>Kapoor</span>
        </h1>
        <p className="hero-title-text">&lt; MERN Full Stack Developer /&gt;</p>
        <p className="hero-desc">
          MCA graduate architecting scalable web applications with MongoDB,
          Express.js, React.js &amp; Node.js. I bridge the gap between complex
          backend systems and flawless user experiences.
        </p>
        <div className="hero-cta">
          <a
            href="#projects"
            className="btn btn-primary"
            data-ocid="hero.primary_button"
          >
            View Output System
          </a>
          <a
            href="#contact"
            className="btn btn-outline"
            data-ocid="hero.secondary_button"
          >
            Initialize Contact
          </a>
          <a
            href="/assets/uploads/ROHAN-RAJ-KAPOOR-FULLSTACK-1-1.pdf"
            download
            className="btn btn-download"
            data-ocid="hero.download_button"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "10px",
              padding: "16px 32px",
              borderRadius: "4px",
              fontFamily: "var(--font-mono)",
              fontSize: "0.85rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              textDecoration: "none",
              cursor: "pointer",
              background: "rgba(176,110,240,0.1)",
              color: "var(--p-accent3)",
              border: "1px solid var(--p-accent3)",
              boxShadow: "0 0 15px rgba(176,110,240,0.2)",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "var(--p-accent3)";
              (e.currentTarget as HTMLAnchorElement).style.color = "var(--bg)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 30px rgba(176,110,240,0.6)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(-3px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.background =
                "rgba(176,110,240,0.1)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--p-accent3)";
              (e.currentTarget as HTMLAnchorElement).style.boxShadow =
                "0 0 15px rgba(176,110,240,0.2)";
              (e.currentTarget as HTMLAnchorElement).style.transform =
                "translateY(0)";
            }}
          >
            <Download size={14} />
            Download Resume
          </a>
        </div>

        <div className="hero-stats">
          {[
            { num: "MCA", label: "Sharda University" },
            { num: "Full", label: "Stack Ready" },
            { num: "5+", label: "Core Techs" },
          ].map((s) => (
            <div key={s.label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "var(--p-accent2)",
                  lineHeight: 1,
                  textShadow: "0 0 15px rgba(79,200,232,0.4)",
                }}
              >
                {s.num}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.75rem",
                  color: "var(--p-text)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  marginTop: "8px",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        style={{
          padding: "120px 60px",
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div className="section-label">{"01 // Initialization"}</div>
        <h2 className="section-title reveal">Professional Outline</h2>
        <div style={{ maxWidth: "800px" }} className="reveal">
          <p
            style={{
              color: "#a0a0c0",
              fontSize: "1.15rem",
              lineHeight: 1.9,
              marginBottom: "24px",
            }}
          >
            I&apos;m a Full Stack Developer with an MCA from Sharda University
            and hands-on experience building production-ready applications. My
            stack spans{" "}
            <strong>MongoDB, Express.js, React.js &amp; Node.js.</strong>{" "}
            grounded in a solid foundation of Data Structures &amp; Algorithms,
            OOP, DBMS, and Operating Systems.
          </p>
          <p style={{ color: "#a0a0c0", fontSize: "1.15rem", lineHeight: 1.9 }}>
            I specialize in building scalable REST APIs, engineering JWT-based
            authentication systems, and crafting highly responsive UI
            components. Operating comfortably in Agile environments, I care
            deeply about clean architecture, modular coding, and optimizing
            performance across the stack.
          </p>
        </div>
      </section>

      {/* Experience */}
      <div
        id="experience"
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--p-border)",
          borderBottom: "1px solid var(--p-border)",
        }}
      >
        <div
          className="experience-inner"
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "120px 60px",
          }}
        >
          <div className="section-label">{"02 // System Logs"}</div>
          <h2 className="section-title reveal">Experience</h2>
          <div className="timeline reveal">
            <div className="timeline-item">
              <div className="timeline-dot" />
              <div className="timeline-date">07/2025 &ndash; 12/2025</div>
              <h3>Software Developer Intern</h3>
              <h4>Media City Software Inc. &mdash; Bhilwara, Rajasthan</h4>
              <ul>
                <li>
                  Developed and enhanced responsive UI components using
                  React.js, improving user engagement by 20%.
                </li>
                <li>
                  Engineered seamless integration of frontend React.js modules
                  with Python-based REST APIs, accelerating average API response
                  time by 28%.
                </li>
                <li>
                  Debugged and resolved 30+ cross-browser and functional issues,
                  ensuring 100% performance consistency.
                </li>
                <li>
                  Collaborated in Agile sprints and peer code reviews,
                  contributing to a 15% reduction in post-deployment bugs.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Skills */}
      <section
        id="skills"
        style={{
          padding: "120px 60px",
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div className="section-label">{"03 // Technical Arsenal"}</div>
        <h2 className="section-title reveal">Core Capabilities</h2>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "24px",
          }}
        >
          {[
            {
              icon: "⌨️",
              cat: "Languages",
              tags: [
                "Python",
                "JavaScript (ES6+)",
                "C",
                "C++",
                "SQL",
                "HTML5 / CSS3",
              ],
            },
            {
              icon: "🎨",
              cat: "Frontend",
              tags: [
                "React.js",
                "React Hooks",
                "Redux",
                "Tailwind CSS",
                "Bootstrap",
                "Responsive UI",
              ],
            },
            {
              icon: "⚙️",
              cat: "Backend & API",
              tags: [
                "Node.js",
                "Express.js",
                "Python (Flask)",
                "RESTful APIs",
                "JWT Auth",
              ],
            },
            {
              icon: "🗄️",
              cat: "Databases",
              tags: ["MongoDB", "MySQL", "Schema Design", "Query Optimization"],
            },
            {
              icon: "🧠",
              cat: "Computer Science",
              tags: [
                "Data Structures",
                "Algorithms",
                "OOP",
                "DBMS",
                "Operating Systems",
                "SDLC",
              ],
            },
            {
              icon: "🛠️",
              cat: "Tools & Practices",
              tags: [
                "Git / GitHub",
                "Postman",
                "Linux",
                "Agile (Scrum)",
                "Clean Code",
              ],
            },
          ].map((s) => (
            <div key={s.cat} className="skill-card reveal">
              <div className="skill-cat">
                <div className="skill-icon">{s.icon}</div>
                {s.cat}
              </div>
              <div className="skill-tags">
                {s.tags.map((t) => (
                  <span key={t} className="tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Projects */}
      <div
        id="projects"
        style={{
          background: "var(--bg2)",
          borderTop: "1px solid var(--p-border)",
        }}
      >
        <div
          className="projects-inner"
          style={{
            maxWidth: "1300px",
            margin: "0 auto",
            padding: "120px 60px",
          }}
        >
          <div className="section-label">{"04 // Executable Outputs"}</div>
          <h2 className="section-title reveal">Featured Projects</h2>
          <div
            className="projects-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
              gap: "32px",
            }}
          >
            <div
              className="project-card reveal"
              onMouseMove={handleProjectMouseMove}
              data-ocid="projects.item.1"
            >
              <div className="project-num">P_01</div>
              <div className="project-title">Qeducato</div>
              <div className="project-subtitle">Online Learning Platform</div>
              <ul className="project-desc">
                <li>
                  Built a MERN-based Single Page Application using React Hooks,
                  reducing page reload time by 40%.
                </li>
                <li>
                  Developed robust RESTful APIs using Node.js for course
                  management, registration, and delivery.
                </li>
                <li>
                  Integrated JWT-based authentication and strict role-based
                  access control for secure routes.
                </li>
                <li>
                  Implemented Redux for state management, enabling real-time UI
                  updates for 50+ concurrent users.
                </li>
              </ul>
              <div className="project-stack">
                {["React.js", "Node.js", "MongoDB", "Redux", "JWT"].map((t) => (
                  <span key={t} className="stack-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div
              className="project-card reveal"
              onMouseMove={handleProjectMouseMove}
              data-ocid="projects.item.2"
            >
              <div className="project-num">P_02</div>
              <div className="project-title">Delici</div>
              <div className="project-subtitle">Restaurant Management App</div>
              <ul className="project-desc">
                <li>
                  Engineered a full-stack order management system connecting a
                  React frontend with Flask REST APIs.
                </li>
                <li>
                  Designed a highly normalized MySQL schema handling CRUD
                  operations for orders, staff, and billing.
                </li>
                <li>
                  Automated order tracking workflows to reduce manual entry
                  errors and boost operational speed.
                </li>
                <li>
                  Utilized Postman extensively to debug and validate
                  backend-frontend data payloads.
                </li>
              </ul>
              <div className="project-stack">
                {["React.js", "Python (Flask)", "MySQL", "Postman"].map((t) => (
                  <span key={t} className="stack-tag">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Services */}
      <section
        id="services"
        style={{
          padding: "120px 60px",
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div className="section-label">{"05 // Value Proposition"}</div>
        <h2 className="section-title reveal">What I Deliver</h2>
        <table className="services-table reveal">
          <thead>
            <tr>
              <th>Module</th>
              <th>Capability</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--p-muted)",
                  }}
                >
                  01
                </span>
              </td>
              <td>
                <strong>Full-Stack Architecture</strong>
              </td>
              <td style={{ color: "#a0a0c0" }}>
                End-to-end web application development from database design to
                reactive UI.
              </td>
            </tr>
            <tr>
              <td>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--p-muted)",
                  }}
                >
                  02
                </span>
              </td>
              <td>
                <strong>API Engineering</strong>
              </td>
              <td style={{ color: "#a0a0c0" }}>
                Secure, fast, and scalable RESTful API creation using Node.js or
                Python/Flask.
              </td>
            </tr>
            <tr>
              <td>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    color: "var(--p-muted)",
                  }}
                >
                  03
                </span>
              </td>
              <td>
                <strong>Performance Optimization</strong>
              </td>
              <td style={{ color: "#a0a0c0" }}>
                Code refactoring, query tuning, and UI optimization to cut down
                load/response times.
              </td>
            </tr>
          </tbody>
        </table>
      </section>

      {/* Contact */}
      <section
        id="contact"
        style={{
          padding: "120px 60px",
          maxWidth: "1300px",
          margin: "0 auto",
          position: "relative",
        }}
      >
        <div className="section-label">{"06 // Communication Protocols"}</div>
        <h2 className="section-title reveal">Establish Connection</h2>

        {/* Contact info row */}
        <div
          className="contact-layout"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "80px",
            alignItems: "center",
            marginBottom: "80px",
          }}
        >
          <div>
            <p
              className="reveal"
              style={{ fontSize: "1.2rem", lineHeight: 1.8, color: "#a0a0c0" }}
            >
              My system is currently open to{" "}
              <span style={{ color: "var(--p-text)", fontWeight: "bold" }}>
                full-time software engineering roles
              </span>{" "}
              and innovative collaborative projects. Whether you are building
              the next big platform or need a backend optimized, my inbox is
              open. Let&apos;s build something scalable.
            </p>
          </div>
          <div
            className="contact-links reveal"
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
            }}
          >
            <a
              href="mailto:official.rohanraj17@gmail.com"
              className="contact-link"
              data-ocid="contact.link.1"
            >
              <div className="contact-link-icon">✉️</div>
              <div>
                <span className="contact-link-label">Email Ping</span>
                <span className="contact-link-value">
                  official.rohanraj17@gmail.com
                </span>
              </div>
            </a>
            <a
              href="tel:08890985510"
              className="contact-link"
              data-ocid="contact.link.2"
            >
              <div className="contact-link-icon">📞</div>
              <div>
                <span className="contact-link-label">Voice Channel</span>
                <span className="contact-link-value">+91 88909 85510</span>
              </div>
            </a>
            <a
              href="https://www.linkedin.com/in/rohanrajkapoor"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              data-ocid="contact.link.3"
            >
              <div className="contact-link-icon">💼</div>
              <div>
                <span className="contact-link-label">LinkedIn</span>
                <span className="contact-link-value">/in/rohanrajkapoor</span>
              </div>
            </a>
            <a
              href="https://github.com/rohanrajkapoor"
              target="_blank"
              rel="noreferrer"
              className="contact-link"
              data-ocid="contact.link.4"
            >
              <div className="contact-link-icon">💻</div>
              <div>
                <span className="contact-link-label">GitHub</span>
                <span className="contact-link-value">@rohanrajkapoor</span>
              </div>
            </a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="reveal">
          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--p-border)",
              borderRadius: "20px",
              padding: "48px",
              backdropFilter: "blur(16px)",
              maxWidth: "800px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Top accent line */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "3px",
                background:
                  "linear-gradient(90deg, var(--p-accent), var(--p-accent2), var(--p-accent3))",
              }}
            />

            <div className="section-label" style={{ marginBottom: "8px" }}>
              {"// Send Message"}
            </div>
            <h3
              style={{
                fontFamily: "var(--font-head)",
                fontSize: "1.8rem",
                fontWeight: 800,
                color: "var(--p-text)",
                marginBottom: "32px",
              }}
            >
              Transmit a Message
            </h3>

            <AnimatePresence mode="wait">
              {formSuccess ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  style={{ textAlign: "center", padding: "60px 20px" }}
                  data-ocid="contact.success_state"
                >
                  <CheckCircle
                    size={56}
                    style={{
                      color: "var(--p-accent)",
                      margin: "0 auto 20px",
                      display: "block",
                    }}
                  />
                  <h4
                    style={{
                      fontFamily: "var(--font-head)",
                      fontSize: "1.5rem",
                      color: "var(--p-text)",
                      marginBottom: "12px",
                    }}
                  >
                    Message Transmitted!
                  </h4>
                  <p style={{ color: "var(--p-muted)", marginBottom: "32px" }}>
                    Your message has been received. I&apos;ll get back to you
                    soon.
                  </p>
                  <button
                    type="button"
                    onClick={() => setFormSuccess(false)}
                    className="btn btn-outline"
                    data-ocid="contact.secondary_button"
                  >
                    Send Another
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleFormSubmit}
                  data-ocid="contact.panel"
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "20px",
                      marginBottom: "20px",
                    }}
                  >
                    <div>
                      <label className="form-label" htmlFor="contact-name">
                        Name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        required
                        placeholder="John Doe"
                        value={form.name}
                        onChange={handleFormChange}
                        className="cyber-input"
                        data-ocid="contact.input"
                      />
                    </div>
                    <div>
                      <label className="form-label" htmlFor="contact-email">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        required
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={handleFormChange}
                        className="cyber-input"
                        data-ocid="contact.input"
                      />
                    </div>
                  </div>
                  <div style={{ marginBottom: "20px" }}>
                    <label className="form-label" htmlFor="contact-subject">
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      required
                      placeholder="Job Opportunity / Collaboration"
                      value={form.subject}
                      onChange={handleFormChange}
                      className="cyber-input"
                      data-ocid="contact.input"
                    />
                  </div>
                  <div style={{ marginBottom: "32px" }}>
                    <label className="form-label" htmlFor="contact-message">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Tell me about your project or opportunity..."
                      value={form.message}
                      onChange={handleFormChange}
                      className="cyber-input"
                      style={{ resize: "vertical" }}
                      data-ocid="contact.textarea"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={submitMutation.isPending}
                    className="btn btn-primary"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "10px",
                    }}
                    data-ocid="contact.submit_button"
                  >
                    {submitMutation.isPending ? (
                      <>
                        <Loader2 size={14} className="animate-spin" />
                        Transmitting...
                      </>
                    ) : (
                      <>&#9654; Transmit Message</>
                    )}
                  </button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="portfolio-footer"
        style={{
          borderTop: "1px solid var(--p-border)",
          padding: "40px 60px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--bg2)",
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--p-muted)",
          }}
        >
          &copy; {new Date().getFullYear()} Rohan Raj Kapoor. All systems
          operational.
        </div>
        <div
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "var(--p-accent)",
            textShadow: "0 0 10px rgba(110,240,180,0.3)",
          }}
        >
          RR<span style={{ color: "var(--p-accent)" }}>K</span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            color: "var(--p-muted)",
          }}
        >
          Status: Ready to deploy. &nbsp;
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
            target="_blank"
            rel="noreferrer"
            style={{ color: "var(--p-accent)", textDecoration: "none" }}
          >
            Built with caffeine.ai
          </a>
        </div>
      </footer>
    </>
  );
}

// ── Router setup ──
const rootRoute = createRootRoute({
  component: () => (
    <>
      <Outlet />
      <Toaster theme="dark" />
    </>
  ),
});

const portfolioRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: PortfolioPage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminPage,
});

const routeTree = rootRoute.addChildren([portfolioRoute, adminRoute]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
