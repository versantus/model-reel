import type { Simulation } from '../types/simulation'

export const enableOpenDayDemo: Simulation = {
  id: 'enable-open-day-email',
  title: 'Enable Open Day — Draft, rewrite, send',
  description: 'Draft an email about the Enable open day, tone it down, then send it via Gmail. Shows Cowork handling the full email workflow.',
  productType: 'claude-cowork',
  createdAt: '2026-04-16T00:00:00Z',
  updatedAt: '2026-04-16T00:00:00Z',
  metadata: {
    coworkConfig: {
      taskTitle: 'Email Andy about Enable open day',
      folderPath: '/Users/nik/Documents',
      suggestions: ['Draft an email', 'Check calendar', 'Summarise notes'],
    },
  },
  events: [
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'Write an email to Andy about the Enable open day. We were promised a slot to present Versantus AI services to the attendees and now they\'ve moved us to a tiny room at the back with no footfall. I\'m really annoyed — we\'ve spent two weeks prepping materials and a live demo. His email is andy@enablenetwork.org.uk.',
      typingEffect: true,
    },
    {
      id: 'e2',
      type: 'thinking',
      delayMs: 500,
      durationMs: 1200,
      label: 'Drafting email...',
    },

    // Step 0: Draft email
    {
      id: 'e3',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 0,
      stepLabel: 'Drafting email to Andy',
      status: 'running',
    },
    {
      id: 'e4',
      type: 'assistant-message',
      delayMs: 300,
      content: `Here's a draft:

**To:** andy@enablenetwork.org.uk
**Subject:** Open Day — presentation slot change

Andy,

I'm writing about the open day on the 24th. When we agreed to take part, we were given a presentation slot in the main hall with access to attendees as they came through. We've now been told we're in a small room at the back of the building.

This is really frustrating. We've spent the last two weeks preparing materials, building a live demo, and rearranging our diaries to make this work. Being tucked away in a room with no footfall completely defeats the purpose of us being there.

I need you to either reinstate our original slot or give us a clear explanation of why it was changed — because right now it feels like we've been messed about.

Nik`,
      streamingSpeed: 'normal',
    },
    {
      id: 'e5',
      type: 'cowork-progress',
      delayMs: 200,
      stepIndex: 0,
      stepLabel: 'Drafting email to Andy',
      status: 'complete',
      detail: 'First draft ready',
    },

    // User asks to tone it down
    {
      id: 'e6',
      type: 'user-message',
      delayMs: 1500,
      content: 'Hmm. I am annoyed but I don\'t want to burn bridges — Andy\'s been decent to work with before. Can you make it firmer but less angry? Keep the point but make it so he wants to fix it rather than getting defensive.',
      typingEffect: true,
    },
    {
      id: 'e7',
      type: 'thinking',
      delayMs: 400,
      durationMs: 1000,
      label: 'Rewriting with a different tone...',
    },

    // Step 1: Rewrite
    {
      id: 'e8',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 1,
      stepLabel: 'Rewriting email',
      status: 'running',
      detail: 'Adjusting tone — firm but collaborative',
    },
    {
      id: 'e9',
      type: 'assistant-message',
      delayMs: 300,
      content: `Here's the revised version — same core message, but positioned as a problem to solve together rather than a complaint:

**To:** andy@enablenetwork.org.uk
**Subject:** Open Day — quick question about our slot

Hi Andy,

Hope you're well. Just wanted to check in about the open day on the 24th — I've heard our presentation has been moved from the main hall to one of the side rooms at the back.

I completely understand these things shift around as plans develop, but I wanted to flag that the visibility is a big deal for us. We've put a lot of prep into this — two weeks of building materials and a live AI demo — specifically because we'd have good footfall from attendees passing through.

Is there any way to get us back into a higher-traffic spot? Even a smaller table in the main area would work better than a separate room. Happy to be flexible on timing if that helps with the logistics.

Really appreciate you looking into it. Looking forward to the event either way.

Cheers,
Nik`,
      streamingSpeed: 'normal',
    },
    {
      id: 'e10',
      type: 'cowork-progress',
      delayMs: 200,
      stepIndex: 1,
      stepLabel: 'Rewriting email',
      status: 'complete',
      detail: 'Revised draft ready',
    },

    // User approves and asks to send
    {
      id: 'e11',
      type: 'user-message',
      delayMs: 1200,
      content: 'That\'s much better. Send it.',
      typingEffect: true,
    },
    {
      id: 'e12',
      type: 'thinking',
      delayMs: 300,
      durationMs: 800,
      label: 'Preparing to send via Gmail...',
    },

    // Step 2: Connect to Gmail
    {
      id: 'e13',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 2,
      stepLabel: 'Connecting to Gmail',
      status: 'running',
      detail: 'Authenticating with nik@fatsquirrel.co.uk...',
    },
    {
      id: 'e14',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'GmailConnect',
      toolInput: { account: 'nik@fatsquirrel.co.uk' },
      description: 'Connecting to Gmail',
      expandedByDefault: false,
    },
    {
      id: 'e15',
      type: 'tool-result',
      delayMs: 600,
      toolCallId: 'e14',
      output: 'Connected to nik@fatsquirrel.co.uk via Gmail API.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'e16',
      type: 'cowork-progress',
      delayMs: 200,
      stepIndex: 2,
      stepLabel: 'Connecting to Gmail',
      status: 'complete',
      detail: 'Authenticated',
    },

    // Step 3: Send email
    {
      id: 'e17',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 3,
      stepLabel: 'Sending email',
      status: 'running',
      detail: 'To: andy@enablenetwork.org.uk',
    },
    {
      id: 'e18',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'GmailSend',
      toolInput: {
        from: 'nik@fatsquirrel.co.uk',
        to: 'andy@enablenetwork.org.uk',
        subject: 'Open Day — quick question about our slot',
        body: "Hi Andy,\n\nHope you're well. Just wanted to check in about the open day on the 24th — I've heard our presentation has been moved from the main hall to one of the side rooms at the back.\n\nI completely understand these things shift around as plans develop, but I wanted to flag that the visibility is a big deal for us. We've put a lot of prep into this — two weeks of building materials and a live AI demo — specifically because we'd have good footfall from attendees passing through.\n\nIs there any way to get us back into a higher-traffic spot? Even a smaller table in the main area would work better than a separate room. Happy to be flexible on timing if that helps with the logistics.\n\nReally appreciate you looking into it. Looking forward to the event either way.\n\nCheers,\nNik",
      },
      description: 'Sending email to Andy',
      expandedByDefault: true,
    },
    {
      id: 'e19',
      type: 'tool-result',
      delayMs: 700,
      toolCallId: 'e18',
      output: 'Email sent successfully. Message ID: msg-20260416-enable-openday',
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'e20',
      type: 'cowork-progress',
      delayMs: 200,
      stepIndex: 3,
      stepLabel: 'Sending email',
      status: 'complete',
      detail: 'Sent to andy@enablenetwork.org.uk',
    },

    // Summary
    {
      id: 'e21',
      type: 'assistant-message',
      delayMs: 400,
      content: "Done — email sent to Andy at andy@enablenetwork.org.uk. Subject line is \"Open Day — quick question about our slot\". Firm but friendly, and gives him an easy way to fix it. Fingers crossed you get a better spot.",
      streamingSpeed: 'normal',
    },
    {
      id: 'e22',
      type: 'cowork-notification',
      delayMs: 500,
      notificationType: 'finished',
      message: 'Email sent to andy@enablenetwork.org.uk',
    },
  ],
}
