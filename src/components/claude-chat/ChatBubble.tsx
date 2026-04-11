import { useMemo } from 'react'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'
import { cn } from '../../utils/cn'

interface ChatBubbleProps {
  role: 'user' | 'assistant'
  content: string
  progress: number
  isComplete?: boolean
}

export function ChatBubble({ role, content, progress, isComplete }: ChatBubbleProps) {
  const visibleContent = useMemo(() => {
    if (role === 'user' || isComplete || progress >= 1) return content
    const charCount = Math.floor(content.length * progress)
    return content.slice(0, charCount)
  }, [content, progress, isComplete, role])

  const isUser = role === 'user'

  return (
    <div className={cn('flex gap-3', isUser && 'justify-end')}>
      {!isUser && (
        <div className="w-8 h-8 bg-claude-chat-claude-avatar rounded-full flex items-center justify-center shrink-0 mt-0.5">
          <span className="text-white text-sm font-bold">C</span>
        </div>
      )}
      <div
        className={cn(
          'max-w-[80%] rounded-2xl px-4 py-3 text-sm',
          isUser
            ? 'bg-chat-user-bubble text-gray-800'
            : 'text-gray-800'
        )}
      >
        {isUser ? (
          <p>{visibleContent}</p>
        ) : (
          <>
            <MarkdownRenderer content={visibleContent} variant="chat" />
            {!isComplete && progress < 1 && (
              <span className="cursor-blink inline-block w-1.5 h-4 bg-gray-400 ml-0.5 align-middle rounded-sm" />
            )}
          </>
        )}
      </div>
    </div>
  )
}
