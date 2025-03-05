import { useAuthStore } from "@/store/useAuthStore";
import { ActivityIndicator, View } from "react-native";

const Loader = () => {
  const { isLoading } = useAuthStore();

  if (!isLoading) return null;

  return (
    <View className="absolute top-2 right-2 p-2 rounded-full">
      <ActivityIndicator size="small" color="#006E00" />
    </View>
  );
};

export default Loader;
