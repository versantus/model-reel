import { useMemo } from 'react'

interface StreamingTextProps {
  content: string
  progress: number // 0-1
  className?: string
}

export function StreamingText({ content, progress, className }: StreamingTextProps) {
  const visibleText = useMemo(() => {
    if (progress >= 1) return content
    const charCount = Math.floor(content.length * progress)
    return content.slice(0, charCount)
  }, [content, progress])

  return (
    <span className={className}>
      {visibleText}
      {progress < 1 && <span className="cursor-blink inline-block w-2 h-4 bg-terminal-text ml-0.5 align-middle" />}
    </span>
  )
}
