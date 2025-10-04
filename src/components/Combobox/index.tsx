import React from 'react';
import { View } from 'react-native';
import { Picker, PickerProps } from '@react-native-picker/picker';

interface ComboBoxProps<T> extends PickerProps<T> {
  options: { label: string; value: T }[];
  selectedValue: T;
  onValueChange: (itemValue: T, itemIndex: number) => void;
}

const ComboBox = <T extends string | number | boolean>({
  options,
  selectedValue,
  onValueChange,
  ...rest
}: ComboBoxProps<T>) => {
  return (
    <View>
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        {...rest}
      >
        {options.map(option => (
          <Picker.Item
            key={String(option.value)}
            label={option.label}
            value={option.value}
          />
        ))}
      </Picker>
    </View>
  );
};

export default ComboBox;
