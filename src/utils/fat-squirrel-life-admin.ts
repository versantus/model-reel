import type { Simulation } from '../types/simulation'

export const fatSquirrelLifeAdminDemo: Simulation = {
  id: 'fat-squirrel-life-admin',
  title: 'Life Admin — AI for the stuff that eats your evening',
  description: 'Claude handles three life admin tasks in one prompt: cancel a gym membership, draft a school email, and find a dentist appointment. Shows AI isn\'t just for business.',
  productType: 'claude-chat',
  createdAt: '2026-04-12T00:00:00Z',
  updatedAt: '2026-04-12T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'claude-sonnet-4-20250514',
      theme: 'light',
      conversationTitle: 'Life admin',
      sidebarConversations: [
        { id: 'c1', title: 'Fat Squirrel Outdoor marketing', timestamp: 'Just now', isActive: false },
        { id: 'c2', title: 'Team day enquiry reply', timestamp: 'Earlier', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Personal', conversationCount: 2 },
      ],
    },
  },
  events: [
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'I need help with three things. 1) Cancel my gym membership at Cotswold Fitness, my name is Nik Roberts, member number CF-44210, I want to cancel effective end of this month. 2) Draft an email to my daughter\'s school (St James Primary, teacher is Mrs Patterson) saying we can\'t make parents evening on Thursday because of a work commitment, and asking for an alternative slot. 3) Find me a dentist near Witney that takes NHS patients and has availability on a Tuesday morning.',
      typingEffect: true,
    },
    {
      id: 'e2',
      type: 'thinking',
      delayMs: 400,
      durationMs: 1500,
    },
    {
      id: 'e3',
      type: 'assistant-message',
      delayMs: 200,
      content: `Here we go:

---

**1. Gym cancellation email**

Subject: Membership cancellation — Nik Roberts, CF-44210

Dear Cotswold Fitness,

I'm writing to cancel my membership, effective 30th April 2026. My member number is CF-44210.

Please confirm receipt and let me know if there's anything else I need to do. I'd also appreciate confirmation that no further payments will be taken after this date.

Many thanks,
Nik Roberts

---

**2. School email**

Subject: Parents evening — Nik Roberts, Year 4

Dear Mrs Patterson,

I'm sorry but I won't be able to make parents evening this Thursday due to a work commitment. I'd really like to catch up about how things are going — is there another slot you could offer, or would a phone call at a different time work for you?

Apologies for the late notice.

Best wishes,
Nik Roberts

---

**3. Dentist**

For NHS dentists near Witney with Tuesday morning availability, I'd suggest calling:

- **Witney Dental Practice** (01993 703XXX) — NHS, open Tuesdays from 8:30am
- **Newlands Dental Care** (01993 705XXX) — accepting NHS patients, Tuesday slots available
- **Windrush Health Centre** (01993 702XXX) — NHS dental service, Tuesday mornings

All three are in Witney town centre. I'd ring first thing Monday — NHS dental slots go fast.

---

Three things that would've taken you an hour, done in about 30 seconds of asking. That's the point.`,
      streamingSpeed: 'normal',
    },
    {
      id: 'e4',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.12', contextPercent: 8 },
    },
  ],
}