export const SITE = {
  title: 'Jonas Heinicke',
  description:
    'PhD researcher in bioinformatics at HZI Braunschweig. Scientific literature mining, knowledge graphs, ontologies and open-source research software.',
  role: 'PhD Researcher · Bioinformatics',
  affiliation: 'Helmholtz Centre for Infection Research (HZI)',
  location: 'Braunschweig, Germany',
};

export const LINKS = {
  github: 'https://github.com/JonasHeinickeBio',
  linkedin: 'https://www.linkedin.com/in/jonas-heinicke-0a6649109/',
  pypi: 'https://pypi.org/project/pyeuropepmc/',
};

export const NAV = [
  { label: 'About', href: 'about/' },
  { label: 'Projects', href: 'projects/' },
  { label: 'CV', href: 'cv/' },
  { label: 'Blog', href: 'blog/' },
];

export const RESEARCH = [
  {
    title: 'Literature mining',
    text: 'Automated search, retrieval and extraction from biomedical literature via Europe PMC.',
  },
  {
    title: 'Knowledge graphs',
    text: 'Turning publications into semantic, queryable representations of biomedical knowledge.',
  },
  {
    title: 'Ontology integration',
    text: 'Mapping and enriching terms across 24+ ontologies such as MONDO, HP, NCIT and ChEBI.',
  },
  {
    title: 'Reproducible software',
    text: 'Tested, documented, openly developed tools that other researchers can build on.',
  },
];

export const SKILLS = [
  { group: 'Languages', items: ['Python (primary)', 'HTML/CSS', 'JavaScript'] },
  {
    group: 'Bioinformatics',
    items: ['Literature mining', 'Ontology mapping', 'Knowledge graphs', 'Data integration'],
  },
  {
    group: 'Data & semantics',
    items: ['RDF / OWL', 'SPARQL', 'JSON-LD', 'Turtle', 'SSSOM', 'XML parsing'],
  },
  {
    group: 'APIs',
    items: ['Europe PMC', 'BioPortal', 'OLS', 'CrossRef', 'Semantic Scholar', 'OpenAlex'],
  },
  {
    group: 'Engineering',
    items: ['pytest', 'GitHub Actions CI/CD', 'Sphinx / MkDocs', 'Git'],
  },
  { group: 'LLMs', items: ['Ollama', 'LangGraph', 'Prompt design'] },
];

export const CV = {
  education: [
    {
      title: 'PhD in Bioinformatics',
      org: SITE.affiliation,
      period: 'In progress',
      points: [
        'Scientific literature mining and knowledge graph construction',
        'Ontology mapping and enrichment',
        'Semantic web technologies for biomedical data',
      ],
    },
    {
      title: 'Biochemistry',
      org: 'Graduate',
      period: '',
      points: ['Foundation in biochemistry with a strong pull towards coding and data analysis'],
    },
  ],
  experience: [
    {
      title: 'PyEuropePMC — lead developer',
      period: '2025 – present',
      points: [
        'Published on PyPI, with a documentation site on GitHub Pages',
        '200+ tests with 90%+ coverage',
        'Search, XML parsing, knowledge-graph export and API enrichment',
      ],
    },
    {
      title: 'Ontology Mapper — lead developer',
      period: '2025 – present',
      points: [
        'CLI and GUI for 24+ biomedical ontologies',
        'Turtle, JSON-LD, RDF/XML and SSSOM input and output',
        'Caching and batch processing',
      ],
    },
    {
      title: 'Italian Language Learning App — developer',
      period: '2025 – 2026',
      points: ['Local-LLM (Ollama) prompt templates for grammar, vocabulary and corrections'],
    },
  ],
};
