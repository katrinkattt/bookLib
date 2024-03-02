import { useCallback, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { Book } from "../store/types";
import { StyleConst } from "../StyleConst";
import useAppDispatch from "../hooks/useAppDispatch";
import { bookEdit } from "../store/actions";



interface EditBookScreenProp {
  route: {
    params: {
      item: Book;
    }
  }
}

export const EditBookScreen = ({ route }: EditBookScreenProp) => {
  const dispatch = useAppDispatch();
  const { item } = route.params;
  const [title, setTitle] = useState<string>(item.title);
  const [description, setDescription] = useState<string>(item.description);

  console.log('IDDD', item.id);

  const editBook = useCallback(async () => {
    console.log('editBook async');

    if (title !== '' && description !== '') {
      await axios.post('http://localhost:3333/editBook', {
        id: item.id,
        title: title,
        description: description,
      });
    }


  }, []);

  // const editBookRequest = () => {
  //   const data: Book = {
  //     title: title,
  //     description: description,
  //     id: item.id,
  //   };
  //   dispatch(bookEdit({
  //     data,
  //     onSuccess: () => {
  //       console.log('GOOD');
  //     },
  //     onError: async (e) => {
  //       console.log(e, 'ERR');
  //     },
  //   }))
  // }

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexGrow: 0.2,
      }}>
        <View style={{ flexGrow: 0.5 }}>
          <Text style={{ color: 'black', fontSize: 25 }}>
            Edit
          </Text>
        </View>
        <View style={{ flexGrow: 0.5 }}>
          <CustomButton
            text="Delte"
            func={() => { }}
            color={StyleConst.ErrorColor}
          />
        </View>
      </View>
      <Text style={{ color: 'black', fontSize: 22 }}>
        Book title
      </Text>
      <CustomInput
        value={title}
        onChangeText={setTitle}
        placeholder="Book title"
      />
      <Text style={{ color: 'black', fontSize: 22 }}>
        Description book
      </Text>
      <CustomInput
        value={description}
        onChangeText={setDescription}
        placeholder="Book description, short story"
        style={{ flex: 2 }}
      />

      <CustomButton
        text="Edit"
        func={editBook}
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