import { create } from 'zustand'

export type PlaybackSpeed = 0.5 | 1 | 2 | 4

interface PlaybackStore {
  isPlaying: boolean
  isPaused: boolean
  currentEventIndex: number
  speed: PlaybackSpeed
  mode: 'playback' | 'editor'
  autoplayToken: number

  play: () => void
  pause: () => void
  stop: () => void
  setEventIndex: (index: number) => void
  advanceEvent: () => void
  setSpeed: (speed: PlaybackSpeed) => void
  setMode: (mode: 'playback' | 'editor') => void
  requestAutoplay: () => void
}

export const usePlaybackStore = create<PlaybackStore>()((set) => ({
  isPlaying: false,
  isPaused: false,
  currentEventIndex: -1,
  speed: 1,
  mode: 'playback',
  autoplayToken: 0,

  play: () => set({ isPlaying: true, isPaused: false }),
  pause: () => set({ isPlaying: false, isPaused: true }),
  stop: () => set({ isPlaying: false, isPaused: false, currentEventIndex: -1 }),
  setEventIndex: (index) => set({ currentEventIndex: index }),
  advanceEvent: () => set((s) => ({ currentEventIndex: s.currentEventIndex + 1 })),
  setSpeed: (speed) => set({ speed }),
  setMode: (mode) => set({ mode }),
  requestAutoplay: () => set((s) => ({ autoplayToken: s.autoplayToken + 1 })),
}))
