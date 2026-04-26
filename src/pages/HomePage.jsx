import { Link } from "react-router-dom";
import Navigation from "../components/Navigation.jsx";
import QuantumBackground from "../components/QuantumBackground.jsx";

export default function HomePage({ chapters }) {
  const scrollToSection = (id) => {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="site-page">
      <QuantumBackground />

      <div className="content-wrapper">
        <Navigation />

        {chapters.map((chapter, index) => (
          <section
            key={chapter.id}
            id={chapter.id}
            className={`section ${index === 0 ? "hero-section" : ""}`}
          >
            <div className="section-card">
              <p className="eyebrow">{chapter.eyebrow}</p>
              <h1>{chapter.title}</h1>
              <p>{chapter.body}</p>

              {index === 0 && (
                <div className="hero-actions">
                  <button onClick={() => scrollToSection("computing")}>
                    Explore technology
                  </button>

                  <button
                    className="ghost"
                    onClick={() => scrollToSection("career")}
                  >
                    Open positions
                  </button>
                </div>
              )}

              {chapter.jobs && (
                <div className="jobs">
                  {chapter.jobs.map((job) => (
                    <div className="job-card" key={job.title}>
                      <div>
                        <h3>{job.title}</h3>
                        <span>{job.type}</span>
                        <p>{job.description}</p>
                      </div>

                      <Link to="/careers">View role</Link>
                    </div>
                  ))}

                  <Link to="/careers" className="view-all-jobs">
                    View all positions →
                  </Link>
                </div>
              )}

              {chapter.founders && (
                <div className="founders">
                  {chapter.founders.map((founder) => (
                    <div className="founder-card" key={founder.name}>
                      <img src={founder.image} alt={founder.name} />
                      <h3>{founder.name}</h3>
                      <p>{founder.role}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}

        <section id="contact" className="final-section">
            <div className="final-panel">
                <h2>Contact us</h2>
                <a href="mailto:info@qmunicate.de">info@qmunicate.de</a>
                <p>A science project at the Max-Planck-Institute of Quantum Optics</p>
            </div>
            </section>

        <footer className="footer-bar">
            <div className="footer-links">
                <Link to="/impressum">Impressum</Link>
                <Link to="/datenschutz">Datenschutzerklärung</Link>
            </div>

          <p>©Urheberrecht. Alle Rechte vorbehalten.</p>
        </footer>
      </div>
    </main>
  );
}