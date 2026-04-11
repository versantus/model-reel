import { Plus, Search, FolderOpen } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { SidebarConversation, SidebarProject } from '../../types/simulation'

interface ChatSidebarProps {
  conversations: SidebarConversation[]
  projects: SidebarProject[]
}

export function ChatSidebar({ conversations, projects }: ChatSidebarProps) {
  return (
    <div className="w-64 bg-chat-sidebar border-r border-gray-200 flex flex-col h-full">
      {/* Header */}
      <div className="p-3 border-b border-gray-200">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-claude-chat-claude-avatar rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">C</span>
            </div>
            <span className="text-sm font-semibold text-gray-800">Claude</span>
          </div>
        </div>
        <button className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Plus className="w-4 h-4" />
          New chat
        </button>
      </div>

      {/* Search */}
      <div className="px-3 py-2">
        <div className="flex items-center gap-2 px-2.5 py-1.5 bg-white border border-gray-200 rounded-lg text-sm text-gray-400">
          <Search className="w-3.5 h-3.5" />
          <span>Search</span>
        </div>
      </div>

      {/* Projects */}
      {projects.length > 0 && (
        <div className="px-3 py-2">
          <div className="text-xs font-medium text-gray-500 mb-1.5 px-1">Projects</div>
          {projects.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-2 px-2 py-1.5 text-sm text-gray-700 hover:bg-gray-200 rounded-md cursor-pointer"
            >
              <FolderOpen className="w-3.5 h-3.5 text-gray-400" />
              <span className="truncate">{p.name}</span>
              <span className="ml-auto text-xs text-gray-400">{p.conversationCount}</span>
            </div>
          ))}
        </div>
      )}

      {/* Conversations */}
      <div className="flex-1 overflow-y-auto px-3 py-2">
        <div className="text-xs font-medium text-gray-500 mb-1.5 px-1">Today</div>
        {conversations.map((c) => (
          <div
            key={c.id}
            className={cn(
              'px-2 py-1.5 text-sm rounded-md cursor-pointer mb-0.5 truncate',
              c.isActive
                ? 'bg-gray-200 text-gray-900 font-medium'
                : 'text-gray-600 hover:bg-gray-200'
            )}
          >
            {c.title}
          </div>
        ))}
      </div>
    </div>
  )
}
