import { generateDistribution } from './Probability/beta-sample.js'
import { pickValue } from './Probability/beta-wrc.js'
import { pickValueG } from './Probability/gaussian.js'
import Cook from './Cooking/cook.js'

const MAX_ALPHA = 20
const TEST_MODE = 95

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

// console.log(getAlphaFromMode(0))

// const testMode = 0.95

// const paramsSet = {
//     mode: TEST_MODE,
//     alpha: getAlphaFromMode(TEST_MODE / 100),
//     beta: betaFromModeAndAlpha({alpha: getAlphaFromMode(TEST_MODE / 100), mode: TEST_MODE / 100})
// }

// console.log(paramsSet)

// let mean = []
// for (let i = 0; i<1000; i++) {
//     mean.push(pickValue(paramsSet.alpha, paramsSet.beta))
// }

// console.log('pickvalue mean', mean.reduce(function (avg, value, _, { length }) {
//     return avg + value / length;
// }, 0))

// let meanG = []
// for (let i = 0; i<1000; i++) {
//     meanG.push(pickValueG({mode: paramsSet.mode}))
// }

// console.log('pickvalueG mean', meanG.reduce(function (avg, value, _, { length }) {
//     return avg + value / length;
// }, 0))

// console.log(mean)


// function picpic (distrib, mode) {
//     switch (distrib) {
//         case 'beta':
//             return betalaw => ('sample'|'pdf') => (mode) => {pickValue(mode)}
//             break;
//         case 'normal':
//             return normalLaw => ('sample'|'pdf') => (mode) => pickValue(mode)
    
//         default:
//             break;
//     }
// }

const edd = new Cook({ stats: {
    knowledge: 50,
    skills: 0,
    speed: 99,
    taste: 0
}, name: 'Eddine' })

const manue = new Cook({ stats: {
    knowledge: 100,
    skills: 0,
    speed: 50,
    taste: 50
}, name: 'Manue'})

edd.addPartner(manue)

const egg = manue.mate(edd, 'Tessa')
async function waitForEgg() {
    const tessa = await egg.hatch()
    console.log('tessas stats', tessa.stats)
}
waitForEgg()
console.log('The game keeps going')

// console.log(tessa.familyTree())
// console.log(edd.familyTree())


// console.log(getValueFromMode(0.2))