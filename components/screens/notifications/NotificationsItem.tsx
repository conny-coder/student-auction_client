import StyledButton from "@/components/ui/StyledButton";
import StyledText from "@/components/ui/StyledText"
import { API_SERVER_URL } from "@/config/api.config";
import { useCreateChat } from "@/hooks/useCreateChat";
import { IAuction } from "@/types/auction.types"
import { formatTimeAgo } from "@/utils/formated-time-ago";
import { router } from "expo-router";
import { FC } from "react"
import { Image, View } from "react-native"

interface NotificationsItemProps {
  type: "auction_lost" | "auction_won" | "auction_ended_no_buyer" | "auction_ended";
  isRead: boolean
  createdAt: string
  auction: IAuction 
  _id: string
}

const title = {
  auction_lost: "Хтось перебив вашу ставку ⚠️",
  auction_won: "Ви виграли лот 🏆",
  auction_ended_no_buyer: "Ваш лот закінчився без покупців ⏳",
  auction_ended: "Ваш лот закінчився ⏳",
}

const buttonConfig: Record<
  NotificationsItemProps["type"],
  {
    label: string;
    style?: any;
    className?: string;
  }
> = {
  auction_lost: {
    label: "Зробити ставку",
  },
  auction_won: {
    label: "Зв'язатися з продавцем",
    style: { backgroundColor: "#0056B3" },
  },
  auction_ended_no_buyer: {
    label: "Створити новий лот",
    style: { backgroundColor: "#28A745" },
  },
  auction_ended: {
    label: "Зв'язатися з покупцем",
    style: { backgroundColor: "#0056B3" },
  },
};

const NotificationsItem: FC<NotificationsItemProps> = ( { auction, createdAt, isRead, type, _id } ) =>
{
  const { label, className, style } = buttonConfig[type]
  const { mutate: createChat } = useCreateChat()

  let handlePress = () => {}

  if (type === "auction_won") {
    handlePress = () => {
      createChat( auction.ownerId )
    }
  } else if (type === "auction_ended_no_buyer") {
    handlePress = () => {
      router.push("/create")
    }
  } else if (type === "auction_ended") {
    handlePress = () => {
      createChat( auction.highestBidderId || "" )
    }
  } else {
    handlePress = () => {
      router.push(`/auction/${auction._id}`)
    }
  }

  return (
    <>
      <View className="mb-6">
        <StyledText className={`font-openssemibold text-lg mb-4`} color={isRead ? "text-gray-70p" : "text-primary"}>{title[type]}</StyledText>
        <View className="flex-row items-center gap-2 mb-4">
          <Image source={{ uri: API_SERVER_URL + auction.images[0] }} style={{ width: 160, height: 100, borderRadius: 10 }} resizeMode="cover" />
          <View style={{ maxWidth: 220 }}>
            <StyledText
              color={isRead ? "text-gray-70p" : "text-primary"}
              numberOfLines={2}
              ellipsizeMode="tail"
              style={{ lineHeight: 20, overflow: "hidden", textOverflow: "ellipsis" }}
              className="font-openssemibold text-lg mb-2">{auction.title}</StyledText>
            <StyledText color={isRead ? "text-gray-70p" : "text-primary"} className="">Ставка: {auction.currentBid} грн</StyledText>
          </View>
        </View>
        <View style={{width: 250}} className="flex-row gap-2 items-end justify-between">
          <StyledButton
            handlePress={handlePress}
            className={className}
            size="small"
            style={style}
          >
            {label}
          </StyledButton>
          <StyledText color="text-gray-70p">{formatTimeAgo(createdAt)}</StyledText>
        </View>
      </View>
      <View className="h-0.5 bg-gray-30p mb-4 relative" style={{left: -15, right: -15, width: 400}} />
    </>
  )
}
export default NotificationsItem