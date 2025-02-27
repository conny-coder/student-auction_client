import { Link, router } from "expo-router";
import { Image, ScrollView, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import StyledText from "@/components/ui/StyledText";
import StyledInput from "@/components/ui/StyledInput";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/ui/StyledButton";

const SignIn = () => {
  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView contentContainerStyle={{ height: "100%" }}>
        <View className="h-full w-full items-center justify-center px-4">
          <Image
            className="w-[220px] h-[80px]"
            resizeMode="contain"
            source={require("@/assets/images/big-logo.png")}
          />
          <View className="mt-10 mb-12">
            <StyledText className="mb-[3px] text-center text-xl">
              Увійти в аккаунт
            </StyledText>
            <StyledText className="text-gray-50p text-center">
              Авторизуйтесь, щоб знайти нові аукціони!
            </StyledText>
          </View>
          <View className="w-[320px]">
            <StyledInput placeholder="Email" />
            <StyledInput placeholder="Пароль" className="mb-5" />
            <StyledButton
              handlePress={() => {
                router.push("/home");
              }}
            >
              Увійти в аккаунт
            </StyledButton>
            <View
              style={{ flexDirection: "row", gap: 3 }}
              className="justify-center"
            >
              <StyledText className="text-gray-50p">
                Ще не маєш аккаунт?
              </StyledText>
              <Link href="/sign-up" className="text-green font-opensregular">
                Зареєструватися
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0B0C10" style="light" />
    </SafeAreaView>
  );
};
export default SignIn;
