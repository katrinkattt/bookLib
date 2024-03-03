import { useNavigation } from "@react-navigation/native";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { EditBookScreenProp } from "./EditBookSreen";

export const BookDetailScreen = ({ route }: EditBookScreenProp) => {

  const { item } = route.params;
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ScrollView>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </ScrollView>

    </View>
  );
}
const styles = StyleSheet.create({
  title: {
    fontSize: 22,
    fontWeight: '700',
    paddingBottom: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: '500'
  }
})