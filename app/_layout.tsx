import { SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../assets/global.css";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Toast from "react-native-toast-message";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#0B0C10");

export default function RootLayout() {
  const loadUser = useAuthStore((state) => state.loadUser);

  useEffect(() => {
    loadUser();
  }, []);

  const [fontsLoaded, error] = useFonts({
    "OpenSans-Regular": require("../assets/fonts/OpenSans-Regular.ttf"),
    "OpenSans-Medium": require("../assets/fonts/OpenSans-Medium.ttf"),
    "OpenSans-SemiBold": require("../assets/fonts/OpenSans-SemiBold.ttf"),
    "OpenSans-Light": require("../assets/fonts/OpenSans-Light.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
    if (fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) return null;

  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#0B0C10" },
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
      <Toast />
    </>
  );
}
