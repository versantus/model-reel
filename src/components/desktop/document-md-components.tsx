import type { Components } from 'react-markdown'

export const wordMdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-[22px] font-bold text-[#1F1F1F] mb-4 mt-2 leading-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[16px] font-semibold text-[#2B579A] mb-3 mt-6 pb-1 border-b border-[#D6D6D6]">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[14px] font-semibold text-[#333] mb-2 mt-4">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[12px] text-[#333] mb-3 leading-[1.6]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#1F1F1F]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#555]">{children}</em>
  ),
  hr: () => (
    <hr className="my-4 border-t border-[#D6D6D6]" />
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-6 mb-3 space-y-1">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-6 mb-3 space-y-1">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[12px] text-[#333] leading-[1.6]">{children}</li>
  ),
  table: ({ children }) => (
    <div className="my-4 overflow-x-auto">
      <table className="w-full border-collapse text-[11px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#F0F0F0]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-[#C8C8C8] px-3 py-1.5 text-left font-semibold text-[#1F1F1F]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-[#D6D6D6] px-3 py-1.5 text-[#333]">{children}</td>
  ),
}

export const pdfMdComponents: Components = {
  h1: ({ children }) => (
    <h1 className="text-[20px] font-bold text-[#111] mb-4 mt-2 leading-tight">{children}</h1>
  ),
  h2: ({ children }) => (
    <h2 className="text-[15px] font-semibold text-[#111] mb-3 mt-5">{children}</h2>
  ),
  h3: ({ children }) => (
    <h3 className="text-[13px] font-semibold text-[#222] mb-2 mt-4">{children}</h3>
  ),
  p: ({ children }) => (
    <p className="text-[11px] text-[#222] mb-2.5 leading-[1.65]">{children}</p>
  ),
  strong: ({ children }) => (
    <strong className="font-semibold text-[#111]">{children}</strong>
  ),
  em: ({ children }) => (
    <em className="italic text-[#444]">{children}</em>
  ),
  hr: () => (
    <hr className="my-4 border-t border-[#DDD]" />
  ),
  ul: ({ children }) => (
    <ul className="list-disc pl-5 mb-2.5 space-y-0.5">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal pl-5 mb-2.5 space-y-0.5">{children}</ol>
  ),
  li: ({ children }) => (
    <li className="text-[11px] text-[#222] leading-[1.65]">{children}</li>
  ),
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto">
      <table className="w-full border-collapse text-[10px]">{children}</table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-[#F5F5F5]">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border border-[#D0D0D0] px-2.5 py-1.5 text-left font-semibold text-[#111]">{children}</th>
  ),
  td: ({ children }) => (
    <td className="border border-[#DDD] px-2.5 py-1.5 text-[#222]">{children}</td>
  ),
}
