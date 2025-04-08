import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet,  } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { colors } from '../../constants/colors';

const SWITCH_WIDTH = 50;
const SWITCH_HEIGHT = 30;
const CIRCLE_SIZE = 26;

export const Switch = ({ onToggle, isOn }) => {
  const translateX = useSharedValue(isOn ? SWITCH_WIDTH - CIRCLE_SIZE - 2 : 2);

  const toggleSwitch = () => {
    translateX.value = withTiming(isOn ? 2 : SWITCH_WIDTH - CIRCLE_SIZE - 2, {
      duration: 300,
    });
    onToggle?.(!isOn);
  };

  const animatedCircleStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <TouchableOpacity style={[styles.switch, isOn ? styles.switchOn : styles.switchOff]} onPress={toggleSwitch} activeOpacity={1}>
      <Animated.View style={[styles.circle, animatedCircleStyle]} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  switch: {
    width: SWITCH_WIDTH,
    height: SWITCH_HEIGHT,
    borderRadius: SWITCH_HEIGHT / 2,
    justifyContent: 'center',
    padding: 2,
  },
  switchOn: {
    backgroundColor: '#4cd964',
  },
  switchOff: {
    backgroundColor: '#ccc',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    backgroundColor: 'white',
    position: 'absolute',
  },
});