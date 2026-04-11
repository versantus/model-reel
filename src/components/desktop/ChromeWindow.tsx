import { useChromeStore } from '../../store/chrome-store'
import { X, Minus, Square, ChevronLeft, ChevronRight, RotateCw, Lock, Star } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

export function ChromeWindow() {
  const { isOpen, artifact, close } = useChromeStore()

  if (!isOpen || !artifact) return null

  const filename = artifact.title.replace(/\s+/g, '-').toLowerCase()
  const isHtml = artifact.artifactType === 'html'
  const url = isHtml
    ? `file:///Users/dev/project/${filename}.html`
    : `file:///Users/dev/project/${filename}.${artifact.language || 'txt'}`

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 z-40" onClick={close} />

      {/* Chrome window */}
      <div className="fixed top-[8%] left-[12%] w-[76%] h-[78%] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-black/10">
        {/* Title bar */}
        <div className="flex items-center h-9 px-3 bg-[#DEE1E6] border-b border-[#C2C5CA] shrink-0">
          {/* Traffic lights */}
          <div className="flex items-center gap-2 mr-3">
            <button onClick={close} className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] hover:brightness-90" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
          </div>

          {/* Tab */}
          <div className="flex items-center gap-2 bg-white rounded-t-lg px-3 py-1 text-[11px] text-[#5F6368] max-w-[240px]">
            {/* Chrome icon */}
            <ChromeIcon />
            <span className="truncate">{artifact.title}</span>
            <button onClick={close} className="ml-auto p-0.5 hover:bg-[#E8EAED] rounded">
              <X className="w-3 h-3" />
            </button>
          </div>

          {/* Spacer + window controls (Windows-style hidden on mac, but we keep the area) */}
          <div className="flex-1" />
        </div>

        {/* Toolbar / address bar */}
        <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-b border-[#DADCE0]">
          <div className="flex items-center gap-0.5">
            <button className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#5F6368]">
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#C4C7CC]">
              <ChevronRight className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#5F6368]">
              <RotateCw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* URL bar */}
          <div className="flex-1 flex items-center gap-2 bg-[#F1F3F4] rounded-full px-3 py-1.5">
            <Lock className="w-3 h-3 text-[#5F6368]" />
            <span className="text-[13px] text-[#202124] truncate">{url}</span>
          </div>

          <button className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#5F6368]">
            <Star className="w-4 h-4" />
          </button>
        </div>

        {/* Content area */}
        <div className="flex-1 bg-white overflow-auto">
          {isHtml ? (
            <iframe
              srcDoc={artifact.content}
              className="w-full h-full border-0"
              title={artifact.title}
              sandbox="allow-scripts allow-forms"
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="p-4">
              <SyntaxHighlighter
                style={oneLight}
                language={artifact.language || 'text'}
                customStyle={{
                  margin: 0,
                  borderRadius: '8px',
                  fontSize: '13px',
                  background: '#F8F9FA',
                }}
              >
                {artifact.content}
              </SyntaxHighlighter>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function ChromeIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 48 48" fill="none" className="shrink-0">
      <circle cx="24" cy="24" r="22" fill="#fff" />
      <path d="M24 14.4a9.6 9.6 0 100 19.2 9.6 9.6 0 000-19.2z" fill="#fff" />
      <path d="M13.2 28.8L4.8 13.2A22.08 22.08 0 0024 2.4l8.4 14.4H19.2a9.6 9.6 0 00-6 14.4z" fill="#DB4437" />
      <path d="M24 45.6c8.4 0 15.6-4.8 19.2-12l-8.4-14.4a9.6 9.6 0 01-15.6 0L10.8 33.6a22.08 22.08 0 0013.2 12z" fill="#0F9D58" />
      <path d="M43.2 13.2H24a9.6 9.6 0 019.6 9.6c0 2.4-.96 4.56-2.4 6.24L39.6 43.2A22.08 22.08 0 0045.6 24c0-3.84-1.2-7.44-2.4-10.8z" fill="#4285F4" />
      <path d="M34.8 19.2L43.2 33.6" fill="none" />
      <circle cx="24" cy="24" r="7.2" fill="#F1F3F4" />
      <circle cx="24" cy="24" r="4.8" fill="#4285F4" />
    </svg>
  )
}
