import { useState, useRef } from 'react'
import { ChevronDown, Upload, Download, FilePlus, X } from 'lucide-react'
import { nanoid } from 'nanoid'
import { useSimulationStore } from '../../store/simulation-store'
import { usePlaybackStore } from '../../store/playback-store'
import { useEditorStore } from '../../store/editor-store'
import { useDemoCatalogStore } from '../../store/demo-catalog-store'
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
  const entries = useDemoCatalogStore((s) => s.getFilteredEntries())
  const selectedId = useDemoCatalogStore((s) => s.selectedId)
  const selectDemo = useDemoCatalogStore((s) => s.selectDemo)
  const filter = useDemoCatalogStore((s) => s.filter)
  const setFilter = useDemoCatalogStore((s) => s.setFilter)
  const addUserDemo = useDemoCatalogStore((s) => s.addUserDemo)

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
      const entry = {
        id: `user:${sim.id}`,
        label: sim.title || 'Untitled',
        sim,
        view: sim.productType,
        category: 'imported',
        source: 'user' as const,
        description: sim.description,
      }
      addUserDemo(entry)
      handleLoad(sim, sim.productType)
    } catch {
      // cancelled
    }
  }

  const handleExport = () => {
    if (simulation) downloadSimulation(simulation)
  }

  // Group entries by category
  const grouped = entries.reduce<Record<string, typeof entries>>((acc, e) => {
    const key = e.category || 'Other'
    if (!acc[key]) acc[key] = []
    acc[key].push(e)
    return acc
  }, {})

  const hasBuiltin = entries.some((e) => e.source === 'builtin')
  const hasUser = entries.some((e) => e.source === 'user')

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
          <div className="absolute bottom-full right-0 mb-2 w-72 bg-white border border-claude-border rounded-xl shadow-xl z-50 overflow-hidden flex flex-col max-h-[70vh]">
            {/* Search + filters */}
            <div className="px-3 py-2 border-b border-claude-border-light">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search demos..."
                  value={filter.search || ''}
                  onChange={(e) => setFilter({ search: e.target.value })}
                  className="w-full pl-8 pr-3 py-1.5 text-[12px] border border-claude-border rounded-lg focus:outline-none focus:border-claude-purple"
                />
                <SearchIcon className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                {filter.search && (
                  <button
                    onClick={() => setFilter({ search: undefined })}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    <X className="w-3 h-3 text-gray-400" />
                  </button>
                )}
              </div>
              {(hasBuiltin || hasUser) && (
                <div className="flex gap-1 mt-2">
                  {(['all', 'builtin', 'user'] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setFilter({ source: s })}
                      className={cn(
                        'px-2 py-0.5 text-[10px] rounded-md font-medium transition-colors',
                        filter.source === s
                          ? 'bg-claude-purple text-white'
                          : 'text-gray-500 hover:bg-gray-100'
                      )}
                    >
                      {s === 'all' ? 'All' : s === 'builtin' ? 'Built-in' : 'Yours'}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Demo list */}
            <div className="overflow-y-auto flex-1">
              {Object.entries(grouped).map(([cat, demos]) => (
                <div key={cat}>
                  <div className="px-3 py-1.5 text-[10px] text-claude-text-tertiary uppercase tracking-wider font-medium bg-gray-50">
                    {cat}
                  </div>
                  {demos.map((d) => (
                    <button
                      key={d.id}
                      onClick={() => {
                        selectDemo(d.id)
                        handleLoad(d.sim, d.view)
                      }}
                      className={cn(
                        'w-full text-left px-3 py-2 text-[13px] hover:bg-claude-sidebar-hover transition-colors',
                        selectedId === d.id ? 'text-claude-purple font-medium bg-purple-50' : 'text-claude-text'
                      )}
                    >
                      <div className="flex items-center justify-between">
                        <span>{d.label}</span>
                        <span className={cn(
                          'text-[9px] px-1.5 py-0.5 rounded-full',
                          d.source === 'builtin' ? 'bg-gray-100 text-gray-500' : 'bg-purple-100 text-purple-600'
                        )}>
                          {d.source === 'builtin' ? 'Built-in' : 'Yours'}
                        </span>
                      </div>
                      {d.description && (
                        <p className="text-[11px] text-gray-400 mt-0.5 truncate">{d.description}</p>
                      )}
                    </button>
                  ))}
                </div>
              ))}
              {entries.length === 0 && (
                <div className="px-3 py-4 text-center text-[12px] text-gray-400">
                  No demos match your filter
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="border-t border-claude-border-light p-2 space-y-1">
              <button onClick={handleNew} className="w-full text-left px-3 py-2 text-[13px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2 rounded-lg">
                <FilePlus className="w-3.5 h-3.5 text-claude-icon" /> New Simulation
              </button>
              <button onClick={handleImport} className="w-full text-left px-3 py-2 text-[13px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2 rounded-lg">
                <Upload className="w-3.5 h-3.5 text-claude-icon" /> Import JSON
              </button>
              {simulation && (
                <button onClick={handleExport} className="w-full text-left px-3 py-2 text-[13px] text-claude-text hover:bg-claude-sidebar-hover flex items-center gap-2 rounded-lg">
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

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  )
}
