import { useEffect, useRef } from 'react'

const BOTTOM_THRESHOLD_PX = 40

export function useAutoScroll(deps: unknown[]) {
  const ref = useRef<HTMLDivElement>(null)
  const stuckToBottom = useRef(true)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const onScroll = () => {
      const distanceFromBottom = el.scrollHeight - el.scrollTop - el.clientHeight
      stuckToBottom.current = distanceFromBottom <= BOTTOM_THRESHOLD_PX
    }
    el.addEventListener('scroll', onScroll, { passive: true })
    return () => el.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (stuckToBottom.current) {
      el.scrollTop = el.scrollHeight
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
