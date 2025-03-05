import StyledText from "@/components/ui/StyledText";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { View } from "react-native";

const SingeAuction = () => {
  const { id } = useLocalSearchParams();

  return (
    <View className="bg-black h-full">
      <StyledText className="mt-20">{id}</StyledText>
    </View>
  );
};
export default SingeAuction;
