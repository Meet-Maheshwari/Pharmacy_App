import React, { useState } from "react";
import { MapPin, CreditCard, Lock, CheckCircle } from "lucide-react";
import { useProductStore } from "../store/useProductStore";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

const DirectOrderShippingForm = ({ product, quantity, total }) => {
  const { placeDirectOrder } = useProductStore();
  const { userData, baseURL } = useAuthStore();

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    address: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    paymentMethod: "Online/Card Payment",
  });

  const [formErrors, setFormErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!formData.address?.trim()) errors.address = "Address is required";
    if (!formData.city?.trim()) errors.city = "City is required";
    if (!formData.state?.trim()) errors.state = "State is required";
    if (!formData.country?.trim()) errors.country = "Country is required";
    if (!formData.zipCode?.trim()) errors.zipCode = "ZIP Code is required";
    if (!formData.paymentMethod?.trim())
      errors.paymentMethod = "Select a payment method";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (formData.paymentMethod === "Online/Card Payment") {
        checkoutHandler(total);
      } else {
        await placeDirectOrder(formData, product, quantity, total);
        toast.success("Order placed successfully");
        navigate("/orders");
      }
    }
  };

  const checkoutHandler = async (total) => {
    try {
      axios.defaults.withCredentials = true;
      const {
        data: { order },
      } = await axios.post(baseURL + `/payment/checkout`, {
        total,
      });

      const {
        data: { key },
      } = await axios.get(baseURL + `/payment/key`);

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "MyPharma",
        description: "Test Transaction",
        order_id: order.id,
        handler: async function (response) {
          try {
            const verify = await axios.post(
              baseURL + `/payment/paymentverification`,
              response
            );

            if (verify.data.success) {
              await placeDirectOrder(formData, product, quantity, total);
              toast.success("Order placed successfully");
              navigate("/orders");
            } else {
              toast.error("Payment verification failed");
            }
          } catch (err) {
            toast.error("Error verifying payment");
            console.error(err);
          }
        },
        prefill: {
          name: userData.username,
          email: userData.email,
          contact: "",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      rzp1.open();
    } catch (error) {
      console.error("Checkout Error:", error);
      toast.error("Payment initialization failed");
    }
  };

  return (
    <div className="space-y-6">
      {/* Shipping Address */}
      <div className="bg-white rounded-2xl shadow-lg p-6">
        <div className="flex items-center space-x-2 mb-6">
          <MapPin className="w-5 h-5 text-green-500" />
          <h2 className="text-xl font-semibold text-gray-800">
            Shipping Address
          </h2>
        </div>

        <form onSubmit={handlePlaceOrder} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Address
            </label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              required
            />
            {formErrors.address && (
              <p className="text-red-500 text-xs mt-1">{formErrors.address}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                City
              </label>
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              {formErrors.city && (
                <p className="text-red-500 text-xs mt-1">{formErrors.city}</p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                State
              </label>
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              {formErrors.state && (
                <p className="text-red-500 text-xs mt-1">{formErrors.state}</p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                ZIP Code
              </label>
              <input
                type="text"
                name="zipCode"
                value={formData.zipCode}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              />
              {formErrors.zipCode && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.zipCode}
                </p>
              )}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <select
                name="country"
                value={formData.country}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                required
              >
                <option value="">Select Country</option>
                <option value="IN">India</option>
                <option value="NY">New York</option>
                <option value="TX">Texas</option>
                <option value="FL">Florida</option>
                <option value="CA">California</option>
              </select>
              {formErrors.country && (
                <p className="text-red-500 text-xs mt-1">
                  {formErrors.country}
                </p>
              )}
            </div>
          </div>

          <div>
            <div className="flex items-center space-x-2 my-6">
              <CreditCard className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold text-gray-800">
                Payment Method
              </h2>
            </div>

            <div className="space-y-3">
              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Online/Card Payment"
                  checked={formData.paymentMethod === "Online/Card Payment"}
                  onChange={handleInputChange}
                  className="text-green-500"
                />
                <CreditCard className="w-5 h-5 text-gray-400" />
                <span className="font-medium">Online/Card Payment</span>
              </label>

              <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="Cash on Delivery"
                  checked={formData.paymentMethod === "Cash on Delivery"}
                  onChange={handleInputChange}
                  className="text-green-500"
                />
                <span className="font-medium">Cash on Delivery</span>
              </label>
            </div>
          </div>

          {/* Place Order Button */}
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-6 rounded-2xl transition-colors flex items-center justify-center space-x-2 shadow-lg"
          >
            <Lock className="w-5 h-5" />
            <span>Place Secure Order</span>
          </button>
        </form>
      </div>

      <p className="text-xs text-gray-500 text-center">
        By placing an order, you agree to our Terms of Service and Privacy
        Policy. All orders require valid prescription for prescription
        medicines.
      </p>

      {/* Order Summary */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl shadow-lg p-6 text-white">
        <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
        <div className="space-y-2 text-green-100">
          <div className="flex justify-between">
            <span>Estimated Delivery</span>
            <span>2-3 Days</span>
          </div>
          <div className="flex justify-between">
            <span>Order Protection</span>
            <CheckCircle className="w-4 h-4" />
          </div>
        </div>
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-green-400">
          <span className="text-xl font-bold">Total</span>
          <span className="text-2xl font-bold">&#8377;{total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  );
};

export default DirectOrderShippingForm;
