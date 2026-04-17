import { useMemo } from 'react'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'
import { Copy, ThumbsUp, ThumbsDown, RotateCcw, Volume2, FileSpreadsheet, FileText, FileImage, FileCode, File as FileIcon } from 'lucide-react'
import type { MessageAttachment } from '../../types/simulation'

interface ChatGptMessageProps {
  role: 'user' | 'assistant'
  content: string
  progress: number
  isComplete?: boolean
  attachments?: MessageAttachment[]
}

export function ChatGptMessage({ role, content, progress, isComplete, attachments }: ChatGptMessageProps) {
  const visibleContent = useMemo(() => {
    if (role === 'user' || isComplete || progress >= 1) return content
    const charCount = Math.floor(content.length * progress)
    return content.slice(0, charCount)
  }, [content, progress, isComplete, role])

  if (role === 'user') {
    return (
      <div className="flex flex-col items-end gap-1.5">
        {attachments && attachments.length > 0 && (
          <div className="flex flex-wrap justify-end gap-2 max-w-[85%]">
            {attachments.map((att, i) => (
              <AttachmentChip key={i} attachment={att} />
            ))}
          </div>
        )}
        {content && (
          <div className="bg-gpt-user-bubble rounded-3xl px-5 py-2.5 text-[15px] text-gpt-text leading-relaxed max-w-[85%] whitespace-pre-wrap">
            {visibleContent}
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="group">
      <div className="text-[15px] text-gpt-text leading-[1.75]">
        <MarkdownRenderer content={visibleContent} variant="chat" />
        {!isComplete && progress < 1 && (
          <span className="cursor-blink inline-block w-[3px] h-[18px] bg-gpt-text ml-0.5 align-middle rounded-[1px]" />
        )}
      </div>
      {isComplete && (
        <div className="flex items-center gap-0.5 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <ActionButton icon={Copy} label="Copy" />
          <ActionButton icon={ThumbsUp} label="Good response" />
          <ActionButton icon={ThumbsDown} label="Bad response" />
          <ActionButton icon={Volume2} label="Read aloud" />
          <ActionButton icon={RotateCcw} label="Regenerate" />
        </div>
      )}
    </div>
  )
}

function AttachmentChip({ attachment }: { attachment: MessageAttachment }) {
  const { icon: Icon, tint, label } = describeAttachment(attachment)
  const subtitle = attachment.kind === 'spreadsheet'
    ? attachment.sheetCount
      ? `Spreadsheet · ${attachment.sheetCount} sheets`
      : 'Spreadsheet'
    : label

  return (
    <div className="flex items-center gap-3 bg-gpt-user-bubble border border-gpt-border rounded-2xl px-3 py-2.5 max-w-[320px]">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${tint}`}>
        <Icon className="w-5 h-5 text-white" strokeWidth={1.8} />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[13px] font-medium text-gpt-text truncate">{attachment.name}</p>
        <p className="text-[12px] text-gpt-text-tertiary truncate">
          {subtitle}
          {attachment.size ? ` · ${attachment.size}` : ''}
        </p>
      </div>
    </div>
  )
}

function describeAttachment(att: MessageAttachment) {
  switch (att.kind) {
    case 'spreadsheet':
      return { icon: FileSpreadsheet, tint: 'bg-[#107C41]', label: 'Spreadsheet' }
    case 'pdf':
      return { icon: FileText, tint: 'bg-[#D93025]', label: 'PDF' }
    case 'image':
      return { icon: FileImage, tint: 'bg-[#7C3AED]', label: 'Image' }
    case 'code':
      return { icon: FileCode, tint: 'bg-[#334155]', label: 'Code' }
    case 'document':
      return { icon: FileText, tint: 'bg-[#2B579A]', label: 'Document' }
    default:
      return { icon: FileIcon, tint: 'bg-[#64748B]', label: 'File' }
  }
}

function ActionButton({ icon: Icon, label }: { icon: typeof Copy; label: string }) {
  return (
    <button
      className="p-1.5 rounded-md hover:bg-gpt-sidebar-hover text-gpt-icon hover:text-gpt-icon-hover"
      title={label}
    >
      <Icon className="w-4 h-4" strokeWidth={1.8} />
    </button>
  )
}
