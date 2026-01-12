const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'documentation', label: 'Documentation', icon: '📚' },
    { id: 'services', label: 'Resource Inventory', icon: '☁️' },
    { id: 'projects', label: 'Projects / Workloads', icon: '🚀' },
    { id: 'observability', label: 'Observability', icon: '📉' },
    { id: 'trust', label: 'Security / Compliance', icon: '🛡️' },
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
            <span className="text-base flex-shrink-0">{item.icon}</span>
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
