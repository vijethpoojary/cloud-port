import ProjectCard from './ProjectCard'
import { projects } from '../data/projects'

const Projects = () => {
  const statusCounts = {
    running: projects.filter(p => p.status.toLowerCase() === 'running').length,
    stable: projects.filter(p => p.status.toLowerCase() === 'stable').length,
    inProgress: projects.filter(p => p.status.toLowerCase() === 'in progress').length,
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-aws-text-primary mb-2">Deployed Workloads</h2>
        <p className="text-aws-text-secondary">Projects and production deployments</p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="aws-card px-4 py-2">
            <span className="text-sm text-aws-text-secondary">Running: </span>
            <span className="text-sm font-semibold text-green-700">{statusCounts.running}</span>
          </div>
          <div className="aws-card px-4 py-2">
            <span className="text-sm text-aws-text-secondary">Stable: </span>
            <span className="text-sm font-semibold text-blue-700">{statusCounts.stable}</span>
          </div>
          <div className="aws-card px-4 py-2">
            <span className="text-sm text-aws-text-secondary">Total Projects: </span>
            <span className="text-sm font-semibold text-aws-blue">{projects.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects
