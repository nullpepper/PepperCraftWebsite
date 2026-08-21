import playersData from './players.json'
import townsData from './towns.json'
import wealthData from './wealth.json'

export interface PlayerStat {
  name: string
  hours: number
  deaths: number
  kills: number
  jumps?: number
  walk_km?: number
}

export interface Town {
  id: number
  name: string
}

export interface WealthEntry {
  name: string
  balance: number
}

/** 玩家游戏时长排行（快照） */
export const PLAYERS: PlayerStat[] = (playersData.leaderboard as PlayerStat[]).map((p) => ({
  ...p,
  name: p.name.replace(/^远古玩家·/, '远古玩家 '),
}))

export const TOTAL_HOURS = (playersData as { total_hours?: number }).total_hours ?? 14658
export const PLAYER_COUNT = (playersData as { total_count?: number }).total_count ?? 205

/** 城镇名单（快照） */
export const TOWNS: Town[] = townsData as Town[]

/** 财富榜（快照） */
export const WEALTH: WealthEntry[] = wealthData as WealthEntry[]
