export default function weightedRandomChoice (items: number[], weights: number[]) {
    let i;

    for (i = 1; i < weights.length; i++)
        weights[i] += weights[i - 1];
    
    var random = Math.random() * weights[weights.length - 1];
    
    for (i = 0; i < weights.length; i++)
        if (weights[i] > random)
            break;
    
    return items[i];
}

export function generateWeights(getWeight: (i: number) => number, valuesNb: number = 100) {
    const values: number[] = []
    const weights: number[] = []
    // const curryPDF = (a: number, b: number) => (x: number) => betaPDF(x, a, b)
    // const alphaBetaPDF = curryPDF(alpha, beta)
    for (let i = 0; i<=valuesNb; i++) {
        weights.push(getWeight(i))
        values.push(i)
    }
    return {
        weights,
        values
    }
}