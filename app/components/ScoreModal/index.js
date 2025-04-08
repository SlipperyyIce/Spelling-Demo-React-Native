import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import { Modal, View, StyleSheet } from 'react-native';
import { useStores } from '../../stores';
import { colors } from '../../constants/colors';
import { Text } from '../Text';
import { Button } from '../Button';

export const ScoreModal = forwardRef(({ callback, mode = 'time', difficulty="" }, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [score, setScore] = useState(0);
  const [isNewHighScore, setIsNewHighScore] = useState(false);
  const { dataStore } = useStores();
  const { colorStore } = useStores();
  const { green, red, black } = colors;
  const { text, textDimmed, background, primary } = colorStore.colors;

  useImperativeHandle(ref, () => ({
    open: (score) => {
      if (!isVisible) {
        setScore(score);
        const currentHighScore = dataStore.highscores[mode+difficulty] || 0;
        const isHighScore = score > currentHighScore;
        if (isHighScore) {
          setIsNewHighScore(true);
        }
        dataStore.updateHighScore(mode+difficulty, score);
        setIsVisible(true);
      }
    },
    close: () => setIsVisible(false),
  }));

  const getHighScoreLabel = () => {
    if (mode === 'daily') return 'Longest Daily Streak:';
    return 'Previous High Score:';
  };

  return (
    <Modal
      visible={isVisible}
      animationType="fade"
      transparent={true}
      onRequestClose={() => setIsVisible(false)}
    >
      <View style={styles.modalBackdrop}>
        <View style={[styles.modalContent, { backgroundColor: background }]}>
          {isNewHighScore && (
            <Text style={[styles.newHighScoreText, { color: green }]}>
              New High Score!
            </Text>
          )}
          <Text style={[styles.titleText, { color: text }]}>Your Score</Text>
          <Text style={[styles.scoreText, { color: text }]}>{score}</Text>

          <View style={styles.previousScoreContainer}>
            <Text style={[styles.previousScoreText, { color: textDimmed }]}>
              {getHighScoreLabel()}
            </Text>
            <Text style={[styles.previousScoreValue, { color: text }]}>
              {dataStore.highscores[mode] || 0}
            </Text>
          </View>

          {/* Use custom Button component */}
          <Button
            onPress={() => {
              setIsVisible(false);
              callback?.();
            }}
            style={[styles.closeButton, { backgroundColor: primary }]}
          >
            <Text fontWeight={'bold'} fontSize={16} style={{color: black}}>Close</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
});