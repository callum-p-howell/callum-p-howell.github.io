import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio.js'

export default function ResumePreview() {
  const [state, setState] = useState('idle')
  const [note, setNote] = useState('')
  const timer = useRef(null)

  useEffect(() => () => clearTimeout(timer.current), [])

  async function obtain() {
    if (state === 'working') return
    setState('working')
    setNote('')
    try {
      const { downloadResume, resumeFileName } = await import('../utils/resumePdf.js')
      const result = downloadResume(profile)
      setState('done')
      setNote(
        result.withProjects
          ? `Saved ${resumeFileName(profile)}`
          : `Saved ${resumeFileName(profile)} (projects left out to fit one page)`,
      )
    } catch (err) {
      console.error(err)
      setState('error')
      setNote('The resume could not be built. Reload the page and try again.')
    }
    clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setState('idle')
      setNote('')
    }, 6000)
  }

  const edu = profile.education[0]
  let row = 0
  const r = () => ({ '--i': row++ })
  const isWorking = state === 'working'

  return (
    <figure className="preview">
      <div 
        role="button"
        tabIndex={0}
        onClick={obtain}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') obtain(); }}
        style={{ cursor: 'pointer', display: 'block', textDecoration: 'none' }}
        aria-label="Click to download resume PDF"
      >
        <div className="paper" aria-hidden="true">
          <div className="paper-row" style={r()}>
            <div className="paper-name">{profile.name}</div>
            <div className="paper-title">{profile.title}</div>
            <div className="paper-contact">
              {[profile.phone, profile.email, profile.website, profile.github].join(' | ')}
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
            <div className="paper-h">Selected projects</div>
            {profile.projects.map((p, i) => (
              <div className={i > 0 ? 'paper-gap' : undefined} key={p.name}>
                <div className="paper-job">
                  <b>{p.name}</b>
                  {p.stack && <span>{p.stack}</span>}
                </div>
                <p className="paper-text">{p.description}</p>
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
          <div className="paper-row" style={r()}>
            <div className="paper-h">Certifications</div>
            {profile.certifications.map((c, i) => (
              <div className={i > 0 ? 'paper-gap' : undefined} key={c.name}>
                <div className="paper-job">
                  <b>{c.name}</b>
                  <span>{c.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <figcaption style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
        <span>
          {isWorking ? 'Building PDF…' : 'This is similar to the page you get. Click to download.'}
        </span>
        {note && (
          <span className="resume-note" role="status" data-state={state} style={{ color: 'var(--brass)' }}>
            {note}
          </span>
        )}
      </figcaption>
    </figure>
  )
}