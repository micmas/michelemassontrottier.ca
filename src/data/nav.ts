// Main menus. Edit labels/links here (French and English).
export type NavItem = { label: string; href: string; children?: NavItem[] };
export type Lang = 'fr' | 'en';

export const navFr: NavItem[] = [
  { label: 'À propos', href: '/a-propos/' },
  {
    label: 'Clinique', href: '/service-clinique/',
    children: [
      { label: 'Évaluations', href: '/clinique_evaluations/' },
      { label: 'Interventions', href: '/clinique_interventions/' },
    ],
  },
  {
    label: 'Recherche', href: '/parcours-academique-et-scientifique/',
    children: [
      { label: 'Projets en cours', href: '/projets/' },
      { label: 'CALMaR', href: '/calmar/' },
      { label: 'Neurodesk', href: '/neurodesk/' },
      { label: 'Publications scientifiques', href: '/publications/' },
      { label: 'Recherche clinique', href: '/interets_recherche/' },
    ],
  },
  {
    label: 'Enseignement', href: '/enseignement/',
    children: [
      { label: 'Mentorat', href: '/mentorat/' },
      { label: 'Partage des connaissances', href: '/valorisation_connaissances/' },
      { label: 'Présentations grand public', href: '/presentations-grand-public/' },
      { label: 'Formations continues', href: '/formations-continues/' },
      { label: 'Contenu complémentaire aux formations', href: '/contenu-post-formation-continue/' },
    ],
  },
  {
    label: 'Ressources', href: '/ressources/',
    children: [
      { label: 'Aphasie multilingue', href: '/aphasie-multilingue/', children: [
        { label: 'Capsules vidéo', href: '/aphasie-multilingue-capsules-video/' },
      ] },
    ],
  },
  { label: 'Contact', href: '/contactez-moi/' },
];

export const navEn: NavItem[] = [
  { label: 'About', href: '/en/about/' },
  {
    label: 'Clinical', href: '/en/clinical-practice/',
    children: [
      { label: 'Assessments', href: '/en/assessments/' },
      { label: 'Interventions', href: '/en/interventions/' },
    ],
  },
  {
    label: 'Research', href: '/en/academic-career/',
    children: [
      { label: 'Current projects', href: '/en/projects/' },
      { label: 'CALMaR', href: '/en/calmar/' },
      { label: 'Neurodesk', href: '/en/neurodesk/' },
      { label: 'Publications', href: '/en/publications/' },
      { label: 'Clinical research', href: '/en/research-interests/' },
    ],
  },
  {
    label: 'Teaching', href: '/en/teaching/',
    children: [
      { label: 'Mentoring', href: '/en/mentoring/' },
      { label: 'Knowledge translation', href: '/en/knowledge-translation/' },
      { label: 'Public talks', href: '/en/public-talks/' },
      { label: 'Continuing education', href: '/en/continuing-education/' },
      { label: 'Course materials', href: '/en/continuing-education-resources/' },
    ],
  },
  {
    label: 'Resources', href: '/en/resources/',
    children: [
      { label: 'Multilingual aphasia', href: '/en/multilingual-aphasia/', children: [
        { label: 'Videos', href: '/en/multilingual-aphasia-videos/' },
      ] },
    ],
  },
  { label: 'Contact', href: '/en/contact/' },
];

export const social = [
  { label: 'ORCID', href: 'https://orcid.org/0000-0002-0642-5662' },
  { label: 'GitHub', href: 'https://github.com/micmas' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mich%C3%A8le-masson-trottier-b5063964/' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Michele-Masson-Trottier' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=z_c_OjsAAAAJ&hl=en' },
];

// Interface text that is not part of page content
export const ui = {
  fr: {
    tagline: 'Orthophoniste et chercheuse · Ph. D.',
    titleSuffix: 'Orthophoniste et chercheuse',
    description: 'Pratique clinique, recherche sur la communication et infrastructures ouvertes de neuroimagerie. Orthophoniste et chercheuse à The University of Queensland.',
    skip: 'Aller au contenu',
    menu: 'Menu',
    mainMenu: 'Menu principal',
    about: 'À propos', aboutMe: 'À propos de moi', contact: 'Contactez-moi', privacy: 'Politique de confidentialité', networks: 'Réseaux',
    themeLabel: 'Changer le thème (clair ou sombre)',
    langLabel: 'Langue',
    submenuLabel: 'Afficher les sous-pages :',
    notFoundTitle: 'Page introuvable', notFoundText: 'Désolée, cette page n’existe pas ou a été déplacée.', backHome: 'Retour à l’accueil',
  },
  en: {
    tagline: 'Speech-language pathologist and researcher · PhD',
    titleSuffix: 'Speech-language pathologist and researcher',
    description: 'Clinical practice, communication research and open neuroimaging infrastructure. Speech-language pathologist and Research Fellow at The University of Queensland.',
    skip: 'Skip to content',
    menu: 'Menu',
    mainMenu: 'Main menu',
    about: 'About', aboutMe: 'About me', contact: 'Contact me', privacy: 'Privacy policy', networks: 'Networks',
    themeLabel: 'Switch theme (light or dark)',
    langLabel: 'Language',
    submenuLabel: 'Show subpages:',
    notFoundTitle: 'Page not found', notFoundText: 'Sorry, this page does not exist or has moved.', backHome: 'Back to home',
  },
} as const;
