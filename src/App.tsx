import { DesktopShell } from './components/desktop/DesktopShell'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'
import { useDeepLink } from './hooks/useDeepLink'

function App() {
  useKeyboardShortcuts()
  useDeepLink()
  return <DesktopShell />
}

export default App
