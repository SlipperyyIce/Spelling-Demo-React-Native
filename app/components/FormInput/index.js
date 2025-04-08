import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Text, TextInput, View, StyleSheet, Animated } from "react-native";
import { colors } from "../../constants/colors";
import { useStores } from "../../stores";

export const FormInput = forwardRef(({ 
    label, 
    value, 
    onChangeText, 
    placeholder = "", 
    error,
    style,
    inputStyle,
    noError = false
    }, ref) => {
    const { colorStore } = useStores();
    const styles = useStyles();
    const shakeAnimation = useRef(new Animated.Value(0)).current;
    const borderAnimation = useRef(new Animated.Value(0)).current;
    const errorOpacity = useRef(new Animated.Value(0)).current;
    const { backgroundVarient } = colorStore.colors;

    useImperativeHandle(ref, () => ({
        shake: () => {
        borderAnimation.setValue(0);
        Animated.parallel([
            Animated.sequence([
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true
            }),
            Animated.timing(shakeAnimation, {
                toValue: -10,
                duration: 50,
                useNativeDriver: true
            }),
            Animated.timing(shakeAnimation, {
                toValue: 10,
                duration: 50,
                useNativeDriver: true
            }),
            Animated.timing(shakeAnimation, {
                toValue: 0,
                duration: 50,
                useNativeDriver: true
            })
            ]),
            Animated.timing(borderAnimation, {
            toValue: 1,
            duration: 200,
            useNativeDriver: false
            }),
            Animated.timing(errorOpacity, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
            })
        ]).start();
        }
    }));

    // Animate error text when error prop changes
    React.useEffect(() => {
        Animated.timing(errorOpacity, {
            toValue: error ? 1 : 0,
            duration: 200,
            useNativeDriver: true
        }).start();
    }, [error]);

    const borderColor = borderAnimation.interpolate({
        inputRange: [0, 1],
        outputRange: [backgroundVarient, colors.red]
    });

    const handleChangeText = (text) => {
        Animated.parallel([
            Animated.timing(borderAnimation, {
                toValue: 0,
                duration: 200,
                useNativeDriver: false
            }),
            Animated.timing(errorOpacity, {
                toValue: 0,
                duration: 200,
                useNativeDriver: true
            })
        ]).start();
        onChangeText(text);
    };

    return (
        <View style={[styles.container, style]}>
        <Animated.View style={{ transform: [{ translateX: shakeAnimation }] }}>
            {label ? <Text style={styles.label}>{label}</Text> : null}
            <Animated.View style={[styles.input, { borderColor }, inputStyle]}>
            <TextInput
                style={styles.textInput}
                placeholder={placeholder}
                value={value}
                onChangeText={handleChangeText}
                //placeholderTextColor="#555555"
            />
            </Animated.View>
        </Animated.View>
        {!noError && <Animated.Text 
            style={[
                styles.errorText,
                {
                    opacity: errorOpacity,
                    transform: [{
                        translateY: errorOpacity.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-10, 0]
                        })
                    }]
                }
            ]}
        >
            {'Required'}
        </Animated.Text>}
        </View>
    );
});

const useStyles = () => {
    const { colorStore } = useStores();
    const { background, backgroundVarient, text } = colorStore.colors;

    return StyleSheet.create({
        container: {
        marginBottom: 5,
        },
        label: {
            fontWeight: "bold",
            fontSize: 16,
            color: text,
            fontFamily: 'Chewy_400Regular'
        },
        input: {
            height: 50,
            borderBottomWidth: 1,
            borderTopWidth: 1,

            borderRadius: 10,
            marginTop: 5,
            overflow: 'hidden'
        },
        textInput: {
            color: text,
            flex: 1,
            fontSize: 18,
            //fontFamily: 'Chewy_400Regular',
            //paddingHorizontal: 15,
            //backgroundColor: background,

        },
        errorText: {
            color: colors.red,
            fontSize: 14,
            marginTop: -0,
        },
    });
};