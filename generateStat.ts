import { pickValue } from "./beta-wrc.js"
import Cook, { CookStats } from "./cook.js"

const MAX_ALPHA = 20

function betaFromModeAndAlpha ({alpha, mode}: {alpha: number, mode: number}) {
    mode = Math.max(mode, 0.001)
    return (alpha*(1 - mode)+2*mode-1)/mode
}

const setMaxAlpha = (maxAplha: number) => (mode: number) => -4*(maxAplha - 1)*Math.pow((mode - 1/2), 2) + maxAplha
const funfunwithsin = (maxAplha: number) => (mode: number) => (maxAplha - 1)*Math.sin(mode * Math.PI) + 1

// console.log(generateDistribution(100))

// console.log({result: pickValue()})

// console.log(betaFromModeAndAlpha({alpha: 6, mode: 0.60}))

const getAlphaFromMode = setMaxAlpha(MAX_ALPHA)

function getValueFromMode (mode: number) {
    const alpha = getAlphaFromMode(mode)
    const beta = betaFromModeAndAlpha({alpha: getAlphaFromMode(mode), mode})
    return pickValue(alpha, beta)
}

export default function generateStats (modedStats: CookStats): CookStats {
    return {
        knowledge: getValueFromMode(modedStats.knowledge),
        skills: getValueFromMode(modedStats.skills),
        speed: getValueFromMode(modedStats.speed),
        taste: getValueFromMode(modedStats.taste),
    }
}