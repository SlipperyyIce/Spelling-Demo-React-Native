import React from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import { useStores } from '../../stores';
import { flowers, flowers2 } from '../../assets';


export const ScreenView = ({ children, style, noBg }) => {
  const { colorStore } = useStores()
  const { theme } = colorStore
  const { background } = colorStore.colors

  return (
      <SafeAreaView style={[styles.container, { backgroundColor: background }, style]}>
        {!noBg && <Image source={flowers} style={{height:2000, width:1000, position: 'absolute', resizeMode:"repeat", zIndex: -900, opacity: theme =='light' ? 1: 0}}/>}
        {children}
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16, 
  },
});

