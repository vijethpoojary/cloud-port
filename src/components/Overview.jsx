const Overview = ({ onNavigate }) => {
  const handleExploreResources = () => {
    if (onNavigate) {
      onNavigate('services')
    }
  }

  const handleViewDocumentation = () => {
    if (onNavigate) {
      onNavigate('documentation')
    }
  }

  const handleDownloadResume = () => {
    // Create a link element and trigger download
    const link = document.createElement('a')
    link.href = '/resume.pdf' // Points to public/resume.pdf
    link.download = 'Vijeth_Poojary_Resume.pdf'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Account Summary Widgets - AWS Style */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="aws-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-aws-text-secondary">Production Deployments</p>
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded">Operational</span>
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-1">4</p>
          <p className="text-xs text-aws-text-secondary">Full-stack & cloud applications</p>
        </div>
        
        <div className="aws-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-aws-text-secondary">CI/CD Pipelines Built</p>
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded">Healthy</span>
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-1">2</p>
          <p className="text-xs text-aws-text-secondary">Jenkins & GitHub Actions</p>
        </div>
        
        <div className="aws-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-aws-text-secondary">Cloud Services Used</p>
            <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">Active</span>
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-1">15+</p>
          <p className="text-xs text-aws-text-secondary">AWS & Azure ecosystem</p>
        </div>
        
        <div className="aws-card p-4">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-aws-text-secondary">Industry Experience</p>
            <span className="text-xs px-2 py-0.5 bg-green-50 text-green-700 border border-green-200 rounded">100%</span>
          </div>
          <p className="text-3xl font-semibold text-aws-text-primary mb-1">1+</p>
          <p className="text-xs text-aws-text-secondary">Cloud, DevOps & Full stack</p>
        </div>
      </div>

      {/* System Message Banner - AWS Style */}
      <div className="aws-card p-6 border-l-4 border-green-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 bg-green-500 rounded-full mt-1"></div>
            <div>
              <h3 className="text-lg font-semibold text-aws-text-primary mb-1">Active Development & Deployments</h3>
              <p className="text-sm text-aws-text-secondary">Cloud, DevOps, and full-stack projects actively built and deployed</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-aws-border">
          <div>
            <p className="text-xs text-aws-text-secondary mb-1">Recent Deployment</p>
            <p className="text-sm font-medium text-aws-text-primary">Production web application</p>
            <p className="text-xs text-aws-text-secondary mt-1">Built using Next.js, FastAPI & MERN</p>
          </div>
          <div>
            <p className="text-xs text-aws-text-secondary mb-1">Deployment Automation</p>
            <p className="text-sm font-medium text-green-700">Docker & Kubernetes</p>
            <p className="text-xs text-aws-text-secondary mt-1">CI/CD pipelines implemented</p>
          </div>
          <div>
            <p className="text-xs text-aws-text-secondary mb-1">Infrastructure Skills</p>
            <p className="text-sm font-medium text-aws-text-primary">AWS & Azure environments</p>
            <p className="text-xs text-aws-text-secondary mt-1">Monitoring & troubleshooting</p>
          </div>
        </div>
      </div>

      {/* Platform Architect Overview Card - AWS Style */}
      <div className="aws-card p-6 border-l-4 border-aws-blue">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-aws-blue-light rounded-md">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-aws-text-primary mb-2">Platform Architect</h3>
              <p className="text-sm text-aws-text-secondary leading-relaxed mb-3">
                Associate Software Engineer at Gisul with hands-on experience in Full Stack Development, 
                Cloud Infrastructure, and DevOps automation. Working at the intersection of software engineering 
                and cloud technologies, building scalable applications and reliable deployment pipelines.
              </p>
              <button
                onClick={handleViewDocumentation}
                className="text-sm text-aws-blue hover:text-aws-blue-hover font-medium flex items-center gap-2 transition-colors"
              >
                <span>View Full Documentation</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions - AWS Button Style */}
      <div className="flex flex-wrap gap-3">
        <button 
          onClick={handleExploreResources}
          className="aws-button-primary flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <span>Explore Resources</span>
        </button>
        <button 
          onClick={handleViewDocumentation}
          className="aws-button-secondary flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          <span>View Documentation</span>
        </button>
        <button 
          onClick={handleDownloadResume}
          className="aws-button-secondary flex items-center gap-2"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span>Download Architecture (Resume)</span>
        </button>
      </div>

      {/* Platform Summary - AWS Style */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-aws-text-primary mb-4">Platform Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-aws-text-secondary">Total Services</span>
              <span className="text-sm font-medium text-aws-text-primary">37 services</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-aws-text-secondary">Education</span>
              <span className="text-sm font-medium text-green-700">B.E. CSE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-aws-text-secondary">Active Regions</span>
              <span className="text-sm font-medium text-aws-text-primary">ap-south-1, Global</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-aws-text-secondary">Environment</span>
              <span className="text-sm font-medium text-green-700">Production</span>
            </div>
          </div>
        </div>

        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-aws-text-primary mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <span className="text-green-600 mt-0.5">✓</span>
              <div>
                <p className="text-aws-text-primary">Service deployment completed</p>
                <p className="text-xs text-aws-text-secondary mt-0.5">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-aws-blue mt-0.5">⟳</span>
              <div>
                <p className="text-aws-text-primary">Workload scaling completed</p>
                <p className="text-xs text-aws-text-secondary mt-0.5">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-green-600 mt-0.5">✓</span>
              <div>
                <p className="text-aws-text-primary">Infrastructure update deployed</p>
                <p className="text-xs text-aws-text-secondary mt-0.5">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
