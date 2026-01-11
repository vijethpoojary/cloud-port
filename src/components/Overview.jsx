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
    // In a real implementation, this would download or open a PDF
    alert('Architecture document download - Add your PDF link here!')
  }

  return (
    <div className="space-y-6 animate-slide-up">
      {/* Account Summary Widgets */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Active Services</p>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Operational</span>
          </div>
          <p className="text-3xl font-bold text-cloud-blue-400 mb-1">37</p>
          <p className="text-xs text-gray-500">Across 7 categories</p>
        </div>
        
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Running Workloads</p>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">Healthy</span>
          </div>
          <p className="text-3xl font-bold text-green-400 mb-1">6</p>
          <p className="text-xs text-gray-500">Production environment</p>
        </div>
        
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Education</p>
            <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded">Active</span>
          </div>
          <p className="text-3xl font-bold text-purple-400 mb-1">7.68</p>
          <p className="text-xs text-gray-500">CGPA - CSE (2021-2025)</p>
        </div>
        
        <div className="glass rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">Experience</p>
            <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded">100%</span>
          </div>
          <p className="text-3xl font-bold text-yellow-400 mb-1">3</p>
          <p className="text-xs text-gray-500">Professional roles</p>
        </div>
      </div>

      {/* System Message Banner */}
      <div className="glass-strong rounded-lg p-6 border-l-4 border-green-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center gap-3">
            <span className="status-dot bg-green-400"></span>
            <div>
              <h3 className="text-lg font-semibold text-gray-100 mb-1">All systems operational</h3>
              <p className="text-sm text-gray-400">Platform health is excellent across all services</p>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-gray-700">
          <div>
            <p className="text-xs text-gray-500 mb-1">Last Deployment</p>
            <p className="text-sm font-medium text-gray-300">3 days ago</p>
            <p className="text-xs text-gray-500 mt-1">Deployment ID: dep-8a3f2</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Change Failure Rate</p>
            <p className="text-sm font-medium text-green-400">0.2%</p>
            <p className="text-xs text-gray-500 mt-1">Last 90 days</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Mean Time to Recovery</p>
            <p className="text-sm font-medium text-gray-300">15 minutes</p>
            <p className="text-xs text-gray-500 mt-1">Average resolution time</p>
          </div>
        </div>
      </div>

      {/* Platform Architect Overview Card */}
      <div className="glass-strong rounded-lg p-6 border-l-4 border-cloud-blue-500">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4 flex-1">
            <div className="p-3 bg-cloud-blue-500/20 rounded-lg">
              <span className="text-2xl">👨‍💻</span>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-100 mb-2">Platform Architect</h3>
              <p className="text-sm text-gray-300 leading-relaxed mb-3">
                Associate Software Engineer at Gisul with hands-on experience in Full Stack Development, 
                Cloud Infrastructure, and DevOps automation. Working at the intersection of software engineering 
                and cloud technologies, building scalable applications and reliable deployment pipelines.
              </p>
              <button
                onClick={handleViewDocumentation}
                className="text-sm text-cloud-blue-400 hover:text-cloud-blue-300 font-medium flex items-center gap-2 transition-colors"
              >
                <span>View Full Documentation</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-4">
        <button 
          onClick={handleExploreResources}
          className="px-6 py-3 bg-cloud-blue-600 hover:bg-cloud-blue-700 text-white rounded-lg font-semibold transition-colors card-hover flex items-center gap-2"
        >
          <span>🔍</span>
          <span>Explore Resources</span>
        </button>
        <button 
          onClick={handleViewDocumentation}
          className="px-6 py-3 glass hover:bg-white/10 text-gray-200 rounded-lg font-semibold transition-colors card-hover flex items-center gap-2"
        >
          <span>📚</span>
          <span>View Documentation</span>
        </button>
        <button 
          onClick={handleDownloadResume}
          className="px-6 py-3 glass hover:bg-white/10 text-gray-200 rounded-lg font-semibold transition-colors card-hover flex items-center gap-2"
        >
          <span>📄</span>
          <span>Download Architecture (Resume)</span>
        </button>
      </div>

      {/* Platform Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Platform Overview</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Total Services</span>
              <span className="text-sm font-semibold text-gray-300">37 services</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Education</span>
              <span className="text-sm font-semibold text-green-400">B.E. CSE</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Active Regions</span>
              <span className="text-sm font-semibold text-gray-300">ap-south-1, Global</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-400">Environment</span>
              <span className="text-sm font-semibold text-green-400">Production</span>
            </div>
          </div>
        </div>

        <div className="glass rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-start gap-3 text-sm">
              <span className="text-green-400 mt-0.5">✓</span>
              <div>
                <p className="text-gray-300">Service deployment completed</p>
                <p className="text-xs text-gray-500 mt-0.5">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-blue-400 mt-0.5">⟳</span>
              <div>
                <p className="text-gray-300">Workload scaling completed</p>
                <p className="text-xs text-gray-500 mt-0.5">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-start gap-3 text-sm">
              <span className="text-green-400 mt-0.5">✓</span>
              <div>
                <p className="text-gray-300">Infrastructure update deployed</p>
                <p className="text-xs text-gray-500 mt-0.5">1 day ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Overview
