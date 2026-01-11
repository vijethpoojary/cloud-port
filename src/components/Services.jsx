import ServiceCard from './ServiceCard'
import { services } from '../data/services'

const Services = () => {
  const categories = [...new Set(services.map(s => s.category))]

  return (
    <div className="space-y-8 animate-slide-up">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-100 mb-2">Resource Inventory</h2>
        <p className="text-gray-400">Managed cloud services and infrastructure resources</p>
      </div>

      {categories.map((category) => {
        const categoryServices = services.filter(s => s.category === category)
        return (
          <div key={category} className="mb-12">
            <h3 className="text-xl font-semibold text-cloud-blue-400 mb-4 flex items-center gap-2">
              <span className="w-1 h-6 bg-cloud-blue-500"></span>
              {category}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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

