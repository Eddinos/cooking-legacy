import generateStats from "./generateStat.js"
import { IMatable, CookStats, IHatchable, ICook } from "./types.js"


class Egg implements IHatchable<IMatable> {
    constructor ({parents, name}: {parents: [IMatable, IMatable], name: string}) {
        this.parents = parents
        this.name = name
        this.isWaiting = true
    }

    parents: IMatable[]
    name: string
    protected isWaiting: boolean

    hatch () {
        this.isWaiting = false
        throw new Error('other types not handled yet')
    }
}

class CookEgg extends Egg implements IHatchable<Cook> {
    constructor ({parents, name}: {parents: [Cook, Cook], name: string}) {
        super({parents, name})
    }

    hatch () {
        if (this.parents[0] instanceof Cook && this.parents[1] instanceof Cook && this.isWaiting) {
            this.isWaiting = false
            const offspring = new Cook({ 
                ancestors: [this.parents[0], this.parents[1]], 
                stats: getStatsFromParents(this.parents[0], this.parents[1]), 
                name: this.name
            })
            return new Promise<Cook>((resolve, reject) => {
                setTimeout(() => {
                    resolve(offspring)
                }, 10000)
            })
        }

        throw new Error('somthing went wrong with its parents')
    }


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
            return new CookEgg({ parents: [this, partner], name: childName})
        } else {
            throw new Error('cannot mate with an unknown partner')
        }
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