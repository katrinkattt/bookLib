import React, { memo } from "react";
import { StyleSheet, TextInput, ViewStyle } from "react-native";
import { StyleConst } from "../StyleConst";

interface CustomInputProp {
  onChangeText: Function | any,
  value: string,
  placeholder?: string,
  style?: ViewStyle
}
const CustomInput = (
  {
    onChangeText,
    value,
    style,
    placeholder = 'Enter the text'
  }: CustomInputProp) => (
  <TextInput
    multiline
    placeholder={placeholder}
    style={[styles.input, style]}
    value={value}
    onChangeText={onChangeText}
  />
)
export default memo(CustomInput);

const styles = StyleSheet.create({
  input: {
    padding: 20,
    flex: 1,
    color: StyleConst.AccentColor,
    fontSize: 20,
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    marginVertical: 12
  },
})