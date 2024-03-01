import React, { useCallback, useEffect, useRef, useState } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { RoutesNames } from '../navigation/RouteNames';
import { Book } from '~/store/types';
import { BookCard } from '../components/BookCard';


export const HomeScreen = () => {
  const scrollViewRef = useRef<null | ScrollView>(null);
  const navigation = useNavigation();

  const testBook: Book = {
    id: '13r3d',
    title: 'qererevrvewf wee',
    description: 'This is very interesting book about adventiry in other world',
    file: '',
  };
  const [books, setBooks] = useState<Book[]>([]);

  const getBooks = useCallback(async () => {
    const resp = await axios.get<Book[]>('http://localhost:3333/api');
    setBooks(resp.data);
  }, []);

  useEffect(() => {
    getBooks();
  }, [getBooks]);


  console.log(books, 'BOOOKS');

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          ref={ref => {
            scrollViewRef.current = ref;
          }}
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <View style={styles.section}>
            <Text style={styles.textLg}>Welcome library</Text>
            <Text
              style={[styles.textXL, styles.appTitleText]}
              testID="heading"
              role="heading">
              More Books 📖
            </Text>
            <View style={styles.addContainer}>
              <View style={{ justifyContent: 'center' }}>
                <Text style={[styles.textLg, { color: '#fafafa' }]}>
                  Replenish the library
                </Text>
              </View>

              <TouchableOpacity
                style={styles.whatsNextButton}
                //@ts-ignore
                onPress={() => navigation.navigate(RoutesNames.BOOK_DETAILS)}>
                <Text style={[styles.textMd, styles.textCenter]}>Add book</Text>
              </TouchableOpacity>
            </View>
            <BookCard book={testBook} />
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
  monospace: {
    color: '#ffffff',
    fontFamily: 'Courier New',
    marginVertical: 4,
  },
  comment: {
    color: '#cccccc',
  },
  marginBottomMd: {
    marginBottom: 18,
  },
  marginBottomLg: {
    marginBottom: 24,
  },
  textLight: {
    fontWeight: '300',
  },
  textCenter: {
    textAlign: 'center',
  },
  textXS: {
    fontSize: 14,
  },
  textSm: {
    fontSize: 16,
  },
  textMd: {
    fontSize: 18,
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
  shadowBox: {
    backgroundColor: 'white',
    borderRadius: 24,
    shadowColor: 'black',
    shadowOpacity: 0.15,
    shadowOffset: {
      width: 1,
      height: 4,
    },
    shadowRadius: 12,
    padding: 24,
    marginBottom: 24,
  },
  listItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  listItemTextContainer: {
    marginLeft: 12,
    flex: 1,
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
  },
  whatsNextButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 8,
    width: 150,
  },
});


