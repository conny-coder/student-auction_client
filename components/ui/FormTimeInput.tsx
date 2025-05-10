import { FC } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import StyledText from "./StyledText";

interface FormInputInputProps extends TextInputProps {
  className?: string;
}

const FormTimeInput: FC<FormInputInputProps> = ({
  className,
  placeholder,
  ...props
} ) =>
{
  return (
    <View className="ml-auto relative w-32">
      <TextInput
        {...props}
        keyboardType="numeric"
        className={`text-primary placeholder:text-gray-70p w-full px-4 py-3 border border-gray-30p border-solid rounded-xl ${className}`}
      />
      <View className="absolute" style={{ top: 10, right: 10 }} >
        <StyledText color="text-gray-70p">год</StyledText>
      </View>
    </View>

  );
};

export default FormTimeInput;
