import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { View, StyleSheet, Animated, Easing, Platform, TouchableOpacity } from 'react-native';
import { PlayIcon, PauseIcon } from 'react-native-heroicons/solid';
import { RoundedContainer } from '../RoundedContainer';
import { Text } from '../Text';
import { Button } from '../Button';
import { Input } from '../Input';
import * as Speech from 'expo-speech';
import { colors } from '../../constants/colors';
import { ttsSettings } from '../../constants/tts';
import { XCircleIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { useStores } from '../../stores';
import { enableSound } from '../../lib/helper';


export const SpellWord = forwardRef(({ question, upcomingQuestion, answer = "", setAnswer, muted = false, submitCallback,custom, multipleChoice=false }, ref) => {
  const {colorStore, dataStore} = useStores()
  const {background} = colorStore.colors

  const getMaskedMessage = (question) => {
    //const maskMessage = 'Spell ' + "_".repeat(question?.answer?.length) + '. ' + question?.mask_message;
    const maskMessage = question?.mask_message ? question?.mask_message : 'Spell ' + "_".repeat(question?.answer?.length);
    return maskMessage
  };
  
  const getSpeakMessage = (question) => {
    return !dataStore.ttsSpeakSentence ? ('Spell ' + question?.answer) : ('Spell ' + question?.answer + ' ' +question?.message);
  };

  useEffect(() => {
    
    enableSound();
  },[question]);
  
  const slideOutAnim = useRef(new Animated.Value(0)).current;
  const fadeOutAnim = useRef(new Animated.Value(1)).current;
  const slideInAnim = useRef(new Animated.Value(300)).current;
  const fadeInAnim = useRef(new Animated.Value(0)).current;

  const speak = (text) => {
    if (!muted) {
      enableSound();
      setTimeout(()=>Speech.speak(text, ttsSettings),300);
    }
  };

  const stop = () => {
    Speech.stop();
  };

  const handleTransition = () => {
    Animated.parallel([
      Animated.timing(slideOutAnim, {
        toValue: -300,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideInAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.quad),
        useNativeDriver: true,
      }),
      Animated.timing(fadeInAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      slideOutAnim.setValue(0);
      fadeOutAnim.setValue(1);
      slideInAnim.setValue(300);
      fadeInAnim.setValue(0);
    });
  };

  useImperativeHandle(ref, () => ({
    triggerTransition: handleTransition,
    stop: stop,
  }));

  const clearInput = () => {
    setAnswer('')
  }

  useEffect(() => { if(question?.answer) speak('Spell ' + question?.answer + ' ' + question?.message) }, [question]);
  return (
    <View style={styles.container}>
      {!multipleChoice && <RoundedContainer style={styles.containerMargin}>
        <Text fontSize={25}>Spell the word you heard:</Text>
        <View>
          <Input
            disableKeyboard={true}
            value={answer}
            placeholder={'Enter the word'}
            autoCorrect={false}
            autoFocus={true}
            handleSubmit={submitCallback}
            onChangeText={setAnswer}
          />
          <TouchableOpacity style={{ position: 'absolute', right: 0, top: 10 }} onPress={clearInput}>
            <XMarkIcon size={30} color={colors.red}/>
          </TouchableOpacity>
        </View>
      </RoundedContainer>
      }

      <View>
        {/* First container */}
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{ translateX: slideOutAnim }],
              opacity: fadeOutAnim,
            },
          ]}
        >
          <RoundedContainer>
            <Text>{getMaskedMessage(question, custom)}</Text>
            <View style={styles.buttonContainer}>
              <Button backgroundColor={colors.yellow} onPress={() => speak(getSpeakMessage(question, custom))} style={styles.button}>
                <PlayIcon size={24} color="#fff" />
              </Button>
              <Button backgroundColor={colors.yellow} onPress={stop}>
                <PauseIcon size={24} color="#fff" />
              </Button>
            </View>
          </RoundedContainer>
        </Animated.View>

        {/* Second container */}
        <Animated.View
          style={[
            styles.animatedContainer,
            {
              transform: [{ translateX: slideInAnim }],
              opacity: fadeInAnim,
            },
          ]}
        >
          <RoundedContainer>
            <Text>{getMaskedMessage(upcomingQuestion, custom)}</Text>
            <View style={styles.buttonContainer}>
              <Button
                onPress={() => speak(getSpeakMessage(upcomingQuestion, custom))}
                style={styles.button}
                backgroundColor={colors.yellow}
              >
                <PlayIcon size={24} color="#fff" />
              </Button>
              <Button onPress={stop} backgroundColor={colors.yellow}>
                <PauseIcon size={24} color="#fff" />
              </Button>
            </View>
          </RoundedContainer>
        </Animated.View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 10,
  },
  containerMargin: {
    marginVertical: 20,
  },
  animatedContainer: {
    width: '100%',
    position: 'absolute',
    transform: [{ translateY: -500 }],
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: 10,
    marginTop:10
  },
  button: {
    marginRight: 10,
  },
});