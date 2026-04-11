import { ChevronDown } from 'lucide-react'

interface ModelSelectorProps {
  modelName: string
}

export function ModelSelector({ modelName }: ModelSelectorProps) {
  return (
    <button className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
      <span>{modelName}</span>
      <ChevronDown className="w-3.5 h-3.5" />
    </button>
  )
}
