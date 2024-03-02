import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Book } from '../store/types';
import CustomButton from './CustomButton';
import { useNavigation } from '@react-navigation/native';
import { RoutesNames } from '../navigation/RouteNames';

export const BookCard = ({ book }: { book: Book }) => {
  const navigation = useNavigation();
  const [fullCard, setFullCard] = useState<boolean>(false);

  return (
    <TouchableOpacity onPress={() => setFullCard(!fullCard)} style={styles.shadowBox}>
    <Text style={[styles.textLg, styles.marginBottomMd]}>{book.title}</Text>
    <Text style={[styles.marginBottomMd, styles.textSm]}>
      {book.description}
    </Text>
      {fullCard && (
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          flexGrow: 1,
        }}>
          <View style={{ flexGrow: 0.5, paddingRight: 20 }}>
            <CustomButton
              text='Edit'
              //@ts-ignore
              func={() => navigation.navigate(RoutesNames.EDIT, { item: book })}
            />
          </View>
          <View style={{ flexGrow: 0.5 }}>
            <CustomButton
              text='Read'
              //@ts-ignore
              func={navigation.navigate(RoutesNames.BOOK_DETAILS, { item: book })} />
          </View>


        </View>
      )}
    </TouchableOpacity>
  )
};

const styles = StyleSheet.create({
  shadowBox: {
    marginVertical: 8,
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
  },
  textLg: {
    fontSize: 24,
  },
  textSm: {
    fontSize: 16,
  },
  marginBottomMd: {
    marginBottom: 18,
  },
});
