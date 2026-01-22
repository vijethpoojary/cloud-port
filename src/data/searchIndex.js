// Global Search Index - All searchable entities with aliases
export const searchIndex = [
  // Sections
  {
    id: 'overview',
    label: 'Dashboard',
    aliases: ['dashboard', 'home', 'overview', 'main', 'landing', 'welcome', 'account', 'summary'],
    type: 'section',
    icon: '📊',
    description: 'Account dashboard and platform overview',
    route: 'overview',
  },
  {
    id: 'documentation',
    label: 'Documentation',
    aliases: ['documentation', 'docs', 'about', 'profile', 'info', 'bio', 'introduction', 'overview', 'description'],
    type: 'section',
    icon: '📚',
    description: 'Platform architect documentation and profile',
    route: 'documentation',
  },
  {
    id: 'services',
    label: 'Resource Inventory',
    aliases: ['services', 'resources', 'inventory', 'skills', 'tech', 'stack', 'technologies', 'tools', 'capabilities'],
    type: 'section',
    icon: '☁️',
    description: 'Managed cloud services and infrastructure resources',
    route: 'services',
  },
  {
    id: 'projects',
    label: 'Deployed Workloads',
    aliases: ['projects', 'workloads', 'apps', 'applications', 'deployments', 'work', 'portfolio', 'solutions', 'products'],
    type: 'section',
    icon: '🚀',
    description: 'Running workloads and production deployments',
    route: 'projects',
  },
  {
    id: 'experience',
    label: 'Platform Evolution',
    aliases: ['experience', 'evolution', 'work', 'career', 'history', 'timeline', 'journey', 'background', 'employment'],
    type: 'section',
    icon: '📈',
    description: 'System architecture evolution and platform versioning history',
    route: 'experience',
  },
  {
    id: 'observability',
    label: 'Observability',
    aliases: ['observability', 'telemetry', 'metrics', 'monitoring', 'logs', 'analytics', 'performance', 'health', 'dashboard', 'stats'],
    type: 'section',
    icon: '📉',
    description: 'Real-time system metrics and performance indicators',
    route: 'observability',
  },
  {
    id: 'trust',
    label: 'Trust & Compliance',
    aliases: ['trust', 'compliance', 'security', 'safety', 'audit', 'governance', 'standards', 'policies'],
    type: 'section',
    icon: '🛡️',
    description: 'Security, compliance, and operational excellence principles',
    route: 'trust',
  },
  {
    id: 'contact',
    label: 'Contact / Deploy Ticket',
    aliases: ['contact', 'support', 'ticket', 'message', 'reach', 'email', 'connect', 'communication', 'inquiry'],
    type: 'section',
    icon: '📬',
    description: 'Create and deploy a support ticket',
    route: 'Contact',
  },

  // Programming Languages
  { id: 'lang-c', label: 'Runtime.Language.C', aliases: ['c', 'gcc', 'posix', 'systems'], type: 'service', category: 'Programming Languages', icon: '💻', description: 'GCC / POSIX Runtime', route: 'services' },
  { id: 'lang-java', label: 'Runtime.Language.Java', aliases: ['java', 'openjdk', 'jdk', 'jvm', 'enterprise'], type: 'service', category: 'Programming Languages', icon: '☕', description: 'OpenJDK 17 (LTS)', route: 'services' },
  { id: 'lang-python', label: 'Runtime.Language.Python', aliases: ['python', 'py', 'fastapi', 'flask', 'django'], type: 'service', category: 'Programming Languages', icon: '🐍', description: 'Python 3.10+ Runtime', route: 'services' },
  { id: 'lang-javascript', label: 'Runtime.Language.JavaScript', aliases: ['javascript', 'js', 'nodejs', 'node', 'es6', 'es2015'], type: 'service', category: 'Programming Languages', icon: '📜', description: 'Node.js 18+ (ES6+)', route: 'services' },

  // Web Development
  { id: 'web-react', label: 'Frontend.Framework.React', aliases: ['react', 'reactjs', 'frontend', 'ui', 'components'], type: 'service', category: 'Web Development', icon: '⚛️', description: 'React.js Framework', route: 'services' },
  { id: 'web-nextjs', label: 'Frontend.Framework.NextJS', aliases: ['nextjs', 'next', 'next.js', 'ssr', 'fullstack'], type: 'service', category: 'Web Development', icon: '▲', description: 'Next.js Framework', route: 'services' },
  { id: 'web-nodejs', label: 'Backend.Runtime.NodeJS', aliases: ['nodejs', 'node', 'backend', 'server'], type: 'service', category: 'Web Development', icon: '🟢', description: 'Node.js Runtime', route: 'services' },
  { id: 'web-express', label: 'Backend.Framework.Express', aliases: ['express', 'expressjs', 'api', 'rest', 'backend'], type: 'service', category: 'Web Development', icon: '🚂', description: 'Express.js Framework', route: 'services' },
  { id: 'web-flask', label: 'Backend.Framework.Flask', aliases: ['flask', 'python', 'micro', 'web'], type: 'service', category: 'Web Development', icon: '🌶️', description: 'Flask Framework', route: 'services' },
  { id: 'web-fastapi', label: 'Backend.Framework.FastAPI', aliases: ['fastapi', 'fast', 'api', 'async', 'openapi'], type: 'service', category: 'Web Development', icon: '⚡', description: 'FastAPI Framework', route: 'services' },
  { id: 'web-html', label: 'Frontend.Rendering.Core', aliases: ['html', 'html5', 'css', 'css3', 'frontend', 'rendering'], type: 'service', category: 'Web Development', icon: '🎨', description: 'HTML5 / CSS3 Core', route: 'services' },

  // Databases
  { id: 'db-mongodb', label: 'Database.NoSQL.MongoDB', aliases: ['mongodb', 'mongo', 'nosql', 'document'], type: 'service', category: 'Databases', icon: '🍃', description: 'MongoDB Database', route: 'services' },
  { id: 'db-mysql', label: 'Database.Relational.MySQL', aliases: ['mysql', 'sql', 'relational', 'database'], type: 'service', category: 'Databases', icon: '🗄️', description: 'MySQL Database', route: 'services' },
  { id: 'db-sqlserver', label: 'Database.Relational.SQLServer', aliases: ['sqlserver', 'sql server', 'mssql', 'microsoft'], type: 'service', category: 'Databases', icon: '🗃️', description: 'SQL Server Database', route: 'services' },

  // AWS Services
  { id: 'aws-ec2', label: 'Compute.EC2', aliases: ['ec2', 'aws', 'compute', 'instance', 'vm', 'virtual'], type: 'service', category: 'AWS', icon: '🖥️', description: 'AWS EC2 Compute', route: 'services' },
  { id: 'aws-s3', label: 'Storage.Object.S3', aliases: ['s3', 'storage', 'bucket', 'object'], type: 'service', category: 'AWS', icon: '🪣', description: 'AWS S3 Storage', route: 'services' },
  { id: 'aws-vpc', label: 'Network.VPC', aliases: ['vpc', 'network', 'subnet', 'virtual network'], type: 'service', category: 'AWS', icon: '🌐', description: 'AWS VPC Network', route: 'services' },
  { id: 'aws-iam', label: 'Identity.IAM', aliases: ['iam', 'identity', 'access', 'security', 'permissions'], type: 'service', category: 'AWS', icon: '🔐', description: 'AWS IAM Identity', route: 'services' },
  { id: 'aws-rds', label: 'Database.RDS', aliases: ['rds', 'database', 'managed database'], type: 'service', category: 'AWS', icon: '🗄️', description: 'AWS RDS Database', route: 'services' },
  { id: 'aws-cloudwatch', label: 'Monitoring.CloudWatch', aliases: ['cloudwatch', 'monitoring', 'logs', 'metrics'], type: 'service', category: 'AWS', icon: '👁️', description: 'AWS CloudWatch Monitoring', route: 'services' },
  { id: 'aws-cloudtrail', label: 'Audit.CloudTrail', aliases: ['cloudtrail', 'audit', 'logging', 'compliance'], type: 'service', category: 'AWS', icon: '📋', description: 'AWS CloudTrail Audit', route: 'services' },
  { id: 'aws-cloudfront', label: 'CDN.CloudFront', aliases: ['cloudfront', 'cdn', 'content delivery'], type: 'service', category: 'AWS', icon: '🌍', description: 'AWS CloudFront CDN', route: 'services' },
  { id: 'aws-route53', label: 'DNS.Route53', aliases: ['route53', 'route 53', 'dns', 'domain'], type: 'service', category: 'AWS', icon: '🔗', description: 'AWS Route 53 DNS', route: 'services' },
  { id: 'aws-efs', label: 'Storage.File.EFS', aliases: ['efs', 'elastic file system', 'file storage'], type: 'service', category: 'AWS', icon: '📁', description: 'AWS EFS File Storage', route: 'services' },

  // Azure Services
  { id: 'azure-vm', label: 'Compute.AzureVM', aliases: ['azure', 'azure vm', 'virtual machine', 'microsoft'], type: 'service', category: 'Azure', icon: '☁️', description: 'Azure Virtual Machines', route: 'services' },
  { id: 'azure-storage', label: 'Storage.AzureBlob', aliases: ['azure storage', 'blob', 'azure blob'], type: 'service', category: 'Azure', icon: '💾', description: 'Azure Storage Services', route: 'services' },
  { id: 'azure-entraid', label: 'Identity.EntraID', aliases: ['entra id', 'azure ad', 'identity', 'single sign on'], type: 'service', category: 'Azure', icon: '🔑', description: 'Azure Entra ID', route: 'services' },

  // DevOps Tools
  { id: 'devops-docker', label: 'Container.Docker', aliases: ['docker', 'container', 'containers', 'dockerfile'], type: 'service', category: 'DevOps', icon: '🐳', description: 'Docker Containerization', route: 'services' },
  { id: 'devops-kubernetes', label: 'Orchestration.Kubernetes', aliases: ['kubernetes', 'k8s', 'kube', 'orchestration'], type: 'service', category: 'DevOps', icon: '⚓', description: 'Kubernetes Orchestration', route: 'services' },
  { id: 'devops-jenkins', label: 'Pipeline.CI.Jenkins', aliases: ['jenkins', 'ci/cd', 'cicd', 'pipeline', 'automation'], type: 'service', category: 'DevOps', icon: '🤖', description: 'Jenkins CI/CD', route: 'services' },
  { id: 'devops-terraform', label: 'IaC.Terraform', aliases: ['terraform', 'iac', 'infrastructure as code', 'provisioning'], type: 'service', category: 'DevOps', icon: '🏗️', description: 'Terraform IaC', route: 'services' },
  { id: 'devops-git', label: 'VersionControl.Git', aliases: ['git', 'version control', 'github', 'gitlab', 'vcs'], type: 'service', category: 'DevOps', icon: '📦', description: 'Git Version Control', route: 'services' },
  { id: 'devops-prometheus', label: 'Metrics.Prometheus', aliases: ['prometheus', 'metrics', 'monitoring', 'time series'], type: 'service', category: 'DevOps', icon: '📊', description: 'Prometheus Monitoring', route: 'services' },
  { id: 'devops-grafana', label: 'Visualization.Grafana', aliases: ['grafana', 'visualization', 'dashboards', 'graphs'], type: 'service', category: 'DevOps', icon: '📈', description: 'Grafana Visualization', route: 'services' },

  // Projects (key projects)
  { id: 'project-shopswift', label: 'ShopSwift – E-Commerce', aliases: ['shopswift', 'ecommerce', 'e-commerce', 'shopping', 'mern'], type: 'project', category: 'Projects', icon: '🛒', description: 'ShopSwift E-Commerce Platform', route: 'projects' },
  { id: 'project-monitoring', label: 'Real-Time Log Monitoring', aliases: ['monitoring', 'dashboard', 'logs', 'real-time'], type: 'project', category: 'Projects', icon: '📊', description: 'Real-Time Log Monitoring Dashboard', route: 'projects' },
  { id: 'project-autoscaling', label: 'Auto Scaling EC2', aliases: ['autoscaling', 'auto scaling', 'ec2', 'scaling'], type: 'project', category: 'Projects', icon: '📈', description: 'Auto Scaling EC2 Setup', route: 'projects' },
  { id: 'project-vpc', label: 'Production VPC Architecture', aliases: ['vpc', 'architecture', 'production vpc'], type: 'project', category: 'Projects', icon: '🏗️', description: 'Production-Grade VPC Architecture', route: 'projects' },
  { id: 'project-cicd-django', label: 'CI/CD - Django', aliases: ['django', 'cicd django', 'automation django'], type: 'project', category: 'Projects', icon: '🐍', description: 'CI/CD Automation - Django', route: 'projects' },
  { id: 'project-cicd-springboot', label: 'CI/CD - Spring Boot', aliases: ['springboot', 'spring boot', 'cicd spring', 'java'], type: 'project', category: 'Projects', icon: '☕', description: 'CI/CD Automation - Spring Boot', route: 'projects' },
]

// Search matching logic with fuzzy matching and ranking
export const searchServices = (query, services = []) => {
  if (!query.trim()) return []
  
  const normalizedQuery = query.toLowerCase().trim()
  const queryWords = normalizedQuery.split(/\s+/).filter(w => w.length > 0)
  
  if (queryWords.length === 0) return []
  
  const matches = searchIndex
    .map(item => {
      // Check all aliases for matches
      const aliasMatches = item.aliases.filter(alias => {
        const aliasLower = alias.toLowerCase()
        return queryWords.some(word => {
          // Exact match
          if (aliasLower === word) return true
          // Contains match
          if (aliasLower.includes(word) || word.includes(aliasLower)) return true
          // Fuzzy match (basic - check if all characters are present)
          return word.split('').every(char => aliasLower.includes(char))
        })
      })
      
      // Check label
      const labelLower = item.label.toLowerCase()
      const labelMatch = queryWords.some(word => labelLower.includes(word)) || labelLower.includes(normalizedQuery)
      
      // Check description
      const descLower = item.description?.toLowerCase() || ''
      const descMatch = queryWords.some(word => descLower.includes(word))
      
      // Calculate relevance score
      let score = 0
      
      // Exact alias match (highest priority)
      if (item.aliases.some(a => a.toLowerCase() === normalizedQuery)) {
        score += 100
      }
      
      // Exact label match
      if (labelLower === normalizedQuery) {
        score += 80
      }
      
      // Label contains query
      if (labelMatch) {
        score += 30
        if (labelLower.startsWith(normalizedQuery)) score += 20 // Starts with bonus
      }
      
      // Alias matches
      if (aliasMatches.length > 0) {
        score += aliasMatches.length * 15
        // Exact alias matches get bonus
        const exactAliasMatches = aliasMatches.filter(a => 
          item.aliases.some(alias => alias.toLowerCase() === a)
        )
        score += exactAliasMatches.length * 10
      }
      
      // Description match (lower weight)
      if (descMatch) {
        score += 5
      }
      
      // Category bonus
      if (item.category && normalizedQuery.includes(item.category.toLowerCase())) {
        score += 10
      }
      
      if (score > 0 || labelMatch || aliasMatches.length > 0) {
        return { ...item, score, aliasMatches, labelMatch, descMatch }
      }
      return null
    })
    .filter(item => item !== null)
    .sort((a, b) => {
      // Sort by score (descending)
      if (b.score !== a.score) return b.score - a.score
      // If scores are equal, prioritize sections
      if (a.type === 'section' && b.type !== 'section') return -1
      if (b.type === 'section' && a.type !== 'section') return 1
      // Then by label length (shorter = more specific)
      return a.label.length - b.label.length
    })
    .slice(0, 12) // Limit to top 12 results
  
  return matches
}

