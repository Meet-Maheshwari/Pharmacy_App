import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mypharma-eight.vercel.app",
  withCredentials: true,
});
