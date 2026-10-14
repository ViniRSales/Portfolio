const projects = [
  {
    id: 'projeto-1',
    year: 2025,
    name: { pt: 'PoupaAi', en: 'PoupaAi' },
    description: {
      pt: 'Projeto Interdisciplinar do primeiro período, focado no desenvolvimento web.',
      en: 'First-Semester Interdisciplinary Project focused on web development.',
    },
    technologies: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2025-2-ti1-5567100-poupa-ai',
    image: '/images/projeto-1.png'  ,
  },
  {
    id: 'projeto-2',
    year: 2026,
    name: { pt: 'Servify', en: 'Servify' },
    description: {
      pt: 'Projeto Interdisciplinar voltado para Clientes e Negócios, plataforma de gerenciamento de serviços',
      en: 'Interdisciplinary Project focused on Customers and Business: development of a service management platform.',
    },
    technologies: ['Node.js', 'Java', 'TypeScript', 'CSS'],
    github: 'https://github.com/ICEI-PUC-Minas-PPLES-TI/plf-es-2026-1-ti2-1381100-grupo3-servify',
    image: '/images/projeto-2.png',
  },
  {
    id: 'projeto-3',
    year: 2026,
    name: { pt: 'Este portfólio', en: 'This portfolio' },
    description: {
      pt: 'Site de portfólio profissional, bilíngue e responsivo, feito para apresentar minha trajetória, projetos e contatos.',
      en: 'A bilingual, responsive professional portfolio website built to present my background, projects and contacts.',
    },
    technologies: ['React', 'Vite', 'Material UI', 'EmailJS'],
    github: 'https://github.com/ViniRSales/portfolio',
    image: '/images/projeto-3.png',
  },
]

// Ordena do mais antigo ao mais recente.
export default [...projects].sort((a, b) => a.year - b.year)
