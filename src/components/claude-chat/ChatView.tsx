import { useSimulationStore } from '../../store/simulation-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { ChatSidebar } from './ChatSidebar'
import { ChatBubble } from './ChatBubble'
import { ArtifactPanel } from './ArtifactPanel'
import { ThinkingIndicator } from '../shared/ThinkingIndicator'
import { ModelSelector } from './ModelSelector'
import { ChatInput } from './ChatInput'
import { useState } from 'react'
import type { ArtifactEvent } from '../../types/simulation'

export function ChatView() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const simulation = useSimulationStore((s) => s.simulation)
  const chatConfig = simulation?.metadata.chatConfig
  const [artifact, setArtifact] = useState<ArtifactEvent | null>(null)
  const scrollRef = useAutoScroll([renderedEvents.length, renderedEvents[renderedEvents.length - 1]?.progress])

  // Check if any rendered event is an artifact
  const latestArtifact = renderedEvents.find((re) => re.event.type === 'artifact')?.event as ArtifactEvent | undefined
  if (latestArtifact && latestArtifact !== artifact) {
    setArtifact(latestArtifact)
  }

  return (
    <div className="h-full flex bg-white">
      {/* Sidebar */}
      <ChatSidebar
        conversations={chatConfig?.sidebarConversations || []}
        projects={chatConfig?.projects || []}
      />

      {/* Main chat area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-3 border-b border-gray-200">
          <h2 className="text-sm font-medium text-gray-800">
            {chatConfig?.conversationTitle || 'New conversation'}
          </h2>
          <ModelSelector modelName={chatConfig?.modelName || 'Claude Opus 4'} />
        </div>

        {/* Messages */}
        <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 py-4">
          <div className="max-w-3xl mx-auto space-y-6">
            {renderedEvents.map((re) => {
              const { event, progress, isComplete } = re
              if (event.type === 'user-message') {
                return (
                  <ChatBubble
                    key={event.id}
                    role="user"
                    content={event.content}
                    progress={progress}
                  />
                )
              }
              if (event.type === 'assistant-message') {
                return (
                  <ChatBubble
                    key={event.id}
                    role="assistant"
                    content={event.content}
                    progress={progress}
                    isComplete={isComplete}
                  />
                )
              }
              if (event.type === 'thinking' && !isComplete) {
                return <ThinkingIndicator key={event.id} variant="chat" />
              }
              return null
            })}
          </div>
        </div>

        {/* Input */}
        <ChatInput />
      </div>

      {/* Artifact panel */}
      {artifact && (
        <ArtifactPanel artifact={artifact} onClose={() => setArtifact(null)} />
      )}
    </div>
  )
}
