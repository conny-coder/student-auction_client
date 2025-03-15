import { useNavigation } from "expo-router";
import { Pressable, View } from "react-native";
import ArrowL from "./icons/ArrowL";
import StyledText from "./ui/StyledText";

export const SingleHeader: React.FC<{ title: string }> = ({ title }) => {
  const navigation = useNavigation();

  return (
    <View className="flex-row items-center bg-black px-4 h-14 border-b border-gray-700 mb-3">
      <Pressable onPress={() => navigation.goBack()}>
        <ArrowL />
      </Pressable>
      <StyledText className="ml-4 font-openssemibold text-xl">
        {title}
      </StyledText>
    </View>
  );
};
