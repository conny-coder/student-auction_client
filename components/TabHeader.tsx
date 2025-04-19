import { useAuth } from "@/hooks/useAuth";
import { useGetBalance } from "@/hooks/useGetBalance";
import React from "react";
import { View } from "react-native";
import Logo from "./Logo";
import { useProfile } from "./screens/profile/useProfile";
import SkeletonLoader from "./SkeletonLoader";
import StyledText from "./ui/StyledText";

export const TabHeader: React.FC = () => {
  const { data: balance, isLoading } = useGetBalance();

  return (
    <View className="flex-row items-center bg-black justify-between px-4 h-14 border-b border-gray-700 mb-3">
      <Logo />
      {isLoading 
      ? <SkeletonLoader width={140} height={30} className="rounded-lg" />
      : <StyledText className="text-xl font-openssemibold">
        Баланс: {balance} грн
      </StyledText>
      }
    </View>
  );
};
