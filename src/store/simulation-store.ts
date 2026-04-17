import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { Simulation, RenderedEvent, StatusBarState, SimulationEvent } from '../types/simulation'

interface SimulationStore {
  simulation: Simulation | null
  renderedEvents: RenderedEvent[]
  statusBar: StatusBarState

  loadSimulation: (sim: Simulation) => void
  appendRenderedEvent: (event: SimulationEvent) => void
  updateEventProgress: (eventId: string, progress: number) => void
  completeEvent: (eventId: string) => void
  updateStatusBar: (updates: Partial<StatusBarState>) => void
  resetPlayback: () => void
  setRenderedEventsUpTo: (index: number) => void
}

const defaultStatusBar: StatusBarState = {
  modelName: 'claude-opus-4-6',
  gitBranch: 'main',
  cost: '$0.00',
  contextPercent: 0,
}

export const useSimulationStore = create<SimulationStore>()(
  immer((set) => ({
    simulation: null,
    renderedEvents: [],
    statusBar: { ...defaultStatusBar },

    loadSimulation: (sim) =>
      set((state) => {
        state.simulation = sim
        state.renderedEvents = []
        if (sim.metadata.codeConfig) {
          state.statusBar = {
            modelName: sim.metadata.codeConfig.modelName,
            gitBranch: sim.metadata.codeConfig.gitBranch,
            cost: sim.metadata.codeConfig.initialCost,
            contextPercent: sim.metadata.codeConfig.initialContext,
          }
        } else {
          state.statusBar = { ...defaultStatusBar }
        }
      }),

    appendRenderedEvent: (event) =>
      set((state) => {
        if (state.renderedEvents.some((r) => r.event.id === event.id)) return
        state.renderedEvents.push({
          event,
          progress: 0,
          isComplete: false,
        })
      }),

    updateEventProgress: (eventId, progress) =>
      set((state) => {
        const re = state.renderedEvents.find((r) => r.event.id === eventId)
        if (re) re.progress = progress
      }),

    completeEvent: (eventId) =>
      set((state) => {
        const re = state.renderedEvents.find((r) => r.event.id === eventId)
        if (re) {
          re.progress = 1
          re.isComplete = true
        }
      }),

    updateStatusBar: (updates) =>
      set((state) => {
        Object.assign(state.statusBar, updates)
      }),

    resetPlayback: () =>
      set((state) => {
        state.renderedEvents = []
        if (state.simulation?.metadata.codeConfig) {
          const c = state.simulation.metadata.codeConfig
          state.statusBar = {
            modelName: c.modelName,
            gitBranch: c.gitBranch,
            cost: c.initialCost,
            contextPercent: c.initialContext,
          }
        } else {
          state.statusBar = { ...defaultStatusBar }
        }
      }),

    setRenderedEventsUpTo: (index) =>
      set((state) => {
        if (!state.simulation) return
        const events = state.simulation.events.slice(0, index + 1)
        state.renderedEvents = events.map((event) => ({
          event,
          progress: 1,
          isComplete: true,
        }))
      }),
  }))
)
