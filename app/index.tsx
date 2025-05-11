import { Redirect, router } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import "../assets/global.css";
import { StatusBar } from "expo-status-bar";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/ui/StyledButton";
import { useAuth } from "@/hooks/useAuth";
import StyledText from "@/components/ui/StyledText";

const App = () => {
  const user = useAuth();

  if (user) {
    return <Redirect href="/home" />;
  }

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View className="h-full w-full items-center justify-center px-4 gap-2">
          <Image
            source={require("@/assets/images/big-logo.png")}
            className="mb-6"
            resizeMode="cover"
          />

          <StyledText className="text-white text-xl font-openssemibold text-center mb-2">
            Ласкаво просимо
          </StyledText>

          <StyledText className="text-gray-70p text-lg text-center mb-4">
            Аукціони для студентів. Ставки, виграші, перемоги!
          </StyledText>

          <StyledButton
            size="big"
            color="blue"
            handlePress={() => router.push("/sign-up")}
          >
            Продовжити
          </StyledButton>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0B0C10" style="dark" />
    </SafeAreaView>
  );
};

export default App;
