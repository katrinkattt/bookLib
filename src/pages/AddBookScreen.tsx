import { useCallback, useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

import axios from "axios";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";

export const AddBookScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const addBooks = useCallback(async () => {
    console.log(title + ':' + description);

    if (title !== '' && description !== '') {
      await axios.post('http://localhost:3333/api', {
        title: title,
        description: description,
        file: ''
      });
    }


  }, []);

  return (
    <View style={styles.container}>
      <Text style={{ color: 'black', fontSize: 25 }}>
        The book title
      </Text>

      <CustomInput
        value={title}
        onChangeText={setTitle}
        placeholder="Book title"
      />
      <Text style={{ color: 'black', fontSize: 25 }}>
        Enter description book
      </Text>
      <CustomInput
        value={description}
        onChangeText={setDescription}
        placeholder="Book description, short story"
        style={{ flex: 2 }}
      />
      <CustomButton
        text="Add book"
        func={addBooks}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00a3fs',
    padding: 20,
    flexDirection: 'column'
  },
})