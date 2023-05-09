import { sampleBetaLaw } from "./beta-sample.js"
import { pickValue } from "./beta-wrc.js"

const MAX_ALPHA = 60

function betaFromModeAndAlpha ({alpha, mode}: {alpha: number, mode: number}) {
    mode = Math.max(mode, 0.001)
    return Math.max((alpha*(1 - mode)+2*mode-1)/mode, 10)
}

const setMaxAlpha = (maxAplha: number) => (mode: number) => -4*(maxAplha - 1)*Math.pow((mode - 1/2), 2) + maxAplha
// It's possible to obtain equivalent result with a sinus function
// const setMaxAlphaWithSin = (maxAplha: number) => (mode: number) => (maxAplha - 1)*Math.sin(mode * Math.PI) + 1

const getAlphaFromMode = setMaxAlpha(MAX_ALPHA)

export enum pickingModes {
    wrc = 'wrc',
    sample = 'sample',
    gaussian = 'gauss'
}

export default function (mode: number, pickingMethod: pickingModes): number {
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