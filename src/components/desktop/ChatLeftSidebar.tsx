import { cn } from '../../utils/cn'
import {
  Plus, Search, Clock, MessageSquare, FolderClosed,
  Lightbulb, Bookmark, Download
} from 'lucide-react'

const topIcons = [
  { icon: Plus, label: 'New' },
  { icon: Search, label: 'Search' },
  { icon: Clock, label: 'History' },
  { icon: MessageSquare, label: 'Chats' },
  { icon: FolderClosed, label: 'Projects' },
  { icon: Lightbulb, label: 'Ideas' },
  { icon: Bookmark, label: 'Saved' },
]

export function ChatLeftSidebar() {
  return (
    <div className="w-12 bg-claude-sidebar-bg border-r border-claude-border-light flex flex-col items-center py-2">
      {/* Top icons */}
      <div className="flex flex-col items-center gap-0.5">
        {topIcons.map(({ icon: Icon, label }, i) => (
          <button
            key={label}
            className={cn(
              'w-9 h-9 flex items-center justify-center rounded-lg transition-colors',
              i === 0 ? 'text-claude-text-secondary hover:bg-claude-sidebar-hover' : 'text-claude-icon hover:text-claude-icon-hover hover:bg-claude-sidebar-hover'
            )}
            title={label}
          >
            <Icon className="w-[18px] h-[18px]" strokeWidth={1.8} />
          </button>
        ))}
      </div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Bottom icons */}
      <div className="flex flex-col items-center gap-0.5">
        <button className="w-9 h-9 flex items-center justify-center rounded-lg text-claude-icon hover:text-claude-icon-hover hover:bg-claude-sidebar-hover" title="Downloads">
          <Download className="w-[18px] h-[18px]" strokeWidth={1.8} />
        </button>
        {/* Claude verified / shield icon */}
        <button className="w-9 h-9 flex items-center justify-center rounded-lg" title="Account">
          <div className="w-6 h-6 rounded-full bg-[#C8651B]/10 border border-[#C8651B]/30 flex items-center justify-center">
            <svg className="w-3.5 h-3.5 text-[#C8651B]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z" />
            </svg>
          </div>
        </button>
      </div>
    </div>
  )
}
