import { Button, Input, Keyboard, ProgressTimer, RoundedContainer, ScoreDisplay, ScoreModal, ScreenView, SpellWord, SuccessModal, Text, Timer } from "../../components"
import { useStores } from '../../stores';
import { mascot } from '../../assets';
import { StyleSheet, Image, View, TouchableOpacity, Dimensions } from "react-native";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { questionData } from "../../constants/questions";
import { excludeQuestionById, getRandomQuestionByDifficulty, maskAnswer } from "../../lib/helper";

const { width } = Dimensions.get('window');

export const Streaks = ({navigation, route}) => {
    const { colorStore, timerStore } = useStores();
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
    const timerRef =  useRef();
    
    useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => (
            <ScoreDisplay score={score} mode="streaks" difficulty={difficulty}/>
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
        if(isCorrect) {
            setScore((prev) => prev + 1)
            timerRef?.current?.resetTimer()
            setTimeout(()=>{timerRef?.current?.startTimer()},500)
        }

        getQuestion(false)
    } 


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
        getQuestion()
    },[])
    
    return(
        <ScreenView>
            <View style={{ marginTop: 25, paddingHorizontal: 25 }}>
                {/* <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                <Text style={{ fontSize: 40,
                    textShadowColor: "white",
                    textShadowOffset: { width: -2, height: -2},
                    textShadowRadius: 5,
                    }}>Word Sprint</Text>
                </View> */}
            </View>

            <ScoreModal ref={scoreModalRef} callback={goBack} mode={'streaks'} difficulty={difficulty}/>
            <SuccessModal ref={modalRef} forceInvisible={forcedModalVisibility}/>
            <ProgressTimer onComplete={timesUp} ref={timerRef}/>
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
    buttonContainer: {
        marginTop: 10,
        flexDirection: 'row', // Arrange buttons horizontally
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
    
})