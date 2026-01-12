// Virtual Linux Filesystem
class VirtualFileSystem {
  constructor() {
    this.fs = {
      '/': { type: 'dir', children: {} },
    }
    this.currentDir = '/'
    this.init()
  }

  init() {
    // Create home directory structure
    this.mkdir('/home')
    this.mkdir('/home/vijeth')
    this.currentDir = '/home/vijeth'
    
    // Create initial files
    this.writeFile('/home/vijeth/README.md', '# Welcome to CloudShell\n\nThis is a sandboxed terminal environment.\n\nTry commands like: ls, pwd, cat README.md\n')
    
    // Try to load from localStorage
    this.loadFromStorage()
  }

  pwd() {
    return this.currentDir
  }

  cd(path) {
    if (!path || path === '~') {
      this.currentDir = '/home/vijeth'
      return { success: true }
    }

    if (path === '..') {
      const parts = this.currentDir.split('/').filter(p => p)
      if (parts.length > 0) {
        parts.pop()
        this.currentDir = '/' + parts.join('/')
        if (this.currentDir === '') this.currentDir = '/'
      }
      return { success: true }
    }

    if (path.startsWith('/')) {
      // Absolute path
      const fullPath = path
      if (this.exists(fullPath) && this.isDir(fullPath)) {
        this.currentDir = fullPath
        return { success: true }
      }
      return { success: false, error: `cd: ${path}: No such file or directory` }
    }

    // Relative path
    const fullPath = this.resolvePath(path)
    if (this.exists(fullPath) && this.isDir(fullPath)) {
      this.currentDir = fullPath
      return { success: true }
    }
    return { success: false, error: `cd: ${path}: No such file or directory` }
  }

  ls(path = '.') {
    const targetPath = this.resolvePath(path)
    if (!this.exists(targetPath)) {
      return { success: false, error: `ls: cannot access '${path}': No such file or directory` }
    }

    if (!this.isDir(targetPath)) {
      return { success: false, error: `ls: cannot access '${path}': Not a directory` }
    }

    const node = this.getNode(targetPath)
    const items = Object.keys(node.children || {}).map(name => {
      const childPath = targetPath === '/' ? `/${name}` : `${targetPath}/${name}`
      const child = this.getNode(childPath)
      return {
        name,
        type: child.type,
        path: childPath,
      }
    })

    return { success: true, items }
  }

  mkdir(path) {
    const fullPath = this.resolvePath(path)
    if (this.exists(fullPath)) {
      return { success: false, error: `mkdir: cannot create directory '${path}': File exists` }
    }

    const parts = fullPath.split('/').filter(p => p)
    let current = this.fs['/']
    
    for (const part of parts) {
      if (!current.children[part]) {
        current.children[part] = { type: 'dir', children: {} }
      }
      current = current.children[part]
    }

    this.saveToStorage()
    return { success: true }
  }

  touch(path) {
    const fullPath = this.resolvePath(path)
    if (this.exists(fullPath)) {
      // Update timestamp (simulated)
      return { success: true }
    }

    const parts = fullPath.split('/').filter(p => p)
    const filename = parts.pop()
    const dirPath = '/' + parts.join('/')
    
    if (!this.exists(dirPath) || !this.isDir(dirPath)) {
      return { success: false, error: `touch: cannot touch '${path}': No such file or directory` }
    }

    const dir = this.getNode(dirPath)
    dir.children[filename] = { type: 'file', content: '' }

    this.saveToStorage()
    return { success: true }
  }

  rm(path) {
    const fullPath = this.resolvePath(path)
    if (!this.exists(fullPath)) {
      return { success: false, error: `rm: cannot remove '${path}': No such file or directory` }
    }

    const parts = fullPath.split('/').filter(p => p)
    const filename = parts.pop()
    const dirPath = '/' + parts.join('/')
    const dir = this.getNode(dirPath)

    if (this.isDir(fullPath) && Object.keys(dir.children[filename].children || {}).length > 0) {
      return { success: false, error: `rm: cannot remove '${path}': Directory not empty` }
    }

    delete dir.children[filename]
    this.saveToStorage()
    return { success: true }
  }

  cat(path) {
    const fullPath = this.resolvePath(path)
    if (!this.exists(fullPath)) {
      return { success: false, error: `cat: ${path}: No such file or directory` }
    }

    if (this.isDir(fullPath)) {
      return { success: false, error: `cat: ${path}: Is a directory` }
    }

    const node = this.getNode(fullPath)
    return { success: true, content: node.content || '' }
  }

  writeFile(path, content) {
    // If path is already absolute (starts with /), use it directly
    // Otherwise resolve it relative to current directory
    const fullPath = path.startsWith('/') ? path : this.resolvePath(path)
    const parts = fullPath.split('/').filter(p => p)
    const filename = parts.pop()
    const dirPath = parts.length === 0 ? '/' : '/' + parts.join('/')

    if (!this.exists(dirPath)) {
      // Create parent directories
      const dirParts = dirPath.split('/').filter(p => p)
      let current = this.fs['/']
      for (const part of dirParts) {
        if (!current.children[part]) {
          current.children[part] = { type: 'dir', children: {} }
        }
        current = current.children[part]
      }
    }

    const dir = this.getNode(dirPath)
    if (!dir.children[filename]) {
      dir.children[filename] = { type: 'file', content: '' }
    }
    dir.children[filename].content = content

    this.saveToStorage()
    return { success: true }
  }

  readFile(path) {
    return this.cat(path)
  }

  resolvePath(path) {
    // Handle current directory
    if (path === '.' || path === './') {
      return this.currentDir
    }
    
    // Handle parent directory
    if (path === '..') {
      const parts = this.currentDir.split('/').filter(p => p)
      if (parts.length > 0) {
        parts.pop()
        const parentPath = '/' + parts.join('/')
        return parentPath === '' ? '/' : parentPath
      }
      return '/'
    }
    
    // Handle paths starting with ../
    if (path.startsWith('../')) {
      const parts = this.currentDir.split('/').filter(p => p)
      const relativeParts = path.split('/').filter(p => p)
      
      for (const part of relativeParts) {
        if (part === '..') {
          if (parts.length > 0) {
            parts.pop()
          }
        } else {
          parts.push(part)
        }
      }
      
      const resolvedPath = '/' + parts.join('/')
      return resolvedPath === '' ? '/' : resolvedPath
    }
    
    // Absolute path
    if (path.startsWith('/')) {
      return path
    }
    
    // Relative path
    if (this.currentDir === '/') {
      return `/${path}`
    }
    return `${this.currentDir}/${path}`
  }

  exists(path) {
    const parts = path.split('/').filter(p => p)
    let current = this.fs['/']
    
    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return false
      }
      current = current.children[part]
    }
    return true
  }

  isDir(path) {
    const node = this.getNode(path)
    return node && node.type === 'dir'
  }

  getNode(path) {
    if (path === '/') {
      return this.fs['/']
    }

    const parts = path.split('/').filter(p => p)
    let current = this.fs['/']
    
    for (const part of parts) {
      if (!current.children || !current.children[part]) {
        return null
      }
      current = current.children[part]
    }
    return current
  }

  saveToStorage() {
    try {
      localStorage.setItem('cloudshell_fs', JSON.stringify(this.fs))
      localStorage.setItem('cloudshell_cwd', this.currentDir)
    } catch (e) {
      // Storage might be disabled
    }
  }

  loadFromStorage() {
    try {
      const savedFS = localStorage.getItem('cloudshell_fs')
      const savedCWD = localStorage.getItem('cloudshell_cwd')
      
      if (savedFS) {
        this.fs = JSON.parse(savedFS)
      }
      if (savedCWD) {
        this.currentDir = savedCWD
      }
    } catch (e) {
      // Invalid storage data, use defaults
    }
  }

  getFullPath() {
    return this.currentDir === '/home/vijeth' ? '~' : this.currentDir
  }
}

export default VirtualFileSystem

