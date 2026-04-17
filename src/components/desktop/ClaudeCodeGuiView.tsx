import { useMemo } from 'react'
import { Folder, Monitor, Plus, Mic, ChevronDown, CornerDownLeft, FileCheck2 } from 'lucide-react'
import { useSimulationStore } from '../../store/simulation-store'

const DEFAULT_HEATMAP = (() => {
  // 7 rows × 17 cols to match the screenshot density. Values 0–4.
  // Pattern: mostly empty, active blocks on the right half with some stray
  // cells bottom-left (reflects "getting started then ramped up" vibe).
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
  const gui = simulation?.metadata.guiConfig

  const userName = gui?.userName ?? 'Nik'
  const modelName = gui?.modelName ?? 'Opus 4.7'
  const reasoning = gui?.reasoningLevel ?? 'Extra high'
  const stats = gui?.stats ?? {
    sessions: 286,
    messages: 208068,
    totalTokensM: 26.1,
    activeDays: 55,
    currentStreakDays: 2,
    longestStreakDays: 19,
    peakHour: 11,
    favoriteModel: 'Opus 4.6',
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

      <div className="shrink-0 px-10 pb-6 pt-2 relative">
        <div className="max-w-[880px] mx-auto relative">
          <div className="absolute right-2 -top-7 pointer-events-none select-none">
            <PixelBot />
          </div>

          <div className="flex items-center gap-2 mb-2">
            <SourcePill icon={<Monitor className="w-3.5 h-3.5" />} label="Local" />
            <SourcePill icon={<Folder className="w-3.5 h-3.5" />} label="Select folder…" />
          </div>

          <div className="relative bg-white border border-claude-border rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.04)]">
            <input
              className="w-full bg-transparent px-5 py-4 text-[14.5px] text-claude-text placeholder:text-claude-text-tertiary focus:outline-none"
              placeholder="Describe a task or ask a question"
              readOnly
            />
            <div className="absolute right-3 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-md bg-[#F2EFE8] text-claude-text-secondary">
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
    </div>
  )
}

function ClaudeBurst() {
  return (
    <svg viewBox="0 0 32 32" width="26" height="26" className="shrink-0">
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
  // Little 8-bit helper robot matching the screenshot's orange pixel creature.
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
