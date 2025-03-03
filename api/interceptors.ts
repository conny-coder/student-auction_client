import axios from "axios";
import { getContentType } from "./api.helpers";
// import { API_SERVER_URL, API_URL } from "config/api.config";
// import { IS_PRODUCTION } from "config/constants";
// import Cookies from "js-cookie";

// import { removeTokensStorage } from "@/services/auth/auth.helper";
// import { AuthService } from "@/services/auth/auth.service";

// import { errorCatch, getContentType } from "./api.helpers";

export const axiosClassic = axios.create({
  baseURL: "https://student-auction-server.onrender.com/api",
  headers: getContentType(),
});

export const instance = axios.create({
  baseURL: "http://localhost:4200/api",
  headers: getContentType(),
});

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("Помилка запиту:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// instance.interceptors.request.use((config) => {
//   const accessToken = Cookies.get("accessToken");

//   if (config.headers && accessToken) {
//     config.headers.Authorization = `Bearer ${accessToken}`;
//   }

//   return config;
// });

// instance.interceptors.response.use(
//   (config) => config,
//   async (error) => {
//     const originalRequest = error.config;

//     if (
//       (error.response.status === 401 ||
//         errorCatch(error) === "jwt expired" ||
//         errorCatch(error) === "jwt must be provided") &&
//       error.config &&
//       !error.config._isRetry
//     ) {
//       originalRequest._isRetry = true;
//       try {
//         await AuthService.getNewTokens();
//         return instance.request(originalRequest);
//       } catch (error) {
//         if (errorCatch(error) === "jwt expired") removeTokensStorage();
//       }
//     }
//     throw error;
//   }
// );

export default instance;
