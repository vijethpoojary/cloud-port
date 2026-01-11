import { useState } from 'react'

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'stable':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      case 'in progress':
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
      default:
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
    }
  }

  const getEnvironmentColor = (env) => {
    switch (env.toLowerCase()) {
      case 'production':
        return 'bg-green-500/20 text-green-400'
      case 'staging':
        return 'bg-yellow-500/20 text-yellow-400'
      default:
        return 'bg-gray-500/20 text-gray-400'
    }
  }

  return (
    <div className="glass rounded-lg p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-gray-100 mb-2">
            {project.name}
          </h3>
          <p className="text-xs text-gray-500 font-mono mb-2">{project.deploymentId}</p>
          <p className="text-sm text-gray-400 mb-3">{project.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
            {project.status}
          </div>
          <div className={`px-2 py-1 rounded text-xs ${getEnvironmentColor(project.environment)}`}>
            {project.environment}
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="mb-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800">
        <p className="text-xs text-gray-500 mb-3 font-semibold">Architecture: {project.architecture}</p>
        <div className="flex items-center justify-center gap-2 text-xs">
          <div className="px-3 py-2 bg-cloud-blue-500/20 text-cloud-blue-300 rounded border border-cloud-blue-500/30">
            Frontend
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 bg-cloud-blue-500/20 text-cloud-blue-300 rounded border border-cloud-blue-500/30">
            API
          </div>
          <span className="text-gray-600">→</span>
          <div className="px-3 py-2 bg-cloud-blue-500/20 text-cloud-blue-300 rounded border border-cloud-blue-500/30">
            DB
          </div>
        </div>
      </div>

      {/* Deployment Info */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <p className="text-gray-500 mb-1">Deployed</p>
          <p className="text-gray-300">{project.deployedDate}</p>
        </div>
        <div>
          <p className="text-gray-500 mb-1">Running for</p>
          <p className="text-gray-300 font-medium">{project.runningFor}</p>
        </div>
      </div>

      {/* Health Check */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-gray-900/50 rounded">
        <span className={`status-dot ${project.healthCheck ? 'bg-green-400' : 'bg-red-400'}`}></span>
        <span className="text-xs text-gray-400">Health Checks:</span>
        <span className={`text-xs font-medium ${project.healthCheck ? 'text-green-400' : 'text-red-400'}`}>
          {project.healthCheck ? '✓ Passing' : '✗ Failing'}
        </span>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <p className="text-xs text-gray-500 mb-2">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 bg-cloud-blue-500/20 text-cloud-blue-300 rounded text-xs"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex-1 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-lg text-sm font-medium transition-colors"
        >
          {showDetails ? 'Hide Logs' : 'View Logs'}
        </button>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 px-4 py-2 bg-cloud-blue-600 hover:bg-cloud-blue-700 text-white rounded-lg text-sm font-medium transition-colors text-center"
        >
          Open Endpoint
        </a>
      </div>

      {showDetails && (
        <div className="mt-4 p-4 bg-gray-900/70 rounded-lg border border-gray-800">
          <h4 className="text-sm font-semibold text-gray-300 mb-2">Deployment Details</h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-gray-500">Deployment ID:</span>
              <span className="text-gray-300">{project.deploymentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Architecture:</span>
              <span className="text-gray-300">{project.architecture}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Regions:</span>
              <span className="text-gray-300">{project.regions?.join(', ') || 'Global'}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-gray-800">
              <p className="text-gray-400">{project.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectCard
