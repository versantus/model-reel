import { create } from 'zustand'
import type { ArtifactEvent } from '../types/simulation'

interface DocumentStore {
  isOpen: boolean
  artifact: ArtifactEvent | null
  open: (artifact: ArtifactEvent) => void
  close: () => void
}

export const useDocumentStore = create<DocumentStore>()((set) => ({
  isOpen: false,
  artifact: null,
  open: (artifact) => set({ isOpen: true, artifact }),
  close: () => set({ isOpen: false, artifact: null }),
}))
