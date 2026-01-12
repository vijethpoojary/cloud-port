import { useEffect, useRef } from 'react'

const SearchBar = ({ query, results, selectedIndex, isOpen, onSelect, onKeyDown, setSelectedIndex, onClose }) => {
  const resultsRef = useRef(null)
  const containerRef = useRef(null)

  // Scroll selected item into view
  useEffect(() => {
    if (resultsRef.current && results.length > 0 && selectedIndex >= 0) {
      const selectedElement = resultsRef.current.querySelector(`[data-result-index="${selectedIndex}"]`)
      if (selectedElement) {
        selectedElement.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
      }
    }
  }, [selectedIndex, results.length])

  // Handle click outside to close
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isOpen && containerRef.current) {
        const searchContainer = event.target.closest('[data-search-container]')
        if (!containerRef.current.contains(event.target) && !searchContainer) {
          onClose()
        }
      }
    }

    if (isOpen) {
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside)
      }, 100)
      return () => {
        clearTimeout(timeoutId)
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }
  }, [isOpen, onClose])

  // Group results by type
  const groupedResults = results.reduce((acc, result) => {
    const category = result.type === 'section' ? 'Sections' : 
                     result.type === 'service' ? 'Services' : 
                     result.type === 'project' ? 'Projects' : 'Other'
    
    if (!acc[category]) acc[category] = []
    acc[category].push(result)
    return acc
  }, {})

  // Don't render if not open
  if (!isOpen) return null

  return (
    <div ref={containerRef} className="absolute top-full left-0 mt-1 w-full z-[9999]">
      {/* Search Results Dropdown - AWS style with dark background */}
      {results.length > 0 && (
        <div className="bg-[#232F3E] border border-[#1a232e] rounded-md shadow-lg max-h-[70vh] overflow-hidden flex flex-col animate-slide-up">
          <div ref={resultsRef} className="overflow-y-auto">
            {Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="border-b border-[#1a232e] last:border-b-0">
                <div className="px-4 py-2 bg-[#2C3E50] border-b border-[#1a232e] flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-300 uppercase tracking-wide">
                    {category}
                  </span>
                  <span className="text-xs text-gray-400">
                    {items.length} {items.length === 1 ? 'result' : 'results'}
                  </span>
                </div>
                <div className="py-1">
                  {items.map((item) => {
                    const globalIndex = results.indexOf(item)
                    const isSelected = globalIndex === selectedIndex
                    
                    return (
                      <button
                        key={item.id}
                        data-result-index={globalIndex}
                        onClick={() => onSelect(item)}
                        onKeyDown={onKeyDown}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors ${
                          isSelected
                            ? 'bg-[#0073BB] text-white'
                            : 'text-gray-200 hover:bg-[#2C3E50]'
                        }`}
                        onMouseEnter={() => {
                          if (setSelectedIndex) {
                            setSelectedIndex(globalIndex)
                          }
                        }}
                      >
                        <span className="text-base flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-medium truncate">{item.label}</span>
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                              item.type === 'section' ? 'bg-blue-600 text-white' :
                              item.type === 'service' ? 'bg-green-600 text-white' :
                              'bg-purple-600 text-white'
                            }`}>
                              {item.type}
                            </span>
                          </div>
                          <p className="text-xs text-gray-400 truncate">{item.description}</p>
                          {item.category && item.type !== 'section' && (
                            <p className="text-xs text-gray-500 mt-0.5 truncate">{item.category}</p>
                          )}
                        </div>
                        {isSelected && (
                          <span className="text-white text-xs flex-shrink-0">Enter →</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer with keyboard hints */}
          <div className="px-4 py-2 border-t border-[#1a232e] bg-[#2C3E50] flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#1a232e] border border-[#1a232e] rounded text-xs text-gray-300">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-[#1a232e] border border-[#1a232e] rounded text-xs text-gray-300">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#1a232e] border border-[#1a232e] rounded text-xs text-gray-300">Enter</kbd>
                <span>Select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-[#1a232e] border border-[#1a232e] rounded text-xs text-gray-300">Esc</kbd>
                <span>Close</span>
              </span>
            </div>
            <span className="font-medium text-gray-300">{results.length} total</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {query && results.length === 0 && (
        <div className="bg-[#232F3E] border border-[#1a232e] rounded-md shadow-lg p-6 text-center animate-slide-up">
          <svg className="w-8 h-8 text-gray-400 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <p className="text-gray-200 font-medium mb-1">No resources found</p>
          <p className="text-xs text-gray-400">Try searching for "services", "projects", "docs", or "aws"</p>
        </div>
      )}

      {/* Empty State - Show suggestions when no query */}
      {!query && (
        <div className="bg-[#232F3E] border border-[#1a232e] rounded-md shadow-lg p-6 animate-slide-up">
          <p className="text-gray-300 text-sm mb-2 text-center">Type to search resources, services, and sections</p>
          <p className="text-xs text-gray-400 text-center">Try: docs, services, docker, aws, projects</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar
