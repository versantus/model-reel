import { useSimulationStore } from '../../store/simulation-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { CoworkHeader } from './CoworkHeader'
import { TaskProgress } from './TaskProgress'
import { NotificationBanner } from './NotificationBanner'
import { ThinkingIndicator } from '../shared/ThinkingIndicator'
import type { CoworkProgressEvent, CoworkNotificationEvent } from '../../types/simulation'

export function CoworkView() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const simulation = useSimulationStore((s) => s.simulation)
  const coworkConfig = simulation?.metadata.coworkConfig
  const scrollRef = useAutoScroll([renderedEvents.length])

  // Collect progress steps
  const progressSteps: CoworkProgressEvent[] = []
  let notification: CoworkNotificationEvent | null = null
  let isThinking = false
  let taskMessage = ''

  for (const re of renderedEvents) {
    const { event, isComplete } = re
    if (event.type === 'cowork-progress') {
      const existing = progressSteps.findIndex((s) => s.stepIndex === event.stepIndex)
      if (existing >= 0) {
        progressSteps[existing] = event
      } else {
        progressSteps.push(event)
      }
    }
    if (event.type === 'cowork-notification') {
      notification = event
    }
    if (event.type === 'thinking' && !isComplete) {
      isThinking = true
    }
    if (event.type === 'user-message') {
      taskMessage = event.content
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* Desktop chrome */}
      <div className="flex items-center px-4 py-2 bg-gray-200 border-b border-gray-300">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-400" />
          <div className="w-3 h-3 rounded-full bg-yellow-400" />
          <div className="w-3 h-3 rounded-full bg-green-400" />
        </div>
        <span className="ml-4 text-xs text-gray-500 font-medium">Claude Desktop</span>
      </div>

      {/* Header tabs */}
      <CoworkHeader />

      {/* Notification */}
      {notification && <NotificationBanner notification={notification} />}

      {/* Content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-6 py-8">
          {/* Greeting */}
          <div className="text-center mb-8">
            <div className="w-12 h-12 bg-claude-chat-claude-avatar rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-white text-xl font-bold">C</span>
            </div>
            <h2 className="text-xl font-semibold text-gray-800 mb-1">
              {taskMessage || 'What would you like to work on?'}
            </h2>
            {!taskMessage && coworkConfig?.suggestions && (
              <div className="flex flex-wrap gap-2 justify-center mt-4">
                {coworkConfig.suggestions.map((s, i) => (
                  <span
                    key={i}
                    className="px-3 py-1.5 text-sm bg-white border border-gray-200 rounded-full text-gray-600 hover:bg-gray-50 cursor-pointer"
                  >
                    {s}
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Folder info */}
          {coworkConfig?.folderPath && taskMessage && (
            <div className="mb-6 flex items-center gap-2 text-sm text-gray-500 bg-white border border-gray-200 rounded-lg px-4 py-2">
              <span className="font-medium text-gray-700">Working in:</span>
              <code className="text-xs bg-gray-100 px-2 py-0.5 rounded">{coworkConfig.folderPath}</code>
            </div>
          )}

          {/* Thinking */}
          {isThinking && (
            <div className="mb-4">
              <ThinkingIndicator variant="cowork" label="Planning approach..." />
            </div>
          )}

          {/* Progress */}
          {progressSteps.length > 0 && (
            <TaskProgress steps={progressSteps} />
          )}
        </div>
      </div>

      {/* Input area */}
      <div className="px-6 pb-4 pt-2 border-t border-gray-200">
        <div className="max-w-2xl mx-auto flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-3">
          <div className="flex-1 text-sm text-gray-400">
            Describe what you'd like to work on...
          </div>
        </div>
      </div>
    </div>
  )
}
