import { useEffect } from 'react'
import { useSimulationStore } from '../store/simulation-store'
import { useEditorStore } from '../store/editor-store'
import { usePlaybackStore } from '../store/playback-store'
import { allDemos } from '../demos/demo-loader'

const PARAM = 'demo'

export function useDeepLink() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const slug = params.get(PARAM)
    if (!slug) return

    const match = allDemos.find(
      (d) => d.sim.id === slug || slugify(d.sim.title) === slug,
    )
    if (!match) return

    const { loadSimulation, resetPlayback } = useSimulationStore.getState()
    const { stop, requestAutoplay } = usePlaybackStore.getState()
    const { setActiveView, setEditorVisible } = useEditorStore.getState()

    stop()
    resetPlayback()
    setEditorVisible(false)
    loadSimulation(match.sim)
    setActiveView(match.view)
    requestAutoplay()
  }, [])
}

export function updateDeepLink(sim: { id: string } | null) {
  const url = new URL(window.location.href)
  if (sim) {
    url.searchParams.set(PARAM, sim.id)
  } else {
    url.searchParams.delete(PARAM)
  }
  window.history.replaceState({}, '', url.toString())
}

function slugify(s: string): string {
  return s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}
