import type { Simulation } from '../types/simulation'

export const fatSquirrelDemo: Simulation = {
  id: 'fat-squirrel-ai-demo',
  title: 'AI for Your Business — Live Demo',
  description: 'Claude generates social posts and an enquiry reply for an outdoor experience business — showing what AI can do for a small business in under 2 minutes.',
  productType: 'claude-chat',
  createdAt: '2026-04-12T00:00:00Z',
  updatedAt: '2026-04-12T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'claude-sonnet-4-20250514',
      theme: 'light',
      conversationTitle: 'Fat Squirrel Outdoor marketing',
      sidebarConversations: [
        { id: 'c1', title: 'Website copy draft', timestamp: 'Yesterday', isActive: false },
        { id: 'c2', title: 'Gift voucher wording', timestamp: '2 days ago', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Fat Squirrel Outdoor', conversationCount: 5 },
      ],
    },
  },
  events: [
    // ===== PROMPT 1: Lazy prompt =====
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'write some social media posts for my business',
      typingEffect: true,
    },
    {
      id: 'e2',
      type: 'thinking',
      delayMs: 500,
      durationMs: 800,
    },
    {
      id: 'e3',
      type: 'assistant-message',
      delayMs: 200,
      content: `Here are some social media posts for your business:

1. "Come visit us for a great experience! Perfect for groups, parties, and more. Book now!"

2. "Looking for something different to do? We've got you covered. Fun activities, great atmosphere, unforgettable memories."

3. "Don't miss out on our spring special! Book your session today and save 20%."

4. "Our venue is the ideal place for your next event. Contact us to learn more."

5. "Happy Monday! Start your week by planning something exciting with us."

Would you like me to write more or adjust the tone?`,
      streamingSpeed: 'fast',
    },
    {
      id: 'e4',
      type: 'pause',
      delayMs: 500,
    },

    // ===== PROMPT 2: Good prompt =====
    {
      id: 'e5',
      type: 'user-message',
      delayMs: 0,
      content: 'I run an outdoor experience business called Fat Squirrel Outdoor. We do axe throwing, campfire cooking, and woodland experiences in the Cotswolds. Our customers are groups of friends, stag and hen dos, and corporate teams looking for something different. The vibe is rustic, fun, and a bit adventurous. Write me 3 Instagram captions for spring — warm, not salesy, like you\'re telling a mate about a brilliant day out.',
      typingEffect: true,
    },
    {
      id: 'e6',
      type: 'thinking',
      delayMs: 400,
      durationMs: 1000,
    },
    {
      id: 'e7',
      type: 'assistant-message',
      delayMs: 200,
      content: `Here are 3 Instagram captions for Fat Squirrel Outdoor:

**1.**
Threw an axe. Hit the target. Felt like an absolute legend. 🪓

Axe throwing is one of those things you don't realise you're good at until you try it. And when the axe sticks? Proper satisfying.

Spring sessions are booking up — grab your mates and come have a go. 🔥

**2.**
Three things that improve literally any weekend: axes, fire, and not looking at your phone. 🏕️

We sorted the first two. The third one's on you.

**3.**
Someone at the campfire last week said "I haven't laughed this hard in ages" and honestly? Same. Every single time.

There's something about standing in a Cotswold woodland with an axe in one hand and a cup of something warm in the other that just works. No screens. No agenda. Just a couple of hours of proper fun.

Tag someone who needs this. 🪓🔥`,
      streamingSpeed: 'normal',
    },
    {
      id: 'e8',
      type: 'pause',
      delayMs: 300,
    },

    // ===== PROMPT 3: Enquiry reply =====
    {
      id: 'e9',
      type: 'user-message',
      delayMs: 0,
      content: 'A customer just sent this enquiry: "Hi, we\'re looking at booking a stag do activity for 12 people on 14th June. We like the look of the axe throwing and campfire combo. A couple of questions — can we bring our own drinks? And is there any shelter if the weather\'s rubbish? Also one of our group has a dodgy shoulder — is that going to be a problem?" — Write a warm, helpful reply under 150 words.',
      typingEffect: true,
    },
    {
      id: 'e10',
      type: 'thinking',
      delayMs: 300,
      durationMs: 900,
    },
    {
      id: 'e11',
      type: 'assistant-message',
      delayMs: 200,
      content: `Hi there,

14th June for 12 — great choice. The axe throwing and campfire combo is our most popular stag do package, and for good reason.

Yes, you can bring your own drinks. We just ask that axe throwing happens before the serious drinking starts (safety first, fun second).

We've got a covered area right next to the campfire, so if the weather's being British, you'll still be warm and dry.

Regarding the dodgy shoulder — it shouldn't be a problem at all. Our instructors can adapt the technique, and there's no pressure to throw with the bad arm. We've had plenty of guests work around injuries and still have a brilliant time. Just mention it when you arrive so we can look after them.

Want me to hold that date for you?

Cheers,
Fat Squirrel Outdoor 🪓`,
      streamingSpeed: 'normal',
    },
    {
      id: 'e12',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.08', contextPercent: 12 },
    },
  ],
}