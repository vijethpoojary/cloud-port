import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [logs, setLogs] = useState([])

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setLogs([])

    // Simulate terminal-style deployment logs
    const deploymentLogs = [
      { text: '[INFO] Initializing support ticket deployment...', color: 'text-blue-400', delay: 200 },
      { text: '[INFO] Validating requester credentials...', color: 'text-blue-400', delay: 400 },
      { text: '[OK] Requester validated: ' + formData.name, color: 'text-green-400', delay: 600 },
      { text: '[INFO] Processing message payload...', color: 'text-blue-400', delay: 800 },
      { text: '[INFO] Encrypting sensitive data...', color: 'text-blue-400', delay: 1000 },
      { text: '[OK] Data encryption complete', color: 'text-green-400', delay: 1200 },
      { text: '[INFO] Queueing ticket to support system...', color: 'text-blue-400', delay: 1400 },
      { text: '[OK] Ticket successfully deployed to queue', color: 'text-green-400', delay: 1600 },
      { text: '[SUCCESS] Deployment complete! Ticket ID: TKT-' + Math.random().toString(36).substr(2, 9).toUpperCase(), color: 'text-green-400', delay: 1800 },
    ]

    deploymentLogs.forEach((log) => {
      setTimeout(() => {
        setLogs((prev) => [...prev, log])
      }, log.delay)
    })

    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setFormData({ name: '', email: '', message: '' })
      
      setTimeout(() => {
        setShowSuccess(false)
        setLogs([])
      }, 8000)
    }, 2000)
  }

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Deploy Support Ticket</h2>
        <p className="text-gray-400">Create and deploy a support ticket to the platform architect</p>
      </div>

      <div className="glass-strong rounded-xl p-8 lg:p-12 max-w-4xl">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🎫</span>
            <h3 className="text-xl font-semibold text-gray-100">Deploy a Support Ticket</h3>
          </div>
          <p className="text-sm text-gray-400">
            Your ticket will be processed and deployed to the support queue
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
              Requester Name <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cloud-blue-500 focus:ring-2 focus:ring-cloud-blue-500/20 transition-all font-mono"
              placeholder="requester-name"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
              Requester Email <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cloud-blue-500 focus:ring-2 focus:ring-cloud-blue-500/20 transition-all font-mono"
              placeholder="requester@example.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
              Message Payload <span className="text-red-400">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={6}
              className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-gray-100 placeholder-gray-500 focus:outline-none focus:border-cloud-blue-500 focus:ring-2 focus:ring-cloud-blue-500/20 transition-all resize-none font-mono text-sm"
              placeholder="Enter your message payload here..."
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 bg-cloud-blue-600 hover:bg-cloud-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-white rounded-lg font-semibold transition-colors card-hover flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="animate-pulse">⏳</span>
                <span>Deploying Ticket...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Deploy Ticket</span>
              </>
            )}
          </button>
        </form>

        {/* Terminal-style Deployment Logs */}
        {(isSubmitting || logs.length > 0) && (
          <div className="mt-6 p-4 bg-gray-950 rounded-lg border border-gray-800 font-mono text-sm">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-gray-800">
              <span className="w-3 h-3 bg-red-500 rounded-full"></span>
              <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span className="ml-3 text-xs text-gray-500">Deployment Terminal</span>
            </div>
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {logs.length === 0 && isSubmitting && (
                <div className="text-gray-600 animate-pulse">Waiting for deployment logs...</div>
              )}
              {logs.map((log, idx) => (
                <div key={idx} className={`${log.color} animate-fade-in`}>
                  <span className="text-gray-600">$ </span>
                  {log.text}
                </div>
              ))}
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="mt-6 p-6 bg-green-500/20 border border-green-500/30 rounded-lg animate-fade-in">
            <div className="flex items-start gap-3">
              <span className="text-3xl">✅</span>
              <div className="flex-1">
                <p className="text-green-400 font-semibold text-lg mb-1">Ticket successfully deployed 🚀</p>
                <p className="text-sm text-green-300/80 mb-3">
                  Your support ticket has been queued for processing
                </p>
                <div className="mt-4 p-3 bg-gray-900/50 rounded border border-gray-800">
                  <p className="text-xs text-gray-400 mb-1">Ticket Status: Queued</p>
                  <p className="text-xs text-gray-400 mb-1">Response Time: Within 24 hours</p>
                  <p className="text-xs text-gray-400">Priority: Normal</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Additional Contact Info */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
        <div className="glass rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Email</p>
          <a href="mailto:poojaryvijeth239@gmail.com" className="text-cloud-blue-400 font-medium font-mono hover:underline">poojaryvijeth239@gmail.com</a>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Phone</p>
          <a href="tel:+917795113205" className="text-cloud-blue-400 font-medium font-mono hover:underline">+91 77951 13205</a>
        </div>
        <div className="glass rounded-lg p-4 text-center">
          <p className="text-sm text-gray-400 mb-1">Portfolio</p>
          <p className="text-cloud-blue-400 font-medium font-mono">Available</p>
        </div>
      </div>
    </div>
  )
}

export default Contact
