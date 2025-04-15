import React from "react";
import { Pressable, Image, ActivityIndicator, Text } from "react-native";
import ImagePlaceholder from "../icons/ImagePlaceholder";
import { useUpload } from "@/hooks/useUpload";
import { getFileUrl } from "@/config/api.config";

interface ImageInputProps {
  onSelect?: (url: string) => void;
}

const ImageInput: React.FC<ImageInputProps> = ({ onSelect }) => {
  const { uploadFile, isLoading } = useUpload((url: string) => {
    if (onSelect) {
      onSelect(getFileUrl(url));
    }
  });

  return (
    <Pressable
      onPress={uploadFile}
      style={{
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
        <ImagePlaceholder />
      }
    </Pressable>
  );
};

export default ImageInput;
