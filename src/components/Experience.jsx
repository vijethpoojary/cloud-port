import { experience } from '../data/experience'

const Experience = () => {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Platform Evolution</h2>
        <p className="text-gray-400">System architecture evolution and platform versioning history</p>
      </div>

      <div className="relative">
        {/* Timeline Line */}
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cloud-blue-500 via-cloud-blue-400 to-cloud-blue-500"></div>

        <div className="space-y-12">
          {experience.map((exp, idx) => (
            <div key={exp.id} className="relative pl-20">
              {/* Timeline Dot */}
              <div className="absolute left-6 w-4 h-4 bg-cloud-blue-500 rounded-full border-4 border-gray-950"></div>

              {/* Content Card */}
              <div className="glass rounded-lg p-6 card-hover">
                <div className="flex items-start justify-between mb-4 flex-wrap gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2 flex-wrap">
                      <span className="px-4 py-1.5 bg-cloud-blue-500/20 text-cloud-blue-400 rounded-full text-sm font-bold border border-cloud-blue-500/30">
                        {exp.version}
                      </span>
                      <span className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-semibold">
                        {exp.era}
                      </span>
                    </div>
                    <p className="text-cloud-blue-400 font-medium mb-1">{exp.company} • {exp.role}</p>
                    <p className="text-sm text-gray-500 mb-1">{exp.period}</p>
                  </div>
                </div>

                {/* Problems Faced */}
                <div className="mb-4 p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                  <h4 className="text-sm font-semibold text-red-400 mb-3 flex items-center gap-2">
                    <span>⚠️</span>
                    Problems Faced
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {exp.problemsFaced.map((problem, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-red-400 mt-1">•</span>
                        <span>{problem}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Architectural Decisions */}
                <div className="mb-4 p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                  <h4 className="text-sm font-semibold text-green-400 mb-3 flex items-center gap-2">
                    <span>✓</span>
                    Architectural Decisions
                  </h4>
                  <ul className="space-y-2 text-sm text-gray-300">
                    {exp.architecturalDecisions.map((decision, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-green-400 mt-1">✓</span>
                        <span>{decision}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies Provisioned */}
                <div className="mb-4">
                  <h4 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <span>⚙️</span>
                    Technologies Provisioned
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {exp.technologiesProvisioned.map((tech, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-cloud-blue-500/20 text-cloud-blue-300 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Impact Metrics */}
                <div className="glass-strong rounded-lg p-4 mt-4 border-l-4 border-green-500">
                  <p className="text-xs text-gray-400 mb-2 font-semibold">Impact Metrics</p>
                  <p className="text-sm text-green-400 font-medium leading-relaxed">{exp.impactMetrics}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Experience
