import { useEditorStore } from '../../store/editor-store'
import { useSimulationStore } from '../../store/simulation-store'
import { WindowChrome } from './WindowChrome'
import { ChatTabView } from './ChatTabView'
import { CoworkTabView } from './CoworkTabView'
import { CodeTabView } from './CodeTabView'
import { SimulationEditor } from '../editor/SimulationEditor'

export function ClaudeWindow() {
  const activeView = useEditorStore((s) => s.activeView)
  const isEditorVisible = useEditorStore((s) => s.isEditorVisible)
  const simulation = useSimulationStore((s) => s.simulation)

  return (
    <div className="h-full flex flex-col bg-claude-bg rounded-xl overflow-hidden shadow-2xl border border-black/10">
      {/* Window chrome with traffic lights + tabs */}
      <WindowChrome />

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        {isEditorVisible && simulation ? (
          <SimulationEditor />
        ) : (
          <>
            {activeView === 'claude-chat' && <ChatTabView />}
            {activeView === 'claude-cowork' && <CoworkTabView />}
            {activeView === 'claude-code' && <CodeTabView />}
          </>
        )}
      </div>
    </div>
  )
}
