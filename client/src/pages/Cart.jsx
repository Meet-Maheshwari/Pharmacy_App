import { Link } from "react-router-dom";
import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  Truck,
  Shield,
  Clock,
} from "lucide-react";
import CartItem from "../components/CartItem";
import ShippingForm from "../components/ShippingForm";
import { useProductStore } from "../store/useProductStore";
import { useEffect } from "react";
import Footer from "../components/Footer";
import Loader from "../components/Loader";

const Cart = () => {
  const { cartItems, getCartItems, addToCart, removeFromCart } =
    useProductStore();

  useEffect(() => {
    getCartItems();
  }, [cartItems, getCartItems, addToCart, removeFromCart]);

  const addItemToCart = async (productId) => {
    await addToCart(productId);
  };

  const removeItemFromCart = async (productId) => {
    await removeFromCart(productId);
  };

  const subtotal =
    cartItems?.reduce((sum, item) => {
      const price = item.product?.price?.org || 0;
      return sum + price * item.quantity;
    }, 0) || 0;

  const shippingCost = subtotal > 50 ? 0 : 7.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  return (
    <>
      <div className="min-h-screen">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Shopping Cart
            </h1>
            <p className="text-gray-600">
              Review your items and proceed to checkout
            </p>
          </div>

          {cartItems && cartItems.length === 0 ? (
            <div className="text-center py-16">
              <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                Your cart is empty
              </h2>
              <p className="text-gray-500 mb-6">
                Add some medicines to get started
              </p>
              <Link
                to="/products"
                className="inline-flex items-center px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
              >
                Continue Shopping
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Side - Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-2xl shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-800 mb-6">
                    Cart Items ({cartItems ? cartItems.length : 0})
                  </h2>

                  <div className="space-y-4">
                    {cartItems.map((item) => (
                      <CartItem
                        key={item.product._id}
                        item={item}
                        onUpdateQuantity={addItemToCart}
                        onRemove={removeItemFromCart}
                      />
                    ))}
                  </div>

                  {/* Cart Summary */}
                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <div className="space-y-3">
                      <div className="flex justify-between text-gray-600">
                        <span>Subtotal</span>
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
                <ShippingForm total={total} />
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
