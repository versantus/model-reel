import type { Simulation } from '../types/simulation'

export function serializeSimulation(sim: Simulation): string {
  return JSON.stringify(sim, null, 2)
}

export function deserializeSimulation(json: string): Simulation {
  const data = JSON.parse(json)
  if (!data.id || !data.productType || !Array.isArray(data.events)) {
    throw new Error('Invalid simulation format')
  }
  return data as Simulation
}

export function validateSimulation(data: unknown): Simulation {
  const obj = data as Record<string, unknown>
  if (!obj.id || !obj.productType || !Array.isArray(obj.events)) {
    throw new Error('Invalid simulation format')
  }
  return obj as unknown as Simulation
}

export function downloadSimulation(sim: Simulation) {
  const json = serializeSimulation(sim)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${sim.title.replace(/\s+/g, '-').toLowerCase()}.json`
  a.click()
  URL.revokeObjectURL(url)
}

export function loadSimulationFromFile(): Promise<Simulation> {
  return new Promise((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = '.json'
    input.onchange = async () => {
      const file = input.files?.[0]
      if (!file) return reject(new Error('No file selected'))
      const text = await file.text()
      resolve(deserializeSimulation(text))
    }
    input.click()
  })
}
