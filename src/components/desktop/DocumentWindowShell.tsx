import { X, Minus, Maximize2 } from 'lucide-react'

interface DocumentWindowShellProps {
  onClose: () => void
  titleBarColor: string
  title: React.ReactNode
  toolbar?: React.ReactNode
  statusBar?: React.ReactNode
  bodyBg: string
  children: React.ReactNode
}

export function DocumentWindowShell({
  onClose,
  titleBarColor,
  title,
  toolbar,
  statusBar,
  bodyBg,
  children,
}: DocumentWindowShellProps) {
  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-40" onClick={onClose} />

      <div className="fixed top-[6%] left-[10%] w-[80%] h-[82%] z-50 flex flex-col rounded-xl overflow-hidden shadow-2xl border border-black/10">
        {/* Title bar */}
        <div className="flex items-center h-9 px-3 shrink-0" style={{ backgroundColor: titleBarColor }}>
          <div className="flex items-center gap-2 mr-4">
            <button onClick={onClose} className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] hover:brightness-90" aria-label="Close window" />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#DEA123]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29]" />
          </div>

          <div className="flex items-center gap-2 text-white flex-1 min-w-0">
            {title}
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 hover:bg-white/10 rounded text-white/70" aria-label="Minimise">
              <Minus className="w-3.5 h-3.5" />
            </button>
            <button className="p-1 hover:bg-white/10 rounded text-white/70" aria-label="Maximise">
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
            <button onClick={onClose} className="p-1 hover:bg-red-500 rounded text-white/70" aria-label="Close">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {toolbar}

        {/* Document body */}
        <div className="flex-1 overflow-auto flex flex-col items-center gap-6 py-6" style={{ backgroundColor: bodyBg }}>
          {children}
        </div>

        {statusBar}
      </div>
    </>
  )
}
