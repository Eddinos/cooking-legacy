import weightedRandomChoice, { generateWeights } from './wrc.js'

function gaussianPDF(x: number, mean: number, stdDev: number) {
    let exponent = -1 * ((x - mean) ** 2) / (2 * stdDev ** 2);
    let coefficient = 1 / (stdDev * Math.sqrt(2 * Math.PI));
    return coefficient * Math.exp(exponent);
}

export function pickValueG ({mode}: {mode: number}) {
    const {weights, values} = generateWeights(i => gaussianPDF(i, mode, 33), 100)
    return weightedRandomChoice(values, weights)
}
