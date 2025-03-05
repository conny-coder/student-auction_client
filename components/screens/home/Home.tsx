import Auction from "@/components/Auction";
import Slider from "@/components/Slider";
import StyledButton from "@/components/ui/StyledButton";
import StyledText from "@/components/ui/StyledText";
import { useAuth } from "@/hooks/useAuth";
import { getTimeLeft } from "@/utils/get-time-left";
import { ScrollView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useHomeAuctions } from "./useHomeAuctions";

const Home = () => {
  const user = useAuth();
  const { auctions, error } = useHomeAuctions();

  return (
    <SafeAreaView className="h-full bg-black">
      <ScrollView>
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
            <Slider data={auctions} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
export default Home;
