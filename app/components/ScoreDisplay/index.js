import React from 'react';
import { View, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { Text } from '../Text';
import { useStores } from '../../stores';
import { colors } from '../../constants/colors';

export const ScoreDisplay = ({ score='0', style, mode='', difficulty=''}) => {
    const { colorStore, dataStore }= useStores()
    const { text, background, primary } = colorStore.colors;

    const highscore = score > (dataStore.highscores[mode+difficulty] || 0) ? score : dataStore.highscores[mode+difficulty] || 0

    return (
        <View style={[styles.row, style]}>
              <Icon name="medal" solid size={20} color="#C0C0C0"  />
              <Text style={styles.text}>{score}</Text>

            <Icon name="trophy" solid size={20} color={colors.primary} style={{marginLeft:10}}/>
            <Text style={styles.text}>{highscore}</Text>

          
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 25, marginBottom: 10 

  },
  text: {
    marginLeft: 8,
    fontSize: 18,
    //color: '#333',
  },
});
