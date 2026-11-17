export const profile = {
  name: 'Callum Howell',
  title: 'Full-stack Software Engineer',
  location: 'Fort Smith, AR',
  email: 'callum.p.howell@proton.me',
  website: 'callum-p-howell.github.io',
  websiteUrl: 'https://callum-p-howell.github.io',
  github: 'github.com/callum-p-howell',
  githubUrl: 'https://github.com/callum-p-howell',

  about: [
    'I’m a full-stack engineer with more than ten years of experience building software for financial services. I work across the stack, with React and TypeScript on the front end and C#, C++, Python and VBA behind it.',
    'At Natwest I led a team of six through implementation work and built a React notification system. Today, as a senior developer at SS&C, I build VBA tooling, error handling around ServiceNow, and automation that turns Excel data into PowerPoint reports. I hold a first-class BSc in Computing & IT and speak Spanish fluently.',
  ],

  skills: [
    { group: 'Languages', items: ['C#', 'C++', 'Python', 'TypeScript', 'VBA'] },
    { group: 'Front end', items: ['React', 'TypeScript'] },
    { group: 'Backend', items: ['VBA', 'Excel', 'PowerPoint', 'ServiceNow'] },
    { group: 'Spoken', items: ['Spanish (fluent)', 'English'] },
  ],

  experience: [
    {
      role: 'Senior Software Developer V',
      company: 'SS&C',
      dates: '2023 – Present',
      bullets: [
        'Build and maintain VBA tooling that automates recurring internal workflows.',
        'Developed error handling that reports failures into ServiceNow.',
        'Automated the conversion of Excel data into PowerPoint presentations.',
      ],
    },
    {
      role: 'Implementation Lead & EMI Specialist',
      company: 'Natwest Bank',
      dates: '2016 – 2023',
      bullets: [
        'Led a team of six on implementation work.',
        'Built a React notification system.',
      ],
    },
  ],

  projects: [
    {
      name: 'Excel to PowerPoint automation',
      description:
        'Turns spreadsheet data into formatted slide decks, replacing manual copy and paste.',
      stack: 'VBA, Excel, PowerPoint',
    },
    {
      name: 'Live Update Notification System',
      description:
        'A React interface for delivering and managing employee notifications.',
      stack: 'React',
    },
    {
      name: 'This portfolio',
      description:
        'Built with React. The resume PDF is generated in the browser from the same content as the page.',
      stack: 'React, Vite, jsPDF',
      url: 'https://github.com/callum-p-howell/auto-resume',
    },
  ],

  education: [
    {
      degree: 'BSc Computing & IT',
      detail: 'First Class Honours',
      school: 'The Open University, London',
    },
  ],
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]
