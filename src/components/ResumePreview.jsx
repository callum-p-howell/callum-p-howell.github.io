import { profile } from '../data/portfolio.js'

// A miniature of the resume, rendered from the same data the PDF uses.
// Sizes are in container units so it scales as one piece.
export default function ResumePreview() {
  const edu = profile.education[0]
  let row = 0
  const r = () => ({ '--i': row++ })

  return (
    <figure className="preview">
      <div className="paper" aria-hidden="true">
        <div className="paper-row" style={r()}>
          <div className="paper-name">{profile.name}</div>
          <div className="paper-title">{profile.title}</div>
          <div className="paper-contact">
            {[profile.location, profile.website, profile.github].join('   |   ')}
          </div>
        </div>
        <div className="paper-row" style={r()}>
          <div className="paper-h">Profile</div>
          <p className="paper-text paper-text--clamp">{profile.about.join(' ')}</p>
        </div>
        <div className="paper-row" style={r()}>
          <div className="paper-h">Skills</div>
          {profile.skills.map((s) => (
            <p className="paper-text paper-text--skill" key={s.group}>
              <b>{s.group}</b>
              <span>{s.items.join(', ')}</span>
            </p>
          ))}
        </div>
        <div className="paper-row" style={r()}>
          <div className="paper-h">Experience</div>
          {profile.experience.map((j, i) => (
            <div className={i > 0 ? 'paper-gap' : undefined} key={j.company}>
              <div className="paper-job">
                <b>{j.role}</b>
                <span>{j.dates}</span>
              </div>
              <p className="paper-text paper-text--muted">{j.company}</p>
              {j.bullets.map((b) => (
                <p className="paper-text paper-text--bullet" key={b}>
                  {b}
                </p>
              ))}
            </div>
          ))}
        </div>
        <div className="paper-row" style={r()}>
          <div className="paper-h">Education</div>
          <div className="paper-job">
            <b>
              {edu.degree}, {edu.detail}
            </b>
            <span>{edu.school}</span>
          </div>
        </div>
      </div>
      <figcaption>
        This is the page you get. It’s built from the same content as this site.
      </figcaption>
    </figure>
  )
}
