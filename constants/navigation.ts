import { ImageSourcePropType } from "react-native";

export interface INavigation {
  name: string;
  icon: ImageSourcePropType;
}

const navigation: INavigation[] = [
  { name: "home", icon: require("../assets/images/navigation/home.png") },
  {
    name: "auctions",
    icon: require("../assets/images/navigation/auctions.png"),
  },
  { name: "create", icon: require("../assets/images/navigation/create.png") },
  { name: "chats", icon: require("../assets/images/navigation/chats.png") },
  { name: "profile", icon: require("../assets/images/navigation/profile.png") },
];

export default navigation;
