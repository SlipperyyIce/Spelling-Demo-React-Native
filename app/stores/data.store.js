import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default class DataStore {
  highscores = {};
  dailyAttempted = false;
  lastAttemptDate = '';
  dailyStreak = 0;
  highestStreak = 0;
  customTests = [];
  name = '';
  dailyAttempts = 0;
  vibrationsOn = true;
  soundEffectsOn = true;
  ttsSpeakSentence = false;

  constructor() {
    makeAutoObservable(this);
    this.loadData();
  }

  setData(key, value) {
    this[key] = value;
  }

  loadCustomTests = async () => {
    try {
      const testsString = await AsyncStorage.getItem('customTests');
      const tests = testsString ? JSON.parse(testsString) : []; 
      this.setData("customTests", tests)
    } catch (error) {
      console.error('Error loading custom test', error);
    }
  }

  addCustomTests = async (newTest) => {
    let newTests = this.customTests ?? []
    const index = newTests.findIndex(test => test.id === newTest.id);

    if (index !== -1) {
      newTests[index] = newTest;
    } else {
      newTests.push(newTest);
    }

    this.setData("customTests", newTests);
    await AsyncStorage.setItem('customTests', JSON.stringify(newTests));
  }

  deleteCustomTest = async (id) => {
    let customTests = this.customTests;

    const updatedTests = customTests.filter(test => test?.id !== id);

    this.setData("customTests", updatedTests)
    await AsyncStorage.setItem('customTests', JSON.stringify(updatedTests));
  }

  loadData = async () => {
    try {
      const savedHighScores = await AsyncStorage.getItem('highscores');
      const savedLastAttemptDate = await AsyncStorage.getItem('lastAttemptDate');
      const savedDailyAttempted = await AsyncStorage.getItem('dailyAttempted');
      const savedDailyStreak = await AsyncStorage.getItem('dailyStreak');
      const savedHighestStreak = await AsyncStorage.getItem('highestStreak');
      const savedName = await AsyncStorage.getItem('name');
      const savedDailyAttempts = await AsyncStorage.getItem('dailyAttempts'); // Load daily attempts

      const savedVibr = await AsyncStorage.getItem('vibrationsOn');
      const savedSoundEffectsOn = await AsyncStorage.getItem('soundEffectsOn');
      const savedTtsSpeakSentence = await AsyncStorage.getItem('ttsSpeakSentence');


      if (savedHighScores) this.setData('highscores', JSON.parse(savedHighScores));
      if (savedLastAttemptDate) this.setData('lastAttemptDate', savedLastAttemptDate);
      if (savedDailyAttempted) this.setData('dailyAttempted', JSON.parse(savedDailyAttempted));
      if (savedDailyStreak) this.setData('dailyStreak', parseInt(savedDailyStreak, 10));
      if (savedHighestStreak) this.setData('highestStreak', parseInt(savedHighestStreak, 10));
      if (savedName) this.setData('name', savedName);
      if (savedDailyAttempts) this.setData('dailyAttempts', parseInt(savedDailyAttempts, 10))
      if (savedVibr !==null) this.setData('vibrationsOn', 'true' == savedVibr); 
      if (savedSoundEffectsOn !==null) this.setData('soundEffectsOn', 'true' == savedSoundEffectsOn);
      if (savedTtsSpeakSentence !==null) this.setData('ttsSpeakSentence', 'true' == savedTtsSpeakSentence)
      this.loadCustomTests();

      this.resetDailyIfNeeded();
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  saveData = async () => {
    try {
      await AsyncStorage.setItem('highscores', JSON.stringify(this.highscores));
      await AsyncStorage.setItem('lastAttemptDate', this.lastAttemptDate);
      await AsyncStorage.setItem('dailyAttempted', JSON.stringify(this.dailyAttempted));
      await AsyncStorage.setItem('dailyStreak', this.dailyStreak.toString());
      await AsyncStorage.setItem('highestStreak', this.highestStreak.toString());
      await AsyncStorage.setItem('dailyAttempts', this.dailyAttempts.toString()); // Save daily attempts
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };


  saveSolo = async (item, value) => {
    try {
      this.setData(item, value);
      await AsyncStorage.setItem(item, JSON.stringify(value));
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };


  setName = async (newName) => {
    this.setData('name', newName);
    await AsyncStorage.setItem('name', newName);
  };

  updateHighScore = (mode, newScore) => {
    if (!this.highscores[mode] || newScore > this.highscores[mode]) {
      this.setData('highscores', {
        ...this.highscores,
        [mode]: newScore,
      });
      this.saveData();
    }
  };

  // Reset the daily streak if a day is missed
  resetDailyIfNeeded = () => {
    const today = this.getCurrentDate();

    // If the user didn't play yesterday, reset the streak
    if (this.lastAttemptDate && this.daysBetween(this.lastAttemptDate, today) > 1) {
      this.setData('dailyStreak', 0);
    }


    if (this.lastAttemptDate !== today) {
      this.setData('dailyAttempted', false);
      this.setData('dailyAttempts', 0);
      setTimeout(()=>this.saveData(),10)
    }
  };

  markDailyAttempt = (isCorrect) => {
    const today = this.getCurrentDate();

    if (this.dailyAttempted) {
      console.warn('Daily word already attempted today.');
      return;
    }

    if (this.dailyAttempts >= 3) {
      console.warn('Maximum daily attempts reached.');
      return;
    }

    if(!isCorrect)this.setData('dailyAttempts', this.dailyAttempts + 1); // Increment daily attempts

    if (isCorrect) {
      this.setData('lastAttemptDate', today);
      this.setData('dailyAttempted', true);
      const newStreak = this.dailyStreak + 1;
      this.setData('dailyStreak', newStreak);
      if (newStreak > this.highestStreak) {
        this.setData('highestStreak', newStreak);
      }
    } else if (this.dailyAttempts >= 3) {
      this.setData('lastAttemptDate', today);
      this.setData('dailyAttempted', true); // Mark as attempted after 3 incorrect attempts
      this.setData('dailyStreak', 0); // Reset streak on incorrect answer
    }

    this.saveData();
  };

  // Utility function to get the current date in 'YYYY-MM-DD' format
  getCurrentDate = () => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  };

  // Utility function to calculate the number of days between two dates
  daysBetween = (date1, date2) => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return Math.floor((d2 - d1) / (1000 * 60 * 60 * 24));
  };
}