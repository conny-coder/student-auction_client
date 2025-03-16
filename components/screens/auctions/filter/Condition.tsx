import React, { FC, useState } from "react";
import { View } from "react-native";
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from "react-native-simple-radio-button";

interface IRadioOption {
  value: "new" | "used" | "";
  label: string
}

const radioOptions: IRadioOption[] = [
  {label: "Новий", value: "new"},
  {label: "Б/в", value: "used"},
  {label: "Будь-який", value: ""},
];

interface ConditionProps {
  condition: "new" | "used" | "";
  setCondition: (condition: "new" | "used" | "") => void;
}

const Condition:FC<ConditionProps> = ({condition,setCondition}) => {
  return (
    <View>
      <RadioForm
        formHorizontal={false}
        animation={true}
      >
        {
          radioOptions.map( ( obj, i ) => (
            <RadioButton labelHorizontal={true} key={i} style={{marginBottom: 6, alignItems: "center", paddingBottom: 4, paddingTop: 4}} >
              <RadioButtonInput
                obj={obj}
                index={i}
                isSelected={condition === obj.value}
                onPress={() => setCondition( obj.value )}
                buttonInnerColor={'#006E00'}
                buttonOuterColor={condition === obj.value ? '#006E00' : '#6A6A6B'}
                buttonSize={10}
                buttonOuterSize={20}
                buttonStyle={{borderWidth: 2}}
              />
              <RadioButtonLabel
                obj={obj}
                index={i}
                labelHorizontal={true}
                onPress={() => setCondition( obj.value )}
                labelStyle={{fontFamily: "OpenSans-Regular", fontSize: 14, color: condition === obj.value ? '#ffffff' : '#C5C6C7B3'}}
              />
            </RadioButton>
          ) )
        }
      </RadioForm>
    </View>
  );
};

export default Condition;
