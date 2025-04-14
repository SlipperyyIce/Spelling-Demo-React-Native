import { Animated, Modal, StyleSheet, TouchableOpacity, View } from "react-native";
import { useStores } from "../../stores";
import { Text } from "../Text";
import { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from "react";
import BottomSheet, { BottomSheetView, BottomSheetBackdrop, BottomSheetModal, BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Button } from "../Button";
import { routeUrls } from "../../navigation/routeUrls";

export const BottomSheetComp = forwardRef(({children, navigation },ref) => {
    const bottomSheetRef = useRef()
    const styles = useStyles()
    const {colorStore, dataStore} = useStores()
    

    const { background, backgroundVarient, text, textDimmed, primary, black} = colorStore.colors;
    const snapPoints = useMemo(() => ["40%"], []);
    const [route, setRoute] = useState()
    const [scoreType, setScoreType] = useState('')

    const callback = (difficulty) => {
        bottomSheetRef.current?.close()
        setTimeout(()=> {
            navigation.navigate(route, {difficulty})
        },300)
    }
    
    useImperativeHandle(ref, () => ({
        open,
        close,
    }));

    const open = (route, type) => {
        setRoute(route)
        setScoreType(type)
        bottomSheetRef.current?.present();
    }
    const close = () => {
        bottomSheetRef.current?.close();
    };

    const renderBackdrop = useCallback(
        (props)=> <BottomSheetBackdrop appearsOnIndex={0} disappearsOnIndex={-1} {...props}/>,[]
    )
    

    return (
        <GestureHandlerRootView style={styles.container}>
            <BottomSheetModal
                ref={bottomSheetRef}
                snapPoints={snapPoints}
                enableDynamicSizing={false}
                backdropComponent={renderBackdrop}
                enableContentPanningGesture={false}
                //onChange={handleSheetChange}
                handleIndicatorStyle={{ backgroundColor: text }}
                backgroundStyle={{backgroundColor: background}}
                enablePanDownToClose={true}
                style={styles.contentContainer}
            >
                <BottomSheetView style={styles.contentContainer}>
                    {children ?? <View>
                        <Text style={[styles.previousScoreValue, { color: text }]}>
                            Select Difficulty
                        </Text>
                        <View style={{gap: 10, marginTop: 15}}>
                            <Button
                            onPress={() => {
                                callback?.('easy');
                            }}
                            style={[styles.difButton, { backgroundColor: primary }]}
                            >
                            <Text fontWeight={'bold'} fontSize={18} style={{color: black}}>Easy</Text>
                            {dataStore?.highscores?.[scoreType+ 'easy']?.toString() && <Text  fontSize={14} style={{color: black}}>Highscore: {dataStore?.highscores?.[scoreType+ 'easy']?.toString()}</Text>}
                            </Button>
                            <Button
                            onPress={() => {
                                callback?.('medium');
                            }}
                            style={[styles.difButton, { backgroundColor: primary }]}
                            >
                            <Text fontWeight={'bold'} fontSize={18} style={{color: black}}>Medium</Text>
                            {dataStore?.highscores?.[scoreType+ 'medium']?.toString() && <Text  fontSize={14} style={{color: black}}>Highscore: {dataStore?.highscores?.[scoreType+ 'medium']?.toString()}</Text>}
                            </Button>
                            <Button
                            onPress={() => {
                                callback?.('hard');
                            }}
                            style={[styles.difButton, { backgroundColor: primary }]}
                            >
                            <Text fontWeight={'bold'} fontSize={18} style={{color: black}}>Hard</Text>
                            {dataStore?.highscores?.[scoreType+ 'hard']?.toString() && <Text  fontSize={14} style={{color: black}}>Highscore: {dataStore?.highscores?.[scoreType+ 'hard']?.toString()}</Text>}
                            </Button>
                        </View>                        
                    </View>
                    }                        
                </BottomSheetView>
            </BottomSheetModal>
        </GestureHandlerRootView>
    );
});


const useStyles = () => { 
    const { colorStore } = useStores();
    const { background, backgroundVarient, text, textDimmed} = colorStore.colors;
    return StyleSheet.create({
        container: {
            flex: 1,
        },
        contentContainer: {
            flex: 1,
            alignItems: 'center',
            width: '100%'
        },
        separator: {
            height: 1,
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
            //paddingHorizontal: 40,
            borderWidth: 1,
            borderColor: backgroundVarient,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            padding: 20,
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