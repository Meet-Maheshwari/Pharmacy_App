import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import { toast } from "react-toastify";

export const useAuthStore = create((set) => ({
  userData: null,
  isLoggingIn: false,
  isSigningUp: false,

  isCheckingAuth: true,
  baseURL: import.meta.env.VITE_BASE_URL,

  checkAuth: async () => {
    try {
      const response = await axiosInstance.get("/auth");
      set({ userData: response.data });
    } catch (error) {
      set({ userData: null });
      console.log("Error in checkAuth", error.response.data.message);
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signUp: async (data) => {
    try {
      set({ isSigningUp: true });
      const response = await axiosInstance.post("/auth/signup", data);

      console.log(response.data);
      set({ userData: response.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    try {
      set({ isLoggingIn: true });
      const response = await axiosInstance.post("/auth/login", data);
      set({ userData: response.data });
      toast.success("Welcome back to Pharmacy App!");
      return response;
    } catch (error) {
      set({ userData: null });
      throw error;
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logout: async () => {
    try {
      const response = await axiosInstance.post("/auth/logout");
      set({ userData: null });
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  },
}));
