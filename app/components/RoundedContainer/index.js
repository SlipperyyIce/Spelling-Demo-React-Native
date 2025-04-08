import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { useStores } from '../../stores';

const { width } = Dimensions.get('window');

export const RoundedContainer = ({ children, style }) => {
  const { colorStore } = useStores()
  const { backgroundVarient } = colorStore.colors

  return (
    <View style={[styles.container, { backgroundColor: backgroundVarient }, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: width * 0.9, // 90% of screen width
    borderRadius: 20, // Makes the container rounded
    padding: 16, // Padding inside the container
    alignSelf: 'center', // Centers the container horizontally
  },
});