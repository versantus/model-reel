import type { Simulation } from '../types/simulation'

export const fatSquirrelDemo: Simulation = {
  id: 'fat-squirrel-venue-demo',
  title: 'AI for Your Business — Live Demo',
  description: 'Claude generates a wedding venue description, social posts, and an enquiry reply — showing what AI can do for a small business in under 2 minutes.',
  productType: 'claude-chat',
  createdAt: '2026-04-12T00:00:00Z',
  updatedAt: '2026-04-12T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'claude-sonnet-4-20250514',
      theme: 'light',
      conversationTitle: 'Wedding venue marketing',
      sidebarConversations: [
        { id: 'c1', title: 'Website copy draft', timestamp: 'Yesterday', isActive: false },
        { id: 'c2', title: 'Email to caterer', timestamp: '2 days ago', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Cotswold Venue', conversationCount: 3 },
      ],
    },
  },
  events: [
    // ===== PROMPT 1: Lazy prompt =====
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'write some social media posts for my venue',
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
      content: `Here are some social media posts for your venue:

1. "Come visit our beautiful venue! Perfect for weddings, events, and more. Book now!"

2. "Looking for the perfect venue? We've got you covered. Stunning views, amazing food, unforgettable experiences."

3. "Don't miss out on our spring special! Book your event today and save 20%."

4. "Our venue is the ideal place for your next celebration. Contact us to learn more."

5. "Happy Monday! Start your week by planning your dream event at our gorgeous venue."

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
      content: 'I run a Cotswold wedding venue called Fat Squirrel Outdoor. We do outdoor ceremonies in an orchard, campfire receptions, and wildflower meadows. Our couples are adventurous, outdoorsy, and want something different from a hotel ballroom. Write me 3 Instagram captions for spring — warm, not salesy, like you\'re telling a friend about somewhere special.',
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
The blossom is out, the fire pit's lit, and someone's about to say yes under the apple trees 🍎

We don't do carpeted ballrooms. We do orchards. Wildflower aisles. Receptions where the sky changes colour and nobody wants to go home.

Spring at Fat Squirrel hits different. Come see for yourself — link in bio.

**2.**
They wanted a wedding that felt like *them*. So we lit a campfire, hung some lights in the willow, and let the Cotswold hills do the rest 🏕️

This is what "I don't want a normal wedding" looks like. And it's beautiful.

**3.**
Three things you can guarantee at Fat Squirrel this spring: wildflowers in the meadow, a cracking fire, and at least one guest who says "I didn't know places like this existed."

That last one? That's the one that gets us every time 🌸

Tag someone who needs to see this.`,
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
      content: 'A couple just sent this enquiry: "Hi, we\'re getting married next June and we love the look of your outdoor venue. We\'re a bit worried about the weather though! Can we have a backup plan? Also do you allow dogs? We have a golden retriever called Bertie who we really want there." — Write a warm, professional reply under 120 words.',
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

June is one of our favourite months here — the orchard is in full bloom and the meadow is stunning.

And yes, we absolutely love a weather question, because we've got it sorted: our barn is licensed for ceremonies too, so if the Cotswolds decide to be British about it, you'll still have the most beautiful indoor ceremony. Best of both worlds.

As for Bertie — of course he's welcome. We've had golden retrievers, terriers, and one very confident dachshund trot down our aisle. Dogs and outdoor weddings are made for each other.

We'd love to show you around. When works for you?

Warm regards,
Nik`,
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