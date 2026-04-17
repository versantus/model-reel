import { useSimulationStore } from '../../store/simulation-store'
import { useChromeStore } from '../../store/chrome-store'
import { useDocumentStore } from '../../store/document-store'
import { useAutoScroll } from '../../hooks/useAutoScroll'
import { ChatGptSidebar } from './ChatGptSidebar'
import { ChatGptMessage } from './ChatGptMessage'
import { ChatGptInputBar } from './ChatGptInputBar'
import { ChatGptThinking } from './ChatGptThinking'
import { ChatGptTopBar } from './ChatGptTopBar'
import { ChatGptCodeInterpreter } from './ChatGptCodeInterpreter'
import type { ArtifactEvent } from '../../types/simulation'

export function ChatGptTabView() {
  const renderedEvents = useSimulationStore((s) => s.renderedEvents)
  const simulation = useSimulationStore((s) => s.simulation)
  const gptConfig = simulation?.metadata.gptConfig
  const scrollRef = useAutoScroll([renderedEvents.length, renderedEvents[renderedEvents.length - 1]?.progress])

  if (!simulation || simulation.productType !== 'chatgpt') {
    return <ChatGptLanding />
  }

  const modelName = gptConfig?.modelName || 'ChatGPT 5'

  return (
    <div className="h-full flex bg-gpt-bg">
      <ChatGptSidebar
        conversations={gptConfig?.sidebarConversations || []}
        conversationTitle={gptConfig?.conversationTitle}
      />

      <div className="flex-1 flex flex-col min-w-0 min-h-0">
        <ChatGptTopBar modelName={modelName} />

        <div ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar">
          <div className="max-w-[768px] mx-auto px-6 py-8 space-y-6">
            {renderedEvents.map((re) => {
              const { event, progress, isComplete } = re
              if (event.type === 'user-message') {
                return <ChatGptMessage key={event.id} role="user" content={event.content} progress={progress} attachments={event.attachments} />
              }
              if (event.type === 'assistant-message') {
                return <ChatGptMessage key={event.id} role="assistant" content={event.content} progress={progress} isComplete={isComplete} />
              }
              if (event.type === 'artifact') {
                return <GptArtifactCard key={event.id} event={event} />
              }
              if (event.type === 'thinking' && !isComplete) {
                return <ChatGptThinking key={event.id} label={event.label} />
              }
              if (event.type === 'code-interpreter') {
                return <ChatGptCodeInterpreter key={event.id} event={event} progress={progress} isComplete={isComplete} />
              }
              return null
            })}
          </div>
        </div>

        <div className="px-6 pb-4">
          <div className="max-w-[768px] mx-auto">
            <ChatGptInputBar />
            <div className="text-center pt-2">
              <span className="text-[11px] text-gpt-text-tertiary">
                ChatGPT can make mistakes. Check important info.
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function ChatGptLanding() {
  return (
    <div className="h-full flex items-center justify-center bg-gpt-bg">
      <div className="text-center">
        <OpenAiLogo size={48} />
        <p className="text-gpt-text-secondary text-sm mt-4">Load a ChatGPT simulation to get started</p>
      </div>
    </div>
  )
}

function OpenAiLogo({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="inline-block">
      <path
        d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9 6.0651 6.0651 0 0 0-4.5694-2.0344 6.0463 6.0463 0 0 0-5.7667 4.1894 5.9847 5.9847 0 0 0-3.9975 2.9001 6.0457 6.0457 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0463 6.0463 0 0 0 5.7718-4.1938 5.9847 5.9847 0 0 0 3.9973-2.9002 6.0456 6.0456 0 0 0-.7475-7.0965zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826c-.0056 2.9905-2.42 5.414-5.4945 5.4944zm-11.6135-3.0028a4.4708 4.4708 0 0 1-.536-3.0128l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502c-2.6031 1.4998-5.9326.6078-7.4332-1.988zM1.3282 6.7205a4.4728 4.4728 0 0 1 2.3408-1.9686V10.4803a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.02 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865c-2.5978-1.5062-3.4898-4.8358-1.9935-7.4423l-.0284-.1302zm16.606 3.8602-5.843-3.3685 2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913c2.6063 1.5059 3.4974 4.854 1.989 7.4465a4.4715 4.4715 0 0 1-2.3408 1.9639v-5.7398a.7806.7806 0 0 0-.4266-.6718zm2.0104-3.0238l-.142-.0852-4.7735-2.7864a.7759.7759 0 0 0-.7854 0L8.5987 8.2085V5.8761a.071.071 0 0 1 .0284-.0615l4.8303-2.7866a5.4898 5.4898 0 0 1 8.2245 5.6934v-.0049zM7.501 9.7358l-2.02-1.1636a.0804.0804 0 0 1-.0379-.0568V2.97a5.4946 5.4946 0 0 1 9.0087-4.2223l-.142.08-4.7784 2.7582a.7948.7948 0 0 0-.3927.6813l.0047 6.7368zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9998l-2.5974 1.5001-2.6067-1.5z"
        fill="currentColor"
      />
    </svg>
  )
}

function GptArtifactCard({ event }: { event: ArtifactEvent }) {
  const openChrome = useChromeStore((s) => s.open)
  const openDocument = useDocumentStore((s) => s.open)
  const isDoc = event.artifactType === 'word' || event.artifactType === 'pdf'
  const handleOpen = () => isDoc ? openDocument(event) : openChrome(event)

  const typeLabel = event.artifactType === 'code' ? `Code · ${event.language?.toUpperCase() || 'TEXT'}`
    : event.artifactType === 'word' ? 'Document · DOCX'
    : event.artifactType === 'pdf' ? 'Document · PDF'
    : 'Document · ' + event.artifactType.toUpperCase()

  return (
    <div className="border border-gpt-border rounded-2xl p-4 bg-gpt-bg my-3 hover:bg-gpt-sidebar-hover transition-colors cursor-pointer" onClick={handleOpen}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gpt-sidebar flex items-center justify-center text-gpt-text-secondary">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
            </svg>
          </div>
          <div>
            <p className="text-[14px] font-medium text-gpt-text">{event.title}</p>
            <p className="text-[12px] text-gpt-text-tertiary">{typeLabel}</p>
          </div>
        </div>
        <button className="px-3 py-1.5 text-[12px] text-gpt-text-secondary hover:text-gpt-text border border-gpt-border rounded-lg hover:bg-gpt-sidebar">
          Open
        </button>
      </div>
    </div>
  )
}
