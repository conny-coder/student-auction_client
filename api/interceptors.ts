import { removeTokensStorage } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { errorCatch, getContentType } from "./api.helpers";

export const axiosClassic = axios.create({
  baseURL: "https://student-auction-server.onrender.com/api",
  headers: getContentType(),
});

export const instance = axios.create({
  baseURL: "https://student-auction-server.onrender.com/api",
  headers: getContentType(),
});

instance.interceptors.request.use(async (config) => {
  const accessToken = await AsyncStorage.getItem("accessToken");

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.response.use(
  (config) => config,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (error) {
        if (errorCatch(error) === "jwt expired") removeTokensStorage();
      }
    }
    throw error;
  }
);

export default instance;
