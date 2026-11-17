import { useEffect, useState } from 'react'
import { profile, sections } from './data/portfolio.js'
import ResumeButton from './components/ResumeButton.jsx'
import ResumePreview from './components/ResumePreview.jsx'
import { About, Skills, Experience, Projects, Education, Contact } from './components/Sections.jsx'

export default function App() {
  const [active, setActive] = useState('')

  useEffect(() => {
    const targets = sections.map((s) => document.getElementById(s.id)).filter(Boolean)
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(visible.target.id)
      },
      { rootMargin: '-30% 0px -55% 0px' },
    )
    targets.forEach((t) => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return (
    <div className="shell">
      <a className="skip" href="#main">
        Skip to content
      </a>

      <aside className="rail">
        <div className="rail-id">
          <a className="rail-name" href="#top">
            {profile.name}
          </a>
          <p className="rail-role">{profile.title}</p>
        </div>
        <nav aria-label="Sections">
          <ul>
            {sections.map((s) => (
              <li key={s.id}>
                <a href={`#${s.id}`} aria-current={active === s.id ? 'true' : undefined}>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <ResumeButton variant="rail" />
      </aside>

      <main id="main" className="main">
        <header className="hero" id="top">
          <div className="hero-copy">
            <h1>I build web applications and the internal tools teams rely on.</h1>
            <p className="lead">
              I’m {profile.name}, a full-stack engineer with over ten years of experience in
              financial services. React and TypeScript on the front end, C#, Python and VBA behind
              it.
            </p>
            <div className="hero-actions">
              <ResumeButton variant="hero" />
              <a className="textlink" href="#experience">
                See experience
              </a>
            </div>
          </div>
          <ResumePreview />
        </header>

        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Contact />

        <footer className="footer">
          <p>© {new Date().getFullYear()} {profile.name}</p>
        </footer>
      </main>
    </div>
  )
}
