import { ClaudeWindow } from './ClaudeWindow'
import { ChromeWindow } from './ChromeWindow'
import { WordWindow } from './WordWindow'
import { PdfWindow } from './PdfWindow'
import { PlaybackControls } from '../layout/PlaybackControls'
import { useSimulationStore } from '../../store/simulation-store'
import { useEditorStore } from '../../store/editor-store'

export function DesktopShell() {
  const simulation = useSimulationStore((s) => s.simulation)
  const isEditorVisible = useEditorStore((s) => s.isEditorVisible)

  return (
    <div className="h-full macos-desktop flex flex-col items-center justify-center p-6 pb-20 relative">
      {/* Claude Desktop Window */}
      <div className="w-full flex-1 max-w-[1200px] max-h-[820px] relative z-20 overflow-hidden rounded-xl">
        <ClaudeWindow />
      </div>

      {/* Simulated app windows (for artifacts) */}
      <ChromeWindow />
      <WordWindow />
      <PdfWindow />

      {/* Playback controls - below window, in the "desktop" area */}
      {simulation && !isEditorVisible && (
        <div className="mt-3 z-30">
          <PlaybackControls />
        </div>
      )}
    </div>
  )
}
