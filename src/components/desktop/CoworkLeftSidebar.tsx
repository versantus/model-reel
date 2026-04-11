import { Plus } from 'lucide-react'

interface CoworkLeftSidebarProps {
  taskTitle: string
}

export function CoworkLeftSidebar({ taskTitle }: CoworkLeftSidebarProps) {
  return (
    <div className="w-[220px] bg-claude-sidebar-bg border-r border-claude-border-light flex flex-col">
      {/* New task button */}
      <div className="px-3 py-3">
        <button className="flex items-center gap-2 px-3 py-2 text-[13px] text-claude-text-secondary hover:bg-claude-sidebar-hover rounded-lg w-full transition-colors">
          <Plus className="w-4 h-4" strokeWidth={1.8} />
          New task
        </button>
      </div>

      {/* Task list */}
      <div className="flex-1 px-3 space-y-0.5">
        {taskTitle && (
          <div className="px-3 py-2 text-[12px] text-claude-text bg-claude-sidebar-active rounded-lg truncate">
            {taskTitle}
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-claude-border-light">
        <p className="text-[11px] text-claude-text-tertiary leading-tight">
          These tasks run locally and aren't synced across devices
        </p>
      </div>

      {/* User avatar */}
      <div className="px-3 pb-3 flex items-center gap-2">
        <div className="w-8 h-8 rounded-full bg-claude-border flex items-center justify-center text-[11px] font-semibold text-claude-text-secondary">
          U
        </div>
        <div>
          <p className="text-[12px] font-medium text-claude-text">User</p>
          <p className="text-[11px] text-claude-text-tertiary">Max plan</p>
        </div>
      </div>
    </div>
  )
}
