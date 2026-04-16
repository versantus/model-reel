import type { Simulation } from '../types/simulation'

// Compact carousel HTML generator — each variant has a distinct angle and colour accent
function carousel(title: string, accent: string, slides: string[]): string {
  const slideHtml = slides.map((s, i) => `
    <div style="background:white;border-radius:12px;padding:32px 28px;box-shadow:0 1px 3px rgba(0,0,0,0.08);min-height:340px;display:flex;flex-direction:column;justify-content:center;border-top:4px solid ${accent}">
      <div style="font-size:11px;color:${accent};font-weight:700;letter-spacing:1px;margin-bottom:12px">${i === 0 ? title.toUpperCase() : 'SLIDE ' + (i + 1) + ' OF ' + slides.length}</div>
      <div style="font-size:${i === 0 ? '22' : '18'}px;font-weight:700;color:#1a1a1a;line-height:1.35;margin-bottom:16px">${s.split('|')[0]}</div>
      ${s.split('|')[1] ? `<div style="font-size:14px;color:#555;line-height:1.6">${s.split('|')[1]}</div>` : ''}
      ${i === slides.length - 1 ? `<div style="margin-top:auto;padding-top:20px;font-size:13px;color:${accent};font-weight:600">🌲 Fat Squirrel Outdoor &middot; fatsquirrel.co.uk</div>` : ''}
    </div>`).join('\n')

  return `<!DOCTYPE html><html><head><style>*{margin:0;padding:0;box-sizing:border-box}body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f3f2ef;padding:24px;display:flex;gap:16px;overflow-x:auto;min-width:${slides.length * 320}px}</style></head><body>${slideHtml}</body></html>`
}

const originalCarousel = carousel('AI Coaching vs. Buying a Tool', '#2d6a4f', [
  'You bought the AI tool.<br>Nobody uses it.|Sound familiar? Here\'s why coaching beats tooling every time.',
  'The tool problem|You spend £20k on an AI platform. Six weeks later, 3 people log in — and two of them are in IT.',
  'Coaching changes behaviour|When people understand <em>why</em> AI helps, they actually use it. No tool does that on its own.',
  'The compounding effect|Coached teams find new uses every week. Tool-only teams plateau after the onboarding demo.',
  'AI coaching isn\'t about the tech — it\'s about the people.|Ready to stop buying shelfware?<br><br>Let\'s talk → fatsquirrel.co.uk',
])

const variant1 = carousel('5 Ways AI Saves 10 Hours a Week', '#c2185b', [
  '5 ways AI saves you<br>10 hours a week|Stop working harder. Start working with AI.',
  '1. Email triage|AI reads, prioritises, and drafts replies. You just approve. <strong>Saves 2hrs/week.</strong>',
  '2. Meeting prep|Feed it the agenda and last meeting\'s notes. Get a briefing doc in 30 seconds. <strong>Saves 1.5hrs/week.</strong>',
  '3. Report first drafts|Give it the data, get a narrative. Edit, don\'t write. <strong>Saves 2hrs/week.</strong>',
  '4. Research & summaries|Drop in a 40-page PDF. Get the 5 things you need to know. <strong>Saves 2hrs/week.</strong>',
  '5. Scheduling Tetris|Let AI find the gaps, propose the slots, send the invites. <strong>Saves 2.5hrs/week.</strong>',
  'That\'s your Friday afternoon back.|AI coaching from Fat Squirrel Outdoor — real results, no fluff.',
])

const variant2 = carousel('5 Ways AI Saves 10 Hours a Week', '#1565c0', [
  'What if AI could give you<br>10 hours back this week?|Here are 5 ways it already does — for teams we coach.',
  'The inbox black hole|Your team spends 11 hours a week on email. AI cuts that to 9. Drafts, sorts, flags — done.',
  'Meetings that prep themselves|AI reads the docs so you don\'t have to. Walk in prepared in 30 seconds flat.',
  'Reports nobody wants to write|First draft in minutes, not hours. Your team edits instead of staring at a blank page.',
  'Research without the rabbit holes|AI summarises, compares, extracts. No more 45-minute "quick look" sessions.',
  'The calendar puzzle, solved|AI finds mutual free time across 6 diaries faster than any human PA.',
  'Stop saving minutes. Start saving days.|Book a free AI audit → fatsquirrel.co.uk',
])

const variant3 = carousel('5 Ways AI Saves 10 Hours a Week', '#e65100', [
  '"We don\'t have time for AI"|That\'s exactly why you need it. Here\'s where 10 hours are hiding.',
  'Hidden time sink #1: Email|You\'re not just reading — you\'re context-switching 74 times a day. AI handles the noise.',
  'Hidden time sink #2: Meeting prep|Digging through shared drives for "that document from last time" — AI finds it instantly.',
  'Hidden time sink #3: Writing|Reports, proposals, summaries. AI gets you to 80% in minutes. You polish the last 20%.',
  'Hidden time sink #4: Research|Googling, comparing, cross-referencing. AI does in seconds what takes you an hour.',
  'Hidden time sink #5: Scheduling|The back-and-forth of finding a time that works. AI solves it in one pass.',
  'The teams we coach save 10+ hours a week.|Not in theory. In practice. Let us show you → fatsquirrel.co.uk',
])

const variant4 = carousel('5 Ways AI Saves 10 Hours a Week', '#6a1b9a', [
  '10 hours a week, wasted.|Here\'s how AI-coached teams get them back.',
  '📧 2 hours — Email|AI drafts, you approve. Triage on autopilot. The inbox stops owning your morning.',
  '📋 1.5 hours — Meeting prep|Briefing docs generated from agendas and prior notes. Walk in sharp.',
  '📊 2 hours — Reports|Data in, narrative out. Your team reviews instead of writes.',
  '🔍 2 hours — Research|40-page PDFs become 5-bullet summaries. No more "I\'ll read it this weekend."',
  '📅 2.5 hours — Scheduling|AI cross-references diaries and proposes slots. No ping-pong emails.',
  'That\'s a whole extra day, every week.|Fat Squirrel AI Coaching — practical, hands-on, no jargon.',
])

const variant5 = carousel('5 Ways AI Saves 10 Hours a Week', '#00695c', [
  'Your team wastes 10 hours a week<br>on work AI can do.|Not "someday." Right now. Here\'s the breakdown.',
  'The Monday morning inbox|2 hours lost to email. AI reads, drafts, and prioritises — you just scan and send.',
  'The Tuesday prep scramble|1.5 hours hunting for meeting context. AI pulls it together before you\'ve made coffee.',
  'The Wednesday writing block|2 hours on that report nobody wants to start. AI writes the first draft. You make it yours.',
  'The Thursday research hole|2 hours down a rabbit hole. AI summarises sources in seconds, not sessions.',
  'The Friday calendar chaos|2.5 hours of scheduling ping-pong. AI finds the slots and sends the invites.',
  'Monday to Friday, 10 hours saved.|That\'s not a pitch. That\'s what our coached teams actually report. → fatsquirrel.co.uk',
])

const variant6 = carousel('5 Ways AI Saves 10 Hours a Week', '#37474f', [
  'Before AI coaching:<br>"I don\'t have time."<br><br>After AI coaching:<br>"I have 10 extra hours."|Here\'s where they come from.',
  'Email: from 2 hours to 20 minutes|AI handles triage, drafting, and follow-ups. You handle the decisions.',
  'Meeting prep: from 90 min to 5 min|AI reads everything from last time and gives you a one-page briefing.',
  'Report writing: from 2 hours to 30 min|AI generates the structure and first draft. You add the insight.',
  'Research: from 2 hours to 15 min|AI extracts, compares, and summarises. You get the answer, not the homework.',
  'Scheduling: from 2.5 hours to 10 min|AI cross-checks diaries and proposes optimal times. One pass, done.',
  'Total saved: 10 hours 15 minutes per week.|That\'s what happens when you coach people, not just buy tools. → fatsquirrel.co.uk',
])

export const linkedinCarouselSkillDemo: Simulation = {
  id: 'linkedin-carousel-skill',
  title: 'LinkedIn Carousel → Skill → 6 Variants',
  description: 'Claude creates a LinkedIn carousel, the user saves it as a reusable skill, then runs the skill to generate 6 variants on a new topic.',
  productType: 'claude-chat',
  createdAt: '2026-04-16T00:00:00Z',
  updatedAt: '2026-04-16T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'Claude Sonnet 4',
      theme: 'light',
      conversationTitle: 'LinkedIn carousel',
      sidebarConversations: [
        { id: 'c1', title: 'LinkedIn carousel', timestamp: 'Just now', isActive: true },
        { id: 'c2', title: 'Fat Squirrel brand guidelines', timestamp: 'Yesterday', isActive: false },
        { id: 'c3', title: 'Blog post draft — AI coaching', timestamp: '2 days ago', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Fat Squirrel Marketing', conversationCount: 8 },
      ],
    },
  },
  events: [
    // === PHASE 1: Create initial carousel ===
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'Create a LinkedIn carousel for Fat Squirrel Outdoor about why AI coaching is better than just buying a tool. 5 slides, punchy, on-brand with the green. Make it something I\'d actually post.',
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
      content: 'Here\'s a 5-slide carousel that hits the "coaching > tools" message hard. Each slide builds the argument, ending with a CTA:',
      streamingSpeed: 'fast',
    },
    {
      id: 'e4',
      type: 'artifact',
      delayMs: 500,
      artifactType: 'html',
      title: 'AI Coaching vs. Buying a Tool — LinkedIn Carousel',
      content: originalCarousel,
    },
    {
      id: 'e5',
      type: 'assistant-message',
      delayMs: 600,
      content: 'The flow is: **hook** (the relatable problem) → **the tool trap** → **why coaching works** → **the compounding effect** → **CTA**. Want me to adjust the tone or swap any slides?',
      streamingSpeed: 'normal',
    },

    // === PHASE 2: Turn it into a skill ===
    {
      id: 'e6',
      type: 'pause',
      delayMs: 300,
      durationMs: 1000,
    },
    {
      id: 'e7',
      type: 'user-message',
      delayMs: 0,
      content: 'That\'s really good. Can you turn this into a reusable skill? I want to be able to run it whenever I need a new carousel — just give it a topic and it spits one out in this style.',
      typingEffect: true,
    },
    {
      id: 'e8',
      type: 'thinking',
      delayMs: 400,
      durationMs: 1200,
    },
    {
      id: 'e9',
      type: 'assistant-message',
      delayMs: 200,
      content: `Done — I've saved it as a skill called **\`/linkedin-carousel\`**. Here's what it does:

**Skill: /linkedin-carousel**
- **Input:** A topic or key message
- **Output:** A styled LinkedIn carousel (HTML) in the Fat Squirrel brand
- **Defaults:** 5–7 slides, green accent (#2d6a4f), hook → build → CTA structure
- **Options:** You can ask for a different slide count, colour, or tone

Just type \`/linkedin-carousel\` followed by your topic and I'll generate one. You can also ask for multiple variants in one go.`,
      streamingSpeed: 'normal',
    },

    // === PHASE 3: Run the skill with 6 variants ===
    {
      id: 'e10',
      type: 'pause',
      delayMs: 300,
      durationMs: 1000,
    },
    {
      id: 'e11',
      type: 'user-message',
      delayMs: 0,
      content: '/linkedin-carousel "5 ways AI saves you 10 hours a week" — give me 6 different variants so I can pick the best one. Mix up the angles and colours.',
      typingEffect: true,
    },
    {
      id: 'e12',
      type: 'thinking',
      delayMs: 400,
      durationMs: 2000,
      label: 'Generating 6 carousel variants...',
    },
    {
      id: 'e13',
      type: 'assistant-message',
      delayMs: 200,
      content: 'Here are 6 variants, each with a different angle and colour palette:',
      streamingSpeed: 'fast',
    },
    {
      id: 'e14',
      type: 'artifact',
      delayMs: 500,
      artifactType: 'html',
      title: 'Variant 1 — "The Practical List" (Pink)',
      content: variant1,
    },
    {
      id: 'e15',
      type: 'artifact',
      delayMs: 800,
      artifactType: 'html',
      title: 'Variant 2 — "The Team Story" (Blue)',
      content: variant2,
    },
    {
      id: 'e16',
      type: 'artifact',
      delayMs: 800,
      artifactType: 'html',
      title: 'Variant 3 — "The Objection Buster" (Orange)',
      content: variant3,
    },
    {
      id: 'e17',
      type: 'artifact',
      delayMs: 800,
      artifactType: 'html',
      title: 'Variant 4 — "The Emoji Guide" (Purple)',
      content: variant4,
    },
    {
      id: 'e18',
      type: 'artifact',
      delayMs: 800,
      artifactType: 'html',
      title: 'Variant 5 — "The Weekday Walkthrough" (Teal)',
      content: variant5,
    },
    {
      id: 'e19',
      type: 'artifact',
      delayMs: 800,
      artifactType: 'html',
      title: 'Variant 6 — "Before & After" (Slate)',
      content: variant6,
    },
    {
      id: 'e20',
      type: 'assistant-message',
      delayMs: 600,
      content: `Here's what each variant leads with:

1. **The Practical List** (pink) — straight "here are the 5 ways", one per slide, bold time savings
2. **The Team Story** (blue) — framed around "teams we coach", more relational tone
3. **The Objection Buster** (orange) — opens with "we don't have time for AI", flips the objection
4. **The Emoji Guide** (purple) — visual anchors with emoji, snappy stat-per-slide format
5. **The Weekday Walkthrough** (teal) — Monday to Friday structure, each day is a time sink
6. **Before & After** (slate) — contrast format, "from X hours to Y minutes" for each task

I'd go with **#3** or **#5** for LinkedIn engagement — the hook is stronger. Want me to refine any of them?`,
      streamingSpeed: 'normal',
    },
  ],
}
