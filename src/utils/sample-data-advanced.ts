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
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}

document.getElementById('date').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
document.getElementById('input').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo()});

function renderCats(){
  const el=document.getElementById('cats');
  el.innerHTML=CATS.map(c=>'<button class="cat-btn'+(selCat===c.name?' active':'')+'" onclick="toggleCat(\''+esc(c.name)+'\')">'+esc(c.name)+'</button>').join('');
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
    return '<div class="todo-item'+(t.done?' done':'')+'" data-id="'+t.id+'"><div class="checkbox'+(t.done?' checked':'')+'" onclick="toggle('+t.id+')"></div><span class="todo-text">'+esc(t.text)+'</span><span class="todo-cat" style="color:'+esc(c.color)+';background:'+esc(c.bg)+'">'+esc(t.cat)+'</span><button class="delete-btn" onclick="remove('+t.id+')">×</button></div>';
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
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
document.getElementById('date').textContent=new Date().toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
document.getElementById('input').addEventListener('keydown',e=>{if(e.key==='Enter')addTodo()});
function toggleTheme(){dark=!dark;document.documentElement.setAttribute('data-theme',dark?'dark':'');document.getElementById('themeBtn').textContent=dark?'☀️':'🌙'}
function renderCats(){document.getElementById('cats').innerHTML=CATS.map(c=>'<button class="cat-btn'+(selCat===c.name?' active':'')+'" onclick="toggleCat(\''+esc(c.name)+'\')">'+esc(c.name)+'</button>').join('')}
function toggleCat(n){selCat=selCat===n?null:n;renderCats();render()}
function setFilter(f,btn){filter=f;document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');render()}
function addTodo(){const inp=document.getElementById('input');const t=inp.value.trim();if(!t)return;todos.unshift({id:nextId++,text:t,done:false,cat:selCat||'Personal'});inp.value='';render()}
function toggle(id){const t=todos.find(t=>t.id===id);if(t){t.done=!t.done;render()}}
function remove(id){const el=document.querySelector('[data-id="'+id+'"]');if(el){el.classList.add('removing');setTimeout(()=>{todos=todos.filter(t=>t.id!==id);render()},250)}}
function render(){let f=todos;if(filter==='active')f=todos.filter(t=>!t.done);if(filter==='done')f=todos.filter(t=>t.done);if(selCat)f=f.filter(t=>t.cat===selCat);const list=document.getElementById('list');if(!f.length){list.innerHTML='<div class="empty">No tasks here yet</div>';document.getElementById('count').textContent='';return}list.innerHTML=f.map(t=>{const c=CATS.find(c=>c.name===t.cat)||CATS[0];return'<div class="todo-item'+(t.done?' done':'')+'" data-id="'+t.id+'"><div class="checkbox'+(t.done?' checked':'')+'" onclick="toggle('+t.id+')"></div><span class="todo-text">'+esc(t.text)+'</span><span class="todo-cat" style="color:'+esc(c.color)+';background:'+esc(c.bg)+'">'+esc(t.cat)+'</span><button class="delete-btn" onclick="remove('+t.id+')">×</button></div>'}).join('');const a=todos.filter(t=>!t.done).length;document.getElementById('count').textContent=a+' task'+(a!==1?'s':'')+' remaining'}
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
    {
      id: 'cwb29',
      type: 'assistant-message',
      delayMs: 600,
      content: "Here's a preview of the notes app running locally. It has a sidebar with search, a markdown editor with live preview, and tag support. The UI is clean and responsive.",
      streamingSpeed: 'normal',
    },
    {
      id: 'cwb30',
      type: 'artifact',
      delayMs: 800,
      artifactType: 'html',
      title: 'Notes App Preview',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Notes</title>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background:#f8f9fa;color:#1a1a2e;display:flex;height:100vh;overflow:hidden}
/* Sidebar */
.sidebar{width:280px;background:#fff;border-right:1px solid #e5e7eb;display:flex;flex-direction:column;flex-shrink:0}
.sidebar-header{padding:16px 16px 12px;border-bottom:1px solid #e5e7eb}
.sidebar-header h2{font-size:15px;font-weight:700;color:#111;margin-bottom:10px;display:flex;align-items:center;gap:8px}
.sidebar-header h2 svg{width:18px;height:18px}
.search-box{width:100%;padding:7px 10px 7px 32px;border:1px solid #e5e7eb;border-radius:8px;font-size:13px;outline:none;background:#f9fafb url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%239ca3af' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.3-4.3'/%3E%3C/svg%3E") 10px center no-repeat}
.search-box:focus{border-color:#6366f1;box-shadow:0 0 0 2px rgba(99,102,241,.12)}
.note-list{flex:1;overflow-y:auto;padding:6px 8px}
.note-item{padding:10px 12px;border-radius:8px;cursor:pointer;margin-bottom:2px;transition:background .15s}
.note-item:hover{background:#f3f4f6}
.note-item.active{background:#eef2ff;border:1px solid #c7d2fe}
.note-item h3{font-size:13px;font-weight:600;color:#111;margin-bottom:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.note-item p{font-size:11px;color:#6b7280;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.note-item .meta{display:flex;align-items:center;gap:6px;margin-top:4px}
.note-item .meta time{font-size:10px;color:#9ca3af}
.tag{display:inline-block;padding:1px 6px;border-radius:4px;font-size:10px;font-weight:500}
.tag-blue{background:#dbeafe;color:#2563eb}
.tag-green{background:#dcfce7;color:#16a34a}
.tag-purple{background:#ede9fe;color:#7c3aed}
.tag-amber{background:#fef3c7;color:#d97706}
.new-btn{margin:8px;padding:8px;border:1px dashed #d1d5db;border-radius:8px;background:none;cursor:pointer;font-size:12px;color:#6b7280;transition:all .15s}
.new-btn:hover{border-color:#6366f1;color:#6366f1;background:#eef2ff}
/* Main */
.main{flex:1;display:flex;flex-direction:column;min-width:0}
.toolbar{display:flex;align-items:center;justify-content:space-between;padding:10px 20px;border-bottom:1px solid #e5e7eb;background:#fff}
.toolbar-left{display:flex;align-items:center;gap:8px}
.toolbar input{font-size:16px;font-weight:600;border:none;outline:none;background:transparent;color:#111}
.toolbar-right{display:flex;align-items:center;gap:6px}
.toolbar-right button{padding:5px 10px;border:1px solid #e5e7eb;border-radius:6px;background:#fff;font-size:12px;cursor:pointer;color:#374151;transition:all .15s}
.toolbar-right button:hover{background:#f3f4f6}
.toolbar-right button.active{background:#eef2ff;border-color:#c7d2fe;color:#4f46e5}
.editor-area{flex:1;display:flex;overflow:hidden}
.editor-pane{flex:1;padding:20px 24px;overflow-y:auto;font-family:'SF Mono',Menlo,monospace;font-size:13px;line-height:1.7;color:#374151;border:none;outline:none;resize:none;background:#fff}
.preview-pane{flex:1;padding:20px 24px;overflow-y:auto;border-left:1px solid #e5e7eb;background:#fafafa}
.preview-pane h1{font-size:22px;font-weight:700;margin:0 0 12px;color:#111}
.preview-pane h2{font-size:17px;font-weight:600;margin:16px 0 8px;color:#1a1a2e}
.preview-pane p{font-size:14px;line-height:1.7;color:#374151;margin-bottom:10px}
.preview-pane code{background:#f1f5f9;padding:1px 5px;border-radius:4px;font-size:12px;color:#6366f1;font-family:'SF Mono',Menlo,monospace}
.preview-pane pre{background:#1e293b;color:#e2e8f0;padding:14px 16px;border-radius:8px;overflow-x:auto;margin:12px 0;font-size:12px;line-height:1.6}
.preview-pane ul,.preview-pane ol{padding-left:20px;margin-bottom:10px}
.preview-pane li{font-size:14px;line-height:1.7;color:#374151}
.preview-pane blockquote{border-left:3px solid #c7d2fe;padding:8px 16px;margin:12px 0;background:#f5f3ff;border-radius:0 6px 6px 0;color:#4338ca;font-style:italic}
.status-bar{display:flex;align-items:center;justify-content:space-between;padding:6px 20px;border-top:1px solid #e5e7eb;background:#fff;font-size:11px;color:#9ca3af}
</style>
</head>
<body>
<div class="sidebar">
  <div class="sidebar-header">
    <h2><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.855z"/></svg> Notes</h2>
    <input class="search-box" placeholder="Search notes..." id="search"/>
  </div>
  <div class="note-list" id="noteList"></div>
  <button class="new-btn" onclick="addNote()">+ New note</button>
</div>
<div class="main">
  <div class="toolbar">
    <div class="toolbar-left">
      <input id="titleInput" value="Getting Started" spellcheck="false"/>
    </div>
    <div class="toolbar-right">
      <button id="btnWrite" class="active" onclick="setMode('write')">Write</button>
      <button id="btnPreview" onclick="setMode('preview')">Preview</button>
      <button id="btnSplit" onclick="setMode('split')">Split</button>
    </div>
  </div>
  <div class="editor-area">
    <textarea class="editor-pane" id="editor" spellcheck="false"></textarea>
    <div class="preview-pane" id="preview" style="display:none"></div>
  </div>
  <div class="status-bar">
    <span id="wordCount">0 words</span>
    <span id="savedAt">Saved just now</span>
  </div>
</div>
<script>
function esc(s){const d=document.createElement('div');d.textContent=s;return d.innerHTML}
const NOTES=[
  {id:1,title:'Getting Started',content:'# Getting Started\\n\\nWelcome to **Notes** — a clean, fast note-taking app with markdown support.\\n\\n## Features\\n\\n- **Markdown editor** with live preview\\n- **Search** across all your notes instantly\\n- **Tags** to organise by topic\\n- **Auto-save** so you never lose work\\n\\n## Keyboard Shortcuts\\n\\n- \`Cmd+N\` — New note\\n- \`Cmd+S\` — Save\\n- \`Cmd+P\` — Toggle preview\\n\\n> Start writing — your ideas deserve a good home.',tags:['guide'],updated:'2026-04-11T10:30:00Z'},
  {id:2,title:'API Design Notes',content:'# API Design\\n\\n## REST Endpoints\\n\\n\`\`\`\\nGET    /api/notes          List all notes\\nPOST   /api/notes          Create note\\nGET    /api/notes/:id       Get note\\nPUT    /api/notes/:id       Update note\\nDELETE /api/notes/:id       Delete note\\n\`\`\`\\n\\n## Schema\\n\\nEach note has:\\n- \`id\` — UUID primary key\\n- \`title\` — string, max 200 chars\\n- \`content\` — markdown text\\n- \`tags\` — array of strings\\n- \`createdAt\` / \`updatedAt\` — ISO timestamps\\n\\n## Auth\\n\\nUsing JWT tokens with refresh rotation. Tokens expire after 15 minutes.',tags:['api','backend'],updated:'2026-04-11T09:15:00Z'},
  {id:3,title:'Sprint Planning',content:'# Sprint 12 Planning\\n\\n## Goals\\n\\n1. Ship notes search (full-text with SQLite FTS5)\\n2. Add tag filtering in sidebar\\n3. Dark mode toggle\\n4. Fix mobile layout issues\\n\\n## Estimates\\n\\n| Task | Points |\\n|------|--------|\\n| Search | 5 |\\n| Tags | 3 |\\n| Dark mode | 2 |\\n| Mobile fix | 3 |\\n\\n**Total: 13 points** — fits in the sprint.',tags:['planning'],updated:'2026-04-10T16:45:00Z'},
  {id:4,title:'Docker Setup',content:'# Docker Configuration\\n\\n## Development\\n\\n\`\`\`bash\\ndocker compose up --build\\n\`\`\`\\n\\nThis starts:\\n- **Frontend** on port 5173 (Vite dev server)\\n- **Backend** on port 3001 (Express + SQLite)\\n- **Nginx** reverse proxy on port 80\\n\\n## Production\\n\\n\`\`\`bash\\ndocker compose -f docker-compose.prod.yml up -d\\n\`\`\`\\n\\nUses multi-stage build for smaller images (~45MB final).',tags:['devops'],updated:'2026-04-10T14:20:00Z'},
  {id:5,title:'Meeting Notes — Design Review',content:'# Design Review — Apr 10\\n\\n## Attendees\\nAlice, Bob, Charlie\\n\\n## Decisions\\n\\n- Sidebar width: 280px (not 320 — too wide on laptops)\\n- Editor font: SF Mono 13px\\n- Keep the split view, users love it\\n- Add markdown toolbar for mobile users\\n\\n## Action Items\\n\\n- [ ] Alice: Update Figma with new sidebar width\\n- [ ] Bob: Implement markdown toolbar\\n- [ ] Charlie: User test the split view on iPad',tags:['meeting','design'],updated:'2026-04-10T11:00:00Z'}
];
const TAG_COLORS={guide:'blue',api:'purple',backend:'purple',planning:'amber',devops:'green',meeting:'blue',design:'green'};
let notes=[...NOTES],activeId=1,mode='write';

function render(){
  const q=document.getElementById('search').value.toLowerCase();
  const filtered=notes.filter(n=>n.title.toLowerCase().includes(q)||n.content.toLowerCase().includes(q));
  document.getElementById('noteList').innerHTML=filtered.map(n=>{
    const preview=n.content.replace(/^#+ /gm,'').replace(/[*_\`\\[\\]]/g,'').slice(0,60);
    const tags=n.tags.map(t=>'<span class="tag tag-'+(TAG_COLORS[t]||'blue')+'">'+esc(t)+'</span>').join(' ');
    const time=new Date(n.updated).toLocaleDateString('en-GB',{day:'numeric',month:'short'});
    return '<div class="note-item'+(n.id===activeId?' active':'')+'" onclick="selectNote('+n.id+')"><h3>'+esc(n.title)+'</h3><p>'+esc(preview)+'</p><div class="meta">'+tags+' <time>'+time+'</time></div></div>'
  }).join('');
  const note=notes.find(n=>n.id===activeId);
  if(note){
    document.getElementById('titleInput').value=note.title;
    document.getElementById('editor').value=note.content.replace(/\\\\n/g,'\\n');
    renderPreview();
    const words=note.content.split(/\\s+/).filter(Boolean).length;
    document.getElementById('wordCount').textContent=words+' words';
  }
}

function renderPreview(){
  const note=notes.find(n=>n.id===activeId);
  if(!note)return;
  let md=note.content.replace(/\\\\n/g,'\\n');
  let html=md
    .replace(/\`\`\`([\\s\\S]*?)\`\`\`/g,(m,c)=>'<pre>'+esc(c.trim())+'</pre>')
    .replace(/\`([^\`]+)\`/g,(m,c)=>'<code>'+esc(c)+'</code>')
    .replace(/^### (.+)$/gm,'<h3>$1</h3>')
    .replace(/^## (.+)$/gm,'<h2>$1</h2>')
    .replace(/^# (.+)$/gm,'<h1>$1</h1>')
    .replace(/\\*\\*(.+?)\\*\\*/g,'<strong>$1</strong>')
    .replace(/^> (.+)$/gm,'<blockquote>$1</blockquote>')
    .replace(/^- \\[x\\] (.+)$/gm,'<li>&#9745; $1</li>')
    .replace(/^- \\[ \\] (.+)$/gm,'<li>&#9744; $1</li>')
    .replace(/^- (.+)$/gm,'<li>$1</li>')
    .replace(/^\\d+\\. (.+)$/gm,'<li>$1</li>')
    .replace(/(<li>.*<\\/li>)/s,function(m){return '<ul>'+m+'</ul>'})
    .replace(/\\n{2,}/g,'</p><p>')
    .replace(/\\n/g,'<br>');
  html='<p>'+html+'</p>';
  document.getElementById('preview').innerHTML=html;
}

function selectNote(id){activeId=id;render()}
function addNote(){const n={id:Date.now(),title:'Untitled',content:'',tags:[],updated:new Date().toISOString()};notes.unshift(n);activeId=n.id;render();document.getElementById('titleInput').focus()}

function setMode(m){
  mode=m;
  const ed=document.getElementById('editor'),pv=document.getElementById('preview');
  document.querySelectorAll('.toolbar-right button').forEach(b=>b.classList.remove('active'));
  if(m==='write'){ed.style.display='block';pv.style.display='none';document.getElementById('btnWrite').classList.add('active')}
  else if(m==='preview'){ed.style.display='none';pv.style.display='block';document.getElementById('btnPreview').classList.add('active');renderPreview()}
  else{ed.style.display='block';pv.style.display='block';document.getElementById('btnSplit').classList.add('active');renderPreview()}
}

document.getElementById('editor').addEventListener('input',function(){
  const note=notes.find(n=>n.id===activeId);
  if(note){note.content=this.value;note.updated=new Date().toISOString();document.getElementById('savedAt').textContent='Saved just now';if(mode!=='write')renderPreview();const words=this.value.split(/\\s+/).filter(Boolean).length;document.getElementById('wordCount').textContent=words+' words'}
});
document.getElementById('titleInput').addEventListener('input',function(){
  const note=notes.find(n=>n.id===activeId);
  if(note){note.title=this.value;render()}
});
document.getElementById('search').addEventListener('input',render);
render();setMode('split');
</script>
</body>
</html>`,
    },
  ],
}

/* ────────────────────────────────────────────────────────────────────────────
 *  6. Chat: Personal Finance Tracker with Share Portfolio
 * ──────────────────────────────────────────────────────────────────────────── */

export const sampleFinanceTrackerSimulation: Simulation = {
  id: 'sample-finance-tracker',
  title: 'Personal Finance Tracker',
  description: 'Claude builds an interactive personal finance dashboard with share portfolio tracking',
  productType: 'claude-chat',
  createdAt: '2026-04-11T00:00:00Z',
  updatedAt: '2026-04-11T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'Claude Opus 4',
      theme: 'light',
      conversationTitle: 'Personal finance tracker',
      sidebarConversations: [
        { id: 'c1', title: 'Personal finance tracker', timestamp: 'Just now', isActive: true },
        { id: 'c2', title: 'Tax return questions', timestamp: '2h ago', isActive: false },
        { id: 'c3', title: 'ISA allowance 26/27', timestamp: 'Yesterday', isActive: false },
        { id: 'c4', title: 'Mortgage calculator', timestamp: 'Apr 8', isActive: false },
      ],
      projects: [],
    },
  },
  events: [
    // ── Turn 1: User brief ──
    {
      id: 'ft1',
      type: 'user-message',
      delayMs: 0,
      content: 'Build me a personal finance dashboard. I want to see my bank accounts, monthly spending breakdown, savings goals, and a share portfolio tracker with live-ish price data and gain/loss. Make it a single interactive HTML page — dark mode, really slick.',
      typingEffect: false,
    },
    {
      id: 'ft2',
      type: 'thinking',
      delayMs: 800,
      durationMs: 4500,
    },
    {
      id: 'ft3',
      type: 'assistant-message',
      delayMs: 600,
      content: "I'll build you a comprehensive personal finance dashboard with a dark theme. It'll include account balances, a spending breakdown with an interactive doughnut chart, savings goal progress bars, and a full share portfolio table with simulated prices, daily change, and total gain/loss. Everything self-contained in one HTML file.",
      streamingSpeed: 'normal',
    },
    {
      id: 'ft4',
      type: 'artifact',
      delayMs: 1500,
      artifactType: 'html',
      title: 'Personal Finance Dashboard',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Finance Dashboard</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f1117;color:#e4e5e7;min-height:100vh}
.dash{max-width:1200px;margin:0 auto;padding:24px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.header h1{font-size:22px;font-weight:700}
.header .date{color:#6b7280;font-size:13px}
.header .refresh{background:#1e2235;border:1px solid #2a2f45;color:#8b8fa3;padding:6px 14px;border-radius:8px;font-size:12px;cursor:pointer;transition:all .15s}
.header .refresh:hover{border-color:#4f46e5;color:#a5b4fc}

/* Accounts */
.accounts{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
@media(max-width:800px){.accounts{grid-template-columns:repeat(2,1fr)}}
.account{background:#1a1d2e;border:1px solid #252942;border-radius:14px;padding:18px;transition:border-color .2s}
.account:hover{border-color:#4f46e5}
.account .bank{font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.account .bank .dot{width:8px;height:8px;border-radius:50%}
.account .bal{font-size:26px;font-weight:700}
.account .label{font-size:12px;color:#6b7280;margin-top:2px}

/* Grid layout */
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
@media(max-width:800px){.grid{grid-template-columns:1fr}}
.card{background:#1a1d2e;border:1px solid #252942;border-radius:14px;padding:20px}
.card h2{font-size:15px;font-weight:600;margin-bottom:16px;display:flex;align-items:center;justify-content:space-between}
.card h2 .badge{font-size:11px;font-weight:500;color:#6b7280;background:#252942;padding:3px 10px;border-radius:6px}

/* Savings goals */
.goal{margin-bottom:14px}
.goal:last-child{margin-bottom:0}
.goal .top{display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px}
.goal .top .name{font-weight:500}
.goal .top .amt{color:#6b7280}
.goal .bar{height:8px;background:#252942;border-radius:99px;overflow:hidden}
.goal .bar .fill{height:100%;border-radius:99px;transition:width .6s ease}

/* Portfolio */
.portfolio{background:#1a1d2e;border:1px solid #252942;border-radius:14px;padding:20px;margin-bottom:24px}
.portfolio h2{font-size:15px;font-weight:600;margin-bottom:4px}
.portfolio .summary{display:flex;gap:24px;margin-bottom:16px;font-size:13px;color:#6b7280}
.portfolio .summary .val{font-size:20px;font-weight:700;color:#e4e5e7}
.portfolio .summary .change{font-weight:600}
.portfolio .summary .up{color:#22c55e}
.portfolio .summary .down{color:#ef4444}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;color:#6b7280;font-weight:500;padding:8px 0;border-bottom:1px solid #252942;font-size:11px;text-transform:uppercase;letter-spacing:.3px}
td{padding:10px 0;border-bottom:1px solid #1e2235}
.ticker{font-weight:600;color:#a5b4fc}
.up{color:#22c55e}
.down{color:#ef4444}
.spark{display:inline-block;width:60px;height:20px;vertical-align:middle}

/* Transactions */
.txn{display:flex;align-items:center;gap:12px;padding:10px 0;border-bottom:1px solid #1e2235}
.txn:last-child{border-bottom:none}
.txn .icon{width:36px;height:36px;border-radius:10px;display:flex;align-items:center;justify-content:center;font-size:16px;flex-shrink:0}
.txn .details{flex:1;min-width:0}
.txn .name{font-size:13px;font-weight:500}
.txn .cat{font-size:11px;color:#6b7280}
.txn .amount{font-size:13px;font-weight:600;text-align:right}
</style>
</head>
<body>
<div class="dash">
  <div class="header">
    <div>
      <h1>Finances</h1>
      <div class="date" id="dateEl"></div>
    </div>
    <button class="refresh" onclick="refreshPrices()">↻ Refresh Prices</button>
  </div>

  <!-- Accounts -->
  <div class="accounts">
    <div class="account"><div class="bank"><span class="dot" style="background:#1e40af"></span>Barclays Current</div><div class="bal">£4,238.62</div><div class="label">Current account</div></div>
    <div class="account"><div class="bank"><span class="dot" style="background:#7c3aed"></span>Monzo</div><div class="bal">£1,892.44</div><div class="label">Spending account</div></div>
    <div class="account"><div class="bank"><span class="dot" style="background:#0891b2"></span>Marcus Savings</div><div class="bal">£12,450.00</div><div class="label">Easy access · 4.5% AER</div></div>
    <div class="account"><div class="bank"><span class="dot" style="background:#16a34a"></span>Vanguard ISA</div><div class="bal" id="isaTotal">£34,612.80</div><div class="label">Stocks & Shares ISA</div></div>
  </div>

  <div class="grid">
    <!-- Spending breakdown -->
    <div class="card">
      <h2>Monthly Spending <span class="badge">April 2026</span></h2>
      <div style="display:flex;align-items:center;gap:20px">
        <div style="width:160px;height:160px;flex-shrink:0"><canvas id="spendChart"></canvas></div>
        <div id="spendLegend" style="font-size:12px;line-height:2.2"></div>
      </div>
    </div>

    <!-- Savings goals -->
    <div class="card">
      <h2>Savings Goals</h2>
      <div class="goal"><div class="top"><span class="name">🏠 House deposit</span><span class="amt">£28,450 / £40,000</span></div><div class="bar"><div class="fill" style="width:71%;background:linear-gradient(90deg,#4f46e5,#7c3aed)"></div></div></div>
      <div class="goal"><div class="top"><span class="name">🏖️ Holiday fund</span><span class="amt">£1,840 / £3,000</span></div><div class="bar"><div class="fill" style="width:61%;background:linear-gradient(90deg,#0891b2,#06b6d4)"></div></div></div>
      <div class="goal"><div class="top"><span class="name">🚗 Car replacement</span><span class="amt">£5,200 / £15,000</span></div><div class="bar"><div class="fill" style="width:35%;background:linear-gradient(90deg,#d97706,#f59e0b)"></div></div></div>
      <div class="goal"><div class="top"><span class="name">🛡️ Emergency fund</span><span class="amt">£8,400 / £9,000</span></div><div class="bar"><div class="fill" style="width:93%;background:linear-gradient(90deg,#16a34a,#22c55e)"></div></div></div>
    </div>
  </div>

  <!-- Share Portfolio -->
  <div class="portfolio">
    <h2>Share Portfolio</h2>
    <div class="summary">
      <div><div style="color:#6b7280;font-size:11px;margin-bottom:2px">TOTAL VALUE</div><div class="val" id="totalVal">£34,612.80</div></div>
      <div><div style="color:#6b7280;font-size:11px;margin-bottom:2px">TOTAL COST</div><div class="val" style="font-size:16px;padding-top:4px">£29,840.00</div></div>
      <div><div style="color:#6b7280;font-size:11px;margin-bottom:2px">TOTAL GAIN</div><div class="val change up" id="totalGain" style="font-size:16px;padding-top:4px">+£4,772.80 (+16.0%)</div></div>
      <div><div style="color:#6b7280;font-size:11px;margin-bottom:2px">TODAY</div><div class="val change" id="todayChange" style="font-size:16px;padding-top:4px">+£142.30</div></div>
    </div>
    <table>
      <thead><tr><th>Holding</th><th>Shares</th><th>Avg Cost</th><th>Price</th><th>Day Change</th><th>Value</th><th>Gain/Loss</th><th>7d</th></tr></thead>
      <tbody id="ptable"></tbody>
    </table>
  </div>

  <!-- Recent transactions -->
  <div class="card">
    <h2>Recent Transactions</h2>
    <div class="txn"><div class="icon" style="background:#1e293b">🛒</div><div class="details"><div class="name">Tesco Superstore</div><div class="cat">Groceries · Barclays</div></div><div class="amount">-£67.43</div></div>
    <div class="txn"><div class="icon" style="background:#1e293b">🏠</div><div class="details"><div class="name">Mortgage Payment</div><div class="cat">Housing · Barclays DD</div></div><div class="amount">-£1,248.00</div></div>
    <div class="txn"><div class="icon" style="background:#1e293b">💰</div><div class="details"><div class="name">Salary — Acme Corp</div><div class="cat">Income · Barclays</div></div><div class="amount up">+£3,420.00</div></div>
    <div class="txn"><div class="icon" style="background:#1e293b">⚡</div><div class="details"><div class="name">Octopus Energy</div><div class="cat">Bills · Barclays DD</div></div><div class="amount">-£124.50</div></div>
    <div class="txn"><div class="icon" style="background:#1e293b">☕</div><div class="details"><div class="name">Pret A Manger</div><div class="cat">Eating Out · Monzo</div></div><div class="amount">-£4.85</div></div>
    <div class="txn"><div class="icon" style="background:#1e293b">📱</div><div class="details"><div class="name">Netflix</div><div class="cat">Subscriptions · Monzo</div></div><div class="amount">-£10.99</div></div>
    <div class="txn"><div class="icon" style="background:#1e293b">🚂</div><div class="details"><div class="name">Trainline</div><div class="cat">Transport · Monzo</div></div><div class="amount">-£38.20</div></div>
  </div>
</div>

<script>
document.getElementById('dateEl').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});

// Spending chart
const spendData=[
  {label:'Housing',val:1248,color:'#4f46e5'},
  {label:'Groceries',val:420,color:'#7c3aed'},
  {label:'Transport',val:185,color:'#0891b2'},
  {label:'Bills',val:310,color:'#d97706'},
  {label:'Eating Out',val:142,color:'#ec4899'},
  {label:'Subscriptions',val:78,color:'#6366f1'},
  {label:'Other',val:96,color:'#475569'},
];
new Chart(document.getElementById('spendChart'),{type:'doughnut',data:{labels:spendData.map(d=>d.label),datasets:[{data:spendData.map(d=>d.val),backgroundColor:spendData.map(d=>d.color),borderWidth:0,borderRadius:3}]},options:{cutout:'68%',plugins:{legend:{display:false}},responsive:true,maintainAspectRatio:true}});
document.getElementById('spendLegend').innerHTML=spendData.map(d=>'<div style="display:flex;align-items:center;gap:8px"><span style="width:10px;height:10px;border-radius:3px;background:'+d.color+';flex-shrink:0"></span><span style="color:#9ca3af;flex:1">'+d.label+'</span><span style="font-weight:600">£'+d.val+'</span></div>').join('');

// Portfolio data
const holdings=[
  {ticker:'VWRL',name:'Vanguard FTSE All-World',shares:120,avgCost:82.40,price:89.65,dayPct:0.42},
  {ticker:'VUAG',name:'Vanguard S&P 500',shares:85,avgCost:68.20,price:78.92,dayPct:0.68},
  {ticker:'SMT',name:'Scottish Mortgage',shares:200,avgCost:8.45,price:9.18,dayPct:-0.34},
  {ticker:'LSEG',name:'London Stock Exchange',shares:15,avgCost:92.30,price:108.40,dayPct:0.21},
  {ticker:'GSK',name:'GSK plc',shares:150,avgCost:15.80,price:16.24,dayPct:-0.52},
  {ticker:'BP.',name:'BP plc',shares:300,avgCost:4.95,price:4.48,dayPct:-1.20},
  {ticker:'SHEL',name:'Shell plc',shares:80,avgCost:25.60,price:27.85,dayPct:0.35},
  {ticker:'AZN',name:'AstraZeneca',shares:10,avgCost:104.50,price:118.30,dayPct:0.15},
];

function miniSpark(positive){
  const pts=[];let y=10;
  for(let i=0;i<12;i++){y+=((Math.random()-.45)*(positive?3:3.5));y=Math.max(2,Math.min(18,y));pts.push(y)}
  const path=pts.map((p,i)=>(i===0?'M':'L')+(i*5.5)+','+p).join(' ');
  const col=positive?'%2322c55e':'%23ef4444';
  return '<svg class="spark" viewBox="0 0 60 20"><path d="'+path+'" fill="none" stroke="'+col+'" stroke-width="1.5"/></svg>';
}

function renderPortfolio(){
  let totalVal=0,totalCost=0,todayPL=0;
  const rows=holdings.map(h=>{
    const val=h.shares*h.price;
    const cost=h.shares*h.avgCost;
    const gain=val-cost;
    const gainPct=((gain/cost)*100);
    const dayVal=val*(h.dayPct/100);
    totalVal+=val;totalCost+=cost;todayPL+=dayVal;
    const gc=gain>=0?'up':'down';
    const dc=h.dayPct>=0?'up':'down';
    return '<tr><td><span class="ticker">'+h.ticker+'</span><br><span style="color:#6b7280;font-size:11px">'+h.name+'</span></td><td>'+h.shares+'</td><td>£'+h.avgCost.toFixed(2)+'</td><td>£'+h.price.toFixed(2)+'</td><td class="'+dc+'">'+(h.dayPct>=0?'+':'')+h.dayPct.toFixed(2)+'%</td><td>£'+val.toLocaleString('en',{minimumFractionDigits:2})+'</td><td class="'+gc+'">'+(gain>=0?'+':'')+' £'+Math.abs(gain).toFixed(0)+' ('+(gain>=0?'+':'')+gainPct.toFixed(1)+'%)</td><td>'+miniSpark(gain>=0)+'</td></tr>';
  });
  document.getElementById('ptable').innerHTML=rows.join('');
  document.getElementById('totalVal').textContent='£'+totalVal.toLocaleString('en',{minimumFractionDigits:2});
  document.getElementById('isaTotal').textContent='£'+totalVal.toLocaleString('en',{minimumFractionDigits:2});
  const totalGain=totalVal-totalCost;
  const tgEl=document.getElementById('totalGain');
  tgEl.textContent=(totalGain>=0?'+':'-')+' £'+Math.abs(totalGain).toFixed(2)+' ('+(totalGain>=0?'+':'')+((totalGain/totalCost)*100).toFixed(1)+'%)';
  tgEl.className='val change '+(totalGain>=0?'up':'down');
  const tdEl=document.getElementById('todayChange');
  tdEl.textContent=(todayPL>=0?'+':'-')+'£'+Math.abs(todayPL).toFixed(2);
  tdEl.className='val change '+(todayPL>=0?'up':'down');
}

function refreshPrices(){
  holdings.forEach(h=>{
    const swing=(Math.random()-.48)*1.5;
    h.price=Math.max(0.5,h.price*(1+swing/100));
    h.dayPct=swing;
  });
  renderPortfolio();
}

renderPortfolio();
<\/script>
</body>
</html>`,
    },
    {
      id: 'ft5',
      type: 'assistant-message',
      delayMs: 800,
      content: "Here's your personal finance dashboard! It's fully interactive — try clicking **Refresh Prices** to simulate market movements. Here's what's included:\n\n**Accounts overview** — Barclays current (£4,238), Monzo spending (£1,892), Marcus savings at 4.5% AER (£12,450), and your Vanguard Stocks & Shares ISA\n\n**Share portfolio** — 8 holdings including VWRL, VUAG, Scottish Mortgage, LSEG, GSK, BP, Shell, and AstraZeneca. Each shows shares held, average cost, current price, daily change, total gain/loss, and a mini sparkline chart. Your portfolio is up about 16% overall (£4,773 gain on £29,840 invested).\n\n**Spending breakdown** — Doughnut chart for April showing housing (£1,248), groceries (£420), bills (£310), transport (£185), eating out (£142), subscriptions (£78), and other (£96).\n\n**Savings goals** — Four progress bars: house deposit at 71%, holiday fund at 61%, car replacement at 35%, and emergency fund almost complete at 93%.\n\n**Recent transactions** — Latest activity across your accounts.\n\nWant me to add budget alerts, a net worth over time chart, or dividend tracking?",
      streamingSpeed: 'normal',
    },

    // ── Turn 2: User wants net worth chart ──
    {
      id: 'ft6',
      type: 'user-message',
      delayMs: 2000,
      content: 'Love it! Yes add a net worth over time chart and also a monthly income vs expenses chart.',
      typingEffect: false,
    },
    {
      id: 'ft7',
      type: 'thinking',
      delayMs: 800,
      durationMs: 3500,
    },
    {
      id: 'ft8',
      type: 'assistant-message',
      delayMs: 600,
      content: "I've added two new charts — a 12-month net worth trend showing your total assets growing over time, and a monthly income vs expenses bar chart so you can see your savings rate each month. The net worth line includes your accounts, savings, and portfolio value.",
      streamingSpeed: 'normal',
    },
    {
      id: 'ft9',
      type: 'artifact',
      delayMs: 1500,
      artifactType: 'html',
      title: 'Finance Dashboard (v2)',
      content: `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Finance Dashboard v2</title>
<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"><\/script>
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#0f1117;color:#e4e5e7;min-height:100vh}
.dash{max-width:1200px;margin:0 auto;padding:24px}
.header{display:flex;justify-content:space-between;align-items:center;margin-bottom:24px}
.header h1{font-size:22px;font-weight:700}
.header .date{color:#6b7280;font-size:13px}
.accounts{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:24px}
@media(max-width:800px){.accounts{grid-template-columns:repeat(2,1fr)}}
.account{background:#1a1d2e;border:1px solid #252942;border-radius:14px;padding:18px}
.account .bank{font-size:11px;color:#6b7280;text-transform:uppercase;letter-spacing:.5px;margin-bottom:6px;display:flex;align-items:center;gap:6px}
.account .bank .dot{width:8px;height:8px;border-radius:50%}
.account .bal{font-size:26px;font-weight:700}
.account .label{font-size:12px;color:#6b7280;margin-top:2px}
.grid{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:24px}
@media(max-width:800px){.grid{grid-template-columns:1fr}}
.card{background:#1a1d2e;border:1px solid #252942;border-radius:14px;padding:20px}
.card h2{font-size:15px;font-weight:600;margin-bottom:16px}
.portfolio{background:#1a1d2e;border:1px solid #252942;border-radius:14px;padding:20px;margin-bottom:24px}
.portfolio h2{font-size:15px;font-weight:600;margin-bottom:4px}
.portfolio .summary{display:flex;gap:24px;margin-bottom:16px;font-size:13px;color:#6b7280}
.portfolio .summary .val{font-size:20px;font-weight:700;color:#e4e5e7}
table{width:100%;border-collapse:collapse;font-size:13px}
th{text-align:left;color:#6b7280;font-weight:500;padding:8px 0;border-bottom:1px solid #252942;font-size:11px;text-transform:uppercase;letter-spacing:.3px}
td{padding:10px 0;border-bottom:1px solid #1e2235}
.ticker{font-weight:600;color:#a5b4fc}
.up{color:#22c55e}.down{color:#ef4444}
.goal{margin-bottom:14px}
.goal .top{display:flex;justify-content:space-between;font-size:13px;margin-bottom:6px}
.goal .top .name{font-weight:500}
.goal .top .amt{color:#6b7280}
.goal .bar{height:8px;background:#252942;border-radius:99px;overflow:hidden}
.goal .bar .fill{height:100%;border-radius:99px}
svg text{font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif}
</style>
</head>
<body>
<div class="dash">
  <div class="header"><div><h1>Finances</h1><div class="date" id="dateEl"></div></div></div>

  <div class="accounts">
    <div class="account"><div class="bank"><span class="dot" style="background:#1e40af"></span>Barclays Current</div><div class="bal">£4,238.62</div><div class="label">Current account</div></div>
    <div class="account"><div class="bank"><span class="dot" style="background:#7c3aed"></span>Monzo</div><div class="bal">£1,892.44</div><div class="label">Spending account</div></div>
    <div class="account"><div class="bank"><span class="dot" style="background:#0891b2"></span>Marcus Savings</div><div class="bal">£12,450.00</div><div class="label">Easy access · 4.5% AER</div></div>
    <div class="account"><div class="bank"><span class="dot" style="background:#16a34a"></span>Vanguard ISA</div><div class="bal">£34,612.80</div><div class="label">Stocks & Shares ISA</div></div>
  </div>

  <!-- Net Worth + Income vs Expenses -->
  <div class="grid">
    <div class="card">
      <h2>Net Worth — Last 12 Months</h2>
      <canvas id="nwChart" height="200"></canvas>
    </div>
    <div class="card">
      <h2>Income vs Expenses</h2>
      <canvas id="ieChart" height="200"></canvas>
    </div>
  </div>

  <!-- Spending + Savings -->
  <div class="grid">
    <div class="card">
      <h2>Monthly Spending — April 2026</h2>
      <div style="display:flex;align-items:center;gap:20px">
        <div style="width:150px;height:150px;flex-shrink:0"><canvas id="spendChart"></canvas></div>
        <div id="spendLegend" style="font-size:12px;line-height:2.2"></div>
      </div>
    </div>
    <div class="card">
      <h2>Savings Goals</h2>
      <div class="goal"><div class="top"><span class="name">🏠 House deposit</span><span class="amt">£28,450 / £40,000</span></div><div class="bar"><div class="fill" style="width:71%;background:linear-gradient(90deg,#4f46e5,#7c3aed)"></div></div></div>
      <div class="goal"><div class="top"><span class="name">🏖️ Holiday fund</span><span class="amt">£1,840 / £3,000</span></div><div class="bar"><div class="fill" style="width:61%;background:linear-gradient(90deg,#0891b2,#06b6d4)"></div></div></div>
      <div class="goal"><div class="top"><span class="name">🚗 Car replacement</span><span class="amt">£5,200 / £15,000</span></div><div class="bar"><div class="fill" style="width:35%;background:linear-gradient(90deg,#d97706,#f59e0b)"></div></div></div>
      <div class="goal"><div class="top"><span class="name">🛡️ Emergency fund</span><span class="amt">£8,400 / £9,000</span></div><div class="bar"><div class="fill" style="width:93%;background:linear-gradient(90deg,#16a34a,#22c55e)"></div></div></div>
    </div>
  </div>

  <!-- Portfolio table -->
  <div class="portfolio">
    <h2>Share Portfolio</h2>
    <div class="summary">
      <div><div style="color:#6b7280;font-size:11px;margin-bottom:2px">TOTAL VALUE</div><div class="val">£34,612.80</div></div>
      <div><div style="color:#6b7280;font-size:11px;margin-bottom:2px">TOTAL COST</div><div class="val" style="font-size:16px;padding-top:4px">£29,840.00</div></div>
      <div><div style="color:#6b7280;font-size:11px;margin-bottom:2px">TOTAL GAIN</div><div class="val up" style="font-size:16px;padding-top:4px">+£4,772.80 (+16.0%)</div></div>
    </div>
    <table>
      <thead><tr><th>Holding</th><th>Shares</th><th>Avg Cost</th><th>Price</th><th>Day</th><th>Value</th><th>Gain/Loss</th></tr></thead>
      <tbody id="ptable"></tbody>
    </table>
  </div>
</div>

<script>
document.getElementById('dateEl').textContent=new Date().toLocaleDateString('en-GB',{weekday:'long',day:'numeric',month:'long',year:'numeric'});
Chart.defaults.font.family="-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif";
Chart.defaults.font.size=11;
Chart.defaults.color='#6b7280';

const months=['May','Jun','Jul','Aug','Sep','Oct','Nov','Dec','Jan','Feb','Mar','Apr'];

// Net worth chart
new Chart(document.getElementById('nwChart'),{type:'line',data:{labels:months,datasets:[{label:'Net Worth',data:[42800,43200,44100,44800,45600,46200,47100,48400,49200,50800,51900,53193],borderColor:'#7c3aed',backgroundColor:'rgba(124,58,237,.1)',fill:true,tension:.35,pointRadius:3,pointBackgroundColor:'#7c3aed'},{label:'Savings',data:[18200,18800,19400,20000,20800,21400,22000,22600,23200,24100,24800,25550],borderColor:'#0891b2',borderDash:[4,3],tension:.35,pointRadius:2,fill:false},{label:'Investments',data:[28400,28600,29200,29800,30100,30600,31200,32400,33000,33800,34200,34612],borderColor:'#22c55e',borderDash:[4,3],tension:.35,pointRadius:2,fill:false}]},options:{responsive:true,plugins:{legend:{position:'bottom',labels:{boxWidth:10,padding:10}}},scales:{y:{ticks:{callback:v=>'£'+Math.round(v/1000)+'K'},grid:{color:'#1e2235'}},x:{grid:{display:false}}}}});

// Income vs Expenses
new Chart(document.getElementById('ieChart'),{type:'bar',data:{labels:months,datasets:[{label:'Income',data:[3420,3420,3620,3420,3420,3720,3420,3420,3620,3420,3420,3420],backgroundColor:'rgba(34,197,94,.6)',borderRadius:4},{label:'Expenses',data:[2680,2450,2890,2580,2720,2950,2640,3100,2780,2510,2680,2479],backgroundColor:'rgba(239,68,68,.4)',borderRadius:4},{label:'Saved',data:[740,970,730,840,700,770,780,320,840,910,740,941],type:'line',borderColor:'#a5b4fc',tension:.3,pointRadius:3,pointBackgroundColor:'#a5b4fc',fill:false}]},options:{responsive:true,plugins:{legend:{position:'bottom',labels:{boxWidth:10,padding:10}}},scales:{y:{ticks:{callback:v=>'£'+v},grid:{color:'#1e2235'}},x:{grid:{display:false}}}}});

// Spending doughnut
const sd=[{l:'Housing',v:1248,c:'#4f46e5'},{l:'Groceries',v:420,c:'#7c3aed'},{l:'Transport',v:185,c:'#0891b2'},{l:'Bills',v:310,c:'#d97706'},{l:'Eating Out',v:142,c:'#ec4899'},{l:'Subs',v:78,c:'#6366f1'},{l:'Other',v:96,c:'#475569'}];
new Chart(document.getElementById('spendChart'),{type:'doughnut',data:{labels:sd.map(d=>d.l),datasets:[{data:sd.map(d=>d.v),backgroundColor:sd.map(d=>d.c),borderWidth:0,borderRadius:3}]},options:{cutout:'68%',plugins:{legend:{display:false}},responsive:true}});
document.getElementById('spendLegend').innerHTML=sd.map(d=>'<div style="display:flex;align-items:center;gap:8px"><span style="width:10px;height:10px;border-radius:3px;background:'+d.c+';flex-shrink:0"></span><span style="color:#9ca3af;flex:1">'+d.l+'</span><span style="font-weight:600">£'+d.v+'</span></div>').join('');

// Portfolio table
const H=[{t:'VWRL',n:'Vanguard FTSE All-World',s:120,c:82.40,p:89.65,d:0.42},{t:'VUAG',n:'Vanguard S&P 500',s:85,c:68.20,p:78.92,d:0.68},{t:'SMT',n:'Scottish Mortgage',s:200,c:8.45,p:9.18,d:-0.34},{t:'LSEG',n:'London Stock Exchange',s:15,c:92.30,p:108.40,d:0.21},{t:'GSK',n:'GSK plc',s:150,c:15.80,p:16.24,d:-0.52},{t:'BP.',n:'BP plc',s:300,c:4.95,p:4.48,d:-1.20},{t:'SHEL',n:'Shell plc',s:80,c:25.60,p:27.85,d:0.35},{t:'AZN',n:'AstraZeneca',s:10,c:104.50,p:118.30,d:0.15}];
document.getElementById('ptable').innerHTML=H.map(h=>{const v=h.s*h.p;const co=h.s*h.c;const g=v-co;const gp=(g/co*100);const gc=g>=0?'up':'down';const dc=h.d>=0?'up':'down';return'<tr><td><span class="ticker">'+h.t+'</span><br><span style="color:#6b7280;font-size:11px">'+h.n+'</span></td><td>'+h.s+'</td><td>£'+h.c.toFixed(2)+'</td><td>£'+h.p.toFixed(2)+'</td><td class="'+dc+'">'+(h.d>=0?'+':'')+h.d.toFixed(2)+'%</td><td>£'+v.toLocaleString('en',{minimumFractionDigits:2})+'</td><td class="'+gc+'">'+(g>=0?'+':'-')+' £'+Math.abs(g).toFixed(0)+' ('+(g>=0?'+':'')+gp.toFixed(1)+'%)</td></tr>'}).join('');
<\/script>
</body>
</html>`,
    },
    {
      id: 'ft10',
      type: 'assistant-message',
      delayMs: 800,
      content: "Version 2 is ready with two new charts:\n\n- **Net worth trend** — purple line showing total net worth growing from £42.8K to £53.2K over 12 months, with dashed lines for savings and investments separately\n- **Income vs expenses** — green/red bars showing monthly income and spending, with a purple line tracking how much you saved each month (averaging ~£770/mo, with a dip to £320 in December — holiday spending!)\n\nYour savings rate is running at about 22% which is solid. The net worth line shows steady growth, mainly driven by your ISA performance and consistent saving into Marcus.\n\nWant me to add dividend tracking, a tax summary, or currency exposure from your international funds?",
      streamingSpeed: 'normal',
    },
  ],
}
