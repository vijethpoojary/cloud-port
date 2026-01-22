import { useState } from 'react'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showAlert, setShowAlert] = useState({ type: '', message: '' })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate form
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setShowAlert({
        type: 'error',
        message: 'All fields are required',
      })
      return
    }

    setIsSubmitting(true)
    setShowAlert({ type: '', message: '' })

    try {
      const response = await fetch('https://formsubmit.co/ajax/poojaryvijeth239@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
          _captcha: false,
          _subject: 'Portfolio Contact – SES',
          _template: 'box',
        }),
      })

      if (response.ok) {
        setShowAlert({
          type: 'success',
          message: 'Message sent successfully! Thank you for reaching out.',
        })
        setFormData({ name: '', email: '', message: '' })
        
        setTimeout(() => {
          setShowAlert({ type: '', message: '' })
        }, 5000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      setShowAlert({
        type: 'error',
        message: 'Failed to send message. Please try again.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-8 animate-slide-up">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-aws-text-primary mb-2">
          Simple Email Service (SES) – Contact
        </h1>
        <p className="text-aws-text-secondary">
          Send me a message and I'll get back to you as soon as possible
        </p>
      </div>

      {/* Success/Error Alert */}
      {showAlert.message && (
        <div
          className={`p-4 rounded-md border animate-fade-in ${
            showAlert.type === 'success'
              ? 'bg-green-50 border-green-300'
              : 'bg-red-50 border-red-300'
          }`}
        >
          <p
            className={`text-sm font-medium ${
              showAlert.type === 'success'
                ? 'text-green-800'
                : 'text-red-800'
            }`}
          >
            {showAlert.type === 'success' ? '✓ ' : '✕ '}
            {showAlert.message}
          </p>
        </div>
      )}

      {/* Contact Form Card */}
      <div className="bg-white rounded-md border border-aws-border p-6 shadow-sm">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-aws-text-primary flex items-center gap-2">
            <span className="text-xl">📧</span>
            Send a Message
          </h2>
          <p className="text-sm text-aws-text-secondary mt-1">
            Fill out the form below and I'll respond within 24 hours
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Full Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-aws-text-primary mb-2">
              Full Name <span className="text-red-600">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="John Doe"
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-aws-border rounded-md text-aws-text-primary placeholder-aws-text-secondary focus:outline-none focus:border-aws-blue focus:ring-1 focus:ring-aws-blue disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
            />
          </div>

          {/* Email Address Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-aws-text-primary mb-2">
              Email Address <span className="text-red-600">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="john@example.com"
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-aws-border rounded-md text-aws-text-primary placeholder-aws-text-secondary focus:outline-none focus:border-aws-blue focus:ring-1 focus:ring-aws-blue disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors"
            />
          </div>

          {/* Message Field */}
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-aws-text-primary mb-2">
              Message <span className="text-red-600">*</span>
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              placeholder="Your message here..."
              disabled={isSubmitting}
              className="w-full px-4 py-2 border border-aws-border rounded-md text-aws-text-primary placeholder-aws-text-secondary focus:outline-none focus:border-aws-blue focus:ring-1 focus:ring-aws-blue disabled:bg-gray-50 disabled:cursor-not-allowed transition-colors resize-none"
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full px-6 py-3 aws-button-primary  text-white font-medium rounded-md transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isSubmitting ? (
              <>
                <span className="inline-block animate-spin">⏳</span>
                <span>Sending…</span>
              </>
            ) : (
              <>
                <span>📤</span>
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </div>

      {/* Contact Information Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white rounded-md border border-aws-border p-4">
          <p className="text-xs font-semibold text-aws-text-secondary uppercase tracking-wide mb-2">
            Email Address
          </p>
          <a
            href="mailto:poojaryvijeth239@gmail.com"
            className="text-aws-blue hover:text-aws-blue-hover font-medium text-sm break-all transition-colors"
          >
            poojaryvijeth239@gmail.com
          </a>
        </div>

        <div className="bg-white rounded-md border border-aws-border p-4">
          <p className="text-xs font-semibold text-aws-text-secondary uppercase tracking-wide mb-2">
            Response Time
          </p>
          <p className="text-aws-text-primary font-medium text-sm">Within 24 hours</p>
        </div>

        <div className="bg-white rounded-md border border-aws-border p-4">
          <p className="text-xs font-semibold text-aws-text-secondary uppercase tracking-wide mb-2">
            Service Status
          </p>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-600 rounded-full"></div>
            <p className="text-aws-text-primary font-medium text-sm">Operational</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
