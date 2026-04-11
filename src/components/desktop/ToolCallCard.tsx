import { useState } from 'react'
import { ChevronDown, ChevronRight, Play } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { ToolCallEvent, ToolResultEvent } from '../../types/simulation'

interface ToolCallCardProps {
  event: ToolCallEvent
  result?: ToolResultEvent
}

export function ToolCallCard({ event, result }: ToolCallCardProps) {
  const [expanded, setExpanded] = useState(event.expandedByDefault)

  const isCommand = event.toolName === 'Bash'
  const title = isCommand ? 'Running command' : `${event.toolName}`

  return (
    <div className="border border-claude-card-border rounded-xl bg-claude-card-bg overflow-hidden my-3">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-2 px-4 py-3 hover:bg-claude-bg/50 transition-colors"
      >
        {expanded ? (
          <ChevronDown className="w-4 h-4 text-claude-icon" />
        ) : (
          <ChevronRight className="w-4 h-4 text-claude-icon" />
        )}
        {isCommand ? (
          <Play className="w-3.5 h-3.5 text-claude-text-secondary" />
        ) : null}
        <span className="text-[13px] font-medium text-claude-text">{title}</span>
        {event.description && (
          <span className="text-[12px] text-claude-text-tertiary ml-1">{event.description}</span>
        )}
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="px-4 pb-4 border-t border-claude-border-light">
          {/* Request */}
          <div className="mt-3">
            <div className="text-[11px] text-claude-text-tertiary uppercase tracking-wider mb-1.5">Request</div>
            <pre className="text-[12px] text-claude-text font-mono bg-claude-bg rounded-lg p-3 overflow-x-auto whitespace-pre-wrap">
              {formatToolInput(event)}
            </pre>
          </div>

          {/* Result */}
          {result && (
            <div className="mt-3">
              <div className="text-[11px] text-claude-text-tertiary uppercase tracking-wider mb-1.5">
                {result.isError ? 'Error' : 'Output'}
              </div>
              <pre className={cn(
                'text-[12px] font-mono rounded-lg p-3 overflow-x-auto whitespace-pre-wrap max-h-48 overflow-y-auto custom-scrollbar',
                result.isError ? 'text-red-600 bg-red-50' : 'text-claude-text bg-claude-bg'
              )}>
                {result.output}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function formatToolInput(event: ToolCallEvent): string {
  if (event.toolName === 'Bash') {
    return JSON.stringify({
      command: event.toolInput.command,
      description: event.toolInput.description || event.description,
    }, null, 2)
  }
  return JSON.stringify(event.toolInput, null, 2)
}
