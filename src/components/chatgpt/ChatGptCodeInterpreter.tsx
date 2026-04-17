import { useState, useEffect } from 'react'
import { ChevronDown, ChevronRight, Code2 } from 'lucide-react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { MarkdownRenderer } from '../shared/MarkdownRenderer'
import type { CodeInterpreterEvent } from '../../types/simulation'

interface Props {
  event: CodeInterpreterEvent
  progress: number
  isComplete: boolean
}

export function ChatGptCodeInterpreter({ event, progress, isComplete }: Props) {
  const [expanded, setExpanded] = useState(event.expandedByDefault ?? false)
  const showOutput = isComplete || progress >= 1
  const analyzingLabel = event.analyzingLabel ?? 'Analyzing'
  const analyzedLabel = event.analyzedLabel ?? 'Analyzed'

  useEffect(() => {
    if (showOutput && event.expandedByDefault) setExpanded(true)
  }, [showOutput, event.expandedByDefault])

  return (
    <div className="my-3">
      <button
        onClick={() => setExpanded((v) => !v)}
        className="flex items-center gap-2 text-[13px] text-gpt-text-secondary hover:text-gpt-text transition-colors"
      >
        <span className="w-4 h-4 flex items-center justify-center">
          <Code2 className="w-4 h-4" strokeWidth={1.8} />
        </span>
        {showOutput ? (
          <>
            <span className="font-medium">{analyzedLabel}</span>
            {expanded ? (
              <ChevronDown className="w-3.5 h-3.5" strokeWidth={2} />
            ) : (
              <ChevronRight className="w-3.5 h-3.5" strokeWidth={2} />
            )}
          </>
        ) : (
          <>
            <span className="font-medium">
              <ShimmerText>{analyzingLabel}</ShimmerText>
            </span>
          </>
        )}
      </button>

      {expanded && showOutput && (
        <div className="mt-2 border border-gpt-border rounded-xl overflow-hidden bg-[#FAFAFA]">
          <div className="flex items-center justify-between px-3 py-2 border-b border-gpt-border bg-white">
            <span className="text-[12px] text-gpt-text-tertiary font-mono">python</span>
          </div>
          <SyntaxHighlighter
            style={oneLight}
            language="python"
            PreTag="div"
            customStyle={{
              margin: 0,
              padding: '12px 16px',
              fontSize: 13,
              lineHeight: 1.55,
              background: 'transparent',
            }}
            codeTagProps={{ style: { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace' } }}
          >
            {event.code.trim()}
          </SyntaxHighlighter>
          {event.output && (
            <div className="border-t border-gpt-border bg-white px-4 py-3">
              <div className="text-[11px] uppercase tracking-wider text-gpt-text-tertiary mb-2">Output</div>
              <div className="text-[13.5px] text-gpt-text leading-[1.6]">
                <MarkdownRenderer content={event.output} variant="chat" />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

function ShimmerText({ children }: { children: React.ReactNode }) {
  return (
    <span className="bg-[linear-gradient(90deg,#6b7280_0%,#111827_50%,#6b7280_100%)] bg-[length:200%_100%] bg-clip-text text-transparent animate-[shimmer_1.8s_linear_infinite]">
      {children}
    </span>
  )
}
