import Rating from "@/components/ui/Rating"
import StyledText from "@/components/ui/StyledText"
import { API_SERVER_URL } from "@/config/api.config"
import { IUserState } from "@/types/user.types"
import { FC, useState } from "react"
import { Image, Pressable, ScrollView, View } from "react-native"

interface ReviewProps {
  author: IUserState
  comment: string
  rating: number
}

const Review:FC<ReviewProps> = ({author, comment, rating}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="px-4 py-4 mb-4" style={{backgroundColor: "rgba(21, 22, 22, 0.5)", boxShadow: "4px 4px 8px rgba(204, 204, 204, 0.2)", borderRadius: 8, borderWidth: 1, borderColor: "#191919"}}>
      <View className="flex-row items-center justify-between mb-3">
        <View className="flex-row items-center gap-2">
          <Image source={{uri: API_SERVER_URL + author.avatar}} className="w-8 h-8 rounded-full" />
          <StyledText className="font-openssemibold">{author.userName}</StyledText>
        </View>
        <Rating rating={rating} />
      </View>
      <Pressable onPress={() => setExpanded( !expanded )}>
        <StyledText numberOfLines={expanded ? undefined : 3}>
          {comment}
        </StyledText>
      </Pressable>
    </View>
  )
}
export default Review