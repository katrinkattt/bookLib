import React from 'react';
import { Image, View, StyleSheet } from 'react-native';

interface IconProps {
  color?: string;
  height?: number;
}

export const IconBooks = ({ color = '#aaa', height = 48 }: IconProps) => (
  <View>
    <Image
      style={[styles.icon, { tintColor: color, height: height }]}
      source={require('../assets/books.png')}
    />
  </View>
);
export const IconAdd = ({ color = '#aaa', height = 48 }: IconProps) => (
  <View>
    <Image
      style={[styles.icon, { tintColor: color, height: height }]}
      source={require('../assets/edit.png')}
    />
  </View>
);

const styles = StyleSheet.create({
  icon: {
    aspectRatio: 0.5,
    resizeMode: 'contain',
  },
});

