import { useState } from 'react'
import { ChevronDown, Upload, Download, FilePlus } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useSimulationStore } from '../../store/simulation-store'
import { usePlaybackStore } from '../../store/playback-store'
import { useEditorStore } from '../../store/editor-store'
import { allDemos } from '../../demos/demo-loader'
import { downloadSimulation, loadSimulationFromFile } from '../../engine/serialization'
import { cn } from '../../utils/cn'
import type { Simulation, ProductType } from '../../types/simulation'

export function SimulationPicker() {
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
    <div className="fixed bottom-16 right-4 z-50">
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          'flex items-center gap-2 px-3 py-2 text-[12px] rounded-xl shadow-lg border transition-all',
          'bg-white/90 backdrop-blur border-claude-border text-claude-text-secondary hover:bg-white hover:shadow-xl'
        )}
      >
        {simulation?.title || 'Load Simulation'}
        <ChevronDown className={cn('w-3 h-3 transition-transform', open && 'rotate-180')} />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute bottom-full right-0 mb-2 w-56 bg-white border border-claude-border rounded-xl shadow-xl z-50 overflow-hidden">
            <div className="px-3 py-2 text-[11px] text-claude-text-tertiary uppercase tracking-wider font-medium">Simulations</div>
            {allDemos.map((d) => (
              <button
                key={d.label}
                onClick={() => handleLoad(d.sim, d.view)}
                className="w-full text-left px-3 py-2 text-[13px] text-claude-text hover:bg-claude-sidebar-hover"
              >
                {d.label}
              </button>
            ))}
            <div className="border-t border-claude-border-light mt-1 pt-1">
              <button onClick={handleNew} className="w-full text-left px-3 py-2 text-[13px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2">
                <FilePlus className="w-3.5 h-3.5 text-claude-icon" /> New Simulation
              </button>
              <button onClick={handleImport} className="w-full text-left px-3 py-2 text-[13px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2">
                <Upload className="w-3.5 h-3.5 text-claude-icon" /> Import JSON
              </button>
              {simulation && (
                <button onClick={handleExport} className="w-full text-left px-3 py-2 text-[13px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2">
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
