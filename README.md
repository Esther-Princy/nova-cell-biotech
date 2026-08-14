# NOVA CELL — Biotech Research Platform

A premium, responsive biotech research platform website designed for NOVA CELL.

The website presents NOVA CELL as a next-generation biotechnology research platform through an editorial dark interface, scientific SVG visualizations, interactive research pipelines, animated metrics, and a responsive user experience.

---

## 🌐 Live Demo

**Live Website:**  
https://nova-cell-biotech-oni2.vercel.app/

---

## 📂 GitHub Repository

**Repository:**  
https://github.com/Esther-Princy/nova-cell-biotech

---

## ✨ Project Overview

NOVA CELL is a modern biotech platform landing page designed to communicate complex scientific capabilities through a visually engaging and accessible digital experience.

The website combines:

- Scientific-inspired visual systems
- Custom SVG molecular networks
- Interactive research pipeline visualization
- Capability constellation graphics
- Animated impact metrics
- Responsive layouts
- Accessible navigation
- Reduced-motion support
- Animated consultation request modal

The design intentionally avoids a conventional corporate landing-page structure and instead uses an editorial, research-oriented visual language.

---

## 🎯 Key Features

### 1. Hero Section

The hero introduces the NOVA CELL platform using:

- Large editorial typography
- Cyan biotech accent colors
- Asymmetric two-column composition
- Custom molecular network visualization
- Animated entrance sequence
- Responsive layout
- Primary and secondary CTAs

The molecular visualization is built as a deterministic SVG network rather than a generic particle background.

---

### 2. Innovation Section

The Innovation section presents NOVA CELL's research philosophy through three core pillars.

It includes:

- Editorial section heading
- Three research philosophy pillars
- Custom innovation pathway visualization
- Scientific markers
- SVG pathway animations
- Scroll-triggered reveal animations

---

### 3. Research Pipeline

The Research section visualizes the research process as a five-stage pipeline:

```text
SIGNAL
   ↓
DESIGN
   ↓
ENGINEER
   ↓
VALIDATE
   ↓
DEPLOY
```

The pipeline includes:

- Interactive stage selection
- Animated SVG pathways
- Scientific annotations
- Data-flow particles
- Active-stage highlighting
- Responsive desktop/mobile layouts
- Keyboard-accessible controls

---

### 4. Capabilities

The Capabilities section presents six biotechnology domains connected through a custom network visualization.

The section includes:

- Central capability hub
- Six domain nodes
- Custom SVG connections
- Responsive constellation layout
- Six capability cards
- Scroll-triggered animations
- Hover interactions

---

### 5. Impact & Statistics

The Impact section communicates platform scale using animated metrics.

It includes:

- Featured metric
- Supporting statistics
- Animated count-up numbers
- Scientific trend visualization
- SVG chart animation
- Responsive metric layout
- Reduced-motion support

---

### 6. Consultation Modal

The final CTA includes an animated consultation request experience.

Instead of navigating away from the website, users can open a consultation modal directly on the page.

The modal provides:

- Full Name field
- Work Email field
- Message field
- Inline validation
- Animated form entrance
- Success confirmation state
- Escape-key support
- Backdrop close
- Focus management
- Body scroll locking
- Mobile responsive layout

The current implementation is frontend-only and does not send data to a backend service.

---

## 🎨 Design Approach

The visual direction is based on a **premium scientific editorial aesthetic**.

### Color System

The interface uses a dark foundation with biotech-inspired accents.

Primary colors include:

- Deep black / navy backgrounds
- Cyan
- Teal
- Violet
- Muted white
- Secondary gray typography

The accent colors are used selectively for:

- Scientific pathways
- Nodes
- Buttons
- Data visualizations
- Interactive states
- Navigation indicators

---

### Typography

The project uses:

- **Syne** — display/headline typography
- **DM Sans** — body and interface typography

Syne provides the distinctive editorial/scientific character while DM Sans keeps supporting content readable.

---

## 🧬 Visual System

A major focus of the project is creating scientific visuals without relying on generic stock imagery.

The project contains several custom SVG visualization systems.

### Molecular Network

Used in the Hero section.

Contains:

- Central molecular core
- Primary nodes
- Secondary nodes
- Curved connections
- Data-flow particles
- Pointer interaction
- Responsive density

---

### Innovation Pathway

Used in the Innovation section.

Contains:

- Central hub
- Research pathways
- Orbital arc
- Scientific markers
- Precision grid
- Animated path drawing

---

### Research Pipeline

Used in the Research section.

Contains:

- Five research stages
- Curved pipeline paths
- Scientific annotations
- Stage nodes
- Data-flow particles
- Active-stage interaction

---

### Capabilities Network

Used in the Capabilities section.

Contains:

- Central hub
- Six capability nodes
- Connecting pathways
- Hexagonal/constellation-inspired structure

---

### Impact Visualization

Used in the Impact section.

Contains:

- Scientific trend chart
- Grid references
- Data points
- Animated trend line
- Supporting metrics

---

### Final CTA Convergence

The final CTA uses a convergence visualization where multiple pathways flow toward a central gateway.

This reinforces the idea of research collaboration and scientific convergence.

---

## 🎞️ Animation Approach

Animations are implemented using **Framer Motion**.

The animation system is centralized and reusable rather than implementing unrelated animations in every component.

Animation techniques include:

- Fade-up reveals
- Staggered entrances
- Path drawing
- Scale reveals
- Molecular movement
- Data-flow particles
- Hover interactions
- Count-up statistics
- Modal transitions
- Navigation transitions

Animations are intentionally restrained so they support the scientific narrative instead of distracting from the content.

---

## ♿ Accessibility

Accessibility was considered throughout the implementation.

The project includes:

- Semantic HTML
- Proper heading hierarchy
- Keyboard-accessible controls
- Visible focus states
- Skip navigation link
- ARIA labels
- ARIA-expanded states
- Accessible mobile navigation
- Focus trapping in the consultation modal
- Escape-key support
- Screen-reader-friendly statistics
- Decorative SVGs marked appropriately
- Reduced-motion support

Users who enable `prefers-reduced-motion` receive a simplified experience with animations disabled or reduced.

---

## 📱 Responsive Design

The website is designed for:

- Mobile phones
- Tablets
- Laptops
- Desktop screens

Responsive behavior includes:

- Mobile navigation menu
- Responsive typography
- Adaptive SVG visual density
- Single-column mobile layouts
- Multi-column desktop layouts
- Responsive research pipeline
- Responsive capability cards
- Mobile consultation modal

The site has been tested using both desktop browser responsive mode and a real mobile device.

---

## 🛠️ Technologies Used

### Frontend

- React
- TypeScript
- Vite

### Styling

- Tailwind CSS
- Custom CSS design tokens

### Animation

- Framer Motion

### Icons

- Lucide React

### Typography

- Google Fonts
  - Syne
  - DM Sans

### Graphics

- SVG
- CSS gradients
- Motion-based SVG animation

### Development Tools

- Node.js
- npm
- Git
- GitHub

---

## 📦 Project Structure

```text
src/
│
├── animations/
│   ├── index.ts
│   ├── motionConfig.tsx
│   ├── motionDefaults.ts
│   ├── transitions.ts
│   ├── useMotionSafe.ts
│   └── variants.ts
│
├── components/
│   │
│   ├── layout/
│   │   ├── BrandLogo.tsx
│   │   ├── Footer.tsx
│   │   ├── NavLinkItem.tsx
│   │   ├── Navbar.tsx
│   │   ├── SectionShell.tsx
│   │   └── SkipLink.tsx
│   │
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Innovation.tsx
│   │   ├── Research.tsx
│   │   ├── Capabilities.tsx
│   │   ├── Impact.tsx
│   │   └── FinalCTA.tsx
│   │
│   ├── ui/
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── ConsultationModal.tsx
│   │   ├── SectionHeading.tsx
│   │   └── StatCounter.tsx
│   │
│   └── visuals/
│       ├── MolecularVisual.tsx
│       ├── MolecularCore.tsx
│       ├── MolecularNode.tsx
│       ├── MolecularConnection.tsx
│       ├── MolecularParticles.tsx
│       ├── InnovationPathwayVisual.tsx
│       ├── ResearchPipelineVisual.tsx
│       ├── CapabilitiesNetworkVisual.tsx
│       ├── ImpactMetricsVisual.tsx
│       └── FinalCtaVisual.tsx
│
├── constants/
│   ├── content.ts
│   └── navigation.ts
│
├── hooks/
│   ├── useCountUp.ts
│   ├── useFocusTrap.ts
│   ├── useMediaQuery.ts
│   ├── usePointerNetwork.ts
│   └── useScrollState.ts
│
├── types/
│   └── index.ts
│
├── utils/
│   └── cn.ts
│
├── App.tsx
└── index.css
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm
- Git

You can verify the installations with:

```bash
node --version
npm --version
git --version
```

---

## 💻 Installation

Clone the repository:

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

Move into the project directory:

```bash
cd Capitova-Biotech
```

Install dependencies:

```bash
npm install
```

---

## ▶️ Run Development Server

Start the Vite development server:

```bash
npm run dev
```

The terminal will provide a local URL, usually:

```text
http://localhost:5173/
```

To test the website on a mobile device connected to the same Wi-Fi network:

```bash
npm run dev -- --host
```

Then open the displayed Network URL on your mobile device.

---

## 🏗️ Production Build

Create an optimized production build:

```bash
npm run build
```

The production files will be generated inside:

```text
dist/
```

---

## 👀 Preview Production Build

After building:

```bash
npm run preview
```

Vite will provide a local preview URL.

---

## 🔍 Quality Checks

The project has been checked with:

```bash
npm run build
```

The production build completes successfully with TypeScript compilation and Vite bundling.

ESLint was also used during development to identify code-quality issues.

---

## 📈 Performance Considerations

The project uses several techniques to keep the visual experience efficient:

- Deterministic SVG data
- No canvas-based particle systems
- MotionValues for pointer interactions
- Minimal React state updates
- Responsive visual density
- Conditional particle animations
- CSS-based visual blending
- Lazy animation behavior
- Reduced-motion support
- Reusable animation variants

---

## 🔐 Form / Backend Note

The consultation form is currently a **frontend-only interaction**.

It provides:

- Client-side validation
- Success feedback
- Accessible modal behavior

No user data is currently transmitted to a backend or stored in a database.

A production implementation could connect the form to an API, CRM, serverless function, or email service.

---

## 📄 License

This project was created as a web development / design evaluation project.

All branding, content, and visual concepts in this project are intended for the NOVA CELL concept website.

---

## 👩‍💻 Developer

**Esther Princy F**

B.Tech Information Technology — Thiagarajar College of Engineering

---

## ⭐ Project Highlights

The project demonstrates practical experience with:

- React component architecture
- TypeScript
- Responsive frontend development
- Tailwind CSS
- Framer Motion
- SVG visualization
- Interactive UI
- Accessibility
- Mobile-first responsive design
- Git/GitHub workflow
- Vite production builds