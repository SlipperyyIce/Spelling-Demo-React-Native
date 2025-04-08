import { Button, Input, Keyboard, ProgressTimer, RoundedContainer, ScoreDisplay, ScoreModal, ScreenView, SpellWord, SuccessModal, Text, Timer } from "../../components"
import { useStores } from '../../stores';
import { mascot } from '../../assets';
import { StyleSheet, Image, View, TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { questionData } from "../../constants/questions";
import { excludeQuestionById, getRandomQuestionByDifficulty, maskAnswer } from "../../lib/helper";
import { XMarkIcon } from "react-native-heroicons/outline"; 
const { width, height } = Dimensions.get('window');

export const PlayScreen = ({navigation, route}) => {
    const { colorStore, timerStore, } = useStores();
    const { text, background, primary } = colorStore.colors; 
    const [answer, setAnswer] = useState('');
    const [score, setScore] = useState(0);
    const [question, setQuestion] = useState({})
    const [difficulty, setDifficulty] = useState(route?.params?.difficulty)
    const [allQuestions, setAllQuestions] = useState(questionData)
    const [upcomingQuestion, setUpcomingQuestion] = useState(questionData)
    const [forcedModalVisibility, setForcedModalVisibility] = useState(false)

    const modalRef = useRef(); 
    const spellWordRef = useRef();
    const scoreModalRef =  useRef();
    
    useLayoutEffect(() => {
        navigation.setOptions({
          headerRight: () => (
            <ScoreDisplay score={score} mode="time" difficulty={difficulty}/>
          ),
        });
      }, [navigation, score]);

    const goBack = () => {
        navigation.pop()
        timerStore.clearExistingInterval()
    }

    const submit = ()=> {
        spellWordRef?.current?.stop?.()
        const isCorrect = answer.trim().toLowerCase() === question.answer.trim().toLowerCase();
        const capitalized = question.answer.charAt(0).toUpperCase() + question.answer.slice(1);
        modalRef?.current?.open(isCorrect, capitalized);
        setAnswer("")
        if(isCorrect) setScore((prev) => prev + 1)

        getQuestion(false)
    } 

    const handleKeyPress = (key) => {
        setAnswer((prev) => {
            let updatedString = key === 'backspace' 
                ? prev.slice(0, -1)
                : prev + key; 
            return updatedString.charAt(0).toUpperCase() + updatedString.slice(1).toLowerCase();
        });
    };

    const getQuestion = (initial = true) => {
        //Get Question + blank out answer
        let updatedQuestions = excludeQuestionById(allQuestions ,question?.id)
        if(updatedQuestions.length == 0) {
            setAllQuestions(questionData)
            updatedQuestions = questionData
        }
        else setAllQuestions(updatedQuestions)
        const newQuestion = maskAnswer(
            getRandomQuestionByDifficulty(updatedQuestions,difficulty)
        )

        if(initial)setQuestion(newQuestion)
        else {
            setTimeout(()=>{
                setUpcomingQuestion(newQuestion)
                spellWordRef?.current?.triggerTransition?.();
            },1000);
            setTimeout(()=>{
                setQuestion(newQuestion)
            },1500)
        }
        return newQuestion
    }

    const timesUp = () => {
        setForcedModalVisibility(true)
        setTimeout(()=>scoreModalRef?.current?.open(score),100)
    }

    useEffect(()=>{
        timerStore.resetTimer()
        timerStore.startTimer();
        getQuestion()
    },[])

    return(
        <ScreenView>
            {/* <View style={styles.curvedBackground} /> */}
            <Timer style={{marginTop:10}} onComplete={timesUp}/>
            <SuccessModal ref={modalRef} forceInvisible={forcedModalVisibility}/>
            <ScoreModal ref={scoreModalRef} callback={goBack} mode={'time'} difficulty={difficulty}/>
            <SpellWord ref={spellWordRef} question={question} upcomingQuestion={upcomingQuestion} answer={answer} setAnswer={setAnswer}
            submitCallback={submit}/>
            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
                {/* <Keyboard onKeyPress={handleKeyPress} style={{marginBottom: 20}}/> */}

                <View style={{ width: '90%'}}>
                    <Button onPress={submit} backgroundColor={text} style={{}}>
                        <Text color={background} fontSize={18} style={{fontWeight: 'bold'}}>Submit</Text>
                    </Button>
                </View>
            </View>
        </ScreenView>
    )
}

const styles = StyleSheet.create({
    container: {
    flex: 1,
    },
    content: {
    flex: 1,
    },
    curvedBackground: {
        position: 'absolute',
        top: 0,
        width: width * 1.75,
        left: -width * 0.375,
        height: height * 1.1/ 3, 
        backgroundColor: '#F6C72C',
        borderBottomLeftRadius: 450,
        borderBottomRightRadius: 450,
    },
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row',
        width: '100%',
    },
    image: {
        width: 40,
        height: 40,
    },
    timerContainer: { alignItems: 'center', width: 180,},
    timerText: {
        fontSize: 24,
    },
    timerTextRed: {
        color: 'red',
    },
    crossButton: {
        justifyContent: 'center',   
        alignItems: 'center',    
      },
    
})