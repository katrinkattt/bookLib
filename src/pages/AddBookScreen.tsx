import { useCallback, useState } from "react";
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from "react-native";
import { StyleConst } from "../StyleConst";
import axios from "axios";

export const AddBookScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const addBooks = useCallback(async () => {
    if (title !== '' && description !== '') {
      await axios.post('http://localhost:3333/api', {
        title: title,
        description: description,
        file: ''
      });
    }


  }, []);

  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#00a3fs',
      padding: 20
    }}>
      <Text style={{ color: 'black', fontSize: 25 }}>
        The book title
      </Text>
      <TextInput
        multiline
        placeholder={'Book title'}
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        numberOfLines={1}
      />
      <Text style={{ color: 'black', fontSize: 25 }}>
        Enter description book
      </Text>
      <TextInput
        multiline
        placeholder={'Book description, short story'}
        style={[styles.input, { height: 160 }]}
        value={description}
        onChangeText={setDescription}
        numberOfLines={7}
      />
      <TouchableOpacity
        onPress={addBooks}
        style={styles.button}>
        <Text style={styles.textButton}>
          Add book
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 20,
    flex: 1,
    color: 'green',
    fontSize: 20,
    width: 350,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: 'black',
    shadowOpacity: 0.15,
  },
  button: {
    borderRadius: 12,
    backgroundColor: StyleConst.AccentColor,
    padding: 18,
    marginTop: 24,
  },
  textButton: {
    fontSize: 22,
    color: StyleConst.MainColor,
  },
})