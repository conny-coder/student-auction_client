import React from "react";
import { Controller } from "react-hook-form";
import { View, Text } from "react-native";
import StyledText from "@/components/ui/StyledText";
import { IAuctionForm } from "@/types/auction.types";

interface LabeledInputFieldProps {
  label: string;
  name: keyof IAuctionForm;
  control: any;
  rules?: object;
  InputComponent: React.ComponentType<any>;
  inputProps?: any;
  containerStyle?: object;
  labelStyle?: object;
  errorStyle?: object;
}

const LabeledInputField: React.FC<LabeledInputFieldProps> = ({
  label,
  name,
  control,
  rules,
  InputComponent,
  inputProps,
  containerStyle,
  labelStyle,
  errorStyle,
}) => {
  return (
    <View style={containerStyle} className="mb-5">
      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View className="flex-row justify-between items-center">
            <StyledText className="text-lg" style={labelStyle}>
              {label}
            </StyledText>
            <InputComponent
              onBlur={onBlur}
              onChangeText={onChange}
              value={value !== undefined ? value.toString() : ""}
              {...inputProps}
            />
            {error && (
              <Text
                style={errorStyle}
                className="absolute top-[2px] right-2 text-[10px] text-red font-openslight"
              >
                {error.message}
              </Text>
            )}
          </View>
        )}
      />
    </View>
  );
};

export default LabeledInputField;
