import generateStats from "./generateStat.js"

interface ICook {
    children: Cook[],
    ancestors?: Cook[],
    stats: CookStats,
    name: string
}

interface IMatable {
    mate(partner: IMatable, childName: string): IMatable,
    partners: IMatable[]
}

export type CookStatsProperties = 'knowledge' | 'speed' | 'taste' | 'skills'

// export interface CookStats {
//     knowledge: number,
//     speed: number,
//     taste: number,
//     skills: number,
//     [key: string]: number
// }

export type CookStats = Record<CookStatsProperties, number>

export default class Cook implements ICook, IMatable {
    constructor({ancestors, stats, name}: {ancestors?: Cook[], stats: CookStats, name: string}) {
        this.ancestors = ancestors
        this.stats = stats
        this.name = name
    }

    ancestors?: Cook[]
    children: Cook[] = []
    stats: CookStats
    name: string

    public addPartner (partner: Cook) {
        this.partners.push(partner)
        partner.partners.push(this)
    }

    public mate (partner: Cook, childName: string) {
        if (this.partners.includes(partner)) {
            const child = new Cook({ ancestors: [this, partner], stats: getStatsFromParents(this, partner), name: childName}) as Cook;
            this.children.push(child)
            partner.children.push(child)
            return child
        } else {
            console.log('wtf bro you cant do that')
        }
        return this;
    }

    public familyTree () {
        const displayFamily = (relatives?: Cook[]) => relatives ? relatives.map(r => r.name) : 'aucun'
        const ancestors = displayFamily(this.ancestors)
        const children = displayFamily(this.children)
        
        return `arbre généalogique : ancestors ${ancestors} \n children ${children}`
    }

    partners: IMatable[] = []
}

function getStatsFromParents (parent1: ICook, parent2: ICook): CookStats {

    const mean = (a: number, b: number) => (a + b) / 2

    const meanStats: CookStats = {
        knowledge: mean(parent1.stats.knowledge, parent2.stats.knowledge),
        skills: mean(parent1.stats.skills, parent2.stats.skills),
        speed: mean(parent1.stats.speed, parent2.stats.speed),
        taste: mean(parent1.stats.taste, parent2.stats.taste)
    }

    return generateStats(meanStats);
}

// class Cook {
//     constructor() {
        
//     }

//     private children = []
//     private ancestors = []
// }