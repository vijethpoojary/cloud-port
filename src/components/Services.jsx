import ServiceCard from './ServiceCard'
import { services } from '../data/services'

const Services = () => {
  const categories = [...new Set(services.map(s => s.category))]

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold text-aws-text-primary mb-2">Resource Inventory</h2>
        <p className="text-aws-text-secondary">Managed cloud services and infrastructure resources</p>
      </div>

      {categories.map((category) => {
        const categoryServices = services.filter(s => s.category === category)
        return (
          <div key={category} className="mb-12">
            <h3 className="text-lg font-semibold text-aws-text-primary mb-4 flex items-center gap-2">
              <span className="w-1 h-5 bg-aws-blue"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {categoryServices.map((service) => (
                <ServiceCard key={service.id} service={service} />
              ))}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Services
