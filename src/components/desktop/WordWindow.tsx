import { useDocumentStore } from '../../store/document-store'
import { Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Undo, Redo, Printer, Save } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DocumentWindowShell } from './DocumentWindowShell'
import { wordMdComponents } from './document-md-components'

function wordCount(text: string): number {
  const trimmed = text.trim()
  if (!trimmed) return 0
  return trimmed.split(/\s+/).length
}

export function WordWindow() {
  const { isOpen, artifact, close } = useDocumentStore()

  if (!isOpen || !artifact) return null
  if (artifact.artifactType !== 'word') return null

  const pages = artifact.content.split('---PAGE---').map(s => s.trim()).filter(Boolean)
  const pageCount = pages.length || 1

  return (
    <DocumentWindowShell
      onClose={close}
      titleBarColor="#2B579A"
      title={
        <>
          <WordIcon />
          <span className="text-[12px] font-medium truncate max-w-[300px]">{artifact.title}</span>
          <span className="text-[11px] text-white/60 ml-1">- Saved</span>
        </>
      }
      toolbar={<WordToolbar />}
      statusBar={
        <div className="flex items-center justify-between px-3 py-1 bg-[#2B579A] text-white/70 text-[10px] shrink-0">
          <div className="flex items-center gap-4">
            <span>Page 1 of {pageCount}</span>
            <span>{wordCount(artifact.content)} words</span>
            <span>English (United Kingdom)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>100%</span>
          </div>
        </div>
      }
      bodyBg="#E0E0E0"
    >
      {pages.map((pageContent, i) => (
        <div
          key={i}
          className="bg-white shadow-lg border border-[#D0D0D0]"
          style={{
            width: '8.5in',
            minHeight: '11in',
            padding: '1in 1.25in',
            maxWidth: '100%',
          }}
        >
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={wordMdComponents}>
            {pageContent}
          </ReactMarkdown>
        </div>
      ))}
    </DocumentWindowShell>
  )
}

function WordToolbar() {
  return (
    <>
      {/* Ribbon tabs */}
      <div className="flex items-center bg-[#2B579A] px-3 pb-0.5">
        <div className="flex items-center gap-0">
          {['File', 'Home', 'Insert', 'Design', 'Layout', 'References', 'Review', 'View'].map((tab, i) => (
            <button
              key={tab}
              className={`px-3 py-1 text-[11px] font-medium rounded-t ${
                i === 1
                  ? 'bg-[#F3F3F3] text-[#2B579A]'
                  : 'text-white/80 hover:bg-white/10'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Ribbon toolbar */}
      <div className="flex items-center gap-4 px-4 py-1.5 bg-[#F3F3F3] border-b border-[#D6D6D6]">
        <div className="flex items-center gap-1 pr-3 border-r border-[#D6D6D6]">
          <ToolbarButton icon={Save} label="Save" />
          <ToolbarButton icon={Undo} label="Undo" />
          <ToolbarButton icon={Redo} label="Redo" />
          <ToolbarButton icon={Printer} label="Print" />
        </div>

        <div className="flex items-center gap-1 pr-3 border-r border-[#D6D6D6]">
          <div className="flex items-center border border-[#C8C8C8] rounded bg-white px-2 py-0.5">
            <span className="text-[11px] text-[#333] w-24 truncate">Calibri</span>
          </div>
          <div className="flex items-center border border-[#C8C8C8] rounded bg-white px-2 py-0.5 ml-1">
            <span className="text-[11px] text-[#333] w-6 text-center">11</span>
          </div>
          <div className="flex items-center gap-0 ml-1">
            <ToolbarButton icon={Bold} label="Bold" active />
            <ToolbarButton icon={Italic} label="Italic" />
            <ToolbarButton icon={Underline} label="Underline" />
          </div>
        </div>

        <div className="flex items-center gap-0">
          <ToolbarButton icon={AlignLeft} label="Align left" active />
          <ToolbarButton icon={AlignCenter} label="Align centre" />
          <ToolbarButton icon={AlignRight} label="Align right" />
          <div className="w-px h-4 bg-[#D6D6D6] mx-1" />
          <ToolbarButton icon={List} label="Bullet list" />
          <ToolbarButton icon={ListOrdered} label="Numbered list" />
        </div>
      </div>

      {/* Ruler */}
      <div className="bg-white border-b border-[#E0E0E0] h-5 flex items-center px-4">
        <div className="flex-1 bg-[#F8F8F8] h-3 rounded-sm relative">
          <div className="absolute inset-0 flex items-center justify-between px-2">
            {Array.from({ length: 17 }, (_, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-px ${i % 2 === 0 ? 'h-2 bg-[#999]' : 'h-1 bg-[#CCC]'}`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

function ToolbarButton({ icon: Icon, label, active }: { icon: React.ComponentType<{ className?: string }>, label: string, active?: boolean }) {
  return (
    <button
      className={`p-1.5 rounded hover:bg-[#DDD] ${active ? 'bg-[#D0D0D0]' : ''}`}
      aria-label={label}
      title={label}
    >
      <Icon className="w-3.5 h-3.5 text-[#444]" />
    </button>
  )
}

function WordIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
      <rect width="16" height="16" rx="2" fill="#2B579A" />
      <text x="3" y="12" fill="white" fontSize="10" fontWeight="bold" fontFamily="Arial">W</text>
    </svg>
  )
}
