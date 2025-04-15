import { FC } from "react";
import { TextInput, TextInputProps } from "react-native";

interface FormInputInputProps extends TextInputProps {
  placeholder: string;
  className?: string;
}

const FormTextarea: FC<FormInputInputProps> = ({
  className,
  placeholder,
  ...props
}) => {
  return (
    <TextInput
      {...props}
      style={{ height: 180 }}
      textAlignVertical="top"
      underlineColorAndroid="transparent"
      numberOfLines={10}
      multiline={true}
      placeholder={placeholder}
      className={`text-primary placeholder:text-gray-70p w-full px-5 py-4 border border-gray-30p border-solid rounded-xl mb-4 ${className}`}
    />
  );
};

export default FormTextarea;
