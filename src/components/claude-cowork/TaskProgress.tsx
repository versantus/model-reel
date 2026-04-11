import { CheckCircle2, XCircle, Loader2, Circle } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { CoworkProgressEvent } from '../../types/simulation'

interface TaskProgressProps {
  steps: CoworkProgressEvent[]
}

export function TaskProgress({ steps }: TaskProgressProps) {
  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <div key={step.stepIndex} className="flex gap-3">
          <div className="mt-0.5">
            {step.status === 'complete' && <CheckCircle2 className="w-5 h-5 text-green-500" />}
            {step.status === 'running' && <Loader2 className="w-5 h-5 text-claude-purple animate-spin-slow" />}
            {step.status === 'error' && <XCircle className="w-5 h-5 text-red-500" />}
            {step.status === 'pending' && <Circle className="w-5 h-5 text-gray-300" />}
          </div>
          <div className="flex-1">
            <p className={cn(
              'text-sm font-medium',
              step.status === 'complete' ? 'text-gray-700' : step.status === 'running' ? 'text-gray-900' : 'text-gray-500'
            )}>
              {step.stepLabel}
            </p>
            {step.detail && (
              <p className="text-xs text-gray-500 mt-0.5">{step.detail}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
