import Loader from "@/components/loaders/Loader";
import { useLocalSearchParams } from "expo-router";
import { useProfile } from "./useProfile";
import StyledText from "@/components/ui/StyledText";
import { API_SERVER_URL } from "@/config/api.config";
import { useAuth } from "@/hooks/useAuth";
import { Link, router } from "expo-router";
import { Image, Pressable, ScrollView, Settings, TouchableOpacity, View } from "react-native"
import InfoCard from "./InfoCard";
import { useAuthStore } from "@/store/useAuthStore";
import SettingsIcon from "@/components/icons/SettingsIcon";
import { useGetAuctions } from "./useGetAuctions";
import Slider from "@/components/Slider";
import HomeAuctionsLoader from "@/components/loaders/HomeAuctionsLoader";
import Auction from "@/components/Auction";


const UserProfile = () => {
  const { id } = useLocalSearchParams<{ id: string }>();
  const {data, isLoading} = useProfile(id);
  const {isLoading: myAuctionsLoading, myAuctions} = useGetAuctions(id);

  if(isLoading) return <Loader />

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

          <View className="flex-col flex-1 justify-around">
            <StyledText className="text-xl">{data?.name}</StyledText>
            <View>
              <StyledText color="text-gray-70p" className="text-lg">Рейтинг</StyledText>
              <View>
                <Image className="absolute" source={require( "@/assets/images/rating-stroke.png" )} />
                <View style={{ width: 115 / 5 * (data?.rating || 1), overflow: "hidden" }}>
                  <Image source={require( "@/assets/images/rating-full.png" )} />
                </View>
              </View>
            </View>
          </View>
        </View>
        <View className="mt-3 flex-row justify-center gap-4 mb-6">
          <InfoCard borderColor="rgba(197, 198, 199, 0.5)" count={data?.bidsCount || 0} title="Ставки" />
          <InfoCard borderColor="#28A745" count={data?.winnersCount || 0} title="Виграні лоти" />
          <InfoCard borderColor="#E53935" count={data?.soldCount || 0} title="Продані лоти" />
        </View>
        <View>
          <StyledText className="text-xl font-opensmedium mb-4">
            Лоти користувача
          </StyledText>
          {myAuctionsLoading ? (
            <Slider
              data={["", ""]}
              renderItem={() => <HomeAuctionsLoader />}
            ></Slider>
          ) : (
            <Slider
              data={myAuctions.slice(0, 8)}
              renderItem={(item, index) => <Auction {...item} key={index} />}
            />
          )}
        </View>
      </View>
    </ScrollView>
  )
}
export default UserProfile