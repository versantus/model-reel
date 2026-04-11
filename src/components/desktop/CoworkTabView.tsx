import { useSimulationStore } from '../../store/simulation-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { CoworkLeftSidebar } from './CoworkLeftSidebar'
import { CoworkRightSidebar } from './CoworkRightSidebar'
import { ChatMessage } from './ChatMessage'
import { ChatInputBar } from './ChatInputBar'
import { ThinkingIndicator } from '../shared/ThinkingIndicator'
import { ToolCallCard } from './ToolCallCard'
import type { CoworkProgressEvent, CoworkNotificationEvent, ToolCallEvent, ToolResultEvent, ArtifactEvent } from '../../types/simulation'

export function CoworkTabView() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const simulation = useSimulationStore((s) => s.simulation)
  const coworkConfig = simulation?.metadata.coworkConfig
  const scrollRef = useAutoScroll([renderedEvents.length, renderedEvents[renderedEvents.length - 1]?.progress])

  if (!simulation || simulation.productType !== 'claude-cowork') {
    return <CoworkLanding />
  }

  // Collect state
  const progressSteps: CoworkProgressEvent[] = []
  const artifacts: ArtifactEvent[] = []

  for (const re of renderedEvents) {
    if (re.event.type === 'cowork-progress') {
      const ev = re.event as CoworkProgressEvent
      const idx = progressSteps.findIndex((s) => s.stepIndex === ev.stepIndex)
      if (idx >= 0) progressSteps[idx] = ev
      else progressSteps.push(ev)
    }
    if (re.event.type === 'artifact') artifacts.push(re.event as ArtifactEvent)
  }

  return (
    <div className="h-full flex">
      {/* Left sidebar with tasks */}
      <CoworkLeftSidebar taskTitle={coworkConfig?.taskTitle || ''} />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 bg-claude-surface">
        {/* Task title bar */}
        <div className="flex items-center justify-center px-4 py-2 border-b border-claude-border-light">
          <span className="text-[13px] text-claude-text truncate max-w-md">
            {coworkConfig?.taskTitle || 'New task'}
          </span>
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[680px] mx-auto px-6 py-6 space-y-5">
            {renderedEvents.map((re) => {
              const { event, progress, isComplete } = re
              if (event.type === 'user-message') {
                return <ChatMessage key={event.id} role="user" content={event.content} progress={progress} />
              }
              if (event.type === 'assistant-message') {
                return <ChatMessage key={event.id} role="assistant" content={event.content} progress={progress} isComplete={isComplete} />
              }
              if (event.type === 'tool-call') {
                const resultEvent = renderedEvents.find((r) => r.event.type === 'tool-result' && (r.event as ToolResultEvent).toolCallId === event.id)
                return (
                  <ToolCallCard
                    key={event.id}
                    event={event as ToolCallEvent}
                    result={resultEvent?.event as ToolResultEvent | undefined}
                  />
                )
              }
              if (event.type === 'tool-result') return null // handled by tool-call
              if (event.type === 'thinking' && !isComplete) {
                return <ThinkingIndicator key={event.id} variant="chat" label={event.label} />
              }
              if (event.type === 'cowork-notification') {
                return <CoworkNotification key={event.id} event={event as CoworkNotificationEvent} />
              }
              return null
            })}
          </div>
        </div>

        {/* Input */}
        <div className="px-6 pb-2">
          <div className="max-w-[680px] mx-auto">
            <ChatInputBar modelName="Opus 4.6" placeholder="Reply..." />
          </div>
        </div>
        <div className="text-center pb-3">
          <span className="text-[11px] text-claude-text-tertiary">
            Claude is AI and can make mistakes. Please double-check responses.
          </span>
        </div>
      </div>

      {/* Right sidebar */}
      <CoworkRightSidebar steps={progressSteps} artifacts={artifacts} folderPath={coworkConfig?.folderPath} />
    </div>
  )
}

function CoworkLanding() {
  return (
    <div className="h-full flex items-center justify-center bg-claude-bg">
      <div className="text-center">
        <p className="text-claude-text-secondary text-sm">Load a Cowork simulation to get started</p>
      </div>
    </div>
  )
}

function CoworkNotification({ event }: { event: CoworkNotificationEvent }) {
  const colors = {
    finished: 'bg-green-50 border-green-200 text-green-800',
    'needs-input': 'bg-amber-50 border-amber-200 text-amber-800',
    error: 'bg-red-50 border-red-200 text-red-800',
  }
  return (
    <div className={`rounded-xl px-4 py-3 border text-[13px] ${colors[event.notificationType]}`}>
      {event.message}
    </div>
  )
}
