import { ChevronDown, Share, Ellipsis } from 'lucide-react'

interface ChatGptTopBarProps {
  modelName: string
}

export function ChatGptTopBar({ modelName }: ChatGptTopBarProps) {
  return (
    <div className="flex items-center justify-between h-14 px-4 border-b border-gpt-border-light shrink-0">
      <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg hover:bg-gpt-sidebar-hover">
        <span className="text-[18px] font-semibold text-gpt-text">ChatGPT</span>
        <span className="text-[13px] text-gpt-text-tertiary">{modelName}</span>
        <ChevronDown className="w-4 h-4 text-gpt-text-tertiary" strokeWidth={2} />
      </button>

      <div className="flex items-center gap-1">
        <button className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-gpt-text rounded-lg hover:bg-gpt-sidebar-hover">
          <Share className="w-4 h-4" strokeWidth={1.8} />
          Share
        </button>
        <button className="w-9 h-9 flex items-center justify-center rounded-lg hover:bg-gpt-sidebar-hover text-gpt-text">
          <Ellipsis className="w-5 h-5" strokeWidth={1.8} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#F59E0B] to-[#D97706] flex items-center justify-center text-white text-[13px] font-semibold ml-1">
          N
        </div>
      </div>
    </div>
  )
}
