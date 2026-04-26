import { useNavigate } from "react-router-dom";

export default function CareersPage({ jobs }) {
  const navigate = useNavigate();

  return (
    <main className="careers-page">
      <button className="back-button" onClick={() => navigate("/")}>
        ← Back
      </button>

      <header className="careers-header">
        <p className="eyebrow">Careers</p>
        <h1>Open Positions</h1>
        <p>Join us and help build the quantum internet.</p>
      </header>

      <div className="careers-list">
        {jobs.map((job) => (
          <article className="career-card" key={job.title}>
            <div className="career-head">
              <span className="job-type">{job.type}</span>
              <h2>{job.title}</h2>
              <p>{job.description}</p>
            </div>

            <div className="career-details">
              {job.details?.intro && <p>{job.details.intro}</p>}

              {job.details?.sections?.map((section) => (
                <section key={section.title}>
                  <h3>{section.title}</h3>
                  <ul>
                    {section.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </section>
              ))}

              {job.details?.closing && <p>{job.details.closing}</p>}

              <a href={job.link} className="apply-button">
                Apply via email
              </a>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
}