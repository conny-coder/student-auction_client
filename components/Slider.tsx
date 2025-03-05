import React, { FC, useRef, useState } from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";
import Auction, { AuctionProps } from "./Auction";

interface ISlider {
  data: AuctionProps[];
}

const Slider: FC<ISlider> = ({ data }) => {
  const flatListRef = useRef<FlatList<string>>(null);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any) => item._id}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        renderItem={({ item }: ListRenderItemInfo<any>) => (
          <Auction
            _id={item._id}
            currentBid={item.currentBid}
            endTime={item.endTime}
            image={item.image}
            isFavorite={item.isFavorite}
            title={item.title}
          />
        )}
      />
    </View>
  );
};

export default Slider;
