import { useState } from 'react'
import { ChevronRight, ChevronDown, AlertCircle, CheckCircle2 } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { ToolResultEvent } from '../../types/simulation'

interface ToolResultProps {
  event: ToolResultEvent
}

export function ToolResult({ event }: ToolResultProps) {
  const [expanded, setExpanded] = useState(!event.isCollapsed)

  if (!event.output) return null

  const lines = event.output.split('\n')
  const isLong = lines.length > 5

  return (
    <div className="pl-5 my-0.5">
      {isLong ? (
        <>
          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs text-terminal-dim hover:text-terminal-text transition-colors"
          >
            {expanded ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            {event.isError ? (
              <AlertCircle className="w-3 h-3 text-terminal-red" />
            ) : (
              <CheckCircle2 className="w-3 h-3 text-terminal-green" />
            )}
            <span>{isLong ? `${lines.length} lines` : 'Output'}</span>
          </button>
          {expanded && (
            <pre className={cn(
              'mt-1 text-xs overflow-x-auto p-2 rounded bg-terminal-surface max-h-64 overflow-y-auto terminal-scrollbar',
              event.isError ? 'text-terminal-red' : 'text-terminal-dim'
            )}>
              {event.output}
            </pre>
          )}
        </>
      ) : (
        <div className="flex items-start gap-1.5 text-xs">
          {event.isError ? (
            <AlertCircle className="w-3 h-3 text-terminal-red mt-0.5 shrink-0" />
          ) : (
            <CheckCircle2 className="w-3 h-3 text-terminal-green mt-0.5 shrink-0" />
          )}
          <pre className={cn(
            'overflow-x-auto',
            event.isError ? 'text-terminal-red' : 'text-terminal-dim'
          )}>
            {event.output}
          </pre>
        </div>
      )}
    </div>
  )
}
