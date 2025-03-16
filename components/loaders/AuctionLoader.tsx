import {FC} from "react";
import { View } from "react-native";
import SkeletonLoader from "../SkeletonLoader";

const AuctionLoader:FC<{count?: number}> = ({count}) => {
  const arrCount = Array.from({ length: count || 1 });

  return (
    <>
      {arrCount.map( ( _, index ) => (
        <View key={`auction-loader-${index}`} className="mb-6">
          <SkeletonLoader width={"100%"} height={200} className="rounded-xl" />
          <SkeletonLoader height={50} width={"100%"} className="mt-2 rounded-xl" />
        </View>
      ) )}
    </>
  );
};

export default AuctionLoader;
