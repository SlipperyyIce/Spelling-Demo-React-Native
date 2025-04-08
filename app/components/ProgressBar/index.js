import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';
import { colors } from '../../constants/colors';
import { useStores } from '../../stores';
import { Text } from '../Text';
import { observer } from 'mobx-react';

const { width } = Dimensions.get('window');

export const ProgressBar = observer(({ questionNumber=0, totalQuestions=0, progress=0, style={} }) => {
    const { colorStore } = useStores()
    const { text, backgroundVarient } = colorStore.colors

    return (
        <View style={style}>
            <View style={styles.textContainer}>
                <Text style={styles.leftText}>{questionNumber} of {totalQuestions}</Text>
                <Text style={styles.rightText}>{Math.round(progress * 100)}%</Text>
            </View>
            <Progress.Bar
                progress={progress}
                width={width * 0.89}
                color={colors.yellow}
                unfilledColor={backgroundVarient}
                borderWidth={0}
            />
        </View>
    );
});

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    leftText: {
        textAlign: 'left',
    },
    rightText: {
        textAlign: 'right',
    },
});

