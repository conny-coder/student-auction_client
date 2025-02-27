import TabIcon from "@/components/TabIcon";
import { Tabs } from "expo-router";
import navigationData from "../../constants/navigation";

const TabsLayout = () => {
  return (
    <>
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
    </>
  );
};
export default TabsLayout;
