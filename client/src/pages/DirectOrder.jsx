import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  ShoppingBag,
  Star,
  Shield,
  Truck,
  Clock,
  AlertCircle,
} from "lucide-react";
import DirectOrderShippingForm from "../components/DirectOrderShippingForm";
import { useProductStore } from "../store/useProductStore";
import Footer from "../components/Footer";

const DirectOrder = () => {
  const { id } = useParams();

  const [item, setItem] = useState({});
  const { getProduct } = useProductStore();

  async function findProduct() {
    console.log(id);
    const response = await getProduct(id);
    console.log(response);
    setItem(response);
  }

  useEffect(() => {
    findProduct();
  }, []);

  const [quantity, setQuantity] = useState(1);
  const subtotal = item?.price?.org * quantity;
  const shippingCost = subtotal > 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  const updateQuantity = (newQuantity) => {
    if (newQuantity >= 1) {
      setQuantity(newQuantity);
    }
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Direct Order
          </h1>
          <p className="text-gray-600">
            Complete your purchase quickly with express checkout
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Product Details */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Product Image */}
                <div className="flex justify-center">
                  <img
                    src={item?.image}
                    alt={item?.prodTitle}
                    className="w-64 h-64 object-cover rounded-xl bg-gray-100"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-800 mb-2">
                      {item?.prodTitle}
                    </h2>

                    <div className="flex items-center space-x-3 mb-4">
                      <span className="text-3xl font-bold text-green-600">
                        &#8377;{item?.price?.org}
                      </span>
                      <span className="text-lg text-gray-500 line-through">
                        &#8377;{item?.price?.mrp}
                      </span>
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-sm font-medium">
                        Save &#8377;
                        {(item?.price?.mrp - item?.price?.org).toFixed(2)}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2 mb-4">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-green-600 font-medium">
                        No prescription required
                      </span>
                    </div>

                    {/* {product.prescription && (
                      <div className="flex items-center space-x-2 mb-4 p-3 bg-orange-50 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-orange-500" />
                        <span className="text-sm text-orange-800 font-medium">
                          Prescription required
                        </span>
                      </div>
                    )} */}
                  </div>

                  {/* Quantity Selector */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Quantity
                    </label>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => updateQuantity(quantity - 1)}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                        disabled={quantity <= 1}
                      >
                        -
                      </button>
                      <span className="text-xl font-semibold text-gray-800 min-w-[3rem] text-center">
                        {quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(quantity + 1)}
                        className="w-10 h-10 rounded-lg border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Product Description */}
              <div className="mt-8 pt-8 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">
                  Product Description
                </h3>
                <p className="text-gray-600 mb-4">{item?.desc}</p>

                {item?.benefits && item?.benefits.length > 0 ? (
                  <div>
                    <h4 className="font-semibold text-gray-800 mb-2">
                      Benefits:
                    </h4>
                    <ul className="space-y-1 text-gray-600">
                      {item?.benefits?.map((benefit, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <div className="grid grid-cols-2 gap-4 mt-6 text-sm text-gray-600">
                  <div>
                    <span className="font-medium">Brand:</span> {item?.brand}
                  </div>
                  <div>
                    <span className="font-medium">Expiry Date:</span>{" "}
                    {new Date(item?.expiry).toLocaleDateString("en-GB")}
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Order Summary
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600">
                    <span>Item Price ({quantity}x)</span>
                    <span>&#8377;{subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>
                      {shippingCost === 0
                        ? "Free"
                        : `Rs${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Tax</span>
                    <span>&#8377;{tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold text-gray-800 pt-3 border-t border-gray-200">
                    <span>Total</span>
                    <span>&#8377;{total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="mt-6 grid grid-cols-3 gap-4 pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4 text-green-500" />
                  <span>Secure Payment</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4 text-green-500" />
                  <span>Fast Delivery</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4 text-green-500" />
                  <span>24/7 Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Shipping Form */}
          <div className="lg:col-span-1">
            <DirectOrderShippingForm
              product={item}
              quantity={quantity}
              total={total}
            />
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default DirectOrder;
