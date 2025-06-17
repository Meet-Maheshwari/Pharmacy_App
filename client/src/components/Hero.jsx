import { useNavigate } from "react-router-dom";
import heroImage from "../assets/pharmacist-work.jpg";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="bg-gradient-to-r from-green-50 to-green-300 py-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
              Your Health,
              <span className="text-green-400"> Our Priority</span>
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Get genuine medicines delivered to your doorstep. Licensed
              pharmacists, authentic products, and 24/7 support for all your
              healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                className="bg-green-400 hover:bg-green-500 text-white hover:text-black px-8 rounded-md h-8"
                onClick={() => navigate("/chatbot")}
              >
                Diagnose Diasease
              </button>
              <button
                onClick={() => navigate("/products")}
                className="border-green-400 text-green-500 hover:bg-black rounded-md px-8"
              >
                Shop Medicines
              </button>
            </div>
            <div className="flex items-center gap-6 pt-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">50K+</div>
                <div className="text-sm text-gray-600">Happy Customers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">24/7</div>
                <div className="text-sm text-gray-600">Support Available</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">30min</div>
                <div className="text-sm text-gray-600">Quick Delivery</div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8">
              <img
                src={heroImage}
                alt="Healthcare professional"
                className="rounded-lg w-full h-80 object-cover"
              />
              <div className="absolute -bottom-4 -left-4 bg-green-500 text-white p-4 rounded-lg shadow-lg">
                <div className="text-sm font-medium">✓ Licensed Pharmacy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
