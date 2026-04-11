import { Play, Pause, Square, FastForward, Edit3 } from 'lucide-react'
import { usePlaybackStore, type PlaybackSpeed } from '../../store/playback-store'
import { useSimulationStore } from '../../store/simulation-store'
import { useEditorStore } from '../../store/editor-store'
import { usePlayback } from '../../hooks/usePlayback'
import { cn } from '../../utils/cn'

const speeds: PlaybackSpeed[] = [0.5, 1, 2, 4]

export function PlaybackControls() {
  const { isPlaying, currentEventIndex, speed, setSpeed } = usePlaybackStore()
  const simulation = useSimulationStore((s) => s.simulation)
  const setEditorVisible = useEditorStore((s) => s.setEditorVisible)
  const { play, pause, stop } = usePlayback()

  const totalEvents = simulation?.events.length ?? 0
  const progress = totalEvents > 0 ? ((currentEventIndex + 1) / totalEvents) * 100 : 0

  return (
    <div className="flex items-center gap-3 px-4 py-2.5 bg-white/90 backdrop-blur-xl border border-claude-border rounded-2xl shadow-lg text-[12px]">
      <div className="flex items-center gap-1">
        {isPlaying ? (
          <button onClick={pause} className="p-1.5 hover:bg-claude-sidebar-hover rounded-lg" title="Pause (Space)">
            <Pause className="w-4 h-4 text-claude-text" />
          </button>
        ) : (
          <button onClick={play} className="p-1.5 hover:bg-claude-sidebar-hover rounded-lg" title="Play (Space)">
            <Play className="w-4 h-4 text-claude-text" />
          </button>
        )}
        <button onClick={stop} className="p-1.5 hover:bg-claude-sidebar-hover rounded-lg" title="Stop (Esc)">
          <Square className="w-3.5 h-3.5 text-claude-text-secondary" />
        </button>
      </div>

      <div className="w-32 h-1.5 bg-claude-border rounded-full overflow-hidden">
        <div className="h-full bg-claude-accent rounded-full transition-all duration-200" style={{ width: `${progress}%` }} />
      </div>

      <span className="text-claude-text-tertiary tabular-nums min-w-[4ch] text-right">
        {currentEventIndex + 1}/{totalEvents}
      </span>

      <div className="flex items-center gap-0.5 pl-1 border-l border-claude-border-light ml-1">
        <FastForward className="w-3 h-3 text-claude-text-tertiary mr-1" />
        {speeds.map((s) => (
          <button
            key={s}
            onClick={() => setSpeed(s)}
            className={cn(
              'px-1.5 py-0.5 rounded text-[11px] transition-colors',
              speed === s ? 'bg-claude-accent text-white' : 'text-claude-text-tertiary hover:bg-claude-sidebar-hover'
            )}
          >
            {s}x
          </button>
        ))}
      </div>

      <div className="pl-1 border-l border-claude-border-light ml-1">
        <button
          onClick={() => setEditorVisible(true)}
          className="flex items-center gap-1 px-2 py-1 rounded-lg text-[11px] font-medium text-claude-text-secondary hover:bg-claude-sidebar-hover"
          title="Open editor"
        >
          <Edit3 className="w-3 h-3" />
          Edit
        </button>
      </div>
    </div>
  )
}
