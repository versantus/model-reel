import { useDocumentStore } from '../../store/document-store'
import { X, Minus, Maximize2, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, List, ListOrdered, Undo, Redo, Printer, Save } from 'lucide-react'
import ReactMarkdown from 'react-markdown'

export function WordWindow() {
  const { isOpen, artifact, close } = useDocumentStore()

  if (!isOpen || !artifact) return null
  if (artifact.artifactType !== 'word') return null

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={close} />

      {/* Word window */}
      <div className="fixed top-[6%] left-[10%] w-[80%] h-[82%] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-black/10 bg-[#F3F3F3]">
        {/* Title bar */}
        <div className="flex items-center h-9 px-3 bg-[#2B579A] shrink-0">
          {/* Traffic lights */}
          <div className="flex items-center gap-2 mr-4">
            <button onClick={close} className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] hover:brightness-90" aria-label="Close document window" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
          </div>

          {/* Doc icon + title */}
          <div className="flex items-center gap-2 text-white">
            <WordIcon />
            <span className="text-[12px] font-medium truncate max-w-[300px]">{artifact.title}</span>
            <span className="text-[11px] text-white/60 ml-1">- Saved</span>
          </div>

          <div className="flex-1" />

          {/* Window controls */}
          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-white/10 rounded text-white/70" aria-label="Minimise">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-white/10 rounded text-white/70" aria-label="Maximise">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={close} className="p-1 hover:bg-red-500 rounded text-white/70" aria-label="Close">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

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
          {/* Clipboard group */}
          <div className="flex items-center gap-1 pr-3 border-r border-[#D6D6D6]">
            <ToolbarButton icon={Save} label="Save" />
            <ToolbarButton icon={Undo} label="Undo" />
            <ToolbarButton icon={Redo} label="Redo" />
            <ToolbarButton icon={Printer} label="Print" />
          </div>

          {/* Font group */}
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

          {/* Paragraph group */}
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

        {/* Document area - gray background with white page */}
        <div className="flex-1 bg-[#E0E0E0] overflow-auto flex justify-center py-6">
          <div
            className="bg-white shadow-lg border border-[#D0D0D0]"
            style={{
              width: '8.5in',
              minHeight: '11in',
              padding: '1in 1.25in',
              maxWidth: '100%',
            }}
          >
            <article className="word-document prose prose-sm max-w-none text-[#333] leading-relaxed">
              <ReactMarkdown>{artifact.content}</ReactMarkdown>
            </article>
          </div>
        </div>

        {/* Status bar */}
        <div className="flex items-center justify-between px-3 py-1 bg-[#2B579A] text-white/70 text-[10px] shrink-0">
          <div className="flex items-center gap-4">
            <span>Page 1 of 1</span>
            <span>{artifact.content.split(/\s+/).length} words</span>
            <span>English (United Kingdom)</span>
          </div>
          <div className="flex items-center gap-2">
            <span>100%</span>
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
