import { Redirect, SplashScreen, Stack } from "expo-router";
import { useFonts } from "expo-font";
import "../assets/global.css";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Toast from "react-native-toast-message";
import { TabHeader } from "@/components/TabHeader";
import { SafeAreaView } from "react-native-safe-area-context";
import { SingleHeader } from "@/components/SingleHeader";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useAuth } from "@/hooks/useAuth";

SplashScreen.preventAutoHideAsync();
SystemUI.setBackgroundColorAsync("#0B0C10");

const queryClient = new QueryClient();

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
    <SafeAreaView className="flex-1 bg-black">
      <QueryClientProvider client={queryClient}>
        <Stack
          screenOptions={{
            contentStyle: { backgroundColor: "#0B0C10" },
            header: () => <TabHeader />,
          }}
        >
          <Stack.Screen name="index" options={{ header: () => null }} />
          <Stack.Screen name="(auth)" options={{ header: () => null }} />
          <Stack.Screen name="(tabs)" options={{ header: () => null }} />
          <Stack.Screen
            name="auction/[id]"
            options={{ header: () => <SingleHeader title="Лот" /> }}
          />
          <Stack.Screen
            name="chat/[id]"
            options={{ header: () => <SingleHeader title="Чат" /> }}
          />
          <Stack.Screen
            name="settings/index"
            options={{ header: () => <SingleHeader title="Налаштування" /> }}
          />
          <Stack.Screen
            name="user/[id]"
            options={( { route } : any ) => ( {
              header: () => <SingleHeader title="Profile" id={route.params.id} />, 
            } )}
          />
          <Stack.Screen
            name="notifications/index"
            options={{ header: () => <SingleHeader title="Сповіщення" /> }}
          />
          <Stack.Screen
            name="change-password/index"
            options={{ header: () => <SingleHeader title="Пароль" /> }}
          />
          <Stack.Screen
            name="change-profile/index"
            options={{ header: () => <SingleHeader title="Особисті дані" /> }}
          />
          <Stack.Screen
            name="transactions/index"
            options={{ header: () => <SingleHeader title="Транзакції" /> }}
          />
          <Stack.Screen
            name="transactions/history"
            options={{ header: () => <SingleHeader title="Історія транзакцій" /> }}
          />
          <Stack.Screen
            name="transactions/operations"
            options={{ header: () => <SingleHeader title="Операції з коштами" /> }}
          />
        </Stack>
      </QueryClientProvider>
      <Toast />
    </SafeAreaView>
  );
}
