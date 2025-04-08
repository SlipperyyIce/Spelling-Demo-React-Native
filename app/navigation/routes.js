import { DailyWord, Home, PlayScreen, Streaks } from "../screens"
import { routeUrls } from "./routeUrls"


const HomeStack =  [
    {
        name: routeUrls.home,
        component: Home,
        options: {headerShown: false},
    },
    {
        name: routeUrls.play,
        component: PlayScreen,
        options: {headerShown: true},
    },
    {
        name: routeUrls.streaks,
        component: Streaks,
        options: {headerShown: true},
    },
    {
        name: routeUrls.dailyWord,
        component: DailyWord,
        options: {headerShown: true},
    },
]

export const root = [
    ...HomeStack,
]