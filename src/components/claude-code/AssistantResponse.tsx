import { useMemo } from 'react'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'

interface AssistantResponseProps {
  content: string
  progress: number
  isComplete: boolean
}

export function AssistantResponse({ content, progress, isComplete }: AssistantResponseProps) {
  const visibleContent = useMemo(() => {
    if (isComplete || progress >= 1) return content
    const charCount = Math.floor(content.length * progress)
    return content.slice(0, charCount)
  }, [content, progress, isComplete])

  return (
    <div className="py-1 text-terminal-text">
      <MarkdownRenderer content={visibleContent} variant="terminal" />
      {!isComplete && progress < 1 && (
        <span className="cursor-blink inline-block w-2 h-4 bg-terminal-text ml-0.5 align-middle" />
      )}
    </div>
  )
}
