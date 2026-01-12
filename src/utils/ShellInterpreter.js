// Shell Command Interpreter
class ShellInterpreter {
  constructor(fileSystem, terminal) {
    this.fs = fileSystem
    this.terminal = terminal
    this.commandHistory = []
    this.historyIndex = -1
    this.loadHistory()
  }

  async executeCommand(input) {
    const trimmed = input.trim()
    if (!trimmed) return

    this.addToHistory(trimmed)

    const parts = trimmed.split(/\s+/)
    const command = parts[0]
    const args = parts.slice(1)

    switch (command) {
      case 'pwd':
        return { success: true, output: this.fs.pwd() }
      
      case 'ls':
        return this.fs.ls(args[0] || '.')
      
      case 'echo':
        if (args.length === 0) {
          return { success: true, output: '' }
        }
        // Remove quotes from echo arguments
        const echoText = args.join(' ').replace(/^["']|["']$/g, '')
        return { success: true, output: echoText }
      
      case 'cd':
        return this.fs.cd(args[0])
      
      case 'mkdir':
        if (!args[0]) {
          return { success: false, error: 'mkdir: missing operand\nTry \'mkdir --help\' for more information.' }
        }
        return this.fs.mkdir(args[0])
      
      case 'touch':
        if (!args[0]) {
          return { success: false, error: 'touch: missing file operand\nTry \'touch --help\' for more information.' }
        }
        return this.fs.touch(args[0])
      
      case 'rm':
        if (!args[0]) {
          return { success: false, error: 'rm: missing operand\nTry \'rm --help\' for more information.' }
        }
        return this.fs.rm(args[0])
      
      case 'cat':
        if (!args[0]) {
          return { success: false, error: 'cat: missing operand\nTry \'cat --help\' for more information.' }
        }
        return this.fs.cat(args[0])
      
      case 'clear':
        this.terminal.clear()
        return { success: true, silent: true }
      
      case 'exit':
        return { success: true, exit: true }
      
      case 'whoami':
        return { success: true, output: 'vijeth' }
      
      case 'help':
        return this.showHelp()
      
      case 'neofetch':
        return this.neofetch()
      
      case 'projects':
        return { success: true, output: this.getProjectsInfo() }
      
      case 'skills':
        return { success: true, output: this.getSkillsInfo() }
      
      case 'experience':
        return { success: true, output: this.getExperienceInfo() }
      
      case 'nano':
        if (!args[0]) {
          return { success: false, error: 'nano: missing file operand' }
        }
        return { success: true, edit: true, file: args[0] }
      
      case 'bash':
      case 'sh':
        if (!args[0]) {
          return { success: false, error: `${command}: missing script operand` }
        }
        return this.executeScript(args[0])
      
      default:
        return { success: false, error: `${command}: command not found\nTry 'help' for available commands.` }
    }
  }

  showHelp() {
    const help = `Available commands:

Navigation & Files:
  pwd                 - Print working directory
  ls [dir]            - List directory contents
  cd [dir]            - Change directory
  mkdir <dir>         - Create directory
  touch <file>        - Create empty file
  rm <file>           - Remove file
  cat <file>          - Display file contents
  echo <text>         - Display text
  nano <file>         - Edit file
  clear               - Clear terminal

System & Info:
  whoami              - Display current user
  help                - Show this help message
  neofetch            - Display system information

Portfolio Commands:
  projects            - Show deployed projects
  skills              - Show technical skills
  experience          - Show work experience

Scripting:
  bash <script>       - Execute shell script
  sh <script>         - Execute shell script

Other:
  exit                - Close terminal

Note: This is a sandboxed CloudShell-style terminal for demonstration purposes.
No real system commands are executed.`
    
    return { success: true, output: help }
  }

  neofetch() {
    const output = `
       ___      ___
      /  _\\____/_  \\
      >  _<  _  >  <
      |  | || | |  |
      |__| ||_| |__|
      
   OS: CloudShell Linux
   Host: AWS Console Portfolio
   Kernel: 6.1.0-cloudshell
   Uptime: 99.99%
   Shell: bash 5.2.0
   CPU: AWS Graviton2
   Memory: 1Gi / 2Gi
   Disk: 10Gi / 20Gi
   User: vijeth
`
    return { success: true, output }
  }

  getProjectsInfo() {
    return `Deployed Workloads:

1. Rental App
   - Architecture: Full Stack (React + FastAPI + PostgreSQL)
   - Status: Running
   - URL: https://rental-app-demo.com

2. Portfolio Console
   - Architecture: React + Vite
   - Status: Running
   - URL: Current site

3. DevOps Pipeline Project
   - Architecture: CI/CD with GitHub Actions
   - Status: Stable

4. Cloud Infrastructure
   - Architecture: AWS/Azure Multi-cloud
   - Status: Production

Use 'ls' to explore the filesystem.
`
  }

  getSkillsInfo() {
    return `Technical Skills:

Languages: Python, JavaScript, TypeScript, Java, C
Frontend: React, Next.js, HTML/CSS, Tailwind
Backend: FastAPI, Flask, Express.js, Node.js
Databases: MongoDB, MySQL, PostgreSQL, SQL Server
Cloud: AWS, Azure
DevOps: Docker, Kubernetes, Terraform, Jenkins, GitHub Actions
Tools: Git, Linux, Bash, PowerShell

See full details in Resource Inventory section.
`
  }

  getExperienceInfo() {
    return `Work Experience:

Associate Software Engineer @ Gisul
- Full Stack Development
- Cloud Infrastructure
- DevOps Automation
- Agile Development

See Platform Evolution section for detailed timeline.
`
  }

  async executeScript(filename) {
    const result = this.fs.readFile(filename)
    if (!result.success) {
      return result
    }

    const scriptContent = result.content
    if (!scriptContent.trim()) {
      return { success: false, error: `${filename}: Empty script` }
    }

    // Check if it's a bash script
    const lines = scriptContent.split('\n').map(l => l.trim()).filter(l => l && !l.startsWith('#'))
    
    const outputs = []
    for (const line of lines) {
      // Handle echo
      if (line.startsWith('echo ')) {
        const message = line.substring(5).replace(/^["']|["']$/g, '')
        outputs.push(message)
        continue
      }

      // Handle pwd
      if (line.trim() === 'pwd' || line.startsWith('pwd ')) {
        outputs.push(this.fs.pwd())
        continue
      }

      // Handle ls
      if (line.startsWith('ls')) {
        const lsArg = line.substring(2).trim() || '.'
        const lsResult = this.fs.ls(lsArg)
        if (lsResult.success) {
          const items = lsResult.items.map(i => i.name).join(' ')
          if (items) outputs.push(items)
        } else {
          outputs.push(lsResult.error)
        }
        continue
      }

      // Handle cat
      if (line.startsWith('cat ')) {
        const file = line.substring(4).trim()
        const catResult = this.fs.cat(file)
        if (catResult.success) {
          outputs.push(catResult.content)
        } else {
          outputs.push(catResult.error)
        }
        continue
      }

      // Handle cd (for script context, but don't change actual directory)
      if (line.startsWith('cd ')) {
        // Just skip cd in scripts for now, or handle it if needed
        continue
      }

      // Unsupported command
      const cmd = line.split(' ')[0]
      if (cmd) {
        outputs.push(`bash: ${cmd}: command not supported in sandbox`)
      }
    }

    return { success: true, output: outputs.join('\n') }
  }

  addToHistory(command) {
    this.commandHistory.push(command)
    if (this.commandHistory.length > 100) {
      this.commandHistory.shift()
    }
    this.historyIndex = this.commandHistory.length
    this.saveHistory()
  }

  getHistory(offset) {
    const newIndex = this.historyIndex + offset
    if (newIndex < 0 || newIndex >= this.commandHistory.length) {
      return null
    }
    this.historyIndex = newIndex
    return this.commandHistory[newIndex]
  }

  resetHistoryIndex() {
    this.historyIndex = this.commandHistory.length
  }

  saveHistory() {
    try {
      localStorage.setItem('cloudshell_history', JSON.stringify(this.commandHistory.slice(-50)))
    } catch (e) {
      // Storage might be disabled
    }
  }

  loadHistory() {
    try {
      const saved = localStorage.getItem('cloudshell_history')
      if (saved) {
        this.commandHistory = JSON.parse(saved)
        this.historyIndex = this.commandHistory.length
      }
    } catch (e) {
      // Invalid storage data
    }
  }
}

export default ShellInterpreter

