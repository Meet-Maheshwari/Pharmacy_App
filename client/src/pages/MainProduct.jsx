import { useEffect, useState } from "react";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useProductStore } from "../store/useProductStore";
import Footer from "../components/Footer";
import ProductCarousel from "../components/ProductCarousel";
import { useAuthStore } from "../store/useAuthStore";
import { toast } from "react-toastify";

const MainProduct = () => {
  const [product, setProduct] = useState({});
  const { getProduct, addToCart } = useProductStore();
  const { userData } = useAuthStore();
  const location = useLocation();

  const navigate = useNavigate();
  const { id } = useParams();

  const fetchProduct = async () => {
    const response = await getProduct(id);
    setProduct(response);
  };

  const addItemToCart = async (productId) => {
    console.log("MainProduct", productId);
    await addToCart(productId);
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  return (
    <>
      <div className="min-h-screen min-w-screen-md p-8 bg-gradient-to-br from-green-50 to-white">
        <div className="flex flex-col bg-white rounded-2xl shadow-lg mx-10 w-xl border">
          <div className="flex flex-col md:flex-row md:justify-between gap-4 md:gap-8 p-4 md:p-8 lg:p-12">
            {/* Image Section */}
            <div className="w-full md:w-2/5 flex justify-center items-center">
              <img
                src={product.image}
                className="max-w-full h-auto max-h-80 md:max-h-50 object-contain rounded-md"
                alt={product.prodTitle}
              />
            </div>

            {/* Product Details & Main Actions Section */}
            <div className="w-full md:w-3/5 lg:w-2/5 flex flex-col gap-4">
              <div>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-800">
                  {product.prodTitle}
                </h2>
                <p className="text-lg lg:text-xl text-green-600">
                  {product.brand}
                </p>
                <p className="text-lg md:text-xl mt-2">
                  <span className="text-gray-800 font-bold">
                    Rs {product?.price?.org}
                  </span>
                  {product?.price?.mrp && (
                    <span className="line-through text-gray-500 ml-2 text-sm md:text-base">
                      Rs {product?.price?.mrp}
                    </span>
                  )}
                  {product?.price?.off && (
                    <span className="ml-3 text-sm font-semibold bg-green-100 text-green-700 px-2 py-1 rounded-md">
                      {product?.price?.off}% OFF
                    </span>
                  )}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-4">
                <button
                  className="h-11 px-6 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors w-full sm:w-auto text-sm font-medium"
                  onClick={() => {
                    if (!userData) {
                      toast.error("Please Login to Buy product");
                      navigate("/login", {
                        state: { from: location },
                        replace: true,
                      });
                      return;
                    }
                    if (product._id) navigate(`/orders/${product._id}`);
                  }}
                >
                  Buy Now
                </button>
                <button
                  onClick={() => {
                    if (!userData) {
                      toast.error("Please Login to add product to cart");
                      navigate("/login", {
                        state: { from: location },
                        replace: true,
                      });
                      return;
                    }
                    if (product._id) addItemToCart(product._id);
                  }}
                  className="h-11 px-6 bg-slate-700 text-white rounded-md hover:bg-slate-800 transition-colors w-full sm:w-auto text-sm font-medium"
                >
                  Add to Cart
                </button>
              </div>
            </div>

            {/* Side Panel: Prompt, Alt Add to Cart, Offers Section */}
            <div className="w-full lg:w-1/5 p-4 md:p-0 mt-6 md:mt-0 bg-gray-50 rounded-lg md:bg-transparent md:rounded-none">
              <div className="flex flex-col items-center md:items-start">
                <h3 className="text-base md:text-lg text-gray-600 text-center md:text-left">
                  Ready to order?
                </h3>
                <button
                  className="h-10 px-4 mt-2 border rounded-md bg-green-500 hover:bg-green-600 text-white w-full max-w-xs text-sm font-medium"
                  onClick={() => {
                    if (!userData) {
                      toast.error("Please Login to add product to cart");
                      navigate("/login", {
                        state: { from: location },
                        replace: true,
                      });
                      return;
                    }
                    if (product._id) addItemToCart(product._id);
                  }}
                >
                  Add to Cart
                </button>
              </div>

              <div className="flex flex-col gap-3 mt-6 border-t md:border rounded-b-lg md:rounded-lg border-slate-200 md:border-slate-300 p-4 md:shadow-sm md:bg-white">
                <h3 className="text-md font-semibold text-gray-700 mb-1">
                  🎁 Offers Just for You
                </h3>
                {[
                  "No Cost EMI on orders above ₹7,000",
                  "Flat ₹150 off on first-time app purchases",
                  "Extra 5% off with selected bank cards",
                  "Free delivery on all orders above ₹499",
                ].map((offer, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-2 text-xs text-gray-600"
                  >
                    <span className="text-green-500 mt-0.5">✔</span>
                    <p>{offer}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <ProductCarousel prefix="Similar" category={product.category} />
          <div className="pl-20 pb-2">
            {product?.desc ? (
              <div className="flex flex-col my-4">
                <h2 className="text-base font-bold">Product Description</h2>
                <p>{product.desc}</p>
              </div>
            ) : null}

            <div className="flex flex-col my-4">
              <h2 className="text-base font-bold">Product Details</h2>
              <p>
                Brand: <span>{product.brand}</span>
              </p>
              <p>
                Expired on or after:{" "}
                <span>
                  {new Date(product.expiry).toLocaleDateString("en-GB")}
                </span>
              </p>
              <p>
                Country of Origin: <span>India</span>
              </p>
            </div>

            {product.direction ? (
              <div className="flex flex-col my-2">
                <h2 className="text-base font-bold">Directions to use</h2>
                <p>{product.direction}</p>{" "}
              </div>
            ) : null}

            {product.benefits && product.benefits.length > 0 ? (
              <div className="flex flex-col my-2">
                <h2 className="text-base font-bold">Benefits</h2>
                {product.benefits.map((benefit, index) => (
                  <p key={index}>{benefit}</p>
                ))}
              </div>
            ) : null}

            {product.ingredients && product.ingredients.length > 0 ? (
              <div className="flex flex-col my-2">
                <h2 className="text-base font-bold">Ingredients</h2>
                {product.ingredients.map((ingredient, index) => (
                  <p key={index}>{ingredient}</p>
                ))}
              </div>
            ) : null}

            {product.uses && product.uses.length > 0 ? (
              <div className="flex flex-col my-2">
                <h2 className="text-base font-bold">Uses</h2>
                {product.uses.map((use, index) => (
                  <p key={index}>{use}</p>
                ))}
              </div>
            ) : null}

            {product.sideEffects && product.sideEffects.length > 0 ? (
              <div className="flex flex-col my-2">
                <h2 className="text-base font-bold">Side Effects</h2>
                {product.sideEffects.map((effect, index) => (
                  <p key={index}>{effect}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default MainProduct;
