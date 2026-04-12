import { useSimulationStore } from '../../store/simulation-store'
import { useChromeStore } from '../../store/chrome-store'
import { useDocumentStore } from '../../store/document-store'
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
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-claude-surface">
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
              if (event.type === 'artifact') {
                return <CoworkArtifactCard key={event.id} event={event as ArtifactEvent} />
              }
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

function CoworkArtifactCard({ event }: { event: ArtifactEvent }) {
  const openChrome = useChromeStore((s) => s.open)
  const openDocument = useDocumentStore((s) => s.open)
  const isDoc = event.artifactType === 'word' || event.artifactType === 'pdf'
  const handleOpen = () => isDoc ? openDocument(event) : openChrome(event)

  return (
    <div className="border border-claude-card-border rounded-xl p-4 bg-claude-card-bg my-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-claude-bg flex items-center justify-center text-claude-text-tertiary">
            {event.artifactType === 'word' ? (
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="2" fill="#2B579A"/><text x="3" y="12" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">W</text></svg>
            ) : event.artifactType === 'pdf' ? (
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="2" fill="#D93025"/><text x="1" y="12" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">PDF</text></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            )}
          </div>
          <div>
            <p className="text-[13px] font-medium text-claude-text">{event.title}</p>
            <p className="text-[12px] text-claude-text-tertiary">
              {event.artifactType === 'word' ? 'Document · DOCX'
                : event.artifactType === 'pdf' ? 'Document · PDF'
                : event.artifactType === 'html' ? 'HTML Document'
                : event.artifactType.toUpperCase()}
            </p>
          </div>
        </div>
        <button
          onClick={handleOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-claude-text-secondary bg-claude-bg border border-claude-border rounded-lg hover:bg-claude-sidebar-hover"
        >
          Open Preview
        </button>
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
