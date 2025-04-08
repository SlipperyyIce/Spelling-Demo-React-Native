import { makeAutoObservable } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';
import _ from 'lodash';

export default class EducationStore {
  progress = {};

  constructor() {
    makeAutoObservable(this);
    this.loadData();
  }

  setData(key, value) {
    this[key] = value;
  }

  loadData = async () => {
    try {
      const savedProgress = await AsyncStorage.getItem('progress');
      if (savedProgress) this.setData('progress', JSON.parse(savedProgress));
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  updateProgress = async (id, score, ignore=false) => {
    if(!id) return
    try {
      if (!this.progress?.[id] || score > this.progress?.[id] || ignore) {
        this.progress = _.merge({}, this.progress, { [id]: score });
        await AsyncStorage.setItem('progress', JSON.stringify(this.progress));
      }
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };
  deleteAllProgress = async () => {
    try {
      this.progress = {};
      await AsyncStorage.removeItem('progress');
    } catch (error) {
      console.error('Error deleting all data from AsyncStorage:', error);
    }
  };
}
