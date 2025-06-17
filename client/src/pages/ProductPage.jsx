import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useProductStore } from "../store/useProductStore";
import { Link, useNavigate } from "react-router-dom";
import { useSearchParams } from "react-router-dom";
import { ShoppingBag } from "lucide-react";

const ProductPage = () => {
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const initialCategory = searchParams.get("category") || "";
  const initialBrand = searchParams.get("brand") || "";
  const prodTitle = searchParams.get("prodTitle") || "";

  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState(initialCategory || "");
  const [minPrice, setMinPrice] = useState(10);
  const [maxPrice, setMaxPrice] = useState(3010);
  const [inStock, setInStock] = useState(false);
  const [selectedBrands, setSelectedBrands] = useState(
    initialBrand ? [initialBrand] : []
  );

  const { searchProducts } = useProductStore();
  const navigate = useNavigate();

  const fetchProducts = async () => {
    try {
      const params = new URLSearchParams();

      if (searchQuery) params.append("search", searchQuery);
      if (category) params.append("category", category);
      if (minPrice) params.append("minPrice", minPrice);
      if (maxPrice) params.append("maxPrice", maxPrice);
      if (inStock) params.append("inStock", inStock);
      if (selectedBrands.length > 0)
        params.append("brands", selectedBrands.join(","));
      if (prodTitle) params.append("prodTitle", prodTitle);

      const data = await searchProducts(params.toString());
      if (data.length == 0) {
        setProducts([]);
      } else {
        setProducts(data);
      }
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [
    category,
    minPrice,
    maxPrice,
    inStock,
    selectedBrands,
    prodTitle,
    searchQuery,
  ]);

  return (
    <>
      <div className="h-full px-8 my-4">
        <div className="flex">
          {!searchQuery ? (
            <div className="flex flex-col w-48 mr-5 h-full justify-center border rounded-md bg-slate-200 pl-3 pt-">
              <p className="text-2xl my-4 text-black  font-semibold text-center">
                Filters
              </p>

              <div>
                <button
                  onClick={() => {
                    setCategory("");
                    setMinPrice(10);
                    setMaxPrice(3010);
                    setInStock(false);
                    setSelectedBrands([]);
                  }}
                >
                  Clear all
                </button>
              </div>

              <div className="flex flex-col my-2">
                <h3 className="text-base font-bold">Categories</h3>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="All"
                    checked={category === ""}
                    className="form-radio text-green-500 focus:ring-green-400"
                    onChange={(e) => setCategory(e.target.value)}
                  />{" "}
                  All Categories
                </label>
                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Pain Relievers"
                    checked={category === "Pain Relievers"}
                    className="form-radio text-green-500 focus:ring-green-400"
                    onChange={(e) => setCategory(e.target.value)}
                  />{" "}
                  Pain Relievers
                </label>

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Skin Care"
                    checked={category === "Skin Care"}
                    className="form-radio text-green-500 focus:ring-green-400"
                    onChange={(e) => setCategory(e.target.value)}
                  />{" "}
                  Skin Care
                </label>

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Protein & Vitamins"
                    checked={category === "Protein & Vitamins"}
                    className="form-radio text-green-500 focus:ring-green-400"
                    onChange={(e) => setCategory(e.target.value)}
                  />{" "}
                  Protien & Vitamins
                </label>

                <label>
                  <input
                    type="radio"
                    name="category"
                    value="Allergy"
                    checked={category === "Allergy"}
                    className="form-radio text-green-500 focus:ring-green-400"
                    onChange={(e) => setCategory(e.target.value)}
                  />{" "}
                  Allergy
                </label>
              </div>

              <div className="my-2">
                <h3 className="text-base font-bold">Price Range</h3>
                <input
                  type="range"
                  min="10"
                  max="3010"
                  step="100"
                  value={maxPrice}
                  className="h-2 bg-black rounded-lg appearance-none cursor-pointer accent-green-500"
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                />
                <p className=" text-gray-700 mt-1">
                  Max Price: <span>{maxPrice}</span>
                </p>
              </div>

              <div className="my-2">
                <h3 className="text-base font-bold">Availability</h3>
                <label>
                  <input
                    type="checkbox"
                    checked={inStock}
                    className="form-checkbox text-green-600 focus:ring-green-400"
                    onChange={(e) => setInStock(e.target.checked)}
                  />{" "}
                  In Stock Only
                </label>
              </div>

              <div className="flex flex-col my-2">
                <h3 className="text-base font-bold">Popular Brands</h3>
                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="HealthPlus"
                    checked={selectedBrands.includes("HealthPlus")}
                    className="form-checkbox text-green-600 focus:ring-green-400"
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedBrands((prev) =>
                        prev.includes(value)
                          ? prev.filter((b) => b !== value)
                          : [...prev, value]
                      );
                    }}
                  />{" "}
                  HealthPlus
                </label>

                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="PureSkin"
                    checked={selectedBrands.includes("PureSkin")}
                    className="form-checkbox text-green-600 focus:ring-green-400"
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedBrands((prev) =>
                        prev.includes(value)
                          ? prev.filter((b) => b !== value)
                          : [...prev, value]
                      );
                    }}
                  />{" "}
                  PureSkin
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="Limcee"
                    checked={selectedBrands.includes("Limcee")}
                    className="form-checkbox text-green-600 focus:ring-green-400"
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedBrands((prev) =>
                        prev.includes(value)
                          ? prev.filter((b) => b !== value)
                          : [...prev, value]
                      );
                    }}
                  />{" "}
                  Limcee
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="ProBody"
                    checked={selectedBrands.includes("ProBody")}
                    className="form-checkbox text-green-600 focus:ring-green-400"
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedBrands((prev) =>
                        prev.includes(value)
                          ? prev.filter((b) => b !== value)
                          : [...prev, value]
                      );
                    }}
                  />{" "}
                  ProBody
                </label>
                <label>
                  <input
                    type="checkbox"
                    name="brand"
                    value="GreenFuel"
                    checked={selectedBrands.includes("GreenFuel")}
                    className="form-checkbox text-green-600 focus:ring-green-400"
                    onChange={(e) => {
                      const value = e.target.value;
                      setSelectedBrands((prev) =>
                        prev.includes(value)
                          ? prev.filter((b) => b !== value)
                          : [...prev, value]
                      );
                    }}
                  />{" "}
                  GreenFuel
                </label>
              </div>
            </div>
          ) : null}
          <div className="flex flex-col flex-1 h-full justify-center items-center bg-slate-200 border rounded-md">
            <h2 className="text-3xl font-bold text-center my-4">Products</h2>

            <div className="flex flex-wrap justify-center my-6">
              {products.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                    Cannot find any item matching your search.
                  </h2>
                  <p className="text-gray-500 mb-6">
                    Please search again or try a different filter.
                  </p>
                </div>
              ) : (
                products.map((product, idx) => (
                  <div
                    className="min-h-72 w-60 flex justify-center mx-8 px-2 rounded-md bg-slate-50 hover:shadow-blackSoft cursor-pointer mb-4"
                    key={idx}
                    onClick={() => {
                      navigate(`/products/${product._id}`);
                    }}
                  >
                    <div>
                      <img
                        src={product.image}
                        className="h-52 w-52 rounded-sm mb-2"
                        alt={product.prodTitle}
                      />
                      <div>
                        <p>{product.prodTitle}</p>
                        <p>
                          <span className="text-green-400 font-semibold">
                            RS {product?.price?.org}
                          </span>{" "}
                          &nbsp;
                          <span className="line-through">
                            MRP {product?.price?.mrp}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
