import React, { memo } from "react";
import { StyleSheet, TouchableOpacity, Text } from "react-native";
import { StyleConst } from "../StyleConst";

interface CustomButtonProp {
  func: () => {},
  text: string,
  color?: string,
  textColor?: string,
}
const CustomButton = (prop: CustomButtonProp) => (
  <TouchableOpacity
    onPress={prop.func}
    style={[
      styles.button,
      { backgroundColor: prop.color ? prop.color : StyleConst.AccentColor }
    ]}
  >
    <Text style={[
      styles.textButton,
      { color: prop.textColor ? prop.textColor : StyleConst.MainColor }
    ]}
    >
      {prop.text}
    </Text>
  </TouchableOpacity>
)
export default memo(CustomButton);

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    backgroundColor: StyleConst.AccentColor,
    padding: 18,
    width: '100%'
  },
  textButton: {
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center'
  },
})