import type { Simulation } from '../types/simulation'

export const fatSquirrelLifeAdminCoworkDemo: Simulation = {
  id: 'fat-squirrel-life-admin-cowork',
  title: 'Life Admin — Cowork sends the emails',
  description: 'After drafting emails in Claude Chat, hand them off to Cowork to actually send them. Shows the autonomous agent connecting to email, sending messages, and confirming delivery.',
  productType: 'claude-cowork',
  createdAt: '2026-04-16T00:00:00Z',
  updatedAt: '2026-04-16T00:00:00Z',
  metadata: {
    coworkConfig: {
      taskTitle: 'Send life admin emails',
      folderPath: '/Users/nik/Documents',
      suggestions: ['Send drafted emails', 'Check inbox', 'Schedule follow-ups'],
    },
  },
  events: [
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'I drafted a gym cancellation email and a school parents evening email in Chat. Can you send them both for me? My email is nik@fatsquirrel.co.uk. The gym is membership@cotswoldfitness.co.uk and the school is stjames.primary@oxfordshire.sch.uk, FAO Mrs Patterson.',
      typingEffect: true,
    },
    {
      id: 'e2',
      type: 'thinking',
      delayMs: 500,
      durationMs: 1200,
      label: 'Reading drafted emails from conversation history...',
    },
    {
      id: 'e3',
      type: 'assistant-message',
      delayMs: 300,
      content: "I've found both drafted emails from your earlier conversation. I'll send them now.",
      streamingSpeed: 'fast',
    },

    // Step 0: Connect to email
    {
      id: 'e4',
      type: 'cowork-progress',
      delayMs: 400,
      stepIndex: 0,
      stepLabel: 'Connecting to email account',
      status: 'running',
      detail: 'Authenticating with nik@fatsquirrel.co.uk...',
    },
    {
      id: 'e5',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'EmailConnect',
      toolInput: { account: 'nik@fatsquirrel.co.uk', provider: 'gmail' },
      description: 'Connecting to email account',
      expandedByDefault: false,
    },
    {
      id: 'e6',
      type: 'tool-result',
      delayMs: 800,
      toolCallId: 'e5',
      output: 'Connected to nik@fatsquirrel.co.uk via Gmail API. Session active.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'e7',
      type: 'cowork-progress',
      delayMs: 200,
      stepIndex: 0,
      stepLabel: 'Connecting to email account',
      status: 'complete',
      detail: 'Authenticated successfully',
    },

    // Step 1: Send gym cancellation
    {
      id: 'e8',
      type: 'cowork-progress',
      delayMs: 400,
      stepIndex: 1,
      stepLabel: 'Sending gym cancellation email',
      status: 'running',
      detail: 'To: membership@cotswoldfitness.co.uk',
    },
    {
      id: 'e9',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'SendEmail',
      toolInput: {
        from: 'nik@fatsquirrel.co.uk',
        to: 'membership@cotswoldfitness.co.uk',
        subject: 'Membership cancellation — Nik Roberts, CF-44210',
        body: 'Dear Cotswold Fitness,\n\nI\'m writing to cancel my membership, effective 30th April 2026. My member number is CF-44210.\n\nPlease confirm receipt and let me know if there\'s anything else I need to do. I\'d also appreciate confirmation that no further payments will be taken after this date.\n\nMany thanks,\nNik Roberts',
      },
      description: 'Sending gym cancellation email',
      expandedByDefault: true,
    },
    {
      id: 'e10',
      type: 'tool-result',
      delayMs: 600,
      toolCallId: 'e9',
      output: 'Email sent successfully. Message ID: msg-2026041608301-gym',
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'e11',
      type: 'cowork-progress',
      delayMs: 200,
      stepIndex: 1,
      stepLabel: 'Sending gym cancellation email',
      status: 'complete',
      detail: 'Sent to membership@cotswoldfitness.co.uk',
    },

    // Step 2: Send school email
    {
      id: 'e12',
      type: 'cowork-progress',
      delayMs: 400,
      stepIndex: 2,
      stepLabel: 'Sending school email',
      status: 'running',
      detail: 'To: stjames.primary@oxfordshire.sch.uk',
    },
    {
      id: 'e13',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'SendEmail',
      toolInput: {
        from: 'nik@fatsquirrel.co.uk',
        to: 'stjames.primary@oxfordshire.sch.uk',
        subject: 'Parents evening — Nik Roberts, Year 4',
        body: 'Dear Mrs Patterson,\n\nI\'m sorry but I won\'t be able to make parents evening this Thursday due to a work commitment. I\'d really like to catch up about how things are going — is there another slot you could offer, or would a phone call at a different time work for you?\n\nApologies for the late notice.\n\nBest wishes,\nNik Roberts',
      },
      description: 'Sending school parents evening email',
      expandedByDefault: true,
    },
    {
      id: 'e14',
      type: 'tool-result',
      delayMs: 600,
      toolCallId: 'e13',
      output: 'Email sent successfully. Message ID: msg-2026041608302-school',
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'e15',
      type: 'cowork-progress',
      delayMs: 200,
      stepIndex: 2,
      stepLabel: 'Sending school email',
      status: 'complete',
      detail: 'Sent to stjames.primary@oxfordshire.sch.uk',
    },

    // Summary
    {
      id: 'e16',
      type: 'pause',
      delayMs: 300,
      durationMs: 500,
    },
    {
      id: 'e17',
      type: 'assistant-message',
      delayMs: 400,
      content: `Both emails sent from nik@fatsquirrel.co.uk:

1. **Gym cancellation** → membership@cotswoldfitness.co.uk — requesting cancellation of membership CF-44210 effective end of April
2. **School** → stjames.primary@oxfordshire.sch.uk — letting Mrs Patterson know you can't make Thursday and asking for an alternative

I didn't send anything about the dentist — that one's just a list of places to ring. Want me to do anything else with these?`,
      streamingSpeed: 'normal',
    },
    {
      id: 'e18',
      type: 'cowork-notification',
      delayMs: 500,
      notificationType: 'finished',
      message: '2 emails sent successfully',
    },
  ],
}
