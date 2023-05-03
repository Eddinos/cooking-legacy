import { pickValue } from "./beta-wrc.js"
import { sampleBetaLaw } from "./beta-sample.js"
import Cook, { CookStats, CookStatsProperties } from "./cook.js"

const MAX_ALPHA = 60

enum pickingModes {
    wrc = 'wrc',
    sample = 'sample',
    gaussian = 'gauss'
}

function betaFromModeAndAlpha ({alpha, mode}: {alpha: number, mode: number}) {
    mode = Math.max(mode, 0.001)
    return Math.max((alpha*(1 - mode)+2*mode-1)/mode, 10)
}

const setMaxAlpha = (maxAplha: number) => (mode: number) => -4*(maxAplha - 1)*Math.pow((mode - 1/2), 2) + maxAplha
// It's possible to obtain equivalent result with a sinus function
// const setMaxAlphaWithSin = (maxAplha: number) => (mode: number) => (maxAplha - 1)*Math.sin(mode * Math.PI) + 1

const getAlphaFromMode = setMaxAlpha(MAX_ALPHA)

function getValueFromMode (mode: number, pickingMethod: pickingModes): number {
    // Necessary for PDF - WRC picking (Math.log(0) is NaN)
    // const notZeroMode = Math.max(mode, 0.0001)
    const alpha = getAlphaFromMode(mode)
    const beta = Math.max(betaFromModeAndAlpha({alpha, mode}), 1)

    switch (pickingMethod) {
        case pickingModes.sample:
            return Math.round(sampleBetaLaw(alpha, beta)*100)
        case pickingModes.wrc:
            return pickValue(alpha, beta)
        default:
            return 0
    } 
}

export default function generateStats (modedStats: CookStats): CookStats {

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