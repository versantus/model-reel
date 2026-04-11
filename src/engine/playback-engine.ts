import type { SimulationEvent } from '../types/simulation'

export type PlaybackCallback = {
  onEventStart: (event: SimulationEvent, index: number) => void
  onEventProgress: (event: SimulationEvent, progress: number) => void
  onEventComplete: (event: SimulationEvent, index: number) => void
  onPlaybackComplete: () => void
}

const STREAMING_SPEEDS: Record<string, number> = {
  slow: 8,
  normal: 20,
  fast: 45,
}

// Minimum delay between events (ms) by type to feel realistic at 1x.
// Authored delayMs is added on top of this.
const MIN_DELAY: Partial<Record<string, number>> = {
  'thinking': 800,
  'assistant-message': 600,
  'tool-call': 500,
  'tool-result': 400,
  'artifact': 1500,
  'cowork-progress': 400,
  'cowork-notification': 600,
}

export class PlaybackEngine {
  private events: SimulationEvent[] = []
  private callbacks: PlaybackCallback
  private currentIndex = -1
  private isRunning = false
  private isPaused = false
  private speed = 1
  private animFrameId: number | null = null
  private timeoutId: ReturnType<typeof setTimeout> | null = null

  constructor(callbacks: PlaybackCallback) {
    this.callbacks = callbacks
  }

  load(events: SimulationEvent[]) {
    this.stop()
    this.events = events
    this.currentIndex = -1
  }

  async play() {
    if (this.isPaused) {
      this.isPaused = false
      this.isRunning = true
      this.processNext()
      return
    }
    this.isRunning = true
    this.isPaused = false
    if (this.currentIndex < 0) this.currentIndex = -1
    this.processNext()
  }

  pause() {
    this.isPaused = true
    this.isRunning = false
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }
  }

  stop() {
    this.isRunning = false
    this.isPaused = false
    this.currentIndex = -1
    if (this.timeoutId) {
      clearTimeout(this.timeoutId)
      this.timeoutId = null
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId)
      this.animFrameId = null
    }
  }

  setSpeed(speed: number) {
    this.speed = speed
  }

  seek(index: number) {
    this.currentIndex = index - 1
    if (this.isRunning) {
      this.processNext()
    }
  }

  getCurrentIndex() {
    return this.currentIndex
  }

  private processNext() {
    if (!this.isRunning || this.isPaused) return

    const nextIndex = this.currentIndex + 1
    if (nextIndex >= this.events.length) {
      this.isRunning = false
      this.callbacks.onPlaybackComplete()
      return
    }

    const event = this.events[nextIndex]
    const baseDelay = Math.max(event.delayMs, MIN_DELAY[event.type] ?? 0)
    const delay = baseDelay / this.speed

    this.timeoutId = setTimeout(() => {
      this.currentIndex = nextIndex
      this.callbacks.onEventStart(event, nextIndex)
      this.playEvent(event, nextIndex)
    }, delay)
  }

  private playEvent(event: SimulationEvent, index: number) {
    if (!this.isRunning) return

    const duration = this.getEventDuration(event)

    if (duration <= 0) {
      this.callbacks.onEventProgress(event, 1)
      this.callbacks.onEventComplete(event, index)
      this.processNext()
      return
    }

    let lastFrameTime = performance.now()
    let simulatedElapsed = 0

    const animate = (now: number) => {
      if (!this.isRunning || this.isPaused) return

      const dt = now - lastFrameTime
      lastFrameTime = now
      simulatedElapsed += dt * this.speed
      const progress = Math.min(simulatedElapsed / duration, 1)

      this.callbacks.onEventProgress(event, progress)

      if (progress < 1) {
        this.animFrameId = requestAnimationFrame(animate)
      } else {
        this.callbacks.onEventComplete(event, index)
        this.processNext()
      }
    }

    this.animFrameId = requestAnimationFrame(animate)
  }

  private getEventDuration(event: SimulationEvent): number {
    if (event.durationMs != null) return event.durationMs

    switch (event.type) {
      case 'assistant-message': {
        const cps = STREAMING_SPEEDS[event.streamingSpeed] || STREAMING_SPEEDS.normal
        return (event.content.length / cps) * 1000
      }
      case 'user-message':
        return event.typingEffect ? (event.content.length / 30) * 1000 : 0
      case 'tool-call':
        return 600
      case 'tool-result':
        return 400
      case 'thinking':
        return event.durationMs ?? 3500
      case 'permission-prompt':
        return 0 // waits for response
      case 'permission-response':
        return 200
      case 'artifact':
        // Artifact card appears instantly — keep duration short since there's
        // no visible streaming. Chrome opens when it completes.
        return 2500
      case 'cowork-progress':
        return 500
      case 'cowork-notification':
        return 300
      case 'pause':
        return event.durationMs ?? 2000
      case 'status-bar-update':
        return 0
      default:
        return 0
    }
  }
}
