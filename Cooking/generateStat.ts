import { CookStats, CookStatsProperties } from "./cook.js"
import getValueFromMode, { pickingModes } from "../Probability/getValueFromMode.js"

// const MAX_ALPHA = 60


export default function generateStats (modedStats: CookStats): CookStats {

    // Avoid listing every property if CookStats were to change
    // Not sure about this one though
    const keys = Object.keys(modedStats) as CookStatsProperties[]
    return keys.reduce<CookStats>((acc: CookStats, key: CookStatsProperties) => {
        acc[key] = getValueFromMode(modedStats[key] / 100, pickingModes.sample)
        return acc
    }, {} as CookStats)

    // return {
    //     knowledge: getValueFromMode(modedStats.knowledge / 100),
    //     skills: getValueFromMode(modedStats.skills / 100),
    //     speed: getValueFromMode(modedStats.speed / 100),
    //     taste: getValueFromMode(modedStats.taste / 100),
    // }
}