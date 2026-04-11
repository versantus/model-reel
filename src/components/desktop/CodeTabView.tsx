import { useState } from 'react'
import { useSimulationStore } from '../../store/simulation-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { ThinkingIndicator } from '../shared/ThinkingIndicator'
import { StatusBar } from '../claude-code/StatusBar'
import { PermissionPrompt } from '../claude-code/PermissionPrompt'
import { cn } from '../../utils/cn'
import type { ToolCallEvent } from '../../types/simulation'

export function CodeTabView() {
  const simulation = useSimulationStore((s) => s.simulation)

  if (!simulation || simulation.productType !== 'claude-code') {
    return <CodeLanding />
  }

  return <CodeSessionView />
}

function CodeLanding() {
  return (
    <div className="h-full flex flex-col">
      {/* Preview label */}
      <div className="px-4 py-2">
        <span className="text-[12px] text-claude-text-tertiary">Preview</span>
      </div>

      {/* Dotted grid background with centered input */}
      <div className="flex-1 dotted-grid flex items-center justify-center">
        <div className="w-full max-w-[540px] px-6">
          {/* Pixel art mascot */}
          <div className="flex justify-start mb-2 ml-1">
            <PixelCowMascot />
          </div>

          {/* Input card */}
          <div className="bg-claude-input-bg border border-claude-input-border rounded-2xl shadow-sm">
            <div className="px-4 py-3 min-h-[44px] text-[14px] text-claude-text">
              Find a small todo in the codebase and do it
              <span className="cursor-blink inline-block w-[2px] h-[16px] bg-claude-text ml-0.5 align-middle rounded-full" />
            </div>
            <div className="flex items-center justify-between px-3 pb-3">
              <div className="flex items-center gap-2">
                <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-claude-sidebar-hover text-claude-text-secondary">
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                </button>
                <button className="flex items-center gap-1 px-2 py-1 text-[13px] text-claude-text-secondary hover:bg-claude-sidebar-hover rounded-lg border border-claude-border">
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  Ask
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 px-2 py-1 text-[13px] text-claude-text-secondary hover:bg-claude-sidebar-hover rounded-lg">
                  Opus 4.6
                  <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
                </button>
                <button className="w-8 h-8 flex items-center justify-center rounded-full bg-claude-send-bg hover:bg-claude-send-hover transition-colors">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 10.5L12 3m0 0l7.5 7.5M12 3v18" /></svg>
                </button>
              </div>
            </div>
          </div>

          {/* Below input: Select folder + Local */}
          <div className="flex items-center justify-between mt-3 px-1">
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-claude-text-secondary border border-claude-border rounded-lg hover:bg-claude-sidebar-hover">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M3.75 9.776c.112-.017.227-.026.344-.026h15.812c.117 0 .232.009.344.026m-16.5 0a2.25 2.25 0 00-1.883 2.542l.857 6a2.25 2.25 0 002.227 1.932H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-1.883-2.542m-16.5 0V6A2.25 2.25 0 016 3.75h3.879a1.5 1.5 0 011.06.44l2.122 2.12a1.5 1.5 0 001.06.44H18A2.25 2.25 0 0120.25 9v.776" /></svg>
              Select folder
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] text-claude-text-secondary border border-claude-border rounded-lg hover:bg-claude-sidebar-hover">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" /></svg>
              Local
              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" /></svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function CodeSessionView() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const scrollRef = useAutoScroll([renderedEvents.length, renderedEvents[renderedEvents.length - 1]?.progress])

  return (
    <div className="h-full flex flex-col bg-terminal-bg font-mono text-sm">
      {/* Terminal content */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto terminal-scrollbar px-4 py-3">
        <div className="space-y-2">
          {renderedEvents.map((re) => {
            const { event, progress, isComplete } = re
            switch (event.type) {
              case 'user-message':
                return (
                  <div key={event.id} className="flex gap-2 py-1">
                    <span className="text-terminal-green font-bold select-none">&gt;</span>
                    <span className="text-white">
                      {isComplete || progress >= 1
                        ? event.content
                        : event.content.slice(0, Math.floor(event.content.length * progress))}
                    </span>
                  </div>
                )
              case 'assistant-message': {
                const visible = isComplete || progress >= 1
                  ? event.content
                  : event.content.slice(0, Math.floor(event.content.length * progress))
                return (
                  <div key={event.id} className="py-1 text-terminal-text">
                    <div className="whitespace-pre-wrap">{visible}</div>
                    {!isComplete && progress < 1 && (
                      <span className="cursor-blink inline-block w-2 h-4 bg-terminal-text ml-0.5 align-middle" />
                    )}
                  </div>
                )
              }
              case 'tool-call':
                return (
                  <TerminalToolCall key={event.id} event={event} />
                )
              case 'tool-result':
                return event.output ? (
                  <div key={event.id} className="pl-5 text-xs text-terminal-dim">
                    <pre className="overflow-x-auto">{event.output}</pre>
                  </div>
                ) : null
              case 'thinking':
                return !isComplete ? (
                  <ThinkingIndicator key={event.id} variant="terminal" label={event.label} />
                ) : null
              case 'permission-prompt':
                return <PermissionPrompt key={event.id} event={event} />
              default:
                return null
            }
          })}
        </div>
      </div>

      {/* Input */}
      <div className="flex items-center gap-2 px-4 py-2 bg-terminal-surface border-t border-terminal-border">
        <span className="text-terminal-green font-bold text-sm">&gt;</span>
        <span className="cursor-blink inline-block w-2 h-4 bg-terminal-dim/50 align-middle" />
      </div>

      {/* Status bar */}
      <StatusBar />
    </div>
  )
}

function TerminalToolCall({ event }: { event: ToolCallEvent }) {
  const [expanded, setExpanded] = useState(event.expandedByDefault)
  const colors: Record<string, string> = {
    Read: 'border-terminal-blue', Edit: 'border-terminal-green', Bash: 'border-terminal-yellow',
    Grep: 'border-terminal-cyan', Glob: 'border-terminal-cyan', Write: 'border-terminal-green',
  }

  return (
    <div className={cn('border-l-2 pl-3 py-1 my-1', colors[event.toolName] || 'border-terminal-dim')}>
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 text-xs hover:text-white w-full text-left">
        <span className="text-terminal-dim">{expanded ? '▾' : '▸'}</span>
        <span className="font-semibold text-terminal-text">{event.toolName}</span>
        {event.description && <span className="text-terminal-dim">{event.description}</span>}
      </button>
      {expanded && (
        <pre className="mt-1 ml-4 text-xs text-terminal-dim bg-terminal-surface rounded p-2 overflow-x-auto">
          {JSON.stringify(event.toolInput, null, 2)}
        </pre>
      )}
    </div>
  )
}

function PixelCowMascot() {
  // SVG pixel art cow matching the Claude Code mascot from screenshot
  return (
    <svg width="56" height="48" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg" className="[image-rendering:pixelated]">
      {/* Ears */}
      <rect x="1" y="1" width="2" height="2" fill="#8B6F5E" />
      <rect x="7" y="1" width="2" height="2" fill="#8B6F5E" />
      {/* Head top */}
      <rect x="2" y="0" width="6" height="1" fill="#C4956A" />
      <rect x="1" y="1" width="8" height="1" fill="#C4956A" />
      {/* Face */}
      <rect x="1" y="2" width="8" height="4" fill="#D4A574" />
      {/* Eyes */}
      <rect x="3" y="3" width="1" height="1" fill="#2D2B28" />
      <rect x="6" y="3" width="1" height="1" fill="#2D2B28" />
      {/* Nose area */}
      <rect x="2" y="5" width="6" height="2" fill="#E8C4A0" />
      {/* Nostrils */}
      <rect x="3" y="5" width="1" height="1" fill="#C4956A" />
      <rect x="6" y="5" width="1" height="1" fill="#C4956A" />
      {/* Body */}
      <rect x="0" y="7" width="10" height="3" fill="#D4A574" />
      {/* Legs */}
      <rect x="1" y="10" width="2" height="2" fill="#C4956A" />
      <rect x="7" y="10" width="2" height="2" fill="#C4956A" />
    </svg>
  )
}

