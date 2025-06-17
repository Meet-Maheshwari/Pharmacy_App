import React from "react";
import Hero from "../components/Hero";
import ProductCarousel from "../components/ProductCarousel";
import Categories from "../components/Categories";
import Services from "../components/Services";
import Footer from "../components/Footer";
import { Phone } from "lucide-react";

const HomePage = () => {
  return (
    <>
      <div className="bg-green-400 text-white py-2 overflow-hidden relative">
        <div className="animate-marquee whitespace-nowrap flex items-center gap-x-24 px-4 text-sm">
          <span className="flex items-center gap-2">
            <Phone size={14} />
            Emergency: +1-800-PHARMACY
          </span>
          <span>• Free delivery on orders over Rs499</span>
          <span>• Licensed Pharmacists Available 24/7</span>
        </div>
      </div>
      <Hero />
      <Categories />
      <section className="pt-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl mb-2">
              <span className="font-bold">Featured </span>
              <span className="font-bold text-green-500">
                Product Categories
              </span>
            </h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our premium selection of healthcare products, carefully
              curated for your health and wellness needs
            </p>
          </div>
        </div>
      </section>
      <ProductCarousel category="Pain Relievers" />
      <ProductCarousel category="Skin Care" />
      <ProductCarousel category="Protein & Vitamins" />
      <Services />
      <Footer />
    </>
  );
};

export default HomePage;
