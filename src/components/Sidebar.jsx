const Sidebar = ({ activeSection, setActiveSection }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'documentation', label: 'Documentation', icon: '📚' },
    { id: 'services', label: 'Resource Inventory', icon: '☁️' },
    { id: 'projects', label: 'Deployed Workloads', icon: '🚀' },
    { id: 'experience', label: 'Platform Evolution', icon: '📈' },
    { id: 'observability', label: 'Observability', icon: '📉' },
    { id: 'trust', label: 'Trust & Compliance', icon: '🛡️' },
    { id: 'contact', label: 'Support / Deploy Ticket', icon: '📬' },
  ]

  return (
    <aside className="hidden lg:flex w-64 bg-gray-900/80 backdrop-blur-sm border-r border-gray-800 flex-col">
      <div className="p-6 border-b border-gray-800">
        <h1 className="text-xl font-bold text-cloud-blue-400">Vijeth Poojary</h1>
        <p className="text-xs text-gray-500 mt-1">Cloud & Full-Stack Engineer</p>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveSection(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-left ${
              activeSection === item.id
                ? 'bg-cloud-blue-600/20 text-cloud-blue-400 border border-cloud-blue-500/30'
                : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200'
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span className="text-sm font-medium">{item.label}</span>
            {activeSection === item.id && (
              <span className="ml-auto status-dot bg-cloud-blue-400"></span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-800">
        <div className="glass rounded-lg p-3">
          <p className="text-xs text-gray-500 mb-1">System Status</p>
          <div className="flex items-center gap-2">
            <span className="status-dot bg-green-400"></span>
            <span className="text-sm text-gray-300">Operational</span>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

