import { View } from "react-native";
import SkeletonLoader from "../SkeletonLoader";

const HomeAuctionsLoader = () => {
  return (
    <View>
      <SkeletonLoader height={140} width={250} />
      <SkeletonLoader height={35} width={250} className="mt-2" />
    </View>
  );
};

export default HomeAuctionsLoader;
