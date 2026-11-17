import { jsPDF } from 'jspdf'

const PAGE = { w: 612, h: 792 }
const MARGIN = { x: 44, top: 40, bottom: 38 }
const COLOR = {
  ink: [20, 35, 31],
  muted: [70, 87, 79],
  accent: [138, 79, 15],
  rule: [157, 176, 163],
}
const SCALES = [1.3, 1.26, 1.22, 1.18, 1.14, 1.1, 1.06, 1.02, 1, 0.96, 0.92, 0.88, 0.84, 0.8, 0.76]

const clean = (text = '') =>
  String(text)
    .replace(/[–—]/g, '-')
    .replace(/[‘’]/g, "'")
    .replace(/[“”]/g, '"')
    .replace(/…/g, '...')

function layout(profile, s, { withProjects }) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter', compress: true })
  const left = MARGIN.x
  const right = PAGE.w - MARGIN.x
  const width = right - left
  let y = MARGIN.top

  const font = (size, style = 'normal', color = COLOR.ink) => {
    doc.setFont('helvetica', style)
    doc.setFontSize(size * s)
    doc.setTextColor(...color)
  }
  const baseline = (size) => y + size * s * 0.85
  const advance = (size, k = 1.32) => {
    y += size * s * k
  }

  const rule = (color, weight) => {
    doc.setDrawColor(...color)
    doc.setLineWidth(weight)
    doc.line(left, y, right, y)
  }

  const paragraph = (text, size, style, color, { x = left, w = width, k = 1.34 } = {}) => {
    font(size, style, color)
    doc.splitTextToSize(clean(text), w).forEach((line) => {
      doc.text(line, x, baseline(size))
      advance(size, k)
    })
  }

  const sectionTitle = (title) => {
    y += 8 * s
    font(9, 'bold', COLOR.accent)
    doc.text(title.toUpperCase(), left, baseline(9), { charSpace: 0.9 })
    advance(9, 1.3)
    rule(COLOR.rule, 0.6)
    y += 5 * s
  }

  const bullet = (text) => {
    const size = 9.3
    font(size, 'normal', COLOR.ink)
    const lines = doc.splitTextToSize(clean(text), width - 12)
    lines.forEach((line, i) => {
      if (i === 0) {
        doc.setFillColor(...COLOR.ink)
        doc.circle(left + 3, baseline(size) - 2.7 * s, 1.1 * s, 'F')
      }
      doc.text(line, left + 12, baseline(size))
      advance(size, 1.3)
    })
  }

  // Header
  font(27, 'bold', COLOR.ink)
  doc.text(clean(profile.name), left, baseline(27))
  advance(27, 1.1)
  font(11.5, 'normal', COLOR.accent)
  doc.text(clean(profile.title), left, baseline(11.5))
  advance(11.5, 1.45)
  const contact = [profile.location, profile.email, profile.website, profile.github]
    .filter(Boolean)
    .join('   |   ')
  paragraph(contact, 9, 'normal', COLOR.muted)
  y += 2 * s
  rule(COLOR.ink, 1.2)
  y += 2 * s

  // Personal statement
  sectionTitle('Profile')
  paragraph(profile.about.join(' '), 9.5, 'normal', COLOR.ink, { k: 1.38 })

  // Skills
  sectionTitle('Skills')
  profile.skills.forEach(({ group, items }) => {
    const size = 9.3
    const labelW = 78 * s
    font(size, 'bold', COLOR.ink)
    doc.text(clean(group), left, baseline(size))
    font(size, 'normal', COLOR.ink)
    const lines = doc.splitTextToSize(clean(items.join(', ')), width - labelW)
    lines.forEach((line) => {
      doc.text(line, left + labelW, baseline(size))
      advance(size, 1.3)
    })
  })

  // Experience
  sectionTitle('Experience')
  profile.experience.forEach((job, i) => {
    if (i > 0) y += 4 * s
    font(10, 'bold', COLOR.ink)
    doc.text(clean(job.role), left, baseline(10))
    font(9, 'normal', COLOR.muted)
    doc.text(clean(job.dates), right, baseline(10), { align: 'right' })
    advance(10, 1.3)
    paragraph(job.company, 9.3, 'italic', COLOR.muted, { k: 1.3 })
    job.bullets.forEach(bullet)
  })

  // Projects
  if (withProjects && profile.projects?.length) {
    sectionTitle('Selected projects')
    profile.projects.forEach((project, i) => {
      if (i > 0) y += 2 * s
      font(9.5, 'bold', COLOR.ink)
      doc.text(clean(project.name), left, baseline(9.5))
      if (project.stack) {
        font(8.8, 'normal', COLOR.muted)
        doc.text(clean(project.stack), right, baseline(9.5), { align: 'right' })
      }
      advance(9.5, 1.3)
      paragraph(project.description, 9.1, 'normal', COLOR.ink, { k: 1.3 })
    })
  }

  // Education
  sectionTitle('Education')
  profile.education.forEach((edu) => {
    font(9.8, 'bold', COLOR.ink)
    const degree = clean(`${edu.degree}, ${edu.detail}`)
    doc.text(degree, left, baseline(9.8))
    font(9, 'normal', COLOR.muted)
    doc.text(clean(edu.school), right, baseline(9.8), { align: 'right' })
    advance(9.8, 1.35)
  })

  return { doc, endY: y }
}

export function buildResumeDoc(profile) {
  const limit = PAGE.h - MARGIN.bottom
  let attempt

  for (const withProjects of [true, false]) {
    for (const scale of SCALES) {
      attempt = { ...layout(profile, scale, { withProjects }), scale, withProjects }
      if (attempt.endY <= limit) {
        return finish(attempt, profile)
      }
    }
  }
  console.warn('Resume content is longer than one page even at the smallest size.')
  return finish(attempt, profile)
}

function finish(attempt, profile) {
  attempt.doc.setProperties({
    title: `${profile.name} - Resume`,
    author: profile.name,
    subject: profile.title,
  })
  return attempt
}

export function resumeFileName(profile) {
  return `${profile.name.trim().replace(/\s+/g, '-')}-Resume.pdf`
}

export function downloadResume(profile) {
  const result = buildResumeDoc(profile)
  result.doc.save(resumeFileName(profile))
  return result
}
