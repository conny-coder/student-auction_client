import React from "react";
import { View, ScrollView, Image, Pressable } from "react-native";
import { Controller } from "react-hook-form";
import ImageInput from "@/components/ui/ImageInput";
import StyledText from "@/components/ui/StyledText";
import DelBtnIcon from "@/components/icons/DelBtnIcon";
import { API_SERVER_URL } from "@/config/api.config";

interface ControlledImageInputProps {
  name: string;
  control: any;
}

const ControlledImageInput: React.FC<ControlledImageInputProps> = ({
  name,
  control,
}) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={{ required: { value: true, message: "Поле обов'язкове" } }}
      render={({ field: { onChange, value }, fieldState: { error } }) => {
        const images: string[] = Array.isArray(value) ? value : [];

        return (
          <View className="mb-4">
            <View className="flex-row justify-between items-center">
              <StyledText>Виберіть зображення:</StyledText>
              <ImageInput
                onSelect={( url: string ) =>
                {
                  onChange( [...images, url] );
                }}
              />
            </View>
            {error && <StyledText className="text-red text-right text-xs">{error.message}</StyledText>}
            {images.length > 0 && (
              <ScrollView horizontal className="mt-2">
                {images.map((imgUrl, index) => (
                  <View key={index} className="py-3">
                    <Image
                      source={{ uri: API_SERVER_URL + imgUrl }}
                      style={{ width: 144, aspectRatio: 1 }}
                      className="w-36 mr-3 rounded-lg"
                      resizeMode="cover"
                    />
                    <Pressable
                      style={{ top: -2, right: 0 }}
                      className="absolute"
                      onPress={() => {
                        onChange( images.filter((_, i) => i !== index) );
                    }}><DelBtnIcon /></Pressable>
                  </View>
                ))}
              </ScrollView>
            )}
          </View>
        );
      }}
    />
  );
};

export default ControlledImageInput;
