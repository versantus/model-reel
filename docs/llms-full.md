# Model Reel — Simulation Authoring Reference

> **Version:** 1.0 | **Source:** `src/types/simulation.ts`, `src/engine/playback-engine.ts`
>
> This file is the complete reference for authoring Model Reel simulation JSON.
> An AI agent can read this file and produce valid simulation JSON without reading source code.

---

## Simulation Root

A simulation is a single JSON object with these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier (any string, e.g. `"my-demo-1"`) |
| `title` | string | Yes | Display name shown in the simulation picker |
| `description` | string | Yes | Short description (can be empty string) |
| `productType` | string | Yes | One of: `"claude-code"`, `"claude-chat"`, `"claude-cowork"` |
| `createdAt` | string | Yes | ISO 8601 timestamp (e.g. `"2026-04-12T00:00:00Z"`) |
| `updatedAt` | string | Yes | ISO 8601 timestamp |
| `metadata` | object | Yes | Must contain exactly one config matching `productType` |
| `events` | array | Yes | Ordered list of event objects to play back |

The `metadata` object has three optional fields. Exactly one should be set, matching the `productType`:

| productType | metadata field |
|-------------|---------------|
| `"claude-code"` | `metadata.codeConfig` |
| `"claude-chat"` | `metadata.chatConfig` |
| `"claude-cowork"` | `metadata.coworkConfig` |

---

## Metadata Configs

### CodeConfig (for productType `"claude-code"`)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `modelName` | string | Yes | `"claude-opus-4-6"` |
| `gitBranch` | string | Yes | `"main"`, `"feature/auth"` |
| `workingDirectory` | string | Yes | `"/Users/dev/myproject"` |
| `initialCost` | string | Yes | `"$0.00"` |
| `initialContext` | number | Yes | Percentage 0–100, e.g. `3` |

### ChatConfig (for productType `"claude-chat"`)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `modelName` | string | Yes | `"Claude Opus 4"` |
| `theme` | string | Yes | `"light"` or `"dark"` |
| `conversationTitle` | string | Yes | Title shown in the header |
| `sidebarConversations` | array | Yes | List of `SidebarConversation` objects |
| `projects` | array | Yes | List of `SidebarProject` objects |

**SidebarConversation:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `title` | string | Yes | Conversation title |
| `timestamp` | string | Yes | Display text, e.g. `"Just now"`, `"2h ago"` |
| `isActive` | boolean | Yes | `true` for the current conversation |

**SidebarProject:**

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier |
| `name` | string | Yes | Project name |
| `conversationCount` | number | Yes | Number of conversations in project |

### CoworkConfig (for productType `"claude-cowork"`)

| Field | Type | Required | Example |
|-------|------|----------|---------|
| `taskTitle` | string | Yes | Title of the task |
| `folderPath` | string | Yes | `"/Users/dev/project"` |
| `suggestions` | array | Yes | List of suggestion strings shown in the UI |

---

## Event System

Events are played back in array order. Each event extends a base with these fields:

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique identifier within the simulation |
| `type` | string | Yes | Event type (see below) |
| `delayMs` | number | Yes | Milliseconds to wait before this event starts |
| `durationMs` | number | No | Override the calculated duration (ms) |

The effective delay before an event starts is:

```
effective_delay = max(event.delayMs, MIN_DELAY[event.type]) / playback_speed
```

**MIN_DELAY values (milliseconds):**

| Event type | MIN_DELAY |
|------------|-----------|
| `thinking` | 800 |
| `assistant-message` | 600 |
| `tool-call` | 500 |
| `tool-result` | 400 |
| `artifact` | 1500 |
| `cowork-progress` | 400 |
| `cowork-notification` | 600 |
| all other types | 0 |

---

## Event Types

### 1. `user-message`

**Applicable to:** all product types

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | The message text |
| `typingEffect` | boolean | Yes | `true` = animate typing character by character |

**Default duration:** `typingEffect ? (content.length / 30) * 1000 : 0`

### 2. `assistant-message`

**Applicable to:** all product types

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `content` | string | Yes | Message text (supports markdown) |
| `streamingSpeed` | string | Yes | One of: `"slow"`, `"normal"`, `"fast"` |

**Default duration:** `(content.length / characters_per_second) * 1000`

| Speed | Characters/second |
|-------|-------------------|
| `"slow"` | 8 |
| `"normal"` | 20 |
| `"fast"` | 45 |

### 3. `tool-call`

**Applicable to:** `claude-code`, `claude-cowork`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `toolName` | string | Yes | e.g. `"Read"`, `"Edit"`, `"Bash"`, `"Grep"`, `"Write"` |
| `toolInput` | object | Yes | Parameter object (any shape) |
| `description` | string | No | Human-readable label shown in the UI |
| `expandedByDefault` | boolean | Yes | `true` = card starts open, `false` = collapsed |

**Default duration:** 600ms

### 4. `tool-result`

**Applicable to:** `claude-code`, `claude-cowork`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `toolCallId` | string | Yes | Must match the `id` of a preceding `tool-call` event |
| `output` | string | Yes | Result text |
| `isError` | boolean | Yes | `true` if the result indicates an error |
| `isCollapsed` | boolean | Yes | `true` = result shown collapsed initially |

**Default duration:** 400ms

### 5. `permission-prompt`

**Applicable to:** `claude-code`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `toolName` | string | Yes | The tool requesting permission |
| `description` | string | Yes | What permission is being requested |
| `command` | string | No | The actual command/action |

**Default duration:** 0 (waits for a `permission-response` event)

### 6. `permission-response`

**Applicable to:** `claude-code`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `promptId` | string | Yes | Must match the `id` of a preceding `permission-prompt` event |
| `response` | string | Yes | One of: `"allow"`, `"deny"`, `"allow-always"` |

**Default duration:** 200ms

### 7. `thinking`

**Applicable to:** all product types

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `label` | string | No | Text shown during thinking, e.g. `"Analyzing codebase..."` |

**Default duration:** 3500ms (override with `durationMs`)

### 8. `status-bar-update`

**Applicable to:** `claude-code`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `updates` | object | Yes | Partial update object (see below) |

The `updates` object can contain any of:

| Field | Type | Description |
|-------|------|-------------|
| `cost` | string | e.g. `"$0.03"` |
| `contextPercent` | number | 0–100 |
| `modelName` | string | e.g. `"claude-opus-4-6"` |
| `gitBranch` | string | e.g. `"feature/auth"` |

**Default duration:** 0 (instant)

### 9. `artifact`

**Applicable to:** `claude-chat`, `claude-cowork`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `artifactType` | string | Yes | One of: `"code"`, `"html"`, `"react"`, `"markdown"`, `"svg"`, `"word"`, `"pdf"` |
| `title` | string | Yes | Title shown on the artifact card |
| `content` | string | Yes | Full source code, HTML, or markdown content |
| `language` | string | No | Syntax highlight hint for `"code"` type (e.g. `"tsx"`, `"python"`) |

**Default duration:** 2500ms

**Routing:**
- `"word"` or `"pdf"` → opens in a simulated document viewer
- All others → opens in a simulated Chrome browser window

### 10. `cowork-progress`

**Applicable to:** `claude-cowork`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `stepIndex` | number | Yes | 0-based step number in the task |
| `stepLabel` | string | Yes | e.g. `"Scanning project structure"` |
| `status` | string | Yes | One of: `"pending"`, `"running"`, `"complete"`, `"error"` |
| `detail` | string | No | Additional status text |

**Default duration:** 500ms

> Events with the same `stepIndex` update the same step in the sidebar.

### 11. `cowork-notification`

**Applicable to:** `claude-cowork`

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `notificationType` | string | Yes | One of: `"finished"`, `"needs-input"`, `"error"` |
| `message` | string | Yes | Notification text |

**Default duration:** 300ms

### 12. `pause`

**Applicable to:** all product types

No additional fields beyond the base fields.

**Default duration:** 2000ms (override with `durationMs`)

Use this to create a deliberate break between conversation turns.

---

## Special Conventions

### Page breaks in documents

For `"word"` and `"pdf"` artifact types, split content into multiple pages by inserting the literal string `---PAGE---` on its own line:

```
"content": "# Page 1 content\n\n---PAGE---\n\n# Page 2 content"
```

Each section becomes a separate rendered page in the document viewer.

### Event cross-references

- `tool-result.toolCallId` must match a preceding `tool-call.id`
- `permission-response.promptId` must match a preceding `permission-prompt.id`

### Event IDs

Must be unique within the simulation. Any string format works.
Convention: short descriptive strings like `"e1"`, `"msg-1"`, `"tool-read-1"`.

### Markdown in content

- `assistant-message` content supports markdown (bold, italic, lists, code blocks).
- `word`/`pdf` artifact content supports markdown including tables (GFM syntax).

---

## Recommended Timing Patterns

These values produce natural-feeling playback at 1x speed:

| Pattern | delayMs | durationMs / speed |
|---------|---------|-------------------|
| First user message | `0` | `typingEffect: true` or `false` |
| Thinking after user message | `300`–`500` | `800`–`1500` |
| Assistant after thinking | `200`–`300` | `streamingSpeed: "normal"` |
| Tool call after assistant | `200`–`400` | (default 600) |
| Tool result after tool call | `100` | (default 400) |
| Artifact after assistant | `400`–`600` | (default 2500) |
| Status bar update | `0` | (instant) |
| Gap between conversation turns | `500`–`1500` | (use `pause` event or `delayMs`) |

A typical turn looks like:

```
user-message → thinking → assistant-message → [tool-call → tool-result]* → assistant-message
```

---

## Complete Example: Claude Code

```json
{
  "id": "example-code",
  "title": "Code Demo",
  "description": "A minimal Claude Code simulation",
  "productType": "claude-code",
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z",
  "metadata": {
    "codeConfig": {
      "modelName": "claude-opus-4-6",
      "gitBranch": "main",
      "workingDirectory": "/Users/dev/project",
      "initialCost": "$0.00",
      "initialContext": 3
    }
  },
  "events": [
    {
      "id": "e1",
      "type": "user-message",
      "delayMs": 0,
      "content": "Add a hello world endpoint to the Express server",
      "typingEffect": true
    },
    {
      "id": "e2",
      "type": "thinking",
      "delayMs": 400,
      "durationMs": 1200,
      "label": "Reading project files..."
    },
    {
      "id": "e3",
      "type": "tool-call",
      "delayMs": 200,
      "toolName": "Read",
      "toolInput": { "file_path": "/Users/dev/project/src/server.ts" },
      "description": "Reading server.ts",
      "expandedByDefault": false
    },
    {
      "id": "e4",
      "type": "tool-result",
      "delayMs": 100,
      "toolCallId": "e3",
      "output": "import express from 'express'\nconst app = express()\napp.listen(3000)",
      "isError": false,
      "isCollapsed": true
    },
    {
      "id": "e5",
      "type": "tool-call",
      "delayMs": 300,
      "toolName": "Edit",
      "toolInput": {
        "file_path": "/Users/dev/project/src/server.ts",
        "old_string": "app.listen(3000)",
        "new_string": "app.get('/hello', (req, res) => {\n  res.json({ message: 'Hello, world!' })\n})\n\napp.listen(3000)"
      },
      "description": "Adding hello world endpoint",
      "expandedByDefault": true
    },
    {
      "id": "e6",
      "type": "tool-result",
      "delayMs": 100,
      "toolCallId": "e5",
      "output": "File edited successfully.",
      "isError": false,
      "isCollapsed": false
    },
    {
      "id": "e7",
      "type": "status-bar-update",
      "delayMs": 0,
      "updates": { "cost": "$0.02", "contextPercent": 5 }
    },
    {
      "id": "e8",
      "type": "assistant-message",
      "delayMs": 300,
      "content": "I've added a GET `/hello` endpoint that returns a JSON greeting. You can test it with `curl http://localhost:3000/hello`.",
      "streamingSpeed": "normal"
    }
  ]
}
```

## Complete Example: Claude Chat

```json
{
  "id": "example-chat",
  "title": "Chat Demo",
  "description": "A minimal Claude Chat simulation with an artifact",
  "productType": "claude-chat",
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z",
  "metadata": {
    "chatConfig": {
      "modelName": "Claude Opus 4",
      "theme": "light",
      "conversationTitle": "Quick question",
      "sidebarConversations": [
        { "id": "c1", "title": "Quick question", "timestamp": "Just now", "isActive": true }
      ],
      "projects": []
    }
  },
  "events": [
    {
      "id": "e1",
      "type": "user-message",
      "delayMs": 0,
      "content": "Create a simple landing page for a coffee shop",
      "typingEffect": false
    },
    {
      "id": "e2",
      "type": "thinking",
      "delayMs": 300,
      "durationMs": 1000
    },
    {
      "id": "e3",
      "type": "assistant-message",
      "delayMs": 200,
      "content": "Here's a clean landing page for your coffee shop:",
      "streamingSpeed": "fast"
    },
    {
      "id": "e4",
      "type": "artifact",
      "delayMs": 400,
      "artifactType": "html",
      "title": "Coffee Shop Landing Page",
      "content": "<!DOCTYPE html><html><head><title>Bean & Brew</title></head><body><h1>Bean & Brew</h1><p>Fresh coffee, every morning.</p></body></html>"
    },
    {
      "id": "e5",
      "type": "assistant-message",
      "delayMs": 500,
      "content": "The page includes a hero section with your shop name. Want me to add a menu or contact section?",
      "streamingSpeed": "normal"
    }
  ]
}
```

## Complete Example: Claude Cowork

```json
{
  "id": "example-cowork",
  "title": "Cowork Demo",
  "description": "A minimal Claude Cowork simulation",
  "productType": "claude-cowork",
  "createdAt": "2026-01-01T00:00:00Z",
  "updatedAt": "2026-01-01T00:00:00Z",
  "metadata": {
    "coworkConfig": {
      "taskTitle": "Organise project files",
      "folderPath": "/Users/dev/project",
      "suggestions": ["Organise files", "Analyse data", "Draft document"]
    }
  },
  "events": [
    {
      "id": "e1",
      "type": "user-message",
      "delayMs": 0,
      "content": "Organise the files in this project by type",
      "typingEffect": true
    },
    {
      "id": "e2",
      "type": "thinking",
      "delayMs": 500,
      "durationMs": 1000,
      "label": "Planning approach..."
    },
    {
      "id": "e3",
      "type": "cowork-progress",
      "delayMs": 300,
      "stepIndex": 0,
      "stepLabel": "Scanning project structure",
      "status": "running",
      "detail": "Reading directory tree..."
    },
    {
      "id": "e4",
      "type": "cowork-progress",
      "delayMs": 2000,
      "stepIndex": 0,
      "stepLabel": "Scanning project structure",
      "status": "complete",
      "detail": "Found 47 files across 12 directories"
    },
    {
      "id": "e5",
      "type": "cowork-progress",
      "delayMs": 300,
      "stepIndex": 1,
      "stepLabel": "Reorganising file structure",
      "status": "running"
    },
    {
      "id": "e6",
      "type": "cowork-progress",
      "delayMs": 3000,
      "stepIndex": 1,
      "stepLabel": "Reorganising file structure",
      "status": "complete",
      "detail": "Moved 23 files, created 4 new directories"
    },
    {
      "id": "e7",
      "type": "cowork-notification",
      "delayMs": 500,
      "notificationType": "finished",
      "message": "Project organisation complete! Reorganised 23 files."
    }
  ]
}
```

---

## Validation Checklist

Before submitting a simulation JSON, verify:

- [ ] Every event has `id`, `type`, and `delayMs`
- [ ] All event IDs are unique within the simulation
- [ ] `productType` is one of: `"claude-code"`, `"claude-chat"`, `"claude-cowork"`
- [ ] `metadata` contains the matching config (`codeConfig`, `chatConfig`, or `coworkConfig`)
- [ ] `createdAt` and `updatedAt` are ISO 8601 strings
- [ ] `tool-result.toolCallId` matches an earlier `tool-call` event's `id`
- [ ] `permission-response.promptId` matches an earlier `permission-prompt` event's `id`
- [ ] `streamingSpeed` is one of: `"slow"`, `"normal"`, `"fast"`
- [ ] `artifactType` is one of: `"code"`, `"html"`, `"react"`, `"markdown"`, `"svg"`, `"word"`, `"pdf"`
- [ ] `cowork-progress` status is one of: `"pending"`, `"running"`, `"complete"`, `"error"`
- [ ] `cowork-notification` notificationType is one of: `"finished"`, `"needs-input"`, `"error"`
- [ ] `permission-response` response is one of: `"allow"`, `"deny"`, `"allow-always"`
- [ ] Word/PDF content using `---PAGE---` has the separator on its own line
- [ ] JSON is valid (no trailing commas, proper quoting)
