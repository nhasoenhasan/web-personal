export const profile = {
  name: 'Nur Hasan',
  title: 'Frontend Engineer',
  location: 'Indonesia · Batam',
  email: 'dev@nhasan.tech',
  website: 'https://nhasan.tech',
  linkedin: 'https://www.linkedin.com/in/nur-hasan-949658198/',
  github: 'https://github.com/nhasoenhasan',
  summary:
    'Frontend Engineer with 5+ years of experience building production web and mobile applications for financial services and education platforms serving 100K+ users. Strong in React, Next.js, TypeScript, and Tailwind CSS, with hands-on experience in modular frontend architecture, REST API integration, automated testing, and performance optimization. Focused on clean architecture, reliability, and shipping features end-to-end.',
}

export const experience = [
  {
    company: 'AIA Singapore',
    role: 'Senior Engineer/Analyst - Mobile Developer',
    meta: 'Hybrid',
    period: 'Feb 2023 - Present',
    items: [
      'Built and supported customer-facing web and mobile solutions for a large-scale insurance and financial services platform serving 100K+ active users, using React Native and TypeScript.',
      'Architected feature-level frontend modules in a modular React Native application, including authentication, health, shared component, and Find Doctors modules. Each one encapsulates its own routing, state management, and API service layer, and is published as a versioned internal npm package consumed by the container app, so modules can be developed and tested in isolation.',
      'Delivered the Find Doctors module end-to-end in the React Native app: doctor discovery by clinic with map integration, geolocation-based nearest-clinic search, clinic and doctor listing views, and a complete appointment booking flow through to clinic.',
      'Built an internal abstraction layer over Google APIs for user location resolution (reverse geocoding to country code and country name). Prototyped it client-side to remove direct Google API calls from feature code, then handed it to the backend team to productionize as a centralized server-side service, reducing direct Google API consumption by roughly 50%.',
      'Addressed dependency and container security issues reported by Snyk, keeping the React codebase free from known security vulnerabilities and minimizing security-related release blockers.',
      'Handled production issues from investigation through resolution: root-cause analysis, permanent fixes, and technical and operational documentation in Jira and Confluence.',
      'Established frontend engineering standards covering component reusability, TypeScript-driven development, modular architecture, automated testing, and peer code reviews.',
      'Collaborated across product, design, QA, backend, DevOps, security, and business teams across multiple countries to translate business requirements and UI/UX specifications into scalable frontend solutions.',
    ],
  },
  {
    company: 'Telkom Indonesia',
    role: 'Mobile Developer',
    meta: 'Contract · Jakarta, Indonesia (Remote) · 2 yrs 6 mos',
    period: 'Jul 2020 - Jan 2023',
    projects: [
      {
        name: 'Pijar Sekolah',
        subtitle: 'Digital Learning Platform',
        period: 'Jan 2022 - Jan 2023',
        items: [
          'Built the Pijar Sekolah teacher mobile application from scratch (greenfield) using React Native, TypeScript, and Redux, from initial scaffolding through to production release on Google Play.',
          'Implemented student attendance monitoring, real-time presence, and reporting modules for teachers across schools nationwide. The app holds a 4.3-star rating with 10K+ downloads on Google Play.',
          'Integrated Firebase Crashlytics for crash monitoring and production issue detection, Firebase Cloud Messaging for push notifications, and Firebase App Distribution to streamline internal and QA build delivery.',
          'Wrote unit tests with Jest for core application flows.',
        ],
      },
      {
        name: 'COSMIC',
        subtitle: 'National COVID-19 Health Protocol Platform, Ministry of SOEs',
        period: 'Jul 2020 - Jan 2022',
        items: [
          'Continued development of the COSMIC mobile application using React Native and Redux, building on an existing codebase and carrying mobile feature development through to production release, for the Ministry of State-Owned Enterprises (Kementerian BUMN) across all Indonesian state-owned enterprises.',
          'Implemented mobile frontend features spanning health-protocol compliance reporting, monitoring of pandemic-affected employees, and employee vaccination status tracking, feeding centralized reporting used for cross-enterprise decision-making.',
          'Delivered within a fully distributed, cross-SOE engineering team ("Cosmic Team") using Scrum and remote-first collaboration across the full 18-month engagement.',
        ],
      },
    ],
    items: [
      'Across both projects: built reusable UI components and collaborated with product, design, backend, and QA teams to integrate REST APIs and deliver features end-to-end across a 2.5-year engagement.',
    ],
  },
  {
    company: 'PT. Ansena Group Asia',
    role: 'Mobile Developer',
    period: 'Jan 2020 - Jul 2020',
    items: [
      "Built a Point of Sale (PoS) mobile application in React Native for the company's franchise partners, covering transactions, product catalog, stock, and reporting flows, with thermal receipt-printer integration and REST API connectivity to backend services.",
      'Owned the mobile frontend within a small engineering team, collaborating with a dedicated backend team to define API contracts and integrate data flows.',
    ],
  },
]

export const skills = [
  {
    category: 'Frontend',
    icon: 'web',
    tags: [
      'React.js',
      'Next.js',
      'TypeScript',
      'JavaScript (ES6+)',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
    ],
  },
  {
    category: 'Mobile',
    icon: 'smartphone',
    tags: ['React Native', 'iOS', 'Android', 'App Performance'],
  },
  {
    category: 'Backend & APIs',
    icon: 'dns',
    tags: ['Node.js', 'ExpressJS', 'REST API', 'SQL Database'],
  },
  {
    category: 'Tools',
    icon: 'build',
    tags: ['Git', 'CI/CD', 'Jest', 'Snyk', 'Firebase', 'Jira', 'Confluence'],
  },
]

export const education = {
  school: 'Universitas Teknologi Yogyakarta',
  degree: "Bachelor's degree",
  period: '2015 – 2019',
}
