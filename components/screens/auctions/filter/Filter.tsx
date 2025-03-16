import StyledText from "@/components/ui/StyledText";
import { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  View,
} from "react-native";
import {initialParams} from "../Auctions";
import {AuctionParams} from "../useAuctions";
import Category from "./Category";
import Condition from "./Condition";
import Price from "./Price";

const { height } = Dimensions.get("window");

interface FilterProps {
  isShow: boolean;
  close: () => void;
  handleSubmit: (newQuery: AuctionParams) => void;
  query: AuctionParams
}

const Filter: FC<FilterProps> = ({ isShow, close, handleSubmit,query }) => {
  const translateX = useRef(new Animated.Value(isShow ? 0 : -300)).current;
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [condition, setCondition] = useState<"new" | "used" | "">("");
  const [category, setCategory] = useState("");

  const changeQuery = () => {
    const isPrice = priceRange[0] !== 0 || priceRange[1] !== 0;

    handleSubmit({...query, price: isPrice ? `${priceRange[0]}-${priceRange[1]}` : "", condition, category});
    close();
  };


  const changeCategory = (categories: string) => {
    setCategory(categories);
  };

  const changeCondition = (cond: "new" | "used" | "") => {
    setCondition(cond);
  };

  const clearQuery = () => {
    handleSubmit({...initialParams, sortBy: query.sortBy});
    close();
  };

  const setStartPrice = (price: number) => {
    setPriceRange([price, priceRange[1]]);
  };

  const setEndPrice = (price: number) => {
    setPriceRange([priceRange[0], price]);
  };

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isShow ? 0 : -300,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isShow]);

  return (
    <Animated.View
      style={{
        overflow: "hidden",
        width: 280,
        height: height - 105,
        transform: [{ translateX }],
      }}
      className="bg-black absolute top-0 left-0 bottom-0 z-10 px-4 pt-2"
    >
      <StyledText className="text-xl font-openssemibold">
        Фільтр
      </StyledText>
      <StyledText className="text-sm font-opensregular mb-5">
        Підбір по параметрам
      </StyledText>

      <View className="mb-5">
        <StyledText className="text-lg font-openssemibold mb-3">Категорія</StyledText>
        
        <Category handlePress={changeCategory} />
      </View>

      
      <View className="mb-5">
        <StyledText className="text-lg font-openssemibold mb-3">Ціна</StyledText>
        
        <Price endPrice={priceRange[1]} setEndPrice={setEndPrice} setStartPrice={setStartPrice} startPrice={priceRange[0]} />
      </View>

      <View className="mb-5">
        <StyledText className="text-lg font-openssemibold mb-3">Стан</StyledText>
        
        <Condition condition={condition} setCondition={changeCondition} />
      </View>

      <View className="flex-row mt-auto px-2">
        <View className="absolute bg-gray-30p" style={{height: 1, top: 0, left: -30, right: -30}} />
        <TouchableOpacity className="flex-1 py-4" onPress={clearQuery}>
          <StyledText className="text-lg" color="text-green">Очистити</StyledText>
        </TouchableOpacity>
        <TouchableOpacity onPress={changeQuery} className="flex-1 items-end py-4">
          <StyledText className="text-lg" color="text-green">Застосувати</StyledText>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Filter;
