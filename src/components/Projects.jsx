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
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Deployed Workloads</h2>
        <p className="text-gray-400">Projects and production deployments</p>
        
        <div className="flex flex-wrap gap-4 mt-4">
          <div className="glass rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400">Running: </span>
            <span className="text-sm font-bold text-green-400">{statusCounts.running}</span>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400">Stable: </span>
            <span className="text-sm font-bold text-blue-400">{statusCounts.stable}</span>
          </div>
          <div className="glass rounded-lg px-4 py-2">
            <span className="text-sm text-gray-400">Total Projects: </span>
            <span className="text-sm font-bold text-cloud-blue-400">{projects.length}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  )
}

export default Projects

