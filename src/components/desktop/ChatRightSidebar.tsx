import { useState } from 'react'
import { ChevronDown, ChevronRight, FileText, FolderOpen, CheckSquare } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { ArtifactEvent } from '../../types/simulation'

interface ChatRightSidebarProps {
  artifacts?: ArtifactEvent[]
}

export function ChatRightSidebar({ artifacts = [] }: ChatRightSidebarProps) {
  const [progressOpen, setProgressOpen] = useState(true)
  const [workingFolderOpen, setWorkingFolderOpen] = useState(true)
  const [contextOpen, setContextOpen] = useState(true)

  return (
    <div className="w-[240px] bg-claude-right-panel border-l border-claude-border-light overflow-y-auto custom-scrollbar">
      {/* Progress section */}
      <SidebarSection title="Progress" isOpen={progressOpen} onToggle={() => setProgressOpen(!progressOpen)} trailing="4 of 4">
        <div className="flex items-center gap-2 py-2">
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="w-5 h-5 rounded-full border-2 border-claude-border flex items-center justify-center">
                <div className="w-2 h-2 rounded-full bg-claude-accent" />
              </div>
            ))}
          </div>
        </div>
      </SidebarSection>

      {/* Working folder section */}
      <SidebarSection title="Working folder" isOpen={workingFolderOpen} onToggle={() => setWorkingFolderOpen(!workingFolderOpen)} trailing={
        <div className="flex items-center gap-1">
          <CheckSquare className="w-3.5 h-3.5 text-claude-icon" />
          <FolderOpen className="w-3.5 h-3.5 text-claude-accent" />
        </div>
      }>
        <div className="space-y-1">
          <FileEntry name="carousel-ai-expert.pdf" />
          <FileEntry name="carousel-ai-expert.html" />
          <div className="flex items-center gap-1.5 py-1 px-1 text-[12px] text-claude-text-secondary">
            <ChevronRight className="w-3 h-3" />
            <span>Scratchpad</span>
          </div>
        </div>
      </SidebarSection>

      {/* Context section */}
      <SidebarSection title="Context" isOpen={contextOpen} onToggle={() => setContextOpen(!contextOpen)}>
        <div className="space-y-2">
          <div className="text-[12px] text-claude-section-label font-medium">Skills</div>
          <div className="flex items-center gap-2 py-0.5 px-1">
            <div className="w-4 h-4 rounded bg-claude-bg flex items-center justify-center">
              <svg className="w-2.5 h-2.5 text-claude-text-tertiary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" /></svg>
            </div>
            <span className="text-[12px] text-claude-text-secondary">linked-in-carousel</span>
          </div>
        </div>
      </SidebarSection>

      {artifacts.length > 0 && (
        <SidebarSection title="Artifacts" isOpen={true} onToggle={() => {}}>
          <div className="space-y-1">
            {artifacts.map((a) => (
              <div key={a.id} className="flex items-center gap-2 py-1 px-1">
                <FileText className="w-3.5 h-3.5 text-claude-icon" />
                <span className="text-[12px] text-claude-text-secondary truncate">{a.title}</span>
              </div>
            ))}
          </div>
        </SidebarSection>
      )}
    </div>
  )
}

function SidebarSection({ title, children, isOpen, onToggle, trailing }: {
  title: string
  children: React.ReactNode
  isOpen: boolean
  onToggle: () => void
  trailing?: React.ReactNode
}) {
  return (
    <div className="border-b border-claude-border-light">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-claude-sidebar-hover transition-colors"
      >
        <span className="text-[13px] font-semibold text-claude-text">{title}</span>
        <div className="flex items-center gap-2">
          {trailing && <span className="text-[12px] text-claude-text-tertiary">{trailing}</span>}
          <ChevronDown className={cn('w-4 h-4 text-claude-icon transition-transform', !isOpen && '-rotate-90')} />
        </div>
      </button>
      {isOpen && (
        <div className="px-4 pb-3">
          {children}
        </div>
      )}
    </div>
  )
}

function FileEntry({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 py-1 px-1 rounded hover:bg-claude-sidebar-hover cursor-pointer">
      <FileText className="w-3.5 h-3.5 text-claude-icon" />
      <span className="text-[12px] text-claude-text-secondary truncate">{name}</span>
    </div>
  )
}
