import { create } from 'zustand'
import type { ArtifactEvent } from '../types/simulation'

interface ChromeStore {
  isOpen: boolean
  artifact: ArtifactEvent | null
  open: (artifact: ArtifactEvent) => void
  close: () => void
}

export const useChromeStore = create<ChromeStore>()((set) => ({
  isOpen: false,
  artifact: null,
  open: (artifact) => set({ isOpen: true, artifact }),
  close: () => set({ isOpen: false, artifact: null }),
}))
