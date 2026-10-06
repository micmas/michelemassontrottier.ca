// Main menus. Edit labels/links here (French and English).
export type NavItem = { label: string; href: string; children?: NavItem[] };
export type Lang = 'fr' | 'en';

export const navFr: NavItem[] = [
  { label: 'À propos', href: '/a-propos/' },
  {
    label: 'Pratiques cliniques', href: '/service-clinique/',
    children: [
      { label: 'Évaluations', href: '/clinique_evaluations/' },
      { label: 'Interventions', href: '/clinique_interventions/' },
    ],
  },
  {
    label: 'Parcours académique', href: '/parcours-academique-et-scientifique/',
    children: [
      { label: 'Projets en cours', href: '/projets/' },
      { label: 'Intérêts de recherche', href: '/interets_recherche/' },
      { label: 'Publications scientifiques', href: '/publications/' },
      { label: "Expériences d'enseignement", href: '/enseignement/' },
      { label: 'Mentorat', href: '/mentorat/' },
    ],
  },
  {
    label: 'Valorisation des connaissances', href: '/valorisation_connaissances/',
    children: [
      { label: 'Présentations grand public', href: '/presentations-grand-public/' },
      { label: 'Formations continues', href: '/formations-continues/' },
      { label: 'Contenu complémentaire aux formations', href: '/contenu-post-formation-continue/' },
    ],
  },
  {
    label: 'Ressources', href: '/ressources/',
    children: [
      { label: 'Aphasie multilingue', href: '/aphasie-multilingue/' },
      { label: 'Capsules vidéo', href: '/aphasie-multilingue-capsules-video/' },
    ],
  },
  { label: 'Contact', href: '/contactez-moi/' },
];

export const navEn: NavItem[] = [
  { label: 'About', href: '/en/about/' },
  {
    label: 'Clinical practice', href: '/en/clinical-practice/',
    children: [
      { label: 'Assessments', href: '/en/assessments/' },
      { label: 'Interventions', href: '/en/interventions/' },
    ],
  },
  {
    label: 'Academic career', href: '/en/academic-career/',
    children: [
      { label: 'Current projects', href: '/en/projects/' },
      { label: 'Research interests', href: '/en/research-interests/' },
      { label: 'Publications', href: '/en/publications/' },
      { label: 'Teaching', href: '/en/teaching/' },
      { label: 'Mentoring', href: '/en/mentoring/' },
    ],
  },
  {
    label: 'Knowledge translation', href: '/en/knowledge-translation/',
    children: [
      { label: 'Public talks', href: '/en/public-talks/' },
      { label: 'Continuing education', href: '/en/continuing-education/' },
      { label: 'Course materials', href: '/en/continuing-education-resources/' },
    ],
  },
  {
    label: 'Resources', href: '/en/resources/',
    children: [
      { label: 'Multilingual aphasia', href: '/en/multilingual-aphasia/' },
      { label: 'Videos', href: '/en/multilingual-aphasia-videos/' },
    ],
  },
  { label: 'Contact', href: '/en/contact/' },
];

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mich%C3%A8le-masson-trottier-b5063964/' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Michele-Masson-Trottier' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=z_c_OjsAAAAJ&hl=en' },
];

// Interface text that is not part of page content
export const ui = {
  fr: {
    tagline: 'Orthophoniste, MPO, O(c), Ph. D.',
    titleSuffix: 'Orthophoniste',
    description: 'Allier thérapie et recherche pour enrichir le langage et la connexion humaine. Orthophoniste, MPO, O(c), Ph. D.',
    skip: 'Aller au contenu',
    menu: 'Menu',
    mainMenu: 'Menu principal',
    about: 'À propos', aboutMe: 'À propos de moi', contact: 'Contactez-moi', privacy: 'Politique de confidentialité', networks: 'Réseaux',
    themeLabel: 'Changer le thème (clair ou sombre)',
    langLabel: 'Langue',
    notFoundTitle: 'Page introuvable', notFoundText: 'Désolée, cette page n’existe pas ou a été déplacée.', backHome: 'Retour à l’accueil',
  },
  en: {
    tagline: 'Speech-Language Pathologist, MPO, O(c), PhD',
    titleSuffix: 'Speech-Language Pathologist',
    description: 'Combining therapy and research to enrich language and human connection. Speech-Language Pathologist, MPO, O(c), PhD.',
    skip: 'Skip to content',
    menu: 'Menu',
    mainMenu: 'Main menu',
    about: 'About', aboutMe: 'About me', contact: 'Contact me', privacy: 'Privacy policy', networks: 'Networks',
    themeLabel: 'Switch theme (light or dark)',
    langLabel: 'Language',
    notFoundTitle: 'Page not found', notFoundText: 'Sorry, this page does not exist or has moved.', backHome: 'Back to home',
  },
} as const;
