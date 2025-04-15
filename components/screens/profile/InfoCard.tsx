import StyledText from "@/components/ui/StyledText"
import { FC } from "react"
import { View } from "react-native"

interface InfoCardProps {
  count: number
  title: string
  borderColor: string
}

const InfoCard: FC<InfoCardProps> = ( { borderColor, count, title } ) => {
  return (
    <View className="rounded-lg py-3 w-32 border border-gray-15p" style={{backgroundColor: "#151616", boxShadow: "0px 0px 8px rgba(204, 204, 204, 0.2)"}}>
      <View className={`border border-solid rounded-full mb-2 w-16 h-16 mx-auto`} style={{borderColor: borderColor}}>
        <StyledText className="font-openssemibold text-2xl text-center my-auto">{count}</StyledText>
      </View>
      <StyledText className="font-opensmedium text-sm text-center">{title}</StyledText>
    </View>
  )
}
export default InfoCard