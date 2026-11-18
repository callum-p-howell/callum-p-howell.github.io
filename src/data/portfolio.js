export const profile = {
  name: 'Callum Howell',
  title: 'Full-stack Software Engineer',
  location: 'Fort Smith, AR',
  phone: '479-492-5183',
  email: 'callum.p.howell@proton.me',
  website: 'callum-p-howell.github.io',
  websiteUrl: 'https://callum-p-howell.github.io',
  github: 'github.com/callum-p-howell',
  githubUrl: 'https://github.com/callum-p-howell',

  hero: [
    'I build data driven solutions that allow your business to thrive.'
  ],

  lead: [
    'Hi - I’m Callum, a full-stack engineer with over ten years of experience in financial services. React and TypeScript on the front end, C#, Python and VBA behind it.'
  ],

  about: [
    'Results-driven Fullstack Software Engineer with over 10 years of experience delivering customer-directed corporate solutions using C#, C++, VBA, Python, React, and TypeScript. I have a proven track record of reducing operational overhead, streamlining pipelines, and building automated internal systems through rigorous and innovative problem-solving.',
    'I combine technical execution with leadership experience in financial system implementations and stakeholder collaboration. I hold a BSc in Computing & IT with First Class Honours alongside industry certifications including CompTIA Security+ and PCAP Python Programming.',
  ],
skills: [
  {
    group: 'Languages',
    items: [
      'C#',
      'C++', 
      'Python', 
      'TypeScript', 
      'VBA', 
      'Ruby', 
      'Go'
    ]
  },
  {
    group: 'Front End',
    items: [
      'React', 
      'HTML', 
      'CSS'
    ]
  },
  {
    group: 'Back End',
    items: [
      'SQL', 
      'PostgreSQL', 
      'MySQL', 
      'SQLite'
    ]
  },
  {
    group: 'Tools',
    items: [
      'GitHub Actions',
      'Docker',
      'AWS',
      'Excel',
      'PowerPoint',
      'ServiceNow'
    ]
  },
  {
    group: 'Spoken',
    items: [
      'Spanish (fluent)', 
      'English'
    ]
  },
],

  experience: [
    {
      role: 'Senior Software Developer V',
      company: 'SS&C',
      dates: '2023 – Present',
      bullets: [
        'Developed and maintained internal tools and applications using C#, React, and TypeScript, enhancing operational efficiency and user experience.',
        'Collaborated with cross-functional teams to gather requirements, design solutions, and implement features that align with business objectives.',
        'Implemented automated testing and continuous integration practices, improving code quality and deployment speed by 23%.',
      ],
    },
    {
      role: 'Implementation Lead & EMI Specialist',
      company: 'Natwest Bank',
      dates: '2016 – 2023',
      bullets: [
        'Liaised with Mastercard and Visa to discuss and implement improvements to the SmartData and IntelliLink systems respectively.',
        'Led a team of 6 people to build and scope out customer requirements of their financial systems to deliver a polished product and provide hands-on customer training.',
        'Responsible for the continued relevance of and training on IT-related SOPs within the business to ensure due diligence and accuracy, reducing customer complaint and employee error by 35%.',
      ],
    },
  ],

  projects: [
    {
      name: 'weather_cli',
      description:
        'A command-line interface for fetching and displaying weather information.',
      stack: 'Python, requests, argparse',
      url: 'https://github.com/hexyncode/weather_cli'
    },
    {
      name: 'TranslaQ',
      description:
        'A web app that translates text into multiple languages using the Google Translate API, with a focus on accessibility and user-friendly design, built for professional emails and documents.',
      stack: 'React, Google Translate API, TypeScript, OpenAI API',
      url: 'https://formalizer-spanish.onrender.com/'
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
  certifications: [
    {
      name: 'CompTIA Security+',
      issuer: 'CompTIA',
      date: '2025',
    },
    {
      name: 'PCAP Python Programming',
      issuer: 'Python Institute',
      date: '2026',
    }
  ],
}

export const sections = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
]
