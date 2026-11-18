import { profile } from '../data/portfolio.js'

function Block({ id, title, children }) {
  return (
    <section className="block" id={id} aria-labelledby={`${id}-title`}>
      <h2 className="block-title" id={`${id}-title`}>
        {title}
      </h2>
      <div className="block-body">{children}</div>
    </section>
  )
}

export function About() {
  return (
    <Block id="about" title="About">
      {profile.about.map((p) => (
        <p className="prose" key={p}>
          {p}
        </p>
      ))}
    </Block>
  )
}

export function Skills() {
  return (
    <Block id="skills" title="Skills">
      <dl className="rows">
        {profile.skills.map(({ group, items }) => (
          <div className="row" key={group}>
            <dt>{group}</dt>
            <dd>{items.join(', ')}</dd>
          </div>
        ))}
      </dl>
    </Block>
  )
}

export function Experience() {
  return (
    <Block id="experience" title="Experience">
      <ol className="entries">
        {profile.experience.map((job) => (
          <li className="entry" key={`${job.company}-${job.role}`}>
            <header className="entry-head">
              <h3>{job.role}</h3>
              <span className="entry-meta">{job.dates}</span>
            </header>
            <p className="entry-sub">{job.company}</p>
            <ul className="bullets">
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </Block>
  )
}

export function Projects() {
  return (
    <Block id="projects" title="Projects">
      <ul className="entries">
        {profile.projects.map((p) => (
          <li className="entry" key={p.name}>
            <header className="entry-head">
              <h3>
                {p.url ? (
                  <a href={p.url} target="_blank" rel="noreferrer">
                    {p.name}
                  </a>
                ) : (
                  p.name
                )}
              </h3>
              {p.stack && <span className="entry-meta">{p.stack}</span>}
            </header>
            <p className="entry-text">{p.description}</p>
          </li>
        ))}
      </ul>
    </Block>
  )
}

export function Education() {
  return (
    <Block id="education" title="Education">
      <ul className="entries">
        {profile.education.map((e) => (
          <li className="entry" key={e.degree}>
            <header className="entry-head">
              <h3>
                {e.degree}, {e.detail}
              </h3>
            </header>
            <p className="entry-sub">{e.school}</p>
          </li>
        ))}
      </ul>
    </Block>
  )
}

export function Certifications() {
  return (
    <Block id="certifications" title="Certifications">
      <ul className="entries">
        {profile.certifications.map((c) => (
          <li className="entry" key={c.name}>
            <header className="entry-head">
              <h3>{c.name}</h3>
            </header>
            <p className="entry-sub">{c.issuer}, {c.date}</p>
          </li>
        ))}
      </ul>
    </Block>
  )
}

export function Contact() {
  return (
    <Block id="contact" title="Contact">
      <p className="prose">The quickest way to reach me is by email or text.</p>
      <dl className="rows">
        <div className="row">
          <dt>Email</dt>
          <dd>
            <a href={`mailto:${profile.email}`}>{profile.email}</a>
          </dd>
        </div>
        <div className="row">
          <dt>Phone</dt>
          <dd>
            <a href={`tel:${profile.phone}`}>{profile.phone}</a>
          </dd>
        </div>
        <div className="row">
          <dt>GitHub</dt>
          <dd>
            <a href={profile.githubUrl} target="_blank" rel="noreferrer">
              {profile.github}
            </a>
          </dd>
        </div>
        <div className="row">
          <dt>Website</dt>
          <dd>
            <a href={profile.websiteUrl} target="_blank" rel="noreferrer">
              {profile.website}
            </a>
          </dd>
        </div>
      </dl>
    </Block>
  )
}
