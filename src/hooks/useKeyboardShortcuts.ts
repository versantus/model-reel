import { useEffect } from 'react'
import { usePlaybackStore } from '../store/playback-store'
import { usePlayback } from './usePlayback'

export function useKeyboardShortcuts() {
  const { isPlaying } = usePlaybackStore()
  const { play, pause, stop } = usePlayback()

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      // Don't trigger shortcuts when typing in input fields
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement ||
        e.target instanceof HTMLSelectElement
      ) {
        return
      }

      switch (e.key) {
        case ' ':
          e.preventDefault()
          if (isPlaying) pause()
          else play()
          break
        case 'Escape':
          stop()
          break
      }
    }

    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [isPlaying, play, pause, stop])
}
