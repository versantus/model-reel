import { Loader2 } from 'lucide-react'
import { cn } from '../../utils/cn'

interface ThinkingIndicatorProps {
  label?: string
  variant?: 'terminal' | 'chat' | 'cowork'
  className?: string
}

export function ThinkingIndicator({ label, variant = 'terminal', className }: ThinkingIndicatorProps) {
  if (variant === 'chat') {
    return (
      <div className={cn('flex items-center gap-2 py-2', className)}>
        <div className="flex gap-1">
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
          <span className="typing-dot w-2 h-2 rounded-full bg-gray-400" />
        </div>
        {label && <span className="text-sm text-gray-400">{label}</span>}
      </div>
    )
  }

  return (
    <div className={cn('flex items-center gap-2 py-1', className)}>
      <Loader2 className={cn(
        'w-4 h-4 animate-spin-slow',
        variant === 'terminal' ? 'text-terminal-cyan' : 'text-claude-purple'
      )} />
      <span className={cn(
        'text-sm',
        variant === 'terminal' ? 'text-terminal-dim' : 'text-gray-500'
      )}>
        {label || 'Thinking...'}
      </span>
    </div>
  )
}
