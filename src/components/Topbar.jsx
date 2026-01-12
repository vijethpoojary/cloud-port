import SearchBar from './SearchBar'

const Topbar = ({ activeSection, setActiveSection, search }) => {
  return (
    <header className="h-14 bg-[#232F3E] border-b border-[#0073BB] flex items-center justify-between px-4 relative z-50">
      {/* Left: Logo + Search */}
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="text-xl font-semibold text-white">Vijeth Poojary</div>
          <span className="text-xs text-gray-400 px-2 py-0.5">/</span>
        </div>
        
        {/* AWS-style Global Search */}
        <div className="hidden md:block relative z-[100] flex-1 max-w-[600px]" data-search-container>
          <div className="relative">
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
              placeholder="Search resources, services, docs…"
              className="w-full px-4 py-2 pl-10 pr-20 bg-[#16191F] border border-[#0073BB] rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] transition-colors text-sm"
            />
            {!search.query && (
              <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1.5 text-xs text-gray-400 pointer-events-none">
                <kbd className="px-1.5 py-0.5 bg-[#232F3E] border border-gray-500 rounded text-xs text-gray-300">Ctrl</kbd>
                <span className="text-gray-400">+</span>
                <kbd className="px-1.5 py-0.5 bg-[#232F3E] border border-gray-500 rounded text-xs text-gray-300">K</kbd>
              </div>
            )}
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {search.query && (
              <button
                onClick={() => {
                  search.handleInputChange('')
                  search.setIsOpen(false)
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
                aria-label="Clear search"
                type="button"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
            
            {/* Search Dropdown */}
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
      </div>

      {/* Right: Region Selector, Status, Profile */}
      <div className="flex items-center gap-3 flex-shrink-0">
        {/* Region Selector */}
        <div className="hidden lg:flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2C3E50] transition-colors cursor-pointer">
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="text-sm text-white font-medium">ap-south-1</span>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Status Indicator */}
        <div className="hidden md:flex items-center gap-2 px-2 py-1.5">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-xs text-white">Healthy</span>
        </div>

        {/* Profile Dropdown */}
        <div className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2C3E50] transition-colors cursor-pointer">
          <div className="w-6 h-6 bg-[#0073BB] rounded-full flex items-center justify-center text-white text-xs font-medium">
            VP
          </div>
          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>

        {/* Mobile Search Toggle */}
        <button
          onClick={() => search.setIsOpen(true)}
          className="md:hidden p-2 rounded hover:bg-[#2C3E50] transition-colors"
          aria-label="Open search"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </button>
      </div>
    </header>
  )
}

export default Topbar
