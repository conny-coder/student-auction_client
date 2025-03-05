import { API_SERVER_URL } from "@/config/api.config";
import { IAuction } from "@/types/auction.types";
import { getTimeLeft } from "@/utils/get-time-left";
import { router } from "expo-router";
import { FC, useState } from "react";
import { Image, View } from "react-native";
import AuctionTime from "./ui/AuctionTime";
import StyledButton from "./ui/StyledButton";
import StyledText from "./ui/StyledText";

export interface AuctionProps
  extends Pick<
    IAuction,
    "_id" | "title" | "isFavorite" | "currentBid" | "endTime"
  > {
  image: string;
}

const Auction: FC<AuctionProps> = ({
  title,
  _id,
  currentBid,
  endTime,
  isFavorite,
  image,
}) => {
  const [imageUri, setImageUri] = useState(
    image ? `${API_SERVER_URL}${image}` : null
  );
  const fallbackImage = require("@/assets/images/no-image.jpg");

  return (
    <View>
      <View>
        <Image
          source={imageUri ? { uri: imageUri } : fallbackImage}
          style={{
            width: 250,
            height: 140,
            objectFit: "cover",
            borderRadius: 10,
          }}
          onError={() => setImageUri(null)}
        />
        <View className="absolute top-2 left-2 bottom-2 right-2 justify-between flex">
          <AuctionTime endTime={endTime} />
          <View className="mt-auto">
            <StyledText
              numberOfLines={1}
              className="text-base font-opensmedium whitespace-nowrap overflow-hidden text-ellipsis"
              style={{
                textShadowColor: "rgba(0,0,0,0.75)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}
            >
              {title}
            </StyledText>
            <StyledText
              style={{
                textShadowColor: "rgba(0,0,0,0.75)",
                textShadowOffset: { width: 1, height: 1 },
                textShadowRadius: 2,
              }}
              className="text-sm font-opensregular text-gray-70p"
            >
              Поточна ціна: {currentBid} грн
            </StyledText>
          </View>
        </View>
      </View>

      <StyledButton
        handlePress={() => router.push(`/auction/${_id}`)}
        size="small"
        className="mt-2"
      >
        Зробити ставку
      </StyledButton>
    </View>
  );
};
export default Auction;
