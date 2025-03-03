import StyledButton from "@/components/ui/StyledButton";
import { useAuthStore } from "@/store/useAuthStore";
import { Text, View } from "react-native";

const Profile = () => {
  const logout = useAuthStore((state) => state.logout);

  return (
    <View className="h-full bg-black">
      <Text>Profile</Text>
      <StyledButton handlePress={logout}>Log out</StyledButton>
    </View>
  );
};
export default Profile;
