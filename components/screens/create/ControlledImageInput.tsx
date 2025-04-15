import React from "react";
import { View, ScrollView, Image } from "react-native";
import { Controller } from "react-hook-form";
import ImageInput from "@/components/ui/ImageInput";
import StyledText from "@/components/ui/StyledText";

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
      render={({ field: { onChange, value } }) => {
        const images: string[] = Array.isArray(value) ? value : [];

        return (
          <View className="mb-4 ">
            <View className="flex-row justify-between items-center">
              <StyledText>Виберіть зображення:</StyledText>
              <ImageInput
                onSelect={( url: string ) =>
                {
                  onChange( [...images, url] );
                }}
              />
            </View>
            {images.length > 0 && (
              <ScrollView horizontal className="mt-2">
                {images.map((imgUrl, index) => (
                  <Image
                    key={index}
                    source={{ uri: imgUrl }}
                    className="w-20 h-20 mr-2 rounded-lg"
                    resizeMode="cover"
                  />
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
