import { useDocumentStore } from '../../store/document-store'
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Download, Printer, Search } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { DocumentWindowShell } from './DocumentWindowShell'
import { pdfMdComponents } from './document-md-components'

export function PdfWindow() {
  const { isOpen, artifact, close } = useDocumentStore()

  if (!isOpen || !artifact) return null
  if (artifact.artifactType !== 'pdf') return null

  const pages = artifact.content.split('---PAGE---').map(s => s.trim()).filter(Boolean)
  const pageCount = pages.length || 1

  return (
    <DocumentWindowShell
      onClose={close}
      titleBarColor="#323639"
      title={
        <>
          <PdfIcon />
          <span className="text-[12px] font-medium truncate max-w-[400px]">{artifact.title}.pdf</span>
        </>
      }
      toolbar={<PdfToolbar pageCount={pageCount} />}
      bodyBg="#525659"
    >
      {pages.map((pageContent, i) => (
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
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={pdfMdComponents}>
            {pageContent}
          </ReactMarkdown>
          <div className="text-center text-[10px] text-[#999] mt-8 pt-4 border-t border-[#EEE]">
            {i + 1}
          </div>
        </div>
      ))}
    </DocumentWindowShell>
  )
}

function PdfToolbar({ pageCount }: { pageCount: number }) {
  return (
    <div className="flex items-center gap-3 px-3 py-1.5 bg-[#3B3F42] border-b border-[#2A2D30]">
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
