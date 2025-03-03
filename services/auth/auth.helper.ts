import AsyncStorage from "@react-native-async-storage/async-storage";
import { IAuthResponse, ITokens } from "@/types/auth.types";

export const saveTokensStorage = async (data: ITokens) => {
  await AsyncStorage.setItem("accessToken", data.accessToken);
  await AsyncStorage.setItem("refreshToken", data.refreshToken);
};

export const saveToStorage = async (data: IAuthResponse) => {
  await saveTokensStorage(data);
  await AsyncStorage.setItem("user", JSON.stringify(data.user));
};

export const removeTokensStorage = async () => {
  await AsyncStorage.removeItem("accessToken");
  await AsyncStorage.removeItem("refreshToken");
};
