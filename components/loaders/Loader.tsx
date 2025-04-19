
import { ActivityIndicator, View } from "react-native";

const Loader = () => {

  return (
    <View style={{zIndex: 100}} className="absolute top-2 right-2 p-2 rounded-full">
      <ActivityIndicator size="small" color="#006E00" />
    </View>
  );
};

export default Loader;
