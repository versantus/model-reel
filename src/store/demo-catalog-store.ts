import { create } from 'zustand'
import { immer } from 'zustand/middleware/immer'
import type { DemoEntry, DemoCategory } from '../types/demo-catalog'

interface DemoCatalogStore {
  entries: DemoEntry[]
  selectedId: string | null
  filter: { category?: string; source?: 'all' | 'builtin' | 'user'; search?: string }

  registerBuiltin: (entries: DemoEntry[]) => void
  addUserDemo: (entry: DemoEntry) => void
  removeUserDemo: (id: string) => void
  selectDemo: (id: string) => void
  setFilter: (filter: Partial<DemoCatalogStore['filter']>) => void
  getFilteredEntries: () => DemoEntry[]
  getCategories: () => DemoCategory[]
}

export const useDemoCatalogStore = create<DemoCatalogStore>()(
  immer((set, get) => ({
    entries: [],
    selectedId: null,
    filter: { source: 'all' },

    registerBuiltin(entries) {
      set((state) => {
        // Remove any old builtins, keep user demos
        state.entries = state.entries.filter((e) => e.source === 'user')
        state.entries.push(...entries)
      })
    },

    addUserDemo(entry) {
      set((state) => {
        state.entries.push(entry)
        state.selectedId = entry.id
      })
    },

    removeUserDemo(id) {
      set((state) => {
        state.entries = state.entries.filter((e) => e.id !== id)
        if (state.selectedId === id) state.selectedId = null
      })
    },

    selectDemo(id) {
      set((state) => {
        state.selectedId = id
      })
    },

    setFilter(filter) {
      set((state) => {
        state.filter = { ...state.filter, ...filter }
      })
    },

    getFilteredEntries() {
      const { entries, filter } = get()
      return entries.filter((e) => {
        if (filter.source && filter.source !== 'all' && e.source !== filter.source) return false
        if (filter.category && e.category !== filter.category) return false
        if (filter.search) {
          const q = filter.search.toLowerCase()
          const text = (e.label + ' ' + (e.description || '') + ' ' + (e.tags?.join(' ') || '')).toLowerCase()
          if (!text.includes(q)) return false
        }
        return true
      })
    },

    getCategories() {
      const cats = new Map<string, DemoCategory>()
      for (const e of get().entries) {
        if (!cats.has(e.category)) {
          cats.set(e.category, {
            id: e.category,
            label: e.category.charAt(0).toUpperCase() + e.category.slice(1),
          })
        }
      }
      return Array.from(cats.values())
    },
  }))
)
