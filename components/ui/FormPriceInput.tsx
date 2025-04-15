import { FC } from "react";
import { TextInput, TextInputProps, View } from "react-native";
import CurrencyIcon from "../icons/CurrencyIcon";

interface FormInputInputProps extends TextInputProps {
  className?: string;
}

const FormPriceInput: FC<FormInputInputProps> = ({
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
      <View className="absolute" style={{ top: 15, right: 10 }} >
        <CurrencyIcon />
      </View>
    </View>
  );
};

export default FormPriceInput;
