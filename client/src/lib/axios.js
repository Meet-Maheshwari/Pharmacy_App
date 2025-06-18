import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://mypharma-95mth5dt1-meet-maheshwaris-projects.vercel.app/",
  withCredentials: true,
});
