import SearchBar from './SearchBar'

const Topbar = ({ isDark, toggleTheme, activeSection, setActiveSection, search }) => {
  const menuItems = [
    { id: 'overview', label: 'Dashboard', icon: '📊' },
    { id: 'documentation', label: 'Docs', icon: '📚' },
    { id: 'services', label: 'Resources', icon: '☁️' },
    { id: 'projects', label: 'Workloads', icon: '🚀' },
    { id: 'experience', label: 'Evolution', icon: '📈' },
    { id: 'observability', label: 'Telemetry', icon: '📉' },
    { id: 'trust', label: 'Trust', icon: '🛡️' },
    { id: 'contact', label: 'Support', icon: '📬' },
  ]

  return (
    <header className="h-auto lg:h-14 bg-gray-900/80 backdrop-blur-sm border-b border-gray-800 flex flex-col lg:flex-row lg:items-center lg:justify-between px-4 sm:px-6 py-2 lg:py-0 relative z-50">
      <div className="flex items-center gap-3 sm:gap-6 flex-wrap">
        <div className="hidden sm:flex items-center gap-3">
          <span className="text-xs text-gray-500">Account:</span>
          <span className="text-sm font-semibold text-cloud-blue-400">vijeth-poojary-prod</span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs text-gray-500">Region:</span>
          <span className="text-sm font-semibold text-gray-300">ap-south-1</span>
        </div>
        <div className="hidden xl:flex items-center gap-3">
          <span className="text-xs text-gray-500">Environment:</span>
          <span className="text-sm font-semibold text-green-400">Production</span>
        </div>
        <div className="hidden lg:flex items-center gap-3">
          <span className="text-xs text-gray-500">SLA:</span>
          <span className="text-sm font-semibold text-green-400">99.99%</span>
        </div>
        <div className="hidden md:flex items-center gap-2">
          <span className="status-dot bg-green-400"></span>
          <span className="text-xs text-gray-500">No active incidents</span>
        </div>
        
        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center gap-2 overflow-x-auto w-full lg:w-auto -mx-4 sm:-mx-6 px-4 sm:px-6 pb-2 lg:pb-0">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap ${
                activeSection === item.id
                  ? 'bg-cloud-blue-600/20 text-cloud-blue-400 border border-cloud-blue-500/30'
                  : 'text-gray-400 hover:bg-gray-800/50 hover:text-gray-200 border border-transparent'
              }`}
            >
              <span className="mr-1">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 mt-2 lg:mt-0">
        {/* Global Search Input with Dropdown - AWS/Azure style */}
        <div className="hidden md:block relative z-[100]" data-search-container>
          <div className="relative w-[600px]">
            <input
              type="text"
              value={search.query}
              onChange={(e) => {
                search.handleInputChange(e.target.value)
                search.setIsOpen(true)
              }}
              onKeyDown={search.handleKeyDown}
              onFocus={() => search.setIsOpen(true)}
              onClick={() => search.setIsOpen(true)}
              placeholder="Search resources, services, docs..."
              className="w-full px-4 py-2 pl-10 pr-20 bg-gray-900/80 border border-gray-700 rounded-md text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cloud-blue-500 focus:ring-1 focus:ring-cloud-blue-500/50 transition-all text-sm"
            />
            {!search.query && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1.5 text-xs text-gray-500 pointer-events-none">
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-xs">Ctrl</kbd>
                <span>+</span>
                <kbd className="px-1.5 py-0.5 bg-gray-800 rounded text-xs">K</kbd>
              </div>
            )}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
              🔍
            </span>
            {search.query && (
              <button
                onClick={() => {
                  search.handleInputChange('')
                  search.setIsOpen(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors z-10"
                aria-label="Clear search"
                type="button"
              >
                ✕
              </button>
            )}
            
            {/* Search Dropdown - Positioned below input */}
            <SearchBar
              query={search.query}
              results={search.results}
              selectedIndex={search.selectedIndex}
              isOpen={search.isOpen}
              onSelect={search.handleSelect}
              onKeyDown={search.handleKeyDown}
              setSelectedIndex={search.setSelectedIndex}
              onClose={search.closeSearch}
            />
          </div>
        </div>
        
        {/* Mobile Search Toggle */}
        <button
          onClick={() => search.setIsOpen(true)}
          className="md:hidden p-2 rounded-lg glass hover:bg-gray-800/50 transition-colors"
          aria-label="Open search"
        >
          <span className="text-lg">🔍</span>
        </button>

        <div className="md:hidden flex items-center gap-2">
          <span className="status-dot bg-green-400"></span>
          <span className="text-xs text-gray-500">Healthy</span>
        </div>
        <button
          onClick={toggleTheme}
          className="px-3 py-1.5 rounded-lg glass hover:bg-gray-800/50 transition-colors text-xs font-medium text-gray-300"
          aria-label="Toggle theme"
        >
          {isDark ? '☀️ Day Ops' : '🌙 Night Ops'}
        </button>
      </div>
    </header>
  )
}

export default Topbar

