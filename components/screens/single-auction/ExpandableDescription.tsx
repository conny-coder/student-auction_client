import React, { useState } from "react";
import { View, Pressable } from "react-native";
import StyledText from "@/components/ui/StyledText";
import DescrArrowIcon from "@/components/icons/DescrArrowIcon";

interface ExpandableDescriptionProps {
  description: string;
  collapsedHeight?: number; 
}

const ExpandableDescription: React.FC<ExpandableDescriptionProps> = ({
  description,
  collapsedHeight = 100,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <View className="mb-4">
      <View style={expanded ? {} : { maxHeight: collapsedHeight, overflow: "hidden" }}>
        <StyledText color="text-gray-70p" className="text-base mb-3">
          {description}
        </StyledText>
      </View>
      <Pressable onPress={() => setExpanded(prev => !prev)} className="flex-row justify-center">
        <View className="py-1" style={{ transform: [{ rotate: expanded ? "180deg" : "0deg" }] }}>
          <DescrArrowIcon />
        </View>
      </Pressable>
    </View>
  );
};

export default ExpandableDescription;
