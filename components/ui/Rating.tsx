import { FC } from "react"
import { Image, View } from "react-native"

const Rating:FC<{rating: number}> = ({rating}) => {
  return (
    <View className="w-32">
      <Image className="absolute top-0 left-0" source={require( "@/assets/images/rating-stroke.png" )} />
      <View style={{ width: 115 / 5 * ( rating || 1 ), overflow: "hidden" }}>
        <Image source={require( "@/assets/images/rating-full.png" )} />
      </View>
    </View>
  )
}
export default Rating