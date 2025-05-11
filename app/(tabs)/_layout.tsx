import TabIcon from "@/components/TabIcon";
import { useAuth } from "@/hooks/useAuth";
import { Redirect, Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";
import navigationData from "../../constants/navigation";
import { SingleHeader } from "@/components/SingleHeader";
import { TabHeader } from "@/components/TabHeader";

const TabsLayout = () => {
  const user = useAuth();

  if (!user) {
    return <Redirect href="/sign-in" />;
  }

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
          sceneStyle: { backgroundColor: "#0B0C10" },
          header: () => <TabHeader />,
        }}
      >
        {navigationData.map( ( item ) => (
          <Tabs.Screen
            name={item.name}
            key={`tab-${item.name}`}
            options={{
              // headerShown: false,
              tabBarIcon: ( { focused } ) => (
                <TabIcon icon={item.icon} focused={focused} />
              ),
            }}
          />
        ) )}
        <Tabs.Screen
          name={"chats"}
          key={`tab-chats`}
          options={() => ( {
            header: () => <SingleHeader title="Повідомлення" />,
            tabBarIcon: ( { focused } ) => (
              <TabIcon icon={require( "../../assets/images/navigation/chats.png" )} focused={focused} />
            ),
          } )}
        />
        <Tabs.Screen
          name={"profile"}
          key={`tab-profile`}
          options={() => ( {
            header: () => <SingleHeader title="My-profile" id={user._id} />,
            tabBarIcon: ( { focused } ) => (
              <TabIcon icon={require( "../../assets/images/navigation/profile.png" )} focused={focused} />
            ),
          } )}
        />
      </Tabs>
      <StatusBar backgroundColor="#0B0C10" style="dark" />
    </>
  );
};
export default TabsLayout;
