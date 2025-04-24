import React, { useRef } from "react";
import { FlatList, View } from "react-native";
import Loader from "@/components/loaders/Loader";
import StyledText from "@/components/ui/StyledText";
import NotificationsItem from "./NotificationsItem";
import { useNotifications } from "./useNotifications";
import { useChangeReadState } from "./useChangeReadState";
import { INotification } from "@/types/notification.types";

const Notifications = () => {
  const { data: notifications, isLoading } = useNotifications();
  const changeRead = useChangeReadState()

  const viewabilityConfig = {
    minimumViewTime: 100,            
    viewAreaCoveragePercentThreshold: 50,  
  };

  const readSet = useRef<Set<string>>(new Set());

  const onViewableItemsChanged = useRef(
    ({ viewableItems }: { viewableItems: any[] }) => {
      viewableItems.forEach(({ item, isViewable }) => {
      if (isViewable && !item.isRead && !readSet.current.has(item._id)) {
        readSet.current.add(item._id);
        changeRead({ notificationId: item._id });
      }
      });
    }
  ).current;

  if (isLoading) return <Loader />;
  if (!notifications || notifications.length === 0)
    return <StyledText>Повідомлень немає</StyledText>;

  return (
    <View style={{ flex: 1 }}>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={notifications}
        keyExtractor={(item: INotification) => item._id}
        renderItem={({ item }: { item: INotification }) => {
          return (
            <NotificationsItem
              _id={item._id}
              auction={item.auction}
              createdAt={item.createdAt}
              isRead={item.isRead}
              type={item.type}
            />
          );
        }}
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Notifications;
