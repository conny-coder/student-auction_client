import { FC } from "react";
import { Text } from "react-native";

interface StyledTextProps {
  children: React.ReactNode;
  className?: string;
}

const StyledText: FC<StyledTextProps> = ({ children, className = "" }) => {
  return (
    <Text className={`font-opensregular text-primary ${className}`}>
      {children}
    </Text>
  );
};

export default StyledText;
