import { useSimulationStore } from '../../store/simulation-store'
import { GitBranch, Cpu, DollarSign, BarChart3 } from 'lucide-react'

export function StatusBar() {
  const { modelName, gitBranch, cost, contextPercent } = useSimulationStore((s) => s.statusBar)

  return (
    <div className="flex items-center justify-between px-4 py-1.5 bg-terminal-surface border-t border-terminal-border text-xs text-terminal-dim">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <Cpu className="w-3 h-3" />
          <span>{modelName}</span>
        </div>
        <div className="flex items-center gap-1.5">
          <GitBranch className="w-3 h-3" />
          <span>{gitBranch}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-1.5">
          <DollarSign className="w-3 h-3" />
          <span>{cost}</span>
        </div>
        <div className="flex items-center gap-2">
          <BarChart3 className="w-3 h-3" />
          <div className="w-16 h-1.5 bg-terminal-border rounded-full overflow-hidden">
            <div
              className="h-full bg-terminal-cyan rounded-full transition-all duration-500"
              style={{ width: `${contextPercent}%` }}
            />
          </div>
          <span className="tabular-nums">{contextPercent}%</span>
        </div>
      </div>
    </div>
  )
}
