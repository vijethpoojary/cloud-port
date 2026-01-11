import { useState, useEffect, useCallback } from 'react'
import { searchServices } from '../data/searchIndex'

export const useGlobalSearch = (onNavigate) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [isOpen, setIsOpen] = useState(false)

  // Debounced search
  useEffect(() => {
    if (!query.trim()) {
      setResults([])
      setSelectedIndex(0)
      return
    }

    const timeoutId = setTimeout(() => {
      const searchResults = searchServices(query, [])
      setResults(searchResults)
      setSelectedIndex(0)
    }, 150) // Debounce delay

    return () => clearTimeout(timeoutId)
  }, [query])

  const handleInputChange = useCallback((value) => {
    setQuery(value)
  }, [])

  const handleSelect = useCallback((item) => {
    if (item.route && onNavigate) {
      onNavigate(item.route)
      setIsOpen(false)
      setQuery('')
      setResults([])
      
      // Smooth scroll to top of content area after navigation
      setTimeout(() => {
        const mainElement = document.querySelector('main')
        if (mainElement) {
          mainElement.scrollTo({ top: 0, behavior: 'smooth' })
        }
      }, 100)
    }
  }, [onNavigate])

  // Handle Ctrl+K shortcut globally
  useEffect(() => {
    const handleGlobalKeyPress = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k' && e.target.tagName !== 'INPUT' && e.target.tagName !== 'TEXTAREA') {
        e.preventDefault()
        setIsOpen(true)
        // Focus will be handled by SearchBar component
      }
    }
    
    document.addEventListener('keydown', handleGlobalKeyPress)
    return () => document.removeEventListener('keydown', handleGlobalKeyPress)
  }, [setIsOpen])

  const closeSearch = useCallback(() => {
    setIsOpen(false)
    setQuery('')
    setResults([])
  }, [])

  const handleKeyDown = useCallback((e) => {
    // Handle Ctrl+K to open search (when input is focused)
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      setIsOpen(true)
      return
    }

    // Always handle Escape
    if (e.key === 'Escape') {
      e.preventDefault()
      closeSearch()
      return
    }

    // Other keyboard navigation only works when search is open with results
    if (!isOpen || results.length === 0) {
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        setSelectedIndex((prev) => (prev + 1) % results.length)
        break
      case 'ArrowUp':
        e.preventDefault()
        setSelectedIndex((prev) => (prev - 1 + results.length) % results.length)
        break
      case 'Enter':
        e.preventDefault()
        if (results[selectedIndex]) {
          handleSelect(results[selectedIndex])
        }
        break
      default:
        break
    }
  }, [isOpen, results, selectedIndex, handleSelect, setIsOpen, closeSearch])

  return {
    query,
    results,
    selectedIndex,
    isOpen,
    handleInputChange,
    handleSelect,
    handleKeyDown,
    closeSearch,
    setIsOpen,
    setSelectedIndex,
  }
}

