import { axiosInstance } from "../lib/axios";
import { create } from "zustand";
import { toast } from "react-toastify";

export const useProductStore = create((set) => ({
  searchingProducts: true,
  gettingCartItems: false,
  cartItems: [],
  placingOrder: false,

  searchProducts: async (queryString = "") => {
    set({ searchingProducts: true });
    try {
      const response = await axiosInstance.get(
        `/products/search?${queryString}`
      );
      set({ searchingProducts: false });
      return response.data;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    } finally {
      set({ searchingProducts: false });
    }
  },

  getProduct: async (id) => {
    try {
      const response = await axiosInstance.get(`/products/${id}`);
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  getCartItems: async () => {
    try {
      set({ gettingCartItems: true });
      const response = await axiosInstance.get("/products/cart");

      set({ cartItems: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ gettingCartItems: false });
    }
  },

  addToCart: async (productId) => {
    try {
      const response = await axiosInstance.post("/products/addToCart", {
        productId,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  removeFromCart: async (productId) => {
    try {
      const response = await axiosInstance.post("/products/removeFromCart", {
        productId,
      });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  placeOrder: async (formData, total) => {
    try {
      set({ placingOrder: true });
      const response = await axiosInstance.post("/products/placeOrder", {
        formData,
        total,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ placingOrder: false });
    }
  },

  placeDirectOrder: async (formData, product, quantity, total) => {
    try {
      set({ placingOrder: true });
      const response = await axiosInstance.post("/products/placeDirectOrder", {
        formData,
        product,
        quantity,
        total,
      });

      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ placingOrder: false });
    }
  },
}));
