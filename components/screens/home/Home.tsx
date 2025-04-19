import Auction from "@/components/Auction";
import HomeAuctionsLoader from "@/components/loaders/HomeAuctionsLoader";
import HomeTopSellersLoader from "@/components/loaders/HomeTopSellersLoader";
import Slider from "@/components/Slider";
import DirectButton from "@/components/ui/DirectButton";
import StyledText from "@/components/ui/StyledText";
import { useAuth } from "@/hooks/useAuth";
import { router } from "expo-router";
import { ScrollView, View } from "react-native";
import { useAuctions } from "../auctions/useAuctions";
import SellersItem from "./SellersItem";
import { useGetTopSellers } from "./useGetTopSellers";

const Home = () => {
  const user = useAuth();
  const { auctions, isLoading } = useAuctions();
  const { topSellers, isLoading: topSellersLoading } = useGetTopSellers();

  return (
    <ScrollView className="bg-black">
      <View className="px-4">
        <View className="mb-5">
          <StyledText className="text-xl font-opensmedium">
            Вітаю, {user?.userName}!
          </StyledText>
          <StyledText className="-tracking-widest">
            Купуй та продавай — швидко, зручно, вигідно!🚀
          </StyledText>
        </View>
        <View>
          <StyledText className="text-xl font-opensmedium mb-4">
            Нові аукціони
          </StyledText>
          {isLoading ? (
            <Slider
              data={["", ""]}
              renderItem={() => <HomeAuctionsLoader />}
            ></Slider>
          ) : (
            <Slider
              data={auctions.slice(0, 8)}
              renderItem={(item, index) => <Auction {...item} key={index} />}
            />
          )}
        </View>
        <View className="mt-4">
          <DirectButton handlePress={() => router.push("/auctions")}>
            Всі аукціони
          </DirectButton>
        </View>
        <View className="mt-[30px] mb-5">
          <StyledText className="text-xl font-opensmedium mb-4">
            ТОП продавці
          </StyledText>
          {isLoading ? (
            <Slider
              data={["", ""]}
              renderItem={() => <HomeTopSellersLoader />}
            ></Slider>
          ) : (
            <Slider
              data={topSellers}
              renderItem={(item, index) => <SellersItem {...item} key={index} />}
            />
          )}
        </View>
        <View className="mb-3">
          <StyledText className="text-xl font-opensmedium mb-2">
            Бажаєте щось продати?
          </StyledText>
          <StyledText className="text-gray-400">
            Додайте свій товар за декілька хвилин. Почніть заробляти вже
            сьогодні. Можливо, саме ваші речі шукають прямо зараз!
          </StyledText>
        </View>
        <View className="mb-5">
          <DirectButton handlePress={() => router.push("/create")}>
            Створити аукціон
          </DirectButton>
        </View>
      </View>
    </ScrollView>
  );
};
export default Home;
