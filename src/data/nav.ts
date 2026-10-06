// Main menu. Edit labels/links here.
export type NavItem = { label: string; href: string; children?: NavItem[] };

export const nav: NavItem[] = [
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

export const social = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/mich%C3%A8le-masson-trottier-b5063964/' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Michele-Masson-Trottier' },
  { label: 'Google Scholar', href: 'https://scholar.google.com/citations?user=z_c_OjsAAAAJ&hl=en' },
];
