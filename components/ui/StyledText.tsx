import { FC } from "react";
import { Text } from "react-native";
import { TextProps } from "react-native/Libraries/Text/Text";

interface StyledTextProps extends TextProps {
  children: React.ReactNode;
  className?: string;
  color?: string;
}

const StyledText: FC<StyledTextProps> = ({
  children,
  className = "",
  color,
  ...rest
}) => {
  return (
    <Text {...rest} className={`font-opensregular ${color || "text-primary"}  ${className}`}>
      {children}
    </Text>
  );
};

export default StyledText;
