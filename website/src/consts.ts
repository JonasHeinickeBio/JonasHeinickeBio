export const SITE = {
  title: 'Jonas Heinicke',
  description:
    'PhD researcher in computational biology at HZI Braunschweig. ME/CFS patient data, scientific literature mining, knowledge graphs and open-source research software.',
  role: 'PhD Researcher · Computational Biology',
  affiliation: 'Helmholtz Centre for Infection Research (HZI)',
  location: 'Braunschweig, Germany',
};

export const LINKS = {
  github: 'https://github.com/JonasHeinickeBio',
  linkedin: 'https://www.linkedin.com/in/jonas-heinicke-0a6649109/',
  pypi: 'https://pypi.org/project/pyeuropepmc/',
  orcid: 'https://orcid.org/0000-0002-8442-3187',
};

export const NAV = [
  { label: 'About', href: 'about/' },
  { label: 'Projects', href: 'projects/' },
  { label: 'Publications', href: 'publications/' },
  { label: 'CV', href: 'cv/' },
  { label: 'Blog', href: 'blog/' },
];

export const RESEARCH = [
  {
    title: 'ME/CFS patient data',
    text: 'Computational analysis of patient data to better understand ME/CFS.',
  },
  {
    title: 'Literature mining',
    text: 'Automated search, retrieval and extraction from the scientific literature via Europe PMC.',
  },
  {
    title: 'Knowledge graphs & ontologies',
    text: 'Turning publications into queryable knowledge, and mapping terms across ontologies such as MONDO, HP and NCIT.',
  },
  {
    title: 'Reproducible software',
    text: 'Tested, documented, openly developed tools that other researchers can build on.',
  },
];

export const SKILLS = [
  { group: 'Languages', items: ['Python (primary)', 'HTML/CSS', 'JavaScript'] },
  {
    group: 'Computational biology',
    items: ['Patient data analysis', 'Literature mining', 'Ontology mapping', 'Knowledge graphs', 'Data integration'],
  },
  {
    group: 'Data & semantics',
    items: ['RDF / OWL', 'SPARQL', 'JSON-LD', 'Turtle', 'SSSOM', 'XML parsing', 'Neo4j'],
  },
  {
    group: 'APIs',
    items: ['Europe PMC', 'BioPortal', 'OLS', 'CrossRef', 'Semantic Scholar', 'OpenAlex'],
  },
  {
    group: 'Engineering',
    items: ['pytest', 'GitHub Actions CI/CD', 'Sphinx / MkDocs', 'Docker', 'Git'],
  },
  {
    group: 'LLMs & agents',
    items: ['MCP servers', 'LangGraph', 'LiteLLM', 'Ollama', 'LLM benchmarking'],
  },
];

export const CV = {
  education: [
    {
      title: 'PhD in Computational Biology',
      org: SITE.affiliation,
      period: 'Since 2024',
      points: [
        'Computational analysis of ME/CFS patient data',
        'Scientific literature mining and knowledge graph construction',
        'Ontology mapping and semantic web technologies for biomedical data',
      ],
    },
    {
      title: 'M.Sc.',
      org: 'Albert-Ludwigs-Universität Freiburg',
      period: '',
      points: ['Biochemistry background with a strong pull towards coding and data analysis'],
    },
  ],
  experience: [
    {
      title: 'PyEuropePMC — lead developer',
      period: '2025 – present',
      points: [
        'Published on PyPI with a documentation site',
        'Search, full-text retrieval, XML parsing and RDF export for Europe PMC',
        'MCP server with 42 tools for AI agents',
      ],
    },
    {
      title: 'Biomedical Knowledge Lookup — lead developer',
      period: '2025 – present',
      points: [
        'One API, CLI and MCP server over 106 biomedical sources',
        'Merged, deduplicated and cross-referenced results for knowledge graphs',
      ],
    },
    {
      title: 'Ontology Mapper — lead developer',
      period: '2025 – present',
      points: [
        'CLI and GUI for 24+ biomedical ontologies via BioPortal and OLS',
        'Turtle, JSON-LD, RDF/XML and SSSOM input and output',
      ],
    },
    {
      title: 'HeLLMholtz — lead developer',
      period: '2025 – present',
      points: [
        'LLM access, benchmarking and LLM-as-a-judge evaluation, with Helmholtz Blablador support',
        'Published on PyPI',
      ],
    },
  ],
};
