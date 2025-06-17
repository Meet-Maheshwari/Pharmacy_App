import { toast } from "react-toastify";
import { axiosInstance } from "../lib/axios";
import { create } from "zustand";

export const useOrderStore = create((set) => ({
  orders: [],

  getOrders: async () => {
    try {
      const response = await axiosInstance.get("/orders");
      set({ orders: response.data });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },

  deleteOrder: async (id) => {
    try {
      const response = await axiosInstance.delete(`/orders/order/${id}`);
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
