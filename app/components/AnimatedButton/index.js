import { useState } from "react";
import { Animated, StyleSheet, TouchableOpacity } from "react-native";
import { RoundedContainer } from "../RoundedContainer";

export const AnimatedButton = ({ onPress, children, style }) => {
    const [scaleValue] = useState(new Animated.Value(1));
    
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


    return (
        <TouchableOpacity
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            activeOpacity={1}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                <RoundedContainer style={[styles.container, style]}>
                    {children}
                </RoundedContainer>
            </Animated.View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 220,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        width: '100%'
    },
})