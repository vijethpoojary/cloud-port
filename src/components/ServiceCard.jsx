import { useState } from 'react'

const ServiceCard = ({ service }) => {
  const [showDetails, setShowDetails] = useState(false)

  const getCostEfficiencyColor = (efficiency) => {
    switch (efficiency) {
      case 'Very High':
        return 'bg-green-50 text-green-700 border-green-200'
      case 'High':
        return 'bg-blue-50 text-blue-700 border-blue-200'
      default:
        return 'bg-yellow-50 text-yellow-700 border-yellow-200'
    }
  }

  return (
    <div className="aws-card p-4 aws-card-hover">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-base font-semibold text-aws-text-primary mb-1">
            {service.name}
          </h3>
          <p className="text-xs text-aws-text-secondary mb-2 font-mono">{service.serviceId}</p>
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 bg-aws-blue-light text-aws-blue border border-aws-blue rounded text-xs font-medium">
              {service.type}
            </span>
            <span className="px-2 py-0.5 bg-aws-bg-light text-aws-text-secondary border border-aws-border rounded text-xs">
              {service.category}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-1">
          <div className="w-2 h-2 bg-green-500 rounded-full"></div>
          <span className="text-xs text-aws-text-secondary">Active</span>
        </div>
      </div>

      <div className="space-y-4">
        {/* Runtime & Environment */}
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-aws-text-secondary mb-1">Runtime</p>
            <p className="text-aws-text-primary font-mono">{service.runtime}</p>
          </div>
          <div>
            <p className="text-aws-text-secondary mb-1">Region</p>
            <p className="text-aws-text-primary">{service.region}</p>
          </div>
        </div>

        {/* SLA & Cost Efficiency */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-aws-bg-light border border-aws-border rounded p-2">
            <p className="text-xs text-aws-text-secondary mb-1">SLA</p>
            <p className="text-sm font-semibold text-green-700">{service.sla}</p>
          </div>
          <div className={`rounded p-2 border ${getCostEfficiencyColor(service.costEfficiency)}`}>
            <p className="text-xs text-aws-text-secondary mb-1">Cost Efficiency</p>
            <p className="text-sm font-semibold">{service.costEfficiency}</p>
          </div>
        </div>

        {/* Provisioned Info */}
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span className="text-aws-text-secondary">Provisioned:</span>
            <span className="text-aws-text-primary">{service.provisioned}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-aws-text-secondary">Running for:</span>
            <span className="text-aws-text-primary font-medium">{service.runningFor}</span>
          </div>
        </div>

        {/* Utilization Graph */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs text-aws-text-secondary mb-1">
            <span>Utilization</span>
            <span>{service.usage}%</span>
          </div>
          <div className="w-full h-2 bg-aws-bg-light rounded-full overflow-hidden relative">
            <div
              className="h-full bg-aws-blue transition-all duration-1000"
              style={{ width: `${service.usage}%` }}
            ></div>
          </div>
        </div>

        {/* Technologies */}
        <div>
          <p className="text-xs text-aws-text-secondary mb-2">Technologies</p>
          <div className="flex flex-wrap gap-2">
            {service.technologies.map((tech, idx) => (
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
        <button
          className="w-full mt-4 px-4 py-2 aws-button-secondary text-sm"
          onClick={() => setShowDetails(!showDetails)}
        >
          {showDetails ? 'Hide Details' : 'Inspect Service'}
        </button>

        {showDetails && (
          <div className="mt-4 p-4 bg-aws-bg-light border border-aws-border rounded-md space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-aws-text-secondary">Service ID:</span>
              <span className="text-aws-text-primary font-mono">{service.serviceId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-aws-text-secondary">Status:</span>
              <span className="text-green-700">Operational</span>
            </div>
            <div className="flex justify-between">
              <span className="text-aws-text-secondary">Health:</span>
              <span className="text-green-700">✓ Passing</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServiceCard
