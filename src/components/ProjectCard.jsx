import { useState } from 'react'

const ProjectCard = ({ project }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'running':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'stable':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      case 'in progress':
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
      default:
        return 'bg-aws-bg-light text-aws-text-secondary border-aws-border'
    }
  }

  const getEnvironmentColor = (env) => {
    switch (env.toLowerCase()) {
      case 'production':
        return 'bg-green-50 text-green-700'
      case 'staging':
        return 'bg-yellow-50 text-yellow-700'
      default:
        return 'bg-aws-bg-light text-aws-text-secondary'
    }
  }

  return (
    <div className="aws-card p-4 aws-card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-aws-text-primary mb-2">
            {project.name}
          </h3>
          <p className="text-xs text-aws-text-secondary font-mono mb-2">{project.deploymentId}</p>
          <p className="text-sm text-aws-text-secondary mb-3">{project.description}</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(project.status)}`}>
            {project.status}
          </div>
          <div className={`px-2 py-0.5 rounded text-xs ${getEnvironmentColor(project.environment)}`}>
            {project.environment}
          </div>
        </div>
      </div>

      {/* Architecture Diagram */}
      <div className="mb-4 p-4 bg-aws-bg-light border border-aws-border rounded-md">
        <p className="text-xs text-aws-text-secondary mb-3 font-semibold">Architecture: {project.architecture}</p>
        <div className="flex items-center justify-center gap-2 text-xs">
          <div className="px-3 py-2 bg-aws-blue-light text-aws-blue border border-aws-blue rounded">
            Frontend
          </div>
          <span className="text-aws-text-secondary">→</span>
          <div className="px-3 py-2 bg-aws-blue-light text-aws-blue border border-aws-blue rounded">
            API
          </div>
          <span className="text-aws-text-secondary">→</span>
          <div className="px-3 py-2 bg-aws-blue-light text-aws-blue border border-aws-blue rounded">
            DB
          </div>
        </div>
      </div>

      {/* Deployment Info */}
      <div className="grid grid-cols-2 gap-3 mb-4 text-xs">
        <div>
          <p className="text-aws-text-secondary mb-1">Deployed</p>
          <p className="text-aws-text-primary">{project.deployedDate}</p>
        </div>
        <div>
          <p className="text-aws-text-secondary mb-1">Running for</p>
          <p className="text-aws-text-primary font-medium">{project.runningFor}</p>
        </div>
      </div>

      {/* Health Check */}
      <div className="flex items-center gap-2 mb-4 p-2 bg-aws-bg-light border border-aws-border rounded">
        <div className={`w-2 h-2 rounded-full ${project.healthCheck ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-xs text-aws-text-secondary">Health Checks:</span>
        <span className={`text-xs font-medium ${project.healthCheck ? 'text-green-700' : 'text-red-700'}`}>
          {project.healthCheck ? '✓ Passing' : '✗ Failing'}
        </span>
      </div>

      {/* Tech Stack */}
      <div className="mb-4">
        <p className="text-xs text-aws-text-secondary mb-2">Tech Stack</p>
        <div className="flex flex-wrap gap-2">
          {project.techStack.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-0.5 bg-aws-blue-light text-aws-blue border border-aws-blue rounded text-xs"
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
          className="flex-1 aws-button-secondary text-sm"
        >
          {showDetails ? 'Hide Logs' : 'View Logs'}
        </button>
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 aws-button-primary text-sm text-center"
        >
          Open Endpoint
        </a>
      </div>

      {showDetails && (
        <div className="mt-4 p-4 bg-aws-bg-light border border-aws-border rounded-md">
          <h4 className="text-sm font-semibold text-aws-text-primary mb-2">Deployment Details</h4>
          <div className="space-y-2 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-aws-text-secondary">Deployment ID:</span>
              <span className="text-aws-text-primary">{project.deploymentId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-aws-text-secondary">Architecture:</span>
              <span className="text-aws-text-primary">{project.architecture}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-aws-text-secondary">Regions:</span>
              <span className="text-aws-text-primary">{project.regions?.join(', ') || 'Global'}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-aws-border">
              <p className="text-aws-text-secondary">{project.details}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProjectCard
