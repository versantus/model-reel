import { useEditorStore } from '../../store/editor-store'
import { useSimulationStore } from '../../store/simulation-store'
import { PlaybackControls } from './PlaybackControls'
import { CodeView } from '../claude-code/CodeView'
import { ChatView } from '../claude-chat/ChatView'
import { CoworkView } from '../claude-cowork/CoworkView'
import { SimulationEditor } from '../editor/SimulationEditor'
import { SimulationPicker } from './SimulationPicker'
import { cn } from '../../utils/cn'
import type { ProductType } from '../../types/simulation'
import { Terminal, MessageSquare, Zap, Edit3, Play } from 'lucide-react'

const viewTabs: { id: ProductType; label: string; icon: typeof Terminal }[] = [
  { id: 'claude-code', label: 'Claude Code', icon: Terminal },
  { id: 'claude-chat', label: 'Claude Chat', icon: MessageSquare },
  { id: 'claude-cowork', label: 'Cowork', icon: Zap },
]

export function AppShell() {
  const { activeView, setActiveView, isEditorVisible, setEditorVisible } = useEditorStore()
  const simulation = useSimulationStore((s) => s.simulation)

  return (
    <div className="h-full flex flex-col bg-gray-950">
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-900 border-b border-gray-800">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-white tracking-wide">Model Reel</h1>
          <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-0.5">
            {viewTabs.map((tab) => {
              const Icon = tab.icon
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveView(tab.id)}
                  className={cn(
                    'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                    activeView === tab.id
                      ? 'bg-gray-600 text-white'
                      : 'text-gray-400 hover:text-white hover:bg-gray-700'
                  )}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Editor/Playback toggle */}
          {simulation && (
            <div className="flex items-center gap-1 bg-gray-800 rounded-lg p-0.5 ml-2">
              <button
                onClick={() => setEditorVisible(false)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  !isEditorVisible
                    ? 'bg-claude-purple text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                <Play className="w-3.5 h-3.5" />
                Playback
              </button>
              <button
                onClick={() => setEditorVisible(true)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors',
                  isEditorVisible
                    ? 'bg-claude-purple text-white'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                )}
              >
                <Edit3 className="w-3.5 h-3.5" />
                Editor
              </button>
            </div>
          )}
        </div>
        <SimulationPicker />
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {!simulation ? (
          <SimulationLanding />
        ) : isEditorVisible ? (
          <SimulationEditor />
        ) : activeView === 'claude-code' ? (
          <CodeView />
        ) : activeView === 'claude-chat' ? (
          <ChatView />
        ) : (
          <CoworkView />
        )}
      </div>

      {/* Playback controls */}
      {simulation && !isEditorVisible && <PlaybackControls />}
    </div>
  )
}

function SimulationLanding() {
  return (
    <div className="h-full flex items-center justify-center">
      <div className="text-center text-gray-500">
        <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
        <p className="text-lg font-medium mb-2">No simulation loaded</p>
        <p className="text-sm">Select a demo simulation from the top-right menu to get started</p>
      </div>
    </div>
  )
}
