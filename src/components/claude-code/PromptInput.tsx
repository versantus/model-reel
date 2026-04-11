export function PromptInput() {
  return (
    <div className="flex items-center gap-2 px-4 py-2 bg-terminal-surface border-t border-terminal-border">
      <span className="text-terminal-green font-bold text-sm">&gt;</span>
      <div className="flex-1 text-sm text-terminal-dim">
        <span className="cursor-blink inline-block w-2 h-4 bg-terminal-dim/50 align-middle" />
      </div>
    </div>
  )
}
