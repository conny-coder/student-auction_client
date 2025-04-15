import React from "react";
import { Text, View } from "react-native";
import { Controller } from "react-hook-form";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import { IAuctionForm } from "@/types/auction.types";
import StyledText from "@/components/ui/StyledText";

interface IRadioOption {
  value: string;
  label: string;
}

interface RadioGroupFieldProps {
  name: keyof IAuctionForm;
  control: any;
  rules?: object;
  label: string;
  options: IRadioOption[];
}

const RadioGroupField: React.FC<RadioGroupFieldProps> = ({ name, control, rules, label, options }) => (
  <View className="mb-5 flex-row justify-between">
    <StyledText className="text-lg">{label}</StyledText>
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <RadioForm formHorizontal animation>
            {options.map((obj, i) => (
              <RadioButton key={i} labelHorizontal style={{ alignItems: "center", marginLeft: 15 }}>
                <RadioButtonInput
                  obj={obj}
                  index={i}
                  isSelected={value === obj.value}
                  onPress={() => onChange(obj.value)}
                  buttonInnerColor="#006E00"
                  buttonOuterColor={value === obj.value ? "#006E00" : "#6A6A6B"}
                  buttonSize={10}
                  buttonOuterSize={20}
                  buttonStyle={{ borderWidth: 2 }}
                />
                <RadioButtonLabel
                  obj={obj}
                  index={i}
                  labelHorizontal
                  onPress={() => onChange(obj.value)}
                  labelStyle={{
                    fontFamily: "OpenSans-Regular",
                    fontSize: 14,
                    color: value === obj.value ? "#ffffff" : "#C5C6C7B3",
                  }}
                />
              </RadioButton>
            ))}
          </RadioForm>
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

export default RadioGroupField;
