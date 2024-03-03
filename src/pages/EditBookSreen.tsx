import { useCallback, useEffect, useState } from "react";
import { View, Text, StyleSheet, Modal } from "react-native";
import axios from "axios";
import { useNavigation } from '@react-navigation/native';
import CustomButton from "../components/CustomButton";
import CustomInput from "../components/CustomInput";
import { Book } from "../store/types";
import { StyleConst } from "../StyleConst";
import { API_BASE_URL, editBook, delBook } from "../apiClient/ConstAPI";
import { ModalCard } from "../components/ModalCard";

export interface EditBookScreenProp {
  route: {
    params: {
      item: Book;
    }
  }
}

export const EditBookScreen = ({ route }: EditBookScreenProp) => {
  const navigation = useNavigation();
  const { item } = route.params;
  const [title, setTitle] = useState<string>(item.title);
  const [description, setDescription] = useState<string>(item.description);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [err, setErr] = useState<string>('');
  const [isReadyForSend, setIsReadyForSend] = useState<boolean>(false);
  const [mode, setMode] = useState<'del' | 'edit'>('edit')

  useEffect(() => {
    if (title !== '' && description !== '') {
      setErr('');
      setIsReadyForSend(true);
    } else {
      setIsReadyForSend(false);
    }
  }, [title, description]);

  const preEditedBook = () => {
    if (isReadyForSend) {
      bookEdit({ title, description });
    } else {
      setErr('Not all fields are filled in');
    }
  };

  const bookEdit = useCallback(async ({ title, description }: Book) => {
    setMode('edit');
    setErr('');
    const data = {
      id: item.id,
      title: title,
      description: description,
    };

    await axios.post(API_BASE_URL + editBook, {
      ...data
    }).then(res => {
      if (res?.status === 201 || res?.status === 200) {
        // авто рефреш здесь не вызывается, но может быть вызван loadBooks
        // для наглядности изменений на главной
        // поэтому обновление контента смотреть на странице Library
        setErr('');
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
        }, 1500)
      }
    }).catch((e) => {
      console.log('ERRORRR', e);
      setErr('Error connected')
    });
  }, []);

  const bookDelete = useCallback(async () => {
    setMode('del')
    await axios.post(API_BASE_URL + delBook, {
      id: item.id
    }).then(res => {
      console.log('RES', res);

      if (res?.status === 201 || res?.status === 200) {
        setModalVisible(true);
        setTimeout(() => {
          setModalVisible(false);
          navigation.goBack();
        }, 1500)
      }
    }).catch((e) => {
      console.log('ERR', e);
      setErr('Error connected');
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
        <ModalCard
          text={mode == 'edit' ? 'This book success edited' : 'This book delted'}
          collor={mode == 'edit' ? '' : StyleConst.ErrorColor} />
      </Modal>
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
            func={bookDelete}
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
      <Text style={{ color: StyleConst.ErrorColor, fontSize: 18 }}>
        {err}
      </Text>
      <CustomButton
        text="Edit"
        //@ts-ignore
        func={preEditedBook}
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