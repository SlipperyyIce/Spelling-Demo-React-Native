import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useStores } from '../../stores';
import { observer } from 'mobx-react';
import { RoundedContainer } from '../RoundedContainer';
import { Text } from '../Text';

export const Timer = observer(({ style, onComplete }) => {
  const { timerStore } = useStores();
  const { minutes, seconds } = timerStore;

  useEffect(() => {
    // Set the onComplete callback
    if (onComplete) {
      timerStore.setOnComplete(onComplete);
    }
  }, [onComplete]);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.timerDisplay}>
        <View style={styles.timeUnit}>
          <RoundedContainer style={styles.timerContainer}>
            <Text fontSize={30}>{minutes < 10 ? `0${minutes}` : minutes}</Text>
          </RoundedContainer>
          <Text fontSize={20}>Minutes</Text>
        </View>
        <View style={styles.timeUnit}>
          <RoundedContainer style={styles.timerContainer}>
            <Text fontSize={30}>{seconds < 10 ? `0${seconds}` : seconds}</Text>
          </RoundedContainer>
          <Text fontSize={20}>Seconds</Text>
        </View>
      </View>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  timerDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 20,
  },
  timeUnit: {
    alignItems: 'center',
    gap: 10,
  },
  timerContainer: {
    alignItems: 'center',
    width: 180,
  },
});