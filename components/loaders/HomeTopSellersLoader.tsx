import { View } from "react-native";
import SkeletonLoader from "../SkeletonLoader";

const HomeTopSellersLoader = () => {
  return (
    <View className="flex-col items-center">
      <SkeletonLoader height={150} width={150} className="rounded-full mb-2" />
      <SkeletonLoader height={20} width={170} className="mt-2 rounded-lg" />
    </View>
  );
};

export default HomeTopSellersLoader;
