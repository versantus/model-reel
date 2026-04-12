import { useSimulationStore } from '../../store/simulation-store'
import { useChromeStore } from '../../store/chrome-store'
import { useDocumentStore } from '../../store/document-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { ChatLeftSidebar } from './ChatLeftSidebar'
import { ChatRightSidebar } from './ChatRightSidebar'
import { ChatMessage } from './ChatMessage'
import { ChatInputBar } from './ChatInputBar'
import { ThinkingIndicator } from '../shared/ThinkingIndicator'
import type { ArtifactEvent } from '../../types/simulation'

export function ChatTabView() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const simulation = useSimulationStore((s) => s.simulation)
  const chatConfig = simulation?.metadata.chatConfig
  const scrollRef = useAutoScroll([renderedEvents.length, renderedEvents[renderedEvents.length - 1]?.progress])

  // Landing state
  if (!simulation || simulation.productType !== 'claude-chat') {
    return <ChatLanding />
  }

  // Collect artifacts for right sidebar
  const artifacts: ArtifactEvent[] = renderedEvents
    .filter((re) => re.event.type === 'artifact')
    .map((re) => re.event as ArtifactEvent)

  return (
    <div className="h-full flex">
      {/* Left icon sidebar */}
      <ChatLeftSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 min-h-0 bg-claude-surface">
        {/* Task/conversation title */}
        {chatConfig?.conversationTitle && (
          <div className="flex items-center justify-center px-4 py-2 border-b border-claude-border-light">
            <span className="text-[13px] text-claude-text truncate max-w-md">{chatConfig.conversationTitle}</span>
          </div>
        )}

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
              if (event.type === 'artifact') {
                return <ArtifactCard key={event.id} event={event} />
              }
              if (event.type === 'thinking' && !isComplete) {
                return <ThinkingIndicator key={event.id} variant="chat" />
              }
              return null
            })}
          </div>
        </div>

        {/* Claude starburst + input */}
        <div className="px-6 pb-2">
          <div className="max-w-[680px] mx-auto">
            {/* Starburst icon */}
            <div className="flex justify-start mb-3">
              <ClaudeStarburst />
            </div>
            <ChatInputBar modelName={chatConfig?.modelName || 'Sonnet 4.6'} />
          </div>
        </div>

        {/* Disclaimer */}
        <div className="text-center pb-3">
          <span className="text-[11px] text-claude-text-tertiary">
            Claude is AI and can make mistakes. Please double-check responses.
          </span>
        </div>
      </div>

      {/* Right sidebar */}
      <ChatRightSidebar artifacts={artifacts} />
    </div>
  )
}

function ChatLanding() {
  return (
    <div className="h-full flex items-center justify-center bg-claude-bg">
      <div className="text-center">
        <ClaudeStarburst size="lg" />
        <p className="text-claude-text-secondary text-sm mt-4">Load a Chat simulation to get started</p>
      </div>
    </div>
  )
}

function ClaudeStarburst({ size = 'sm' }: { size?: 'sm' | 'lg' }) {
  const s = size === 'lg' ? 40 : 24
  return (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L13.5 8.5L20 7L15.5 12L20 17L13.5 15.5L12 22L10.5 15.5L4 17L8.5 12L4 7L10.5 8.5L12 2Z"
        fill="#C8651B"
      />
    </svg>
  )
}

function ArtifactCard({ event }: { event: ArtifactEvent }) {
  const openChrome = useChromeStore((s) => s.open)
  const openDocument = useDocumentStore((s) => s.open)

  const isDoc = event.artifactType === 'word' || event.artifactType === 'pdf'
  const handleOpen = () => isDoc ? openDocument(event) : openChrome(event)

  const appLabel = event.artifactType === 'word' ? 'Microsoft Word'
    : event.artifactType === 'pdf' ? 'Preview'
    : 'Google Chrome'

  const typeLabel = event.artifactType === 'code' ? `Code · ${event.language?.toUpperCase() || 'TEXT'}`
    : event.artifactType === 'word' ? 'Document · DOCX'
    : event.artifactType === 'pdf' ? 'Document · PDF'
    : 'Document · ' + event.artifactType.toUpperCase()

  return (
    <div className="border border-claude-card-border rounded-xl p-4 bg-claude-card-bg my-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-claude-bg flex items-center justify-center text-claude-text-tertiary">
            {event.artifactType === 'code' ? (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" /></svg>
            ) : event.artifactType === 'word' ? (
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="2" fill="#2B579A"/><text x="3" y="12" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">W</text></svg>
            ) : event.artifactType === 'pdf' ? (
              <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none"><rect width="16" height="16" rx="2" fill="#D93025"/><text x="1" y="12" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">PDF</text></svg>
            ) : (
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" /></svg>
            )}
          </div>
          <div>
            <p className="text-[13px] font-medium text-claude-text">{event.title}</p>
            <p className="text-[12px] text-claude-text-tertiary">{typeLabel}</p>
          </div>
        </div>
        <button
          onClick={handleOpen}
          className="flex items-center gap-1.5 px-3 py-1.5 text-[12px] text-claude-text-secondary bg-claude-bg border border-claude-border rounded-lg hover:bg-claude-sidebar-hover"
        >
          {!isDoc && <ChromeSmallIcon />}
          {appLabel}
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
        </button>
      </div>
    </div>
  )
}

function ChromeSmallIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" fill="none" className="shrink-0">
      <circle cx="24" cy="24" r="20" fill="#fff" />
      <path d="M24 14.4a9.6 9.6 0 100 19.2 9.6 9.6 0 000-19.2z" fill="#fff" />
      <path d="M13.2 28.8L4.8 13.2A22 22 0 0124 2.4l8.4 14.4H19.2a9.6 9.6 0 00-6 14.4z" fill="#DB4437" />
      <path d="M24 45.6c8.4 0 15.6-4.8 19.2-12l-8.4-14.4a9.6 9.6 0 01-15.6 0L10.8 33.6a22 22 0 0013.2 12z" fill="#0F9D58" />
      <path d="M43.2 13.2H24a9.6 9.6 0 019.6 9.6c0 2.4-.96 4.56-2.4 6.24L39.6 43.2A22 22 0 0045.6 24c0-3.84-1.2-7.44-2.4-10.8z" fill="#4285F4" />
      <circle cx="24" cy="24" r="7.2" fill="#F1F3F4" />
      <circle cx="24" cy="24" r="4.8" fill="#4285F4" />
    </svg>
  )
}
