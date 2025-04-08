import React, { useState, forwardRef, useImperativeHandle, useEffect } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableOpacity, Vibration } from 'react-native';
import { CheckCircleIcon, XMarkIcon } from "react-native-heroicons/solid"; 
import Icon from 'react-native-vector-icons/AntDesign';
import { useStores } from '../../stores';
import { colors } from '../../constants/colors';
import { Audio } from 'expo-av';
import { Button } from '../Button';
import { Text } from '../Text';

export const AlertModal = forwardRef(({ forceInvisible, callback, star=true }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState('placeholder');
  const [title, setTitle] = useState('Alert');
  const scaleAnim = useState(new Animated.Value(0))[0];

  useImperativeHandle(ref, () => ({
    open: (newTitle, newMessage) => {
      setIsVisible(true);
      setMessage(newMessage);
      setTitle(newTitle);
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 5,
        useNativeDriver: true,
      }).start();
    },
    close: () => setIsVisible(false),
  }));

  return (
    <Modal
      visible={forceInvisible ? false : isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          {star && (
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <Icon name="star" size={60} color={colors.primary} />
            </Animated.View>
          )}
          <Text color={colors.black} style={styles.successText}>{title}</Text>
          <Text color={colors.black}  style={[styles.messageText, {marginVertical: 10}]}>{message}</Text>
          <Button backgroundColor={'black'} onPress={() => {setIsVisible(false), callback?.()}}>
            <Text color={colors.white}  style={styles.messageText}>Continue</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
});

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Faded black background
  },
  modalContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  successText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  messageText: {
    fontSize: 16,
  },
});
