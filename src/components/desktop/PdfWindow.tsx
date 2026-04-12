import { useDocumentStore } from '../../store/document-store'
import { X, Minus, Maximize2, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Printer, Search } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const mdComponents = {
  h1: ({ children }: { children?: React.ReactNode }) => (
    <h1 className="text-[20px] font-bold text-[#111] mb-4 mt-2 leading-tight">{children}</h1>
  ),
  h2: ({ children }: { children?: React.ReactNode }) => (
    <h2 className="text-[15px] font-semibold text-[#111] mb-3 mt-5">{children}</h2>
  ),
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="text-[13px] font-semibold text-[#222] mb-2 mt-4">{children}</h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-[11px] text-[#222] mb-2.5 leading-[1.65]">{children}</p>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-[#111]">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic text-[#444]">{children}</em>
  ),
  hr: () => (
    <hr className="my-4 border-t border-[#DDD]" />
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="list-disc pl-5 mb-2.5 space-y-0.5">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="list-decimal pl-5 mb-2.5 space-y-0.5">{children}</ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="text-[11px] text-[#222] leading-[1.65]">{children}</li>
  ),
  table: ({ children }: { children?: React.ReactNode }) => (
    <div className="my-3 overflow-x-auto">
      <table className="w-full border-collapse text-[10px]">{children}</table>
    </div>
  ),
  thead: ({ children }: { children?: React.ReactNode }) => (
    <thead className="bg-[#F5F5F5]">{children}</thead>
  ),
  th: ({ children }: { children?: React.ReactNode }) => (
    <th className="border border-[#D0D0D0] px-2.5 py-1.5 text-left font-semibold text-[#111]">{children}</th>
  ),
  td: ({ children }: { children?: React.ReactNode }) => (
    <td className="border border-[#DDD] px-2.5 py-1.5 text-[#222]">{children}</td>
  ),
}

export function PdfWindow() {
  const { isOpen, artifact, close } = useDocumentStore()

  if (!isOpen || !artifact) return null
  if (artifact.artifactType !== 'pdf') return null

  const pages = artifact.content.split('---PAGE---').filter(Boolean)
  const pageCount = pages.length || 1

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={close} />

      {/* PDF viewer window */}
      <div className="fixed top-[6%] left-[10%] w-[80%] h-[82%] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-black/10 bg-[#525659]">
        {/* Title bar */}
        <div className="flex items-center h-9 px-3 bg-[#323639] shrink-0">
          {/* Traffic lights */}
          <div className="flex items-center gap-2 mr-4">
            <button onClick={close} className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] hover:brightness-90" aria-label="Close PDF viewer" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
          </div>

          {/* PDF icon + title */}
          <div className="flex items-center gap-2 text-white">
            <PdfIcon />
            <span className="text-[12px] font-medium truncate max-w-[400px]">{artifact.title}.pdf</span>
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

        {/* Toolbar */}
        <div className="flex items-center gap-3 px-3 py-1.5 bg-[#3B3F42] border-b border-[#2A2D30]">
          {/* Navigation */}
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-white/10 text-white/60" aria-label="Previous page">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5 text-[12px] text-white/80">
              <span className="bg-[#525659] border border-[#666] rounded px-2 py-0.5 w-8 text-center">1</span>
              <span className="text-white/50">/ {pageCount}</span>
            </div>
            <button className="p-1 rounded hover:bg-white/10 text-white/60" aria-label="Next page">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-4 bg-white/20" />

          {/* Zoom */}
          <div className="flex items-center gap-1">
            <button className="p-1 rounded hover:bg-white/10 text-white/60" aria-label="Zoom out">
              <ZoomOut className="w-4 h-4" />
            </button>
            <span className="text-[11px] text-white/70 w-10 text-center">100%</span>
            <button className="p-1 rounded hover:bg-white/10 text-white/60" aria-label="Zoom in">
              <ZoomIn className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1" />

          {/* Actions */}
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded hover:bg-white/10 text-white/60" aria-label="Search">
              <Search className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-white/10 text-white/60" aria-label="Print">
              <Printer className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded hover:bg-white/10 text-white/60" aria-label="Download">
              <Download className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Document area */}
        <div className="flex-1 bg-[#525659] overflow-auto flex flex-col items-center gap-4 py-6">
          {(pages.length > 0 ? pages : [artifact.content]).map((pageContent, i) => (
            <div
              key={i}
              className="bg-white shadow-xl"
              style={{
                width: '8.5in',
                minHeight: '11in',
                padding: '0.75in 1in',
                maxWidth: 'calc(100% - 2rem)',
              }}
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={mdComponents}>
                {pageContent.trim()}
              </ReactMarkdown>
              {/* Page number */}
              <div className="text-center text-[10px] text-[#999] mt-8 pt-4 border-t border-[#EEE]">
                {i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

function PdfIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="shrink-0" aria-hidden="true">
      <rect width="16" height="16" rx="2" fill="#D93025" />
      <text x="1" y="12" fill="white" fontSize="8" fontWeight="bold" fontFamily="Arial">PDF</text>
    </svg>
  )
}
