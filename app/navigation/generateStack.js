import React, { useEffect, useRef, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, View, Animated, StyleSheet } from 'react-native';
import { useStores } from '../stores';
import { observer } from 'mobx-react';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';

const Stack = createStackNavigator();

const getSlideFromRightTransition = () => ({
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
});


const getSlideFromLeftTransition = () => ({
  gestureDirection: 'horizontal',
  transitionSpec: {
    open: { animation: 'timing', config: { duration: 300 } },
    close: { animation: 'timing', config: { duration: 300 } },
  },
  cardStyleInterpolator: ({ current, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [-layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
});

const renderScreen = (
  {
    name,
    component,
    title,
    options = {},
    hideBack,
  },
  index,
  forwardTransition=true,
) => {
  const { colorStore, timerStore } = useStores();
  const { text } = colorStore.colors;
  return (
    <Stack.Screen
      name={name}
      key={index}
      options={({ navigation, route }) => ({
        animationEnabled: false,
        headerTransparent: true,
        headerTitle: "",
        ...(forwardTransition ? getSlideFromRightTransition() : getSlideFromLeftTransition()),
        headerLeft: () =>
          !hideBack && (navigation.getState().index >= 1) && (
            <TouchableOpacity onPress={() => {
              navigation.pop();

              timerStore.clearExistingInterval();
            }}>
              <ChevronLeftIcon
                size={25}
                style={{ marginLeft: 20, marginBottom: 20 }}
                color={text}
              />
            </TouchableOpacity>
          ),
        ...options,
      })}
      component={component}
    />
  );
};

const GenerateStack = ({ paths }) => {
  const { colorStore } = useStores();

  if (paths) {
    return (
        <Stack.Navigator>
          {paths.map((item, index) => {
            return renderScreen(item, index, true);
          })}
        </Stack.Navigator>
    );
  }
};

const styles = StyleSheet.create({
});

export default observer(GenerateStack);
