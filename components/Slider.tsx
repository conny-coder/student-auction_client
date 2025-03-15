import React, { useRef } from "react";
import { View, FlatList, ListRenderItemInfo } from "react-native";

interface ISlider<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
}

const Slider = <T,>({ data, renderItem }: ISlider<T>) => {
  const flatListRef = useRef<FlatList<T>>(null);

  return (
    <View>
      <FlatList
        ref={flatListRef}
        data={data}
        horizontal
        pagingEnabled
        snapToAlignment="start"
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item: any, index: number) =>
          item._id ? item._id : index.toString()
        }
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        renderItem={({ item, index }: ListRenderItemInfo<T>) =>
          renderItem(item, index)
        }
      />
    </View>
  );
};

export default Slider;
