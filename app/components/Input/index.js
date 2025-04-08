import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { useStores } from '../../stores'; 

export const Input = ({ value, onChangeText, placeholder, fontSize = 20, autoCorrect = true, style, disableKeyboard = false, autoFocus = false, handleSubmit, fontChewy=false }) => {
  const { colorStore } = useStores();
  const { text, textDimmed } = colorStore.colors; 
  
  return (
    <TextInput 
      value={value} // Prefilled value
      onChangeText={onChangeText} // Handle changes
      placeholder={placeholder} // Placeholder text
      placeholderTextColor={textDimmed} // Grey color for placeholder text
      style={[styles.input, { color: text, fontSize, fontFamily: fontChewy ? 'Chewy_400Regular' : 'Arial' }, style]} // Dynamic styling
      autoCorrect={autoCorrect} // Disable spell check
      //autoCapitalize="none" // Prevent auto-capitalization
      spellCheck={false} // Disable spell check
      keyboardType="email-address" // Standard keyboard
      secureTextEntry={false}
      textContentType="none"
      returnKeyType="done"
      selectTextOnFocus={true}
      autoFocus={autoFocus} // Automatically focus the input if true
      blurOnSubmit={false} 
      onSubmitEditing={()=>{handleSubmit?.()}} // Run function on submit
    />
  );
};

const styles = StyleSheet.create({
  input: {
    paddingVertical: 12,
  },
});