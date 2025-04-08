import { makeAutoObservable } from 'mobx';

export default class TimerStore {
  minutes = 2;
  seconds = 0;
  isRunning = false;
  onComplete = null; // Callback for when the timer finishes
  interval = null; // Store the interval ID to clear it later

  constructor() {
    makeAutoObservable(this);
  }

  setData(key, value) {
    this[key] = value;
  }

  setOnComplete(callback) {
    this.onComplete = callback;
  }

  // Clear the existing timer interval before starting a new one
  clearExistingInterval() {
    if (this.interval) {
      clearInterval(this.interval);
      this.interval = null; // Reset the interval reference
    }
  }

  runTimer = () => {
    this.interval = setInterval(() => {
      if (this.seconds > 0) {
        this.setData('seconds', this.seconds - 1);
      } else if (this.minutes > 0) {
        this.setData('minutes', this.minutes - 1);
        this.setData('seconds', 59);
      } else {
        this.clearExistingInterval(); // Stop the timer when time is up
        this.setData('isRunning', false);
        if (this.onComplete) {
          this.onComplete(); // Call the callback when time is up
        }
      }
    }, 1000);
  };

  resetTimer = (mins = 2, secs = 0) => {
    this.clearExistingInterval(); // Clear the interval when resetting
    this.setData('minutes', mins);
    this.setData('seconds', secs);
    this.setData('isRunning', false);
  };

  startTimer = () => {
    if (!this.isRunning) {
      this.setData('isRunning', true);
      this.clearExistingInterval(); // Ensure no previous timer is running
      this.runTimer();
    }
  };
}

export const timerStore = new TimerStore();