import { validateSimulation } from '../engine/serialization'
import type { Simulation, ProductType } from '../types/simulation'

export interface DemoEntry {
  label: string
  sim: Simulation
  view: ProductType
  category: 'basic' | 'advanced'
}

const basicModules = import.meta.glob('./basic/*.json', { eager: true })
const advancedModules = import.meta.glob('./advanced/*.json', { eager: true })

function loadDemos(
  modules: Record<string, unknown>,
  category: 'basic' | 'advanced'
): DemoEntry[] {
  return Object.values(modules).map((mod) => {
    const raw = (mod as { default?: unknown }).default ?? mod
    const sim = validateSimulation(raw)
    return {
      label: sim.title,
      sim,
      view: sim.productType,
      category,
    }
  })
}

export const basicDemos = loadDemos(basicModules, 'basic')
export const advancedDemos = loadDemos(advancedModules, 'advanced')
export const allDemos: DemoEntry[] = [...basicDemos, ...advancedDemos]
