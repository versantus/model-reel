import { DesktopShell } from './components/desktop/DesktopShell'
import { LandingScreen } from './components/layout/LandingScreen'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useSimulationStore } from './store/simulation-store'
import { useDemoCatalogStore } from './store/demo-catalog-store'
import { builtinDemos } from './demos/demo-loader'
import { useEffect } from 'react'

function App() {
  useKeyboardShortcuts()
  const simulation = useSimulationStore((s) => s.simulation)
  const registerBuiltin = useDemoCatalogStore((s) => s.registerBuiltin)

  // Register built-in demos on first mount
  useEffect(() => {
    registerBuiltin(builtinDemos)
  }, [registerBuiltin])

  if (!simulation) {
    return <LandingScreen />
  }

  return <DesktopShell />
}

export default App
