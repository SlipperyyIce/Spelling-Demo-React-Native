import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, Text, Dimensions } from 'react-native';
import { useStores } from '../../stores';
import * as Progress from 'react-native-progress';
import { colors } from '../../constants/colors';

const screenWidth = Dimensions.get('window').width;

export const ProgressTimer = forwardRef(({ onComplete, initialSeconds = 10, style }, ref) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(1);
  const timerRef = useRef(null);
  const intervalRef = useRef(null);
  const { colorStore } = useStores();
  const { text, primary, backgroundVarient } = colorStore.colors;

  useImperativeHandle(ref, () => ({
    startTimer,
    resetTimer,
    stopTimer,
  }));

  useEffect(() => {
    if (isRunning) {
      const totalDuration = initialSeconds * 1000;
      const startTime = Date.now();
      const endTime = startTime + totalDuration;

      intervalRef.current = setInterval(() => {
        const now = Date.now();
        const remainingTime = Math.max(endTime - now, 0);
        setProgress(remainingTime / totalDuration);

        if (remainingTime === 0) {
          clearInterval(intervalRef.current);
        }
      }, 50); // Smooth update every 50ms

      timerRef.current = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds > 0) {
            return prevSeconds - 1;
          } else {
            clearInterval(timerRef.current);
            setIsRunning(false);
            onComplete?.();
            return 0;
          }
        });
      }, 1000);

      return () => {
        clearInterval(timerRef.current);
        clearInterval(intervalRef.current);
      };
    }
  }, [isRunning]);

  const startTimer = () => {
    if (!isRunning) {
      setIsRunning(true);
    }
  };

  const stopTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      clearInterval(timerRef.current);
      clearInterval(intervalRef.current);
    }
  };

  const resetTimer = () => {
    stopTimer();
    setSeconds(initialSeconds);
    setProgress(1);
  };

  useEffect(() => {
    startTimer();
  }, []);

  return (
    <View style={[styles.container, style]}>
      <View style={styles.timeContainer}>
        <Text style={[styles.timeText, { color: text, textAlign:'left' }]}>Timer</Text>
        <Text style={[styles.timeText, { color: text, textAlign:'right' }]}>{seconds}s</Text>
      </View>
      <Progress.Bar
        progress={progress}
        width={screenWidth * 0.87}
        color={colors.yellow}
        unfilledColor={backgroundVarient}
        style={styles.progressBar}
        borderWidth={0}
      />
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    padding: 20,
    paddingHorizontal: 15,
    alignItems:'center'
  },
  timeContainer: {
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    flexDirection: 'row',
  },
  timeText: {
    fontSize: 20,
    fontFamily: "Chewy_400Regular",
    fontWeight: 'normal',
  },
  progressBar: {
    marginTop: 10,
  },
});