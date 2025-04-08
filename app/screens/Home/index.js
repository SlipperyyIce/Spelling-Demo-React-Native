import { Button, Text, ScreenView, RoundedContainer, SunMoonSwitch, ProfileIcon, DifficultyModal, AnimatedButton } from "../../components"
import { cheetah1, snailTime, wormBook } from '../../assets';
import { StyleSheet, Image, View, TouchableOpacity, ScrollView, Animated, Alert } from "react-native";
import { useStores } from '../../stores';
import { routeUrls } from "../../navigation/routeUrls";
import { observer } from 'mobx-react';
import { useState, useRef, useEffect } from "react";
import { enableSound } from "../../lib/helper";


export const Home = observer(({ navigation }) => {
    const { colorStore, dataStore } = useStores();
    const { dailyStreak } = dataStore
    const { theme } = colorStore;
    const styles = useStyles()
    const { black, textDimmed, text, background, backgroundVarient } = colorStore.colors;
    const [isOn, setIsOn] = useState(theme == 'light');
    const difficultyRef = useRef()

    useEffect(() => {
          Alert.alert('The TTS doesn\'t work sometimes on simulator but works on mobile');
      }, []); 

    const chooseDifficulty = (route,type) => {
        difficultyRef.current.open(route, type)
    }

    const toggle = () => {
        setIsOn(!isOn);
        colorStore.toggleTheme();
    };

    const loadPage = (route) => {
        navigation.navigate(route);
    };

    useEffect(()=>{
        enableSound()
    },[])

    return (
        <ScreenView style={{ padding: 0 }}>
            <DifficultyModal ref={difficultyRef}/>
            <ScrollView
                style={{ width: '100%', borderRadius: 20 }}

            >
                <View style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center', marginHorizontal: 20 }}>
                    <ProfileIcon style={styles.shadow} />
                    <SunMoonSwitch onToggle={toggle} isOn={!isOn} style={styles.shadow} />
                </View>
                <View style={{ gap: 20, marginTop: 10, marginHorizontal: 20 }}>

                    <AnimatedButton
                        onPress={() => loadPage(routeUrls.dailyWord)}
                    >
                        <Text fontWeight={700} style={{ fontSize: 30 }}>Daily Word</Text>
                        <Text color={textDimmed} style={{ fontFamily: 'Arial', fontSize: 15, flexWrap: 'wrap', marginRight: 100 }}>
                            Attempt to spell a new word each day to get the highest score.
                        </Text>
                        <Image source={wormBook} style={styles.worm} />
                        <View style={[styles.bottom]}>
                            <View style={{ flexDirection: 'row', gap: 10 }}>
                                <View
                                    style={styles.button}
                                >
                                    <Text style={[styles.bottomText, { color: background }]}>Go</Text>
                                </View>
                                {dailyStreak > 0 &&
                                    <View
                                        style={{
                                            backgroundColor: '#E94C89',
                                            paddingVertical: 12,
                                            borderRadius: 15,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            minWidth: 60
                                        }}
                                    >
                                        <Text style={[styles.bottomText, { color: background }]}>x{dailyStreak}</Text>
                                    </View>
                                }
                            </View>
                        </View>
                    </AnimatedButton>

                    <AnimatedButton
                        onPress={() => chooseDifficulty(routeUrls.play, 'time')}
                    >
                        <Text fontWeight={700} style={{ fontSize: 30 }}>Time Trial</Text>
                        <Text color={textDimmed} style={{ fontFamily: 'Arial', fontSize: 15, flexWrap: 'wrap', marginRight: 120 }}>
                            Race against time to get the highest score!
                        </Text>
                        <Image source={snailTime} style={styles.snail} />
                        <View style={[styles.bottom]}>
                            <View
                                style={styles.button}
                            >
                                <Text style={[styles.bottomText, { color: background }]}>Go</Text>
                            </View>
                        </View>
                    </AnimatedButton>

                    <AnimatedButton
                        onPress={() => chooseDifficulty(routeUrls.streaks, 'streaks')}
                        style={{marginBottom: 50}}
                    >
                        <Text fontWeight={700} style={{ fontSize: 30 }}>Word Sprint</Text>
                        <Text color={textDimmed} style={{ fontFamily: 'Arial', fontSize: 15, flexWrap: 'wrap', marginRight: 100 }}>
                            Race against the clock, spelling words to add time. Slow down, and the countdown {'\n'}runs out!
                        </Text>
                        <Image source={cheetah1} style={styles.cheetah} />
                        <View style={[styles.bottom]}>
                            <View
                                style={styles.button}
                            >
                                <Text style={[styles.bottomText, { color: background }]}>Go</Text>
                            </View>
                        </View>
                    </AnimatedButton>
                </View>
            </ScrollView>
        </ScreenView>
    );
});

const useStyles = () => {
    const { colorStore,  } = useStores();
    const { text } = colorStore.colors;

    return (StyleSheet.create({
    header: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1,
        backgroundColor: 'white',
        paddingVertical: 10,
    },
    shadow: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5
    },
    container: {
        height: 220,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 5,
        width: '100%'
    },
    imageContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    },
    worm: {
        position: 'absolute',
        bottom: -10,
        right: 10,
        width: 180,
        height: 180,
    },
    snail: {
        position: 'absolute',
        bottom: 0,
        right: -10,
        width: 200,
        height: 150,
    },
    octopus: {
        position: 'absolute',
        bottom: 10,
        right: 18,
        width: 130,
        height: 130,
    },
    bees: {
        position: 'absolute',
        bottom: 10,
        right: 18,
        width: 150,
        height: 150,
    },
    cheetah: {
        position: 'absolute',
        bottom: 10,
        right: 18,
        width: 250,
        height: 120,
        transform: [{ scaleX: -1 }],
        resizeMode: "contain"
    },
    description: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: text,
        paddingVertical: 12,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        width: 60
    },
    bottom: {
        justifyContent: 'flex-end',
        flex: 1
    },
    highScoreSticker: {
        position: 'absolute',
        top: -15,
        right: -10,
        backgroundColor: '#007AFF',
        borderRadius: 30,
        padding: 5,
        paddingHorizontal: 10
    },
    highScoreText: {
        color: 'white',
        fontWeight: 'bold',
    },
}))};