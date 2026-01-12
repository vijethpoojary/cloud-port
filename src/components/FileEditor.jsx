import { useState, useEffect } from 'react'

const FileEditor = ({ filename, content, onSave, onCancel }) => {
  const [editedContent, setEditedContent] = useState(content)
  const [cursorPos, setCursorPos] = useState(0)

  useEffect(() => {
    setEditedContent(content)
    setCursorPos(content.length)
  }, [content])

  const handleSave = () => {
    onSave(editedContent)
  }

  const handleKeyDown = (e) => {
    // Ctrl+X to exit (nano-style)
    if (e.ctrlKey && e.key === 'x') {
      handleSave()
      e.preventDefault()
    }
    
    // Ctrl+O to save
    if (e.ctrlKey && e.key === 'o') {
      handleSave()
      e.preventDefault()
    }

    // Escape to cancel
    if (e.key === 'Escape') {
      onCancel()
      e.preventDefault()
    }
  }

  return (
    <div className="fixed inset-0 bg-black/80 z-[10000] flex items-center justify-center p-4">
      <div className="bg-[#1E293B] border border-[#334155] rounded-md w-full max-w-4xl h-[80vh] flex flex-col shadow-2xl">
        {/* Editor Header */}
        <div className="flex items-center justify-between px-4 py-2 bg-[#0F172A] border-b border-[#334155]">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-300 font-mono">{filename}</span>
            <span className="text-xs text-gray-500">- GNU nano</span>
          </div>
          <button
            onClick={onCancel}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Editor Content */}
        <textarea
          value={editedContent}
          onChange={(e) => {
            setEditedContent(e.target.value)
            setCursorPos(e.target.selectionStart)
          }}
          onKeyDown={handleKeyDown}
          className="flex-1 p-4 bg-[#0F172A] text-[#E2E8F0] font-mono text-sm resize-none focus:outline-none"
          style={{ 
            fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
            tabSize: 2,
          }}
          spellCheck={false}
          autoFocus
        />

        {/* Editor Footer (nano-style) */}
        <div className="px-4 py-2 bg-[#0F172A] border-t border-[#334155] text-xs text-gray-400 font-mono">
          <div className="flex items-center justify-between">
            <div className="flex gap-4">
              <span>^O Write Out</span>
              <span>^X Exit</span>
              <span>Esc Cancel</span>
            </div>
            <button
              onClick={handleSave}
              className="px-3 py-1 bg-[#0073BB] hover:bg-[#005A94] text-white rounded text-xs font-medium transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FileEditor

