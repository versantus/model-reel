import { StreamingText } from '../shared/StreamingText'

interface UserPromptProps {
  content: string
  progress: number
}

export function UserPrompt({ content, progress }: UserPromptProps) {
  return (
    <div className="flex gap-2 py-1">
      <span className="text-terminal-green font-bold select-none">&gt;</span>
      <div className="text-white">
        <StreamingText content={content} progress={progress} />
      </div>
    </div>
  )
}
