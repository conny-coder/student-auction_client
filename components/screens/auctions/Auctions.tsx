import Auction from "@/components/Auction";
import FilterIcon from "@/components/icons/FilterIcon";
import SortIcon from "@/components/icons/SortIcon";
import AuctionLoader from "@/components/loaders/AuctionLoader";
import SearchInput from "@/components/ui/SearchInput";
import StyledText from "@/components/ui/StyledText";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, View } from "react-native";
import Filter from "./Filter";
import Sort from "./Sort";
import { useAuctions } from "./useAuctions";

const Auctions = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowSort, setIsShowSort] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const {auctions, isLoading, refetchWithParams} = useAuctions();

  const handleSubmitInput = (text: string) => {
    setSearchValue(text);
  }

  useEffect(() => {
    refetchWithParams({search: searchValue})
  }, [searchValue])
  
  const openFilter = () => {
    setIsShowFilter(true);
    setIsShowSort(false);
  }
  const openSort = () => {
    setIsShowFilter(false);
    setIsShowSort(true);
  }

  const closeFilter = () => setIsShowFilter(false);
  const closeSort = () => setIsShowSort(false);

  return (
    <ScrollView scrollEnabled={!isShowSort && !isShowFilter} className="bg-black">
      <View className="px-4 mt-2">
        <SearchInput handleSubmit={handleSubmitInput} />
        <View className="px-4" style={{ marginTop: 20 }}>
          <View className="flex-row justify-between mb-4">
            <Pressable onPress={openFilter} className="flex-row items-center" style={{ gap: 5 }}>
              <FilterIcon />
              <View style={{ marginTop: 3 }}>
                <StyledText className="text-base font-opensmedium leading-none">Фільтр</StyledText>
                <StyledText color="text-gray-70p" className="text-sm font-opensmedium leading-none">не вибрано</StyledText>
              </View>
            </Pressable>
             <Pressable onPress={openSort} className="flex-row items-center" style={{ gap: 5 }}>
              <SortIcon />
              <View style={{ marginTop: 5 }}>
                <StyledText className="text-base font-opensmedium leading-none">Сортування</StyledText>
                <StyledText style={{ marginLeft: 2 }} color="text-gray-70p" className="text-sm font-opensmedium leading-none">по рейтингу</StyledText>
              </View>
            </Pressable>
          </View>
          {isLoading ? <AuctionLoader count={3} /> :
            auctions.map( ( auction ) => (
              <View key={auction._id} className="mb-6">
                <Auction {...auction} isBig={true} />
              </View>
            ) )
          }
        </View>
      </View>
      <Filter isShow={isShowFilter} close={closeFilter} />
      <Sort isShow={isShowSort} close={closeSort} />
    </ScrollView>
  );
};
export default Auctions;
