import { useSimulationStore } from '../../store/simulation-store'
import { UserPrompt } from './UserPrompt'
import { AssistantResponse } from './AssistantResponse'
import { ToolCall } from './ToolCall'
import { ToolResult } from './ToolResult'
import { PermissionPrompt } from './PermissionPrompt'
import { ThinkingIndicator } from '../shared/ThinkingIndicator'
import type { RenderedEvent } from '../../types/simulation'

export function MessageThread() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)

  return (
    <div className="space-y-2">
      {renderedEvents.map((re) => (
        <MessageThreadItem key={re.event.id} rendered={re} />
      ))}
    </div>
  )
}

function MessageThreadItem({ rendered }: { rendered: RenderedEvent }) {
  const { event, progress, isComplete } = rendered

  switch (event.type) {
    case 'user-message':
      return <UserPrompt content={event.content} progress={progress} />
    case 'assistant-message':
      return <AssistantResponse content={event.content} progress={progress} isComplete={isComplete} />
    case 'tool-call':
      return <ToolCall event={event} />
    case 'tool-result':
      return <ToolResult event={event} />
    case 'thinking':
      return !isComplete ? <ThinkingIndicator label={event.label} variant="terminal" /> : null
    case 'permission-prompt':
      return <PermissionPrompt event={event} />
    case 'permission-response':
      return (
        <div className="text-xs text-terminal-dim pl-2">
          Permission {event.response === 'deny' ? 'denied' : 'granted'}
        </div>
      )
    case 'status-bar-update':
    case 'pause':
      return null
    default:
      return null
  }
}
