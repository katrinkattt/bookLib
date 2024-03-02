import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { RoutesNames } from '../navigation/RouteNames';
import { Book } from '~/store/types';
import { BookCard } from '../components/BookCard';
import CustomButton from '../components/CustomButton';
import { StyleConst } from '../StyleConst';
import { useAppDispatch } from '../hooks/redux';
import { loadBooks } from '../store/actions';
import { useSelector } from 'react-redux';
import { getBooks } from '../store/selectors';


export const HomeScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const { books } = useSelector(getBooks);

  const scrollViewRef = useRef<null | ScrollView>(null);
  const [bookArr, setBookArr] = useState<Book[]>([]);

  useEffect(() => {
    dataLoad();
  }, []);

  const dataLoad = () => {
    dispatch(loadBooks({
      onSuccess: () => {
        console.log('GOOD');
        setBookArr(books)
      },
      onError: async (e) => {
        console.log(e, 'ERR');
      },
    }))
  }
  // ИЛИ ТАК
  // const getBooks = useCallback(async () => {
  //   const resp = await axios.get<Book[]>('http://localhost:3333/api');
  //   setBook(resp.data);
  // }, []);


  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          ref={ref => {
            scrollViewRef.current = ref;
          }}
          style={styles.scrollView}
        >
          <View style={styles.section}>
            <Text style={styles.textLg}>Welcome library</Text>
            <Text
              style={[styles.textXL, styles.appTitleText]}
              testID="heading"
              role="heading">
              More Books 📖
            </Text>
            <View style={styles.addContainer}>
              <View style={{ justifyContent: 'center', flexGrow: 0.6, }}>
                <Text style={[styles.textLg, { color: '#fafafa' }]}>
                  Replenish the library
                </Text>
              </View>
              <View style={{ flexGrow: 0.4, }}>
                <CustomButton
                  text='Add book'
                  color='#ffffff'
                  textColor={StyleConst.AccentColor}
              //@ts-ignore
                  func={() => navigation.navigate(RoutesNames.ADD_BOOK)}
                />
              </View>
            </View>
            {bookArr.length > 1 ? books.map(book => (
              <BookCard key={book?.id} book={book} />
            )) : (
              <View style={styles.container}>
                <Text style={styles.textLg}>not found</Text>
              </View>

            )}
          </View>
        </ScrollView>
      </SafeAreaView >
    </>
  );
};
const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: '#ffffff',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
  },
  textLg: {
    fontSize: 22,
  },
  textXL: {
    fontSize: 48,
  },
  textContainer: {
    marginVertical: 12,
  },
  section: {
    marginVertical: 24,
    marginHorizontal: 12,
  },
  appTitleText: {
    paddingTop: 12,
    fontWeight: '500',
  },
  addContainer: {
    borderRadius: 12,
    backgroundColor: '#143055',
    padding: 18,
    marginBottom: 24,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 1,
  },
});


