import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import Overview from './components/Overview'
import Documentation from './components/Documentation'
import Services from './components/Services'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Observability from './components/Observability'
import TrustCompliance from './components/TrustCompliance'
import Contact from './components/Contact'
import { useGlobalSearch } from './hooks/useGlobalSearch'

function App() {
  const [activeSection, setActiveSection] = useState('overview')
  const [isDark, setIsDark] = useState(true)
  const search = useGlobalSearch(setActiveSection)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'overview':
        return <Overview onNavigate={setActiveSection} />
      case 'documentation':
        return <Documentation />
      case 'services':
        return <Services />
      case 'projects':
        return <Projects />
      case 'experience':
        return <Experience />
      case 'observability':
        return <Observability />
      case 'trust':
        return <TrustCompliance />
      case 'contact':
        return <Contact />
      default:
        return <Overview onNavigate={setActiveSection} />
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <Topbar 
        isDark={isDark} 
        toggleTheme={toggleTheme} 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        search={search}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {renderSection()}
          </div>
        </main>
      </div>
    </div>
  )
}

export default App

