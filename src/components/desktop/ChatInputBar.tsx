import { Plus, ArrowUp, ChevronDown } from 'lucide-react'

interface ChatInputBarProps {
  modelName: string
  placeholder?: string
}

export function ChatInputBar({ modelName, placeholder }: ChatInputBarProps) {
  return (
    <div className="bg-claude-input-bg border border-claude-input-border rounded-2xl shadow-sm">
      {/* Input area */}
      <div className="px-4 py-3 min-h-[44px] text-[14px] text-claude-text-tertiary">
        {placeholder || "I don't like that style at all. Use a much simpler style and"}
        <span className="cursor-blink inline-block w-[2px] h-[16px] bg-claude-text ml-0.5 align-middle rounded-full" />
      </div>

      {/* Bottom bar with actions */}
      <div className="flex items-center justify-between px-3 pb-3">
        <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-claude-sidebar-hover text-claude-text-secondary">
          <Plus className="w-5 h-5" strokeWidth={1.8} />
        </button>

        <div className="flex items-center gap-2">
          {/* Model selector */}
          <button className="flex items-center gap-1 px-2 py-1 text-[13px] text-claude-text-secondary hover:bg-claude-sidebar-hover rounded-lg">
            {modelName}
            <ChevronDown className="w-3 h-3" />
          </button>

          {/* Send button */}
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-claude-send-bg hover:bg-claude-send-hover transition-colors">
            <ArrowUp className="w-4 h-4 text-white" strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  )
}
