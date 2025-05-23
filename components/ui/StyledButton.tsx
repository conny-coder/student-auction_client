import { FC, PropsWithChildren } from "react";
import { TouchableOpacity } from "react-native";
import StyledText from "./StyledText";

interface StyledButtonProps {
  handlePress: () => void;
  className?: string;
  size?: "small" | "big";
  color?: "blue" | "green" | "gray" | "red";
  style? : any;
  [key: string]: any;
}

const colors = {
  blue: "bg-blue",
  green: "bg-green",
  gray: "bg-gray-30p",
  red: "bg-red",
};

const StyledButton: FC<PropsWithChildren<StyledButtonProps>> = ({
  className,
  handlePress,
  children,
  size = "big",
  color = "green",
  style,
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={style}
      className={`w-full ${size === "big" ? "py-[10px]" : "py-[6px]"} ${
        colors[color]
      } rounded-xl ${className}`}
      onPress={handlePress}
    >
      <StyledText
        className={`text-center ${size === "big" ? "text-lg" : "text-base"}`}
      >
        {children}
      </StyledText>
    </TouchableOpacity>
  );
};

export default StyledButton;
