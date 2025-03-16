import React, { FC, useState } from "react";
import { View, TouchableOpacity } from "react-native";
import Checkbox from "expo-checkbox";
import StyledText from "@/components/ui/StyledText";
import {useCategory} from "./useCategory";

interface CategoryProps {
  handlePress: (categories: string) => void
}

const Category:FC<CategoryProps> = ({handlePress}) => {
  const {categories} = useCategory();

  const initialState = Object.fromEntries(
    categories.map( ( category ) => [category.id, false] )
  );

  const [checkedItems, setCheckedItems] = useState<Record<string, boolean>>(initialState);

  const handleToggle = ( id: string ) =>
  {
    setCheckedItems( ( prev ) =>
    {
      const newCheckedItems = {...prev, [id]: !prev[id]};
      handlePress(
        Object.keys( newCheckedItems )
          .filter( ( key ) => newCheckedItems[key] )
          .join( "," )
      );
      return newCheckedItems;
    } );
  };

  return (
    <View>
      {categories.map((category) => {
        const isChecked = checkedItems[category.id];
        const labelText = category.count
          ? `${category.name} (${category.count})`
          : category.name;

        return (
          <TouchableOpacity
            key={category.id}
            className="flex-row items-center mb-2 py-1"
            onPress={() => handleToggle(category.id)}
            activeOpacity={0.7}
          >
            <Checkbox
              value={isChecked}
              onValueChange={() => handleToggle(category.id)}
              color={isChecked ? "#006E00" : "#6A6A6B"}
              className="mr-3 border-primary"
            />
            <StyledText
              className={`text-base`}
              color={isChecked ? "text-primary" : "text-gray-70p"}
            >
              {labelText}
            </StyledText>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default Category;
