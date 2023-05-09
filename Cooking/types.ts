export interface ICook {
    children: ICook[],
    ancestors?: ICook[],
    stats: CookStats,
    name: string
}

export interface IMatable {
    mate(partner: IMatable, childName: string): IHatchable<IMatable>,
    partners: IMatable[]
}

export interface IHatchable<T> {
    hatch(): Promise<T> | void
}

export type CookStatsProperties = 'knowledge' | 'speed' | 'taste' | 'skills'

export type CookStats = Record<CookStatsProperties, number>

// Roughly equivalent 
// export interface CookStats {
//     knowledge: number,
//     speed: number,
//     taste: number,
//     skills: number,
//     [key: string]: number
// }