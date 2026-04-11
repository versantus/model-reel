import { CheckCircle2, AlertCircle, MessageCircle } from 'lucide-react'
import { cn } from '../../utils/cn'
import type { CoworkNotificationEvent } from '../../types/simulation'

interface NotificationBannerProps {
  notification: CoworkNotificationEvent
}

export function NotificationBanner({ notification }: NotificationBannerProps) {
  const configs = {
    finished: {
      icon: CheckCircle2,
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      iconColor: 'text-green-500',
    },
    'needs-input': {
      icon: MessageCircle,
      bg: 'bg-amber-50 border-amber-200',
      text: 'text-amber-800',
      iconColor: 'text-amber-500',
    },
    error: {
      icon: AlertCircle,
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      iconColor: 'text-red-500',
    },
  }

  const config = configs[notification.notificationType]
  const Icon = config.icon

  return (
    <div className={cn('flex items-center gap-3 px-6 py-3 border-b', config.bg)}>
      <Icon className={cn('w-5 h-5', config.iconColor)} />
      <p className={cn('text-sm font-medium', config.text)}>{notification.message}</p>
    </div>
  )
}
