import { Link } from "expo-router";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import StyledText from "@/components/ui/StyledText";
import StyledInput from "@/components/ui/StyledInput";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/ui/StyledButton";

const SignUp = () => {
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
              Створіть безкоштовний аккаунт
            </StyledText>
            <StyledText className="text-gray-50p text-center">
              Перший крок до вигідних угод!
            </StyledText>
          </View>
          <View className="w-[320px]">
            <StyledInput placeholder="Ім’я користувача (username)" />
            <StyledInput placeholder="Ім’я та прізвище" />
            <StyledInput placeholder="Email" />
            <StyledInput placeholder="Пароль" className="mb-5" />
            <StyledButton handlePress={() => {}}>Створити аккаунт</StyledButton>
            <View
              style={{ flexDirection: "row", gap: 3 }}
              className="justify-center"
            >
              <StyledText className="text-gray-50p">
                Вже маєш аккаунт?
              </StyledText>
              <Link href="/sign-in" className="text-green font-opensregular">
                Увійти
              </Link>
            </View>
          </View>
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0B0C10" style="light" />
    </SafeAreaView>
  );
};
export default SignUp;
