import { useState } from 'react'
import { ChevronDown, Upload, Download, FilePlus } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useSimulationStore } from '../../store/simulation-store'
import { usePlaybackStore } from '../../store/playback-store'
import { useEditorStore } from '../../store/editor-store'
import { sampleClaudeCodeSimulation, sampleClaudeChatSimulation, sampleCoworkSimulation } from '../../utils/sample-data'
import { sampleLandingPageSimulation, sampleTodoAppSimulation, sampleApiSimulation, sampleDashboardSimulation, sampleCoworkBuildSimulation } from '../../utils/sample-data-advanced'
import { downloadSimulation, loadSimulationFromFile } from '../../engine/serialization'
import { cn } from '../../utils/cn'
import type { Simulation, ProductType } from '../../types/simulation'

const demos = [
  { label: 'Claude Code Demo', sim: sampleClaudeCodeSimulation, view: 'claude-code' as const },
  { label: 'Claude Chat Demo', sim: sampleClaudeChatSimulation, view: 'claude-chat' as const },
  { label: 'Cowork Demo', sim: sampleCoworkSimulation, view: 'claude-cowork' as const },
  { label: 'Build a Landing Page', sim: sampleLandingPageSimulation, view: 'claude-chat' as const },
  { label: 'Build a Todo App', sim: sampleTodoAppSimulation, view: 'claude-chat' as const },
  { label: 'Build a REST API', sim: sampleApiSimulation, view: 'claude-code' as const },
  { label: 'Analytics Dashboard', sim: sampleDashboardSimulation, view: 'claude-chat' as const },
  { label: 'Cowork: Full-Stack App', sim: sampleCoworkBuildSimulation, view: 'claude-cowork' as const },
]

export function InlineSimulationPicker() {
  const [open, setOpen] = useState(false)
  const simulation = useSimulationStore((s) => s.simulation)
  const loadSimulation = useSimulationStore((s) => s.loadSimulation)
  const resetPlayback = useSimulationStore((s) => s.resetPlayback)
  const stop = usePlaybackStore((s) => s.stop)
  const setActiveView = useEditorStore((s) => s.setActiveView)

  const handleLoad = (sim: Simulation, view?: ProductType) => {
    stop()
    resetPlayback()
    loadSimulation(sim)
    if (view) setActiveView(view)
    setOpen(false)
  }

  const handleNew = () => {
    const newSim: Simulation = {
      id: nanoid(8),
      title: 'New Simulation',
      description: '',
      productType: 'claude-code',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      metadata: {
        codeConfig: {
          modelName: 'claude-opus-4-6',
          gitBranch: 'main',
          workingDirectory: '/Users/dev/project',
          initialCost: '$0.00',
          initialContext: 0,
        },
      },
      events: [],
    }
    handleLoad(newSim, 'claude-code')
    useEditorStore.getState().setEditorVisible(true)
  }

  const handleImport = async () => {
    try {
      const sim = await loadSimulationFromFile()
      handleLoad(sim, sim.productType)
    } catch {
      // cancelled
    }
  }

  const handleExport = () => {
    if (simulation) downloadSimulation(simulation)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 text-[11px] font-medium rounded-lg transition-colors',
          'bg-claude-bg text-claude-text-secondary hover:bg-claude-sidebar-hover border border-claude-border-light'
        )}
      >
        {simulation?.title || 'Load Demo'}
        <ChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-full mt-1 w-56 bg-white border border-claude-border rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="max-h-[320px] overflow-y-auto custom-scrollbar">
              <div className="px-3 py-1.5 text-[10px] text-claude-text-tertiary uppercase tracking-wider font-medium">
                Basic Demos
              </div>
              {demos.slice(0, 3).map((d) => (
                <button
                  key={d.label}
                  onClick={() => handleLoad(d.sim, d.view)}
                  className="w-full text-left px-3 py-2 text-[12px] text-claude-text hover:bg-claude-sidebar-hover"
                >
                  {d.label}
                </button>
              ))}
              <div className="px-3 py-1.5 text-[10px] text-claude-text-tertiary uppercase tracking-wider font-medium border-t border-claude-border-light mt-0.5 pt-1.5">
                Advanced Demos
              </div>
              {demos.slice(3).map((d) => (
                <button
                  key={d.label}
                  onClick={() => handleLoad(d.sim, d.view)}
                  className="w-full text-left px-3 py-2 text-[12px] text-claude-text hover:bg-claude-sidebar-hover"
                >
                  {d.label}
                </button>
              ))}
            </div>
            <div className="border-t border-claude-border-light mt-0.5 pt-0.5">
              <button onClick={handleNew} className="w-full text-left px-3 py-2 text-[12px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2">
                <FilePlus className="w-3.5 h-3.5 text-claude-icon" /> New Simulation
              </button>
              <button onClick={handleImport} className="w-full text-left px-3 py-2 text-[12px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2">
                <Upload className="w-3.5 h-3.5 text-claude-icon" /> Import JSON
              </button>
              {simulation && (
                <button onClick={handleExport} className="w-full text-left px-3 py-2 text-[12px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2">
                  <Download className="w-3.5 h-3.5 text-claude-icon" /> Export JSON
                </button>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
