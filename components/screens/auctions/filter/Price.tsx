import CurrencyIcon from "@/components/icons/CurrencyIcon"
import StyledText from "@/components/ui/StyledText"
import {FC} from "react"
import {TextInput, View} from "react-native"

interface PriceProps {
  startPrice: number
  endPrice: number
  setStartPrice: (price: number) => void
  setEndPrice: (price: number) => void
}

const Price:FC<PriceProps> = ({endPrice,setEndPrice,setStartPrice,startPrice}) => {
  return (
    <View className="flex-row justify-between">
      <View>
        <StyledText color="text-gray-70p" className="mb-2">Від</StyledText>
        <View className="w-32">
          <TextInput 
            value={startPrice.toString()}
            onChangeText={(text) => setStartPrice(parseInt(text) || 0)}
            className="text-primary text-base border border-gray-30p border-solid rounded-xl"
            style={{paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 30, height: 45}}
            placeholder="0"
            placeholderTextColor="#fff"
            keyboardType="numeric" 
          />
          <View className="absolute" style={{top: 15, right: 10}}>
            <CurrencyIcon />
          </View>
        </View>
      </View>
      <View>
        <StyledText color="text-gray-70p" className="mb-2">До</StyledText>
        <View className="w-32">
          <TextInput 
            value={endPrice.toString()}
            onChangeText={(text) => setEndPrice(parseInt(text) || 0)}
            className="text-primary text-base border border-gray-30p border-solid rounded-xl"
            style={{paddingTop: 8, paddingBottom: 8, paddingLeft: 10, paddingRight: 30, height: 45}}
            placeholder="0"
            placeholderTextColor="#fff"
            keyboardType="numeric" 
          />
          <View className="absolute" style={{top: 15, right: 10}}>
            <CurrencyIcon />
          </View>
        </View>
      </View>
    </View>
  )
}
export default Price