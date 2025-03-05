import { Link } from "expo-router";
import { Image, ScrollView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import StyledText from "@/components/ui/StyledText";
import FormInput from "@/components/ui/FormInput";
import { SafeAreaView } from "react-native-safe-area-context";
import StyledButton from "@/components/ui/StyledButton";
import { useAuthStore } from "@/store/useAuthStore";
import { Controller, useForm } from "react-hook-form";
import Loader from "@/components/Loader";

interface ISignIn {
  email: string;
  password: string;
}

const SignIn = () => {
  const { login } = useAuthStore();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<ISignIn>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: ISignIn) => {
    login(data.email, data.password);
  };

  return (
    <SafeAreaView className="bg-black h-full">
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ height: "100%" }}
      >
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
            <View>
              <Controller
                control={control}
                rules={{
                  required: {
                    value: true,
                    message: "Поле обов'язкове",
                  },
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Введено некоректний email",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    placeholder="Email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="email"
              />
              {errors.email && (
                <Text className="absolute top-[2px] right-2 text-[10px] text-red font-openslight">
                  {errors.email.message}
                </Text>
              )}
            </View>

            <View>
              <Controller
                control={control}
                rules={{
                  required: "Поле обов'язкове",
                  minLength: {
                    value: 6,
                    message: "Пароль має бути не менше 6 символів",
                  },
                }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <FormInput
                    placeholder="Пароль"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
                name="password"
              />
              {errors.password && (
                <Text className="absolute top-[2px] right-2 text-[10px] text-red font-openslight">
                  {errors.password.message}
                </Text>
              )}
            </View>

            <StyledButton className="mt-3" handlePress={handleSubmit(onSubmit)}>
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
          <Loader />
        </View>
      </ScrollView>

      <StatusBar backgroundColor="#0B0C10" style="light" />
    </SafeAreaView>
  );
};
export default SignIn;
