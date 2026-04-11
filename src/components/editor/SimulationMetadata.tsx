import { useSimulationStore } from '../../store/simulation-store'
import type { Simulation, ProductType } from '../../types/simulation'

interface SimulationMetadataProps {
  simulation: Simulation
}

export function SimulationMetadata({ simulation }: SimulationMetadataProps) {
  const loadSimulation = useSimulationStore((s) => s.loadSimulation)

  const update = (updates: Partial<Simulation>) => {
    loadSimulation({ ...simulation, ...updates })
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
      </select>
      <span className="text-[12px] text-claude-text-tertiary">{simulation.events.length} events</span>
    </div>
  )
}
