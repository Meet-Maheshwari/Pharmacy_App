import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ShoppingBag,
  Package,
  Truck,
  CheckCircle,
  X,
  Clock,
  CreditCard,
  MapPin,
  Star,
  RefreshCw,
  Heart,
  Search,
} from "lucide-react";
import { useOrderStore } from "../store/useOrderStore";
import Footer from "../components/Footer";
import ProductCarousel from "../components/ProductCarousel";

const OrdersPage = () => {
  // Sample orders data - in a real app, this would come from an API
  const { orders, getOrders, deleteOrder } = useOrderStore();

  useEffect(() => {
    getOrders();
  }, [getOrders, orders]);

  const getStatusIcon = (status) => {
    switch (status) {
      case "Pending":
        return <Clock className="w-4 h-4" />;
      case "Processing":
        return <Package className="w-4 h-4" />;
      case "Shipped":
        return <Truck className="w-4 h-4" />;
      case "Delivered":
        return <CheckCircle className="w-4 h-4" />;
      case "Cancelled":
        return <X className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-100 text-yellow-800";
      case "Processing":
        return "bg-blue-100 text-blue-800";
      case "Shipped":
        return "bg-purple-100 text-purple-800";
      case "Delivered":
        return "bg-green-100 text-green-800";
      case "Cancelled":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">My Orders</h1>
            <p className="text-gray-600">
              Track and manage your pharmacy orders
            </p>
          </div>

          {orders && orders.length === 0 ? (
            <div className="text-center py-16">
              <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                No orders yet
              </h2>
              <p className="text-gray-500 mb-6">
                Start shopping to see your orders here
              </p>
              <Link
                to="/"
                className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Start Shopping
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {[...orders].reverse().map((order) => (
                <div
                  key={order._id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden"
                >
                  {/* Order Header */}
                  <div className="bg-gradient-to-r from-green-500 to-green-400 text-white p-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="mb-3 md:mb-0">
                        <h3 className="text-lg font-bold mb-1">
                          Order #{order._id}
                        </h3>
                        <p className="text-green-100 text-sm">
                          Placed on{" "}
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-4">
                        <div
                          className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                            order.status
                          )}`}
                        >
                          {getStatusIcon(order.status)}
                          <span className="ml-1">{order.status}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-green-100 text-xs">Total Amount</p>
                          <p className="text-xl font-bold">
                            &#8377;{order.total_price.toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                      {/* Order Items */}
                      <div className="lg:col-span-2">
                        <h4 className="text-md font-semibold text-gray-800 mb-3">
                          Order Items
                        </h4>
                        <div className="space-y-2">
                          {order.products.map((item) => (
                            <div
                              key={item.product._id}
                              className="flex items-center space-x-3 p-2 border border-gray-200 rounded-lg"
                            >
                              <div className="flex-shrink-0">
                                <img
                                  src={item.product.image}
                                  alt={item.product.prodTitle}
                                  className="w-12 h-12 object-cover rounded-lg bg-gray-100"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h5 className="font-medium text-gray-800 text-sm truncate">
                                  {item.product.prodTitle}
                                </h5>
                                <div className="flex items-center space-x-3 mt-1">
                                  <span className="text-green-600 font-semibold text-sm">
                                    &#8377;{item.product.price.org.toFixed(2)}
                                  </span>
                                  <span className="text-gray-500 text-xs">
                                    Qty: {item.quantity}
                                  </span>
                                  <span className="text-gray-800 font-medium text-sm">
                                    &#8377;
                                    {(
                                      item.product.price.org * item.quantity
                                    ).toFixed(2)}
                                  </span>
                                </div>
                              </div>
                              <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                                <Heart className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Order Details */}
                      <div className="space-y-3">
                        {/* Shipping Address */}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <MapPin className="w-4 h-4 text-green-500" />
                            <h5 className="font-semibold text-gray-800 text-sm">
                              Shipping Address
                            </h5>
                          </div>
                          <div className="text-xs text-gray-600 space-y-1">
                            <p className="font-medium text-gray-800">
                              {order.customerAddress.name}
                            </p>
                            <p>{order.customerAddress.deliveryAdd}</p>
                            <p>
                              {order.customerAddress.city},{" "}
                              {order.customerAddress.state}{" "}
                              {order.customerAddress.zipCode}
                            </p>
                          </div>
                        </div>

                        {/* Payment Method */}
                        <div className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-2 mb-2">
                            <CreditCard className="w-4 h-4 text-green-500" />
                            <h5 className="font-semibold text-gray-800 text-sm">
                              Payment Method
                            </h5>
                          </div>
                          <p className="text-xs text-gray-600">
                            {order.paymentMethod}
                          </p>
                        </div>

                        {/* Order Actions */}
                        <div className="space-y-2">
                          <button
                            className="w-full bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-3 rounded-lg transition-colors text-sm"
                            onClick={() => {
                              deleteOrder(order._id);
                              getOrders();
                            }}
                          >
                            Cancel Order
                          </button>
                          {order.status === "Delivered" && (
                            <div className="flex space-x-2">
                              <button className="flex-1 bg-white hover:bg-gray-50 text-green-600 font-medium py-2 px-3 rounded-lg border border-green-600 transition-colors text-sm flex items-center justify-center">
                                <RefreshCw className="w-4 h-4 mr-1" />
                                Reorder
                              </button>
                              <button className="flex-1 bg-white hover:bg-gray-50 text-green-600 font-medium py-2 px-3 rounded-lg border border-green-600 transition-colors text-sm flex items-center justify-center">
                                <Star className="w-4 h-4 mr-1" />
                                Review
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Recommended Products Section */}
              <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Shop More Items Like These
                    </h3>
                    <p className="text-gray-600 text-sm">
                      Based on your recent orders
                    </p>
                  </div>
                </div>

                <ProductCarousel category="Pain Relievers" />
              </div>

              {/* Quick Actions */}
              <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-2xl p-6 text-white">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Package className="w-8 h-8 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Need Help?</h4>
                    <p className="text-green-100 text-sm mb-3">
                      Contact our support team
                    </p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                      Get Support
                    </button>
                  </div>
                  <div className="text-center">
                    <RefreshCw className="w-8 h-8 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Quick Reorder</h4>
                    <p className="text-green-100 text-sm mb-3">
                      Reorder your regular medications
                    </p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                      Reorder Now
                    </button>
                  </div>
                  <div className="text-center">
                    <Heart className="w-8 h-8 mx-auto mb-2" />
                    <h4 className="font-semibold mb-1">Health Tips</h4>
                    <p className="text-green-100 text-sm mb-3">
                      Get personalized health advice
                    </p>
                    <button className="bg-white text-green-600 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-50 transition-colors">
                      Learn More
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default OrdersPage;
