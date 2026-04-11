import { X, Code, Eye } from 'lucide-react'
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { cn } from '../../utils/cn'
import type { ArtifactEvent } from '../../types/simulation'

interface ArtifactPanelProps {
  artifact: ArtifactEvent
  onClose: () => void
}

export function ArtifactPanel({ artifact, onClose }: ArtifactPanelProps) {
  const [tab, setTab] = useState<'code' | 'preview'>('code')

  return (
    <div className="w-[420px] border-l border-gray-200 flex flex-col bg-white">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-800 truncate">{artifact.title}</h3>
        <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        <button
          onClick={() => setTab('code')}
          className={cn(
            'flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors',
            tab === 'code'
              ? 'border-claude-purple text-claude-purple'
              : 'border-transparent text-gray-500 hover:text-gray-700'
          )}
        >
          <Code className="w-3.5 h-3.5" /> Code
        </button>
        {artifact.artifactType === 'html' && (
          <button
            onClick={() => setTab('preview')}
            className={cn(
              'flex items-center gap-1.5 px-4 py-2 text-xs font-medium border-b-2 transition-colors',
              tab === 'preview'
                ? 'border-claude-purple text-claude-purple'
                : 'border-transparent text-gray-500 hover:text-gray-700'
            )}
          >
            <Eye className="w-3.5 h-3.5" /> Preview
          </button>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        {tab === 'code' ? (
          <SyntaxHighlighter
            style={oneDark}
            language={artifact.language || 'text'}
            customStyle={{
              margin: 0,
              borderRadius: 0,
              fontSize: '13px',
              height: '100%',
            }}
          >
            {artifact.content}
          </SyntaxHighlighter>
        ) : (
          <iframe
            srcDoc={artifact.content}
            className="w-full h-full border-0"
            title="Artifact preview"
            sandbox="allow-scripts allow-forms"
            referrerPolicy="no-referrer"
          />
        )}
      </div>
    </div>
  )
}
