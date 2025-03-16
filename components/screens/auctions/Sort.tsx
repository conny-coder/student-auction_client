import StyledText from "@/components/ui/StyledText";
import { FC, useEffect, useRef, useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
  View,
} from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";

interface IRadioOption {
  value: 'newest' | 'popularity' | 'priceUp' | 'priceDown'
  label: string
}

const radioOptions: IRadioOption[] = [
  {label: "по рейтингу", value: "popularity"},
  {label: "новинки", value: "newest"},
  {label: "від дешевих до дорогих", value: "priceUp"},
  {label: "від дорогих до дешевих", value: "priceDown"},
];

const { height } = Dimensions.get("window");

interface SortProps {
  isShow: boolean;
  close: () => void;
  onChangeSort: (sortBy: 'newest' | 'popularity' | 'priceUp' | 'priceDown') => void
  initialValue: 'newest' | 'popularity' | 'priceUp' | 'priceDown'
}

const Sort: FC<SortProps> = ({ isShow, close, onChangeSort, initialValue }) => {
  const translateX = useRef(new Animated.Value(isShow ? 0 : -300)).current;

  const [selected, setSelected] = useState<'newest' | 'popularity' | 'priceUp' | 'priceDown'>(initialValue);

  const handlePress = () => {
    onChangeSort(selected);
    close();
  }

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: isShow ? 0 : -300,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isShow]);

  return (
    <Animated.View
      style={{
        overflow: "hidden",
        width: 300,
        height: height - 105,
        transform: [{ translateX }],
      }}
      className="bg-black absolute top-0 left-0 bottom-0 z-10 px-4 pt-2"
    >
      <StyledText className="text-xl font-openssemibold">
        Сортування
      </StyledText>
      <StyledText className="text-sm font-opensregular mb-5">
        Параметри сортування
      </StyledText>

      <View>
      <RadioForm
        formHorizontal={false}
        animation={true}
      >
        {
          radioOptions.map( ( obj, i ) => (
            <RadioButton labelHorizontal={true} key={i} style={{marginBottom: 6, alignItems: "center", paddingBottom: 4, paddingTop: 4}} >
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={selected === obj.value}
                onPress={() => setSelected( obj.value )}
                buttonInnerColor={'#006E00'}
                buttonOuterColor={selected === obj.value ? '#006E00' : '#6A6A6B'}
                buttonSize={10}
                buttonOuterSize={20}
                buttonStyle={{borderWidth: 2}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={() => setSelected( obj.value )}
                labelStyle={{fontFamily: "OpenSans-Regular", fontSize: 14, color: selected === obj.value ? '#ffffff' : '#C5C6C7B3'}}
              />
            </RadioButton>
          ) )
        }
      </RadioForm>
    </View>

      <View className="flex-row mt-auto px-2">
        <View className="absolute bg-gray-30p" style={{height: 1, top: 0, left: -30, right: -30}} />
        <TouchableOpacity onPress={handlePress} className="flex-1 items-center py-4">
          <StyledText className="text-lg" color="text-green">Закрити</StyledText>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

export default Sort;
