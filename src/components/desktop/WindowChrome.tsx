import { useEditorStore } from '../../store/editor-store'
import { InlineSimulationPicker } from './InlineSimulationPicker'
import { cn } from '../../utils/cn'
import { ChevronLeft, ChevronRight, PanelLeft } from 'lucide-react'
import type { ProductType } from '../../types/simulation'

const tabs: { id: ProductType; label: string }[] = [
  { id: 'claude-chat', label: 'Chat' },
  { id: 'claude-cowork', label: 'Cowork' },
  { id: 'claude-code', label: 'Code' },
]

export function WindowChrome() {
  const { activeView, setActiveView } = useEditorStore()

  return (
    <div className="flex items-center h-12 px-4 bg-claude-window-chrome border-b border-claude-border relative shrink-0">
      {/* Traffic lights */}
      <div className="flex items-center gap-2 mr-4">
        <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
        <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
        <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
      </div>

      {/* Navigation arrows + sidebar toggle */}
      <div className="flex items-center gap-1 mr-4">
        <button className="p-1 rounded hover:bg-claude-sidebar-hover text-claude-icon">
          <PanelLeft className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-claude-sidebar-hover text-claude-icon">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button className="p-1 rounded hover:bg-claude-sidebar-hover text-claude-icon">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Tabs - centered */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 bg-claude-bg rounded-lg p-0.5">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveView(tab.id)}
            className={cn(
              'px-4 py-1 rounded-md text-[13px] font-medium transition-all',
              activeView === tab.id
                ? tab.id === 'claude-cowork'
                  ? 'bg-claude-tab-cowork-bg text-claude-tab-cowork-text'
                  : 'bg-claude-tab-active-bg text-claude-tab-active-text'
                : 'text-claude-tab-inactive hover:text-claude-text'
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Right side - sim picker */}
      <div className="ml-auto flex items-center gap-2">
        <InlineSimulationPicker />
      </div>
    </div>
  )
}
