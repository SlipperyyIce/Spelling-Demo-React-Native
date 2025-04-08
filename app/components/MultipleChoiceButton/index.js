import React, { useState, useImperativeHandle, forwardRef, useRef } from "react";
import { Animated, TouchableOpacity, View } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { colors } from "../../constants/colors";
import { Text } from "../Text";
import { useStores } from "../../stores";

export const MultipleChoiceButton = forwardRef(({ onPress, question, disabled=false, style }, ref) => {
    const { colorStore } = useStores();
    const { backgroundVarient, text} = colorStore.colors;
    const [textValue, setText] = useState("");
    const scaleValue = new Animated.Value(1);
    const bgColor = useRef(new Animated.Value(0)).current;
    const iconOpacity = new Animated.Value(0);
    const textOpacity = useRef(new Animated.Value(1)).current;
    const buttonOpacity = useRef(new Animated.Value(0)).current;

    const isCorrect = question?.answer?.trim()?.toLowerCase?.() == textValue?.trim?.()?.toLowerCase?.();

    function formatWord(str) {
        if (!str) {
            return str;
        }
        return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
    }

    useImperativeHandle(ref, () => ({
        resetAndSetText: (newText) => {
            // If transitioning from no text to text, fade in the whole button
            if (!textValue && newText) {
                setText(newText);
                Animated.parallel([
                    Animated.timing(buttonOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
                    Animated.timing(textOpacity, { toValue: 1, duration: 300, useNativeDriver: true })
                ]).start();
                return;
            }

            // If transitioning from text to no text, fade out the whole button
            if (textValue && !newText) {
                Animated.parallel([
                    Animated.timing(buttonOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
                    Animated.timing(textOpacity, { toValue: 0, duration: 300, useNativeDriver: true })
                ]).start(() => {
                    setText("");
                });
                return;
            }

            // If changing from one text to another, reset like original component
            Animated.parallel([
                Animated.timing(textOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
                Animated.timing(bgColor, { toValue: 0, duration: 300, useNativeDriver: true }),
                Animated.timing(iconOpacity, { toValue: 0, duration: 300, useNativeDriver: true })
            ]).start(() => {
                setText(newText);
                setTimeout(() => {
                    Animated.timing(textOpacity, { toValue: 1, duration: 300, useNativeDriver: true }).start();
                }, 200);
            });
        }
    }));

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            useNativeDriver: true,
        }).start();
    };

    const handlePress = () => {
        Animated.parallel([
            Animated.timing(bgColor, { toValue: 1, duration: 500, useNativeDriver: true }),
            Animated.timing(iconOpacity, { toValue: 1, duration: 500, useNativeDriver: true })
        ]).start(() => {
            setTimeout(() => {}, 1000);
        });
        onPress && onPress(textValue);
    };

    const backgroundColor = bgColor.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundVarient, isCorrect ? colors.green : colors.red],
    });

    // If no text, return null or a hidden view
    if (!textValue) {
        return (
            <Animated.View style={[{ opacity: 0, height: 0 }, style]} />
        );
    }

    return (
        <Animated.View style={[{ opacity: buttonOpacity }, style]}>
            <TouchableOpacity
                onPress={handlePress}
                onPressIn={onPressIn}
                onPressOut={onPressOut}
                activeOpacity={1}
                disabled={disabled}
            >
                <Animated.View style={[{ backgroundColor, transform: [{ scale: scaleValue }], height: 50, borderRadius: 20 }]}>
                    <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, paddingHorizontal: 20, justifyContent: 'space-between' }}>
                        <Animated.Text style={{ opacity: textOpacity, fontSize: 18, marginRight: 8, fontFamily: 'Chewy_400Regular', color:text }}>{formatWord(textValue)}</Animated.Text>
                        <Animated.View style={{ opacity: iconOpacity }}>
                            <MaterialIcons
                                name={isCorrect ? "check-circle" : "cancel"}
                                size={24}
                                color={'black'}
                            />
                        </Animated.View>
                    </View>
                </Animated.View>
            </TouchableOpacity>
        </Animated.View>
    );
});