import { Platform } from "react-native";
import { soundFile } from "../assets/sounds";
import { Audio } from "expo-av";
import _ from "lodash";

function getSeededRandom() {
  const now = new Date();
  const year = now.getFullYear();
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  const day = now.getDate().toString().padStart(2, "0");
  const dateString = `${year}-${month}-${day}`;

  let hash = 0;
  for (let i = 0; i < dateString.length; i++) {
    hash = dateString.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }
  return () => (hash = (hash * 9301 + 49297) % 233280) / 233280;
}

export const pickDailyWord = (wordList) =>{
  const random = getSeededRandom();
  const index = Math.floor(random() * wordList.length);
  return wordList[index];
}

export const getRandomQuestionByDifficulty = (data, difficulty) => {
  const filteredData = difficulty 
    ? data.filter(item => item.difficulty === difficulty) 
    : data;
  
  if (filteredData.length === 0) {
    return null;
  }
  
  const randomIndex = Math.floor(Math.random() * filteredData.length);
  return filteredData[randomIndex];
}

export const excludeQuestionById = (data, id) => {
  if (!id) return data;
  return data.filter(item => item.id !== id);
}

export const maskAnswer = (obj) =>{
  if(!obj?.answer || !obj?.message) return obj

  const { answer, message } = obj;
  const regex = new RegExp(`\\b${answer}\\b`, 'gi');
  const maskedMessage = message?.replace(regex, '_'.repeat(answer?.length)) ?? undefined;
  return {
      ...obj,
      mask_message: maskedMessage,
  };
}

export const enableSound = async () => {
  const soundObject = new Audio.Sound();
  if (Platform.OS === "ios") {
    await Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    await soundObject.loadAsync(soundFile);
    await soundObject.playAsync();
  }
};
