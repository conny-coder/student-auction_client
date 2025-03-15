import { Image, View } from "react-native";
import StyledText from "./ui/StyledText";

const Logo = () => {
  return (
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={require("@/assets/images/mini-logo.png")}
        width={30}
        height={30}
        resizeMode="contain"
      />
      <View
        style={{
          marginTop: 8,
          marginLeft: -2,
          alignItems: "center",
          justifyContent: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <StyledText className="uppercase text-xs leading-none">
          Student
        </StyledText>
        <StyledText className="uppercase text-sm font-openssemibold leading-none">
          Auction
        </StyledText>
      </View>
    </View>
  );
};
export default Logo;
