import { useEditorStore } from '../../store/editor-store'
import { useSimulationStore } from '../../store/simulation-store'
import { cn } from '../../utils/cn'
import { GripVertical, Trash2, Copy } from 'lucide-react'
import { nanoid } from 'nanoid'
import type { SimulationEvent } from '../../types/simulation'

const eventColors: Record<string, string> = {
  'user-message': 'bg-blue-500',
  'assistant-message': 'bg-purple-500',
  'tool-call': 'bg-green-500',
  'tool-result': 'bg-green-700',
  'permission-prompt': 'bg-amber-500',
  'permission-response': 'bg-amber-700',
  'thinking': 'bg-cyan-500',
  'status-bar-update': 'bg-gray-400',
  'artifact': 'bg-indigo-500',
  'cowork-progress': 'bg-teal-500',
  'cowork-notification': 'bg-teal-700',
  'pause': 'bg-gray-500',
}

const eventLabels: Record<string, string> = {
  'user-message': 'User',
  'assistant-message': 'Assistant',
  'tool-call': 'Tool Call',
  'tool-result': 'Tool Result',
  'permission-prompt': 'Permission',
  'permission-response': 'Response',
  'thinking': 'Thinking',
  'status-bar-update': 'Status',
  'artifact': 'Artifact',
  'cowork-progress': 'Progress',
  'cowork-notification': 'Notification',
  'pause': 'Pause',
}

interface TimelinePanelProps {
  events: SimulationEvent[]
  selectedEventId: string | null
}

export function TimelinePanel({ events, selectedEventId }: TimelinePanelProps) {
  const selectEvent = useEditorStore((s) => s.selectEvent)
  const simulation = useSimulationStore((s) => s.simulation)
  const loadSimulation = useSimulationStore((s) => s.loadSimulation)

  const handleDelete = (eventId: string) => {
    if (!simulation) return
    loadSimulation({ ...simulation, events: simulation.events.filter((e) => e.id !== eventId) })
    if (selectedEventId === eventId) selectEvent(null)
  }

  const handleDuplicate = (event: SimulationEvent) => {
    if (!simulation) return
    const idx = simulation.events.findIndex((e) => e.id === event.id)
    const newEvent = { ...event, id: nanoid(8) }
    const newEvents = [...simulation.events]
    newEvents.splice(idx + 1, 0, newEvent)
    loadSimulation({ ...simulation, events: newEvents })
    selectEvent(newEvent.id)
  }

  return (
    <div className="h-full flex flex-col">
      <div className="px-4 py-2 border-b border-claude-border text-[12px] text-claude-text-tertiary font-medium bg-claude-surface">
        Timeline ({events.length} events)
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar bg-claude-surface">
        {events.map((event, i) => (
          <div
            key={event.id}
            onClick={() => selectEvent(event.id)}
            className={cn(
              'flex items-center gap-2 px-3 py-2 border-b border-claude-border-light cursor-pointer hover:bg-claude-sidebar-hover transition-colors group',
              selectedEventId === event.id && 'bg-claude-sidebar-active ring-1 ring-claude-accent/30'
            )}
          >
            <GripVertical className="w-3.5 h-3.5 text-claude-border cursor-grab" />
            <span className="text-[11px] text-claude-text-tertiary w-5 text-right">{i + 1}</span>
            <div className={cn('w-2.5 h-2.5 rounded-full shrink-0', eventColors[event.type] || 'bg-gray-400')} />
            <span className="text-[12px] font-medium text-claude-text w-20 shrink-0">
              {eventLabels[event.type] || event.type}
            </span>
            <span className="text-[12px] text-claude-text-secondary truncate flex-1">
              {getEventPreview(event)}
            </span>
            <span className="text-[11px] text-claude-text-tertiary tabular-nums w-12 text-right">
              {event.delayMs}ms
            </span>
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <button onClick={(e) => { e.stopPropagation(); handleDuplicate(event) }} className="p-0.5 hover:bg-claude-sidebar-hover rounded">
                <Copy className="w-3 h-3 text-claude-text-tertiary" />
              </button>
              <button onClick={(e) => { e.stopPropagation(); handleDelete(event.id) }} className="p-0.5 hover:bg-claude-sidebar-hover rounded">
                <Trash2 className="w-3 h-3 text-red-400" />
              </button>
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="px-4 py-8 text-center text-claude-text-tertiary text-[13px]">
            No events yet. Add events from the palette on the left.
          </div>
        )}
      </div>
    </div>
  )
}

function getEventPreview(event: SimulationEvent): string {
  switch (event.type) {
    case 'user-message':
    case 'assistant-message':
      return event.content.slice(0, 60) + (event.content.length > 60 ? '...' : '')
    case 'tool-call':
      return `${event.toolName}${event.description ? ` - ${event.description}` : ''}`
    case 'tool-result':
      return event.isError ? 'Error' : event.output.slice(0, 40)
    case 'permission-prompt':
      return event.description
    case 'thinking':
      return event.label || 'Thinking...'
    case 'status-bar-update':
      return Object.entries(event.updates).filter(([, v]) => v != null).map(([k, v]) => `${k}: ${v}`).join(', ')
    case 'artifact':
      return event.title
    case 'cowork-progress':
      return `${event.stepLabel} (${event.status})`
    case 'cowork-notification':
      return event.message
    case 'pause':
      return `${event.durationMs || 2000}ms`
    default:
      return ''
  }
}
