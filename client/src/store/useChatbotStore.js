import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useChatbotStore = create((set) => ({
  gettingResponse: false,

  getAiResponse: async (userMessage) => {
    try {
      set({ gettingResponse: true });
      const response = await axiosInstance.post("/searchChatProduct", {
        userMessage,
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ gettingResponse: false });
    }
  },

  searchProductByName: async (prodName) => {
    try {
      const response = await axiosInstance.get("/products/searchByName", {
        params: { prodName },
      });
      return response.data;
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
