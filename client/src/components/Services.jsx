const Services = () => {
  const services = [
    {
      title: "Free Home Delivery",
      description:
        "Get your medicines delivered to your doorstep within 30 minutes",
      icon: "🚚",
      color: "bg-blue-50 border-blue-200",
    },
    {
      title: "24/7 Pharmacist Support",
      description:
        "Licensed pharmacists available round the clock for consultation",
      icon: "👨‍⚕️",
      color: "bg-green-50 border-green-200",
    },
    {
      title: "Prescription Upload",
      description:
        "Upload your prescription and get medicines delivered hassle-free",
      icon: "📋",
      color: "bg-purple-50 border-purple-200",
    },
    {
      title: "Authentic Products",
      description: "100% genuine medicines from verified manufacturers",
      icon: "✅",
      color: "bg-orange-50 border-orange-200",
    },
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Why Choose MedShop?
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            We provide comprehensive healthcare solutions with the highest
            standards of quality and service
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <div
              key={index}
              className={`${service.color} hover:shadow-lg transition-shadow`}
            >
              <div className="p-6 text-center">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h4 className="font-semibold text-gray-800 mb-2">
                  {service.title}
                </h4>
                <p className="text-sm text-gray-600">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
