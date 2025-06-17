const Categories = () => {
  const categories = [
    {
      name: "Prescription Medicines",
      description: "Authentic prescription drugs",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      color: "bg-blue-500",
    },
    {
      name: "Pain Relief",
      description: "Effective pain management",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      color: "bg-green-500",
    },
    {
      name: "Vitamins & Supplements",
      description: "Health & wellness products",
      image:
        "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=300&h=200&fit=crop",
      color: "bg-purple-500",
    },
    {
      name: "Personal Care",
      description: "Daily care essentials",
      image:
        "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=300&h=200&fit=crop",
      color: "bg-pink-500",
    },
    {
      name: "Baby Care",
      description: "Safe products for babies",
      image:
        "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300&h=200&fit=crop",
      color: "bg-yellow-500",
    },
    {
      name: "First Aid",
      description: "Emergency care supplies",
      image:
        "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=300&h=200&fit=crop",
      color: "bg-red-500",
    },
  ];

  return (
    <section className="pt-12 pb-10 bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-4">
            Shop by Category
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find what you need from our comprehensive range of healthcare
            products
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {categories.map((category) => (
            <div
              key={category.name}
              className="h-52 hover:shadow-lg transition-shadow cursor-pointer group border-green-800 rounded-md"
            >
              <div className="p-4 text-center">
                <div
                  className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-3 flex items-center justify-center group-hover:scale-110 transition-transform`}
                >
                  <span className="text-white text-2xl font-bold">
                    {category.name.charAt(0)}
                  </span>
                </div>
                <h4 className="font-semibold text-gray-800 mb-1 text-sm">
                  {category.name}
                </h4>
                <p className="text-xs text-gray-600">{category.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
