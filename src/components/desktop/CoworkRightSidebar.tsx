import { useState } from 'react'
import { ChevronDown, FileText, Globe, FolderOpen, CheckSquare, Circle } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { CoworkProgressEvent, ArtifactEvent } from '../../types/simulation'

interface CoworkRightSidebarProps {
  steps: CoworkProgressEvent[]
  artifacts: ArtifactEvent[]
  folderPath?: string
}

export function CoworkRightSidebar({ steps, artifacts, folderPath }: CoworkRightSidebarProps) {
  const [progressOpen, setProgressOpen] = useState(true)
  const [artifactsOpen, setArtifactsOpen] = useState(true)
  const [contextOpen, setContextOpen] = useState(true)

  const completedSteps = steps.filter((s) => s.status === 'complete').length
  const totalSteps = steps.length

  return (
    <div className="w-[240px] bg-claude-right-panel border-l border-claude-border-light overflow-y-auto custom-scrollbar">
      {/* Progress */}
      <Section title="Progress" isOpen={progressOpen} onToggle={() => setProgressOpen(!progressOpen)}>
        {steps.length === 0 ? (
          <div className="py-2">
            <div className="flex justify-center gap-2 mb-3">
              {[1, 2, 3, 4].map((i) => (
                <Circle key={i} className="w-5 h-5 text-claude-border" strokeWidth={1.5} />
              ))}
            </div>
            <p className="text-[12px] text-claude-text-tertiary text-center">Steps will show as the task unfolds.</p>
          </div>
        ) : (
          <div className="space-y-2">
            <div className="flex justify-center gap-2 mb-2">
              {steps.map((step) => (
                <div
                  key={step.stepIndex}
                  className={cn(
                    'w-5 h-5 rounded-full border-2 flex items-center justify-center',
                    step.status === 'complete' ? 'border-claude-accent bg-claude-accent' :
                    step.status === 'running' ? 'border-claude-accent' :
                    'border-claude-border'
                  )}
                >
                  {step.status === 'complete' && (
                    <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
                  )}
                  {step.status === 'running' && (
                    <div className="w-2 h-2 rounded-full bg-claude-accent animate-pulse" />
                  )}
                </div>
              ))}
            </div>
            {totalSteps > 0 && (
              <p className="text-[12px] text-claude-text-tertiary text-center">{completedSteps} of {totalSteps}</p>
            )}
          </div>
        )}
      </Section>

      {/* Artifacts */}
      {artifacts.length > 0 && (
        <Section title="Artifacts" isOpen={artifactsOpen} onToggle={() => setArtifactsOpen(!artifactsOpen)}>
          <div className="space-y-1">
            {artifacts.map((a) => (
              <div key={a.id} className="flex items-center gap-2 py-1 px-1 rounded hover:bg-claude-sidebar-hover cursor-pointer">
                <FileText className="w-3.5 h-3.5 text-claude-icon" />
                <span className="text-[12px] text-claude-text-secondary truncate">{a.title}</span>
              </div>
            ))}
          </div>
        </Section>
      )}

      {/* Context */}
      <Section title="Context" isOpen={contextOpen} onToggle={() => setContextOpen(!contextOpen)}>
        <div className="space-y-3">
          {/* Selected folders */}
          <div>
            <div className="text-[12px] text-claude-section-label font-medium mb-1">Selected folders</div>
            {folderPath && (
              <div className="flex items-center gap-2 py-1 px-1">
                <CheckSquare className="w-3.5 h-3.5 text-claude-icon" />
                <FolderOpen className="w-3.5 h-3.5 text-claude-icon" />
                <span className="text-[12px] text-claude-text-secondary truncate">{folderPath.split('/').pop()}</span>
              </div>
            )}
          </div>

          {/* Connectors */}
          <div>
            <div className="text-[12px] text-claude-section-label font-medium mb-1">Connectors</div>
            <div className="flex items-center gap-2 py-1 px-1">
              <Globe className="w-3.5 h-3.5 text-claude-icon" />
              <span className="text-[12px] text-claude-text-secondary">Web search</span>
            </div>
          </div>

          {/* Working files */}
          <div>
            <div className="text-[12px] text-claude-section-label font-medium mb-1">Working files</div>
            <div className="space-y-0.5">
              <FileRow name="example-file-1.md" />
              <FileRow name="example-file-2.md" />
              <FileRow name="example-file-3.md" />
            </div>
          </div>
        </div>
      </Section>
    </div>
  )
}

function Section({ title, children, isOpen, onToggle }: {
  title: string; children: React.ReactNode; isOpen: boolean; onToggle: () => void
}) {
  return (
    <div className="border-b border-claude-border-light">
      <button onClick={onToggle} className="w-full flex items-center justify-between px-4 py-3 hover:bg-claude-sidebar-hover">
        <span className="text-[13px] font-semibold text-claude-text">{title}</span>
        <ChevronDown className={cn('w-4 h-4 text-claude-icon transition-transform', !isOpen && '-rotate-90')} />
      </button>
      {isOpen && <div className="px-4 pb-3">{children}</div>}
    </div>
  )
}

function FileRow({ name }: { name: string }) {
  return (
    <div className="flex items-center gap-2 py-1 px-1 rounded hover:bg-claude-sidebar-hover cursor-pointer">
      <FileText className="w-3.5 h-3.5 text-claude-icon" />
      <span className="text-[12px] text-claude-text-secondary truncate">{name}</span>
    </div>
  )
}
