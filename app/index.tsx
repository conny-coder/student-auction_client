import { Redirect, router } from "expo-router";
import { ScrollView, View } from "react-native";
import "../assets/global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/ui/StyledButton";
import { useAuth } from "@/hooks/useAuth";

const App = () => {
  const user = useAuth();

  if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full w-full items-center justify-center px-4">
          <StyledButton
            size="big"
            color="blue"
            handlePress={() => router.push("/sign-up")}
          >
            Sign up
          </StyledButton>
          <StyledButton
            size="small"
            handlePress={() => router.push("/sign-in")}
          >
            Sign in
          </StyledButton>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0B0C10" style="light" />
    </SafeAreaView>
  );
};
export default App;
