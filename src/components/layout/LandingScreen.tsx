import { useState, useMemo } from 'react'
import { Search, X, Upload, FilePlus, Play } from 'lucide-react'
import { useSimulationStore } from '../../store/simulation-store'
import { useDemoCatalogStore } from '../../store/demo-catalog-store'
import { usePlaybackStore } from '../../store/playback-store'
import { useEditorStore } from '../../store/editor-store'
import { loadSimulationFromFile } from '../../engine/serialization'
import { nanoid } from 'nanoid'
import { cn } from '../../utils/cn'
import type { Simulation, ProductType } from '../../types/simulation'
import type { DemoEntry } from '../../types/demo-catalog'

const viewIcons: Record<ProductType, string> = {
  'claude-chat': '💬',
  'claude-code': '⌘',
  'claude-cowork': '⚡',
}

const viewLabels: Record<ProductType, string> = {
  'claude-chat': 'Chat',
  'claude-code': 'Code',
  'claude-cowork': 'Cowork',
}

export function LandingScreen() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string>('all')
  const [activeSource, setActiveSource] = useState<'all' | 'builtin' | 'user'>('all')

  const entries = useDemoCatalogStore((s) => s.getFilteredEntries())
  const selectDemo = useDemoCatalogStore((s) => s.selectDemo)
  const addUserDemo = useDemoCatalogStore((s) => s.addUserDemo)
  const categories = useDemoCatalogStore((s) => s.getCategories())

  const loadSimulation = useSimulationStore((s) => s.loadSimulation)
  const resetPlayback = useSimulationStore((s) => s.resetPlayback)
  const stop = usePlaybackStore((s) => s.stop)
  const setActiveView = useEditorStore((s) => s.setActiveView)
  const setEditorVisible = useEditorStore((s) => s.setEditorVisible)

  // Apply local search + category + source filters
  const filtered = useMemo(() => {
    return entries.filter((e) => {
      if (activeCategory !== 'all' && e.category !== activeCategory) return false
      if (activeSource !== 'all' && e.source !== activeSource) return false
      if (search) {
        const q = search.toLowerCase()
        const text = (e.label + ' ' + (e.description || '') + ' ' + (e.tags?.join(' ') || '')).toLowerCase()
        if (!text.includes(q)) return false
      }
      return true
    })
  }, [entries, activeCategory, activeSource, search])

  const hasBuiltin = entries.some((e) => e.source === 'builtin')
  const hasUser = entries.some((e) => e.source === 'user')

  const handleLoad = (entry: DemoEntry) => {
    stop()
    resetPlayback()
    loadSimulation(entry.sim)
    selectDemo(entry.id)
    setActiveView(entry.view)
    setEditorVisible(false)
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
    stop()
    resetPlayback()
    loadSimulation(newSim)
    setActiveView('claude-code')
    setEditorVisible(true)
  }

  const handleImport = async () => {
    try {
      const sim = await loadSimulationFromFile()
      const entry: DemoEntry = {
        id: `user:${sim.id}`,
        label: sim.title || 'Untitled',
        sim,
        view: sim.productType,
        category: 'imported',
        source: 'user',
        description: sim.description,
      }
      addUserDemo(entry)
      handleLoad(entry)
    } catch {
      // cancelled
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-950 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-8 py-5 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="Model Reel" className="h-8" />
          <h1 className="text-xl font-bold text-white">Model Reel</h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={handleImport}
            className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 cursor-pointer text-sm text-white transition-colors"
          >
            <Upload className="w-4 h-4" />
            Import JSON
          </button>
          <button
            onClick={handleNew}
            className="flex items-center gap-2 px-4 py-2 bg-claude-purple rounded-lg hover:bg-purple-600 text-sm font-medium text-white transition-colors"
          >
            <FilePlus className="w-4 h-4" />
            New Simulation
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4 px-8 py-4 border-b border-gray-800">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search demos..."
            className="w-full pl-9 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:border-claude-purple"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {(hasBuiltin || hasUser) && (
          <div className="flex items-center gap-1 bg-gray-900 rounded-lg p-1 border border-gray-800">
            {(['all', 'builtin', 'user'] as const).map((src) => (
              <button
                key={src}
                onClick={() => setActiveSource(src)}
                className={cn(
                  'px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize',
                  activeSource === src ? 'bg-gray-700 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                {src === 'all' ? 'All' : src === 'builtin' ? 'Built-in' : 'My demos'}
              </button>
            ))}
          </div>
        )}

        <div className="flex items-center gap-1">
          <button
            onClick={() => setActiveCategory('all')}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize',
              activeCategory === 'all' ? 'bg-claude-purple text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
            )}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                'px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize',
                activeCategory === cat.id ? 'bg-claude-purple text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800'
              )}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto px-8 py-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-gray-500">
            <Search className="w-12 h-12 mb-4 opacity-30" />
            <p className="text-lg font-medium">No demos found</p>
            <p className="text-sm mt-1">Try adjusting your filters or import a simulation</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filtered.map((entry) => (
              <DemoCard key={entry.id} entry={entry} onClick={() => handleLoad(entry)} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function DemoCard({ entry, onClick }: { entry: DemoEntry; onClick: () => void }) {
  return (
    <div
      className="group relative bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-claude-purple hover:bg-gray-850 transition-all cursor-pointer flex flex-col gap-3"
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2">
          <span className="text-lg">{viewIcons[entry.view] || '▶'}</span>
          <span className="text-xs font-medium text-gray-400 uppercase tracking-wider">{viewLabels[entry.view] || entry.view}</span>
        </div>
        {entry.source === 'builtin' ? (
          <span className="text-[10px] bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full uppercase">Built-in</span>
        ) : (
          <span className="text-[10px] bg-claude-purple/20 text-claude-purple px-2 py-0.5 rounded-full uppercase">Yours</span>
        )}
      </div>

      <div>
        <h3 className="font-semibold text-white text-sm leading-snug">{entry.label}</h3>
        {entry.description && (
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">{entry.description}</p>
        )}
      </div>

      <div className="flex items-center gap-2 mt-auto pt-2">
        <span className="text-[10px] bg-gray-800 text-gray-400 px-2 py-0.5 rounded-full capitalize">{entry.category}</span>
        {entry.tags?.map((t) => (
          <span key={t} className="text-[10px] bg-gray-800 text-gray-500 px-2 py-0.5 rounded-full">{t}</span>
        ))}
      </div>

      {/* Hover overlay with play button */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 rounded-xl">
        <div className="flex items-center gap-2 px-4 py-2 bg-claude-purple rounded-lg text-sm font-medium text-white">
          <Play className="w-4 h-4" />
          Play demo
        </div>
      </div>
    </div>
  )
}
