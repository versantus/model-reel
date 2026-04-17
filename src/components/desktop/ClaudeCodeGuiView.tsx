import { useMemo, useState } from 'react'
import {
  Folder, Monitor, Plus, Mic, ChevronDown, ChevronRight, CornerDownLeft,
  FileCheck2, Search, FileText, Wrench, Terminal, PenLine,
} from 'lucide-react'
import { useSimulationStore } from '../../store/simulation-store'
import { useChromeStore } from '../../store/chrome-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'
import { ThinkingIndicator } from '../shared/ThinkingIndicator'
import type {
  ArtifactEvent, AssistantMessageEvent, UserMessageEvent, ToolCallEvent,
  ToolResultEvent, RenderedEvent,
} from '../../types/simulation'

const DEFAULT_HEATMAP = (() => {
  const rows = [
    [0,0,0,0,0,0,0,0,0,3,4,3,2,0,3,0,0],
    [0,0,0,0,0,0,0,0,0,2,3,2,3,0,3,3,4],
    [0,0,0,0,0,0,0,0,0,0,0,2,3,2,3,4,3],
    [0,0,0,0,0,0,0,0,0,2,2,0,0,2,2,2,4],
    [0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,2,2,3,0,2,3,2],
    [0,0,0,0,0,0,0,0,0,2,3,2,2,0,2,0,2],
  ]
  return rows.flat()
})()

const INTENSITY: Record<number, string> = {
  0: 'bg-[#EDEFF1]',
  1: 'bg-[#BBD2F3]',
  2: 'bg-[#8CB6EC]',
  3: 'bg-[#5A97E3]',
  4: 'bg-[#2F74D4]',
}

export function ClaudeCodeGuiView() {
  const simulation = useSimulationStore((s) => s.simulation)
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const gui = simulation?.metadata.guiConfig
  const code = simulation?.metadata.codeConfig

  const modelName = gui?.modelName ?? 'Opus 4.7'
  const reasoning = gui?.reasoningLevel ?? 'Extra high'
  const workingFolder = gui?.workingFolder
    ?? code?.workingDirectory
    ?? '~'

  const isGuiSim = simulation?.productType === 'claude-code-gui'
  const hasStarted = isGuiSim && renderedEvents.length > 0
  const firstEvent = renderedEvents[0]
  const stillTypingPrompt =
    hasStarted && renderedEvents.length === 1
    && firstEvent?.event.type === 'user-message'
    && !firstEvent.isComplete

  if (!hasStarted || stillTypingPrompt) {
    const typingContent = stillTypingPrompt ? typedSoFar(firstEvent) : ''
    return (
      <GuiLanding
        gui={gui}
        modelName={modelName}
        reasoning={reasoning}
        workingFolder={workingFolder}
        typingContent={typingContent}
      />
    )
  }

  return (
    <GuiConversation
      renderedEvents={renderedEvents}
      modelName={modelName}
      reasoning={reasoning}
      workingFolder={workingFolder}
    />
  )
}

function typedSoFar(re: RenderedEvent): string {
  if (re.event.type !== 'user-message') return ''
  const full = re.event.content
  if (re.isComplete) return full
  return full.slice(0, Math.floor(full.length * re.progress))
}

// ------- Landing -------

interface LandingProps {
  gui: ReturnType<typeof useSimulationStore.getState>['simulation'] extends infer S
    ? S extends { metadata: { guiConfig?: infer G } } ? G : undefined
    : undefined
  modelName: string
  reasoning: string
  workingFolder: string
  typingContent: string
}

function GuiLanding({ gui, modelName, reasoning, workingFolder, typingContent }: LandingProps) {
  const userName = gui?.userName ?? 'Nik'
  const stats = gui?.stats ?? {
    sessions: 286, messages: 208068, totalTokensM: 26.1, activeDays: 55,
    currentStreakDays: 2, longestStreakDays: 19, peakHour: 11, favoriteModel: 'Opus 4.6',
  }
  const heatmap = gui?.activityHeatmap ?? DEFAULT_HEATMAP
  const footnote = gui?.footnote ?? "You've used ~420× more tokens than The Great Gatsby."
  const formattedMessages = useMemo(() => stats.messages.toLocaleString(), [stats.messages])

  return (
    <div className="h-full bg-claude-bg flex flex-col">
      <div className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-[880px] mx-auto px-10 pt-14 pb-6">
          <h1 className="flex items-center gap-3 text-[28px] font-semibold text-claude-text tracking-tight">
            <ClaudeBurst />
            What's up next, {userName}?
          </h1>

          <div className="mt-10 bg-[#F5F3EE] rounded-2xl p-5 border border-[#E7E3DA]">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-0.5">
                <PillTab active>Overview</PillTab>
                <PillTab>Models</PillTab>
              </div>
              <div className="flex items-center gap-0.5 bg-[#EAE6DE] rounded-full p-0.5">
                <RangeTab active>All</RangeTab>
                <RangeTab>30d</RangeTab>
                <RangeTab>7d</RangeTab>
              </div>
            </div>

            <div className="grid grid-cols-4 gap-2.5">
              <StatCell label="Sessions" value={stats.sessions.toString()} />
              <StatCell label="Messages" value={formattedMessages} />
              <StatCell label="Total tokens" value={`${stats.totalTokensM}M`} />
              <StatCell label="Active days" value={stats.activeDays.toString()} />
              <StatCell label="Current streak" value={`${stats.currentStreakDays}d`} />
              <StatCell label="Longest streak" value={`${stats.longestStreakDays}d`} />
              <StatCell label="Peak hour" value={stats.peakHour.toString()} />
              <StatCell label="Favorite model" value={stats.favoriteModel} />
            </div>

            <div className="mt-5 grid grid-cols-[repeat(17,minmax(0,1fr))] gap-[5px]">
              {heatmap.map((v, i) => (
                <div
                  key={i}
                  className={`aspect-square rounded-[3px] ${INTENSITY[v] ?? INTENSITY[0]}`}
                  title={`Day ${i + 1}`}
                />
              ))}
            </div>

            <p className="mt-4 text-[13px] text-claude-text-tertiary">{footnote}</p>
          </div>
        </div>
      </div>

      <GuiInputBar
        modelName={modelName}
        reasoning={reasoning}
        workingFolder={workingFolder}
        typingContent={typingContent}
        showMascot
      />
    </div>
  )
}

// ------- Conversation -------

interface ConversationProps {
  renderedEvents: RenderedEvent[]
  modelName: string
  reasoning: string
  workingFolder: string
}

function GuiConversation({ renderedEvents, modelName, reasoning, workingFolder }: ConversationProps) {
  const scrollRef = useAutoScroll([renderedEvents.length, renderedEvents[renderedEvents.length - 1]?.progress])

  const toolResults = useMemo(() => {
    const map = new Map<string, ToolResultEvent>()
    renderedEvents.forEach((re) => {
      if (re.event.type === 'tool-result') {
        map.set(re.event.toolCallId, re.event)
      }
    })
    return map
  }, [renderedEvents])

  return (
    <div className="h-full bg-claude-bg flex flex-col">
      <div className="flex items-center gap-2 px-6 py-2.5 border-b border-claude-border-light bg-claude-bg shrink-0">
        <Folder className="w-3.5 h-3.5 text-claude-icon" />
        <span className="text-[12.5px] text-claude-text-secondary font-mono truncate">{workingFolder}</span>
      </div>

      <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar">
        <div className="max-w-[880px] mx-auto px-10 py-8 space-y-5">
          {renderedEvents.map((re) => {
            const { event, progress, isComplete } = re
            if (event.type === 'user-message') {
              return <UserBubble key={event.id} event={event} progress={progress} />
            }
            if (event.type === 'assistant-message') {
              return <AssistantBlock key={event.id} event={event} progress={progress} isComplete={isComplete} />
            }
            if (event.type === 'thinking' && !isComplete) {
              return (
                <div key={event.id} className="flex items-center gap-2 text-[13px] text-claude-text-tertiary">
                  <ThinkingIndicator variant="chat" />
                  <span>{event.label ?? 'Thinking…'}</span>
                </div>
              )
            }
            if (event.type === 'tool-call') {
              const result = toolResults.get(event.id)
              return <ToolCallRow key={event.id} call={event} result={result} running={!isComplete} />
            }
            if (event.type === 'tool-result') {
              // Rendered inline under its matching tool-call.
              return null
            }
            if (event.type === 'artifact') {
              return <ArtifactCard key={event.id} event={event} />
            }
            return null
          })}
        </div>
      </div>

      <GuiInputBar
        modelName={modelName}
        reasoning={reasoning}
        workingFolder={workingFolder}
        typingContent=""
        showMascot={false}
      />
    </div>
  )
}

function UserBubble({ event, progress }: { event: UserMessageEvent; progress: number }) {
  const visible = useMemo(() => {
    if (progress >= 1) return event.content
    return event.content.slice(0, Math.floor(event.content.length * progress))
  }, [event.content, progress])
  return (
    <div className="flex justify-end">
      <div className="bg-[#EDEAE1] text-claude-text rounded-2xl px-4 py-2.5 text-[14.5px] leading-relaxed max-w-[85%] whitespace-pre-wrap">
        {visible}
      </div>
    </div>
  )
}

function AssistantBlock({ event, progress, isComplete }: { event: AssistantMessageEvent; progress: number; isComplete: boolean }) {
  const visible = useMemo(() => {
    if (isComplete || progress >= 1) return event.content
    return event.content.slice(0, Math.floor(event.content.length * progress))
  }, [event.content, progress, isComplete])
  return (
    <div className="flex gap-3">
      <div className="pt-1 shrink-0">
        <ClaudeBurst size={18} />
      </div>
      <div className="flex-1 text-[14.5px] text-claude-text leading-[1.7]">
        <MarkdownRenderer content={visible} variant="chat" />
        {!isComplete && progress < 1 && (
          <span className="cursor-blink inline-block w-[2px] h-[16px] bg-claude-text ml-0.5 align-middle rounded-[1px]" />
        )}
      </div>
    </div>
  )
}

function ToolCallRow({ call, result, running }: { call: ToolCallEvent; result?: ToolResultEvent; running: boolean }) {
  const [open, setOpen] = useState(call.expandedByDefault ?? false)
  const { Icon, label } = describeTool(call)
  const headline = call.description ?? label
  const target = pickTarget(call)

  return (
    <div className="border border-claude-border-light rounded-xl bg-white/60 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-claude-sidebar-hover/50 transition-colors"
      >
        <Icon className="w-3.5 h-3.5 text-claude-icon shrink-0" />
        <span className="text-[12.5px] font-medium text-claude-text-secondary shrink-0">{label}</span>
        {target && (
          <span className="text-[12.5px] text-claude-text font-mono truncate">{target}</span>
        )}
        {!target && (
          <span className="text-[12.5px] text-claude-text-tertiary truncate">{headline}</span>
        )}
        <span className="flex-1" />
        {running ? (
          <span className="flex items-center gap-1.5 text-[11px] text-claude-text-tertiary">
            <span className="w-1.5 h-1.5 rounded-full bg-claude-accent animate-pulse" />
            Running
          </span>
        ) : result?.isError ? (
          <span className="text-[11px] text-red-600">Error</span>
        ) : (
          <span className="text-[11px] text-claude-text-tertiary">Done</span>
        )}
        {open ? (
          <ChevronDown className="w-3.5 h-3.5 text-claude-text-tertiary" />
        ) : (
          <ChevronRight className="w-3.5 h-3.5 text-claude-text-tertiary" />
        )}
      </button>

      {open && (
        <div className="border-t border-claude-border-light bg-[#FBFAF7] px-3 py-2.5 text-[12.5px] text-claude-text-secondary">
          <div className="mb-2">
            <div className="text-[10px] uppercase tracking-wider text-claude-text-tertiary font-semibold mb-1">Input</div>
            <pre className="font-mono text-[12px] whitespace-pre-wrap text-claude-text-secondary bg-white border border-claude-border-light rounded-md p-2 overflow-x-auto">
              {formatToolInput(call)}
            </pre>
          </div>
          {result && (
            <div>
              <div className="text-[10px] uppercase tracking-wider text-claude-text-tertiary font-semibold mb-1">
                {result.isError ? 'Error' : 'Result'}
              </div>
              <pre className={`font-mono text-[12px] whitespace-pre-wrap bg-white border border-claude-border-light rounded-md p-2 overflow-x-auto ${result.isError ? 'text-red-600' : 'text-claude-text'}`}>
                {truncate(result.output, 1200)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function describeTool(call: ToolCallEvent): { Icon: typeof Wrench; label: string } {
  switch (call.toolName) {
    case 'Read': return { Icon: FileText, label: 'Read' }
    case 'Write': return { Icon: PenLine, label: 'Write' }
    case 'Edit': return { Icon: PenLine, label: 'Edit' }
    case 'Glob': return { Icon: Search, label: 'Glob' }
    case 'Grep': return { Icon: Search, label: 'Grep' }
    case 'WebFetch': return { Icon: Search, label: 'WebFetch' }
    case 'WebSearch': return { Icon: Search, label: 'WebSearch' }
    case 'Bash': return { Icon: Terminal, label: 'Bash' }
    default: return { Icon: Wrench, label: call.toolName }
  }
}

function pickTarget(call: ToolCallEvent): string | undefined {
  const input = call.toolInput as Record<string, unknown>
  const candidates = ['file_path', 'path', 'url', 'command', 'pattern']
  for (const key of candidates) {
    const v = input[key]
    if (typeof v === 'string' && v.length) return v
  }
  return undefined
}

function formatToolInput(call: ToolCallEvent): string {
  try {
    const input = call.toolInput as Record<string, unknown>
    const trimmed: Record<string, unknown> = {}
    for (const [k, v] of Object.entries(input)) {
      if (typeof v === 'string' && v.length > 240) {
        trimmed[k] = v.slice(0, 240) + '…'
      } else {
        trimmed[k] = v
      }
    }
    return JSON.stringify(trimmed, null, 2)
  } catch {
    return String(call.toolInput)
  }
}

function truncate(s: string, n: number) {
  if (s.length <= n) return s
  return s.slice(0, n) + `\n… (${s.length - n} more chars)`
}

function ArtifactCard({ event }: { event: ArtifactEvent }) {
  const openChrome = useChromeStore((s) => s.open)
  const typeLabel = event.artifactType === 'code' ? `Code · ${event.language?.toUpperCase() || 'TEXT'}`
    : event.artifactType === 'word' ? 'Document · DOCX'
    : event.artifactType === 'pdf' ? 'Document · PDF'
    : event.artifactType.toUpperCase()
  return (
    <button
      onClick={() => openChrome(event)}
      className="w-full text-left border border-claude-card-border rounded-xl p-4 bg-claude-card-bg hover:bg-claude-sidebar-hover transition-colors"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-claude-bg flex items-center justify-center text-claude-text-tertiary">
            <FileText className="w-5 h-5" strokeWidth={1.5} />
          </div>
          <div>
            <p className="text-[13px] font-medium text-claude-text">{event.title}</p>
            <p className="text-[12px] text-claude-text-tertiary">{typeLabel}</p>
          </div>
        </div>
        <span className="text-[12px] text-claude-text-secondary px-3 py-1.5 border border-claude-border rounded-lg bg-white">
          Open preview
        </span>
      </div>
    </button>
  )
}

// ------- Shared input bar -------

function GuiInputBar({
  modelName, reasoning, workingFolder, typingContent, showMascot,
}: {
  modelName: string
  reasoning: string
  workingFolder: string
  typingContent: string
  showMascot: boolean
}) {
  const folderLabel = workingFolder && workingFolder !== '~'
    ? shorten(workingFolder)
    : 'Select folder…'
  return (
    <div className="shrink-0 px-10 pb-6 pt-2 relative">
      <div className="max-w-[880px] mx-auto relative">
        {showMascot && (
          <div className="absolute right-2 -top-7 pointer-events-none select-none">
            <PixelBot />
          </div>
        )}

        <div className="flex items-center gap-2 mb-2">
          <SourcePill icon={<Monitor className="w-3.5 h-3.5" />} label="Local" />
          <SourcePill icon={<Folder className="w-3.5 h-3.5" />} label={folderLabel} />
        </div>

        <div className="relative bg-white border border-claude-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
          <div
            className="w-full bg-transparent px-5 py-4 text-[14.5px] text-claude-text min-h-[52px] whitespace-pre-wrap"
          >
            {typingContent ? (
              <>
                {typingContent}
                <span className="cursor-blink inline-block w-[2px] h-[16px] bg-claude-text ml-0.5 align-middle rounded-[1px]" />
              </>
            ) : (
              <span className="text-claude-text-tertiary">Describe a task or ask a question</span>
            )}
          </div>
          <div className="absolute right-3 top-3 w-7 h-7 flex items-center justify-center rounded-md bg-[#F2EFE8] text-claude-text-secondary">
            <CornerDownLeft className="w-3.5 h-3.5" strokeWidth={2} />
          </div>
        </div>

        <div className="flex items-center justify-between mt-2.5 text-[12.5px] text-claude-text-secondary">
          <div className="flex items-center gap-1">
            <button className="flex items-center gap-1.5 px-2 py-1 rounded-md hover:bg-claude-sidebar-hover">
              <FileCheck2 className="w-3.5 h-3.5" /> Accept edits
              <span className="inline-flex items-center justify-center w-4 h-4 rounded border border-claude-border-light text-[10px] text-claude-text-tertiary ml-0.5">⇧</span>
            </button>
            <button className="p-1.5 rounded-md hover:bg-claude-sidebar-hover text-claude-icon">
              <Plus className="w-4 h-4" />
            </button>
            <button className="flex items-center gap-0.5 p-1.5 rounded-md hover:bg-claude-sidebar-hover text-claude-icon">
              <Mic className="w-4 h-4" />
              <ChevronDown className="w-3 h-3" />
            </button>
          </div>
          <div className="flex items-center gap-1.5 text-claude-text-tertiary">
            <span className="text-claude-text-secondary font-medium">{modelName}</span>
            <span>·</span>
            <span>{reasoning}</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>
    </div>
  )
}

function shorten(path: string): string {
  const parts = path.replace(/^\/+/, '').split('/')
  if (parts.length <= 2) return path
  return '…/' + parts.slice(-2).join('/')
}

// ------- Primitives -------

function ClaudeBurst({ size = 26 }: { size?: number }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} className="shrink-0">
      <g fill="#D97757">
        <rect x="15" y="2" width="2" height="10" rx="1" />
        <rect x="15" y="20" width="2" height="10" rx="1" />
        <rect x="2" y="15" width="10" height="2" rx="1" />
        <rect x="20" y="15" width="10" height="2" rx="1" />
        <rect x="15" y="15" width="2" height="2" transform="rotate(45 16 16)" />
        <path d="M7 7 L13 13 M19 19 L25 25 M25 7 L19 13 M13 19 L7 25" stroke="#D97757" strokeWidth="2" strokeLinecap="round" />
      </g>
    </svg>
  )
}

function PillTab({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={
        'px-3 py-1 text-[13px] rounded-md font-medium transition-colors ' +
        (active ? 'bg-white text-claude-text shadow-sm' : 'text-claude-text-secondary hover:text-claude-text')
      }
    >
      {children}
    </button>
  )
}

function RangeTab({ children, active }: { children: React.ReactNode; active?: boolean }) {
  return (
    <button
      className={
        'px-3 py-0.5 text-[12px] rounded-full font-medium transition-colors ' +
        (active ? 'bg-white text-claude-text shadow-sm' : 'text-claude-text-secondary hover:text-claude-text')
      }
    >
      {children}
    </button>
  )
}

function StatCell({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-[#EDEAE1] rounded-xl px-3.5 py-2.5">
      <div className="text-[12px] text-claude-text-tertiary">{label}</div>
      <div className="text-[18px] font-semibold text-claude-text mt-0.5 tabular-nums">{value}</div>
    </div>
  )
}

function SourcePill({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg border border-claude-border bg-white text-[12.5px] text-claude-text-secondary hover:text-claude-text">
      <span className="text-claude-icon">{icon}</span>
      {label}
    </button>
  )
}

function PixelBot() {
  const C = '#D97757'
  const px = (x: number, y: number, color = C) => (
    <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} />
  )
  const cells: Array<[number, number]> = [
    [3,0],[4,0],[5,0],
    [2,1],[3,1],[4,1],[5,1],[6,1],
    [2,2],[3,2],[4,2],[5,2],[6,2],
    [1,3],[2,3],[3,3],[4,3],[5,3],[6,3],[7,3],
    [1,4],[7,4],
    [2,5],[6,5],
    [3,6],[5,6],
  ]
  const eyes: Array<[number, number]> = [[3,2],[5,2]]
  return (
    <svg viewBox="0 0 9 7" width="40" height="32" shapeRendering="crispEdges">
      {cells.map(([x, y]) => px(x, y))}
      {eyes.map(([x, y]) => px(x, y, '#1C1A19'))}
    </svg>
  )
}
