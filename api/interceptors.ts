import { removeTokensStorage } from "@/services/auth/auth.helper";
import { AuthService } from "@/services/auth/auth.service";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { errorCatch, getContentType } from "./api.helpers";
import { API_SERVER_URL } from "@/config/api.config";

export const axiosClassic = axios.create({
  baseURL: API_SERVER_URL + "/api",
  headers: getContentType(),
});

export const instance = axios.create({
  baseURL: API_SERVER_URL + "/api",
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
  (resp) => resp,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;    

    if (
      (status === 401 ||
        errorCatch(error) === 'jwt expired' ||
        errorCatch(error) === 'jwt must be provided') &&
      originalRequest &&
      !originalRequest._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        await AuthService.getNewTokens();
        return instance.request(originalRequest);
      } catch (e) {
        if (errorCatch(e) === 'jwt expired') {
          removeTokensStorage();
        }
      }
    }

    throw error;
  }
);

export default instance;
