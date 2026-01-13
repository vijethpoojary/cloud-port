import { useState } from 'react'
import Sidebar from './components/Sidebar'
import Topbar from './components/Topbar'
import AwsFooter from './components/AwsFooter'
import CloudShell from './components/CloudShell'
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
  const [isCloudShellOpen, setIsCloudShellOpen] = useState(false)
  const search = useGlobalSearch(setActiveSection)

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
    <div className="min-h-screen bg-aws-bg-light flex flex-col" style={{ paddingBottom: '36px' }}>
      <Topbar 
        activeSection={activeSection} 
        setActiveSection={setActiveSection}
        search={search}
        onCloudShellToggle={() => setIsCloudShellOpen(!isCloudShellOpen)}
        isCloudShellOpen={isCloudShellOpen}
      />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar activeSection={activeSection} setActiveSection={setActiveSection} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-aws-bg-light">
          <div className="max-w-7xl mx-auto animate-fade-in">
            {renderSection()}
          </div>
        </main>
      </div>
      <AwsFooter 
        isCloudShellOpen={isCloudShellOpen}
        onCloudShellToggle={() => setIsCloudShellOpen(!isCloudShellOpen)}
      />
      <CloudShell
        isOpen={isCloudShellOpen}
        onClose={() => setIsCloudShellOpen(false)}
      />
    </div>
  )
}

export default App

