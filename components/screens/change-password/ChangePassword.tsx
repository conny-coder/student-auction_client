import LabeledInput from "@/components/ui/LabeledInput"
import StyledButton from "@/components/ui/StyledButton"
import { Controller, useForm } from "react-hook-form"
import { View } from "react-native"
import { useChangePassword } from "./useChangePassword"
import PasswordInput from "./PasswordInput"

interface IPasswordForm {
  oldPassword: string
  password: string
}

const ChangePassword = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<IPasswordForm>({
    defaultValues: {
      oldPassword: "",
      password: ""
    }
  })

  const { mutate: onChangePassword } = useChangePassword();

  const onSubmit = (data: IPasswordForm) => {
    onChangePassword(data);
    reset();
  }

  return (
    <View className="px-4 pt-2">
      <Controller
        control={control}
        name="oldPassword"
        rules={{ required: "Поле є обов'язковим" }}
        render={({ field: { onChange, onBlur, value } }) => (
          <PasswordInput
            // className="mb-2"
            label="Введіть поточний пароль"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.oldPassword?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        rules={{
          required: "Поле є обов'язковим",
          minLength: { value: 6, message: "Пароль має бути не менше 6 символів" }
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <PasswordInput
            className="mb-4"
            label="Введіть новий пароль"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.password?.message}
          />
        )}
      />

      <StyledButton
        handlePress={handleSubmit(onSubmit)}
        color="blue"
      >
        Підтвердити
      </StyledButton>
    </View>
  )
}
export default ChangePassword