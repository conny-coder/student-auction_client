import EyeCloseIcon from "@/components/icons/EyeCloseIcon"
import EyeOpenIcon from "@/components/icons/EyeOpenIcon"
import LabeledInput, { LabeledInputProps } from "@/components/ui/LabeledInput"
import { FC, useState } from "react"
import { Pressable, View } from "react-native"

const PasswordInput: FC<LabeledInputProps> = ( { label, value, className, errorMessage, ...props } ) => {
  const [showPassword, setShowPassword] = useState(true)

  return (
    <View>
      <LabeledInput {...props} secureTextEntry={showPassword} label={label} value={value} className={className} style={{paddingRight: 40}} errorMessage={errorMessage} />
      <View className="absolute right-4" style={{ top: 45 }}>
        {showPassword
          ? <Pressable onPress={() => setShowPassword( false )} ><EyeCloseIcon /></Pressable>
          : <Pressable onPress={() => setShowPassword( true )} ><EyeOpenIcon /></Pressable>
        }
      </View>
    </View>
  )
}
export default PasswordInput