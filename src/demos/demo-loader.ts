import { validateSimulation } from '../engine/serialization'
import type { Simulation, ProductType } from '../types/simulation'
import type { DemoEntry } from '../types/demo-catalog'

const basicModules = import.meta.glob('./basic/*.json', { eager: true })
const advancedModules = import.meta.glob('./advanced/*.json', { eager: true })

function loadDemos(
  modules: Record<string, unknown>,
  category: string
): DemoEntry[] {
  return Object.entries(modules).map(([path, mod]) => {
    const raw = (mod as { default?: unknown }).default ?? mod
    const sim = validateSimulation(raw)
    // Derive a stable ID from the filename
    const fileName = path.split('/').pop()?.replace(/\.json$/, '') ?? sim.id
    return {
      id: `builtin:${fileName}`,
      label: sim.title,
      sim,
      view: sim.productType,
      category,
      source: 'builtin',
      description: sim.description,
      tags: [sim.productType.replace('claude-', ''), category],
    }
  })
}

export const builtinDemos: DemoEntry[] = [
  ...loadDemos(basicModules, 'basic'),
  ...loadDemos(advancedModules, 'advanced'),
]
