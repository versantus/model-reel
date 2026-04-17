import { Plus, Mic, AudioLines, ArrowUp, SlidersHorizontal } from 'lucide-react'

export function ChatGptInputBar() {
  return (
    <div className="bg-gpt-input-bg border border-gpt-input-border rounded-[28px] shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
      <div className="px-5 pt-3.5 min-h-[48px] text-[15px] text-gpt-text-tertiary">
        Ask anything
      </div>

      <div className="flex items-center justify-between px-2 pb-2">
        <div className="flex items-center gap-0.5">
          <IconButton icon={Plus} label="Attach" />
          <IconButton icon={SlidersHorizontal} label="Tools" />
        </div>

        <div className="flex items-center gap-0.5">
          <IconButton icon={Mic} label="Dictate" />
          <button
            className="w-9 h-9 flex items-center justify-center rounded-full bg-gpt-send-bg hover:bg-gpt-send-hover transition-colors ml-1"
            title="Voice mode"
          >
            <AudioLines className="w-5 h-5 text-white" strokeWidth={2} />
          </button>
        </div>
      </div>
    </div>
  )
}

function IconButton({ icon: Icon, label }: { icon: typeof Plus; label: string }) {
  return (
    <button
      className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gpt-sidebar-hover text-gpt-text-secondary"
      title={label}
    >
      <Icon className="w-5 h-5" strokeWidth={1.8} />
    </button>
  )
}

// Alternate send-ready variant (when there's text) — kept for reference
export function ChatGptSendButton() {
  return (
    <button
      className="w-9 h-9 flex items-center justify-center rounded-full bg-gpt-send-bg hover:bg-gpt-send-hover transition-colors"
      title="Send"
    >
      <ArrowUp className="w-5 h-5 text-white" strokeWidth={2.5} />
    </button>
  )
}
