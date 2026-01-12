import { useEffect, useState } from 'react'

const Observability = () => {
  const [metrics, setMetrics] = useState({
    cpu: 45,
    memory: 68,
    requests: 1250,
    latency: 120,
    errorRate: 0.02,
    uptime: 99.99,
  })

  useEffect(() => {
    // Simulate metric updates
    const interval = setInterval(() => {
      setMetrics(prev => ({
        cpu: Math.max(30, Math.min(70, prev.cpu + (Math.random() * 10 - 5))),
        memory: Math.max(50, Math.min(85, prev.memory + (Math.random() * 8 - 4))),
        requests: prev.requests + Math.floor(Math.random() * 100 - 50),
        latency: Math.max(80, Math.min(200, prev.latency + (Math.random() * 20 - 10))),
        errorRate: Math.max(0, Math.min(0.1, prev.errorRate + (Math.random() * 0.02 - 0.01))),
        uptime: 99.99 + (Math.random() * 0.01 - 0.005),
      }))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const generateGraphData = (value, min, max) => {
    const data = []
    for (let i = 0; i < 12; i++) {
      data.push(min + Math.random() * (max - min))
    }
    data.push(value) // Current value
    return data
  }

  const cpuData = generateGraphData(metrics.cpu, 30, 70)
  const memoryData = generateGraphData(metrics.memory, 50, 85)
  const latencyData = generateGraphData(metrics.latency, 80, 200)

  const SimpleGraph = ({ data, color, height = 40 }) => {
    const max = Math.max(...data)
    const min = Math.min(...data)
    const range = max - min || 1

    return (
      <div className="relative h-12 overflow-hidden">
        <svg width="100%" height={height} className="absolute bottom-0">
          <polyline
            fill="none"
            stroke={color}
            strokeWidth="2"
            points={data.map((val, idx) => {
              const x = (idx / (data.length - 1)) * 100
              const y = height - ((val - min) / range) * height
              return `${x}%,${y}`
            }).join(' ')}
          />
          <polyline
            fill={`url(#gradient-${color.replace('#', '')})`}
            stroke="none"
            points={`0,${height} ${data.map((val, idx) => {
              const x = (idx / (data.length - 1)) * 100
              const y = height - ((val - min) / range) * height
              return `${x},${y}`
            }).join(' ')} ${(data.length - 1) / (data.length - 1) * 100},${height}`}
          />
          <defs>
            <linearGradient id={`gradient-${color.replace('#', '')}`} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={color} stopOpacity="0.3" />
              <stop offset="100%" stopColor={color} stopOpacity="0.05" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    )
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-aws-text-primary mb-2">System Telemetry</h2>
        <p className="text-aws-text-secondary">Real-time system metrics and performance indicators</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="aws-card p-6">
          <p className="text-sm text-aws-text-secondary mb-2">CPU Utilization</p>
          <p className="text-3xl font-semibold text-aws-blue mb-3">{metrics.cpu.toFixed(1)}%</p>
          <SimpleGraph data={cpuData} color="#2196f3" />
        </div>
        
        <div className="aws-card p-6">
          <p className="text-sm text-aws-text-secondary mb-2">Memory Usage</p>
          <p className="text-3xl font-semibold text-purple-700 mb-3">{metrics.memory.toFixed(1)}%</p>
          <SimpleGraph data={memoryData} color="#9c27b0" />
        </div>
        
        <div className="aws-card p-6">
          <p className="text-sm text-aws-text-secondary mb-2">Request Rate</p>
          <p className="text-3xl font-semibold text-green-700 mb-3">{metrics.requests.toLocaleString()}/min</p>
          <div className="h-12 flex items-end justify-between gap-1">
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((_, idx) => (
              <div
                key={idx}
                className="flex-1 bg-green-500/50 rounded-t transition-all duration-500"
                style={{
                  height: `${30 + Math.random() * 60}%`,
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="aws-card p-6">
          <p className="text-sm text-aws-text-secondary mb-2">P50 Latency</p>
          <p className="text-3xl font-semibold text-yellow-700 mb-3">{metrics.latency.toFixed(0)}ms</p>
          <SimpleGraph data={latencyData} color="#fbc02d" />
        </div>
      </div>

      {/* System Health & Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-aws-text-primary mb-4">Service Health</h3>
          <div className="space-y-4">
            {[
              { name: 'Compute Services', health: 98, status: 'Healthy' },
              { name: 'Storage Services', health: 95, status: 'Healthy' },
              { name: 'Networking', health: 99, status: 'Excellent' },
              { name: 'DevOps Pipeline', health: 97, status: 'Healthy' },
            ].map((service) => (
              <div key={service.name}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-aws-text-primary">{service.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-green-700">{service.health}%</span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 border border-green-200 rounded text-xs">
                      {service.status}
                    </span>
                  </div>
                </div>
                <div className="w-full h-2 bg-aws-bg-light rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 transition-all duration-1000"
                    style={{ width: `${service.health}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-aws-text-primary mb-4">Performance Metrics</h3>
          <div className="space-y-4">
            {[
              { name: 'API Response Time (P50)', value: `${metrics.latency.toFixed(0)}ms`, color: 'text-green-700', target: '150ms' },
              { name: 'Database Query Time', value: '45ms', color: 'text-green-700', target: '100ms' },
              { name: 'Cache Hit Rate', value: '87%', color: 'text-yellow-700', target: '90%' },
              { name: 'Error Rate', value: `${metrics.errorRate.toFixed(2)}%`, color: 'text-green-700', target: '<0.1%' },
            ].map((metric) => (
              <div key={metric.name} className="flex items-center justify-between p-3 bg-aws-bg-light border border-aws-border rounded-md">
                <div className="flex-1">
                  <p className="text-sm text-aws-text-primary">{metric.name}</p>
                  <p className="text-xs text-aws-text-secondary mt-1">Target: {metric.target}</p>
                </div>
                <div className="text-right">
                  <p className={`text-lg font-semibold ${metric.color}`}>{metric.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Platform Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Deployment Frequency</h3>
          <div className="text-center">
            <p className="text-4xl font-semibold text-aws-blue mb-2">42</p>
            <p className="text-sm text-aws-text-secondary">Deployments / month</p>
          </div>
          <div className="mt-4 h-32 flex items-end justify-between gap-1">
            {[1, 2, 3, 4].map((week) => (
              <div key={week} className="flex-1 flex flex-col gap-1">
                {[1, 2, 3].map((deploy) => (
                  <div
                    key={deploy}
                    className="w-full bg-aws-blue rounded transition-all duration-500"
                    style={{
                      height: `${20 + Math.random() * 40}%`,
                    }}
                  ></div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Mean Time to Recovery (MTTR)</h3>
          <div className="text-center">
            <p className="text-4xl font-semibold text-green-700 mb-2">15</p>
            <p className="text-sm text-aws-text-secondary">minutes</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-aws-text-secondary">
              <span>Last 7 days</span>
              <span>15 min</span>
            </div>
            <div className="flex justify-between text-xs text-aws-text-secondary">
              <span>Last 30 days</span>
              <span>18 min</span>
            </div>
            <div className="flex justify-between text-xs text-aws-text-secondary">
              <span>Last 90 days</span>
              <span>22 min</span>
            </div>
          </div>
        </div>

        <div className="aws-card p-6">
          <h3 className="text-lg font-semibold text-gray-100 mb-4">System Uptime</h3>
          <div className="text-center">
            <p className="text-4xl font-semibold text-green-700 mb-2">{metrics.uptime.toFixed(2)}%</p>
            <p className="text-sm text-aws-text-secondary">SLA: 99.99%</p>
          </div>
          <div className="mt-4 space-y-2">
            <div className="flex justify-between text-xs text-aws-text-secondary">
              <span>Today</span>
              <span className="text-green-700">100%</span>
            </div>
            <div className="flex justify-between text-xs text-aws-text-secondary">
              <span>Last 7 days</span>
              <span className="text-green-700">99.98%</span>
            </div>
            <div className="flex justify-between text-xs text-aws-text-secondary">
              <span>Last 30 days</span>
              <span className="text-green-700">99.97%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="glass rounded-lg p-6">
        <h3 className="text-lg font-semibold text-aws-text-primary mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {[
            { time: '2h ago', action: 'Deployed Compute.Engine.FastAPI update', status: 'success', type: 'deployment' },
            { time: '5h ago', action: 'Scaling Compute Services completed', status: 'info', type: 'scaling' },
            { time: '1d ago', action: 'Database optimization completed', status: 'success', type: 'optimization' },
            { time: '2d ago', action: 'New workload: Rental App initialized', status: 'info', type: 'deployment' },
            { time: '3d ago', action: 'Security patch deployed', status: 'success', type: 'security' },
          ].map((activity, idx) => (
            <div key={idx} className="flex items-center gap-3 p-3 bg-aws-bg-light border border-aws-border rounded-md">
              <div className={`w-2 h-2 rounded-full ${activity.status === 'success' ? 'bg-green-500' : 'bg-aws-blue'}`}></div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-aws-text-primary">{activity.action}</p>
                  <span className="px-2 py-0.5 bg-aws-bg-lighter text-aws-text-secondary border border-aws-border rounded text-xs">{activity.type}</span>
                </div>
                <p className="text-xs text-aws-text-secondary mt-0.5">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Observability
