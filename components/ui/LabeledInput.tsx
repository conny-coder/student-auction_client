import { FC } from "react"
import { TextInput, View } from "react-native"
import StyledText from "./StyledText"

export interface LabeledInputProps {
  label: string
  value: string
  errorMessage?: string
  className?: string
  [key: string]: any
}

const LabeledInput:FC<LabeledInputProps> = ({label, className, value, errorMessage, ...props}) => {
  return (
    <View className={`${className}`} style={{paddingBottom: 20}}>
      <StyledText className="pl-2 mb-2">{label}</StyledText>
      <TextInput value={value} className="border border-gray-30p h-14 border-solid rounded-xl px-4 text-primary" {...props} />
      <StyledText className="text-red text-sm absolute right-0 bottom-0">{errorMessage}</StyledText>
    </View>
  )
}
export default LabeledInput