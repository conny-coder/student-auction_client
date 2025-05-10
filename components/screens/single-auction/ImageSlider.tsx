import { API_SERVER_URL } from "@/config/api.config";
import React, { useState } from "react";
import { View, Image, Modal, Pressable } from "react-native";

const FullscreenImage: React.FC<{ imageUri: string }> = ({ imageUri }) => {
  const [visible, setVisible] = useState(false);

  return (
    <View>
      <Pressable onPress={() => setVisible(true)}>
        <Image
          source={{ uri: API_SERVER_URL + imageUri }}
          className="w-[350px] h-[230px] rounded-xl"
          resizeMode="cover"
        />
      </Pressable>
      <Modal
        visible={visible}
        transparent
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <Pressable
          className="flex-1 bg-black bg-opacity-80 justify-center items-center"
          onPress={() => setVisible(false)}
        >
          <Image
            source={{ uri: imageUri }}
            className="w-full h-full"
            resizeMode="contain"
          />
        </Pressable>
      </Modal>
    </View>
  );
};

export default FullscreenImage;
