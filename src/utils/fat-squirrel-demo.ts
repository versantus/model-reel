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
      content: 'I run an outdoor experience business called Fat Squirrel Outdoor. We do axe throwing, campfire cooking, and woodland experiences in the Cotswolds. Our customers are corporate teams, groups of friends, and private parties looking to get out of the office and into the woods. The vibe is relaxed, social, and a bit adventurous — think axes, fire, conversation, and good food. Write me 3 Instagram captions for spring — warm, not salesy, like you\'re telling a mate about a brilliant day out.',
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

That moment when the axe sticks and your whole team cheers like you've won the league. It's stupidly satisfying.

Spring sessions are booking up — grab your mates and come have a go. 🔥

**2.**
The best team days don't involve a PowerPoint. They involve axes, fire, and someone who swears they've done this before (they haven't). 🏕️

We supply the wood, the axes, and the campfire. You bring the chat.

**3.**
Someone at the campfire last week said "I haven't laughed this hard in ages" and honestly? Same. Every single time.

I don't know what it is about holding an axe in a woodland that makes people loosen up. Maybe it's the fire. Maybe it's the fresh air. Maybe it's just nice to do something that doesn't involve a screen for a few hours.

Spring weekends are filling up — link in bio if you fancy it. 🪓🔥`,
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
      content: 'A customer just sent this enquiry: "Hi, we\'re looking at booking a team day for 16 people on 14th June. We like the look of the axe throwing and campfire combo. A couple of questions — can we bring our own drinks? And is there any shelter if the weather\'s rubbish? Also one of our group has a dodgy shoulder — is that going to be a problem?" — Write a warm, helpful reply under 150 words.',
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

16 on 14th June — great choice. The axe throwing and campfire combo is our most popular corporate package, and for good reason.

Yes, you can bring your own drinks. We just ask that the axe throwing happens before the serious drinking starts (safety first, fun second).

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
      updates: { cost: '$0.06', contextPercent: 15 },
    },

    // ===== PROMPT 4: Humanizer pass =====
    {
      id: 'e13',
      type: 'pause',
      delayMs: 1500,
    },
    {
      id: 'e14',
      type: 'user-message',
      delayMs: 0,
      content: "Now run those Instagram captions through an anti-AI writing check. The main patterns to look for: significance inflation ('testament to', 'pivotal'), promotional language ('nestled', 'vibrant', 'boasts'), forced rule of three, em dash overuse, sycophantic tone ('Great question!'), and generic conclusions. Rewrite them to sound like a real person wrote them — someone who actually goes axe throwing and is genuinely excited about it, not a marketing robot.",
      typingEffect: true,
    },
    {
      id: 'e15',
      type: 'thinking',
      delayMs: 400,
      durationMs: 1200,
    },
    {
      id: 'e16',
      type: 'assistant-message',
      delayMs: 200,
      content: `Good call. Let me check each one.

**Original 1:**
> Threw an axe. Hit the target. Felt like an absolute legend. 🪓
>
> That moment when the axe sticks and your whole team cheers like you've won the league. It's stupidly satisfying.
>
> Spring sessions are booking up — grab your mates and come have a go. 🔥

**Issues:** None really. Short, personal, genuine voice. The emoji use is natural. Keep it.

**Original 2:**
> The best team days don't involve a PowerPoint. They involve axes, fire, and someone who swears they've done this before (they haven't). 🏕️
>
> We supply the wood, the axes, and the campfire. You bring the chat.

**Issues:** The opener is strong and genuinely funny. "We supply X, you bring Y" is a bit of a formula but it works because it's short and the contrast is good. Keep it.

**Original 3:**
> Someone at the campfire last week said "I haven't laughed this hard in ages" and honestly? Same. Every single time.
>
> I don't know what it is about holding an axe in a woodland that makes people loosen up. Maybe it's the fire. Maybe it's the fresh air. Maybe it's just nice to do something that doesn't involve a screen for a few hours.
>
> Spring weekends are filling up — link in bio if you fancy it. 🪓🔥

**Issues:** This one's mostly clean. The "maybe it's X. maybe it's Y. maybe it's Z" pattern is a natural way to express uncertainty rather than a forced rule-of-three. The CTA "link in bio if you fancy it" is casual and not pushy. This is already pretty good. Keep it.

**Overall verdict:** These captions are already pretty human-sounding. The main AI tell across all three is that they're slightly too polished — every caption ends on a CTA and has perfect structure. Real social media posts are a bit more ragged. Maybe one caption doesn't have a CTA at all. Maybe one ends mid-thought.

**Quick fix:** Remove the CTA from caption 1 and let it just end on the feeling:

> Threw an axe. Hit the target. Felt like an absolute legend. 🪓
>
> That moment when the axe sticks and your whole team cheers like you've won the league.

Done. Feels less like content marketing now.`,
      streamingSpeed: 'normal',
    },
    {
      id: 'e17',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.14', contextPercent: 22 },
    },
  ],
}