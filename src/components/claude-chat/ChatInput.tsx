import { Paperclip, ArrowUp } from 'lucide-react'

export function ChatInput() {
  return (
    <div className="px-6 pb-4 pt-2">
      <div className="max-w-3xl mx-auto flex items-end gap-2 bg-white border border-gray-300 rounded-2xl px-4 py-3 shadow-sm">
        <button className="p-1 text-gray-400 hover:text-gray-600">
          <Paperclip className="w-5 h-5" />
        </button>
        <div className="flex-1 text-sm text-gray-400 min-h-[24px] flex items-center">
          Message Claude...
        </div>
        <button className="p-1.5 bg-gray-200 rounded-lg text-gray-400">
          <ArrowUp className="w-4 h-4" />
        </button>
      </div>
      <p className="text-center text-xs text-gray-400 mt-2">
        Claude can make mistakes. Please double-check responses.
      </p>
    </div>
  )
}
