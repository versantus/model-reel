import { useMemo } from 'react'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2 } from 'lucide-react'

interface ChatGptMessageProps {
  role: 'user' | 'assistant'
  content: string
  progress: number
  isComplete?: boolean
}

export function ChatGptMessage({ role, content, progress, isComplete }: ChatGptMessageProps) {
  const visibleContent = useMemo(() => {
    if (role === 'user' || isComplete || progress >= 1) return content
    const charCount = Math.floor(content.length * progress)
    return content.slice(0, charCount)
  }, [content, progress, isComplete, role])

  if (role === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-gpt-user-bubble rounded-3xl px-5 py-2.5 text-[15px] text-gpt-text leading-relaxed max-w-[85%] whitespace-pre-wrap">
          {visibleContent}
        </div>
      </div>
    )
  }

  return (
    <div className="group">
      <div className="text-[15px] text-gpt-text leading-[1.75]">
        <MarkdownRenderer content={visibleContent} variant="chat" />
        {!isComplete && progress < 1 && (
          <span className="cursor-blink inline-block w-[3px] h-[18px] bg-gpt-text ml-0.5 align-middle rounded-[1px]" />
        )}
      </div>
      {isComplete && (
        <div className="flex items-center gap-0.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ActionButton icon={Copy} label="Copy" />
          <ActionButton icon={ThumbsUp} label="Good response" />
          <ActionButton icon={ThumbsDown} label="Bad response" />
          <ActionButton icon={Volume2} label="Read aloud" />
          <ActionButton icon={RotateCcw} label="Regenerate" />
        </div>
      )}
    </div>
  )
}

function ActionButton({ icon: Icon, label }: { icon: typeof Copy; label: string }) {
  return (
    <button
      className="p-1.5 rounded-md hover:bg-gpt-sidebar-hover text-gpt-icon hover:text-gpt-icon-hover"
      title={label}
    >
      <Icon className="w-4 h-4" strokeWidth={1.8} />
    </button>
  )
}
