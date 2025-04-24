import { useGetBalance } from "@/hooks/useGetBalance";
import { useGetUnreadNotifications } from "@/hooks/useGetUnreadNotifications";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, View } from "react-native";
import BalanceArrowIcon from "./icons/BalanceArrowIcon";
import CurrencyIcon from "./icons/CurrencyIcon";
import NotificationIcon from "./icons/NotificationIcon";
import Logo from "./Logo";
import SkeletonLoader from "./SkeletonLoader";
import StyledText from "./ui/StyledText";

export const TabHeader: React.FC = () => {
  const [isShow, setIsShow] = useState(false);
  const { data: balance, isLoading } = useGetBalance();
  const notifications = useGetUnreadNotifications();

  return (
    <View className="flex-row items-center bg-black justify-between px-4 h-16 border-b border-gray-700 mb-3">
      <Logo />
      <View className="flex-row items-center">
        <Pressable onPress={() => { setIsShow(!isShow) }} className="flex-row items-center gap-2" style={{ marginRight: 25 }}>
          <View>
            <StyledText className="text-sm" color="text-gray-70p">
              Баланс:
            </StyledText>
            {isLoading
              ? <SkeletonLoader width={70} height={20} className="rounded-md" />
              : <View className="flex-row items-center gap-1">
                <StyledText className="text-base font-openssemibold leading-tight">{balance?.toLocaleString( 'en-US' )}</StyledText>
                <CurrencyIcon color="#fff" size={10} />
              </View>
            }
          </View>
          <View style={{ transform: [{ rotate: isShow ? "180deg" : "0deg" }] }}>
            <BalanceArrowIcon />
          </View>
        </Pressable>

        <View className="absolute p-4" 
        style={{ top: 49, left: -30, backgroundColor: "rgba(21, 22, 25, 0.95)", borderBottomLeftRadius: 10, borderBottomRightRadius: 10, opacity: isShow ? 1000 : 0, pointerEvents: isShow ? "auto" : "none",  transitionDelay: "0.2s", transitionDuration: "0.2s", transitionTimingFunction: "ease-in-out" }}>
          <Pressable >
            <StyledText className="text-lg font-openssemibold" color="text-green">
              Поповнити
            </StyledText>
          </Pressable>
          <Pressable >
            <StyledText className="text-lg font-openssemibold" color="text-red">
              Вивести
            </StyledText>
          </Pressable>
        </View>

        <Pressable onPress={() => { router.push("/notifications") }}>
          <NotificationIcon />
          <View
          style={{
          position: 'absolute',
          top: -4,   
          right: -4, 
          width: 18,
          height: 18,
          borderRadius: 10,
          backgroundColor: 'red',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <StyledText className="text-xs font-openssemibold" style={{ color: 'white' }}>
          {notifications}
        </StyledText>
      </View>
        </Pressable>
      </View>
    </View>
  );
};
