import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Appearance} from 'react-native';
import { colors } from '../constants/colors';

const {
  background,
  backgroundDark,
  primary,
  secondary,
  backgroundVarient,
  backgroundVarientDark,
  text,
  textDimmed,
  textDark,
  textDimmedDark,
  black,
  white,
} = colors;

export default class ColorStore {
  theme = 'light'; 
  colors = this.getLightColors();


  constructor() {
    makeAutoObservable(this);
    this.loadTheme(); // Load theme from storage on initialization
  }

  // Light theme colors
  getLightColors() {
    return {
      background,
      backgroundVarient: backgroundVarient,
      primary: backgroundVarient,
      secondary,
      text,
      textDimmed,
      negative: white,
      black,
      white,
    };
  }

  // Dark theme colors
  getDarkColors() {
    return {
      background: backgroundDark,
      backgroundVarient: backgroundVarientDark,
      primary,
      secondary,
      text: textDark,
      textDimmed: textDimmedDark,
      negative: black,
      black,
      white,
    };
  }

  setData(key, value) {
    this[key] = value;
  }

  async toggleTheme() {
    const newTheme = this.theme === 'light' ? 'dark' : 'light';
    this.setData('theme', newTheme);
    this.colors =
      newTheme === 'dark' ? this.getDarkColors() : this.getLightColors();
    Appearance.setColorScheme(newTheme)

    try {
      await AsyncStorage.setItem('theme', newTheme);
    } catch (error) {
      console.error('Failed to save theme to storage:', error);
    }
  }

  // Load theme from AsyncStorage
  async loadTheme() {
    try {
      const storedTheme = await AsyncStorage.getItem('theme');
      if (storedTheme) {
        Appearance.setColorScheme(storedTheme)
        this.setData('theme', storedTheme);
        this.setData('colors', storedTheme === 'dark' ? this.getDarkColors() : this.getLightColors());
      }
    } catch (error) {
      console.error('Failed to load theme from storage:', error);
    }
  }
}
