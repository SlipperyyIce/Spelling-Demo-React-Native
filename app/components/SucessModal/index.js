import React, { useState, forwardRef, useImperativeHandle } from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity, Vibration } from 'react-native';
import { CheckCircleIcon, XMarkIcon } from "react-native-heroicons/solid"; 
import * as Haptics from 'expo-haptics';
import { useStores } from '../../stores';
import { colors } from '../../constants/colors';
import { Audio } from 'expo-av';
import { observer } from 'mobx-react';


const SuccessModalContent = forwardRef(({forceInvisible, showAnswer=true}, ref) => {

  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [hidePrefix, setHidePrefix] = useState(false);

  const {colorStore, dataStore} = useStores();
  const {green, red} = colors;

  const correctSound = new Audio.Sound();
  const incorrectSound = new Audio.Sound();

  useImperativeHandle(ref, () => ({
    open: async (isCorrect, answer, hidePre = false) => {
      setIsVisible(true);
      setIsCorrect(isCorrect);
      setMessage(answer);
      setHidePrefix(hidePre)

      if (isCorrect) {
        await correctSound.loadAsync(require('../../assets/sounds/correct.mp3'));
        if(dataStore.soundEffectsOn) await correctSound.playAsync();
        if(dataStore.vibrationsOn) Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); 
      } else {
        await incorrectSound.loadAsync(require('../../assets/sounds/incorrect.mp3'));
        if(dataStore.soundEffectsOn) await incorrectSound.playAsync();
      }

      setTimeout(() => {
        setIsVisible(false);
        correctSound.unloadAsync();
        incorrectSound.unloadAsync();
      }, 1000);
    },
    close: () => setIsVisible(false),
  }));

  return (
    <Modal
      visible={forceInvisible ? false : isVisible}
      animationType={isVisible ? "slide" : 'fade'}
      transparent={true}
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          {isCorrect ? (
            <CheckCircleIcon size={40} color={green} style={{marginHorizontal: 50}}/>
          ) : (
            <XMarkIcon size={40} color={red} />
          )}
          
          <Text style={[styles.successText,isCorrect ? {color:green } : {color :red}]}>{isCorrect ? 'Correct!' : 'Oops!'}</Text>
          {showAnswer && <Text style={styles.messageText}>{hidePrefix ? '': 'Answer: '}{message}</Text>}
        </View>
      </View>
    </Modal>
  );
});

export const SuccessModal = observer(SuccessModalContent);

const styles = StyleSheet.create({
  modalBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
    marginBottom: 10,
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#4CAF50', // Green color for close button
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});