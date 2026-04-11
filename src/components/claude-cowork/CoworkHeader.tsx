import { cn } from '../../utils/cn'

const tabs = [
  { id: 'chat', label: 'Chat' },
  { id: 'cowork', label: 'Cowork' },
  { id: 'code', label: 'Code' },
]

export function CoworkHeader() {
  return (
    <div className="flex items-center justify-center gap-1 px-4 py-2 bg-white border-b border-gray-200">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={cn(
            'px-4 py-1.5 text-sm font-medium rounded-lg transition-colors',
            tab.id === 'cowork'
              ? 'bg-gray-900 text-white'
              : 'text-gray-500 hover:bg-gray-100'
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  )
}
