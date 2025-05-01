import ChangePictureIcon from "@/components/icons/ChangePictureIcon"
import Loader from "@/components/loaders/Loader"
import ImageInput from "@/components/ui/ImageInput"
import LabeledInput from "@/components/ui/LabeledInput"
import StyledButton from "@/components/ui/StyledButton"
import StyledText from "@/components/ui/StyledText"
import { API_SERVER_URL } from "@/config/api.config"
import { useEffect } from "react"
import { Controller, useForm } from "react-hook-form"
import { Image, ScrollView, View } from "react-native"
import { useChangeProfile } from "./useChangeProfile"

export interface IProfileForm {
  avatar: string
  name: string
  email: string
  userName: string
}

const ChangeProfile = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
    watch
  } = useForm<IProfileForm>({
    defaultValues: {
      avatar: '',
      name: '',
      email: '',
      userName: ''
    }
  })

  const {data, isLoading, mutate} = useChangeProfile()

  useEffect( () =>
  {
    if ( data )
    {
      reset( {
        avatar: data.avatar,
        name: data.name,
        email: data.email,
        userName: data.userName,
      } )
    }
  }, [data, reset] )

  if( isLoading ) 
    return <Loader />

  const onSubmit = (data: IProfileForm) => {
    mutate(data);
  }

  const currentAvatar = watch('avatar')

  return (
    <ScrollView className="px-4 pt-2">
      <View className="mb-4">
        <StyledText className="text-lg pl-2 mb-1">Аватар</StyledText>

        <View className="w-36">
          <Image
            source={{ uri: `${API_SERVER_URL}${currentAvatar}` }}
            className="w-36 h-36 rounded-full mb-2"
          />

          <View style={{ position: 'absolute', top: 0, right: 5 }}>
            <Controller
              control={control}
              name="avatar"
              render={( { field: { onChange } } ) => (
                <ImageInput ImagePicture={ChangePictureIcon} onSelect={onChange} />
              )}
            />
          </View>
        </View>
      </View>

      <Controller
        control={control}
        name="name"
        rules={{ required: "Поле є обов'язковим" }}
        render={( { field: { onChange, onBlur, value } } ) => (
          <LabeledInput
            // className="mb-2"
            label="Ім’я та прізвище"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="userName"
        rules={{ required: "Поле є обов'язковим" }}
        render={( { field: { onChange, onBlur, value } } ) => (
          <LabeledInput
            // className="mb-2"
            label="Ім’я користувача"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.userName?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="email"
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
        render={( { field: { onChange, onBlur, value } } ) => (
          <LabeledInput
            // className="mb-2"
            label="Email"
            value={value}
            onBlur={onBlur}
            onChangeText={onChange}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <StyledButton
        handlePress={handleSubmit( onSubmit )}
        color="blue"
        disabled={!isDirty}       
        className={!isDirty ? "opacity-50" : ""}
        style={{ marginBottom: 20 }}
      >
        Підтвердити
      </StyledButton>
    </ScrollView>
  )
}
export default ChangeProfile