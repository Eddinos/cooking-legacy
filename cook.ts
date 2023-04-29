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

export interface CookStats {
    knowledge: number,
    speed: number,
    taste: number,
    skills: number
}

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

function getStatsFromParents (parent1: IMatable, parent2: IMatable): CookStats {
    return {
        knowledge: 0,
        skills: 0,
        taste: 0,
        speed: 0
    }
}

// class Cook {
//     constructor() {
        
//     }

//     private children = []
//     private ancestors = []
// }