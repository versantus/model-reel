import { Play, Download, X } from 'lucide-react'
import { useSimulationStore } from '../../store/simulation-store'
import { useEditorStore } from '../../store/editor-store'
import { usePlayback } from '../../hooks/usePlayback'
import { downloadSimulation } from '../../engine/serialization'
import type { Simulation, ProductType } from '../../types/simulation'

interface SimulationMetadataProps {
  simulation: Simulation
}

export function SimulationMetadata({ simulation }: SimulationMetadataProps) {
  const loadSimulation = useSimulationStore((s) => s.loadSimulation)
  const resetPlayback = useSimulationStore((s) => s.resetPlayback)
  const setEditorVisible = useEditorStore((s) => s.setEditorVisible)
  const { play, stop } = usePlayback()

  const update = (updates: Partial<Simulation>) => {
    loadSimulation({ ...simulation, ...updates })
  }

  const handlePreview = () => {
    stop()
    resetPlayback()
    setEditorVisible(false)
    setTimeout(() => play(), 50)
  }

  const handleClose = () => {
    setEditorVisible(false)
  }

  return (
    <div className="flex items-center gap-4 px-4 py-2 border-b border-claude-border bg-claude-surface">
      <input
        type="text"
        value={simulation.title}
        onChange={(e) => update({ title: e.target.value })}
        className="bg-transparent border-b border-claude-border text-[13px] text-claude-text px-1 py-0.5 focus:outline-none focus:border-claude-accent"
        placeholder="Simulation title"
      />
      <select
        value={simulation.productType}
        onChange={(e) => update({ productType: e.target.value as ProductType })}
        className="bg-claude-surface border border-claude-border rounded-lg px-2 py-1 text-[12px] text-claude-text-secondary focus:outline-none"
      >
        <option value="claude-code">Claude Code</option>
        <option value="claude-chat">Claude Chat</option>
        <option value="claude-cowork">Cowork</option>
        <option value="chatgpt">ChatGPT</option>
      </select>
      <span className="text-[12px] text-claude-text-tertiary">{simulation.events.length} events</span>

      <div className="flex-1" />

      <div className="flex items-center gap-1.5">
        <button
          onClick={() => downloadSimulation(simulation)}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium text-claude-text-secondary hover:bg-claude-sidebar-hover border border-claude-border-light"
          title="Export as JSON"
        >
          <Download className="w-3 h-3" />
          Export
        </button>
        <button
          onClick={handlePreview}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[11px] font-medium text-white bg-claude-accent hover:bg-claude-accent/90"
          title="Preview simulation"
        >
          <Play className="w-3 h-3" />
          Preview
        </button>
        <button
          onClick={handleClose}
          className="p-1 rounded-lg text-claude-text-tertiary hover:bg-claude-sidebar-hover hover:text-claude-text"
          title="Close editor"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
