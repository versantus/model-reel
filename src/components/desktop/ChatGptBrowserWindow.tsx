import { ChevronLeft, ChevronRight, RotateCw, Lock, Star, Share2, Plus } from 'lucide-react'
import { ChatGptTabView } from '../chatgpt/ChatGptTabView'
import { SimulationEditor } from '../editor/SimulationEditor'
import { InlineSimulationPicker } from './InlineSimulationPicker'
import { useEditorStore } from '../../store/editor-store'
import { useSimulationStore } from '../../store/simulation-store'

export function ChatGptBrowserWindow() {
  const simulation = useSimulationStore((s) => s.simulation)
  const isEditorVisible = useEditorStore((s) => s.isEditorVisible)

  const slug = simulation?.metadata.gptConfig?.conversationTitle
    ? simulation.metadata.gptConfig.conversationTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
    : 'new'
  const url = `chatgpt.com/c/${slug}`

  return (
    <div className="h-full flex flex-col bg-white rounded-xl overflow-hidden shadow-2xl border border-black/10">
      {/* Title bar with traffic lights + tab strip */}
      <div className="flex items-center h-10 px-3 bg-[#DEE1E6] border-b border-[#C2C5CA] shrink-0">
        <div className="flex items-center gap-2 mr-3">
          <div className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E]" />
          <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
          <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
        </div>

        {/* Active tab */}
        <div className="flex items-center gap-2 bg-white rounded-t-lg px-3 py-1.5 text-[12px] text-[#202124] max-w-[280px] -mb-px border-t border-l border-r border-[#DADCE0]">
          <OpenAiTabIcon />
          <span className="truncate flex-1">
            {simulation?.metadata.gptConfig?.conversationTitle || 'ChatGPT'}
          </span>
        </div>

        {/* New tab button */}
        <button className="ml-1 p-1 rounded hover:bg-[#CACDD1] text-[#5F6368]">
          <Plus className="w-4 h-4" />
        </button>

        <div className="flex-1" />
      </div>

      {/* Toolbar / address bar */}
      <div className="flex items-center gap-2 px-3 py-1.5 bg-white border-b border-[#DADCE0] shrink-0">
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

        <div className="flex-1 flex items-center gap-2 bg-[#F1F3F4] rounded-full px-3 py-1.5">
          <Lock className="w-3 h-3 text-[#5F6368]" />
          <span className="text-[13px] text-[#202124] truncate">{url}</span>
        </div>

        <button className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#5F6368]">
          <Share2 className="w-4 h-4" />
        </button>
        <button className="p-1.5 rounded-full hover:bg-[#F1F3F4] text-[#5F6368]">
          <Star className="w-4 h-4" />
        </button>
        <div className="pl-2 ml-1 border-l border-[#DADCE0]">
          <InlineSimulationPicker />
        </div>
      </div>

      {/* Page content (the ChatGPT web app) */}
      <div className="flex-1 overflow-hidden">
        {isEditorVisible && simulation ? <SimulationEditor /> : <ChatGptTabView />}
      </div>
    </div>
  )
}

function OpenAiTabIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="shrink-0 text-[#0D0D0D]">
      <path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9 6.0651 6.0651 0 0 0-4.5694-2.0344 6.0463 6.0463 0 0 0-5.7667 4.1894 5.9847 5.9847 0 0 0-3.9975 2.9001 6.0457 6.0457 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0463 6.0463 0 0 0 5.7718-4.1938 5.9847 5.9847 0 0 0 3.9973-2.9002 6.0456 6.0456 0 0 0-.7475-7.0965zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826c-.0056 2.9905-2.42 5.414-5.4945 5.4944zm-11.6135-3.0028a4.4708 4.4708 0 0 1-.536-3.0128l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502c-2.6031 1.4998-5.9326.6078-7.4332-1.988zM1.3282 6.7205a4.4728 4.4728 0 0 1 2.3408-1.9686V10.4803a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.02 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865c-2.5978-1.5062-3.4898-4.8358-1.9935-7.4423l-.0284-.1302zm16.606 3.8602-5.843-3.3685 2.02-1.1638a.0757.0757 0 0 1 .071 0l4.8303 2.7913c2.6063 1.5059 3.4974 4.854 1.989 7.4465a4.4715 4.4715 0 0 1-2.3408 1.9639v-5.7398a.7806.7806 0 0 0-.4266-.6718zm2.0104-3.0238l-.142-.0852-4.7735-2.7864a.7759.7759 0 0 0-.7854 0L8.5987 8.2085V5.8761a.071.071 0 0 1 .0284-.0615l4.8303-2.7866a5.4898 5.4898 0 0 1 8.2245 5.6934v-.0049zM7.501 9.7358l-2.02-1.1636a.0804.0804 0 0 1-.0379-.0568V2.97a5.4946 5.4946 0 0 1 9.0087-4.2223l-.142.08-4.7784 2.7582a.7948.7948 0 0 0-.3927.6813l.0047 6.7368zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9998l-2.5974 1.5001-2.6067-1.5z" />
    </svg>
  )
}
