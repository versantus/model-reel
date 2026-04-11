import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import type { ComponentPropsWithoutRef } from 'react'

interface MarkdownRendererProps {
  content: string
  className?: string
  variant?: 'terminal' | 'chat'
}

export function MarkdownRenderer({ content, className, variant = 'terminal' }: MarkdownRendererProps) {
  const isTerminal = variant === 'terminal'

  return (
    <div className={className}>
    <ReactMarkdown
      components={{
        code({ className: codeClassName, children, ...props }: ComponentPropsWithoutRef<'code'> & { inline?: boolean }) {
          const match = /language-(\w+)/.exec(codeClassName || '')
          const isInline = !match && !String(children).includes('\n')

          if (isInline) {
            return (
              <code
                className={isTerminal
                  ? 'bg-terminal-surface text-terminal-cyan px-1.5 py-0.5 rounded text-sm'
                  : 'bg-claude-bg text-claude-accent px-1.5 py-0.5 rounded text-[13px]'}
                {...props}
              >
                {children}
              </code>
            )
          }

          return (
            <SyntaxHighlighter
              style={oneDark}
              language={match?.[1] || 'text'}
              PreTag="div"
              customStyle={{
                margin: '8px 0',
                borderRadius: '6px',
                fontSize: '13px',
                ...(isTerminal ? { background: '#1a1a2e' } : {}),
              }}
            >
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          )
        },
        p({ children }) {
          return <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>
        },
        ul({ children }) {
          return <ul className="list-disc ml-4 mb-2 space-y-1">{children}</ul>
        },
        ol({ children }) {
          return <ol className="list-decimal ml-4 mb-2 space-y-1">{children}</ol>
        },
        h1({ children }) {
          return <h1 className="text-xl font-bold mb-2 mt-3">{children}</h1>
        },
        h2({ children }) {
          return <h2 className="text-lg font-bold mb-2 mt-3">{children}</h2>
        },
        h3({ children }) {
          return <h3 className="text-base font-bold mb-1 mt-2">{children}</h3>
        },
        blockquote({ children }) {
          return (
            <blockquote className={isTerminal
              ? 'border-l-2 border-terminal-dim pl-3 my-2 text-terminal-dim'
              : 'border-l-2 border-claude-border pl-3 my-2 text-claude-text-secondary'}>
              {children}
            </blockquote>
          )
        },
        table({ children }) {
          return (
            <div className="overflow-x-auto my-2">
              <table className="border-collapse text-sm w-full">{children}</table>
            </div>
          )
        },
        th({ children }) {
          return (
            <th className={isTerminal
              ? 'border border-terminal-border px-3 py-1.5 text-left font-semibold bg-terminal-surface'
              : 'border border-claude-border px-3 py-1.5 text-left font-semibold bg-claude-bg'}>
              {children}
            </th>
          )
        },
        td({ children }) {
          return (
            <td className={isTerminal
              ? 'border border-terminal-border px-3 py-1.5'
              : 'border border-claude-border px-3 py-1.5'}>
              {children}
            </td>
          )
        },
        strong({ children }) {
          return <strong className="font-bold">{children}</strong>
        },
      }}
    >
      {content}
    </ReactMarkdown>
    </div>
  )
}
