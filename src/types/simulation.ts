export type ProductType = 'claude-code' | 'claude-chat' | 'claude-cowork' | 'chatgpt'

export interface Simulation {
  id: string
  title: string
  description: string
  productType: ProductType
  createdAt: string
  updatedAt: string
  metadata: SimulationMetadata
  events: SimulationEvent[]
}

export interface SimulationMetadata {
  codeConfig?: CodeConfig
  chatConfig?: ChatConfig
  coworkConfig?: CoworkConfig
  gptConfig?: GptConfig
}

export interface CodeConfig {
  modelName: string
  gitBranch: string
  workingDirectory: string
  initialCost: string
  initialContext: number
}

export interface ChatConfig {
  modelName: string
  theme: 'light' | 'dark'
  conversationTitle: string
  sidebarConversations: SidebarConversation[]
  projects: SidebarProject[]
}

export interface CoworkConfig {
  taskTitle: string
  folderPath: string
  suggestions: string[]
}

export interface GptConfig {
  modelName: string
  theme: 'light' | 'dark'
  conversationTitle: string
  sidebarConversations: SidebarConversation[]
}

export interface SidebarConversation {
  id: string
  title: string
  timestamp: string
  isActive: boolean
}

export interface SidebarProject {
  id: string
  name: string
  conversationCount: number
}

// --- Events ---

export type SimulationEvent =
  | UserMessageEvent
  | AssistantMessageEvent
  | ToolCallEvent
  | ToolResultEvent
  | PermissionPromptEvent
  | PermissionResponseEvent
  | ThinkingEvent
  | StatusBarUpdateEvent
  | ArtifactEvent
  | CoworkProgressEvent
  | CoworkNotificationEvent
  | PauseEvent
  | CodeInterpreterEvent

interface BaseEvent {
  id: string
  type: string
  delayMs: number
  durationMs?: number
}

export type AttachmentKind = 'spreadsheet' | 'pdf' | 'image' | 'document' | 'code' | 'other'

export interface MessageAttachment {
  name: string
  kind: AttachmentKind
  size?: string
  sheetCount?: number
}

export interface UserMessageEvent extends BaseEvent {
  type: 'user-message'
  content: string
  typingEffect: boolean
  attachments?: MessageAttachment[]
}

export interface AssistantMessageEvent extends BaseEvent {
  type: 'assistant-message'
  content: string
  streamingSpeed: 'slow' | 'normal' | 'fast'
}

export interface ToolCallEvent extends BaseEvent {
  type: 'tool-call'
  toolName: string
  toolInput: Record<string, unknown>
  description?: string
  expandedByDefault: boolean
}

export interface ToolResultEvent extends BaseEvent {
  type: 'tool-result'
  toolCallId: string
  output: string
  isError: boolean
  isCollapsed: boolean
}

export interface PermissionPromptEvent extends BaseEvent {
  type: 'permission-prompt'
  toolName: string
  description: string
  command?: string
}

export interface PermissionResponseEvent extends BaseEvent {
  type: 'permission-response'
  promptId: string
  response: 'allow' | 'deny' | 'allow-always'
}

export interface ThinkingEvent extends BaseEvent {
  type: 'thinking'
  label?: string
}

export interface StatusBarUpdateEvent extends BaseEvent {
  type: 'status-bar-update'
  updates: {
    cost?: string
    contextPercent?: number
    modelName?: string
    gitBranch?: string
  }
}

export interface ArtifactEvent extends BaseEvent {
  type: 'artifact'
  artifactType: 'code' | 'html' | 'react' | 'markdown' | 'svg' | 'word' | 'pdf'
  title: string
  content: string
  language?: string
}

export interface CoworkProgressEvent extends BaseEvent {
  type: 'cowork-progress'
  stepIndex: number
  stepLabel: string
  status: 'pending' | 'running' | 'complete' | 'error'
  detail?: string
}

export interface CoworkNotificationEvent extends BaseEvent {
  type: 'cowork-notification'
  notificationType: 'finished' | 'needs-input' | 'error'
  message: string
}

export interface PauseEvent extends BaseEvent {
  type: 'pause'
}

export interface CodeInterpreterEvent extends BaseEvent {
  type: 'code-interpreter'
  language: 'python'
  code: string
  output: string
  analyzingLabel?: string
  analyzedLabel?: string
  expandedByDefault?: boolean
}

// --- Rendered state ---

export interface RenderedEvent {
  event: SimulationEvent
  progress: number // 0-1, for streaming events
  isComplete: boolean
}

export interface StatusBarState {
  modelName: string
  gitBranch: string
  cost: string
  contextPercent: number
}
