import React from "react";
import { Controller } from "react-hook-form";
import { Text, View } from "react-native";
import { IAuctionForm } from "@/types/auction.types";

interface FormFieldProps {
  name: keyof IAuctionForm;
  control: any;
  rules?: object;
  InputComponent: React.ComponentType<any>;
  inputProps?: any;
}

const FormField: React.FC<FormFieldProps> = ({ name, control, rules, InputComponent, inputProps }) => (
  <View className="mb-5">
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <>
          <InputComponent
            onBlur={onBlur}
            onChangeText={onChange}
            value={value?.toString()}
            {...inputProps}
          />
          {error && (
            <Text className="absolute top-[2px] right-2 text-[10px] text-red font-openslight">
              {error.message}
            </Text>
          )}
        </>
      )}
    />
  </View>
);

export default FormField;
