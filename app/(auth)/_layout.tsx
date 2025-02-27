import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";

const AuthLayout = () => {
  return (
    <>
      <Stack
        screenOptions={{
          contentStyle: { backgroundColor: "#0B0C10" },
        }}
      >
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#0B0C10" style="light" />
    </>
  );
};
export default AuthLayout;
