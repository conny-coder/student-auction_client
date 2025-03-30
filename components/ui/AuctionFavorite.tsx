import {FC} from "react"
import {View} from "react-native"
import FavoriteIconFilled from "../icons/FavoriteFullIcon"
import FavoriteIcon from "../icons/FavoriteIcon"

interface AuctionFavoriteProps {
  isFavorite: boolean
}

const AuctionFavorite:FC<AuctionFavoriteProps> = ({isFavorite}) => {
  return (
    <View>
      {isFavorite ? <FavoriteIconFilled /> : <FavoriteIcon />}
    </View>
  )
}
export default AuctionFavorite