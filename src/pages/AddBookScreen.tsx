import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal, ScrollView } from "react-native";
import axios from "axios";
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { StyleConst } from "../StyleConst";
import { ModalCard } from "../components/ModalCard";
import { API_BASE_URL, addBook } from "../apiClient/ConstAPI";
import { Book } from "../store/types";

export const AddBookScreen = () => {
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [isReadyForSend, setIsReadyForSend] = useState<boolean>(false);

  useEffect(() => {
    if (title !== '' && description !== '') {
      setErr('');
      setIsReadyForSend(true);
    } else {
      setIsReadyForSend(false);
    }
  }, [title, description]);

  const preAddBook = () => {
    if (isReadyForSend) {
      bookAdd({ title, description });
    } else {
      setErr('Not all fields are filled in');
    }
  };

  const bookAdd = useCallback(async ({ title, description }: Book) => {
    const data = {
      title: title,
      description: description,
      file: '', // if have file reader
    };
    await axios.post(API_BASE_URL + addBook, {
      ...data
    }).then(res => {
      if (res?.status === 201 || res?.status === 200) {
        // авто рефреш здесь не вызывается, но может быть вызван loadBooks
        // для наглядности изменений на главной
        // поэтому обновление контента смотреть на странице Library
        setErr('');
        setModalVisible(true);
        setTimeout(() => {
          setTitle('');
          setDescription('');
          setModalVisible(false);
        }, 1500)
      }
    }).catch(() => {
      setErr('Error connected')
    });
  }, []);

  return (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalCard text='This book success add' />
      </Modal>
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
      <View style={{ height: 30 }}>
      </View>
      <Text style={{ color: StyleConst.ErrorColor, fontSize: 18 }}>
        {err}
      </Text>
      <CustomButton
        text="Add book"
        //@ts-ignore
        func={preAddBook}
        color={isReadyForSend ? StyleConst.AccentColor : StyleConst.NoActiveColor}
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