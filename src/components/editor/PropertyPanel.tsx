import { useSimulationStore } from '../../store/simulation-store'
import type { Simulation, SimulationEvent } from '../../types/simulation'

interface PropertyPanelProps {
  simulation: Simulation
  selectedEventId: string
}

export function PropertyPanel({ simulation, selectedEventId }: PropertyPanelProps) {
  const loadSimulation = useSimulationStore((s) => s.loadSimulation)
  const event = simulation.events.find((e) => e.id === selectedEventId)

  if (!event) return null

  const updateEvent = (updates: Partial<SimulationEvent>) => {
    loadSimulation({
      ...simulation,
      events: simulation.events.map((e) =>
        e.id === selectedEventId ? { ...e, ...updates } as SimulationEvent : e
      ),
    })
  }

  return (
    <div className="w-72 border-l border-claude-border flex flex-col bg-claude-surface">
      <div className="px-4 py-2 border-b border-claude-border text-[12px] text-claude-text-tertiary font-medium">
        Properties
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-4">
        <Field label="Type" value={event.type} disabled />
        <NumberField label="Delay (ms)" value={event.delayMs} onChange={(v) => updateEvent({ delayMs: v })} />
        {event.durationMs != null && (
          <NumberField label="Duration (ms)" value={event.durationMs} onChange={(v) => updateEvent({ durationMs: v })} />
        )}

        {(event.type === 'user-message' || event.type === 'assistant-message') && (
          <TextAreaField label="Content" value={event.content} onChange={(v) => updateEvent({ content: v } as Partial<SimulationEvent>)} />
        )}
        {event.type === 'user-message' && (
          <CheckboxField label="Typing effect" checked={event.typingEffect} onChange={(v) => updateEvent({ typingEffect: v } as Partial<SimulationEvent>)} />
        )}
        {event.type === 'assistant-message' && (
          <SelectField label="Speed" value={event.streamingSpeed} options={['slow', 'normal', 'fast']} onChange={(v) => updateEvent({ streamingSpeed: v } as Partial<SimulationEvent>)} />
        )}
        {event.type === 'tool-call' && (
          <>
            <SelectField label="Tool" value={event.toolName} options={['Read', 'Edit', 'Bash', 'Grep', 'Glob', 'Write', 'Agent']} onChange={(v) => updateEvent({ toolName: v } as Partial<SimulationEvent>)} />
            <Field label="Description" value={event.description || ''} onChange={(v) => updateEvent({ description: v } as Partial<SimulationEvent>)} />
            <TextAreaField label="Input (JSON)" value={JSON.stringify(event.toolInput, null, 2)} onChange={(v) => { try { updateEvent({ toolInput: JSON.parse(v) } as Partial<SimulationEvent>) } catch {} }} />
            <CheckboxField label="Expanded" checked={event.expandedByDefault} onChange={(v) => updateEvent({ expandedByDefault: v } as Partial<SimulationEvent>)} />
          </>
        )}
        {event.type === 'tool-result' && (
          <>
            <Field label="Tool call ID" value={event.toolCallId} onChange={(v) => updateEvent({ toolCallId: v } as Partial<SimulationEvent>)} />
            <TextAreaField label="Output" value={event.output} onChange={(v) => updateEvent({ output: v } as Partial<SimulationEvent>)} />
            <CheckboxField label="Is error" checked={event.isError} onChange={(v) => updateEvent({ isError: v } as Partial<SimulationEvent>)} />
          </>
        )}
        {event.type === 'permission-prompt' && (
          <>
            <Field label="Tool" value={event.toolName} onChange={(v) => updateEvent({ toolName: v } as Partial<SimulationEvent>)} />
            <Field label="Description" value={event.description} onChange={(v) => updateEvent({ description: v } as Partial<SimulationEvent>)} />
            <Field label="Command" value={event.command || ''} onChange={(v) => updateEvent({ command: v } as Partial<SimulationEvent>)} />
          </>
        )}
        {event.type === 'thinking' && (
          <Field label="Label" value={event.label || ''} onChange={(v) => updateEvent({ label: v } as Partial<SimulationEvent>)} />
        )}
        {event.type === 'artifact' && (
          <>
            <Field label="Title" value={event.title} onChange={(v) => updateEvent({ title: v } as Partial<SimulationEvent>)} />
            <SelectField label="Type" value={event.artifactType} options={['code', 'html', 'react', 'markdown', 'svg']} onChange={(v) => updateEvent({ artifactType: v } as Partial<SimulationEvent>)} />
            <Field label="Language" value={event.language || ''} onChange={(v) => updateEvent({ language: v } as Partial<SimulationEvent>)} />
            <TextAreaField label="Content" value={event.content} onChange={(v) => updateEvent({ content: v } as Partial<SimulationEvent>)} />
          </>
        )}
        {event.type === 'cowork-progress' && (
          <>
            <NumberField label="Step index" value={event.stepIndex} onChange={(v) => updateEvent({ stepIndex: v } as Partial<SimulationEvent>)} />
            <Field label="Label" value={event.stepLabel} onChange={(v) => updateEvent({ stepLabel: v } as Partial<SimulationEvent>)} />
            <SelectField label="Status" value={event.status} options={['pending', 'running', 'complete', 'error']} onChange={(v) => updateEvent({ status: v } as Partial<SimulationEvent>)} />
            <Field label="Detail" value={event.detail || ''} onChange={(v) => updateEvent({ detail: v } as Partial<SimulationEvent>)} />
          </>
        )}
        {event.type === 'cowork-notification' && (
          <>
            <SelectField label="Type" value={event.notificationType} options={['finished', 'needs-input', 'error']} onChange={(v) => updateEvent({ notificationType: v } as Partial<SimulationEvent>)} />
            <Field label="Message" value={event.message} onChange={(v) => updateEvent({ message: v } as Partial<SimulationEvent>)} />
          </>
        )}
        {event.type === 'status-bar-update' && (
          <>
            <Field label="Cost" value={event.updates.cost || ''} onChange={(v) => updateEvent({ updates: { ...event.updates, cost: v || undefined } } as Partial<SimulationEvent>)} />
            <NumberField label="Context %" value={event.updates.contextPercent ?? 0} onChange={(v) => updateEvent({ updates: { ...event.updates, contextPercent: v } } as Partial<SimulationEvent>)} />
          </>
        )}
      </div>
    </div>
  )
}

function Field({ label, value, onChange, disabled }: { label: string; value: string; onChange?: (v: string) => void; disabled?: boolean }) {
  return (
    <div>
      <label className="block text-[11px] text-claude-text-tertiary mb-1">{label}</label>
      <input type="text" value={value} onChange={(e) => onChange?.(e.target.value)} disabled={disabled}
        className="w-full bg-claude-bg border border-claude-border rounded-lg px-2 py-1.5 text-[12px] text-claude-text disabled:opacity-50 focus:outline-none focus:border-claude-accent" />
    </div>
  )
}

function NumberField({ label, value, onChange }: { label: string; value: number; onChange: (v: number) => void }) {
  return (
    <div>
      <label className="block text-[11px] text-claude-text-tertiary mb-1">{label}</label>
      <input type="number" value={value} onChange={(e) => onChange(Number(e.target.value))}
        className="w-full bg-claude-bg border border-claude-border rounded-lg px-2 py-1.5 text-[12px] text-claude-text focus:outline-none focus:border-claude-accent" />
    </div>
  )
}

function TextAreaField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] text-claude-text-tertiary mb-1">{label}</label>
      <textarea value={value} onChange={(e) => onChange(e.target.value)} rows={6}
        className="w-full bg-claude-bg border border-claude-border rounded-lg px-2 py-1.5 text-[12px] text-claude-text font-mono resize-y focus:outline-none focus:border-claude-accent" />
    </div>
  )
}

function SelectField({ label, value, options, onChange }: { label: string; value: string; options: string[]; onChange: (v: string) => void }) {
  return (
    <div>
      <label className="block text-[11px] text-claude-text-tertiary mb-1">{label}</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}
        className="w-full bg-claude-bg border border-claude-border rounded-lg px-2 py-1.5 text-[12px] text-claude-text focus:outline-none focus:border-claude-accent">
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  )
}

function CheckboxField({ label, checked, onChange }: { label: string; checked: boolean; onChange: (v: boolean) => void }) {
  return (
    <label className="flex items-center gap-2 text-[12px] text-claude-text-secondary cursor-pointer">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="rounded border-claude-border" />
      {label}
    </label>
  )
}
