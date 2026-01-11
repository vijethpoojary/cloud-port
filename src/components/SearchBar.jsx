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
        // Only close if click is outside both the dropdown and the search input container
        if (!containerRef.current.contains(event.target) && !searchContainer) {
          onClose()
        }
      }
    }

    if (isOpen) {
      // Use a slight delay to avoid closing when opening via click
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
    <div ref={containerRef} className="absolute top-full left-0 mt-1 w-[600px] z-[9999]">
      {/* Search Results Dropdown - AWS/Azure style */}
      {results.length > 0 && (
        <div className="bg-gray-900 border border-gray-700 rounded-md shadow-2xl max-h-[70vh] overflow-hidden flex flex-col animate-slide-up">
          <div ref={resultsRef} className="overflow-y-auto">
            {Object.entries(groupedResults).map(([category, items]) => (
              <div key={category} className="border-b border-gray-700 last:border-b-0">
                <div className="px-4 py-2.5 bg-gray-800/50 border-b border-gray-700 flex items-center justify-between">
                  <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
                    {category}
                  </span>
                  <span className="text-xs text-gray-500">
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
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-all ${
                          isSelected
                            ? 'bg-cloud-blue-600/20 text-cloud-blue-300 border-l-2 border-cloud-blue-500'
                            : 'text-gray-300 hover:bg-gray-800/50 hover:text-gray-100'
                        }`}
                        onMouseEnter={() => {
                          if (setSelectedIndex) {
                            setSelectedIndex(globalIndex)
                          }
                        }}
                      >
                        <span className="text-lg flex-shrink-0">{item.icon}</span>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-0.5">
                            <span className="text-sm font-medium truncate">{item.label}</span>
                            <span className={`px-1.5 py-0.5 rounded text-xs font-medium flex-shrink-0 ${
                              item.type === 'section' ? 'bg-blue-500/20 text-blue-400' :
                              item.type === 'service' ? 'bg-green-500/20 text-green-400' :
                              'bg-purple-500/20 text-purple-400'
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
                          <span className="text-cloud-blue-400 text-xs flex-shrink-0">Enter →</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
          
          {/* Footer with keyboard hints */}
          <div className="px-4 py-2 border-t border-gray-700 bg-gray-800/50 flex items-center justify-between text-xs text-gray-400 flex-shrink-0">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">↑</kbd>
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">↓</kbd>
                <span>Navigate</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">Enter</kbd>
                <span>Select</span>
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-700 rounded text-xs">Esc</kbd>
                <span>Close</span>
              </span>
            </div>
            <span className="font-medium text-gray-300">{results.length} total</span>
          </div>
        </div>
      )}

      {/* No Results */}
      {query && results.length === 0 && (
        <div className="bg-gray-900 border border-gray-700 rounded-md shadow-2xl p-6 text-center animate-slide-up">
          <span className="text-3xl mb-2 block">🔍</span>
          <p className="text-gray-300 font-medium mb-1">No resources found</p>
          <p className="text-xs text-gray-400">Try searching for "services", "projects", "docs", or "aws"</p>
        </div>
      )}

      {/* Empty State - Show suggestions when no query */}
      {!query && (
        <div className="bg-gray-900 border border-gray-700 rounded-md shadow-2xl p-6 animate-slide-up">
          <p className="text-gray-400 text-sm mb-2 text-center">Type to search resources, services, and sections</p>
          <p className="text-xs text-gray-500 text-center">Try: docs, services, docker, aws, projects</p>
        </div>
      )}
    </div>
  )
}

export default SearchBar

