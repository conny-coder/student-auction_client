import Loader from "@/components/loaders/Loader";
import { useLocalSearchParams } from "expo-router";
import { useProfile } from "./useProfile";
import StyledText from "@/components/ui/StyledText";
import { API_SERVER_URL } from "@/config/api.config";
import { Image, ScrollView, View } from "react-native"
import InfoCard from "./InfoCard";
import { useGetAuctions } from "./useGetAuctions";
import Slider from "@/components/Slider";
import HomeAuctionsLoader from "@/components/loaders/HomeAuctionsLoader";
import Auction from "@/components/Auction";
import { useGetReviews } from "./useGetReviews";
import Review from "./Review";
import Rating from "@/components/ui/Rating";

const UserProfile = () => {
  const { id } = useLocalSearchParams<{ id: string }>();

  const { data, isLoading } = useProfile( id );
  const { isLoading: myAuctionsLoading, myAuctions } = useGetAuctions( id );
  const { data: reviews, isLoading: reviewsLoading } = useGetReviews( id )

  if(isLoading && reviewsLoading) return <Loader />

  if (!data && !isLoading) return <StyledText>Profile not found</StyledText>

  return (
    <ScrollView className="bg-black">
      <View className="px-4">
        <View className="flex-row items-center gap-7 mt-7 mx-auto mb-3">
          <View className="flex-1 flex-row justify-end">
            <Image
              source={data?.avatar ? { uri: `${API_SERVER_URL}${data.avatar}` } : require( "@/assets/images/avatar.png" )}
              className="w-36 h-36 rounded-full"
            />
          </View>

          <View className="flex-col flex-1 justify-around gap-2">
            <StyledText className="text-xl">{data?.name}</StyledText>
            <View>
              <StyledText color="text-gray-70p" className="text-lg">Рейтинг</StyledText>
              <View>
                <Image className="absolute" source={require( "@/assets/images/rating-stroke.png" )} />
                <Rating rating={data?.rating || 0} />
              </View>
            </View>
          </View>
        </View>
        <View className="mt-3 flex-row justify-center gap-4 mb-6">
          <InfoCard borderColor="rgba(197, 198, 199, 0.5)" count={data?.bidsCount || 0} title="Ставки" />
          <InfoCard borderColor="#28A745" count={data?.winnerCount || 0} title="Виграні лоти" />
          <InfoCard borderColor="#E53935" count={data?.soldCount || 0} title="Продані лоти" />
        </View>
        <View className="mb-4">
          <StyledText className="text-xl font-opensmedium mb-4">
            Лоти користувача
          </StyledText>

          {myAuctionsLoading ? (
            <Slider
              data={["", ""]}
              renderItem={() => <HomeAuctionsLoader />}
            ></Slider>
          ) : (
            myAuctions?.length === 0 ? (
              <StyledText color="text-gray-70p" className="text-base font-opensmedium">
                У користувача немає лотів
              </StyledText>
            ) : <Slider
              data={myAuctions.slice( 0, 8 )}
              renderItem={( item, index ) => <Auction {...item} key={index} />}
            />
          )}
        </View>

        {reviews?.length !== 0 &&
          <StyledText className="text-xl font-opensmedium mb-4">
            Відгуки
          </StyledText>
        }

        <View>
          {reviews?.map((item, index) => <Review key={index} author={item.author} rating={item.rating} comment={item.comment} />)}
        </View>
      </View>
    </ScrollView>
  )
}
export default UserProfile