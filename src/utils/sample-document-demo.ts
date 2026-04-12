import type { Simulation } from '../types/simulation'

export const sampleDocumentSimulation: Simulation = {
  id: 'sample-document-1',
  title: 'Document Generation Demo',
  description: 'A demo showing Claude generating Word and PDF documents',
  productType: 'claude-chat',
  createdAt: '2026-04-12T00:00:00Z',
  updatedAt: '2026-04-12T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'Claude Opus 4',
      theme: 'light',
      conversationTitle: 'Q1 performance report',
      sidebarConversations: [
        { id: 'c1', title: 'Q1 performance report', timestamp: 'Just now', isActive: true },
        { id: 'c2', title: 'Marketing strategy draft', timestamp: '1h ago', isActive: false },
        { id: 'c3', title: 'Team meeting notes', timestamp: 'Yesterday', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Quarterly Reports', conversationCount: 5 },
        { id: 'p2', name: 'Strategy Docs', conversationCount: 3 },
      ],
    },
  },
  events: [
    {
      id: 'doc1',
      type: 'user-message',
      delayMs: 0,
      content: 'Can you draft a Q1 performance report for our SaaS product? We hit 12,000 MAU, revenue grew 34% to $480K, and churn dropped to 2.1%. Include an executive summary and recommendations.',
      typingEffect: false,
    },
    {
      id: 'doc2',
      type: 'thinking',
      delayMs: 300,
      durationMs: 1200,
    },
    {
      id: 'doc3',
      type: 'assistant-message',
      delayMs: 200,
      content: "I'll put together a Q1 report covering those metrics. Let me draft it as a Word document you can share with your team.",
      streamingSpeed: 'normal',
    },
    {
      id: 'doc4',
      type: 'artifact',
      delayMs: 600,
      artifactType: 'word',
      title: 'Q1 2026 Performance Report',
      content: `# Q1 2026 Performance Report

## Executive Summary

Q1 2026 was a strong quarter. Monthly active users reached 12,000, revenue grew 34% quarter-over-quarter to $480K, and customer churn fell to 2.1% — well below the 3% industry benchmark.

These results reflect continued product-market fit, improved onboarding flows, and the pricing changes introduced in late Q4.

---

## Key Metrics

| Metric | Q4 2025 | Q1 2026 | Change |
|--------|---------|---------|--------|
| Monthly Active Users | 9,200 | 12,000 | +30% |
| Revenue (MRR) | $358K | $480K | +34% |
| Customer Churn | 3.4% | 2.1% | -1.3pp |
| Net Revenue Retention | 108% | 118% | +10pp |
| Support Ticket Volume | 1,240 | 980 | -21% |

---

## Revenue Breakdown

**Subscription revenue** accounted for $420K (87.5%), with the remaining $60K from professional services and add-ons.

The Enterprise tier saw the highest growth at 52% QoQ, driven by three new contracts signed in February. The Professional tier grew 28%, while Starter remained flat.

---

## User Growth

New user sign-ups increased 41% to 4,800 in Q1. Organic search and referral channels drove 63% of new registrations, reducing our dependence on paid acquisition.

The 30-day activation rate improved from 38% to 47% following the onboarding redesign shipped in January.

---

## Churn Analysis

Monthly churn dropped from 3.4% to 2.1%. Contributing factors:

- **Proactive outreach**: Customer success reached out to at-risk accounts 14 days before renewal
- **Feature gaps closed**: The top three requested features were shipped in Q1
- **Pricing alignment**: The Q4 pricing restructure reduced sticker shock at renewal

---

## Recommendations

1. **Double down on Enterprise** — The 52% growth rate and higher LTV make this our most valuable segment. Hire two more Enterprise AEs in Q2.

2. **Invest in self-serve onboarding** — The 47% activation rate is promising but leaves room to grow. Target 55% by end of Q2 with interactive tutorials.

3. **Explore usage-based pricing** — Several Enterprise accounts are underusing their seats. A usage component could better align value and revenue.

4. **Reduce support volume further** — Ticket volume dropped 21%, but 40% of remaining tickets are about the same five features. Targeted documentation and in-app guidance could cut this in half.

---

*Prepared by the Product & Growth team — April 2026*`,
    },
    {
      id: 'doc5',
      type: 'assistant-message',
      delayMs: 500,
      content: "Here's the Q1 report. It covers all the metrics you mentioned, with a breakdown of revenue, user growth, churn drivers, and four recommendations for Q2.\n\nWould you also like a PDF version for the board, or should I adjust any of the numbers or sections?",
      streamingSpeed: 'normal',
    },
    {
      id: 'doc6',
      type: 'user-message',
      delayMs: 1500,
      content: 'Yes, a PDF version for the board would be great. Make it a bit more concise — just the executive summary and key metrics.',
      typingEffect: false,
    },
    {
      id: 'doc7',
      type: 'thinking',
      delayMs: 200,
      durationMs: 800,
    },
    {
      id: 'doc8',
      type: 'assistant-message',
      delayMs: 200,
      content: "Here's a condensed board-ready version as a PDF:",
      streamingSpeed: 'fast',
    },
    {
      id: 'doc9',
      type: 'artifact',
      delayMs: 400,
      artifactType: 'pdf',
      title: 'Q1 2026 Board Summary',
      content: `# Q1 2026 — Board Summary

## Performance Highlights

Q1 2026 delivered strong results across all core metrics. Revenue reached $480K (+34% QoQ), monthly active users grew to 12,000, and churn dropped to 2.1%.

---PAGE---

## Key Metrics

| Metric | Result | vs Q4 |
|--------|--------|-------|
| Revenue (MRR) | $480K | +34% |
| Monthly Active Users | 12,000 | +30% |
| Customer Churn | 2.1% | -1.3pp |
| Net Revenue Retention | 118% | +10pp |
| 30-day Activation | 47% | +9pp |

## Outlook

Enterprise growth (52% QoQ) is the standout opportunity. We recommend expanding the Enterprise sales team and investing in self-serve onboarding to sustain the activation improvements.

Support ticket volume fell 21%, and targeted documentation should reduce it further in Q2.

---PAGE---

## Q2 Priorities

1. Hire two Enterprise account executives
2. Ship interactive onboarding tutorials (target: 55% activation)
3. Pilot usage-based pricing with three Enterprise accounts
4. Publish targeted help docs for top five support topics

---

*Prepared for the Board of Directors — April 2026*`,
    },
    {
      id: 'doc10',
      type: 'assistant-message',
      delayMs: 500,
      content: "Done — that's a three-page summary with the highlights, metrics table, and Q2 priorities. Let me know if you'd like to adjust the tone or add anything before you send it out.",
      streamingSpeed: 'normal',
    },
  ],
}
