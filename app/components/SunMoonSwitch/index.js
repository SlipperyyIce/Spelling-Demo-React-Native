import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Feather';

const SWITCH_WIDTH = 70;
const SWITCH_HEIGHT = 35;
const CIRCLE_SIZE = 31;

export const SunMoonSwitch = ({ onToggle, isOn = true, style }) => {
  const translateX = useSharedValue(isOn ? SWITCH_WIDTH - CIRCLE_SIZE - 2 : 2);

  const toggleSwitch = () => {
    translateX.value = withTiming(isOn ? 2 : SWITCH_WIDTH - CIRCLE_SIZE - 2, {
      duration: 300,
    });
    onToggle?.(!isOn);
  };

  const animatedCircleStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <TouchableOpacity 
      style={[styles.switch, !isOn ? styles.switchOn : styles.switchOff, style]} 
      onPress={toggleSwitch}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>
        <Icon name="sun" size={14} color={isOn ? "#FDB813" : "#7C7C7C"} />
        <Icon name="moon" size={14} color={!isOn ? "#FFFFFF" : "#7C7C7C"} />
      </View>
      <Animated.View 
        style={[
          styles.circle, 
          animatedCircleStyle,
          !isOn ? styles.circleLight : styles.circleDark
        ]} 
      />
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
    backgroundColor: '#87CEEB',
  },
  switchOff: {
    backgroundColor: '#1C2452',
  },
  circle: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    borderRadius: CIRCLE_SIZE / 2,
    position: 'absolute',
  },
  circleLight: {
    backgroundColor: '#FDB813',
    shadowColor: '#FDB813',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 5,
    elevation: 5,
  },
  circleDark: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#FFFFFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
});