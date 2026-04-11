import type { Simulation } from '../types/simulation'

export const sampleClaudeCodeSimulation: Simulation = {
  id: 'sample-code-1',
  title: 'Claude Code Demo',
  description: 'A sample Claude Code session showing file editing',
  productType: 'claude-code',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    codeConfig: {
      modelName: 'claude-opus-4-6',
      gitBranch: 'feature/auth',
      workingDirectory: '/Users/dev/myproject',
      initialCost: '$0.00',
      initialContext: 3,
    },
  },
  events: [
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'Can you add input validation to the login form?',
      typingEffect: true,
    },
    {
      id: 'e2',
      type: 'thinking',
      delayMs: 300,
      durationMs: 1200,
      label: 'Analyzing codebase...',
    },
    {
      id: 'e3',
      type: 'tool-call',
      delayMs: 200,
      toolName: 'Read',
      toolInput: { file_path: '/Users/dev/myproject/src/components/LoginForm.tsx' },
      description: 'Reading LoginForm.tsx',
      expandedByDefault: false,
    },
    {
      id: 'e4',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'e3',
      output: `import { useState } from 'react'\n\nexport function LoginForm() {\n  const [email, setEmail] = useState('')\n  const [password, setPassword] = useState('')\n\n  const handleSubmit = (e: React.FormEvent) => {\n    e.preventDefault()\n    // TODO: add validation\n    fetch('/api/login', {\n      method: 'POST',\n      body: JSON.stringify({ email, password }),\n    })\n  }\n\n  return (\n    <form onSubmit={handleSubmit}>\n      <input value={email} onChange={e => setEmail(e.target.value)} />\n      <input type="password" value={password} onChange={e => setPassword(e.target.value)} />\n      <button type="submit">Login</button>\n    </form>\n  )\n}`,
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'e5',
      type: 'assistant-message',
      delayMs: 300,
      content: "I can see the LoginForm component needs validation. Let me add email format validation and password length requirements.",
      streamingSpeed: 'normal',
    },
    {
      id: 'e6',
      type: 'tool-call',
      delayMs: 400,
      toolName: 'Edit',
      toolInput: {
        file_path: '/Users/dev/myproject/src/components/LoginForm.tsx',
        old_string: '    // TODO: add validation\n    fetch',
        new_string: '    const errors: string[] = []\n    if (!email.match(/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/)) {\n      errors.push(\'Invalid email format\')\n    }\n    if (password.length < 8) {\n      errors.push(\'Password must be at least 8 characters\')\n    }\n    if (errors.length > 0) {\n      setValidationErrors(errors)\n      return\n    }\n    fetch',
      },
      description: 'Adding validation logic to LoginForm.tsx',
      expandedByDefault: true,
    },
    {
      id: 'e7',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'e6',
      output: 'File edited successfully.',
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'e8',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.03', contextPercent: 8 },
    },
    {
      id: 'e9',
      type: 'assistant-message',
      delayMs: 300,
      content: "I've added input validation to the login form:\n\n- **Email validation** using a regex pattern to check for valid email format\n- **Password validation** requiring at least 8 characters\n- Validation errors are collected and displayed before the API call is made\n\nYou'll also need to add a `validationErrors` state variable and render the errors in the form. Would you like me to add that as well?",
      streamingSpeed: 'normal',
    },
  ],
}

export const sampleClaudeChatSimulation: Simulation = {
  id: 'sample-chat-1',
  title: 'Claude Chat Demo',
  description: 'A sample Claude Chat conversation with an artifact',
  productType: 'claude-chat',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'Claude Opus 4',
      theme: 'light',
      conversationTitle: 'React component help',
      sidebarConversations: [
        { id: 'c1', title: 'React component help', timestamp: 'Just now', isActive: true },
        { id: 'c2', title: 'Python data analysis', timestamp: '2h ago', isActive: false },
        { id: 'c3', title: 'API design review', timestamp: 'Yesterday', isActive: false },
        { id: 'c4', title: 'Docker setup help', timestamp: 'Yesterday', isActive: false },
        { id: 'c5', title: 'SQL query optimization', timestamp: 'Apr 9', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Web App Redesign', conversationCount: 12 },
        { id: 'p2', name: 'Backend API', conversationCount: 8 },
      ],
    },
  },
  events: [
    {
      id: 'ce1',
      type: 'user-message',
      delayMs: 0,
      content: 'Can you create a React counter component with increment and decrement buttons?',
      typingEffect: false,
    },
    {
      id: 'ce2',
      type: 'thinking',
      delayMs: 200,
      durationMs: 800,
    },
    {
      id: 'ce3',
      type: 'assistant-message',
      delayMs: 200,
      content: "Here's a clean React counter component with increment and decrement buttons, using hooks for state management:",
      streamingSpeed: 'normal',
    },
    {
      id: 'ce4',
      type: 'artifact',
      delayMs: 300,
      artifactType: 'code',
      title: 'Counter.tsx',
      language: 'tsx',
      content: `import { useState } from 'react'

export function Counter() {
  const [count, setCount] = useState(0)

  return (
    <div className="flex items-center gap-4 p-6">
      <button
        onClick={() => setCount(c => c - 1)}
        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        -
      </button>
      <span className="text-2xl font-bold min-w-[3ch] text-center">
        {count}
      </span>
      <button
        onClick={() => setCount(c => c + 1)}
        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
      >
        +
      </button>
    </div>
  )
}`,
    },
    {
      id: 'ce5',
      type: 'assistant-message',
      delayMs: 400,
      content: "The component uses `useState` to track the count value. The decrement button subtracts 1, and the increment button adds 1. The count is displayed between the buttons with a minimum width to prevent layout shifts.\n\nWould you like me to create a live preview so you can try it out in the browser?",
      streamingSpeed: 'normal',
    },
    // ── Turn 2: User wants preview ──
    {
      id: 'ce6',
      type: 'user-message',
      delayMs: 1200,
      content: 'Yes please!',
      typingEffect: false,
    },
    {
      id: 'ce7',
      type: 'thinking',
      delayMs: 200,
      durationMs: 600,
    },
    {
      id: 'ce8',
      type: 'assistant-message',
      delayMs: 200,
      content: "Here's a live preview of the Counter component — you can click the buttons to try it out:",
      streamingSpeed: 'fast',
    },
    {
      id: 'ce9',
      type: 'artifact',
      delayMs: 300,
      artifactType: 'html',
      title: 'Counter Component Preview',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Counter Preview</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; background: #f9fafb; display: flex; align-items: center; justify-content: center; min-height: 100vh; }
  .card { background: #fff; border-radius: 20px; padding: 40px 48px; box-shadow: 0 4px 24px rgba(0,0,0,.06); text-align: center; }
  h2 { font-size: 14px; color: #6b7280; font-weight: 500; margin-bottom: 24px; text-transform: uppercase; letter-spacing: 1px; }
  .counter { display: flex; align-items: center; gap: 24px; }
  button { width: 56px; height: 56px; border-radius: 16px; border: none; font-size: 24px; font-weight: 700; cursor: pointer; transition: all .15s; }
  .dec { background: #fef2f2; color: #ef4444; }
  .dec:hover { background: #fee2e2; }
  .dec:active { transform: scale(.95); }
  .inc { background: #f0fdf4; color: #22c55e; }
  .inc:hover { background: #dcfce7; }
  .inc:active { transform: scale(.95); }
  .count { font-size: 48px; font-weight: 800; color: #111827; min-width: 80px; transition: transform .1s; }
  .count.bump { transform: scale(1.1); }
  .reset { margin-top: 20px; padding: 8px 20px; border-radius: 10px; border: 1px solid #e5e7eb; background: #fff; color: #6b7280; font-size: 13px; font-weight: 500; cursor: pointer; }
  .reset:hover { background: #f9fafb; }
</style>
</head>
<body>
<div class="card">
  <h2>Counter Component</h2>
  <div class="counter">
    <button class="dec" onclick="update(-1)">−</button>
    <div class="count" id="count">0</div>
    <button class="inc" onclick="update(1)">+</button>
  </div>
  <button class="reset" onclick="reset()">Reset</button>
</div>
<script>
let count = 0;
const el = document.getElementById('count');
function update(d) {
  count += d;
  el.textContent = count;
  el.classList.add('bump');
  setTimeout(() => el.classList.remove('bump'), 100);
}
function reset() { count = 0; el.textContent = '0'; }
</script>
</body>
</html>`,
    },
    {
      id: 'ce10',
      type: 'assistant-message',
      delayMs: 500,
      content: "The preview is live! Click the **+** and **−** buttons to change the count. I also added a Reset button and a subtle scale animation when the count changes.\n\nWould you like me to add any other features — maybe a step size control or a history of values?",
      streamingSpeed: 'normal',
    },
  ],
}

export const sampleCoworkSimulation: Simulation = {
  id: 'sample-cowork-1',
  title: 'Cowork Demo',
  description: 'A sample Claude Cowork task organizing files',
  productType: 'claude-cowork',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    coworkConfig: {
      taskTitle: 'Organize project files',
      folderPath: '/Users/dev/messy-project',
      suggestions: ['Organize files', 'Crunch data', 'Research topic', 'Draft document'],
    },
  },
  events: [
    {
      id: 'cw1',
      type: 'user-message',
      delayMs: 0,
      content: 'Organize the files in this project by type and clean up unused dependencies',
      typingEffect: true,
    },
    {
      id: 'cw2',
      type: 'thinking',
      delayMs: 500,
      durationMs: 1000,
      label: 'Planning approach...',
    },
    {
      id: 'cw3',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 0,
      stepLabel: 'Scanning project structure',
      status: 'running',
      detail: 'Reading directory tree...',
    },
    {
      id: 'cw4',
      type: 'cowork-progress',
      delayMs: 2000,
      stepIndex: 0,
      stepLabel: 'Scanning project structure',
      status: 'complete',
      detail: 'Found 47 files across 12 directories',
    },
    {
      id: 'cw5',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 1,
      stepLabel: 'Analyzing file types and dependencies',
      status: 'running',
    },
    {
      id: 'cw6',
      type: 'cowork-progress',
      delayMs: 3000,
      stepIndex: 1,
      stepLabel: 'Analyzing file types and dependencies',
      status: 'complete',
      detail: 'Identified 5 unused packages',
    },
    {
      id: 'cw7',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 2,
      stepLabel: 'Reorganizing file structure',
      status: 'running',
      detail: 'Moving files to appropriate directories...',
    },
    {
      id: 'cw8',
      type: 'cowork-progress',
      delayMs: 4000,
      stepIndex: 2,
      stepLabel: 'Reorganizing file structure',
      status: 'complete',
      detail: 'Moved 23 files, created 4 new directories',
    },
    {
      id: 'cw9',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 3,
      stepLabel: 'Removing unused dependencies',
      status: 'running',
    },
    {
      id: 'cw10',
      type: 'cowork-progress',
      delayMs: 2000,
      stepIndex: 3,
      stepLabel: 'Removing unused dependencies',
      status: 'complete',
      detail: 'Removed: lodash, moment, classnames, uuid, chalk',
    },
    {
      id: 'cw11',
      type: 'cowork-notification',
      delayMs: 500,
      notificationType: 'finished',
      message: 'Project organization complete! Reorganized 23 files and removed 5 unused packages.',
    },
  ],
}
