import React from 'react';
import { TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native';
import { useStores } from '../../stores';

export const Button = ({ children, onPress, backgroundColor, style, disabled= false }) => {
  const { colorStore } = useStores();
  const { primary, disabledColor } = colorStore.colors;

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { opacity: disabled ? 0.6 : 1, backgroundColor },
        style,
      ]}
      onPress={disabled ? null : onPress}
      activeOpacity={0.8}
      disabled={disabled}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25, // Makes the button rounded
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
