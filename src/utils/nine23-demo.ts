import type { Simulation } from '../types/simulation'

const blandWebsiteHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>923 Jobs</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Inter', sans-serif;
  background: #f5f5f5;
  color: #333;
}
.header {
  background: white;
  padding: 20px 40px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.logo {
  font-size: 24px;
  font-weight: 700;
  color: #2563eb;
}
.nav-links {
  display: flex;
  gap: 24px;
}
.nav-links a {
  text-decoration: none;
  color: #666;
  font-size: 14px;
  font-weight: 500;
}
.hero {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  padding: 80px 40px;
  text-align: center;
  color: white;
}
.hero h1 {
  font-size: 42px;
  font-weight: 700;
  margin-bottom: 16px;
}
.hero p {
  font-size: 18px;
  opacity: 0.85;
  margin-bottom: 32px;
}
.search-bar {
  max-width: 600px;
  margin: 0 auto;
  display: flex;
  gap: 8px;
}
.search-bar input {
  flex: 1;
  padding: 14px 20px;
  border-radius: 8px;
  border: none;
  font-size: 15px;
}
.search-bar button {
  padding: 14px 28px;
  background: #1e40af;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  font-size: 15px;
  cursor: pointer;
}
.jobs-section {
  max-width: 900px;
  margin: 48px auto;
  padding: 0 40px;
}
.jobs-section h2 {
  font-size: 28px;
  font-weight: 700;
  color: #333;
  margin-bottom: 24px;
}
.job-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 16px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.job-info h3 {
  font-size: 18px;
  font-weight: 600;
  color: #333;
  margin-bottom: 6px;
}
.job-info p {
  font-size: 14px;
  color: #888;
}
.job-tags {
  display: flex;
  gap: 8px;
  margin-top: 8px;
}
.job-tag {
  font-size: 12px;
  background: #eff6ff;
  color: #2563eb;
  padding: 4px 10px;
  border-radius: 20px;
  font-weight: 500;
}
.job-salary {
  font-size: 20px;
  font-weight: 700;
  color: #2563eb;
}
.apply-btn {
  display: inline-block;
  margin-top: 8px;
  padding: 10px 24px;
  background: #2563eb;
  color: white;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  border: none;
  cursor: pointer;
}
footer {
  background: #333;
  color: rgba(255,255,255,0.6);
  text-align: center;
  padding: 32px 40px;
  font-size: 14px;
}
</style>
</head>
<body>
<header class="header">
  <div class="logo">923 Jobs</div>
  <nav class="nav-links">
    <a href="#">Find Jobs</a>
    <a href="#">Post a Job</a>
    <a href="#">About</a>
    <a href="#">Contact</a>
  </nav>
</header>
<section class="hero">
  <h1>Find Your Next Job</h1>
  <p>Browse thousands of opportunities from top employers</p>
  <div class="search-bar">
    <input type="text" placeholder="Job title, keyword, or company...">
    <button>Search</button>
  </div>
</section>
<section class="jobs-section">
  <h2>Latest Jobs</h2>
  <div class="job-card">
    <div class="job-info">
      <h3>Marketing Manager</h3>
      <p>Acme Corp &mdash; London, UK</p>
      <div class="job-tags">
        <span class="job-tag">Full-time</span>
        <span class="job-tag">Remote</span>
      </div>
    </div>
    <div style="text-align: right;">
      <div class="job-salary">&pound;45,000</div>
      <button class="apply-btn">Apply Now</button>
    </div>
  </div>
  <div class="job-card">
    <div class="job-info">
      <h3>Software Developer</h3>
      <p>Tech Solutions Ltd &mdash; Bristol, UK</p>
      <div class="job-tags">
        <span class="job-tag">Full-time</span>
        <span class="job-tag">Hybrid</span>
      </div>
    </div>
    <div style="text-align: right;">
      <div class="job-salary">&pound;55,000</div>
      <button class="apply-btn">Apply Now</button>
    </div>
  </div>
  <div class="job-card">
    <div class="job-info">
      <h3>Office Administrator</h3>
      <p>Smith & Partners &mdash; Cheltenham, UK</p>
      <div class="job-tags">
        <span class="job-tag">Part-time</span>
        <span class="job-tag">On-site</span>
      </div>
    </div>
    <div style="text-align: right;">
      <div class="job-salary">&pound;28,000</div>
      <button class="apply-btn">Apply Now</button>
    </div>
  </div>
</section>
<footer>
  &copy; 2025 923 Jobs. All rights reserved.
</footer>
</body>
</html>`

const boldGraphicHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>9-2-3 Jobs — Bold &amp; Graphic</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&display=swap" rel="stylesheet">
<style>
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
:root{
  --cobalt:#1e3a8a;
  --cobalt-mid:#2563eb;
  --cobalt-light:#dbeafe;
  --amber:#f59e0b;
  --amber-dark:#d97706;
  --amber-light:#fef3c7;
  --ink:#0a0b0f;
  --mid:#64748b;
  --bg:#f0f2f8;
  --white:#ffffff;
  --f:'Space Grotesk',system-ui,sans-serif;
}
body{font-family:var(--f);background:var(--bg);color:var(--ink);overflow-x:hidden}

/* ── NAV ── */
.nav{
  background:rgba(10,11,15,.96);backdrop-filter:blur(12px);
  padding:0 40px;height:64px;
  display:flex;align-items:center;justify-content:space-between;
  position:fixed;top:0;left:0;right:0;z-index:100;
}
.nav-logo{font-size:22px;font-weight:700;color:#fff;letter-spacing:-0.5px}
.nav-logo b{color:var(--amber)}
.nav-links{display:flex;gap:4px}
.nav-links a{font-size:13px;font-weight:500;color:rgba(255,255,255,.6);text-decoration:none;padding:8px 14px;border-radius:6px;transition:all .15s}
.nav-links a:hover{color:#fff;background:rgba(255,255,255,.08)}
.nav-cta{
  background:var(--amber);color:var(--ink);font-size:13px;font-weight:700;
  padding:10px 22px;border-radius:8px;text-decoration:none;
  letter-spacing:-0.2px;transition:background .15s,transform .15s;
}
.nav-cta:hover{background:var(--amber-dark);transform:translateY(-1px)}

/* ── HERO — FULL BLEED ── */
.hero{
  position:relative;min-height:100vh;
  display:flex;flex-direction:column;justify-content:flex-end;
  overflow:hidden;padding-top:64px;
}
.hero-bg{
  position:absolute;inset:0;
  background-image:url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1800&auto=format&fit=crop&q=80');
  background-size:cover;background-position:center;
}
.hero-gradient{
  position:absolute;inset:0;
  background:linear-gradient(
    to bottom,
    rgba(10,11,15,.55) 0%,
    rgba(30,58,138,.4) 40%,
    rgba(10,11,15,.95) 100%
  );
}
.hero-content{
  position:relative;z-index:2;
  padding:80px 56px 72px;
  max-width:1200px;width:100%;
}
.hero-eyebrow{
  display:inline-flex;align-items:center;gap:8px;
  font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;
  color:var(--amber);margin-bottom:28px;
}
.hero-eyebrow::before{content:'';width:28px;height:2px;background:var(--amber)}
.hero-h{
  font-size:clamp(56px,8vw,112px);font-weight:700;
  color:#fff;line-height:.95;letter-spacing:-3px;
  margin-bottom:24px;max-width:900px;
}
.hero-h .line-amber{color:var(--amber)}
.hero-h .line-outline{
  -webkit-text-stroke:2px rgba(255,255,255,.5);
  color:transparent;
}
.hero-bottom{
  display:grid;grid-template-columns:1fr auto;gap:40px;align-items:end;
  border-top:1px solid rgba(255,255,255,.15);padding-top:32px;margin-top:32px;
}
.hero-sub{font-size:16px;font-weight:400;color:rgba(255,255,255,.7);line-height:1.55;max-width:480px}
.hero-actions{display:flex;flex-direction:column;gap:10px;align-items:flex-end}
.btn-hero-p{
  background:var(--amber);color:var(--ink);font-weight:700;font-size:14px;
  padding:16px 36px;border-radius:8px;text-decoration:none;
  letter-spacing:-0.2px;white-space:nowrap;
  transition:background .15s,transform .15s;
}
.btn-hero-p:hover{background:var(--amber-dark);transform:translateY(-2px)}
.btn-hero-s{
  background:rgba(255,255,255,.1);border:1px solid rgba(255,255,255,.25);
  color:#fff;font-weight:600;font-size:14px;
  padding:16px 36px;border-radius:8px;text-decoration:none;white-space:nowrap;
}

/* scroll indicator */
.scroll-hint{
  position:absolute;bottom:28px;right:56px;z-index:3;
  display:flex;align-items:center;gap:8px;
  font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;
  color:rgba(255,255,255,.4);
}
.scroll-line{width:40px;height:1px;background:rgba(255,255,255,.2)}

/* ── TICKER STRIP ── */
.ticker{
  background:var(--amber);padding:14px 0;overflow:hidden;
  display:flex;align-items:center;
}
.ticker-inner{
  display:flex;gap:48px;white-space:nowrap;
  animation:ticker 25s linear infinite;
}
@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}}
.tick-item{
  font-size:12px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;
  color:var(--cobalt);display:flex;align-items:center;gap:12px;
}
.tick-item::before{content:'';width:6px;height:6px;border-radius:50%;background:var(--cobalt);opacity:.4}

/* ── STATS BAR ── */
.stats-bar{
  background:var(--cobalt);
  padding:48px 56px;
  display:grid;grid-template-columns:repeat(5,1fr);gap:0;
}
.sb-stat{
  padding:0 28px;border-right:1px solid rgba(255,255,255,.12);
  text-align:center;
}
.sb-stat:first-child{padding-left:0;text-align:left}
.sb-stat:last-child{border-right:none;padding-right:0;text-align:right}
.sb-n{font-size:52px;font-weight:700;color:#fff;line-height:1;letter-spacing:-2px}
.sb-l{font-size:12px;font-weight:500;color:rgba(255,255,255,.5);margin-top:6px;letter-spacing:0.04em}
.sb-accent{color:var(--amber)}

/* ── JOBS ── */
.jobs{padding:80px 56px;background:var(--bg)}
.jobs-header{display:flex;align-items:flex-end;justify-content:space-between;margin-bottom:40px}
.jobs-h{font-size:48px;font-weight:700;letter-spacing:-2px;color:var(--ink);line-height:1}
.jobs-h span{color:var(--cobalt-mid)}
.jobs-count{font-size:13px;font-weight:500;color:var(--mid)}
.jobs-count b{color:var(--cobalt);font-weight:700}

.jobs-grid{display:grid;grid-template-columns:repeat(3,1fr);grid-template-rows:auto auto;gap:16px}

/* Card base */
.jc{
  background:#fff;border-radius:16px;padding:28px;
  border:1.5px solid rgba(30,58,138,.08);
  transition:transform .2s,box-shadow .2s,border-color .2s;cursor:pointer;
  position:relative;overflow:hidden;
}
.jc:hover{transform:translateY(-4px);box-shadow:0 24px 64px rgba(30,58,138,.14);border-color:var(--cobalt-mid)}
.jc.big{grid-column:span 2;display:grid;grid-template-columns:1fr 300px;gap:28px;align-items:stretch}
.jc.big:hover{transform:translateY(-4px)}

/* Card photo */
.jc-photo{
  border-radius:12px;overflow:hidden;aspect-ratio:16/9;
}
.jc.big .jc-photo{border-radius:12px;overflow:hidden;aspect-ratio:auto}
.jc-photo img{width:100%;height:100%;object-fit:cover;transition:transform .4s}
.jc:hover .jc-photo img{transform:scale(1.04)}

/* Card text */
.jc-body{display:flex;flex-direction:column;justify-content:space-between}
.jc-co{font-size:11px;font-weight:600;letter-spacing:0.1em;text-transform:uppercase;color:var(--mid);margin-bottom:8px}
.jc-title{font-size:22px;font-weight:700;letter-spacing:-0.5px;color:var(--ink);margin-bottom:10px;line-height:1.15}
.jc.big .jc-title{font-size:30px;letter-spacing:-1px}
.jc-tags{display:flex;gap:6px;flex-wrap:wrap;margin-bottom:16px}
.jc-tag{
  font-size:11px;font-weight:600;letter-spacing:0.04em;text-transform:uppercase;
  background:var(--cobalt-light);color:var(--cobalt);padding:4px 10px;border-radius:6px;
}
.jc-tag.amber{background:var(--amber-light);color:var(--amber-dark)}
.jc-foot{display:flex;align-items:center;justify-content:space-between;margin-top:auto}
.jc-salary{font-size:20px;font-weight:700;letter-spacing:-0.5px;color:var(--cobalt)}
.jc.big .jc-salary{font-size:26px;letter-spacing:-1px}
.jc-apply{
  background:var(--cobalt);color:#fff;font-size:12px;font-weight:700;
  letter-spacing:0.06em;text-transform:uppercase;padding:10px 20px;
  border-radius:8px;text-decoration:none;transition:background .15s;
}
.jc-apply:hover{background:var(--ink)}
.jc.big .jc-apply{background:var(--amber);color:var(--ink)}
.jc.big .jc-apply:hover{background:var(--amber-dark)}

/* ── HOW SECTION ── */
.how{
  position:relative;overflow:hidden;
  background:var(--ink);
}
.how-photo{
  position:absolute;right:0;top:0;bottom:0;width:45%;
}
.how-photo img{width:100%;height:100%;object-fit:cover;opacity:.35;mix-blend-mode:luminosity}
.how-photo-grad{
  position:absolute;inset:0;
  background:linear-gradient(to right,var(--ink) 10%,transparent 60%);
}
.how-content{
  position:relative;z-index:2;
  padding:96px 56px;max-width:640px;
}
.how-eyebrow{
  font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;
  color:var(--amber);margin-bottom:20px;
  display:flex;align-items:center;gap:10px;
}
.how-eyebrow::before{content:'';width:24px;height:2px;background:var(--amber)}
.how-h{font-size:56px;font-weight:700;letter-spacing:-2px;color:#fff;line-height:.98;margin-bottom:56px}
.steps{display:flex;flex-direction:column;gap:0}
.step{
  display:flex;gap:24px;padding:28px 0;
  border-bottom:1px solid rgba(255,255,255,.07);
  transition:padding-left .15s;cursor:pointer;
}
.step:hover{padding-left:8px}
.step:last-child{border-bottom:none}
.step-n{
  font-size:11px;font-weight:700;letter-spacing:0.1em;
  color:rgba(255,255,255,.25);min-width:28px;margin-top:2px;
}
.step.active .step-n{color:var(--amber)}
.step-body{}
.step-h{font-size:18px;font-weight:700;color:#fff;margin-bottom:6px;letter-spacing:-0.3px}
.step-p{font-size:14px;font-weight:400;color:rgba(255,255,255,.5);line-height:1.55}

/* ── TESTIMONIAL ── */
.testi{
  background:#fff;
  display:grid;grid-template-columns:1fr 1fr;
  min-height:560px;
}
.testi-photo{overflow:hidden;position:relative}
.testi-photo img{width:100%;height:100%;object-fit:cover;object-position:top}
.testi-overlay{
  position:absolute;inset:0;
  background:linear-gradient(to right,transparent 50%,rgba(255,255,255,.08) 100%);
}
.testi-content{
  padding:72px 56px;display:flex;flex-direction:column;justify-content:center;
  background:#fff;
}
.testi-label{
  font-size:11px;font-weight:700;letter-spacing:0.12em;text-transform:uppercase;
  color:var(--cobalt-mid);margin-bottom:24px;
  display:flex;align-items:center;gap:10px;
}
.testi-label::before{content:'';width:24px;height:2px;background:var(--cobalt-mid)}
.testi-q{
  font-size:28px;font-weight:500;letter-spacing:-0.5px;
  color:var(--ink);line-height:1.3;margin-bottom:36px;
}
.testi-q::before{content:'\201C';color:var(--amber);font-size:72px;line-height:.4;display:block;margin-bottom:20px}
.testi-person{display:flex;align-items:center;gap:16px;margin-bottom:36px}
.testi-av{width:52px;height:52px;border-radius:50%;object-fit:cover;border:3px solid var(--cobalt-light)}
.testi-name{font-size:15px;font-weight:700;color:var(--ink);letter-spacing:-0.2px}
.testi-role{font-size:13px;color:var(--mid);margin-top:2px}
.testi-stats{display:flex;gap:40px;padding-top:28px;border-top:1px solid rgba(30,58,138,.08)}
.ts-n{font-size:40px;font-weight:700;letter-spacing:-1.5px;color:var(--cobalt)}
.ts-l{font-size:12px;color:var(--mid);margin-top:2px;font-weight:500}

/* ── CTA ── */
.cta{
  position:relative;overflow:hidden;
  background:var(--amber);padding:96px 56px;
  display:grid;grid-template-columns:1fr auto;gap:80px;align-items:center;
}
.cta::before{
  content:'';position:absolute;width:500px;height:500px;
  background:rgba(30,58,138,.08);border-radius:50%;
  right:-150px;top:-200px;
}
.cta-h{font-size:64px;font-weight:700;letter-spacing:-3px;color:var(--cobalt);line-height:.95;position:relative;z-index:2}
.cta-sub{font-size:17px;color:rgba(30,58,138,.7);margin-top:16px;position:relative;z-index:2;line-height:1.5}
.cta-btns{display:flex;flex-direction:column;gap:12px;position:relative;z-index:2}
.cta-btn-p{
  background:var(--cobalt);color:#fff;font-size:14px;font-weight:700;
  letter-spacing:-0.2px;padding:18px 44px;border-radius:10px;
  text-decoration:none;text-align:center;transition:background .15s,transform .15s;
}
.cta-btn-p:hover{background:var(--ink);transform:translateY(-2px)}
.cta-btn-s{
  background:rgba(255,255,255,.6);border:none;color:var(--cobalt);font-size:14px;font-weight:700;
  padding:18px 44px;border-radius:10px;text-decoration:none;text-align:center;
}

/* ── FOOTER ── */
footer{background:var(--ink);padding:64px 56px 40px}
.footer-grid{display:grid;grid-template-columns:2fr 1fr 1fr 1fr;gap:56px;margin-bottom:48px}
.f-logo{font-size:26px;font-weight:700;letter-spacing:-0.5px;color:#fff;margin-bottom:12px}
.f-logo span{color:var(--amber)}
.f-desc{font-size:14px;color:rgba(255,255,255,.45);line-height:1.6}
.f-h{font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:rgba(255,255,255,.3);margin-bottom:16px}
.f-links{list-style:none}
.f-links li+li{margin-top:10px}
.f-links a{font-size:14px;color:rgba(255,255,255,.5);text-decoration:none;transition:color .15s}
.f-links a:hover{color:#fff}
.f-bottom{border-top:1px solid rgba(255,255,255,.08);padding-top:28px;display:flex;justify-content:space-between;font-size:12px;color:rgba(255,255,255,.3)}

.style-badge{position:fixed;bottom:20px;right:20px;background:rgba(10,11,15,.9);color:#fff;font-size:10px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;padding:9px 16px;z-index:999;border-radius:8px;border:1px solid rgba(255,255,255,.1)}
.style-badge span{color:var(--amber)}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav">
  <div class="nav-logo">9-2-3 <b>Jobs</b></div>
  <div class="nav-links">
    <a href="#">Find Jobs</a>
    <a href="#">For Businesses</a>
    <a href="#">Fractional</a>
    <a href="#">About</a>
    <a href="#">Insights</a>
  </div>
  <a href="#" class="nav-cta">Book a Call</a>
</nav>

<!-- HERO -->
<section class="hero">
  <div class="hero-bg"></div>
  <div class="hero-gradient"></div>
  <div class="hero-content">
    <div class="hero-eyebrow">The UK&rsquo;s #1 flexible jobs board &mdash; 2,400+ roles live now</div>
    <h1 class="hero-h">
      <span class="line-amber">Work</span><br>
      your<br>
      <span class="line-outline">way.</span>
    </h1>
    <div class="hero-bottom">
      <p class="hero-sub">Flexible, part-time and fractional senior roles with employers who genuinely get it. No compromises &mdash; just a career that works for your life.</p>
      <div class="hero-actions">
        <a href="#" class="btn-hero-p">Browse 2,400+ Roles &rarr;</a>
        <a href="#" class="btn-hero-s">Post a Role</a>
      </div>
    </div>
  </div>
  <div class="scroll-hint"><div class="scroll-line"></div> Scroll to explore</div>
</section>

<!-- TICKER -->
<div class="ticker">
  <div class="ticker-inner">
    <span class="tick-item">2,400+ live roles</span>
    <span class="tick-item">94% fill rate</span>
    <span class="tick-item">340+ verified businesses</span>
    <span class="tick-item">&pound;45k average salary</span>
    <span class="tick-item">48hr average fill time</span>
    <span class="tick-item">Part-time &bull; Fractional &bull; Job Share &bull; 4-day week</span>
    <span class="tick-item">2,400+ live roles</span>
    <span class="tick-item">94% fill rate</span>
    <span class="tick-item">340+ verified businesses</span>
    <span class="tick-item">&pound;45k average salary</span>
    <span class="tick-item">48hr average fill time</span>
    <span class="tick-item">Part-time &bull; Fractional &bull; Job Share &bull; 4-day week</span>
  </div>
</div>

<!-- STATS BAR -->
<div class="stats-bar">
  <div class="sb-stat"><div class="sb-n"><span class="sb-accent">2,400</span><sup style="font-size:.45em">+</sup></div><div class="sb-l">Live roles</div></div>
  <div class="sb-stat"><div class="sb-n">94<span class="sb-accent" style="font-size:.6em">%</span></div><div class="sb-l">Fill rate</div></div>
  <div class="sb-stat"><div class="sb-n">340<sup style="font-size:.45em">+</sup></div><div class="sb-l">Businesses hiring</div></div>
  <div class="sb-stat"><div class="sb-n">&pound;<span class="sb-accent">45k</span></div><div class="sb-l">Avg. salary</div></div>
  <div class="sb-stat"><div class="sb-n">48<span style="font-size:.5em;color:rgba(255,255,255,.4)">hr</span></div><div class="sb-l">Avg. fill time</div></div>
</div>

<!-- JOBS -->
<section class="jobs">
  <div class="jobs-header">
    <h2 class="jobs-h">Featured <span>roles</span></h2>
    <span class="jobs-count"><b>2,400+</b> live roles &rarr; view all</span>
  </div>
  <div class="jobs-grid">
    <!-- Big card -->
    <div class="jc big">
      <div class="jc-photo">
        <img src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format&fit=crop&q=80" alt="Remote work">
      </div>
      <div class="jc-body">
        <div>
          <div class="jc-co">Brightfield Technologies</div>
          <div class="jc-title">Head of Product &amp; Growth</div>
          <div class="jc-tags">
            <span class="jc-tag">Fractional</span>
            <span class="jc-tag">Remote</span>
            <span class="jc-tag">Series B</span>
            <span class="jc-tag amber">&#x2605; Featured</span>
          </div>
        </div>
        <div class="jc-foot">
          <div class="jc-salary">&pound;85,000 pro rata</div>
          <a href="#" class="jc-apply">Apply Now</a>
        </div>
      </div>
    </div>
    <!-- Standard cards -->
    <div class="jc">
      <div class="jc-photo" style="margin-bottom:16px">
        <img src="https://images.unsplash.com/photo-1560472354-b33ff0ad5a3d?w=600&auto=format&fit=crop&q=80" alt="Modern office">
      </div>
      <div class="jc-body">
        <div>
          <div class="jc-co">Zestful Living</div>
          <div class="jc-title">Marketing Director</div>
          <div class="jc-tags"><span class="jc-tag">4-day week</span><span class="jc-tag">Hybrid</span></div>
        </div>
        <div class="jc-foot" style="margin-top:16px">
          <div class="jc-salary">&pound;72,000</div>
          <a href="#" class="jc-apply">Apply</a>
        </div>
      </div>
    </div>
    <div class="jc">
      <div class="jc-co">Meridian Legal</div>
      <div class="jc-title">Finance Lead</div>
      <div class="jc-tags" style="margin-bottom:24px"><span class="jc-tag">Job Share</span><span class="jc-tag">Flexible</span></div>
      <div style="background:var(--bg);border-radius:10px;padding:20px;margin-bottom:20px;display:flex;align-items:center;gap:12px">
        <div style="font-size:36px;font-weight:700;color:var(--cobalt);letter-spacing:-1px">48<span style="font-size:.5em;color:var(--mid)">hr</span></div>
        <div style="font-size:13px;color:var(--mid);line-height:1.4">Average time<br>to first interview</div>
      </div>
      <div class="jc-foot">
        <div class="jc-salary">&pound;55,000</div>
        <a href="#" class="jc-apply">Apply</a>
      </div>
    </div>
    <div class="jc">
      <div class="jc-co">Atlas Studio</div>
      <div class="jc-title">Creative Director</div>
      <div class="jc-tags" style="margin-bottom:16px"><span class="jc-tag">Part-time</span><span class="jc-tag">Remote</span></div>
      <div class="jc-foot">
        <div class="jc-salary">&pound;68,000 FTE</div>
        <a href="#" class="jc-apply">Apply</a>
      </div>
    </div>
  </div>
</section>

<!-- HOW IT WORKS -->
<section class="how">
  <div class="how-photo">
    <img src="https://images.unsplash.com/photo-1542744094-3a31f272c490?w=900&auto=format&fit=crop&q=80" alt="Working">
    <div class="how-photo-grad"></div>
  </div>
  <div class="how-content">
    <div class="how-eyebrow">How it works</div>
    <h2 class="how-h">Four steps to your next role.</h2>
    <div class="steps">
      <div class="step active">
        <div class="step-n">01</div>
        <div class="step-body">
          <div class="step-h">Build your profile</div>
          <p class="step-p">Tell us your ideal setup &mdash; hours, format, salary, sector. Takes 5 minutes.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-n">02</div>
        <div class="step-body">
          <div class="step-h">Get matched</div>
          <p class="step-p">Our team hand-matches your profile to live roles. No algorithm guesswork.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-n">03</div>
        <div class="step-body">
          <div class="step-h">One-click apply</div>
          <p class="step-p">Your profile does the heavy lifting. One tap to apply to any matched role.</p>
        </div>
      </div>
      <div class="step">
        <div class="step-n">04</div>
        <div class="step-body">
          <div class="step-h">Land the role</div>
          <p class="step-p">94% of our placements stay 12+ months. We vet hard so you&rsquo;re protected.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- TESTIMONIAL -->
<section class="testi">
  <div class="testi-photo">
    <img src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=900&auto=format&fit=crop&q=80" alt="Sarah M.">
    <div class="testi-overlay"></div>
  </div>
  <div class="testi-content">
    <div class="testi-label">Candidate story</div>
    <p class="testi-q">I went from burned-out agency director to a fractional CMO role I genuinely love &mdash; in less than two weeks.</p>
    <div class="testi-person">
      <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=104&auto=format&fit=crop&q=80" alt="Sarah M." class="testi-av">
      <div>
        <div class="testi-name">Sarah M.</div>
        <div class="testi-role">Fractional CMO &mdash; placed in 11 days</div>
      </div>
    </div>
    <div class="testi-stats">
      <div><div class="ts-n">11</div><div class="ts-l">Days to placement</div></div>
      <div><div class="ts-n">94%</div><div class="ts-l">Candidate satisfaction</div></div>
      <div><div class="ts-n">5.0</div><div class="ts-l">Star rating</div></div>
    </div>
  </div>
</section>

<!-- CTA -->
<section class="cta">
  <div>
    <h2 class="cta-h">Work your way.</h2>
    <p class="cta-sub">2,400+ roles with employers who genuinely understand how modern professionals work.</p>
  </div>
  <div class="cta-btns">
    <a href="#" class="cta-btn-p">Browse All Jobs</a>
    <a href="#" class="cta-btn-s">I&rsquo;m Hiring</a>
  </div>
</section>

<!-- FOOTER -->
<footer>
  <div class="footer-grid">
    <div>
      <div class="f-logo">9-2-3 <span>Jobs</span></div>
      <p class="f-desc">The UK&rsquo;s leading platform for flexible, fractional and part-time professional roles.</p>
    </div>
    <div>
      <div class="f-h">Candidates</div>
      <ul class="f-links"><li><a href="#">Browse Jobs</a></li><li><a href="#">Salary Guide</a></li><li><a href="#">Career Advice</a></li><li><a href="#">Register</a></li></ul>
    </div>
    <div>
      <div class="f-h">Businesses</div>
      <ul class="f-links"><li><a href="#">Post a Role</a></li><li><a href="#">Fractional</a></li><li><a href="#">Pricing</a></li><li><a href="#">Book a Call</a></li></ul>
    </div>
    <div>
      <div class="f-h">Company</div>
      <ul class="f-links"><li><a href="#">About</a></li><li><a href="#">Insights</a></li><li><a href="#">Press</a></li><li><a href="#">Contact</a></li></ul>
    </div>
  </div>
  <div class="f-bottom">
    <span>&copy; 2025 9-2-3 Jobs Ltd.</span>
    <span>Privacy &middot; Terms &middot; Cookies</span>
  </div>
</footer>

<div class="style-badge">Style 2: <span>Bold &amp; Graphic</span></div>
</body>
</html>`

const stylesIndexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>9-2-3 Jobs &mdash; Style Explorations</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet">
<style>
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
:root {
  --cobalt: #1e3a8a;
  --cobalt-mid: #2563eb;
  --cobalt-light: #dbeafe;
  --cobalt-pale: #eff6ff;
  --amber: #f59e0b;
  --amber-dark: #d97706;
  --amber-light: #fef3c7;
  --text: #0f172a;
  --muted: #64748b;
  --border: #e2e8f0;
  --font-h: 'Fraunces', Georgia, serif;
  --font-b: 'Plus Jakarta Sans', system-ui, sans-serif;
}
body {
  font-family: var(--font-b);
  background: #f8faff;
  color: var(--text);
  min-height: 100vh;
}

/* HEADER */
.header {
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 0 48px;
  height: 72px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.header-logo {
  font-family: var(--font-h);
  font-size: 22px;
  font-weight: 800;
  color: var(--cobalt);
  letter-spacing: -0.5px;
}
.header-logo span { color: var(--amber); }
.header-meta {
  display: flex;
  align-items: center;
  gap: 16px;
}
.phase-badge {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  background: var(--cobalt-pale);
  color: var(--cobalt);
  padding: 6px 14px;
  border-radius: 100px;
  border: 1px solid var(--cobalt-light);
}
.header-date {
  font-size: 13px;
  color: var(--muted);
}

/* HERO BAND */
.hero-band {
  background: var(--cobalt);
  padding: 64px 48px;
  position: relative;
  overflow: hidden;
}
.hero-band::after {
  content: '';
  position: absolute;
  width: 500px;
  height: 500px;
  background: radial-gradient(circle, rgba(245,158,11,0.15) 0%, transparent 70%);
  top: -150px;
  right: -100px;
  pointer-events: none;
}
.hero-band-inner {
  max-width: 960px;
  position: relative;
  z-index: 2;
}
.hero-band-label {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--amber);
  margin-bottom: 16px;
}
.hero-band-h {
  font-family: var(--font-h);
  font-size: 52px;
  font-weight: 700;
  color: white;
  line-height: 1.05;
  letter-spacing: -1.5px;
  margin-bottom: 16px;
}
.hero-band-sub {
  font-size: 16px;
  color: rgba(255,255,255,0.65);
  line-height: 1.6;
  max-width: 640px;
  margin-bottom: 28px;
}
.instructions {
  display: flex;
  gap: 24px;
  flex-wrap: wrap;
}
.instr-item {
  display: flex;
  align-items: center;
  gap: 10px;
  background: rgba(255,255,255,0.08);
  border: 1px solid rgba(255,255,255,0.12);
  border-radius: 12px;
  padding: 12px 20px;
}
.instr-icon { font-size: 20px; }
.instr-text { font-size: 13px; color: rgba(255,255,255,0.75); font-weight: 500; }

/* PALETTE INFO */
.palette-bar {
  background: white;
  border-bottom: 1px solid var(--border);
  padding: 20px 48px;
  display: flex;
  align-items: center;
  gap: 24px;
}
.palette-label {
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--muted);
  white-space: nowrap;
}
.palette-swatches { display: flex; gap: 8px; align-items: center; }
.swatch {
  width: 28px;
  height: 28px;
  border-radius: 8px;
  border: 1px solid rgba(0,0,0,0.08);
  position: relative;
}
.swatch-label {
  font-size: 11px;
  color: var(--muted);
  white-space: nowrap;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
}
.swatch-group { display: flex; flex-direction: column; align-items: center; gap: 4px; }
.swatch-hex { font-size: 10px; color: var(--muted); font-family: monospace; }
.palette-note {
  margin-left: auto;
  font-size: 12px;
  color: var(--muted);
  background: var(--cobalt-pale);
  padding: 6px 14px;
  border-radius: 100px;
  border: 1px solid var(--cobalt-light);
  white-space: nowrap;
}
.palette-note strong { color: var(--cobalt); }

/* STYLES GRID */
.styles-section {
  padding: 48px;
  max-width: 1440px;
  margin: 0 auto;
}
.styles-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 28px;
}

.style-card {
  background: white;
  border-radius: 20px;
  border: 2px solid var(--border);
  overflow: hidden;
  transition: border-color 0.2s, box-shadow 0.2s;
  cursor: pointer;
}
.style-card:hover {
  border-color: var(--cobalt-mid);
  box-shadow: 0 12px 48px rgba(30,58,138,0.12);
}
.style-card:hover .preview-overlay { opacity: 1; }

/* Preview area */
.preview-area {
  position: relative;
  height: 340px;
  overflow: hidden;
  background: #f1f5f9;
}
.preview-iframe {
  width: 200%;
  height: 200%;
  transform: scale(0.5);
  transform-origin: top left;
  border: none;
  pointer-events: none;
}
.preview-overlay {
  position: absolute;
  inset: 0;
  background: rgba(30,58,138,0.04);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.2s;
}
.open-btn {
  background: var(--cobalt);
  color: white;
  font-weight: 700;
  font-size: 14px;
  padding: 14px 32px;
  border-radius: 100px;
  text-decoration: none;
  box-shadow: 0 4px 24px rgba(30,58,138,0.4);
}

/* Thumbnail placeholders */
.thumb-editorial {
  background: white;
  display: flex;
  flex-direction: column;
}
.thumb-e-nav {
  height: 44px;
  border-bottom: 3px solid #0f172a;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
}
.thumb-e-logo-text {
  font-family: var(--font-h);
  font-size: 14px;
  font-weight: 800;
  color: #0f172a;
  letter-spacing: -0.5px;
}
.thumb-e-rule { width: 1px; height: 16px; background: #cbd5e1; }
.thumb-e-links { display: flex; gap: 10px; }
.thumb-e-link { width: 36px; height: 6px; background: #cbd5e1; border-radius: 2px; }
.thumb-e-hero {
  flex: 1;
  padding: 24px 20px 12px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.thumb-e-eyebrow { width: 80px; height: 6px; background: var(--cobalt); border-radius: 1px; margin-bottom: 12px; }
.thumb-e-h { width: 80%; height: 28px; background: #0f172a; border-radius: 2px; margin-bottom: 8px; }
.thumb-e-h2 { width: 60%; height: 28px; background: #0f172a; border-radius: 2px; margin-bottom: 16px; }
.thumb-e-body { width: 100%; height: 6px; background: #e2e8f0; border-radius: 2px; margin-bottom: 6px; }
.thumb-e-body2 { width: 80%; height: 6px; background: #e2e8f0; border-radius: 2px; margin-bottom: 20px; }
.thumb-e-rule-full { height: 1px; background: #0f172a; margin: 0 -20px 16px; }
.thumb-e-cols { display: flex; gap: 12px; }
.thumb-e-col { flex: 1; }
.thumb-e-col-line { height: 5px; background: #e2e8f0; border-radius: 1px; margin-bottom: 5px; }

/* Bold Graphic thumb */
.thumb-bold { background: var(--cobalt); display: flex; flex-direction: column; }
.thumb-b-nav {
  height: 48px;
  background: rgba(255,255,255,0.1);
  border-radius: 100px;
  margin: 12px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  gap: 8px;
}
.thumb-b-logo { font-family: var(--font-h); font-size: 13px; font-weight: 800; color: white; }
.thumb-b-links { display: flex; gap: 6px; margin-left: auto; }
.thumb-b-link { width: 24px; height: 5px; background: rgba(255,255,255,0.3); border-radius: 2px; }
.thumb-b-cta { width: 40px; height: 20px; background: var(--amber); border-radius: 100px; margin-left: 8px; }
.thumb-b-hero {
  flex: 1;
  padding: 16px 24px;
  position: relative;
  display: flex;
  align-items: center;
  gap: 20px;
  overflow: hidden;
}
.thumb-b-circle {
  position: absolute;
  width: 200px;
  height: 200px;
  background: var(--amber);
  border-radius: 50%;
  top: -80px;
  right: -60px;
  opacity: 0.9;
}
.thumb-b-left { position: relative; z-index: 2; flex: 1; }
.thumb-b-tag { width: 70px; height: 16px; background: rgba(255,255,255,0.15); border-radius: 100px; margin-bottom: 10px; }
.thumb-b-h { width: 90%; height: 20px; background: white; border-radius: 3px; margin-bottom: 6px; }
.thumb-b-h2 { width: 70%; height: 20px; background: rgba(255,255,255,0.4); border-radius: 3px; margin-bottom: 14px; }
.thumb-b-btns { display: flex; gap: 8px; }
.thumb-b-btn1 { width: 70px; height: 22px; background: var(--amber); border-radius: 100px; }
.thumb-b-btn2 { width: 60px; height: 22px; background: rgba(255,255,255,0.15); border-radius: 100px; }
.thumb-b-right { position: relative; z-index: 2; display: flex; flex-direction: column; gap: 8px; }
.thumb-b-pill { width: 120px; height: 40px; background: rgba(255,255,255,0.1); border-radius: 12px; border: 1px solid rgba(255,255,255,0.15); }
.thumb-b-pill.a { background: var(--amber); }
.thumb-b-stripe {
  height: 36px;
  background: var(--amber);
  display: flex;
  align-items: center;
  padding: 0 24px;
  gap: 20px;
}
.thumb-b-stat { width: 30px; height: 8px; background: var(--cobalt); border-radius: 2px; opacity: 0.4; }

/* Warm thumb */
.thumb-warm { background: linear-gradient(135deg, #f0f4ff 0%, #eff6ff 50%, #fef9ec 100%); display: flex; flex-direction: column; }
.thumb-w-nav {
  height: 52px;
  background: white;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 8px;
}
.thumb-w-logobox { width: 28px; height: 28px; background: var(--cobalt); border-radius: 8px; }
.thumb-w-logotext { width: 60px; height: 8px; background: #0f172a; border-radius: 2px; opacity: 0.7; }
.thumb-w-links { display: flex; gap: 6px; margin-left: auto; }
.thumb-w-link { width: 28px; height: 5px; background: #cbd5e1; border-radius: 2px; }
.thumb-w-cta { width: 44px; height: 20px; background: var(--amber); border-radius: 10px; margin-left: 8px; }
.thumb-w-hero {
  flex: 1;
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
  align-items: start;
}
.thumb-w-left {}
.thumb-w-tag { width: 90px; height: 16px; background: white; border-radius: 100px; border: 1px solid #fed7aa; margin-bottom: 10px; }
.thumb-w-h { width: 95%; height: 16px; background: #0f172a; border-radius: 2px; margin-bottom: 6px; opacity: 0.85; }
.thumb-w-h2 { width: 75%; height: 16px; background: #0f172a; border-radius: 2px; margin-bottom: 14px; opacity: 0.85; }
.thumb-w-search { height: 28px; background: white; border-radius: 10px; border: 1px solid #e2e8f0; box-shadow: 0 2px 8px rgba(30,58,138,0.06); }
.thumb-w-right { display: flex; flex-direction: column; gap: 6px; }
.thumb-w-person { height: 36px; background: white; border-radius: 12px; box-shadow: 0 2px 8px rgba(30,58,138,0.06); }

/* Dark thumb */
.thumb-dark { background: #080c14; display: flex; flex-direction: column; }
.thumb-d-nav {
  height: 48px;
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
}
.thumb-d-logo { width: 50px; height: 8px; background: white; border-radius: 2px; opacity: 0.85; }
.thumb-d-links { display: flex; gap: 8px; margin-left: auto; }
.thumb-d-link { width: 28px; height: 4px; background: rgba(255,255,255,0.2); border-radius: 1px; }
.thumb-d-hero {
  flex: 1;
  padding: 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
}
.thumb-d-stat { font-family: var(--font-h); font-size: 60px; font-weight: 800; color: var(--amber); line-height: 1; margin-bottom: 8px; }
.thumb-d-h { width: 70%; height: 10px; background: rgba(255,255,255,0.7); border-radius: 2px; margin: 0 auto 6px; }
.thumb-d-sub { width: 55%; height: 6px; background: rgba(255,255,255,0.25); border-radius: 2px; margin: 0 auto 20px; }
.thumb-d-strip {
  height: 40px;
  border-top: 1px solid rgba(255,255,255,0.06);
  border-bottom: 1px solid rgba(255,255,255,0.06);
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 16px;
}
.thumb-d-s { width: 32px; height: 5px; background: rgba(255,255,255,0.1); border-radius: 1px; }

/* Card info */
.style-info {
  padding: 24px 28px;
  border-top: 1px solid var(--border);
}
.style-num {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 6px;
}
.style-name {
  font-family: var(--font-h);
  font-size: 24px;
  font-weight: 700;
  color: var(--text);
  letter-spacing: -0.5px;
  margin-bottom: 8px;
}
.style-desc {
  font-size: 14px;
  color: var(--muted);
  line-height: 1.5;
  margin-bottom: 16px;
}
.style-tags { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 20px; }
.style-tag {
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.05em;
  padding: 5px 12px;
  border-radius: 100px;
  background: var(--cobalt-pale);
  color: var(--cobalt);
}
.style-actions { display: flex; gap: 10px; align-items: center; }
.open-style-btn {
  background: var(--cobalt);
  color: white;
  font-weight: 700;
  font-size: 13px;
  padding: 11px 24px;
  border-radius: 100px;
  text-decoration: none;
  transition: background 0.15s;
}
.open-style-btn:hover { background: #152d6d; }
.style-inspect {
  font-size: 13px;
  font-weight: 600;
  color: var(--cobalt-mid);
  text-decoration: none;
}

/* Comparison note */
.comparison-note {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 48px 24px;
}
.note-card {
  background: white;
  border-radius: 16px;
  border: 1px solid var(--cobalt-light);
  padding: 24px 32px;
  display: flex;
  align-items: flex-start;
  gap: 20px;
}
.note-icon { font-size: 24px; flex-shrink: 0; margin-top: 2px; }
.note-title { font-weight: 700; font-size: 15px; color: var(--cobalt); margin-bottom: 4px; }
.note-body { font-size: 14px; color: var(--muted); line-height: 1.6; }

/* Progress */
.progress-section {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 48px 64px;
}
.progress-h {
  font-size: 11px;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 20px;
}
.phases { display: flex; gap: 8px; align-items: center; }
.phase {
  background: white;
  border: 1.5px solid var(--border);
  border-radius: 12px;
  padding: 14px 20px;
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 13px;
  font-weight: 600;
  color: var(--muted);
}
.phase.done { border-color: var(--cobalt-light); background: var(--cobalt-pale); color: var(--cobalt); }
.phase.active { border-color: var(--amber); background: var(--amber-light); color: var(--amber-dark); }
.phase-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--border); }
.phase.done .phase-dot { background: var(--cobalt); }
.phase.active .phase-dot { background: var(--amber); }
.phase-arrow { color: var(--border); font-size: 16px; }
</style>
</head>
<body>

<!-- HEADER -->
<header class="header">
  <div class="header-logo">9-2-3 <span>Jobs</span> &mdash; Design Exploration</div>
  <div class="header-meta">
    <span class="phase-badge">Phase 3: Design</span>
    <span class="header-date">April 2025 &mdash; Gate 3 Review</span>
  </div>
</header>

<!-- HERO BAND -->
<div class="hero-band">
  <div class="hero-band-inner">
    <div class="hero-band-label">Style Exploration &mdash; 4 Directions</div>
    <h1 class="hero-band-h">Which homepage feels right?</h1>
    <p class="hero-band-sub">Same content, same Cobalt &amp; Amber palette, four completely different visual personalities. Open each to explore the full scrolling homepage, then pick your favourite (or mix elements).</p>
    <div class="instructions">
      <div class="instr-item">
        <span class="instr-icon">&#x1F4CB;</span>
        <span class="instr-text">All use the same job listings &amp; copy</span>
      </div>
      <div class="instr-item">
        <span class="instr-icon">&#x1F3A8;</span>
        <span class="instr-text">All use the approved Cobalt &amp; Amber tokens</span>
      </div>
      <div class="instr-item">
        <span class="instr-icon">&#x1F4F1;</span>
        <span class="instr-text">Desktop mockups &mdash; mobile to follow in Phase 5</span>
      </div>
    </div>
  </div>
</div>

<!-- PALETTE BAR -->
<div class="palette-bar">
  <span class="palette-label">Shared palette:</span>
  <div class="palette-swatches">
    <div class="swatch-group">
      <div class="swatch" style="background:#1e3a8a;"></div>
      <span class="swatch-hex">#1e3a8a</span>
    </div>
    <div class="swatch-group">
      <div class="swatch" style="background:#2563eb;"></div>
      <span class="swatch-hex">#2563eb</span>
    </div>
    <div class="swatch-group">
      <div class="swatch" style="background:#dbeafe;"></div>
      <span class="swatch-hex">#dbeafe</span>
    </div>
    <div class="swatch-group">
      <div class="swatch" style="background:#f59e0b;"></div>
      <span class="swatch-hex">#f59e0b</span>
    </div>
    <div class="swatch-group">
      <div class="swatch" style="background:#fef3c7;"></div>
      <span class="swatch-hex">#fef3c7</span>
    </div>
    <div class="swatch-group">
      <div class="swatch" style="background:#0f172a;border:1px solid #cbd5e1;"></div>
      <span class="swatch-hex">#0f172a</span>
    </div>
  </div>
  <div class="palette-note">Fonts: <strong>Fraunces</strong> (headings) &amp; <strong>Plus Jakarta Sans</strong> (body)</div>
</div>

<!-- STYLES GRID -->
<div class="styles-section">
  <div class="styles-grid">

    <!-- STYLE 1: EDITORIAL -->
    <div class="style-card">
      <div class="preview-area">
        <div class="thumb-editorial" style="width:100%;height:100%;">
          <div class="thumb-e-nav">
            <span class="thumb-e-logo-text">9-2-3 Jobs</span>
            <div class="thumb-e-rule"></div>
            <div class="thumb-e-links">
              <div class="thumb-e-link"></div>
              <div class="thumb-e-link"></div>
              <div class="thumb-e-link"></div>
              <div class="thumb-e-link" style="background:var(--cobalt);width:50px"></div>
            </div>
          </div>
          <div style="height:2px;background:#0f172a;"></div>
          <div class="thumb-e-hero">
            <div class="thumb-e-eyebrow"></div>
            <div class="thumb-e-h"></div>
            <div class="thumb-e-h2"></div>
            <div class="thumb-e-body"></div>
            <div class="thumb-e-body"></div>
            <div class="thumb-e-body2"></div>
          </div>
          <div style="height:1px;background:#0f172a;margin:0 20px 16px;"></div>
          <div style="padding:0 20px 20px;display:flex;gap:12px;">
            <div style="flex:1;border-right:1px solid #e2e8f0;padding-right:12px;">
              <div class="thumb-e-col-line"></div>
              <div class="thumb-e-col-line"></div>
              <div class="thumb-e-col-line" style="width:70%"></div>
            </div>
            <div style="flex:1;border-right:1px solid #e2e8f0;padding-right:12px;">
              <div class="thumb-e-col-line"></div>
              <div class="thumb-e-col-line"></div>
              <div class="thumb-e-col-line" style="width:60%"></div>
            </div>
            <div style="flex:1;">
              <div class="thumb-e-col-line"></div>
              <div class="thumb-e-col-line"></div>
              <div class="thumb-e-col-line" style="width:80%"></div>
            </div>
          </div>
        </div>
        <div class="preview-overlay">
          <a href="style-editorial.html" target="_blank" class="open-btn">Open full mockup &#x2192;</a>
        </div>
      </div>
      <div class="style-info">
        <div class="style-num">Style 01</div>
        <div class="style-name">Editorial</div>
        <div class="style-desc">Newspaper-meets-magazine. High-contrast ink rules, typographic hierarchy does the heavy lifting. Authority and editorial credibility — like a quality broadsheet that also happens to be a jobs board.</div>
        <div class="style-tags">
          <span class="style-tag">Typography-led</span>
          <span class="style-tag">High-contrast</span>
          <span class="style-tag">Authoritative</span>
          <span class="style-tag">Magazine-feel</span>
        </div>
        <div class="style-actions">
          <a href="style-editorial.html" target="_blank" class="open-style-btn">Open mockup &#x2192;</a>
        </div>
      </div>
    </div>

    <!-- STYLE 2: BOLD GRAPHIC -->
    <div class="style-card">
      <div class="preview-area">
        <div class="thumb-bold" style="width:100%;height:100%;">
          <div class="thumb-b-nav">
            <span class="thumb-b-logo">9-2-3 Jobs</span>
            <div class="thumb-b-links">
              <div class="thumb-b-link"></div>
              <div class="thumb-b-link"></div>
              <div class="thumb-b-link"></div>
            </div>
            <div class="thumb-b-cta"></div>
          </div>
          <div class="thumb-b-hero">
            <div class="thumb-b-circle"></div>
            <div class="thumb-b-left">
              <div class="thumb-b-tag"></div>
              <div class="thumb-b-h"></div>
              <div class="thumb-b-h2"></div>
              <div class="thumb-b-btns">
                <div class="thumb-b-btn1"></div>
                <div class="thumb-b-btn2"></div>
              </div>
            </div>
            <div class="thumb-b-right">
              <div class="thumb-b-pill a"></div>
              <div class="thumb-b-pill"></div>
              <div class="thumb-b-pill"></div>
            </div>
          </div>
          <div class="thumb-b-stripe">
            <div class="thumb-b-stat"></div>
            <div class="thumb-b-stat"></div>
            <div class="thumb-b-stat"></div>
            <div class="thumb-b-stat"></div>
            <div class="thumb-b-stat"></div>
          </div>
        </div>
        <div class="preview-overlay">
          <a href="style-bold-graphic.html" target="_blank" class="open-btn">Open full mockup &#x2192;</a>
        </div>
      </div>
      <div class="style-info">
        <div class="style-num">Style 02</div>
        <div class="style-name">Bold &amp; Graphic</div>
        <div class="style-desc">Monzo meets design-agency poster. Floating pill nav, massive geometric amber circle, statistics as visual art. Energy and confidence without being loud. Would stand out on Product Hunt.</div>
        <div class="style-tags">
          <span class="style-tag">Geometric shapes</span>
          <span class="style-tag">Pill nav</span>
          <span class="style-tag">Energy</span>
          <span class="style-tag">Modern fintech</span>
        </div>
        <div class="style-actions">
          <a href="style-bold-graphic.html" target="_blank" class="open-style-btn">Open mockup &#x2192;</a>
        </div>
      </div>
    </div>

    <!-- STYLE 3: WARM & HUMAN -->
    <div class="style-card">
      <div class="preview-area">
        <div class="thumb-warm" style="width:100%;height:100%;">
          <div class="thumb-w-nav">
            <div class="thumb-w-logobox"></div>
            <div class="thumb-w-logotext"></div>
            <div class="thumb-w-links">
              <div class="thumb-w-link"></div>
              <div class="thumb-w-link"></div>
              <div class="thumb-w-link"></div>
            </div>
            <div class="thumb-w-cta"></div>
          </div>
          <div class="thumb-w-hero">
            <div class="thumb-w-left">
              <div class="thumb-w-tag"></div>
              <div class="thumb-w-h"></div>
              <div class="thumb-w-h2"></div>
              <div style="margin-bottom:8px;"></div>
              <div class="thumb-w-search"></div>
            </div>
            <div class="thumb-w-right">
              <div class="thumb-w-person"></div>
              <div class="thumb-w-person"></div>
              <div class="thumb-w-person"></div>
              <div style="height:28px;background:white;border-radius:10px;border:1px solid var(--cobalt-light);display:flex;align-items:center;padding:0 10px;gap:6px;">
                <div style="width:24px;height:8px;background:var(--cobalt);border-radius:2px;font-family:var(--font-h);font-size:10px;color:var(--cobalt);"></div>
                <div style="font-size:10px;color:var(--muted);font-family:var(--font-b);white-space:nowrap;">94% filled in 48hrs</div>
              </div>
            </div>
          </div>
        </div>
        <div class="preview-overlay">
          <a href="style-warm-human.html" target="_blank" class="open-btn">Open full mockup &#x2192;</a>
        </div>
      </div>
      <div class="style-info">
        <div class="style-num">Style 03</div>
        <div class="style-name">Warm &amp; Human</div>
        <div class="style-desc">Bumble-for-business meets community platform. Soft gradients, candidate profile cards, rounded everything. Approachable and trustworthy. Makes job-seeking feel like a positive experience rather than a chore.</div>
        <div class="style-tags">
          <span class="style-tag">Person-first</span>
          <span class="style-tag">Soft gradients</span>
          <span class="style-tag">Community</span>
          <span class="style-tag">Approachable</span>
        </div>
        <div class="style-actions">
          <a href="style-warm-human.html" target="_blank" class="open-style-btn">Open mockup &#x2192;</a>
        </div>
      </div>
    </div>

    <!-- STYLE 4: DARK PREMIUM -->
    <div class="style-card">
      <div class="preview-area">
        <div class="thumb-dark" style="width:100%;height:100%;">
          <div class="thumb-d-nav">
            <div class="thumb-d-logo"></div>
            <div class="thumb-d-links">
              <div class="thumb-d-link"></div>
              <div class="thumb-d-link"></div>
              <div class="thumb-d-link"></div>
            </div>
            <div style="width:44px;height:18px;background:var(--amber);border-radius:100px;margin-left:8px;"></div>
          </div>
          <div class="thumb-d-hero">
            <div class="thumb-d-stat">94%</div>
            <div class="thumb-d-h"></div>
            <div class="thumb-d-sub"></div>
            <div style="display:flex;gap:8px;justify-content:center;">
              <div style="width:60px;height:20px;background:var(--amber);border-radius:4px;"></div>
              <div style="width:60px;height:20px;border:1px solid rgba(255,255,255,0.15);border-radius:4px;"></div>
            </div>
          </div>
          <div class="thumb-d-strip">
            <div class="thumb-d-s"></div>
            <div class="thumb-d-s"></div>
            <div class="thumb-d-s"></div>
            <div class="thumb-d-s"></div>
            <div class="thumb-d-s"></div>
          </div>
          <div style="flex:1;padding:16px 20px;display:flex;flex-direction:column;gap:8px;">
            <div style="height:28px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;"></div>
            <div style="height:28px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;"></div>
            <div style="height:28px;border:1px solid rgba(255,255,255,0.07);border-radius:8px;"></div>
          </div>
        </div>
        <div class="preview-overlay">
          <a href="style-dark-premium.html" target="_blank" class="open-btn">Open full mockup &#x2192;</a>
        </div>
      </div>
      <div class="style-info">
        <div class="style-num">Style 04</div>
        <div class="style-name">Dark Premium</div>
        <div class="style-desc">Vercel meets Linear. Near-black canvas, amber as the only colour, enormous stat typography. Signals premium talent and serious business. Unexpected for a jobs board &mdash; which is exactly the point.</div>
        <div class="style-tags">
          <span class="style-tag">Near-black</span>
          <span class="style-tag">Amber-only</span>
          <span class="style-tag">Premium</span>
          <span class="style-tag">Developer-cool</span>
        </div>
        <div class="style-actions">
          <a href="style-dark-premium.html" target="_blank" class="open-btn">Open mockup &#x2192;</a>
        </div>
      </div>
    </div>

  </div>
</div>

<!-- COMPARISON NOTE -->
<div class="comparison-note">
  <div class="note-card">
    <span class="note-icon">&#x1F4A1;</span>
    <div>
      <div class="note-title">Picking a direction</div>
      <div class="note-body">You don&rsquo;t have to commit to one style wholesale &mdash; the final site can blend elements. For example: the <strong>Warm &amp; Human</strong> structure with <strong>Bold &amp; Graphic</strong> hero treatment, or <strong>Editorial</strong> job listings inside a <strong>Warm &amp; Human</strong> shell. Once you&rsquo;ve reviewed all four, note which specific sections feel strongest and we&rsquo;ll synthesise into a final direction for Phase 4.</div>
    </div>
  </div>
</div>

<!-- PROGRESS -->
<div class="progress-section">
  <div class="progress-h">Project Progress</div>
  <div class="phases">
    <div class="phase done"><div class="phase-dot"></div> Phase 1: Discovery</div>
    <div class="phase-arrow">&#x2192;</div>
    <div class="phase done"><div class="phase-dot"></div> Phase 2: Content Strategy</div>
    <div class="phase-arrow">&#x2192;</div>
    <div class="phase active"><div class="phase-dot"></div> Phase 3: Design &#x2605;</div>
    <div class="phase-arrow">&#x2192;</div>
    <div class="phase"><div class="phase-dot"></div> Phase 4: Content</div>
    <div class="phase-arrow">&#x2192;</div>
    <div class="phase"><div class="phase-dot"></div> Phase 5: Frontend</div>
    <div class="phase-arrow">&#x2192;</div>
    <div class="phase"><div class="phase-dot"></div> Phase 6: Backend &amp; Launch</div>
  </div>
</div>

</body>
</html>`

export const nine23Demo: Simulation = {
  id: 'nine23-website-demo',
  title: '923 Jobs — Lazy vs Good Prompt',
  description: 'Three prompts, three completely different results. The difference between a generic website and a real brand.',
  productType: 'claude-chat',
  createdAt: '2026-04-16T00:00:00Z',
  updatedAt: '2026-04-16T00:00:00Z',
  metadata: {
    chatConfig: {
      modelName: 'claude-sonnet-4-20250514',
      theme: 'light',
      conversationTitle: '923 Jobs website',
      sidebarConversations: [
        { id: 'c1', title: 'Fat Squirrel marketing', timestamp: 'Yesterday', isActive: false },
      ],
      projects: [
        { id: 'p1', name: 'Versantus Clients', conversationCount: 12 },
      ],
    },
  },
  events: [
    // ===== TURN 1: Lazy prompt =====
    {
      id: 'e1',
      type: 'user-message',
      delayMs: 0,
      content: 'build me a jobs website',
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
      content: "Here's a basic jobs website for you:",
      streamingSpeed: 'fast',
    },
    {
      id: 'e4',
      type: 'artifact',
      delayMs: 300,
      artifactType: 'html',
      title: '923 Jobs',
      content: blandWebsiteHtml,
    },

    // ===== TURN 2: Good prompt =====
    {
      id: 'e5',
      type: 'pause',
      delayMs: 1500,
    },
    {
      id: 'e6',
      type: 'user-message',
      delayMs: 0,
      content: "I need a homepage for 923 Jobs — a recruitment agency based in Stroud, Gloucestershire. Target audience is local employers and job seekers. Brand personality: bold, energetic, no-nonsense. The name comes from the 9-to-3 school hours — they specialise in flexible and part-time roles for parents returning to work. Use a cobalt blue and amber palette. The design should feel modern, graphic, and confident — not corporate or bland. Include a hero section, featured jobs, an employer CTA, and a footer. Make it feel like a real brand, not a template.",
      typingEffect: true,
    },
    {
      id: 'e7',
      type: 'thinking',
      delayMs: 400,
      durationMs: 1200,
    },
    {
      id: 'e8',
      type: 'assistant-message',
      delayMs: 200,
      content: "Here's a bold, branded homepage for 923 Jobs:",
      streamingSpeed: 'normal',
    },
    {
      id: 'e9',
      type: 'artifact',
      delayMs: 300,
      artifactType: 'html',
      title: '9-2-3 Jobs — Bold & Graphic',
      content: boldGraphicHtml,
    },

    // ===== TURN 3: Five variants =====
    {
      id: 'e10',
      type: 'pause',
      delayMs: 1500,
    },
    {
      id: 'e11',
      type: 'user-message',
      delayMs: 0,
      content: "That's great. Now give me 5 completely different design directions — same content, different aesthetics. Show me them all on one page so I can compare.",
      typingEffect: true,
    },
    {
      id: 'e12',
      type: 'thinking',
      delayMs: 400,
      durationMs: 1500,
    },
    {
      id: 'e13',
      type: 'assistant-message',
      delayMs: 200,
      content: "Here are 5 distinct design directions for the 923 Jobs homepage. Each takes the same content in a completely different visual direction:",
      streamingSpeed: 'normal',
    },
    {
      id: 'e14',
      type: 'artifact',
      delayMs: 300,
      artifactType: 'html',
      title: '9-2-3 Jobs — 5 Design Directions',
      content: stylesIndexHtml,
    },
    {
      id: 'e15',
      type: 'status-bar-update',
      delayMs: 0,
      updates: { cost: '$0.42', contextPercent: 35 },
    },
  ],
}
