import Auction from "@/components/Auction";
import FilterIcon from "@/components/icons/FilterIcon";
import SortIcon from "@/components/icons/SortIcon";
import AuctionLoader from "@/components/loaders/AuctionLoader";
import SearchInput from "@/components/ui/SearchInput";
import StyledText from "@/components/ui/StyledText";
import { useEffect, useState } from "react";
import { Pressable, RefreshControl, ScrollView, View } from "react-native";
import Filter from "./filter/Filter";
import Sort from "./Sort";
import { AuctionParams, useAuctions } from "./useAuctions";

export const initialParams: AuctionParams = {
  search: "",
  category: "",
  price: "",
  condition: "",
  sortBy: "popularity",
};

const Auctions = () => {
  const [isShowFilter, setIsShowFilter] = useState(false);
  const [isShowSort, setIsShowSort] = useState(false);
  const [query, setQuery] = useState<AuctionParams>(initialParams);
  const [refreshing, setRefreshing] = useState(false);

  const {auctions, isLoading, refetchWithParams} = useAuctions(query);

  const handleSubmitInput = (text: string) => {
    setQuery({ ...query, search: text });
  }

  const changeSort = (newSort: 'newest' | 'popularity' | 'priceUp' | 'priceDown') => {
    setQuery({ ...query, sortBy: newSort });
  }

  const changeQuery = (newQuery: AuctionParams) => {
    setQuery(newQuery);
  }

  useEffect(() => {
    refetchWithParams(query)
  }, [query])
  
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

  const onRefresh = async () =>
  {
    setRefreshing( true );
    await refetchWithParams( query );
    setRefreshing( false );
  };

  return (
    <ScrollView scrollEnabled={!isShowSort && !isShowFilter} className="bg-black" refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
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
      <Filter query={query} handleSubmit={changeQuery} isShow={isShowFilter} close={closeFilter} />
      <Sort initialValue={query.sortBy} onChangeSort={changeSort} isShow={isShowSort} close={closeSort} />
    </ScrollView>
  );
};
export default Auctions;
