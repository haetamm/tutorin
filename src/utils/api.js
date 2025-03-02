import axios from "axios";
import Cookies from "js-cookie";
import { urlPage } from "./constans";

const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

const axiosInstance = axios.create({
  baseURL: `${apiBaseUrl}`,
  maxRedirects: 0,
});

axiosInstance.interceptors.request.use((config) => {
  const token = Cookies.get("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const { response } = error;
    if (response.status === 401) {
      const token = Cookies.get("token");
      if (token) {
        window.location.assign(urlPage.LOGIN);
      }
      Cookies.remove("token");
    }

    throw error;
  }
);

export default axiosInstance;
