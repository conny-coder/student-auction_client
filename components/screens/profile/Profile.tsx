import StyledText from "@/components/ui/StyledText";
import { API_SERVER_URL } from "@/config/api.config";
import { useAuth } from "@/hooks/useAuth";
import { Link, router } from "expo-router";
import { Image, Pressable, RefreshControl, ScrollView, Settings, TouchableOpacity, View } from "react-native"
import InfoCard from "./InfoCard";
import { useProfile } from "./useProfile";
import { useAuthStore } from "@/store/useAuthStore";
import Loader from "@/components/loaders/Loader";
import SettingsIcon from "@/components/icons/SettingsIcon";
import { useGetAuctions } from "./useGetAuctions";
import Slider from "@/components/Slider";
import HomeAuctionsLoader from "@/components/loaders/HomeAuctionsLoader";
import Auction from "@/components/Auction";
import { useCallback, useState } from "react";
import { useGetReviews } from "./useGetReviews";
import Review from "./Review";
import Rating from "@/components/ui/Rating";
import MyTabs from "./MyTabs";
import { useTabsInfo } from "./useTabsInfo";

const Profile = () => {
  const user = useAuth();
  const { data, isLoading, refetch: refetchProfile } = useProfile( user?._id || "" );
  const { isLoadingMyAuctions, myAuctions, isLoadingMyFavoriteAuctions, myFavoriteAuctions, refetchAllAuctions, isLoadingBidedAuctions, bidedAuctions } = useTabsInfo();
  const {data: reviews, isLoading: reviewsLoading, refetch: refetchReviews} = useGetReviews(user?._id || "");
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    await Promise.all([
      refetchProfile(),
      refetchAllAuctions(),
      refetchReviews()
    ]);
    setRefreshing(false);
  }, [refetchProfile, refetchAllAuctions]);

  if(isLoading && reviewsLoading) return <Loader />

  if (!isLoading && !data) return <StyledText>Profile not found</StyledText>

  return (
    <ScrollView className="bg-black" refreshControl={
      <RefreshControl
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    }>
      <View className="px-4 pb-2">
        <View className="flex-row items-center gap-7 mt-7 mx-auto mb-3">
          <View className="flex-1 flex-row justify-end">
            <Image
              source={data?.avatar ? { uri: `${API_SERVER_URL}${data.avatar}` } : require( "@/assets/images/avatar.png" )}
              className="w-36 h-36 rounded-full"
            />
          </View>

          <View className="flex-col flex-1 justify-around gap-4">
            <StyledText className="text-xl">{data?.name}</StyledText>
            <View>
              <StyledText color="text-gray-70p" className="text-lg">Рейтинг</StyledText>
              <Rating rating={data?.rating || 0} />
            </View>
          </View>
        </View>
        <View className="flex-row items-center justify-center mb-4">
          <StyledText className="text-xl font-openssemibold">Баланс: {data?.balance} грн | </StyledText>
          <TouchableOpacity onPress={() => router.push( "/home" )} className="ml-2"><StyledText color="text-green-light" className="text-xl font-openssemibold underline">Поповнити?</StyledText></TouchableOpacity>
        </View>
        <View className="mt-3 flex-row justify-center gap-4 mb-6">
          <InfoCard borderColor="rgba(197, 198, 199, 0.5)" count={data?.bidsCount || 0} title="Ставки" />
          <InfoCard borderColor="#28A745" count={data?.winnerCount || 0} title="Виграні лоти" />
          <InfoCard borderColor="#E53935" count={data?.soldCount || 0} title="Продані лоти" />
        </View>
        <View className="mb-4">
          <MyTabs favorites={myFavoriteAuctions} myBids={bidedAuctions} myLots={myAuctions} isLoadingBids={isLoadingBidedAuctions} isLoadingFavorites={isLoadingMyFavoriteAuctions} isLoadingLots={isLoadingMyAuctions} />
        </View>

        <StyledText className="text-xl font-opensmedium mb-4">
          Відгуки
        </StyledText>
        <View>
          {reviews?.map((item, index) => <Review key={index} author={item.author} rating={item.rating} comment={item.comment} />)}
        </View>
      </View>
    </ScrollView>
  )
}
export default Profile