import React, { FunctionComponent } from "react";
import { Pressable, Image, ActivityIndicator, Text } from "react-native";
import ImagePlaceholder from "../icons/ImagePlaceholder";
import { useUpload } from "@/hooks/useUpload";

interface ImageInputProps {
  onSelect?: (url: string) => void;
  ImagePicture?: FunctionComponent
}

const ImageInput: React.FC<ImageInputProps> = ({ onSelect, ImagePicture }) => {
  const { uploadFile, isLoading } = useUpload((url: string) => {
    if (onSelect) {
    console.log(url);
    
      onSelect(url);
    }
  });

  return (
    <Pressable
      onPress={uploadFile}
      style={!ImagePicture && {
        width: 70,
        height: 45,
        borderColor: "rgba(197, 198, 199, 0.35)",
        borderWidth: 1,
        borderRadius: 15,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color="#ffffff" />
      ) :
        ImagePicture ? (
          <ImagePicture />
        ) :
        <ImagePlaceholder />
      }
    </Pressable>
  );
};

export default ImageInput;
