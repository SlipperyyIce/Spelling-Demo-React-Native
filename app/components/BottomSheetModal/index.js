import { Animated, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useStores } from "../../stores";
import { Text } from "../Text";
import { useEffect, useRef, useState } from "react";

export const BottomSheetModal = ({children , isVisible, onClose, callback, height }) => {
    const styles = useStyles()
    const fadeAnim = useRef(new Animated.Value(0)).current;
    const slideAnim = useRef(new Animated.Value(100)).current;
    const [buffVis, setBufferVisibilty] = useState(false)

    const buttonPressed = (mode) => {
        callback?.(mode)
    }

    useEffect(() => {
        if (isVisible) {
        slideAnim.setValue(100);
        fadeAnim.setValue(0);
        
        Animated.parallel([
            Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
            }),
        ]).start();
        } else {

        Animated.parallel([
            Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
            }),
            Animated.timing(slideAnim, {
            toValue: 100,
            duration: 200,
            useNativeDriver: true,
            }),
        ]).start();
        setBufferVisibilty(true)
        setTimeout(()=> setBufferVisibilty(false), 200)
        }
    }, [isVisible]);

    return (
        <Modal
        animationType="none"
        transparent
        visible={isVisible || buffVis}
        onRequestClose={onClose}
        >
        <Animated.View 
            style={[
            styles.overlay,
            {
                opacity: fadeAnim,
            }
            ]}
        >
            <TouchableOpacity
            style={styles.overlayTouch}
            activeOpacity={1}
            onPress={onClose}
            />
        </Animated.View>

        <Animated.View
            style={[
            styles.modalContent,
            {
                height: height ?? 'auto',
                transform: [
                {
                    translateY: slideAnim.interpolate({
                    inputRange: [0, 100],
                    outputRange: [0, 500],
                    }),
                },
                ],
            },
            ]}
        >
            {/* <TouchableOpacity style={styles.option} onPress={() => buttonPressed("share")}>
            <Text style={styles.optionText}>Share</Text>
            </TouchableOpacity>
            
            <View style={styles.separator} /> */}
            {children ??
                <View>
                    <TouchableOpacity style={styles.option} onPress={() => buttonPressed("flashcards")}>
                    <Text style={styles.optionText}>Flashcards</Text>
                    </TouchableOpacity>

                    <View style={styles.separator} />

                    <TouchableOpacity style={styles.option} onPress={() => buttonPressed("edit")}>
                    <Text style={styles.optionText}>Edit</Text>
                    </TouchableOpacity>
                    
                    <View style={styles.separator} />
                    
                    <TouchableOpacity style={styles.deleteOption} onPress={() => buttonPressed("delete")}>
                    <Text style={styles.deleteText}>Delete</Text>
                    </TouchableOpacity>
                </View>
            }

        </Animated.View>
        </Modal>
    );
};


const useStyles = () => { 
    const { colorStore } = useStores();
    const { background, backgroundVarient, text, textDimmed} = colorStore.colors;
    return StyleSheet.create({
        separator: {
            height: 0.3,
            backgroundColor: text,
        },
        overlay: {
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        overlayTouch: {
            flex: 1,
          },
        modalContent: {
            position: "absolute",
            bottom: 0,
            width: "100%",
            paddingHorizontal: 40,
            borderWidth: 1,
            borderColor: backgroundVarient,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
            backgroundColor: background,
            zIndex: 10
        },
        option: {
            paddingVertical: 15,
        },
        optionText: {
            fontSize: 16,
        },
        deleteOption: {
            paddingVertical: 15,
        },
        deleteText: {
            fontSize: 16,
            color: "red",
        },
        input: {
            height: 50,
            borderWidth: 2,
            borderColor: backgroundVarient,
            borderRadius: 25,
            paddingHorizontal: 15,
            fontSize: 16,
            backgroundColor: "white",
            marginVertical: 10
        },

        scrollView:{
            flex: 1,
            borderRadius: 25,
        },

        button: {
            padding: 15,
            backgroundColor: backgroundVarient,
            marginVertical: 5,
            borderRadius: 15,
        },
 
        listItem: {
            padding: 15,
            borderBottomWidth: 1,
            borderTopWidth: 1,
            borderColor: backgroundVarient,
        },
        itemText: {
            fontSize: 18,
            fontWeight: "bold",
        },
        itemSubText: {
            fontSize: 14,
            fontFamily:'Arial'
        },
        placeholderImage: {
            width: 350,
            height: 350,
            alignSelf: "center",
        },
    })
};