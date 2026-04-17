interface ChatGptThinkingProps {
  label?: string
}

export function ChatGptThinking({ label }: ChatGptThinkingProps) {
  return (
    <div className="flex items-center gap-2 py-1">
      <div className="w-3 h-3 rounded-full bg-gpt-text animate-pulse" />
      <span className="text-[14px] text-gpt-text-secondary italic">{label || 'Thinking...'}</span>
    </div>
  )
}
