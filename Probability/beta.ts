import weightedRandomChoice, { generateWeights } from "./wrc.js";

const MAX_ALPHA = 80

function betaPDF(x: number, a: number, b: number) {
    // Beta probability density function impementation
    // using logarithms, no factorials involved.
    // Overcomes the problem with large integers
    return Math.exp(lnBetaPDF(x, a, b))
}
function lnBetaPDF(x: number, a: number, b: number) {
        // Log of the Beta Probability Density Function
    return ((a-1)*Math.log(x) + (b-1)*Math.log(1-x)) - lnBetaFunc(a,b)
}
function lnBetaFunc(a: number, b: number) {
	// Log Beta Function
    // ln(Beta(x,y))
    let foo = 0.0;

    for (let i=0; i<a-2; i++) {
        foo += Math.log(a-1-i);
    }
    for (let i=0; i<b-2; i++) {
        foo += Math.log(b-1-i);
    }
    for (let i=0; i<a+b-2; i++) {
        foo -= Math.log(a+b-1-i);
    }
    return foo
}

// Beta from mode equation of beta law, with set alpha and mode
function betaFromModeAndAlpha ({alpha, mode}: {alpha: number, mode: number}) {
    mode = Math.max(mode, 0.001)
    return (alpha*(1 - mode)+2*mode-1)/mode
}

// quadratic function adapting alpha parameter depending on the mode
const setMaxAlpha = (maxAplha: number) => (mode: number) => -4*(maxAplha - 1)*Math.pow((mode - 1/2), 2) + maxAplha
// Sinus function adapting alpha parameter depending on the mode (almost identical to quadratic)
// const setMaxAlphaSin = (maxAplha: number) => (mode: number) => (maxAplha - 1)*Math.sin(mode * Math.PI) + 1

const getAlphaFromMode = setMaxAlpha(MAX_ALPHA)


export function pickValue (mode: number) {
    const alpha = getAlphaFromMode(mode)
    const beta = betaFromModeAndAlpha({ alpha, mode })
    const curryPDF = (a: number, b: number) => (x: number) => betaPDF(x, a, b)
    const alphaBetaPDF = curryPDF(alpha, beta)
    const getWeight = (i: number) => alphaBetaPDF(i/100)

    const {weights, values} = generateWeights(getWeight)
    return weightedRandomChoice(values, weights)
}