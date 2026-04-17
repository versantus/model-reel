import { create } from 'zustand'
import type { ProductType } from '../types/simulation'

interface EditorStore {
  activeView: ProductType
  selectedEventId: string | null
  isEditorVisible: boolean

  setActiveView: (view: ProductType) => void
  selectEvent: (id: string | null) => void
  setEditorVisible: (visible: boolean) => void
}

export const useEditorStore = create<EditorStore>()((set) => ({
  activeView: 'claude-code-gui',
  selectedEventId: null,
  isEditorVisible: false,

  setActiveView: (view) => set({ activeView: view }),
  selectEvent: (id) => set({ selectedEventId: id }),
  setEditorVisible: (visible) => set({ isEditorVisible: visible }),
}))
