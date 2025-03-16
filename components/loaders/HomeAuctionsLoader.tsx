import { View } from "react-native";
import SkeletonLoader from "../SkeletonLoader";

const HomeAuctionsLoader = () => {
  return (
    <View>
      <SkeletonLoader height={140} width={250} className="rounded-lg" />
      <SkeletonLoader height={35} width={250} className="mt-2 rounded-lg" />
    </View>
  );
};

export default HomeAuctionsLoader;
