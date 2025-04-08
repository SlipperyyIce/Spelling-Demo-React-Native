import React, { forwardRef, useImperativeHandle, useState } from "react";
import { Modal, View, StyleSheet, TouchableOpacity } from "react-native";
import { useStores } from "../../stores";
import { Text } from "../Text";
import { Button } from "../Button";

export const DailyModal = forwardRef(({ callback }, ref) => {
    const [visible, setVisible] = useState(false);
    const [streaks, setStreaks] = useState({ currentStreak: 0, highestStreak: 0 });

    const {colorStore} = useStores();
    const {text, textDimmed, primary, background, backgroundVarient, black} = colorStore.colors;

    useImperativeHandle(ref, () => ({
        open: (currentStreak, highestStreak) => {
            setStreaks({ currentStreak, highestStreak });
            setVisible(true);
        },
        close: () => setVisible(false),
    }));

    return (
        <Modal
            transparent={true}
            visible={visible}
            animationType="fade"
            onRequestClose={() => setVisible(false)}
        >
            <View style={styles.modalContainer}>
                <View style={[styles.content, {backgroundColor: background}]}>
                    <Text style={[styles.titleText, { color: text }]}>Daily Records</Text>
                    <Text style={[styles.streakText, { color: text }]}>
                        Current Streak: {streaks.currentStreak}
                    </Text>
                    <Text style={[styles.streakText, { color: text }]}>
                        Highest Streak: {streaks.highestStreak}
                    </Text>
                        <Button
                            onPress={() => {
                                setVisible(false);
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
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
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
        marginHorizontal: 40,
    },
    streakText: {
        fontSize: 16,
        marginVertical: 5,
    },
    closeButton: {
        marginTop: 15,
    },
   
});