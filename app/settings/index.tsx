import Settings from "@/components/screens/settings/Settings"
import { useAuth } from "@/hooks/useAuth";
import { Redirect } from "expo-router";

const SettingsPage = () => {
  const user = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <Settings />
  )
}
export default SettingsPage