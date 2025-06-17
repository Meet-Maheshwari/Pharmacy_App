import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";

const ProductCarousel = ({ prefix, category }) => {
  const [products, setProducts] = useState([]);
  const { baseURL } = useAuthStore();
  const scrollRef = useRef(null);

  async function getProducts() {
    axios.defaults.withCredentials = true;
    const response = await axios.get(
      baseURL + `/products/category/${category}`
    );
    setProducts(response.data);
  }

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: -300,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: 300,
        behavior: "smooth",
      });
    }
  };

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, [category]);

  return (
    <div className="my-12 mx-4">
      <div className="flex justify-between px-8 my-2">
        <h1 className="text-2xl text-left font-bold">
          {prefix} {category}
        </h1>
        <button
          className="h-8 w-24 border-green-500 bg-green-400 rounded-md text-white"
          onClick={() => {
            navigate(`/products?category=${encodeURIComponent(category)}`);
          }}
        >
          View more
        </button>
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-green-100 rounded-full p-2 shadow"
        >
          <ChevronLeft />
        </button>
        <button
          onClick={scrollRight}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white hover:bg-green-100 rounded-full p-2 shadow"
        >
          <ChevronRight />
        </button>

        <div
          ref={scrollRef}
          className="flex p-4 gap-2 overflow-x-auto whitespace-nowrap scroll-smooth no-scrollbar"
        >
          {products.map((product) => (
            <div
              className="h-80 mx-8 hover:shadow-green transition-shadow px-4"
              key={product._id}
            >
              <div>
                <img
                  src={product.image}
                  className="h-52 max-w-52 rounded-sm mb-2"
                />
                <div className="flex flex-col flex-wrap max-w-52 truncate">
                  <p>{product.prodTitle}</p>
                  <p>
                    <span className=" text-green-400 font-semibold">
                      &#8377;{product?.price?.org}
                    </span>{" "}
                    &nbsp;
                    <span className="line-through">
                      MRP &#8377;{product?.price?.mrp}
                    </span>
                  </p>
                </div>
              </div>
              <div>
                <button
                  onClick={() => {
                    navigate(`/products/${product._id}`);
                  }}
                  className="h-7 px-2 border-green-500 bg-green-400 rounded-md text-white"
                >
                  View
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductCarousel;
