import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mypharma-backend-sigma.vercel.app",
  withCredentials: true,
});
