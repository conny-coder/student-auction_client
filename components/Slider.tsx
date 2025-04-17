import React, { useRef, useState } from "react";
import { View, FlatList, ListRenderItemInfo, Pressable } from "react-native";
import SliderArrowIcon from "./icons/SliderArrowIcon";

interface ISlider<T> {
  data: T[];
  renderItem: (item: T, index: number) => React.ReactElement;
  height?: number;
  isPagination?: boolean;
}

const Slider = <T,>({ data, renderItem, height, isPagination = false }: ISlider<T>) => {
  const flatListRef = useRef<FlatList<T>>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToIndex = (index: number) => {
    if (flatListRef.current && index >= 0 && index < data.length) {
      flatListRef.current.scrollToIndex({ index, animated: true });
      setCurrentIndex(index);
    }
  };

  const onMomentumScrollEnd = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const newIndex = Math.round(contentOffset / viewSize);
    setCurrentIndex(newIndex);
  };

  return (
    <View>
      <FlatList
        style={{ height: height}}
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
        onMomentumScrollEnd={onMomentumScrollEnd}
      />

      {isPagination && ( <View className="flex-row" style={{ height: data.length < 2 ? 0 : 35 }}>
        <View
          style={{
            position: "absolute",
            left: "35%",
            display: currentIndex === 0 ? "none" : "flex",
          }}
        >
          <Pressable onPress={() => scrollToIndex( currentIndex - 1 )} disabled={currentIndex === 0}>
            <SliderArrowIcon />
          </Pressable>
        </View>

        <View
          style={{
            position: "absolute",
            right: "35%",
            transform: [{ rotate: "180deg" }],
            display: currentIndex === data.length - 1 ? "none" : "flex",
          }}
        >
          <Pressable onPress={() => scrollToIndex( currentIndex + 1 )} disabled={currentIndex === data.length - 1}>
            <SliderArrowIcon />
          </Pressable>
        </View>
      </View>
      )}

    </View>
  );
};

export default Slider;