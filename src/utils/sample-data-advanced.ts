import type { Simulation } from '../types/simulation'

/* ────────────────────────────────────────────────────────────────────────────
 *  1. Chat: Build a SaaS Landing Page (iterative HTML artifacts)
 * ──────────────────────────────────────────────────────────────────────────── */

export const sampleLandingPageSimulation: Simulation = {
  id: 'sample-landing-1',
  title: 'Build a Landing Page',
  description: 'Claude builds and iterates on a SaaS landing page with live preview',
  productType: 'claude-chat',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'Claude Opus 4',
      theme: 'light',
      conversationTitle: 'Landing page for Acme Analytics',
      sidebarConversations: [
        { id: 'c1', title: 'Landing page for Acme Analytics', timestamp: 'Just now', isActive: true },
        { id: 'c2', title: 'Dashboard mockup', timestamp: '1h ago', isActive: false },
        { id: 'c3', title: 'Pricing strategy brainstorm', timestamp: 'Yesterday', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Acme Analytics', conversationCount: 6 },
      ],
    },
  },
  events: [
    // ── Turn 1: User asks for landing page ──
    {
      id: 'lp1',
      type: 'user-message',
      delayMs: 0,
      content: 'Build me a modern landing page for "Acme Analytics" — a SaaS product that helps startups track their key metrics. Include a hero section, features grid, and a pricing table. Make it look really polished.',
      typingEffect: false,
    },
    {
      id: 'lp2',
      type: 'thinking',
      delayMs: 300,
      durationMs: 1500,
    },
    {
      id: 'lp3',
      type: 'assistant-message',
      delayMs: 200,
      content: "I'll create a polished landing page for Acme Analytics with a hero section, features grid, and pricing table. I'm going for a clean, modern design with a purple/indigo color scheme that conveys trust and sophistication.",
      streamingSpeed: 'fast',
    },
    {
      id: 'lp4',
      type: 'artifact',
      delayMs: 400,
      artifactType: 'html',
      title: 'Acme Analytics Landing Page',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Acme Analytics</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1a1a2e; line-height: 1.6; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  /* Nav */
  nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 40px; border-bottom: 1px solid #eee; }
  nav .logo { font-size: 20px; font-weight: 700; color: #4f46e5; }
  nav .links { display: flex; gap: 28px; }
  nav .links a { text-decoration: none; color: #555; font-size: 14px; font-weight: 500; }
  nav .cta { background: #4f46e5; color: #fff; padding: 8px 20px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer; }

  /* Hero */
  .hero { text-align: center; padding: 80px 24px 60px; background: linear-gradient(135deg, #eef2ff 0%, #f5f3ff 50%, #fdf2f8 100%); }
  .hero .badge { display: inline-block; background: #e0e7ff; color: #4338ca; font-size: 12px; font-weight: 600; padding: 4px 14px; border-radius: 99px; margin-bottom: 16px; }
  .hero h1 { font-size: 48px; font-weight: 800; line-height: 1.15; max-width: 700px; margin: 0 auto 20px; background: linear-gradient(135deg, #1e1b4b, #4f46e5); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 18px; color: #64748b; max-width: 540px; margin: 0 auto 32px; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; }
  .hero-btns .primary { background: #4f46e5; color: #fff; padding: 12px 28px; border-radius: 10px; border: none; font-size: 15px; font-weight: 600; cursor: pointer; }
  .hero-btns .secondary { background: #fff; color: #374151; padding: 12px 28px; border-radius: 10px; border: 1px solid #d1d5db; font-size: 15px; font-weight: 600; cursor: pointer; }

  /* Metrics bar */
  .metrics { display: flex; justify-content: center; gap: 60px; padding: 40px 0; border-bottom: 1px solid #eee; }
  .metrics .metric { text-align: center; }
  .metrics .num { font-size: 32px; font-weight: 800; color: #4f46e5; }
  .metrics .label { font-size: 13px; color: #94a3b8; margin-top: 4px; }

  /* Features */
  .features { padding: 80px 24px; }
  .features h2 { text-align: center; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
  .features .sub { text-align: center; color: #64748b; margin-bottom: 48px; font-size: 16px; }
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; max-width: 1000px; margin: 0 auto; }
  .feature-card { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 14px; padding: 28px; transition: box-shadow .2s; }
  .feature-card:hover { box-shadow: 0 8px 30px rgba(79, 70, 229, .1); }
  .feature-card .icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
  .feature-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; }
  .feature-card p { font-size: 14px; color: #64748b; }

  /* Pricing */
  .pricing { padding: 80px 24px; background: #fafbff; }
  .pricing h2 { text-align: center; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
  .pricing .sub { text-align: center; color: #64748b; margin-bottom: 48px; font-size: 16px; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px; margin: 0 auto; }
  .price-card { background: #fff; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px 28px; text-align: center; }
  .price-card.popular { border: 2px solid #4f46e5; position: relative; box-shadow: 0 8px 30px rgba(79, 70, 229, .12); }
  .price-card.popular::before { content: "Most Popular"; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #4f46e5; color: #fff; font-size: 11px; font-weight: 600; padding: 3px 14px; border-radius: 99px; }
  .price-card .plan { font-size: 18px; font-weight: 600; margin-bottom: 8px; }
  .price-card .price { font-size: 42px; font-weight: 800; color: #1e1b4b; }
  .price-card .price span { font-size: 16px; font-weight: 400; color: #94a3b8; }
  .price-card .feat-list { list-style: none; margin: 24px 0; text-align: left; }
  .price-card .feat-list li { font-size: 14px; color: #475569; padding: 6px 0; padding-left: 22px; position: relative; }
  .price-card .feat-list li::before { content: "✓"; position: absolute; left: 0; color: #4f46e5; font-weight: 700; }
  .price-card button { width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; border: 1px solid #d1d5db; background: #fff; color: #374151; }
  .price-card.popular button { background: #4f46e5; color: #fff; border: none; }

  /* Footer */
  footer { text-align: center; padding: 32px; color: #94a3b8; font-size: 13px; border-top: 1px solid #eee; }
</style>
</head>
<body>
  <nav>
    <div class="logo">◆ Acme Analytics</div>
    <div class="links">
      <a href="#">Features</a>
      <a href="#">Pricing</a>
      <a href="#">Docs</a>
      <a href="#">Blog</a>
    </div>
    <button class="cta">Get Started Free</button>
  </nav>

  <section class="hero">
    <div class="badge">🚀 Now with AI-powered insights</div>
    <h1>The metrics platform built for fast-moving startups</h1>
    <p>Track revenue, retention, and growth in one beautiful dashboard. Set up in 5 minutes, not 5 days.</p>
    <div class="hero-btns">
      <button class="primary">Start Free Trial</button>
      <button class="secondary">Book a Demo →</button>
    </div>
  </section>

  <div class="metrics">
    <div class="metric"><div class="num">2,400+</div><div class="label">Companies</div></div>
    <div class="metric"><div class="num">99.9%</div><div class="label">Uptime</div></div>
    <div class="metric"><div class="num">4.9/5</div><div class="label">Rating</div></div>
    <div class="metric"><div class="num">&lt;50ms</div><div class="label">Query Speed</div></div>
  </div>

  <section class="features">
    <h2>Everything you need to grow</h2>
    <p class="sub">Powerful analytics tools designed for speed and simplicity.</p>
    <div class="features-grid">
      <div class="feature-card">
        <div class="icon" style="background:#eef2ff;">📊</div>
        <h3>Real-time Dashboards</h3>
        <p>See your metrics update live with sub-second latency across all your data sources.</p>
      </div>
      <div class="feature-card">
        <div class="icon" style="background:#fef3c7;">🧠</div>
        <h3>AI Insights</h3>
        <p>Our AI detects anomalies and surfaces trends before they become obvious to competitors.</p>
      </div>
      <div class="feature-card">
        <div class="icon" style="background:#d1fae5;">🔗</div>
        <h3>200+ Integrations</h3>
        <p>Connect Stripe, Segment, Mixpanel, BigQuery, and more with a single click.</p>
      </div>
      <div class="feature-card">
        <div class="icon" style="background:#fce7f3;">🎯</div>
        <h3>Cohort Analysis</h3>
        <p>Understand retention patterns with flexible cohort breakdowns and funnel tracking.</p>
      </div>
      <div class="feature-card">
        <div class="icon" style="background:#e0e7ff;">📧</div>
        <h3>Automated Reports</h3>
        <p>Schedule weekly digests to Slack, email, or Notion — keep your team in the loop.</p>
      </div>
      <div class="feature-card">
        <div class="icon" style="background:#f3e8ff;">🔒</div>
        <h3>SOC2 Compliant</h3>
        <p>Enterprise-grade security with role-based access, SSO, and audit logs built in.</p>
      </div>
    </div>
  </section>

  <section class="pricing">
    <h2>Simple, transparent pricing</h2>
    <p class="sub">Start free. Scale as you grow. No hidden fees, ever.</p>
    <div class="pricing-grid">
      <div class="price-card">
        <div class="plan">Starter</div>
        <div class="price">$0<span>/mo</span></div>
        <ul class="feat-list">
          <li>Up to 10k events/mo</li>
          <li>3 dashboards</li>
          <li>7-day data retention</li>
          <li>Email support</li>
        </ul>
        <button>Get Started</button>
      </div>
      <div class="price-card popular">
        <div class="plan">Growth</div>
        <div class="price">$49<span>/mo</span></div>
        <ul class="feat-list">
          <li>Up to 1M events/mo</li>
          <li>Unlimited dashboards</li>
          <li>12-month retention</li>
          <li>AI insights</li>
          <li>Slack integration</li>
        </ul>
        <button>Start Free Trial</button>
      </div>
      <div class="price-card">
        <div class="plan">Enterprise</div>
        <div class="price">Custom</div>
        <ul class="feat-list">
          <li>Unlimited events</li>
          <li>Unlimited retention</li>
          <li>SSO & SCIM</li>
          <li>Dedicated CSM</li>
          <li>SLA guarantee</li>
        </ul>
        <button>Contact Sales</button>
      </div>
    </div>
  </section>

  <footer>© 2026 Acme Analytics, Inc. All rights reserved.</footer>
</body>
</html>`,
    },
    {
      id: 'lp5',
      type: 'assistant-message',
      delayMs: 600,
      content: "Here's your landing page! It includes:\n\n- **Hero section** with a gradient background, headline, social proof badges, and dual CTAs\n- **Metrics bar** showing key trust signals (2,400+ companies, 99.9% uptime, etc.)\n- **Features grid** with 6 feature cards using emoji icons and hover effects\n- **Pricing table** with three tiers — Starter (free), Growth ($49/mo, highlighted as most popular), and Enterprise\n\nThe color scheme uses indigo/purple tones for a modern SaaS feel. Would you like me to adjust anything?",
      streamingSpeed: 'normal',
    },
    // ── Turn 2: User wants dark mode ──
    {
      id: 'lp6',
      type: 'user-message',
      delayMs: 1200,
      content: 'This looks great! Can you make it dark mode instead? I want a sleek dark background with the same purple accents.',
      typingEffect: false,
    },
    {
      id: 'lp7',
      type: 'thinking',
      delayMs: 300,
      durationMs: 1000,
    },
    {
      id: 'lp8',
      type: 'assistant-message',
      delayMs: 200,
      content: "Absolutely — I'll convert it to a dark theme with a deep navy background and keep the purple/indigo accents glowing. This will give it a premium, modern feel.",
      streamingSpeed: 'fast',
    },
    {
      id: 'lp9',
      type: 'artifact',
      delayMs: 400,
      artifactType: 'html',
      title: 'Acme Analytics Landing Page (Dark)',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Acme Analytics</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #e2e8f0; line-height: 1.6; background: #0f0f1a; }
  .container { max-width: 1100px; margin: 0 auto; padding: 0 24px; }

  nav { display: flex; align-items: center; justify-content: space-between; padding: 20px 40px; border-bottom: 1px solid #1e1e3a; }
  nav .logo { font-size: 20px; font-weight: 700; color: #818cf8; }
  nav .links { display: flex; gap: 28px; }
  nav .links a { text-decoration: none; color: #94a3b8; font-size: 14px; font-weight: 500; }
  nav .links a:hover { color: #c4b5fd; }
  nav .cta { background: #6366f1; color: #fff; padding: 8px 20px; border-radius: 8px; border: none; font-size: 14px; font-weight: 600; cursor: pointer; }

  .hero { text-align: center; padding: 80px 24px 60px; background: radial-gradient(ellipse at center top, #1e1b4b 0%, #0f0f1a 70%); }
  .hero .badge { display: inline-block; background: rgba(99,102,241,.2); color: #a5b4fc; font-size: 12px; font-weight: 600; padding: 4px 14px; border-radius: 99px; margin-bottom: 16px; border: 1px solid rgba(99,102,241,.3); }
  .hero h1 { font-size: 48px; font-weight: 800; line-height: 1.15; max-width: 700px; margin: 0 auto 20px; background: linear-gradient(135deg, #e0e7ff, #818cf8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
  .hero p { font-size: 18px; color: #94a3b8; max-width: 540px; margin: 0 auto 32px; }
  .hero-btns { display: flex; gap: 12px; justify-content: center; }
  .hero-btns .primary { background: #6366f1; color: #fff; padding: 12px 28px; border-radius: 10px; border: none; font-size: 15px; font-weight: 600; cursor: pointer; box-shadow: 0 0 30px rgba(99,102,241,.3); }
  .hero-btns .secondary { background: rgba(255,255,255,.05); color: #c4b5fd; padding: 12px 28px; border-radius: 10px; border: 1px solid #312e81; font-size: 15px; font-weight: 600; cursor: pointer; }

  .metrics { display: flex; justify-content: center; gap: 60px; padding: 40px 0; border-bottom: 1px solid #1e1e3a; }
  .metrics .metric { text-align: center; }
  .metrics .num { font-size: 32px; font-weight: 800; color: #818cf8; }
  .metrics .label { font-size: 13px; color: #64748b; margin-top: 4px; }

  .features { padding: 80px 24px; }
  .features h2 { text-align: center; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
  .features .sub { text-align: center; color: #64748b; margin-bottom: 48px; font-size: 16px; }
  .features-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 28px; max-width: 1000px; margin: 0 auto; }
  .feature-card { background: #16162a; border: 1px solid #252547; border-radius: 14px; padding: 28px; transition: all .2s; }
  .feature-card:hover { border-color: #4f46e5; box-shadow: 0 0 30px rgba(79,70,229,.15); }
  .feature-card .icon { width: 44px; height: 44px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 20px; margin-bottom: 16px; }
  .feature-card h3 { font-size: 17px; font-weight: 600; margin-bottom: 8px; color: #e2e8f0; }
  .feature-card p { font-size: 14px; color: #94a3b8; }

  .pricing { padding: 80px 24px; background: #0c0c18; }
  .pricing h2 { text-align: center; font-size: 32px; font-weight: 700; margin-bottom: 8px; }
  .pricing .sub { text-align: center; color: #64748b; margin-bottom: 48px; font-size: 16px; }
  .pricing-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; max-width: 900px; margin: 0 auto; }
  .price-card { background: #16162a; border: 1px solid #252547; border-radius: 16px; padding: 32px 28px; text-align: center; }
  .price-card.popular { border: 2px solid #6366f1; box-shadow: 0 0 40px rgba(99,102,241,.15); position: relative; }
  .price-card.popular::before { content: "Most Popular"; position: absolute; top: -12px; left: 50%; transform: translateX(-50%); background: #6366f1; color: #fff; font-size: 11px; font-weight: 600; padding: 3px 14px; border-radius: 99px; }
  .price-card .plan { font-size: 18px; font-weight: 600; margin-bottom: 8px; color: #c4b5fd; }
  .price-card .price { font-size: 42px; font-weight: 800; color: #e2e8f0; }
  .price-card .price span { font-size: 16px; font-weight: 400; color: #64748b; }
  .price-card .feat-list { list-style: none; margin: 24px 0; text-align: left; }
  .price-card .feat-list li { font-size: 14px; color: #94a3b8; padding: 6px 0; padding-left: 22px; position: relative; }
  .price-card .feat-list li::before { content: "✓"; position: absolute; left: 0; color: #818cf8; font-weight: 700; }
  .price-card button { width: 100%; padding: 12px; border-radius: 10px; font-size: 14px; font-weight: 600; cursor: pointer; border: 1px solid #252547; background: #1e1e3a; color: #c4b5fd; }
  .price-card.popular button { background: #6366f1; color: #fff; border: none; box-shadow: 0 0 20px rgba(99,102,241,.3); }

  footer { text-align: center; padding: 32px; color: #475569; font-size: 13px; border-top: 1px solid #1e1e3a; }
</style>
</head>
<body>
  <nav>
    <div class="logo">◆ Acme Analytics</div>
    <div class="links"><a href="#">Features</a><a href="#">Pricing</a><a href="#">Docs</a><a href="#">Blog</a></div>
    <button class="cta">Get Started Free</button>
  </nav>
  <section class="hero">
    <div class="badge">🚀 Now with AI-powered insights</div>
    <h1>The metrics platform built for fast-moving startups</h1>
    <p>Track revenue, retention, and growth in one beautiful dashboard. Set up in 5 minutes, not 5 days.</p>
    <div class="hero-btns"><button class="primary">Start Free Trial</button><button class="secondary">Book a Demo →</button></div>
  </section>
  <div class="metrics">
    <div class="metric"><div class="num">2,400+</div><div class="label">Companies</div></div>
    <div class="metric"><div class="num">99.9%</div><div class="label">Uptime</div></div>
    <div class="metric"><div class="num">4.9/5</div><div class="label">Rating</div></div>
    <div class="metric"><div class="num">&lt;50ms</div><div class="label">Query Speed</div></div>
  </div>
  <section class="features">
    <h2>Everything you need to grow</h2>
    <p class="sub">Powerful analytics tools designed for speed and simplicity.</p>
    <div class="features-grid">
      <div class="feature-card"><div class="icon" style="background:rgba(99,102,241,.15);">📊</div><h3>Real-time Dashboards</h3><p>See your metrics update live with sub-second latency across all your data sources.</p></div>
      <div class="feature-card"><div class="icon" style="background:rgba(251,191,36,.12);">🧠</div><h3>AI Insights</h3><p>Our AI detects anomalies and surfaces trends before they become obvious to competitors.</p></div>
      <div class="feature-card"><div class="icon" style="background:rgba(52,211,153,.12);">🔗</div><h3>200+ Integrations</h3><p>Connect Stripe, Segment, Mixpanel, BigQuery, and more with a single click.</p></div>
      <div class="feature-card"><div class="icon" style="background:rgba(244,114,182,.12);">🎯</div><h3>Cohort Analysis</h3><p>Understand retention patterns with flexible cohort breakdowns and funnel tracking.</p></div>
      <div class="feature-card"><div class="icon" style="background:rgba(129,140,248,.12);">📧</div><h3>Automated Reports</h3><p>Schedule weekly digests to Slack, email, or Notion — keep your team in the loop.</p></div>
      <div class="feature-card"><div class="icon" style="background:rgba(168,85,247,.12);">🔒</div><h3>SOC2 Compliant</h3><p>Enterprise-grade security with role-based access, SSO, and audit logs built in.</p></div>
    </div>
  </section>
  <section class="pricing">
    <h2>Simple, transparent pricing</h2>
    <p class="sub">Start free. Scale as you grow. No hidden fees, ever.</p>
    <div class="pricing-grid">
      <div class="price-card"><div class="plan">Starter</div><div class="price">$0<span>/mo</span></div><ul class="feat-list"><li>Up to 10k events/mo</li><li>3 dashboards</li><li>7-day data retention</li><li>Email support</li></ul><button>Get Started</button></div>
      <div class="price-card popular"><div class="plan">Growth</div><div class="price">$49<span>/mo</span></div><ul class="feat-list"><li>Up to 1M events/mo</li><li>Unlimited dashboards</li><li>12-month retention</li><li>AI insights</li><li>Slack integration</li></ul><button>Start Free Trial</button></div>
      <div class="price-card"><div class="plan">Enterprise</div><div class="price">Custom</div><ul class="feat-list"><li>Unlimited events</li><li>Unlimited retention</li><li>SSO & SCIM</li><li>Dedicated CSM</li><li>SLA guarantee</li></ul><button>Contact Sales</button></div>
    </div>
  </section>
  <footer>© 2026 Acme Analytics, Inc. All rights reserved.</footer>
</body>
</html>`,
    },
    {
      id: 'lp10',
      type: 'assistant-message',
      delayMs: 500,
      content: "Here's the dark mode version! Key changes:\n\n- **Deep navy background** (#0f0f1a) with subtle radial gradient in the hero\n- **Glowing accents** — purple buttons and the popular pricing card have soft box-shadow glows\n- **Card hover effects** — border lights up on hover with a subtle purple glow\n- **All text contrast** adjusted for WCAG readability on dark backgrounds\n\nWant me to add any animations or tweak the colors further?",
      streamingSpeed: 'normal',
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────────────
 *  2. Chat: Build an Interactive Todo App (HTML with working JS)
 * ──────────────────────────────────────────────────────────────────────────── */

export const sampleTodoAppSimulation: Simulation = {
  id: 'sample-todo-app',
  title: 'Build a Todo App',
  description: 'Claude builds an interactive Todo app with local storage',
  productType: 'claude-chat',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'Claude Sonnet 4.6',
      theme: 'light',
      conversationTitle: 'Interactive Todo App',
      sidebarConversations: [
        { id: 'c1', title: 'Interactive Todo App', timestamp: 'Just now', isActive: true },
        { id: 'c2', title: 'Blog post draft', timestamp: '3h ago', isActive: false },
        { id: 'c3', title: 'Meeting notes summary', timestamp: 'Yesterday', isActive: false },
      ],
      projects: [],
    },
  },
  events: [
    {
      id: 'td1',
      type: 'user-message',
      delayMs: 0,
      content: 'Create me a beautiful, fully working todo app. I want it to feel like a real product — with animations, categories, and a clean design. Make it actually functional with add, complete, delete, and filtering.',
      typingEffect: false,
    },
    {
      id: 'td2',
      type: 'thinking',
      delayMs: 300,
      durationMs: 2000,
    },
    {
      id: 'td3',
      type: 'assistant-message',
      delayMs: 200,
      content: "I'll build you a polished todo app with full interactivity. It'll have a clean minimal design, smooth animations, category tags, filtering, and persistent state using localStorage.",
      streamingSpeed: 'fast',
    },
    {
      id: 'td4',
      type: 'artifact',
      delayMs: 500,
      artifactType: 'html',
      title: 'Todo App',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Todo App</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f7;min-height:100vh;display:flex;justify-content:center;padding:40px 20px}
.app{width:100%;max-width:520px}
h1{font-size:28px;font-weight:700;color:#1d1d1f;margin-bottom:4px}
.subtitle{color:#86868b;font-size:14px;margin-bottom:24px}
.input-row{display:flex;gap:8px;margin-bottom:16px}
.input-row input{flex:1;padding:12px 16px;border:1px solid #d2d2d7;border-radius:12px;font-size:15px;outline:none;transition:border .2s}
.input-row input:focus{border-color:#0071e3}
.input-row button{background:#0071e3;color:#fff;border:none;border-radius:12px;padding:12px 20px;font-size:15px;font-weight:600;cursor:pointer;white-space:nowrap;transition:background .15s}
.input-row button:hover{background:#0077ED}
.categories{display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap}
.cat-btn{padding:6px 14px;border-radius:99px;border:1px solid #d2d2d7;background:#fff;font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;color:#1d1d1f}
.cat-btn.active{background:#0071e3;color:#fff;border-color:#0071e3}
.filters{display:flex;gap:4px;margin-bottom:16px;background:#e8e8ed;border-radius:10px;padding:3px}
.filter-btn{flex:1;padding:7px 0;text-align:center;border:none;background:transparent;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;color:#86868b;transition:all .15s}
.filter-btn.active{background:#fff;color:#1d1d1f;box-shadow:0 1px 3px rgba(0,0,0,.08)}
.todo-list{display:flex;flex-direction:column;gap:8px}
.todo-item{display:flex;align-items:center;gap:12px;background:#fff;border:1px solid #e8e8ed;border-radius:12px;padding:14px 16px;transition:all .2s;animation:slideIn .25s ease}
.todo-item.completing{animation:completeAnim .3s ease forwards}
.todo-item.removing{animation:removeAnim .25s ease forwards}
.todo-item.done{opacity:.5}
.todo-item.done .todo-text{text-decoration:line-through;color:#86868b}
@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes completeAnim{0%{transform:scale(1)}50%{transform:scale(1.02)}100%{transform:scale(1)}}
@keyframes removeAnim{to{opacity:0;transform:translateX(30px);height:0;padding:0;margin:0;border:none;overflow:hidden}}
.checkbox{width:22px;height:22px;border:2px solid #d2d2d7;border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.checkbox.checked{background:#34c759;border-color:#34c759}
.checkbox.checked::after{content:"✓";color:#fff;font-size:13px;font-weight:700}
.todo-text{flex:1;font-size:15px;color:#1d1d1f}
.todo-cat{font-size:10px;font-weight:600;padding:3px 8px;border-radius:99px;text-transform:uppercase;letter-spacing:.3px}
.delete-btn{background:none;border:none;color:#d2d2d7;cursor:pointer;font-size:18px;padding:4px;border-radius:6px;transition:all .15s;line-height:1}
.delete-btn:hover{color:#ff3b30;background:rgba(255,59,48,.08)}
.empty{text-align:center;padding:48px 0;color:#86868b;font-size:14px}
.count{text-align:center;color:#86868b;font-size:12px;margin-top:16px}
</style>
</head>
<body>
<div class="app">
  <h1>Today</h1>
  <p class="subtitle" id="date"></p>
  <div class="input-row">
    <input type="text" id="input" placeholder="Add a new task..." />
    <button onclick="addTodo()">Add</button>
  </div>
  <div class="categories" id="cats"></div>
  <div class="filters">
    <button class="filter-btn active" onclick="setFilter('all',this)">All</button>
    <button class="filter-btn" onclick="setFilter('active',this)">Active</button>
    <button class="filter-btn" onclick="setFilter('done',this)">Done</button>
  </div>
  <div class="todo-list" id="list"></div>
  <p class="count" id="count"></p>
</div>
<script>
const CATS=[
  {name:'Personal',color:'#007aff',bg:'rgba(0,122,255,.1)'},
  {name:'Work',color:'#ff9500',bg:'rgba(255,149,0,.1)'},
  {name:'Health',color:'#34c759',bg:'rgba(52,199,89,.1)'},
  {name:'Learning',color:'#af52de',bg:'rgba(175,82,222,.1)'}
];
let todos=[
  {id:1,text:'Review Q2 analytics report',done:false,cat:'Work'},
  {id:2,text:'Morning run — 5km',done:true,cat:'Health'},
  {id:3,text:'Read chapter 4 of DDIA',done:false,cat:'Learning'},
  {id:4,text:'Call dentist for appointment',done:false,cat:'Personal'},
  {id:5,text:'Prepare sprint demo slides',done:false,cat:'Work'},
];
let filter='all',selCat=null,nextId=6;

document.getElementById('date').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
document.getElementById('input').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo()});

function renderCats(){
  const el=document.getElementById('cats');
  el.innerHTML=CATS.map(c=>'<button class="cat-btn'+(selCat===c.name?' active':'')+'" onclick="toggleCat(\''+c.name+'\')">'+c.name+'</button>').join('');
}
function toggleCat(name){selCat=selCat===name?null:name;renderCats();render()}
function setFilter(f,btn){
  filter=f;
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  render();
}
function addTodo(){
  const inp=document.getElementById('input');
  const text=inp.value.trim();
  if(!text)return;
  todos.unshift({id:nextId++,text,done:false,cat:selCat||'Personal'});
  inp.value='';
  render();
}
function toggle(id){
  const t=todos.find(t=>t.id===id);
  if(t){t.done=!t.done;render()}
}
function remove(id){
  const el=document.querySelector('[data-id="'+id+'"]');
  if(el){el.classList.add('removing');setTimeout(()=>{todos=todos.filter(t=>t.id!==id);render()},250)}
}
function render(){
  let filtered=todos;
  if(filter==='active')filtered=todos.filter(t=>!t.done);
  if(filter==='done')filtered=todos.filter(t=>t.done);
  if(selCat)filtered=filtered.filter(t=>t.cat===selCat);
  const list=document.getElementById('list');
  if(!filtered.length){list.innerHTML='<div class="empty">No tasks here yet</div>';document.getElementById('count').textContent='';return}
  list.innerHTML=filtered.map(t=>{
    const c=CATS.find(c=>c.name===t.cat)||CATS[0];
    return '<div class="todo-item'+(t.done?' done':'')+'" data-id="'+t.id+'"><div class="checkbox'+(t.done?' checked':'')+'" onclick="toggle('+t.id+')"></div><span class="todo-text">'+t.text+'</span><span class="todo-cat" style="color:'+c.color+';background:'+c.bg+'">'+t.cat+'</span><button class="delete-btn" onclick="remove('+t.id+')">×</button></div>';
  }).join('');
  const active=todos.filter(t=>!t.done).length;
  document.getElementById('count').textContent=active+' task'+(active!==1?'s':'')+' remaining';
}
renderCats();render();
</script>
</body>
</html>`,
    },
    {
      id: 'td5',
      type: 'assistant-message',
      delayMs: 600,
      content: "Here's your fully interactive todo app! It's all working right in the preview — try it out:\n\n**Features:**\n- **Add tasks** with the input field (press Enter or click Add)\n- **Toggle completion** by clicking the checkbox — with a satisfying animation\n- **Delete tasks** with the × button (slide-out animation)\n- **Filter** between All / Active / Done\n- **Category tags** — Personal, Work, Health, Learning — click to filter by category\n- **Slide-in animation** when new tasks appear\n\nThe design follows Apple's HIG with the rounded corners, muted grays, and SF-style typography. Would you like me to add drag-to-reorder, due dates, or a dark mode toggle?",
      streamingSpeed: 'normal',
    },
    // ── Turn 2: Add dark mode toggle ──
    {
      id: 'td6',
      type: 'user-message',
      delayMs: 1000,
      content: 'Yes! Add a dark mode toggle in the top right corner.',
      typingEffect: false,
    },
    {
      id: 'td7',
      type: 'thinking',
      delayMs: 300,
      durationMs: 800,
    },
    {
      id: 'td8',
      type: 'assistant-message',
      delayMs: 200,
      content: "Done — I've added a sun/moon toggle in the top right that smoothly transitions between light and dark themes. The dark theme uses a rich charcoal palette that's easy on the eyes.",
      streamingSpeed: 'fast',
    },
    {
      id: 'td9',
      type: 'artifact',
      delayMs: 400,
      artifactType: 'html',
      title: 'Todo App (with Dark Mode)',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Todo App</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
:root{--bg:#f5f5f7;--card:#fff;--border:#e8e8ed;--text:#1d1d1f;--text2:#86868b;--input-border:#d2d2d7;--filter-bg:#e8e8ed;--filter-active-bg:#fff;--accent:#0071e3}
[data-theme="dark"]{--bg:#1c1c1e;--card:#2c2c2e;--border:#3a3a3c;--text:#f5f5f7;--text2:#98989d;--input-border:#48484a;--filter-bg:#2c2c2e;--filter-active-bg:#48484a;--accent:#0a84ff}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:var(--bg);min-height:100vh;display:flex;justify-content:center;padding:40px 20px;transition:background .3s}
.app{width:100%;max-width:520px}
.header{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:24px}
h1{font-size:28px;font-weight:700;color:var(--text)}
.subtitle{color:var(--text2);font-size:14px;margin-top:2px}
.theme-toggle{width:40px;height:40px;border-radius:12px;border:1px solid var(--border);background:var(--card);cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;transition:all .2s}
.theme-toggle:hover{border-color:var(--accent)}
.input-row{display:flex;gap:8px;margin-bottom:16px}
.input-row input{flex:1;padding:12px 16px;border:1px solid var(--input-border);border-radius:12px;font-size:15px;outline:none;transition:border .2s;background:var(--card);color:var(--text)}
.input-row input:focus{border-color:var(--accent)}
.input-row button{background:var(--accent);color:#fff;border:none;border-radius:12px;padding:12px 20px;font-size:15px;font-weight:600;cursor:pointer;white-space:nowrap}
.categories{display:flex;gap:6px;margin-bottom:20px;flex-wrap:wrap}
.cat-btn{padding:6px 14px;border-radius:99px;border:1px solid var(--input-border);background:var(--card);font-size:12px;font-weight:500;cursor:pointer;transition:all .15s;color:var(--text)}
.cat-btn.active{background:var(--accent);color:#fff;border-color:var(--accent)}
.filters{display:flex;gap:4px;margin-bottom:16px;background:var(--filter-bg);border-radius:10px;padding:3px}
.filter-btn{flex:1;padding:7px 0;text-align:center;border:none;background:transparent;border-radius:8px;font-size:12px;font-weight:500;cursor:pointer;color:var(--text2);transition:all .15s}
.filter-btn.active{background:var(--filter-active-bg);color:var(--text);box-shadow:0 1px 3px rgba(0,0,0,.08)}
.todo-list{display:flex;flex-direction:column;gap:8px}
.todo-item{display:flex;align-items:center;gap:12px;background:var(--card);border:1px solid var(--border);border-radius:12px;padding:14px 16px;transition:all .2s;animation:slideIn .25s ease}
.todo-item.done{opacity:.5}
.todo-item.done .todo-text{text-decoration:line-through;color:var(--text2)}
.todo-item.removing{animation:removeAnim .25s ease forwards}
@keyframes slideIn{from{opacity:0;transform:translateY(-8px)}to{opacity:1;transform:translateY(0)}}
@keyframes removeAnim{to{opacity:0;transform:translateX(30px)}}
.checkbox{width:22px;height:22px;border:2px solid var(--input-border);border-radius:7px;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .15s;flex-shrink:0}
.checkbox.checked{background:#34c759;border-color:#34c759}
.checkbox.checked::after{content:"✓";color:#fff;font-size:13px;font-weight:700}
.todo-text{flex:1;font-size:15px;color:var(--text)}
.todo-cat{font-size:10px;font-weight:600;padding:3px 8px;border-radius:99px;text-transform:uppercase;letter-spacing:.3px}
.delete-btn{background:none;border:none;color:var(--input-border);cursor:pointer;font-size:18px;padding:4px;border-radius:6px;transition:all .15s;line-height:1}
.delete-btn:hover{color:#ff3b30;background:rgba(255,59,48,.08)}
.empty{text-align:center;padding:48px 0;color:var(--text2);font-size:14px}
.count{text-align:center;color:var(--text2);font-size:12px;margin-top:16px}
</style>
</head>
<body>
<div class="app">
  <div class="header">
    <div><h1>Today</h1><p class="subtitle" id="date"></p></div>
    <button class="theme-toggle" onclick="toggleTheme()" id="themeBtn">🌙</button>
  </div>
  <div class="input-row">
    <input type="text" id="input" placeholder="Add a new task..."/>
    <button onclick="addTodo()">Add</button>
  </div>
  <div class="categories" id="cats"></div>
  <div class="filters">
    <button class="filter-btn active" onclick="setFilter('all',this)">All</button>
    <button class="filter-btn" onclick="setFilter('active',this)">Active</button>
    <button class="filter-btn" onclick="setFilter('done',this)">Done</button>
  </div>
  <div class="todo-list" id="list"></div>
  <p class="count" id="count"></p>
</div>
<script>
const CATS=[{name:'Personal',color:'#007aff',bg:'rgba(0,122,255,.1)'},{name:'Work',color:'#ff9500',bg:'rgba(255,149,0,.1)'},{name:'Health',color:'#34c759',bg:'rgba(52,199,89,.1)'},{name:'Learning',color:'#af52de',bg:'rgba(175,82,222,.1)'}];
let todos=[{id:1,text:'Review Q2 analytics report',done:false,cat:'Work'},{id:2,text:'Morning run — 5km',done:true,cat:'Health'},{id:3,text:'Read chapter 4 of DDIA',done:false,cat:'Learning'},{id:4,text:'Call dentist for appointment',done:false,cat:'Personal'},{id:5,text:'Prepare sprint demo slides',done:false,cat:'Work'}];
let filter='all',selCat=null,nextId=6,dark=false;
document.getElementById('date').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
document.getElementById('input').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo()});
function toggleTheme(){dark=!dark;document.documentElement.setAttribute('data-theme',dark?'dark':'');document.getElementById('themeBtn').textContent=dark?'☀️':'🌙'}
function renderCats(){document.getElementById('cats').innerHTML=CATS.map(c=>'<button class="cat-btn'+(selCat===c.name?' active':'')+'" onclick="toggleCat(\''+c.name+'\')">'+c.name+'</button>').join('')}
function toggleCat(n){selCat=selCat===n?null:n;renderCats();render()}
function setFilter(f,btn){filter=f;document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render()}
function addTodo(){const inp=document.getElementById('input');const t=inp.value.trim();if(!t)return;todos.unshift({id:nextId++,text:t,done:false,cat:selCat||'Personal'});inp.value='';render()}
function toggle(id){const t=todos.find(t=>t.id===id);if(t){t.done=!t.done;render()}}
function remove(id){const el=document.querySelector('[data-id="'+id+'"]');if(el){el.classList.add('removing');setTimeout(()=>{todos=todos.filter(t=>t.id!==id);render()},250)}}
function render(){let f=todos;if(filter==='active')f=todos.filter(t=>!t.done);if(filter==='done')f=todos.filter(t=>t.done);if(selCat)f=f.filter(t=>t.cat===selCat);const list=document.getElementById('list');if(!f.length){list.innerHTML='<div class="empty">No tasks here yet</div>';document.getElementById('count').textContent='';return}list.innerHTML=f.map(t=>{const c=CATS.find(c=>c.name===t.cat)||CATS[0];return'<div class="todo-item'+(t.done?' done':'')+'" data-id="'+t.id+'"><div class="checkbox'+(t.done?' checked':'')+'" onclick="toggle('+t.id+')"></div><span class="todo-text">'+t.text+'</span><span class="todo-cat" style="color:'+c.color+';background:'+c.bg+'">'+t.cat+'</span><button class="delete-btn" onclick="remove('+t.id+')">×</button></div>'}).join('');const a=todos.filter(t=>!t.done).length;document.getElementById('count').textContent=a+' task'+(a!==1?'s':'')+' remaining'}
renderCats();render();
</script>
</body>
</html>`,
    },
    {
      id: 'td10',
      type: 'assistant-message',
      delayMs: 500,
      content: "Done! There's now a moon/sun toggle in the top right corner. The dark theme uses CSS custom properties for a smooth transition — all colors update simultaneously with a 0.3s ease. The dark palette uses Apple's standard dark grays (#1c1c1e, #2c2c2e, #3a3a3c) for a native feel.",
      streamingSpeed: 'normal',
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────────────
 *  3. Code: Build and deploy a REST API with tests
 * ──────────────────────────────────────────────────────────────────────────── */

export const sampleApiSimulation: Simulation = {
  id: 'sample-api-build',
  title: 'Build a REST API',
  description: 'Claude Code builds a REST API from scratch with tests and database setup',
  productType: 'claude-code',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    codeConfig: {
      modelName: 'claude-opus-4-6',
      gitBranch: 'main',
      workingDirectory: '/Users/dev/bookshelf-api',
      initialCost: '$0.00',
      initialContext: 2,
    },
  },
  events: [
    {
      id: 'api1',
      type: 'user-message',
      delayMs: 0,
      content: 'Set up a Node.js REST API for a bookshelf app using Express and SQLite. I need CRUD endpoints for books, input validation, error handling, and tests. Use TypeScript.',
      typingEffect: true,
    },
    {
      id: 'api2',
      type: 'thinking',
      delayMs: 400,
      durationMs: 2000,
      label: 'Planning project structure...',
    },
    {
      id: 'api3',
      type: 'assistant-message',
      delayMs: 200,
      content: "I'll set up a TypeScript Express API with SQLite for a bookshelf app. Let me start by creating the project structure and installing dependencies.",
      streamingSpeed: 'fast',
    },
    {
      id: 'api4',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'Bash',
      toolInput: { command: 'mkdir -p src/{routes,middleware,db} tests && npm init -y' },
      description: 'Creating project structure',
      expandedByDefault: false,
    },
    {
      id: 'api5',
      type: 'tool-result',
      delayMs: 800,
      toolCallId: 'api4',
      output: `Wrote to /Users/dev/bookshelf-api/package.json:\n{\n  "name": "bookshelf-api",\n  "version": "1.0.0"\n}`,
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'api6',
      type: 'permission-prompt',
      delayMs: 200,
      toolName: 'Bash',
      description: 'Install npm packages',
      command: 'npm install express better-sqlite3 zod && npm install -D typescript @types/express @types/better-sqlite3 vitest supertest @types/supertest tsx',
    },
    {
      id: 'api7',
      type: 'permission-response',
      delayMs: 1500,
      promptId: 'api6',
      response: 'allow',
    },
    {
      id: 'api8',
      type: 'tool-call',
      delayMs: 200,
      toolName: 'Bash',
      toolInput: { command: 'npm install express better-sqlite3 zod && npm install -D typescript @types/express @types/better-sqlite3 vitest supertest @types/supertest tsx' },
      description: 'Installing dependencies',
      expandedByDefault: false,
    },
    {
      id: 'api9',
      type: 'tool-result',
      delayMs: 3000,
      toolCallId: 'api8',
      output: 'added 127 packages in 4s\n\n18 packages are looking for funding\n  run `npm fund` for details',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'api10',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.04', contextPercent: 6 },
    },
    {
      id: 'api11',
      type: 'tool-call',
      delayMs: 200,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/bookshelf-api/src/db/schema.ts' },
      description: 'Creating database schema',
      expandedByDefault: true,
    },
    {
      id: 'api12',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'api11',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'api13',
      type: 'tool-call',
      delayMs: 200,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/bookshelf-api/src/db/database.ts' },
      description: 'Creating database connection module',
      expandedByDefault: false,
    },
    {
      id: 'api14',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'api13',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'api15',
      type: 'tool-call',
      delayMs: 200,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/bookshelf-api/src/routes/books.ts' },
      description: 'Creating books router with CRUD endpoints',
      expandedByDefault: true,
    },
    {
      id: 'api16',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'api15',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'api17',
      type: 'tool-call',
      delayMs: 200,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/bookshelf-api/src/middleware/validate.ts' },
      description: 'Creating Zod validation middleware',
      expandedByDefault: false,
    },
    {
      id: 'api18',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'api17',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'api19',
      type: 'tool-call',
      delayMs: 200,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/bookshelf-api/src/index.ts' },
      description: 'Creating main server entry point',
      expandedByDefault: false,
    },
    {
      id: 'api20',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'api19',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'api21',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.12', contextPercent: 14 },
    },
    {
      id: 'api22',
      type: 'assistant-message',
      delayMs: 300,
      content: "Good — the core API is set up. Now let me write the test suite using Vitest and Supertest.",
      streamingSpeed: 'fast',
    },
    {
      id: 'api23',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/bookshelf-api/tests/books.test.ts' },
      description: 'Writing API test suite',
      expandedByDefault: true,
    },
    {
      id: 'api24',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'api23',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'api25',
      type: 'tool-call',
      delayMs: 300,
      toolName: 'Bash',
      toolInput: { command: 'npx vitest run --reporter=verbose 2>&1' },
      description: 'Running tests',
      expandedByDefault: true,
    },
    {
      id: 'api26',
      type: 'tool-result',
      delayMs: 2500,
      toolCallId: 'api25',
      output: ` ✓ tests/books.test.ts (7 tests) 142ms
   ✓ GET /api/books > returns empty array initially
   ✓ POST /api/books > creates a new book
   ✓ POST /api/books > validates required fields
   ✓ GET /api/books/:id > returns a single book
   ✓ GET /api/books/:id > returns 404 for missing book
   ✓ PUT /api/books/:id > updates a book
   ✓ DELETE /api/books/:id > deletes a book

 Test Files  1 passed (1)
      Tests  7 passed (7)
   Start at  14:32:18
   Duration  1.24s (transform 89ms, setup 0ms, collect 234ms, tests 142ms, environment 0ms, prepare 41ms)`,
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'api27',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.18', contextPercent: 19 },
    },
    {
      id: 'api28',
      type: 'assistant-message',
      delayMs: 400,
      content: "All 7 tests pass. Here's what I built:\n\n**Project structure:**\n```\nsrc/\n  db/schema.ts       — SQLite table definition (books: id, title, author, isbn, year, created_at)\n  db/database.ts     — Connection singleton with WAL mode\n  routes/books.ts    — Full CRUD: GET /, GET /:id, POST /, PUT /:id, DELETE /:id\n  middleware/validate.ts — Zod schema validation middleware\n  index.ts           — Express app setup with error handler\ntests/\n  books.test.ts      — 7 tests covering all endpoints + validation\n```\n\n**Key decisions:**\n- **Zod** for request validation — returns structured error messages\n- **better-sqlite3** for synchronous SQLite (simpler than async for this use case)\n- **In-memory DB for tests** so they're fast and isolated\n- **Proper HTTP status codes**: 201 for create, 204 for delete, 404 for missing, 400 for validation errors\n\nRun `npx tsx src/index.ts` to start the server on port 3000. Want me to add pagination, search, or authentication next?",
      streamingSpeed: 'normal',
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────────────
 *  4. Chat: Build a Dashboard with Charts (interactive HTML)
 * ──────────────────────────────────────────────────────────────────────────── */

export const sampleDashboardSimulation: Simulation = {
  id: 'sample-dashboard',
  title: 'Build a Dashboard',
  description: 'Claude creates an interactive analytics dashboard with charts',
  productType: 'claude-chat',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'Claude Opus 4',
      theme: 'light',
      conversationTitle: 'Analytics Dashboard',
      sidebarConversations: [
        { id: 'c1', title: 'Analytics Dashboard', timestamp: 'Just now', isActive: true },
        { id: 'c2', title: 'Data pipeline debug', timestamp: '4h ago', isActive: false },
        { id: 'c3', title: 'Quarterly report outline', timestamp: 'Apr 10', isActive: false },
        { id: 'c4', title: 'SQL query help', timestamp: 'Apr 9', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Analytics Platform', conversationCount: 9 },
      ],
    },
  },
  events: [
    {
      id: 'db1',
      type: 'user-message',
      delayMs: 0,
      content: 'Create a startup analytics dashboard. I want to see revenue, user growth, churn, and activity metrics. Use charts — make it look like a real product dashboard, not a toy.',
      typingEffect: false,
    },
    {
      id: 'db2',
      type: 'thinking',
      delayMs: 400,
      durationMs: 2000,
    },
    {
      id: 'db3',
      type: 'assistant-message',
      delayMs: 200,
      content: "I'll build a production-quality analytics dashboard with custom SVG charts (no external dependencies), real-looking data, and a clean sidebar layout. Let me put this together.",
      streamingSpeed: 'fast',
    },
    {
      id: 'db4',
      type: 'artifact',
      delayMs: 500,
      artifactType: 'html',
      title: 'Startup Analytics Dashboard',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Dashboard</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f8f9fb;color:#1a1a2e;display:flex;height:100vh;overflow:hidden}
.sidebar{width:220px;background:#fff;border-right:1px solid #e5e7eb;padding:20px 0;display:flex;flex-direction:column}
.sidebar .logo{padding:0 20px 20px;font-size:18px;font-weight:700;color:#4f46e5;border-bottom:1px solid #f3f4f6}
.sidebar nav{flex:1;padding:12px 10px}
.sidebar a{display:flex;align-items:center;gap:10px;padding:9px 14px;border-radius:8px;font-size:13px;color:#6b7280;text-decoration:none;font-weight:500;margin-bottom:2px;transition:all .15s}
.sidebar a:hover{background:#f3f4f6;color:#1f2937}
.sidebar a.active{background:#eef2ff;color:#4f46e5;font-weight:600}
.sidebar a .icon{width:18px;text-align:center}
.main{flex:1;overflow-y:auto;padding:28px 32px}
.main h1{font-size:22px;font-weight:700;margin-bottom:4px}
.main .sub{color:#6b7280;font-size:13px;margin-bottom:24px}
.kpi-row{display:grid;grid-template-columns:repeat(4,1fr);gap:16px;margin-bottom:28px}
.kpi{background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:20px}
.kpi .label{font-size:12px;color:#6b7280;font-weight:500;margin-bottom:6px}
.kpi .value{font-size:28px;font-weight:700;color:#111827}
.kpi .change{font-size:12px;font-weight:600;margin-top:4px}
.kpi .change.up{color:#059669}
.kpi .change.down{color:#dc2626}
.charts-row{display:grid;grid-template-columns:2fr 1fr;gap:16px;margin-bottom:28px}
.chart-card{background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:20px}
.chart-card h3{font-size:14px;font-weight:600;margin-bottom:16px}
svg text{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
.table-card{background:#fff;border:1px solid #e5e7eb;border-radius:14px;padding:20px}
.table-card h3{font-size:14px;font-weight:600;margin-bottom:16px}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;color:#6b7280;font-weight:500;padding:8px 0;border-bottom:1px solid #f3f4f6}
td{padding:10px 0;border-bottom:1px solid #f9fafb;color:#374151}
td:last-child{text-align:right}
.badge{font-size:11px;font-weight:600;padding:2px 8px;border-radius:99px}
.badge.green{background:#d1fae5;color:#065f46}
.badge.yellow{background:#fef3c7;color:#92400e}
.badge.red{background:#fee2e2;color:#991b1b}
</style>
</head>
<body>
<div class="sidebar">
  <div class="logo">◆ Acme</div>
  <nav>
    <a href="#" class="active"><span class="icon">📊</span> Dashboard</a>
    <a href="#"><span class="icon">👥</span> Users</a>
    <a href="#"><span class="icon">💰</span> Revenue</a>
    <a href="#"><span class="icon">📈</span> Growth</a>
    <a href="#"><span class="icon">🔔</span> Alerts</a>
    <a href="#"><span class="icon">⚙️</span> Settings</a>
  </nav>
</div>
<div class="main">
  <h1>Dashboard</h1>
  <p class="sub">April 2026 · All properties</p>

  <div class="kpi-row">
    <div class="kpi"><div class="label">Monthly Revenue</div><div class="value">$48.2K</div><div class="change up">↑ 12.3% vs last month</div></div>
    <div class="kpi"><div class="label">Active Users</div><div class="value">2,847</div><div class="change up">↑ 8.1% vs last month</div></div>
    <div class="kpi"><div class="label">Churn Rate</div><div class="value">3.2%</div><div class="change down">↑ 0.4% vs last month</div></div>
    <div class="kpi"><div class="label">Avg. Session</div><div class="value">4m 32s</div><div class="change up">↑ 18s vs last month</div></div>
  </div>

  <div class="charts-row">
    <div class="chart-card">
      <h3>Revenue (Last 12 Months)</h3>
      <svg viewBox="0 0 600 200" width="100%" height="200">
        <defs><linearGradient id="rg" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="#4f46e5" stop-opacity=".15"/><stop offset="100%" stop-color="#4f46e5" stop-opacity="0"/></linearGradient></defs>
        <!-- Grid lines -->
        <line x1="40" y1="20" x2="580" y2="20" stroke="#f3f4f6" stroke-width="1"/>
        <line x1="40" y1="65" x2="580" y2="65" stroke="#f3f4f6" stroke-width="1"/>
        <line x1="40" y1="110" x2="580" y2="110" stroke="#f3f4f6" stroke-width="1"/>
        <line x1="40" y1="155" x2="580" y2="155" stroke="#f3f4f6" stroke-width="1"/>
        <!-- Y axis labels -->
        <text x="32" y="24" text-anchor="end" fill="#9ca3af" font-size="10">$50K</text>
        <text x="32" y="69" text-anchor="end" fill="#9ca3af" font-size="10">$40K</text>
        <text x="32" y="114" text-anchor="end" fill="#9ca3af" font-size="10">$30K</text>
        <text x="32" y="159" text-anchor="end" fill="#9ca3af" font-size="10">$20K</text>
        <!-- Area -->
        <path d="M40,145 L85,140 L130,130 L175,125 L220,115 L265,100 L310,95 L355,85 L400,70 L445,55 L490,45 L535,30 L580,20 L580,170 L40,170Z" fill="url(#rg)"/>
        <!-- Line -->
        <polyline points="40,145 85,140 130,130 175,125 220,115 265,100 310,95 355,85 400,70 445,55 490,45 535,30 580,20" fill="none" stroke="#4f46e5" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
        <!-- Dots -->
        <circle cx="580" cy="20" r="4" fill="#4f46e5"/><circle cx="535" cy="30" r="3" fill="#4f46e5"/>
        <!-- X axis labels -->
        <text x="40" y="188" fill="#9ca3af" font-size="10" text-anchor="middle">May</text>
        <text x="130" y="188" fill="#9ca3af" font-size="10" text-anchor="middle">Jul</text>
        <text x="220" y="188" fill="#9ca3af" font-size="10" text-anchor="middle">Sep</text>
        <text x="310" y="188" fill="#9ca3af" font-size="10" text-anchor="middle">Nov</text>
        <text x="400" y="188" fill="#9ca3af" font-size="10" text-anchor="middle">Jan</text>
        <text x="490" y="188" fill="#9ca3af" font-size="10" text-anchor="middle">Mar</text>
      </svg>
    </div>
    <div class="chart-card">
      <h3>Users by Plan</h3>
      <svg viewBox="0 0 200 200" width="100%" height="180">
        <!-- Donut chart -->
        <circle cx="100" cy="90" r="60" fill="none" stroke="#e0e7ff" stroke-width="24"/>
        <circle cx="100" cy="90" r="60" fill="none" stroke="#4f46e5" stroke-width="24" stroke-dasharray="226 377" stroke-dashoffset="0" transform="rotate(-90 100 90)"/>
        <circle cx="100" cy="90" r="60" fill="none" stroke="#818cf8" stroke-width="24" stroke-dasharray="94 377" stroke-dashoffset="-226" transform="rotate(-90 100 90)"/>
        <circle cx="100" cy="90" r="60" fill="none" stroke="#c7d2fe" stroke-width="24" stroke-dasharray="57 377" stroke-dashoffset="-320" transform="rotate(-90 100 90)"/>
        <text x="100" y="86" text-anchor="middle" font-size="20" font-weight="700" fill="#111827">2,847</text>
        <text x="100" y="100" text-anchor="middle" font-size="10" fill="#6b7280">total users</text>
        <!-- Legend -->
        <circle cx="30" cy="170" r="5" fill="#4f46e5"/><text x="40" y="174" font-size="11" fill="#374151">Growth 60%</text>
        <circle cx="120" cy="170" r="5" fill="#818cf8"/><text x="130" y="174" font-size="11" fill="#374151">Starter 25%</text>
        <circle cx="30" cy="190" r="5" fill="#c7d2fe"/><text x="40" y="194" font-size="11" fill="#374151">Enterprise 15%</text>
      </svg>
    </div>
  </div>

  <div class="table-card">
    <h3>Recent Activity</h3>
    <table>
      <thead><tr><th>User</th><th>Action</th><th>Plan</th><th>Status</th><th>Time</th></tr></thead>
      <tbody>
        <tr><td>Sarah Chen</td><td>Upgraded plan</td><td>Growth → Enterprise</td><td><span class="badge green">Completed</span></td><td>2m ago</td></tr>
        <tr><td>Mike Rodriguez</td><td>Created dashboard</td><td>Growth</td><td><span class="badge green">Active</span></td><td>15m ago</td></tr>
        <tr><td>Emily Watson</td><td>Exceeded event limit</td><td>Starter</td><td><span class="badge yellow">Warning</span></td><td>1h ago</td></tr>
        <tr><td>James Liu</td><td>Payment failed</td><td>Growth</td><td><span class="badge red">Action needed</span></td><td>2h ago</td></tr>
        <tr><td>Anna Kowalski</td><td>New signup</td><td>Starter</td><td><span class="badge green">Active</span></td><td>3h ago</td></tr>
      </tbody>
    </table>
  </div>
</div>
</body>
</html>`,
    },
    {
      id: 'db5',
      type: 'assistant-message',
      delayMs: 600,
      content: "Here's your analytics dashboard! It features:\n\n- **4 KPI cards** — revenue, active users, churn rate, and average session time with month-over-month changes\n- **Revenue line chart** — SVG area chart showing 12-month growth trajectory with gradient fill\n- **Users donut chart** — plan distribution breakdown (Growth 60%, Starter 25%, Enterprise 15%)\n- **Activity table** — recent user events with color-coded status badges\n- **Sidebar navigation** — clean icon + label layout with active state\n\nAll charts are pure SVG — no JavaScript libraries required. The design follows a neutral gray/indigo palette that's standard for B2B dashboards. Would you like me to add date range filters, interactive tooltips, or export functionality?",
      streamingSpeed: 'normal',
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────────────
 *  5. Cowork: Scaffold and build a full-stack app
 * ──────────────────────────────────────────────────────────────────────────── */

export const sampleCoworkBuildSimulation: Simulation = {
  id: 'sample-cowork-build',
  title: 'Cowork: Build Full-Stack App',
  description: 'Claude Cowork autonomously builds a notes app with frontend and backend',
  productType: 'claude-cowork',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    coworkConfig: {
      taskTitle: 'Build a notes app',
      folderPath: '/Users/dev/notes-app',
      suggestions: ['Build an app', 'Refactor code', 'Write tests', 'Review PR'],
    },
  },
  events: [
    {
      id: 'cwb1',
      type: 'user-message',
      delayMs: 0,
      content: 'Build a full-stack notes app with a React frontend and Express backend. Include markdown support, search, and a clean UI. Deploy-ready with Docker.',
      typingEffect: true,
    },
    {
      id: 'cwb2',
      type: 'thinking',
      delayMs: 500,
      durationMs: 2000,
      label: 'Planning full-stack architecture...',
    },
    {
      id: 'cwb3',
      type: 'assistant-message',
      delayMs: 300,
      content: "I'll build this as a monorepo with a React + Vite frontend and Express + SQLite backend. Let me scaffold the project, set up the API, build the UI, and containerize everything.",
      streamingSpeed: 'fast',
    },
    {
      id: 'cwb4',
      type: 'cowork-progress',
      delayMs: 500,
      stepIndex: 0,
      stepLabel: 'Scaffolding project structure',
      status: 'running',
      detail: 'Creating monorepo with client/ and server/ directories...',
    },
    {
      id: 'cwb5',
      type: 'tool-call',
      delayMs: 800,
      toolName: 'Bash',
      toolInput: { command: 'mkdir -p client/src/{components,hooks,lib} server/src/{routes,db} && npm init -y' },
      description: 'Creating monorepo structure',
      expandedByDefault: false,
    },
    {
      id: 'cwb6',
      type: 'tool-result',
      delayMs: 500,
      toolCallId: 'cwb5',
      output: 'Created directories and package.json',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'cwb7',
      type: 'cowork-progress',
      delayMs: 1500,
      stepIndex: 0,
      stepLabel: 'Scaffolding project structure',
      status: 'complete',
      detail: 'Created 14 directories, initialized npm workspaces',
    },
    // Backend
    {
      id: 'cwb8',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 1,
      stepLabel: 'Building Express API',
      status: 'running',
      detail: 'Setting up routes, database, and middleware...',
    },
    {
      id: 'cwb9',
      type: 'tool-call',
      delayMs: 1000,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/notes-app/server/src/routes/notes.ts' },
      description: 'Creating notes CRUD routes',
      expandedByDefault: false,
    },
    {
      id: 'cwb10',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'cwb9',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'cwb11',
      type: 'tool-call',
      delayMs: 400,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/notes-app/server/src/db/schema.ts' },
      description: 'Creating SQLite schema (notes: id, title, content, tags, timestamps)',
      expandedByDefault: false,
    },
    {
      id: 'cwb12',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'cwb11',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'cwb13',
      type: 'cowork-progress',
      delayMs: 2500,
      stepIndex: 1,
      stepLabel: 'Building Express API',
      status: 'complete',
      detail: 'Created 6 files: routes, database, middleware, server entry',
    },
    // Frontend
    {
      id: 'cwb14',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 2,
      stepLabel: 'Building React frontend',
      status: 'running',
      detail: 'Creating components, hooks, and styling...',
    },
    {
      id: 'cwb15',
      type: 'tool-call',
      delayMs: 1200,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/notes-app/client/src/components/NoteEditor.tsx' },
      description: 'Creating markdown note editor with live preview',
      expandedByDefault: false,
    },
    {
      id: 'cwb16',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'cwb15',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'cwb17',
      type: 'tool-call',
      delayMs: 400,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/notes-app/client/src/components/NoteList.tsx' },
      description: 'Creating searchable note list sidebar',
      expandedByDefault: false,
    },
    {
      id: 'cwb18',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'cwb17',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'cwb19',
      type: 'cowork-progress',
      delayMs: 3000,
      stepIndex: 2,
      stepLabel: 'Building React frontend',
      status: 'complete',
      detail: 'Created 8 components, 3 hooks, Tailwind config',
    },
    // Docker
    {
      id: 'cwb20',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 3,
      stepLabel: 'Adding Docker configuration',
      status: 'running',
      detail: 'Creating multi-stage Dockerfile and docker-compose...',
    },
    {
      id: 'cwb21',
      type: 'tool-call',
      delayMs: 800,
      toolName: 'Write',
      toolInput: { file_path: '/Users/dev/notes-app/Dockerfile' },
      description: 'Creating multi-stage Dockerfile',
      expandedByDefault: false,
    },
    {
      id: 'cwb22',
      type: 'tool-result',
      delayMs: 100,
      toolCallId: 'cwb21',
      output: 'File created successfully.',
      isError: false,
      isCollapsed: true,
    },
    {
      id: 'cwb23',
      type: 'cowork-progress',
      delayMs: 1500,
      stepIndex: 3,
      stepLabel: 'Adding Docker configuration',
      status: 'complete',
      detail: 'Created Dockerfile, docker-compose.yml, .dockerignore',
    },
    // Tests
    {
      id: 'cwb24',
      type: 'cowork-progress',
      delayMs: 300,
      stepIndex: 4,
      stepLabel: 'Running tests and verification',
      status: 'running',
      detail: 'Type-checking and running test suite...',
    },
    {
      id: 'cwb25',
      type: 'tool-call',
      delayMs: 1500,
      toolName: 'Bash',
      toolInput: { command: 'npm run typecheck && npm test 2>&1' },
      description: 'Running type-check and tests',
      expandedByDefault: true,
    },
    {
      id: 'cwb26',
      type: 'tool-result',
      delayMs: 2000,
      toolCallId: 'cwb25',
      output: `$ tsc --noEmit
✔ No type errors found

$ vitest run
 ✓ server/tests/notes.test.ts (5 tests) 98ms
 ✓ client/tests/NoteEditor.test.tsx (3 tests) 204ms

 Test Files  2 passed (2)
      Tests  8 passed (8)
   Duration  1.87s`,
      isError: false,
      isCollapsed: false,
    },
    {
      id: 'cwb27',
      type: 'cowork-progress',
      delayMs: 1000,
      stepIndex: 4,
      stepLabel: 'Running tests and verification',
      status: 'complete',
      detail: '8 tests passed, 0 type errors',
    },
    {
      id: 'cwb28',
      type: 'cowork-notification',
      delayMs: 500,
      notificationType: 'finished',
      message: 'Full-stack notes app is ready! Created 24 files across client and server. All tests pass. Run `docker compose up` to start.',
    },
  ],
}
