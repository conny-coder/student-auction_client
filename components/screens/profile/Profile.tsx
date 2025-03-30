import StyledText from "@/components/ui/StyledText";
import {API_SERVER_URL} from "@/config/api.config";
import {useAuth} from "@/hooks/useAuth";
import { Image, ScrollView, View } from "react-native"
import {useProfile} from "./useProfile";

const Profile = () => {
  const user = useAuth();
  const { data, isLoading } = useProfile(user?._id || "");

  return (
    <ScrollView className="bg-black">
      <View className="px-4">
        <View className="flex-row items-center gap-7 mt-7 mx-auto">
          <View className="flex-1 flex-row justify-end">
            <Image
              source={data?.avatar ? {uri: `${API_SERVER_URL}${data.avatar}`} : require( "@/assets/images/logo.png" )}
              className="w-36 h-36 rounded-full"
            />
          </View>
          
          <View className="flex-col h-full flex-1 justify-around">
            <StyledText className="text-xl">{data?.name}</StyledText>
            <View>
              <StyledText color="text-gray-70p" className="text-lg">Рейтинг</StyledText>
              <View>
                <StyledText>{data?.rating}</StyledText>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  )
}
export default Profile