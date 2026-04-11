import { useSimulationStore } from '../../store/simulation-store'
import { useEditorStore } from '../../store/editor-store'
import { TimelinePanel } from './TimelinePanel'
import { EventPalette } from './EventPalette'
import { PropertyPanel } from './PropertyPanel'
import { SimulationMetadata } from './SimulationMetadata'

export function SimulationEditor() {
  const simulation = useSimulationStore((s) => s.simulation)
  const selectedEventId = useEditorStore((s) => s.selectedEventId)

  if (!simulation) {
    return (
      <div className="h-full flex items-center justify-center text-claude-text-tertiary text-sm bg-claude-bg">
        Load a simulation to start editing
      </div>
    )
  }

  return (
    <div className="h-full flex flex-col bg-claude-sidebar-bg">
      {/* Metadata bar */}
      <SimulationMetadata simulation={simulation} />

      {/* Main editor area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Event palette */}
        <EventPalette />

        {/* Timeline */}
        <div className="flex-1 overflow-hidden">
          <TimelinePanel events={simulation.events} selectedEventId={selectedEventId} />
        </div>

        {/* Property panel */}
        {selectedEventId && (
          <PropertyPanel simulation={simulation} selectedEventId={selectedEventId} />
        )}
      </div>
    </div>
  )
}
