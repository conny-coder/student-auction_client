import TabIcon from "@/components/TabIcon";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import navigationData from "../../constants/navigation";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const TabsLayout = () => {
  const user = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarStyle: {
            backgroundColor: "#0B0C10",
            paddingTop: 6,
            borderTopWidth: 1,
            borderColor: "rgba(116, 114, 114, 0.3)",
          },
        }}
      >
        {navigationData.map((item) => (
          <Tabs.Screen
            name={item.name}
            key={`tab-${item.name}`}
            options={{
              headerShown: false,
              tabBarIcon: ({ focused }) => (
                <TabIcon icon={item.icon} focused={focused} />
              ),
            }}
          />
        ))}
      </Tabs>
      <StatusBar backgroundColor="#0B0C10" style="dark" />
    </QueryClientProvider>
  );
};
export default TabsLayout;
