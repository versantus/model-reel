import { useRef, useCallback, useEffect } from 'react'
import { PlaybackEngine } from '../engine/playback-engine'
import { useSimulationStore } from '../store/simulation-store'
import { usePlaybackStore } from '../store/playback-store'
import { useChromeStore } from '../store/chrome-store'
import { useDocumentStore } from '../store/document-store'
import type { ArtifactEvent } from '../types/simulation'

export function usePlayback() {
  const engineRef = useRef<PlaybackEngine | null>(null)
  const simulation = useSimulationStore((s) => s.simulation)
  const appendRenderedEvent = useSimulationStore((s) => s.appendRenderedEvent)
  const updateEventProgress = useSimulationStore((s) => s.updateEventProgress)
  const completeEvent = useSimulationStore((s) => s.completeEvent)
  const updateStatusBar = useSimulationStore((s) => s.updateStatusBar)
  const resetPlayback = useSimulationStore((s) => s.resetPlayback)

  const { speed, setEventIndex } = usePlaybackStore()
  const play = usePlaybackStore((s) => s.play)
  const pause = usePlaybackStore((s) => s.pause)
  const stop = usePlaybackStore((s) => s.stop)
  const openChrome = useChromeStore((s) => s.open)
  const openDocument = useDocumentStore((s) => s.open)

  useEffect(() => {
    const engine = new PlaybackEngine({
      onEventStart: (event, index) => {
        appendRenderedEvent(event)
        setEventIndex(index)
        if (event.type === 'status-bar-update') {
          updateStatusBar(event.updates)
        }
      },
      onEventProgress: (event, progress) => {
        updateEventProgress(event.id, progress)
      },
      onEventComplete: (event, _index) => {
        completeEvent(event.id)
        if (event.type === 'artifact') {
          const artifact = event as ArtifactEvent
          if (artifact.artifactType === 'word' || artifact.artifactType === 'pdf') {
            openDocument(artifact)
          } else {
            openChrome(artifact)
          }
        }
      },
      onPlaybackComplete: () => {
        stop()
      },
    })
    engineRef.current = engine
    return () => engine.stop()
  }, [appendRenderedEvent, updateEventProgress, completeEvent, updateStatusBar, setEventIndex, stop, openChrome, openDocument])

  useEffect(() => {
    if (simulation && engineRef.current) {
      engineRef.current.load(simulation.events)
    }
  }, [simulation])

  useEffect(() => {
    engineRef.current?.setSpeed(speed)
  }, [speed])

  const autoplayToken = usePlaybackStore((s) => s.autoplayToken)
  useEffect(() => {
    if (autoplayToken === 0 || !simulation || !engineRef.current) return
    play()
    engineRef.current.play()
  }, [autoplayToken, simulation, play])

  const handlePlay = useCallback(() => {
    if (!engineRef.current) return
    play()
    engineRef.current.play()
  }, [play])

  const handlePause = useCallback(() => {
    if (!engineRef.current) return
    pause()
    engineRef.current.pause()
  }, [pause])

  const handleStop = useCallback(() => {
    if (!engineRef.current) return
    stop()
    resetPlayback()
    engineRef.current.stop()
  }, [stop, resetPlayback])

  return {
    play: handlePlay,
    pause: handlePause,
    stop: handleStop,
  }
}
