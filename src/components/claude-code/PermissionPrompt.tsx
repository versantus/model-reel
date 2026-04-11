import { Shield } from 'lucide-react'
import type { PermissionPromptEvent } from '../../types/simulation'

interface PermissionPromptProps {
  event: PermissionPromptEvent
}

export function PermissionPrompt({ event }: PermissionPromptProps) {
  return (
    <div className="border border-terminal-yellow/30 bg-terminal-yellow/5 rounded-lg p-3 my-2">
      <div className="flex items-center gap-2 mb-2">
        <Shield className="w-4 h-4 text-terminal-yellow" />
        <span className="text-xs font-semibold text-terminal-yellow">Permission Required</span>
      </div>
      <p className="text-xs text-terminal-text mb-1">{event.description}</p>
      {event.command && (
        <pre className="text-xs text-terminal-dim bg-terminal-surface rounded px-2 py-1 my-2 overflow-x-auto">
          $ {event.command}
        </pre>
      )}
      <div className="flex gap-2 mt-2">
        <button className="px-3 py-1 text-xs bg-terminal-green/20 text-terminal-green border border-terminal-green/30 rounded hover:bg-terminal-green/30 transition-colors">
          Allow
        </button>
        <button className="px-3 py-1 text-xs bg-terminal-red/20 text-terminal-red border border-terminal-red/30 rounded hover:bg-terminal-red/30 transition-colors">
          Deny
        </button>
        <button className="px-3 py-1 text-xs bg-terminal-blue/20 text-terminal-blue border border-terminal-blue/30 rounded hover:bg-terminal-blue/30 transition-colors">
          Always Allow
        </button>
      </div>
    </div>
  )
}
