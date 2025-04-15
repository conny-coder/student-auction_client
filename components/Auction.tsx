import { API_SERVER_URL } from "@/config/api.config";
import {FavoriteAuctionService} from "@/services/favorite-auction.service";
import { IAuction } from "@/types/auction.types";
import { getTimeLeft } from "@/utils/get-time-left";
import { router } from "expo-router";
import { FC, useState } from "react";
import { Image, Pressable, View } from "react-native";
import AuctionFavorite from "./ui/AuctionFavorite";
import AuctionTime from "./ui/AuctionTime";
import StyledButton from "./ui/StyledButton";
import StyledText from "./ui/StyledText";

export interface AuctionProps
  extends Pick<
    IAuction,
    "_id" | "title" | "isFavourite" | "currentBid" | "endTime"
  > {
  image: string;
  isBig?: boolean;
}

const Auction: FC<AuctionProps> = ({
  title,
  _id,
  currentBid,
  endTime,
  isFavourite,
  image,
  isBig = false,
}) => {
  const [isFavoriteState, setIsFavoriteState] = useState(isFavourite);

  const changeFavorite = async (isFavorite: boolean) =>
  {
    setIsFavoriteState( isFavorite );

    if ( !isFavorite )
    {
      await FavoriteAuctionService.delete( _id );
    } else
    {
      await FavoriteAuctionService.set( _id );
    }
  };

  const [imageUri, setImageUri] = useState(
    image ? image : null
  );
  const fallbackImage = require("@/assets/images/no-image.jpg");

  return (
    <View>
      <View>
        <Image
          source={imageUri ? { uri: imageUri } : fallbackImage}
          style={isBig ? { width: "100%", height: 200, borderRadius: 10, objectFit: "cover" } : {
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
              className="text-lg font-opensmedium whitespace-nowrap overflow-hidden text-ellipsis"
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
              className="text-base font-opensregular text-gray-70p"
            >
              Поточна ціна: {currentBid} грн
            </StyledText>
          </View>
          <Pressable onPress={() => changeFavorite(!isFavoriteState)} className="absolute" style={{ top: 0, right: 3 }}>
            <AuctionFavorite isFavorite={isFavoriteState} />
          </Pressable>
        </View>
      </View>

      <StyledButton
        handlePress={() => router.push(`/auction/${_id}`)}
        size={isBig ? "big" : "small"}
        className="mt-2"
      >
        Зробити ставку
      </StyledButton>
    </View>
  );
};
export default Auction;
