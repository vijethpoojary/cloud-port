const Documentation = () => {
  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-aws-text-primary mb-2">Platform Documentation</h2>
        <p className="text-aws-text-secondary">System architecture and platform architect overview</p>
      </div>

      {/* Platform Architect Overview */}
      <div className="aws-card p-8 lg:p-12">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-4 bg-aws-blue-light rounded-md">
            <span className="text-4xl">👨‍💻</span>
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-semibold text-aws-text-primary mb-2">Platform Architect</h3>
            <p className="text-aws-blue font-medium mb-4">Vijeth Poojary</p>
            <p className="text-lg text-aws-text-secondary leading-relaxed">
              Associate Software Engineer at Gisul with hands-on experience in Full Stack Development, 
              Cloud Infrastructure, and DevOps automation. I work at the intersection of software engineering 
              and cloud technologies, building scalable applications and reliable deployment pipelines.
            </p>
          </div>
        </div>
      </div>

      {/* Current Focus */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="aws-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">🎯</span>
            <h3 className="text-xl font-semibold text-aws-text-primary">Current Focus</h3>
          </div>
          <div className="space-y-3 text-aws-text-secondary">
            <p>
              Currently, I contribute to the development and maintenance of production-grade applications 
              using <span className="text-aws-blue font-medium">Python (FastAPI)</span>, 
              <span className="text-aws-blue font-medium"> Next.js</span>, 
              <span className="text-aws-blue font-medium"> React.js</span>, and modern backend architectures.
            </p>
            <p>
              I have practical exposure to designing APIs, integrating databases, and collaborating within 
              agile engineering teams to deliver real-world solutions.
            </p>
          </div>
        </div>

        <div className="aws-card p-6">
          <div className="flex items-center gap-3 mb-4">
            <span className="text-2xl">☁️</span>
            <h3 className="text-xl font-semibold text-aws-text-primary">Cloud & DevOps Journey</h3>
          </div>
          <div className="space-y-3 text-aws-text-secondary">
            <p>
              My cloud and DevOps journey includes working extensively with 
              <span className="text-aws-blue font-medium"> AWS</span> and 
              <span className="text-aws-blue font-medium"> Azure</span>, where I've implemented 
              infrastructure components such as EC2, VPC, IAM, S3, RDS, CloudWatch, CloudTrail, CloudFront, 
              Route 53, and Azure VM & Entra ID.
            </p>
            <p>
              I have hands-on experience automating CI/CD pipelines using 
              <span className="text-aws-blue font-medium"> GitHub Actions</span> and 
              <span className="text-aws-blue font-medium"> Jenkins</span>, containerizing applications 
              with <span className="text-aws-blue font-medium">Docker</span>, orchestrating with 
              <span className="text-aws-blue font-medium"> Kubernetes</span>, and provisioning infrastructure 
              using <span className="text-aws-blue font-medium">Terraform</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Technical Expertise Summary */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-aws-blue uppercase tracking-wide mb-3">
      Full Stack Development
    </h4>
    <ul className="space-y-2 text-sm text-aws-text-secondary">
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Python (FastAPI, Flask)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>JavaScript (React.js, Next.js, Node.js)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Express.js, REST APIs</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Database Integration (MongoDB, MySQL, SQL Server)</span>
      </li>
    </ul>
  </div>

  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-aws-blue uppercase tracking-wide mb-3">
      Cloud Infrastructure
    </h4>
    <ul className="space-y-2 text-sm text-aws-text-secondary">
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>AWS: EC2, VPC, IAM, S3, RDS, CloudWatch, CloudTrail</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>CloudFront, Route 53, EFS</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Azure: Virtual Machines, Storage, Entra ID</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Infrastructure Design & Architecture</span>
      </li>
    </ul>
  </div>

  <div className="space-y-3">
    <h4 className="text-sm font-semibold text-aws-blue uppercase tracking-wide mb-3">
      DevOps & Automation
    </h4>
    <ul className="space-y-2 text-sm text-aws-text-secondary">
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>CI/CD Pipelines (GitHub Actions, Jenkins)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Containerization (Docker, Kubernetes)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Infrastructure as Code (Terraform)</span>
      </li>
      <li className="flex items-start gap-2">
        <span className="text-green-500 mt-1">✓</span>
        <span>Monitoring & Observability</span>
      </li>
    </ul>
  </div>
</div>


      {/* Engineering Philosophy */}
      <div className="aws-card p-6 border-l-4 border-aws-blue">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl">💡</span>
          <h3 className="text-xl font-semibold text-aws-text-primary">Engineering Philosophy</h3>
        </div>
        <div className="space-y-4 text-aws-text-secondary">
          <p>
            I believe in building systems that are <span className="text-aws-blue font-medium">scalable</span>, 
            <span className="text-aws-blue font-medium"> reliable</span>, and 
            <span className="text-aws-blue font-medium"> maintainable</span>. My approach focuses on:
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div className="aws-card p-4">
              <h4 className="font-semibold text-aws-text-primary mb-2">🏗️ Architecture First</h4>
              <p className="text-sm text-aws-text-secondary">Design scalable architectures that grow with business needs</p>
            </div>
            <div className="aws-card p-4">
              <h4 className="font-semibold text-aws-text-primary mb-2">🔄 Automation Driven</h4>
              <p className="text-sm text-aws-text-secondary">Automate everything possible to reduce toil and increase reliability</p>
            </div>
            <div className="aws-card p-4">
              <h4 className="font-semibold text-aws-text-primary mb-2">📊 Data-Driven Decisions</h4>
              <p className="text-sm text-aws-text-secondary">Monitor, measure, and optimize based on real metrics</p>
            </div>
            <div className="aws-card p-4">
              <h4 className="font-semibold text-aws-text-primary mb-2">🤝 Collaborative Approach</h4>
              <p className="text-sm text-aws-text-secondary">Work within agile teams to deliver production-grade solutions</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass rounded-lg p-6 text-center">
          <p className="text-3xl font-semibold text-aws-blue mb-1">3+</p>
          <p className="text-sm text-aws-text-secondary">Years Experience</p>
        </div>
        <div className="aws-card p-6 text-center">
          <p className="text-3xl font-semibold text-green-700 mb-1">6+</p>
          <p className="text-sm text-aws-text-secondary">Projects Deployed</p>
        </div>
        <div className="aws-card p-6 text-center">
          <p className="text-3xl font-semibold text-purple-700 mb-1">18+</p>
          <p className="text-sm text-aws-text-secondary">Services Mastered</p>
        </div>
        <div className="aws-card p-6 text-center">
          <p className="text-3xl font-semibold text-yellow-700 mb-1">2</p>
          <p className="text-sm text-aws-text-secondary">Cloud Platforms</p>
        </div>
      </div>
    </div>
  )
}

export default Documentation

