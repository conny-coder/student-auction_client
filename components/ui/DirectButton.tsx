import { FC, PropsWithChildren } from "react";
import { Pressable, Text, View } from "react-native";
import ArrowR from "../icons/ArrowR";

interface DirectButtonProps {
  handlePress: () => void;
}

const DirectButton: FC<PropsWithChildren<DirectButtonProps>> = ({
  children,
  handlePress,
}) => {
  return (
    <Pressable
      className="border border-green-light border-solid rounded-xl py-3 pl-4 pr-6 flex-row items-center w-fit"
      onPress={handlePress}
      style={{
        flexDirection: "row",
        gap: 16,
        alignSelf: "flex-start",
      }}
    >
      <Text className="text-green-light font-opensregular">{children}</Text>
      <View style={{ marginTop: 3 }}>
        <ArrowR />
      </View>
    </Pressable>
  );
};
export default DirectButton;
