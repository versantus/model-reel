import { useMemo } from 'react'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'
import { ThumbsUp, ThumbsDown, Copy } from 'lucide-react'

interface ChatMessageProps {
  role: 'user' | 'assistant'
  content: string
  progress: number
  isComplete?: boolean
}

export function ChatMessage({ role, content, progress, isComplete }: ChatMessageProps) {
  const visibleContent = useMemo(() => {
    if (role === 'user' || isComplete || progress >= 1) return content
    const charCount = Math.floor(content.length * progress)
    return content.slice(0, charCount)
  }, [content, progress, isComplete, role])

  if (role === 'user') {
    return (
      <div className="bg-claude-user-bubble rounded-2xl px-5 py-4 text-[14px] text-claude-text leading-relaxed">
        {visibleContent}
      </div>
    )
  }

  return (
    <div>
      <div className="text-[14px] text-claude-text leading-relaxed">
        <MarkdownRenderer content={visibleContent} variant="chat" />
        {!isComplete && progress < 1 && (
          <span className="cursor-blink inline-block w-[2px] h-[16px] bg-claude-text ml-0.5 align-middle rounded-full" />
        )}
      </div>
      {/* Action buttons - show only when complete */}
      {isComplete && (
        <div className="flex items-center gap-1 mt-2">
          <button className="p-1.5 rounded-md hover:bg-claude-sidebar-hover text-claude-icon">
            <Copy className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-claude-sidebar-hover text-claude-icon">
            <ThumbsUp className="w-3.5 h-3.5" />
          </button>
          <button className="p-1.5 rounded-md hover:bg-claude-sidebar-hover text-claude-icon">
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
