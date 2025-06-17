import { Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-slate-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">+</span>
              </div>
              <span className="text-xl font-bold">Pharmacy</span>
            </div>
            <p className="text-gray-400 text-sm">
              Your trusted online pharmacy delivering genuine medicines and
              healthcare products to your doorstep.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <Phone size={16} />
              <span>Emergency: +1-800-1200-8494-4000</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">
                Prescription Upload
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Medicines
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Health Care
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Personal Care
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Baby Care
              </a>
            </div>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="font-semibold mb-4">Customer Service</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <a href="#" className="block hover:text-white transition-colors">
                Contact Us
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                FAQs
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Track Order
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Return Policy
              </a>
              <a href="#" className="block hover:text-white transition-colors">
                Privacy Policy
              </a>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-semibold mb-4">Stay Updated</h4>
            <p className="text-sm text-gray-400 mb-4">
              Subscribe to get special offers and health tips
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-l text-sm"
              />
              <button className="bg-black hover:bg-slate-800 px-4 py-2 rounded-r text-sm font-medium">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-black mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            &copy; 2025 Pharmacy. All rights reserved. Licensed Pharmacy - Reg.
            No. PH123456
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
