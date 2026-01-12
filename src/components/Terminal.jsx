import { useEffect, useRef, useState } from 'react'
import { Terminal as XTerm } from '@xterm/xterm'
import { FitAddon } from '@xterm/addon-fit'
import '@xterm/xterm/css/xterm.css'
import VirtualFileSystem from '../utils/FileSystem'
import ShellInterpreter from '../utils/ShellInterpreter'

const Terminal = ({ isOpen, onClose, onEditFile }) => {
  const terminalRef = useRef(null)
  const xtermRef = useRef(null)
  const fitAddonRef = useRef(null)
  const fileSystemRef = useRef(null)
  const interpreterRef = useRef(null)
  const isEditingRef = useRef(false)
  const currentLineRef = useRef('')
  const historyRef = useRef([])
  const historyIndexRef = useRef(-1)
  const isInitializedRef = useRef(false)
  const [isMaximized, setIsMaximized] = useState(false)
  const [terminalHeight, setTerminalHeight] = useState(45) // Height in vh units
  const [isResizing, setIsResizing] = useState(false)
  const isResizingRef = useRef(false)
  const startYRef = useRef(0)
  const startHeightRef = useRef(0)

  // Initialize filesystem only once
  useEffect(() => {
    if (!fileSystemRef.current) {
      fileSystemRef.current = new VirtualFileSystem()
    }
  }, [])

  useEffect(() => {
    if (!terminalRef.current || !isOpen) return

    // Don't reinitialize if terminal already exists
    if (xtermRef.current) {
      return
    }

    // Initialize terminal
    const xterm = new XTerm({
      cursorBlink: true,
      fontSize: 13,
      fontFamily: '"JetBrains Mono", "Fira Code", "Consolas", monospace',
      theme: {
        background: '#0F172A',
        foreground: '#E2E8F0',
        cursor: '#10B981',
        cursorAccent: '#10B981',
        selection: '#1E293B',
      },
      allowProposedApi: true,
      rows: 20,
      wordWrap: true,
    })

    const fitAddon = new FitAddon()
    xterm.loadAddon(fitAddon)

    xterm.open(terminalRef.current)
    fitAddon.fit()

    xtermRef.current = xterm
    fitAddonRef.current = fitAddon

    // Use existing filesystem or create new one
    const fs = fileSystemRef.current || new VirtualFileSystem()
    if (!fileSystemRef.current) {
      fileSystemRef.current = fs
    }
    
    const interpreter = new ShellInterpreter(fs, xterm)
    interpreterRef.current = interpreter

    // Welcome message - only show once
    if (!isInitializedRef.current) {
      xterm.writeln('Welcome to AWS CloudShell-style Terminal')
      xterm.writeln('')
      xterm.writeln("Type 'help' for available commands.")
      xterm.writeln("Type 'exit' to close.")
      xterm.writeln('')
      isInitializedRef.current = true
    }

    const showPrompt = () => {
      if (isEditingRef.current) return
      const cwd = fs.getFullPath()
      xterm.write(`\x1b[32mvijeth@cloudshell\x1b[0m:\x1b[34m${cwd}\x1b[0m$ `)
    }

    const handleCommand = async (command) => {
      if (!command) {
        showPrompt()
        return
      }

      const result = await interpreter.executeCommand(command)

      if (result.exit) {
        onClose()
        return
      }

      if (result.silent) {
        showPrompt()
        return
      }

      if (result.edit) {
        isEditingRef.current = true
        // Resolve file path relative to current directory
        const filePath = result.file
        const resolvedPath = fs.resolvePath(filePath)
        
        const fileResult = fs.readFile(resolvedPath)
        if (fileResult.success) {
          onEditFile(filePath, fileResult.content, (newContent) => {
            // Use resolved path when saving
            fs.writeFile(resolvedPath, newContent)
            isEditingRef.current = false
            xterm.writeln(`\nFile saved: ${filePath}`)
            showPrompt()
          }, () => {
            isEditingRef.current = false
            xterm.writeln('\nFile editing cancelled.')
            showPrompt()
          })
        } else {
          onEditFile(filePath, '', (newContent) => {
            // Use resolved path when saving
            fs.writeFile(resolvedPath, newContent)
            isEditingRef.current = false
            xterm.writeln(`\nFile created: ${filePath}`)
            showPrompt()
          }, () => {
            isEditingRef.current = false
            xterm.writeln('\nFile creation cancelled.')
            showPrompt()
          })
        }
        return
      }

      if (result.success) {
        if (result.output) {
          // Split multi-line output and write each line separately for proper alignment
          const lines = result.output.split('\n')
          lines.forEach(line => {
            xterm.writeln(line)
          })
        }
        if (result.items) {
          const items = result.items
            .sort((a, b) => {
              if (a.type === b.type) return a.name.localeCompare(b.name)
              return a.type === 'dir' ? -1 : 1
            })
            .map(item => {
              const color = item.type === 'dir' ? '\x1b[34m' : '\x1b[0m'
              return `${color}${item.name}\x1b[0m`
            })
            .join('  ')
          
          if (items) {
            xterm.writeln(items)
          }
        }
      } else {
        xterm.writeln(`\x1b[31m${result.error}\x1b[0m`)
      }

      interpreter.resetHistoryIndex()
      currentLineRef.current = ''
      historyIndexRef.current = -1
      showPrompt()
    }

    // Handle input
    xterm.onData((data) => {
      if (isEditingRef.current) return

      const code = data.charCodeAt(0)

      if (code === 13) {
        // Enter
        xterm.write('\r\n')
        const command = currentLineRef.current
        handleCommand(command)
        if (command.trim()) {
          historyRef.current.push(command.trim())
          if (historyRef.current.length > 50) {
            historyRef.current.shift()
          }
        }
        currentLineRef.current = ''
        historyIndexRef.current = -1
      } else if (code === 127) {
        // Backspace
        if (currentLineRef.current.length > 0) {
          currentLineRef.current = currentLineRef.current.slice(0, -1)
          xterm.write('\b \b')
        }
      } else if (code === 27) {
        // Escape sequences
        if (data.length > 1) {
          const sequence = data.slice(1)
          if (sequence === '[A') {
            // Up arrow - history
            if (historyRef.current.length > 0) {
              if (historyIndexRef.current === -1) {
                historyIndexRef.current = historyRef.current.length - 1
              } else if (historyIndexRef.current > 0) {
                historyIndexRef.current--
              }
              // Clear and redraw line
              const prompt = `\x1b[32mvijeth@cloudshell\x1b[0m:\x1b[34m${fs.getFullPath()}\x1b[0m$ `
              xterm.write('\r')
              xterm.write('\x1b[K')
              xterm.write(prompt)
              currentLineRef.current = historyRef.current[historyIndexRef.current]
              xterm.write(currentLineRef.current)
            }
          } else if (sequence === '[B') {
            // Down arrow
            if (historyIndexRef.current !== -1) {
              if (historyIndexRef.current < historyRef.current.length - 1) {
                historyIndexRef.current++
                const prompt = `\x1b[32mvijeth@cloudshell\x1b[0m:\x1b[34m${fs.getFullPath()}\x1b[0m$ `
                xterm.write('\r')
                xterm.write('\x1b[K')
                xterm.write(prompt)
                currentLineRef.current = historyRef.current[historyIndexRef.current]
                xterm.write(currentLineRef.current)
              } else {
                historyIndexRef.current = -1
                const prompt = `\x1b[32mvijeth@cloudshell\x1b[0m:\x1b[34m${fs.getFullPath()}\x1b[0m$ `
                xterm.write('\r')
                xterm.write('\x1b[K')
                xterm.write(prompt)
                currentLineRef.current = ''
              }
            }
          } else {
            // Other escape sequences (arrow keys, etc.)
            xterm.write(data)
          }
        }
      } else if (code >= 32) {
        // Regular character
        currentLineRef.current += data
        xterm.write(data)
      }
    })

    showPrompt()

    // Handle window resize
    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit()
      }
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
      // Only dispose terminal when it's actually closed (isOpen becomes false)
      // Don't dispose when editor opens/closes
    }
  }, [isOpen])

  // Cleanup when terminal is closed
  useEffect(() => {
    if (!isOpen && xtermRef.current) {
      xtermRef.current.dispose()
      xtermRef.current = null
      fitAddonRef.current = null
      interpreterRef.current = null
      isInitializedRef.current = false
      setIsMaximized(false) // Reset maximize state when closed
      setTerminalHeight(45) // Reset height when closed
      setIsResizing(false)
      isResizingRef.current = false
      document.body.style.cursor = ''
      document.body.style.userSelect = ''
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen && fitAddonRef.current) {
      setTimeout(() => {
        fitAddonRef.current?.fit()
      }, 100)
    }
  }, [isOpen])

  // Refit terminal when maximize state or height changes
  useEffect(() => {
    if (isOpen && fitAddonRef.current) {
      setTimeout(() => {
        fitAddonRef.current?.fit()
      }, 100)
    }
  }, [isMaximized, isOpen, terminalHeight])

  const toggleMaximize = () => {
    setIsMaximized(!isMaximized)
  }

  // Handle mouse down on resize handle
  const handleResizeStart = (e) => {
    if (isMaximized) return
    isResizingRef.current = true
    setIsResizing(true)
    startYRef.current = e.clientY
    startHeightRef.current = terminalHeight
    document.body.style.cursor = 'ns-resize'
    document.body.style.userSelect = 'none'
    e.preventDefault()
  }

  // Handle mouse move and end during resize
  useEffect(() => {
    if (!isOpen) return

    const handleResizeMove = (e) => {
      if (!isResizingRef.current || isMaximized) return

      const deltaY = startYRef.current - e.clientY // Inverted because we're dragging up
      const viewportHeight = window.innerHeight
      const deltaVh = (deltaY / viewportHeight) * 100
      const newHeight = Math.max(20, Math.min(90, startHeightRef.current + deltaVh))
      
      setTerminalHeight(newHeight)
    }

    const handleResizeEnd = () => {
      if (isResizingRef.current) {
        isResizingRef.current = false
        setIsResizing(false)
        document.body.style.cursor = ''
        document.body.style.userSelect = ''
        // Refit terminal after resize
        if (fitAddonRef.current) {
          setTimeout(() => {
            fitAddonRef.current?.fit()
          }, 50)
        }
      }
    }

    // Always attach listeners, they check isResizingRef internally
    document.addEventListener('mousemove', handleResizeMove)
    document.addEventListener('mouseup', handleResizeEnd)

    return () => {
      document.removeEventListener('mousemove', handleResizeMove)
      document.removeEventListener('mouseup', handleResizeEnd)
    }
  }, [isOpen, isMaximized])

  if (!isOpen) return null

  const heightValue = isMaximized ? '100vh' : `${terminalHeight}vh`
  const terminalContentHeight = isMaximized ? 'calc(100vh - 40px)' : `calc(${terminalHeight}vh - 40px)`

  return (
    <div 
      className={`fixed bottom-0 left-0 right-0 bg-[#0F172A] border-t border-[#1E293B] z-[9999] ${isMaximized ? '' : 'animate-slide-up'} ${isResizing ? '' : 'transition-all duration-300'}`}
      style={{ height: heightValue, top: isMaximized ? '0' : 'auto' }}
    >
      {/* Resize handle */}
      {!isMaximized && (
        <div
          onMouseDown={handleResizeStart}
          className="absolute top-0 left-0 right-0 h-2 bg-transparent hover:bg-[#10B981]/30 cursor-ns-resize z-10 transition-colors group"
          style={{ cursor: 'ns-resize' }}
          title="Drag to resize terminal"
        >
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-0.5 bg-gray-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
      <div className="flex items-center justify-between px-4 py-2 border-b border-[#1E293B] bg-[#1E293B]">
        <div className="flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-gray-400 ml-2 font-mono">CloudShell Terminal</span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={toggleMaximize}
            className="text-gray-400 hover:text-white px-3 py-1 text-sm transition-colors rounded hover:bg-[#334155]"
            title={isMaximized ? 'Minimize' : 'Maximize'}
          >
            {isMaximized ? (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9V4.5M9 9H4.5M9 9L3.75 3.75M9 15v4.5M9 15H4.5M9 15l-5.25 5.25M15 9h4.5M15 9V4.5M15 9l5.25-5.25M15 15h4.5M15 15v4.5m0-4.5l5.25 5.25" />
              </svg>
            ) : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            )}
          </button>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white px-3 py-1 text-sm transition-colors rounded hover:bg-[#334155]"
          >
            Close
          </button>
        </div>
      </div>
      <div ref={terminalRef} className="h-full w-full p-2" style={{ height: terminalContentHeight }} />
    </div>
  )
}

export default Terminal
