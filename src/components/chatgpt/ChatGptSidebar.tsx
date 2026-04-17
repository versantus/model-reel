import { PenSquare, Search, Sparkles, Grid3x3, BookOpen } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { SidebarConversation } from '../../types/simulation'

interface ChatGptSidebarProps {
  conversations: SidebarConversation[]
  conversationTitle?: string
}

export function ChatGptSidebar({ conversations, conversationTitle }: ChatGptSidebarProps) {
  const activeId = conversations.find((c) => c.isActive)?.id
  return (
    <div className="w-[260px] bg-gpt-sidebar border-r border-gpt-border-light flex flex-col shrink-0">
      {/* Top: new chat + search */}
      <div className="p-2 space-y-0.5">
        <SidebarRow icon={PenSquare} label="New chat" shortcut="⌘⇧O" />
        <SidebarRow icon={Search} label="Search chats" />
        <SidebarRow icon={BookOpen} label="Library" />
      </div>

      <div className="border-t border-gpt-border-light my-1" />

      <div className="px-2 space-y-0.5">
        <SidebarRow icon={Sparkles} label="Sora" />
        <SidebarRow icon={Grid3x3} label="GPTs" />
      </div>

      {/* Chats list */}
      <div className="flex-1 overflow-y-auto custom-scrollbar px-2 pt-3 pb-2">
        <div className="text-[12px] font-medium text-gpt-text-tertiary px-2 pb-1">Chats</div>
        {conversationTitle && !conversations.some((c) => c.title === conversationTitle) && (
          <ConversationRow title={conversationTitle} isActive />
        )}
        {conversations.map((c) => (
          <ConversationRow
            key={c.id}
            title={c.title}
            isActive={c.id === activeId}
          />
        ))}
      </div>

      {/* Bottom: upgrade */}
      <div className="border-t border-gpt-border-light p-2">
        <button className="w-full flex items-center gap-3 px-2 py-2 rounded-lg hover:bg-gpt-sidebar-hover text-left">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#9B72F5] to-[#5436DA] flex items-center justify-center shrink-0">
            <Sparkles className="w-3.5 h-3.5 text-white" strokeWidth={2.2} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-[13px] font-medium text-gpt-text">Upgrade plan</div>
            <div className="text-[11px] text-gpt-text-tertiary">More access to the best models</div>
          </div>
        </button>
      </div>
    </div>
  )
}

function SidebarRow({ icon: Icon, label, shortcut }: { icon: typeof PenSquare; label: string; shortcut?: string }) {
  return (
    <button className="w-full flex items-center gap-2.5 px-2 py-1.5 rounded-lg hover:bg-gpt-sidebar-hover text-left group">
      <Icon className="w-[18px] h-[18px] text-gpt-text shrink-0" strokeWidth={1.8} />
      <span className="text-[14px] text-gpt-text flex-1">{label}</span>
      {shortcut && (
        <span className="text-[11px] text-gpt-text-tertiary opacity-0 group-hover:opacity-100">{shortcut}</span>
      )}
    </button>
  )
}

function ConversationRow({ title, isActive }: { title: string; isActive?: boolean }) {
  return (
    <button
      className={cn(
        'w-full text-left px-2 py-1.5 rounded-lg truncate text-[14px]',
        isActive
          ? 'bg-gpt-sidebar-active text-gpt-text'
          : 'text-gpt-text hover:bg-gpt-sidebar-hover'
      )}
    >
      {title}
    </button>
  )
}
