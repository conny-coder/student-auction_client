import StyledText from "@/components/ui/StyledText";
import { FC, useEffect, useRef } from "react";
import {
  Dimensions,
  TouchableOpacity,
  Animated,
  Easing,
} from "react-native";

const { height } = Dimensions.get("window");

interface FilterProps {
  isShow: boolean;
  close: () => void;
}

const Filter: FC<FilterProps> = ({ isShow, close }) => {
  const translateX = useRef(new Animated.Value(isShow ? 0 : -300)).current;

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
        width: 300,
        height: height - 105,
        transform: [{ translateX }],
      }}
      className="bg-black absolute top-0 left-0 bottom-0 z-10"
    >
      <StyledText>
        Filter asdfaf asf dafdsf sdf adf df sdf sdf adf dsfsdf sdf
      </StyledText>
      <TouchableOpacity className="absolute top-2 right-2" onPress={close}>
        <StyledText>Close</StyledText>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default Filter;
