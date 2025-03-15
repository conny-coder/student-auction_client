import React from "react";
import { View, Text, Image } from "react-native";
import Logo from "./Logo";
import StyledText from "./ui/StyledText";

export const TabHeader: React.FC = () => {
  return (
    <View className="flex-row items-center bg-black justify-between px-4 h-14 border-b border-gray-700 mb-3">
      <Logo />
      <StyledText className="text-xl font-openssemibold">
        Balance: $100
      </StyledText>
    </View>
  );
};
