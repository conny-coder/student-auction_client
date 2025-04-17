import React, { useState, useRef } from "react";
import { View, Text, Pressable, LayoutChangeEvent, ScrollView } from "react-native";
import StyledText from "./StyledText";

export interface ISelectItem {
  label: string;
  value: string;
}

interface CustomSelectProps {
  items: ISelectItem[];
  selectedValue: string;
  onValueChange: (value: string) => void;
  placeholder?: string;
}

const CustomSelect: React.FC<CustomSelectProps> = ({
  items,
  selectedValue,
  onValueChange,
  placeholder = "Виберіть категорію",
}) => {
  const [expanded, setExpanded] = useState(false);
  const [dropdownTop, setDropdownTop] = useState(0);

  const containerRef = useRef<View>(null);

  const onLayoutContainer = (event: LayoutChangeEvent) => {
    const { height } = event.nativeEvent.layout;
    setDropdownTop(height);
  };

  const selectedItem = items.find((item) => item.value === selectedValue);

  const handleSelect = (value: string) => {
    onValueChange(value);
    setExpanded(false);
  };

  return (
    <View className="relative" style={{ width: 230 }}>
      <Pressable
        ref={containerRef}
        onLayout={onLayoutContainer}
        onPress={() => setExpanded((prev) => !prev)}
        style={{ width: 230, borderRadius: 8, borderWidth: 1, borderColor: "rgba(197, 198, 199, 0.35)" }}
        className="
          flex-row
          justify-between
          items-center
          px-4
          py-3
          border
          border-gray-50p
          rounded-md
        "
      >
        <StyledText className="text-bas">
          {selectedItem ? selectedItem.label : placeholder}
        </StyledText>
        <StyledText className="text-base">▼</StyledText>
      </Pressable>

      {expanded && (
        <View
          className="absolute left-0 right-0 z-10"
          style={{ top: dropdownTop}}
        >
          <ScrollView
            style={{
              maxHeight: 120,
            }}
            nestedScrollEnabled={true}
          >
            <View
              style={{
                backgroundColor: "#292B2D",
              }}
              className="border border-gray-500 rounded-md"
            >
              {items.map( ( item ) => (
                <Pressable
                  key={item.value}
                  onPress={() => handleSelect( item.value )}
                  className="py-3 px-4 border-b border-gray-600 last:border-0"
                >
                  <Text className="text-base text-gray-200">
                    {item.label}
                  </Text>
                </Pressable>
              ) )}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CustomSelect;
