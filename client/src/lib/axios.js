import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://pharmacy-app-lovat.vercel.app",
  withCredentials: true,
});
