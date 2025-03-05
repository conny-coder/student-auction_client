import { getContentType } from "@/api/api.helpers";
import { axiosClassic } from "@/api/interceptors";
import { getAuthUrl } from "@/config/api.config";
import { IAuthResponse } from "@/types/auth.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { removeTokensStorage, saveToStorage } from "./auth.helper";

export const AuthService = {
  async register(
    email: string,
    password: string,
    userName: string,
    name: string
  ) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/register"),
      { email, password, userName, name }
    );
    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },

  async login(email: string, password: string) {
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/login"),
      { email, password }
    );
    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },

  async logout() {
    await AsyncStorage.removeItem("user");
    removeTokensStorage();
  },

  async getNewTokens() {
    const refreshToken = AsyncStorage.getItem("refreshToken");
    const response = await axiosClassic.post<IAuthResponse>(
      getAuthUrl("/login/access-token"),
      { refreshToken },
      { headers: getContentType() }
    );

    if (response.data.accessToken) saveToStorage(response.data);

    return response;
  },
};
