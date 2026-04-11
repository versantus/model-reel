import { useSimulationStore } from '../../store/simulation-store'
import { useEditorStore } from '../../store/editor-store'
import { nanoid } from 'nanoid'
import {
  MessageSquare, Bot, Wrench, FileOutput, Shield, ShieldCheck,
  Brain, BarChart3, Code, ListChecks, Bell, Timer
} from 'lucide-react'
import type { SimulationEvent } from '../../types/simulation'

const eventTemplates: { type: string; label: string; icon: typeof MessageSquare; create: () => SimulationEvent }[] = [
  { type: 'user-message', label: 'User Message', icon: MessageSquare, create: () => ({ id: nanoid(8), type: 'user-message' as const, delayMs: 500, content: 'User message here...', typingEffect: true }) },
  { type: 'assistant-message', label: 'Assistant', icon: Bot, create: () => ({ id: nanoid(8), type: 'assistant-message' as const, delayMs: 300, content: 'Assistant response here...', streamingSpeed: 'normal' as const }) },
  { type: 'tool-call', label: 'Tool Call', icon: Wrench, create: () => ({ id: nanoid(8), type: 'tool-call' as const, delayMs: 200, toolName: 'Read', toolInput: { file_path: '/path/to/file' }, description: 'Reading file', expandedByDefault: false }) },
  { type: 'tool-result', label: 'Tool Result', icon: FileOutput, create: () => ({ id: nanoid(8), type: 'tool-result' as const, delayMs: 100, toolCallId: '', output: 'Tool output here...', isError: false, isCollapsed: true }) },
  { type: 'permission-prompt', label: 'Permission', icon: Shield, create: () => ({ id: nanoid(8), type: 'permission-prompt' as const, delayMs: 200, toolName: 'Bash', description: 'Run shell command', command: 'npm test' }) },
  { type: 'permission-response', label: 'Perm Response', icon: ShieldCheck, create: () => ({ id: nanoid(8), type: 'permission-response' as const, delayMs: 1000, promptId: '', response: 'allow' as const }) },
  { type: 'thinking', label: 'Thinking', icon: Brain, create: () => ({ id: nanoid(8), type: 'thinking' as const, delayMs: 200, durationMs: 1500, label: 'Thinking...' }) },
  { type: 'status-bar-update', label: 'Status Update', icon: BarChart3, create: () => ({ id: nanoid(8), type: 'status-bar-update' as const, delayMs: 0, updates: {} }) },
  { type: 'artifact', label: 'Artifact', icon: Code, create: () => ({ id: nanoid(8), type: 'artifact' as const, delayMs: 300, artifactType: 'code' as const, title: 'Artifact', content: '// code here', language: 'typescript' }) },
  { type: 'cowork-progress', label: 'Progress Step', icon: ListChecks, create: () => ({ id: nanoid(8), type: 'cowork-progress' as const, delayMs: 300, stepIndex: 0, stepLabel: 'Step name', status: 'running' as const }) },
  { type: 'cowork-notification', label: 'Notification', icon: Bell, create: () => ({ id: nanoid(8), type: 'cowork-notification' as const, delayMs: 500, notificationType: 'finished' as const, message: 'Task complete!' }) },
  { type: 'pause', label: 'Pause', icon: Timer, create: () => ({ id: nanoid(8), type: 'pause' as const, delayMs: 0, durationMs: 2000 }) },
]

export function EventPalette() {
  const simulation = useSimulationStore((s) => s.simulation)
  const loadSimulation = useSimulationStore((s) => s.loadSimulation)
  const selectEvent = useEditorStore((s) => s.selectEvent)

  const handleAdd = (template: (typeof eventTemplates)[number]) => {
    if (!simulation) return
    const newEvent = template.create()
    loadSimulation({ ...simulation, events: [...simulation.events, newEvent] })
    selectEvent(newEvent.id)
  }

  return (
    <div className="w-44 border-r border-claude-border flex flex-col bg-claude-sidebar-bg">
      <div className="px-3 py-2 border-b border-claude-border text-[12px] text-claude-text-tertiary font-medium">
        Add Event
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-2 space-y-0.5">
        {eventTemplates.map((t) => {
          const Icon = t.icon
          return (
            <button
              key={t.type}
              onClick={() => handleAdd(t)}
              className="w-full flex items-center gap-2 px-2 py-1.5 text-[12px] text-claude-text-secondary hover:bg-claude-sidebar-hover rounded-lg transition-colors text-left"
            >
              <Icon className="w-3.5 h-3.5 text-claude-icon shrink-0" />
              {t.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
