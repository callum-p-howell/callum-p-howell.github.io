import { useEffect, useRef, useState } from 'react'
import { profile } from '../data/portfolio.js'

// States: idle -> working -> done | error. The PDF library is loaded on click,
// so visitors who never press the button never download it.
export default function ResumeButton({ variant = 'primary' }) {
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

  const label = state === 'working' ? 'Building PDF…' : 'Obtain resume'

  return (
    <div className={`resume-action resume-action--${variant}`}>
      <button type="button" className="btn" onClick={obtain} aria-busy={state === 'working'}>
        {label}
      </button>
      <p className="resume-note" role="status" data-state={state}>
        {note}
      </p>
    </div>
  )
}
