import React from 'react';
import { Text as TextBox, StyleSheet } from 'react-native';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';


export const Text = observer(({ children, color ,fontSize = 25, fontWeight,style }) => {
    const { colorStore } = useStores()
    const { text } = colorStore.colors
  
    return (
        <TextBox style={[styles.text, { color: color ?? text, fontSize, fontWeight }, style]}>
        {children}
        </TextBox>
    );
});

const styles = StyleSheet.create({
    text: {
        fontFamily: "Chewy_400Regular",
        fontWeight: 'normal',
    },
});

