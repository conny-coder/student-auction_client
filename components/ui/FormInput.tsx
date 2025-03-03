import { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

interface FormInputInputProps extends TextInputProps {
  placeholder: string;
  className?: string;
}

const FormInput: FC<FormInputInputProps> = ({
  className,
  placeholder,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      placeholder={placeholder}
      className={`text-primary placeholder:text-gray-70p w-full px-5 py-4 border border-gray-30p border-solid rounded-xl mb-4 ${className}`}
    />
  );
};

export default FormInput;
