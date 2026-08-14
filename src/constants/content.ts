import {
  Atom,
  Beaker,
  Brain,
  Dna,
  FlaskConical,
  Microscope,
  PenLine,
  Rocket,
  Scan,
  Shield,
  Sparkles,
} from 'lucide-react'
import type { SiteContent } from '../types'

/** Section IDs used for anchor navigation — single source of truth */
export const SECTION_IDS = {
  hero: 'hero',
  innovation: 'innovation',
  research: 'research',
  capabilities: 'capabilities',
  impact: 'impact',
  contact: 'contact',
} as const

export type SectionId = (typeof SECTION_IDS)[keyof typeof SECTION_IDS]

export const SITE_CONTENT: SiteContent = {
  brand: {
    name: 'NOVA CELL',
    tagline: 'Decoding biology. Designing what comes next.',
    copyright: `© ${new Date().getFullYear()} Nova Cell Technologies. All rights reserved.`,
  },

  hero: {
    eyebrow: 'Next-Generation Biology',
    headline: "We don't just study life.",
    headlineAccent: "We engineer what's next.",
    tagline: 'Decoding biology. Designing what comes next.',
    description:
      'Nova Cell combines computational biology, molecular engineering, and intelligent discovery to transform complex biological systems into meaningful breakthroughs.',
    primaryCTA: {
      label: 'Explore our science',
      href: `#${SECTION_IDS.research}`,
      variant: 'primary',
    },
    secondaryCTA: {
      label: 'Our research',
      href: `#${SECTION_IDS.innovation}`,
      variant: 'secondary',
    },
  },

  innovation: {
    eyebrow: 'About Nova Cell',
    title: 'Where molecular insight meets engineered biology',
    description:
      'We operate at the intersection of computational genomics, synthetic biology, and precision therapeutics — building the infrastructure to read, write, and refine life at the cellular level.',
    pillars: [
      {
        id: 'computational-genomics',
        icon: Dna,
        title: 'Computational Genomics',
        description:
          'Multi-omic data pipelines that decode genetic architecture with single-nucleotide resolution across diverse cell populations.',
      },
      {
        id: 'cellular-engineering',
        icon: Atom,
        title: 'Cellular Engineering',
        description:
          'Programmable cell circuits designed for targeted delivery, controlled expression, and adaptive response within living systems.',
      },
      {
        id: 'precision-therapeutics',
        icon: Sparkles,
        title: 'Precision Therapeutics',
        description:
          'From target identification to candidate optimization — accelerated pathways that compress discovery timelines by orders of magnitude.',
      },
    ],
  },

  research: {
    eyebrow: 'Technology & Research',
    title: 'The Nova Cell research pipeline',
    description:
      'An integrated platform spanning signal detection through clinical deployment — each stage powered by proprietary algorithms, molecular engineering, and wet-lab automation.',
    steps: [
      {
        id: 'signal',
        phase: '01',
        code: 'SIGNAL',
        title: 'Signal Detection',
        description:
          'High-throughput sequencing and multi-omic analysis to isolate disease-associated genetic signatures across diverse cell populations.',
        icon: Scan,
      },
      {
        id: 'design',
        phase: '02',
        code: 'DESIGN',
        title: 'Molecular Design',
        description:
          'Structure-guided engineering of nucleic acid constructs, protein scaffolds, and delivery vectors optimized for target specificity.',
        icon: PenLine,
      },
      {
        id: 'engineer',
        phase: '03',
        code: 'ENGINEER',
        title: 'Cellular Engineering',
        description:
          'Programmable cell circuits and synthetic pathways designed for controlled expression, delivery, and adaptive response in living systems.',
        icon: Atom,
      },
      {
        id: 'validate',
        phase: '04',
        code: 'VALIDATE',
        title: 'In Vitro Validation',
        description:
          'Automated cell-based assays and organoid models that stress-test candidates under physiologically relevant conditions.',
        icon: FlaskConical,
      },
      {
        id: 'deploy',
        phase: '05',
        code: 'DEPLOY',
        title: 'Clinical Translation',
        description:
          'Regulatory-ready documentation and scalable manufacturing pathways that bridge bench findings to bedside application.',
        icon: Rocket,
      },
    ],
  },

  capabilities: {
    eyebrow: 'Capabilities',
    title: 'Full-spectrum biotech services',
    description:
      'From foundational research partnerships to end-to-end therapeutic development — Nova Cell provides the scientific depth and engineering rigor your program demands.',
    items: [
      {
        id: 'gene-editing',
        icon: Dna,
        title: 'Gene Editing & Modulation',
        description:
          'CRISPR-based knockouts, base editing, and epigenetic modulation with proprietary guide RNA optimization.',
      },
      {
        id: 'protein-design',
        icon: FlaskConical,
        title: 'Protein Design',
        description:
          'De novo protein engineering using structure prediction models and directed evolution workflows.',
      },
      {
        id: 'cell-line-dev',
        icon: Microscope,
        title: 'Cell Line Development',
        description:
          'Custom immortalized and primary cell models engineered for high-throughput screening and mechanistic studies.',
      },
      {
        id: 'bioinformatics',
        icon: Brain,
        title: 'Bioinformatics & AI',
        description:
          'Multi-omic integration, pathway analysis, and machine learning pipelines trained on proprietary datasets.',
      },
      {
        id: 'assay-dev',
        icon: Beaker,
        title: 'Assay Development',
        description:
          'Custom biochemical and cell-based assays designed for sensitivity, reproducibility, and regulatory compliance.',
      },
      {
        id: 'regulatory-strategy',
        icon: Shield,
        title: 'Regulatory Strategy',
        description:
          'IND-enabling study design, CMC documentation, and regulatory pathway consulting for novel modalities.',
      },
    ],
  },

  impact: {
    eyebrow: 'Impact',
    title: 'Measured progress. Meaningful outcomes.',
    description:
      'Nova Cell partners with research institutions and biopharma leaders worldwide — delivering measurable acceleration across the discovery-to-clinic continuum.',
    stats: [
      {
        id: 'compounds-screened',
        value: 2.4,
        suffix: 'M+',
        label: 'Compounds Screened',
        description: 'Across automated high-throughput platforms',
      },
      {
        id: 'research-partners',
        value: 47,
        suffix: '+',
        label: 'Research Partners',
        description: 'Academic and industry collaborations globally',
      },
      {
        id: 'pipeline-acceleration',
        value: 8,
        suffix: '×',
        label: 'Pipeline Acceleration',
        description: 'Average reduction in discovery timelines',
      },
      {
        id: 'publications',
        value: 120,
        suffix: '+',
        label: 'Peer-Reviewed Publications',
        description: 'Contributing to the global scientific record',
      },
    ],
  },

  finalCTA: {
    eyebrow: 'Partner With Us',
    title: 'Ready to decode the next breakthrough?',
    description:
      'Whether you are advancing a lead candidate or building foundational research infrastructure, Nova Cell provides the platform, expertise, and partnership to move faster.',
    primaryCTA: {
      label: 'Schedule a Consultation',
      href: ':#contact',
      variant: 'primary',
    },
    secondaryCTA: {
      label: 'Download Platform Overview',
      href: '#',
      variant: 'ghost',
    },
  },

  footer: {
    description:
      'Nova Cell is a precision biotechnology company engineering programmable cellular systems for therapeutic discovery and deployment.',
    linkGroups: [
      {
        title: 'Platform',
        links: [
          { label: 'Innovation', href: '#innovation' },
          { label: 'Research Pipeline', href: '#research' },
          { label: 'Capabilities', href: '#capabilities' },
        ],
      },
      {
        title: 'Company',
        links: [
          { label: 'About', href: '#innovation' },
          { label: 'Impact', href: '#impact' },
          { label: 'Contact', href: '#contact' },
        ],
      },
      {
        title: 'Resources',
        links: [
          { label: 'Publications', href: '#' },
          { label: 'Careers', href: '#' },
          { label: 'Privacy Policy', href: '#' },
        ],
      },
    ],
    social: [
      { label: 'LinkedIn', href: 'https://linkedin.com' },
      { label: 'Twitter', href: 'https://twitter.com' },
      { label: 'GitHub', href: 'https://github.com' },
    ],
  },
}
