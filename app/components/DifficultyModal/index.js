import React, { useState, useEffect, forwardRef, useImperativeHandle, useRef } from 'react';
import { Modal, View, StyleSheet, Animated, TouchableOpacity, Dimensions } from 'react-native';
import { useStores } from '../../stores';
import { colors } from '../../constants/colors';
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';
import { Text } from '../Text';
import { Button } from '../Button';

const height = (Dimensions.get('window').height)


export const DifficultyModal = forwardRef(({ routeOrigin,}, ref) => {
  const {colorStore, dataStore} =useStores()
  const navigation = useNavigation();
  
  
  const{ background,primary,text,textDimmed, black} = colorStore.colors
  const styles = useStyles()
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(100)).current;
  const [buffVis, setBufferVisibilty] = useState(false)
  const [hide, setHide] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [route, setRoute] = useState(routeOrigin)
  const [scoreType, setScoreType] = useState('')

  useEffect(() => {
    setTimeout(()=>setHide(true),300)
  }, []);

  const callback = (difficulty) => {
    navigation.navigate(route, {difficulty})
  }

  useEffect(() => {
    if (isVisible) {
    slideAnim.setValue(100);
    fadeAnim.setValue(0);
    
    Animated.parallel([
        Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
        }),
    ]).start();
    } else {

    Animated.parallel([
        Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
        toValue: 100,
        duration: 200,
        useNativeDriver: true,
        }),
    ]).start();
    setBufferVisibilty(true)
    setTimeout(()=> setBufferVisibilty(false), 200)
    }
  }, [isVisible]);

  useImperativeHandle(ref, () => ({
    open: (route, type) => {
      if (!isVisible) {
        setIsVisible(true);
        setRoute(route)
        setScoreType(type)
      }
    },
    close: () => setIsVisible(false),
  }));

  return (
    <Modal
    animationType="none"
    transparent
    visible={isVisible || buffVis}
    onRequestClose={()=>setIsVisible(false)}
    >
    <Animated.View 
        style={[
        styles.overlay,
        {
            opacity: fadeAnim,
        }
        ]}
    >
        <TouchableOpacity
        style={styles.overlayTouch}
        activeOpacity={1}
        onPress={()=>setIsVisible(false)}
        />
    </Animated.View>
    <View style={styles.centering}>
      <Animated.View
          style={[
          //styles.modalContent,
          {
              height: 'auto',
              transform: [
              {
                  translateY: slideAnim.interpolate({
                  inputRange: [0, 100],
                  outputRange: [0, 500],
                  }),
              },
              ],
          },
          ]}
        >
          { hide &&<View>
            <View style={[styles.modalContent, { backgroundColor: background }]}>
                <TouchableOpacity onPress={()=> setIsVisible(false)} style={{position:'absolute', top: 19, right: 20}}>
                  <XMarkIcon color={text}/>
                </TouchableOpacity>
                <Text style={[styles.previousScoreValue, { color: text }]}>
                  Select Difficulty
                </Text>
                <View style={{gap: 10, marginTop: 15}}>
                  <Button
                    onPress={() => {
                      setIsVisible(false); callback?.('easy');
                    }}
                    style={[styles.difButton, { backgroundColor: primary }]}
                  >
                    <Text fontWeight={'bold'} fontSize={18} style={{color: black}}>Easy</Text>
                    {dataStore?.highscores?.[scoreType+ 'easy'] && <Text  fontSize={14} style={{color: black}}>Highscore: {dataStore?.highscores?.[scoreType+ 'easy']}</Text>}
                  </Button>
                  <Button
                    onPress={() => {
                      setIsVisible(false); callback?.('medium');
                    }}
                    style={[styles.difButton, { backgroundColor: primary }]}
                  >
                    <Text fontWeight={'bold'} fontSize={18} style={{color: black}}>Medium</Text>
                    {dataStore?.highscores?.[scoreType+ 'medium'] && <Text  fontSize={14} style={{color: black}}>Highscore: {dataStore?.highscores?.[scoreType+ 'medium']}</Text>}
                  </Button>
                  <Button
                    onPress={() => {
                      setIsVisible(false); callback?.('hard');
                    }}
                    style={[styles.difButton, { backgroundColor: primary }]}
                  >
                    <Text fontWeight={'bold'} fontSize={18} style={{color: black}}>Hard</Text>
                    {dataStore?.highscores?.[scoreType+ 'hard'] && <Text  fontSize={14} style={{color: black}}>Highscore: {dataStore?.highscores?.[scoreType+ 'easy']}</Text>}
                  </Button>
              </View>
            </View>
          </View>}
        </Animated.View>
      </View>
    </Modal>
  );
});


const useStyles = () => { 
  const { colorStore } = useStores();
  const { background, backgroundVarient, text, textDimmed} = colorStore.colors;
  return StyleSheet.create({
      separator: {
          height: 0.3,
          backgroundColor: text,
      },
      overlay: {
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
      },
      overlayTouch: {
          flex: 1,
        },
      centering: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
      },
      modalContent: {
          borderColor: backgroundVarient,
          padding: 20,
          backgroundColor: background,
          zIndex: 10,
          padding: 20,
          borderRadius: 10,
          alignItems: 'center',
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 2 },
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 5,
          width: 300
      },
        
      difButton:{
        width: 200,
      },  
      titleText: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginHorizontal: 60,
      },
      scoreText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      newHighScoreText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
      },
      previousScoreContainer: {
        marginBottom: 20,
        alignItems: 'center',
      },
      previousScoreText: {
        fontSize: 16,
      },
      previousScoreValue: {
        fontSize: 18,
        fontWeight: 'bold',
      },
  })
};
