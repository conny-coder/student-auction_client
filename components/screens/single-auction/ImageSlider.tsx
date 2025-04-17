import { FC } from "react"
import { Image, View } from "react-native"

interface ImageSliderProps {
  image: string
}

const ImageSlider:FC<ImageSliderProps> = ({image}) => {
  return (
    <View>
      <Image source={{ uri: image }} style={{ width: 350, height: 230, borderRadius: 12 }} resizeMode="stretch" />
    </View>
  )
}
export default ImageSlider