import { useState } from 'react'
import SearchBar from './SearchBar'
import VPLogo from './VPLogo'

const Topbar = ({ activeSection, setActiveSection, search, onCloudShellToggle, isCloudShellOpen }) => {
  const [showServicesMenu, setShowServicesMenu] = useState(false)
  const [showRegionMenu, setShowRegionMenu] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  return (
    <header className="h-14 bg-[#232F3E] border-b border-[#1a232e] flex items-center justify-between px-4 relative z-50 rounded-t-lg">
      {/* Left: Logo + Grid Menu + Search */}
      <div className="flex items-center gap-3 flex-1 min-w-0">
        {/* VP Logo */}
        <div className="flex-shrink-0">
          <VPLogo className="w-20 h-6" />
        </div>

        {/* Grid Menu Icon */}
        <button
          onClick={() => setShowServicesMenu(!showServicesMenu)}
          className="p-2 rounded hover:bg-[#2C3E50] transition-colors flex-shrink-0"
          title="Services"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
          </svg>
        </button>
        
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
              placeholder="Search"
              className="w-full px-4 py-2 pl-10 pr-24 bg-[#16191F] border border-gray-600 rounded text-white placeholder-gray-400 focus:outline-none focus:border-[#0073BB] focus:ring-1 focus:ring-[#0073BB] transition-colors text-sm"
            />
            {/* Search Icon */}
            <svg 
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            
            {/* Keyboard Shortcut Indicator */}
            {!search.query && (
              <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1 text-xs text-gray-400 pointer-events-none">
                <span className="px-1.5 py-0.5 bg-[#232F3E] border border-gray-600 rounded text-xs">Option+S</span>
              </div>
            )}
            
            {/* Clear button */}
            {search.query && (
              <button
                onClick={() => {
                  search.handleInputChange('')
                  search.setIsOpen(false)
                }}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors z-10"
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

      {/* Right: Icons + Region + User */}
      <div className="flex items-center gap-0 flex-shrink-0">
        {/* Divider */}
        <div className="h-6 w-px bg-gray-600 mx-2"></div>
        
        {/* Terminal Icon (CloudShell) */}
        <button
          onClick={onCloudShellToggle}
          className={`p-2 rounded hover:bg-[#2C3E50] transition-colors ${isCloudShellOpen ? 'bg-[#2C3E50]' : ''}`}
          title="CloudShell"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        {/* Bell Icon (Notifications) */}
        <button
          className="p-2 rounded hover:bg-[#2C3E50] transition-colors"
          title="Notifications"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        {/* Question Mark Icon (Help) */}
        <button
          className="p-2 rounded hover:bg-[#2C3E50] transition-colors"
          title="Help"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        {/* Gear Icon (Settings) */}
        <button
          className="p-2 rounded hover:bg-[#2C3E50] transition-colors"
          title="Settings"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        {/* Region Selector */}
        <div className="relative">
          <button
            onClick={() => setShowRegionMenu(!showRegionMenu)}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded hover:bg-[#2C3E50] transition-colors"
          >
            <span className="text-sm text-white font-medium">N. Virginia</span>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Divider */}
        <div className="h-6 w-px bg-gray-600 mx-2"></div>

        {/* User Account Info */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2 px-2 py-1.5 rounded hover:bg-[#2C3E50] transition-colors"
          >
            <div className="text-left">
              <div className="text-xs text-white leading-tight">Read/Write</div>
              <div className="text-xs text-gray-300 leading-tight">vijeth@example.com</div>
              <div className="text-xs text-gray-400 leading-tight">@ 1111-2222-3333</div>
            </div>
            <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Mobile Search Toggle */}
        <button
          onClick={() => search.setIsOpen(true)}
          className="md:hidden p-2 rounded hover:bg-[#2C3E50] transition-colors ml-2"
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
