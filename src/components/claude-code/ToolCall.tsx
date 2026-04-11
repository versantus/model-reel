import { useState } from 'react'
import { ChevronRight, ChevronDown, FileText, Pencil, TerminalSquare, Search, FolderSearch, FileOutput } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { ToolCallEvent } from '../../types/simulation'

const toolColors: Record<string, string> = {
  Read: 'border-terminal-blue',
  Edit: 'border-terminal-green',
  Bash: 'border-terminal-yellow',
  Grep: 'border-terminal-cyan',
  Glob: 'border-terminal-cyan',
  Write: 'border-terminal-green',
  Agent: 'border-claude-purple',
}

const toolIcons: Record<string, typeof FileText> = {
  Read: FileText,
  Edit: Pencil,
  Bash: TerminalSquare,
  Grep: Search,
  Glob: FolderSearch,
  Write: FileOutput,
}

interface ToolCallProps {
  event: ToolCallEvent
}

export function ToolCall({ event }: ToolCallProps) {
  const [expanded, setExpanded] = useState(event.expandedByDefault)
  const borderColor = toolColors[event.toolName] || 'border-terminal-dim'
  const Icon = toolIcons[event.toolName] || FileText

  const summary = getToolSummary(event)

  return (
    <div className={cn('border-l-2 pl-3 py-1 my-1', borderColor)}>
      <button
        onClick={() => setExpanded(!expanded)}
        className="flex items-center gap-2 text-xs hover:text-white transition-colors w-full text-left"
      >
        {expanded ? (
          <ChevronDown className="w-3 h-3 text-terminal-dim" />
        ) : (
          <ChevronRight className="w-3 h-3 text-terminal-dim" />
        )}
        <Icon className="w-3.5 h-3.5 text-terminal-dim" />
        <span className="font-semibold text-terminal-text">{event.toolName}</span>
        {event.description && (
          <span className="text-terminal-dim">{event.description}</span>
        )}
      </button>

      {expanded && (
        <div className="mt-1 ml-5 text-xs">
          <pre className="text-terminal-dim bg-terminal-surface rounded p-2 overflow-x-auto">
            {summary}
          </pre>
        </div>
      )}
    </div>
  )
}

function getToolSummary(event: ToolCallEvent): string {
  const input = event.toolInput
  switch (event.toolName) {
    case 'Read':
      return `file_path: ${input.file_path || ''}${input.offset ? `\noffset: ${input.offset}` : ''}${input.limit ? `\nlimit: ${input.limit}` : ''}`
    case 'Edit':
      return `file_path: ${input.file_path || ''}\nold_string: ${truncate(String(input.old_string || ''), 80)}\nnew_string: ${truncate(String(input.new_string || ''), 80)}`
    case 'Bash':
      return `$ ${input.command || ''}`
    case 'Grep':
      return `pattern: ${input.pattern || ''}${input.path ? `\npath: ${input.path}` : ''}`
    case 'Glob':
      return `pattern: ${input.pattern || ''}${input.path ? `\npath: ${input.path}` : ''}`
    case 'Write':
      return `file_path: ${input.file_path || ''}\ncontent: ${truncate(String(input.content || ''), 100)}`
    default:
      return JSON.stringify(input, null, 2)
  }
}

function truncate(s: string, len: number): string {
  return s.length > len ? s.slice(0, len) + '...' : s
}
