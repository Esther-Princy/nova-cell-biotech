import { MotionProvider } from './animations'
import { Footer, Navbar, SkipLink } from './components/layout'
import { Capabilities, FinalCTA, Hero, Impact, Innovation, Research } from './components/sections'
import { SectionNavigationProvider } from './hooks/useSectionNavigation'

function App() {
  return (
    <MotionProvider>
      <SectionNavigationProvider>
        <div className="min-h-screen bg-ambient font-body text-text-primary antialiased">
          <SkipLink />
          <Navbar />

          <main id="main-content" tabIndex={-1}>
            <Hero />
            <Innovation />
            <Research />
            <Capabilities />
            <Impact />
            <FinalCTA />
          </main>

          <Footer />
        </div>
      </SectionNavigationProvider>
    </MotionProvider>
  )
}

export default App
