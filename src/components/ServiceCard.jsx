import { useState } from 'react'

const ServiceCard = ({ service }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getCostEfficiencyColor = (efficiency) => {
    switch (efficiency) {
      case 'Very High':
        return 'bg-green-500/20 text-green-400 border-green-500/30'
      case 'High':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
      default:
        return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    }
  }

  return (
    <div className="glass rounded-lg p-6 card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-100 mb-1 font-mono">
            {service.name}
          </h3>
          <p className="text-xs text-gray-500 font-mono mb-2">{service.serviceId}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-1 bg-cloud-blue-500/20 text-cloud-blue-400 rounded text-xs font-medium">
              {service.type}
            </span>
            <span className="px-2 py-1 bg-gray-700/50 text-gray-400 rounded text-xs">
              {service.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <span className="status-dot bg-green-400"></span>
          <span className="text-xs text-gray-500">Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Runtime & Environment */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-500 mb-1">Runtime</p>
            <p className="text-gray-300 font-mono">{service.runtime}</p>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Region</p>
            <p className="text-gray-300">{service.region}</p>
          </div>
        </div>

        {/* SLA & Cost Efficiency */}
        <div className="grid grid-cols-2 gap-3">
          <div className="glass rounded p-3">
            <p className="text-xs text-gray-500 mb-1">SLA</p>
            <p className="text-sm font-bold text-green-400">{service.sla}</p>
          </div>
          <div className={`rounded p-3 border ${getCostEfficiencyColor(service.costEfficiency)}`}>
            <p className="text-xs text-gray-500 mb-1">Cost Efficiency</p>
            <p className="text-sm font-bold">{service.costEfficiency}</p>
          </div>
        </div>

        {/* Provisioned Info */}
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-gray-500">Provisioned:</span>
            <span className="text-gray-300">{service.provisioned}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Running for:</span>
            <span className="text-gray-300 font-medium">{service.runningFor}</span>
          </div>
        </div>

        {/* Utilization Graph */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Utilization</span>
            <span>{service.usage}%</span>
          </div>
          <div className="w-full h-3 bg-gray-800 rounded-full overflow-hidden relative">
            <div
              className="h-full bg-gradient-to-r from-cloud-blue-600 via-cloud-blue-500 to-cloud-blue-400 transition-all duration-1000"
              style={{ width: `${service.usage}%` }}
            >
              <div className="h-full w-full bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.1),transparent)] animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>

        {/* Technologies */}
        <div>
          <p className="text-xs text-gray-500 mb-2">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, idx) => (
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
        <button
          className="w-full mt-4 px-4 py-2 bg-gray-800/50 hover:bg-gray-800 text-gray-300 rounded-lg text-sm font-medium transition-colors"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Inspect Service'}
        </button>

        {showDetails && (
          <div className="mt-4 p-4 bg-gray-900/50 rounded-lg border border-gray-800 space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">Service ID:</span>
              <span className="text-gray-300 font-mono">{service.serviceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Status:</span>
              <span className="text-green-400">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Health:</span>
              <span className="text-green-400">✓ Passing</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
