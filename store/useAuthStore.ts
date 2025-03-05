import { AuthService } from "@/services/auth/auth.service";
import { IUser } from "@/types/user.types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import Toast from "react-native-toast-message";
import { errorCatch } from "@/api/api.helpers";

interface IAuthState {
  user: IUser | null;
  isLoading: boolean;
  register: (
    email: string,
    password: string,
    userName: string,
    name: string
  ) => void;
  login: (email: string, password: string) => void;
  logout: () => void;
  loadUser: () => void;
}

export const useAuthStore = create<IAuthState>((set) => ({
  user: null,
  isLoading: false,

  register: async (
    email: string,
    password: string,
    userName: string,
    name: string
  ) => {
    try {
      set({ isLoading: false });

      const res = await AuthService.register(email, password, userName, name);
      Toast.show({
        type: "success",
        text1: "Реєстрація",
        text2: "Ви успішно зареєструвались",
      });
      set({ user: res.data.user });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Реєстрація",
        text2: errorCatch(error),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  login: async (email: string, password: string) => {
    try {
      set({ isLoading: true });

      const res = await AuthService.login(email, password);
      Toast.show({
        type: "success",
        text1: "Авторизація",
        text2: "Ви успішно авторизувались",
      });
      set({ user: res.data.user });
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Авторизація",
        text2: errorCatch(error),
      });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    await AuthService.logout();
    Toast.show({
      type: "info",
      text1: "Ви вийшли з аккаунту",
    });
    set({ user: null });
  },

  loadUser: async () => {
    const data = await AsyncStorage.getItem("user");

    if (data) {
      set({ user: JSON.parse(data) });
    }
  },
}));
