import { useSimulationStore } from '../../store/simulation-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { StatusBar } from './StatusBar'
import { PromptInput } from './PromptInput'
import { MessageThread } from './MessageThread'

export function CodeView() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const scrollRef = useAutoScroll([renderedEvents.length, renderedEvents[renderedEvents.length - 1]?.progress])

  return (
    <div className="h-full flex flex-col bg-terminal-bg font-mono text-sm">
      {/* Terminal chrome */}
      <div className="flex items-center px-4 py-2 bg-terminal-surface border-b border-terminal-border">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <span className="ml-4 text-xs text-terminal-dim">claude</span>
      </div>

      {/* Message area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto terminal-scrollbar px-4 py-3">
        <MessageThread />
      </div>

      {/* Input area */}
      <PromptInput />

      {/* Status bar */}
      <StatusBar />
    </div>
  )
}
