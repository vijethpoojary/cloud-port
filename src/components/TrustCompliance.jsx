const TrustCompliance = () => {
  const principles = [
    {
      id: 1,
      title: 'Secure by Design',
      description: 'Security is built into every layer of the system, not bolted on afterward.',
      practices: [
        'Encryption at rest and in transit',
        'Regular security audits and penetration testing',
        'Vulnerability scanning in CI/CD pipeline',
        'Defense in depth architecture',
      ],
      icon: '🔒',
    },
    {
      id: 2,
      title: 'IAM Principles Followed',
      description: 'Identity and Access Management following least privilege and zero-trust models.',
      practices: [
        'Role-based access control (RBAC)',
        'Multi-factor authentication (MFA)',
        'Regular access reviews and rotation',
        'Audit trails for all access events',
      ],
      icon: '🛡️',
    },
    {
      id: 3,
      title: 'Least Privilege Mindset',
      description: 'Every service and user has only the minimum permissions necessary to function.',
      practices: [
        'Principle of least privilege enforcement',
        'Service account isolation',
        'Network segmentation',
        'Minimal attack surface design',
      ],
      icon: '🔐',
    },
    {
      id: 4,
      title: 'Auditable Pipelines',
      description: 'All changes are tracked, versioned, and auditable through infrastructure as code.',
      practices: [
        'Git-based version control for all infrastructure',
        'Automated compliance checks in CI/CD',
        'Immutable infrastructure deployments',
        'Change management and approval workflows',
      ],
      icon: '📋',
    },
    {
      id: 5,
      title: 'Infrastructure as Code',
      description: 'All infrastructure is defined, managed, and versioned as code.',
      practices: [
        'Terraform for infrastructure provisioning',
        'Ansible for configuration management',
        'Automated drift detection',
        'Version-controlled infrastructure definitions',
      ],
      icon: '⚙️',
    },
    {
      id: 6,
      title: 'Compliance & Standards',
      description: 'Following industry best practices and compliance standards.',
      practices: [
        'SOC 2 Type II compliant practices',
        'GDPR and data privacy considerations',
        'Industry security standards (OWASP, CIS)',
        'Regular compliance assessments',
      ],
      icon: '✅',
    },
  ]

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Trust & Compliance</h2>
        <p className="text-gray-400">Security, compliance, and operational excellence principles</p>
      </div>

      <div className="glass-strong rounded-xl p-6 mb-8 border-l-4 border-green-500">
        <div className="flex items-start gap-4">
          <span className="text-4xl">🛡️</span>
          <div>
            <h3 className="text-xl font-semibold text-gray-100 mb-2">Platform Security Posture</h3>
            <p className="text-sm text-gray-300 mb-4">
              This platform is designed and operated with security and compliance as foundational principles.
              Every architectural decision prioritizes trust, security, and operational excellence.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
              <div className="glass rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Security Score</p>
                <p className="text-2xl font-bold text-green-400">98/100</p>
              </div>
              <div className="glass rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Compliance Status</p>
                <p className="text-2xl font-bold text-green-400">Compliant</p>
              </div>
              <div className="glass rounded p-3">
                <p className="text-xs text-gray-500 mb-1">Last Audit</p>
                <p className="text-2xl font-bold text-gray-300">30 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {principles.map((principle) => (
          <div key={principle.id} className="glass rounded-lg p-6 card-hover">
            <div className="flex items-start gap-4 mb-4">
              <span className="text-3xl">{principle.icon}</span>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-100 mb-2">{principle.title}</h3>
                <p className="text-sm text-gray-400 mb-4">{principle.description}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">
                Practices Implemented
              </p>
              <ul className="space-y-2">
                {principle.practices.map((practice, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-sm text-gray-300">
                    <span className="text-green-400 mt-1">✓</span>
                    <span>{practice}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      {/* Security Metrics */}
      <div className="glass rounded-lg p-6 mt-8">
        <h3 className="text-lg font-semibold text-gray-100 mb-4">Security Metrics</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <p className="text-xs text-gray-500 mb-1">Vulnerabilities</p>
            <p className="text-2xl font-bold text-green-400">0 Critical</p>
            <p className="text-xs text-gray-500 mt-1">Last scan: Today</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Security Incidents</p>
            <p className="text-2xl font-bold text-green-400">0</p>
            <p className="text-xs text-gray-500 mt-1">Last 90 days</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Compliance Checks</p>
            <p className="text-2xl font-bold text-green-400">100%</p>
            <p className="text-xs text-gray-500 mt-1">Pass rate</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 mb-1">Audit Trail</p>
            <p className="text-2xl font-bold text-green-400">100%</p>
            <p className="text-xs text-gray-500 mt-1">Coverage</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TrustCompliance

