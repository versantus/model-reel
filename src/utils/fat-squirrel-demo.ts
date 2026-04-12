import type { Simulation } from '../types/simulation'

export const fatSquirrelDemo: Simulation = {
  id: 'fat-squirrel-ai-demo',
  title: 'AI for Your Business — Live Demo',
  description: 'Claude generates social posts and an enquiry reply for an outdoor experience business — then uses the humanizer skill to de-AI the results.',
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
    // ===== PROMPT 1: Lazy prompt (with natural typos that get corrected) =====
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'write sme social media psots for my business',
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

1. "Come visit us for a great experience! Perfect for groups, team building, and more. Book now!"

2. "Looking for something different to do? We've got you covered. Fun activities, great atmosphere, and unforgettable memories await."

3. "Don't miss out on our spring special! Book your session today and save 20%."

4. "Our venue is the ideal place for your next event. Contact us to learn more about our packages and availability."

5. "Happy Monday! Start your week by planning something exciting with friends or colleagues."

Would you like me to adjust the tone or write more?`,
      streamingSpeed: 'fast',
    },
    {
      id: 'e4',
      type: 'pause',
      delayMs: 500,
    },

    // ===== PROMPT 2: Good prompt (natural, not over-polished) =====
    {
      id: 'e5',
      type: 'user-message',
      delayMs: 0,
      content: 'ok thats not great. lets try again. I run an outdoor experience business called Fat Squirrel Outdoor. We do axe throwing, campfire cooking and woodland experiences in the Cotswolds. Our customers are corporate teams and groups of friends looking to get out of the office and into the woods for a few hours. The vibe is relaxed, social, fire, conversation, good food. Not a party venue. Write me 3 Instagram captions for spring.',
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

**2.**
The best team days don't involve a PowerPoint. They involve axes, fire, and someone who swears they've done this before (they haven't). 🏕️

We supply the wood, the axes, and the campfire. You bring the chat.

**3.**
Someone at the campfire last week said "I haven't laughed this hard in ages" and honestly? Same. Every single time.

I don't know what it is about holding an axe in a woodland that makes people loosen up. Maybe it's the fire. Maybe it's the fresh air. Maybe it's just nice to do something that doesn't involve a screen for a few hours.

Spring weekends are filling up. Link in bio.`,
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
      content: 'A customer just sent this enquiry: "Hi, we\'re looking at booking a team day for 16 people on 14th June. We like the look of the axe throwing and campfire combo. A couple of questions - is there any shelter if the weather\'s rubbish? Also one of our group has a dodgy shoulder - is that going to be a problem?" Write a warm, helpful reply under 150 words.',
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

16 on 14th June, great choice. The axe throwing and campfire combo is our most popular team day, and for good reason.

Re the weather: we've got a covered area right next to the campfire, so if it's being British, you'll still be warm and dry.

Re the dodgy shoulder: shouldn't be a problem at all. Our instructors can adapt the technique, and there's no pressure to throw with the bad arm. We've had plenty of guests work around injuries and still have a brilliant time. Just mention it when you arrive so we can look after them.

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
      content: 'Now run the humanizer skill on those Instagram captions. Check for: significance inflation, promotional language, forced rule of three, em dash overuse, sycophantic tone, AI vocabulary words, copula avoidance, and generic conclusions. Rewrite anything that reads like AI output and make it sound like a real person wrote it.',
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
      content: `Let me check each one.

**Caption 1:**
> Threw an axe. Hit the target. Felt like an absolute legend. 🪓
>
> That moment when the axe sticks and your whole team cheers like you've won the league. It's stupidly satisfying.

Clean. Short sentences, personal voice, no AI tells. The emoji works because it's just one, not decorating a list. No changes needed.

**Caption 2:**
> The best team days don't involve a PowerPoint. They involve axes, fire, and someone who swears they've done this before (they haven't). 🏕️
>
> We supply the wood, the axes, and the campfire. You bring the chat.

The opener is strong. "We supply X, you bring Y" is a bit of a formula but it's short enough to get away with. The rule of three in "axes, fire, and someone" works because the third item breaks the pattern into a joke. Keep it.

**Caption 3:**
> Someone at the campfire last week said "I haven't laughed this hard in ages" and honestly? Same. Every single time.
>
> I don't know what it is about holding an axe in a woodland that makes people loosen up. Maybe it's the fire. Maybe it's the fresh air. Maybe it's just nice to do something that doesn't involve a screen for a few hours.
>
> Spring weekends are filling up. Link in bio.

This has a couple of tells:

1. "I don't know what it is about X that makes Y" is a soft AI pattern. A real person would just say it more directly.
2. "Maybe it's X. Maybe it's Y. Maybe it's Z." reads like a composed three-beat, even though it's trying to sound uncertain.
3. "Link in bio" at the end of every caption is too consistent. Real accounts don't CTA every single post.

**Rewrite of caption 3:**

> Someone at the campfire last week said "I haven't laughed this hard in ages" and honestly? Same. Every single time.
>
> Holding an axe in a woodland just does something to people. They loosen up. They talk more. Maybe it's the fire, maybe it's being outside for once. Whatever it is, it works.

That's it. No CTA. Ends on the feeling, not the sell. Three posts, and only one of them asks you to do anything. That's how real accounts sound.`,
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