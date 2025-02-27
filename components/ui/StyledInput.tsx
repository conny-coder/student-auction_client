import { FC } from "react";
import { TextInput } from "react-native";

interface StyledInputProps {
  placeholder: string;
  className?: string;
}

const StyledInput: FC<StyledInputProps> = ({ className, placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      className={`text-gray-70p placeholder:text-gray-70p w-full px-5 py-4 border border-gray-30p border-solid rounded-xl mb-4 ${className}`}
    />
  );
};

export default StyledInput;
