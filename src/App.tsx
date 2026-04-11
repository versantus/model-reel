import { DesktopShell } from './components/desktop/DesktopShell'
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts'

function App() {
  useKeyboardShortcuts()
  return <DesktopShell />
}

export default App
