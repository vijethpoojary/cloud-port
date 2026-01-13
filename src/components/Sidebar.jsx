// Import AWS-style service icons
import dashboardIcon from '../assets/icons/dashboard-icon.png'
import documentationIcon from '../assets/icons/documentation-icon.png'
import resourceInventoryIcon from '../assets/icons/resource-inventory-icon.png'
import projectsIcon from '../assets/icons/projects-icon.png'
import observabilityIcon from '../assets/icons/observability-icon.png'
import securityIcon from '../assets/icons/security-icon.png'

const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: dashboardIcon },
    { id: 'documentation', label: 'Documentation', icon: documentationIcon },
    { id: 'services', label: 'Resource Inventory', icon: resourceInventoryIcon },
    { id: 'projects', label: 'Projects / Workloads', icon: projectsIcon },
    { id: 'observability', label: 'Observability', icon: observabilityIcon },
    { id: 'trust', label: 'Security / Compliance', icon: securityIcon },
  ]

  return (
    <aside className="hidden lg:flex w-64 bg-aws-bg-lighter border-r border-aws-border flex-col flex-shrink-0">
      <div className="p-4 border-b border-aws-border">
        <h1 className="text-lg font-semibold text-aws-text-primary">Services</h1>
      </div>
      
      <nav className="flex-1 p-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded text-sm font-medium text-left transition-colors ${
              activeSection === item.id
                ? 'bg-aws-blue-light text-aws-blue border-l-4 border-aws-blue'
                : 'text-aws-text-secondary hover:bg-white hover:text-aws-text-primary'
            }`}
          >
            <img 
              src={item.icon} 
              alt={`${item.label} icon`}
              className="w-5 h-5 flex-shrink-0"
            />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-aws-border">
        <div className="bg-white border border-aws-border rounded-md p-3">
          <p className="text-xs text-aws-text-secondary mb-1.5">System Status</p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
            <span className="text-sm text-aws-text-primary font-medium">Operational</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
