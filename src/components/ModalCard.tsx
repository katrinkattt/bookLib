import { Text, View } from "react-native";
import { StyleConst } from "../StyleConst";

export const ModalCard = (
  { text, collor = StyleConst.AccentColor }
    : { text: string, collor?: string }) => (
  <View style={{
    position: 'absolute',
    top: '30%',
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderColor: collor,
    borderRadius: 20,
    borderWidth: 3,
    width: 250,
    height: 150,
    alignItems: 'center',
    justifyContent: 'center',
  }} >
    <Text style={{ color: collor, fontSize: 23, textAlign: 'center' }}>
      {text}
    </Text>
  </View>
)
