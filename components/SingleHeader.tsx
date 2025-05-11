import { router, useNavigation } from "expo-router";
import { Pressable, View } from "react-native";
import ArrowL from "./icons/ArrowL";
import StyledText from "./ui/StyledText";
import { useGetUser } from "@/hooks/useGetUser";
import SettingsIcon from "./icons/SettingsIcon";

export const SingleHeader: React.FC<{ title: string, id?: string }> = ({ title, id }) => {
  const navigation = useNavigation();

  const { data } = useGetUser( id as string );

  return (
    <View className="flex-row items-center bg-black px-4 h-14 border-b border-gray-700 mb-3">
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowL />
      </Pressable>
      <StyledText className="ml-4 font-openssemibold text-xl">
        {id ? data?.userName : title}
      </StyledText>

      {title === "My-profile" && ( 
      <Pressable className="absolute right-4 top-2" onPress={() => router.push( "/settings" )}>
        <SettingsIcon />
      </Pressable> )}
    </View>
  );
};
