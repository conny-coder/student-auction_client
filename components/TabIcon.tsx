import { FC } from "react";
import { View, Image, ImageSourcePropType } from "react-native";

export interface TabIconProps {
  icon: ImageSourcePropType;
  focused: boolean;
}

const TabIcon: FC<TabIconProps> = ({ focused, icon }) => {
  return (
    <View className="items-center justify-center flex">
      <Image
        source={icon}
        resizeMode="contain"
        className="w-7 h-7"
        tintColor={focused ? "#006E00" : "#FFFFFF"}
      />
    </View>
  );
};
export default TabIcon;
