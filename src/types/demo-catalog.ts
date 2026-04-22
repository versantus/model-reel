import type { Simulation, ProductType } from './simulation'

export interface DemoCategory {
  id: string
  label: string
  description?: string
}

export interface DemoEntry {
  id: string
  label: string
  sim: Simulation
  view: ProductType
  category: string
  source: 'builtin' | 'user'
  description?: string
  tags?: string[]
}

export interface DemoCatalog {
  categories: DemoCategory[]
  entries: DemoEntry[]
}
