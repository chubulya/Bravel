"use client";

import { useMemo, useState } from "react";

type Step = { kind: "intro" | "choice" | "input" | "voice" | "loader" | "plan" | "home"; title: string; eyebrow?: string; copy?: string; options?: string[]; multi?: boolean; field?: string };

const steps: Step[] = [
  { kind: "intro", eyebrow: "Maya, your AI English tutor", title: "You already understand English. Let’s help you speak it.", copy: "Practice the real conversations in your life - with a tutor who never judges.", options: ["Get started"] },
  { kind: "choice", eyebrow: "A little about you", title: "What would speaking confidently change for you?", copy: "Choose up to three. Maya will make your practice feel useful from day one.", multi: true, options: ["💼 Feel more confident at work", "🏥 Handle everyday appointments", "🤝 Connect with people around me", "✈️ Travel without freezing", "🌱 Grow into a new chapter"] },
  { kind: "choice", eyebrow: "A little about you", title: "What language feels most like home?", copy: "This helps Maya explain things in a way that clicks.", options: ["🇪🇸 Spanish", "🇵🇹 Portuguese", "🇺🇦 Ukrainian", "🇨🇳 Mandarin", "🌐 Another language"] },
  { kind: "choice", eyebrow: "Your practice", title: "Which conversations would you like to rehearse?", copy: "Pick as many as you want. You can always change these later.", multi: true, options: ["Calling the doctor", "Talking with my child’s teacher", "A job interview", "Small talk with neighbors", "Speaking up in a meeting"] },
  { kind: "choice", eyebrow: "Your starting point", title: "How does English feel right now?", copy: "There’s no test here - just choose the answer that feels closest.", options: ["I know the basics, but speaking is hard", "I can talk, but I lose confidence", "I speak well and want more nuance", "I’m not sure yet"] },
  { kind: "intro", eyebrow: "Meet Maya", title: "A conversation partner who is always in your corner.", copy: "Maya adapts to every level and goal. She listens, gives gentle corrections, and remembers what you are working toward.", options: ["Meet Maya"] },
  { kind: "input", eyebrow: "Let’s make this personal", title: "What should Maya call you?", copy: "This is the name she’ll use when you practise together.", field: "Your first name" },
  { kind: "choice", eyebrow: "A little about you", title: "Which age range feels right?", options: ["18-24", "25-34", "35-44", "45-54", "55+"] },
  { kind: "choice", eyebrow: "Your life in the U.S.", title: "How long have you been living in the U.S.?", copy: "This helps Maya make practice more relevant to your daily life.", options: ["Less than a year", "1-3 years", "4-10 years", "More than 10 years"] },
  { kind: "intro", eyebrow: "Your personalised plan", title: "Let’s build practice around your real week.", copy: "Small, focused conversations add up. We’ll shape a plan that fits the time you actually have.", options: ["Build my plan"] },
  { kind: "choice", eyebrow: "Your routine", title: "How much time can you give yourself most days?", options: ["5 minutes", "10 minutes", "15 minutes", "20+ minutes"] },
  { kind: "choice", eyebrow: "Your routine", title: "When would practice feel easiest?", options: ["Before my day starts", "During a break", "After work", "Whenever I can"] },
  { kind: "choice", eyebrow: "Your focus", title: "What would you like Maya to help with most?", multi: true, options: ["Speaking naturally", "Finding the right words", "Clear pronunciation", "Grammar without the pressure"] },
  { kind: "voice", eyebrow: "A tiny hello", title: "Try one sentence with Maya.", copy: "Say: “Hi Maya, I’m ready to speak with confidence.” There’s no score - just a friendly first hello." },
  { kind: "loader", eyebrow: "Making it yours", title: "Building a plan around your life...", copy: "Maya is choosing the first conversations that will make the biggest difference." },
  { kind: "input", eyebrow: "Save your progress", title: "Where should we send your plan?", copy: "Your plan will be waiting for you whenever you come back.", field: "Email address" },
  { kind: "plan", eyebrow: "Your first week", title: "You’re closer than you think, friend.", copy: "Your personal path starts with the conversations you want to have most." },
  { kind: "home", title: "Good morning, friend." }
];

export default function Page() {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [name, setName] = useState("");
  const step = steps[index];
  const progress = Math.round((index / (steps.length - 1)) * 100);
  const isNextDisabled = (step.kind === "choice" && !picked.length) || (step.kind === "input" && !name.trim());
  const review = useMemo(() => index % 2 ? "“I finally stopped translating every word in my head. Maya makes practice feel like a real conversation.”" : "“I was nervous at first, but the small daily conversations gave me my voice back.”", [index]);

  const next = () => { setPicked([]); setName(""); setIndex((i) => Math.min(i + 1, steps.length - 1)); };
  const select = (option: string) => {
    if (step.multi) setPicked((items) => items.includes(option) ? items.filter((item) => item !== option) : [...items, option].slice(-3));
    else { setPicked([option]); setTimeout(next, 260); }
  };

  if (step.kind === "home") return <Home onRestart={() => setIndex(0)} />;
  return <main className="stage"><section className="phone-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" /><div className="ambient ambient-three" />
    <header><button aria-label="Go back" className="back" onClick={() => setIndex((i) => Math.max(0, i - 1))} disabled={!index}>←</button><div className="brand">bravel</div><span className="step-count">{String(index + 1).padStart(2, "0")} <i /> {String(steps.length).padStart(2, "0")}</span></header>
    <div className="progress"><span style={{ width: `${progress}%` }} /></div>
    <div className="content">
      {step.kind === "intro" && <Maya />}
      {step.kind === "voice" && <VoiceOrb />}
      {step.kind === "loader" && <Loader />}
      {step.kind === "plan" && <PlanPreview />}
      <div className={`copy ${step.kind}`}><p className="eyebrow">{step.eyebrow}</p><h1>{step.title}</h1>{step.copy && <p className="description">{step.copy}</p>}</div>
      {step.kind === "choice" && <div className="options">{step.options?.map((option) => <button key={option} className={picked.includes(option) ? "option active" : "option"} onClick={() => select(option)}><span>{option}</span><b>{picked.includes(option) ? "✓" : ""}</b></button>)}</div>}
      {step.kind === "input" && <label className="field"><input value={name} onChange={(e) => setName(e.target.value)} placeholder={step.field} autoFocus /><span>✦</span></label>}
      {step.kind === "voice" && <button className="listen" onClick={next}>Tap to start speaking <span>●</span></button>}
      {step.kind === "loader" && <p className="loader-line">Tailoring Maya’s approach for you <span>✦</span></p>}
      {step.kind === "plan" && <div className="plan-actions"><div className="result-pill"><span>Today</span><b>Speak with Maya</b><em>5 min</em></div></div>}
    </div>
    {!["voice", "loader"].includes(step.kind) && <footer><div className="review"><div className="stars">★★★★★</div><p>{review}</p></div><button className="primary" disabled={isNextDisabled} onClick={next}>{step.kind === "plan" ? "Start my first conversation" : index === 0 ? "Get started" : "Continue"}<span>→</span></button></footer>}
  </section></main>;
}

function Maya() { return <div className="maya-wrap"><div className="maya-glow" /><div className="maya"><div className="hair" /><div className="face"><i /><i /></div><div className="shirt" /></div><span className="sparkle s1">✦</span><span className="sparkle s2">✧</span></div>; }
function VoiceOrb() { return <div className="voice-wrap"><div className="voice-ring r3" /><div className="voice-ring r2" /><div className="voice-ring r1" /><div className="voice-core">✦</div><div className="wave"><i/><i/><i/><i/><i/><i/><i/></div></div>; }
function Loader() { return <div className="loader"><div className="loader-orb"><span>✦</span></div><div className="loader-track"><i/><i/><i/><i/></div></div>; }
function PlanPreview() { return <div className="week-card"><div><span>YOUR CONFIDENCE</span><b>is ready to grow</b></div><div className="chart"><i/><i/><i/><i/><strong>Today</strong><em>One week</em></div></div>; }
function Home({ onRestart }: { onRestart: () => void }) { return <main className="stage"><section className="phone-shell home"><div className="ambient ambient-one"/><header><div className="brand">bravel</div><button className="avatar">M</button></header><div className="home-copy"><p className="eyebrow">YOUR DAILY PRACTICE</p><h1>Good morning,<br/><em>friend.</em></h1><p>One small conversation today can make tomorrow feel easier.</p></div><div className="maya-home"><Maya /></div><section className="today-card"><p>UP NEXT</p><h2>Call the doctor<br/>with confidence</h2><div><span>5 min with Maya</span><button>Start <b>→</b></button></div></section><section className="streak"><div><span>YOUR STREAK</span><b>1 day <em>✦</em></b></div><div className="days"><i className="done">M</i><i>T</i><i>W</i><i>T</i><i>F</i><i>S</i><i>S</i></div></section><button className="restart" onClick={onRestart}>Preview onboarding again</button></section></main>; }
