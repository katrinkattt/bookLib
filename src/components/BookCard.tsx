import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Book } from '../store/types';

export const BookCard = ({ book }: { book: Book }) => (
  <View style={styles.shadowBox}>
    <Text style={[styles.textLg, styles.marginBottomMd]}>{book.title}</Text>
    <Text style={[styles.marginBottomMd, styles.textSm]}>
      {book.description}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  shadowBox: {
    marginVertical: 24,
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
