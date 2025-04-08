import { createContext, useContext } from 'react'

import ColorStore from './color.store'
import DataStore from './data.store'
import TimerStore from './timer.store'
import EducationStore from './education.store'

const StoresContext = createContext({
  colorStore: new ColorStore(),
  dataStore: new DataStore(),
  timerStore: new TimerStore(),
  educationStore: new EducationStore(),
})

export const useStores = () => useContext(StoresContext)
