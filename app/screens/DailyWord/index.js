import { Button, Input, Keyboard, RoundedContainer, ScoreModal, ScreenView, SpellWord, SuccessModal, Text, DailyModal } from "../../components"
import { useStores } from '../../stores';
import { mascot } from '../../assets';
import { StyleSheet, Image, View, TouchableOpacity, Modal, Dimensions } from "react-native";
import { useEffect, useRef, useState } from "react";
import { questionData } from "../../constants/questions";
import { maskAnswer, pickDailyWord } from "../../lib/helper";
import { XMarkIcon } from "react-native-heroicons/outline"; 
import { observer } from "mobx-react";
import Icon from 'react-native-vector-icons/FontAwesome5';
import { colors } from "../../constants/colors";
import _ from "lodash";


const { width } = Dimensions.get('window');

export const DailyWord = observer(({ navigation }) => {
    const nonHardQuestions = _.filter(questionData, q => q.difficulty !== 'hard');
    
    const { colorStore, dataStore } = useStores();
    const { text, background, primary } = colorStore.colors; 
    const { dailyAttempted, dailyStreak, highestStreak, dailyAttempts } = dataStore;
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState({});
    const [doOnce, setDoOnce] = useState(false);
    const [upcomingQuestion, setUpcomingQuestion] = useState(nonHardQuestions);
    const [forcedModalVisibility, setForcedModalVisibility] = useState(false);
    const [lives, setLives] = useState(3)

    const modalRef = useRef(); 
    const spellWordRef = useRef();
    const scoreModalRef = useRef();
    const dailyModalRef = useRef(); // Ref for StreakModal
    
    const goBack = () => {
        navigation.pop();
    };

    const submit = () => {
        if (!doOnce && lives > 0) {
            setDoOnce(true);
            spellWordRef?.current?.stop?.();
            const isCorrect = answer.trim().toLowerCase() === question.answer.trim().toLowerCase();
            const capitalized = question.answer.charAt(0).toUpperCase() + question.answer.slice(1);
            modalRef?.current?.open(isCorrect, capitalized);

            setTimeout(()=>{if(isCorrect)setForcedModalVisibility(true)},1500)
            setTimeout(()=>{
                setDoOnce(false);
                dataStore.markDailyAttempt(isCorrect);
            },1501)
        }
    };


    const getDailyQuestion = () => {
        const newQuestion = maskAnswer(pickDailyWord(nonHardQuestions));
        setQuestion(newQuestion);
        return newQuestion;
    };

    const openStreakModal = () => {
        dailyModalRef?.current?.open(dailyStreak, highestStreak);
    };

    useEffect(() => {
        setLives(3 - dailyAttempts)
    },[dailyAttempts])

    useEffect(() => {
        getDailyQuestion();
    }, []);

    useEffect(() =>{
        if(dailyAttempted || lives <=0 ) openStreakModal?.()
    }, [dailyAttempted,lives ])
    
    return (
        <ScreenView>
            {/*<TouchableOpacity style={{ marginVertical: 10 }} onPress={openStreakModal}>
                <Text style={{ color: primary, fontSize: 16 }}>View Streak Stats</Text>
            </TouchableOpacity>
            */}
            <View style={{ marginTop: 25, paddingHorizontal: 25 }}>
                <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 40,
                 }}>Daily Word</Text>
                </View>
            </View>


            <SuccessModal ref={modalRef} forceInvisible={forcedModalVisibility} showAnswer={false}/>
            <DailyModal ref={dailyModalRef} callback={goBack}/>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 25, paddingTop: 5 }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Icon name={lives >= 1 ? "heart" : 'heart-broken'} size={16} color={lives >= 1 ? colors.red : 'grey'} solid/>
                    <Icon name={lives >= 2 ? "heart" : 'heart-broken'} size={16} color={lives >= 2 ? colors.red : 'grey'} solid/>
                    <Icon name={lives >= 3 ? "heart" : 'heart-broken'} size={16} color={lives >= 3 ? colors.red : 'grey'} solid/>
                    
                </View>
                
            </View>
            <SpellWord ref={spellWordRef} question={question} upcomingQuestion={upcomingQuestion} answer={answer} setAnswer={setAnswer} muted={dailyAttempted} submitCallback={submit}/>
            <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%' }}>
                <View style={{ width: '90%' }}>
                    <Button onPress={submit} backgroundColor={text} style={{}}>
                        <Text color={background} fontSize={18} style={{ fontWeight: 'bold' }}>Submit</Text>
                    </Button>
                </View>
            </View>
        </ScreenView>
    );
});

const styles = StyleSheet.create({
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
    },
    image: {
        width: 40,
        height: 40,
    },
    crossButton: {
        justifyContent: 'center',   
        alignItems: 'center',    
    },
});