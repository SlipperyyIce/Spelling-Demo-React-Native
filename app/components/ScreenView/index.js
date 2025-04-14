import React from 'react';
import { View, StyleSheet, SafeAreaView, ImageBackground, Image } from 'react-native';
import { useStores } from '../../stores';
import { flowers, flowers2 } from '../../assets';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';


export const ScreenView = ({ children, style, noBg }) => {
  const { colorStore } = useStores()
  const { theme } = colorStore
  const { background } = colorStore.colors

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={[styles.container, { backgroundColor: background }, style]}>
        {!noBg && <Image source={flowers} style={{height:2400, width:1200, position: 'absolute', resizeMode:"cover", opacity: theme =='light' ? 1: 0}}/>}
        {children}
      </SafeAreaView>
    </BottomSheetModalProvider>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    padding: 16, 
  },
});

