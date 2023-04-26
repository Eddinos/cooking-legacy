// Thank you https://github.com/royhzq/betajs
import weightedRandomChoice, { generateWeights } from "./wrc.js";

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

export function pickValue (a=30, b=88) {
    const curryPDF = (a: number, b: number) => (x: number) => betaPDF(x, a, b)
    const alphaBetaPDF = curryPDF(a, b)
    const getWeight = (i: number) => alphaBetaPDF(i/100)
    const {weights, values} = generateWeights(getWeight)
    return weightedRandomChoice(values, weights)
}