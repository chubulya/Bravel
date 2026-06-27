"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

// Figma design assets (valid for 7 days from Jun 26 2026)
const imgEllipse1  = "https://www.figma.com/api/mcp/asset/cef50e53-50e6-4bba-a050-dd0b0dfe3e8b";
const imgEllipse2  = "https://www.figma.com/api/mcp/asset/8341bab9-0e31-4dc1-8548-9dd3a53c2f78";
const imgEllipse3  = "https://www.figma.com/api/mcp/asset/ea2298ae-f890-46f6-b274-db17fa7c5cce";
const imgEllipse4  = "https://www.figma.com/api/mcp/asset/224f92cc-a7f0-4059-aeb3-e934c431c7e9";
const imgEllipse5  = "https://www.figma.com/api/mcp/asset/9e4d4ed4-64be-42c8-807b-7946186ed5e7";
const imgEllipse6  = "https://www.figma.com/api/mcp/asset/628d9391-acdb-4607-bd31-265bdbbcb93c";
const imgEllipse7  = "https://www.figma.com/api/mcp/asset/29b3b4d5-49cb-498e-ad2e-1cdb8fa6707b";
const imgEllipse8  = "https://www.figma.com/api/mcp/asset/6ec0fdd8-129b-4361-afac-a9c1f30a6063";
const imgEllipse9  = "https://www.figma.com/api/mcp/asset/04e24133-bbe6-4327-8c1f-9f7752d0ca7b";
const imgEllipse10 = "https://www.figma.com/api/mcp/asset/bae6611e-bf8e-49e6-a077-6fe24b3ddca3";
const imgMaya      = "https://www.figma.com/api/mcp/asset/4f0a9491-8d2e-40ee-b5d3-d1170725dd1a";
const imgMayaMask  = "https://www.figma.com/api/mcp/asset/fe899d1a-ae0a-42dd-b433-edcfe902559f";
const imgSticker1  = "https://www.figma.com/api/mcp/asset/95e384e8-0ab2-4520-a33d-6bd82aa6101e";
const imgFood1     = "https://www.figma.com/api/mcp/asset/16e3d9b8-5b56-4d05-ae10-1fca487adc63";
const imgFood2     = "https://www.figma.com/api/mcp/asset/aab14b20-d2ca-4d55-a9a4-4b81e7905e69";
const imgPersonMask= "https://www.figma.com/api/mcp/asset/ff10ec46-3c44-4257-a354-c7df76cedb38";
const imgPerson1   = "https://www.figma.com/api/mcp/asset/acbbac20-25bb-4453-b6e1-4a8a1c60efa6";
const imgPerson2   = "https://www.figma.com/api/mcp/asset/4ff8f5a9-ad47-411b-a5a9-053058f900e9";
const imgBlob      = "https://www.figma.com/api/mcp/asset/4162e53c-5a48-4eac-99e9-e151e2af05be";
const imgUnion     = "https://www.figma.com/api/mcp/asset/e275421a-3c0c-4f97-aa47-05691fe4eeee";
const imgAiIcon    = "https://www.figma.com/api/mcp/asset/7e1abbc1-e09b-40f0-b72c-0044d1cecb90";
const imgAiIcon2   = "https://www.figma.com/api/mcp/asset/47f2d5fd-688e-481f-b15d-78c763d8dd75";
const imgStars     = "https://www.figma.com/api/mcp/asset/542d0f57-f847-40ff-b0de-3538104cb2b5";
const imgAudioPlay = "https://www.figma.com/api/mcp/asset/56b555d5-c9cf-4351-a477-943406f2bb1e";
const imgLaurel1   = "https://www.figma.com/api/mcp/asset/6b2118e8-e84e-4859-8922-810dc5f14334";
const imgLaurel2   = "https://www.figma.com/api/mcp/asset/64c77a47-744a-4fec-8258-13088273cfb9";
const imgWaveform  = "https://www.figma.com/api/mcp/asset/c6b9a8f6-0149-4a36-86c8-0a437432b868";
const figmaReviewAvatar = "https://www.figma.com/api/mcp/asset/382b8c60-1e04-4b75-8e9e-1cec6b4ccd62";
const imgMayaRoomAvatar = "https://www.figma.com/api/mcp/asset/8324b3fc-e956-431c-80dc-36c89c0809b7";

type Opt = { icon?: string; label: string };
type Step = {
  kind: "hook" | "breakout" | "summary" | "choice" | "input" | "voice" | "loader" | "plan" | "home";
  title: string;
  copy?: string;
  options?: Opt[];
  searchable?: boolean;
  multi?: boolean;
  field?: string;
  inputType?: "text" | "email" | "password";
  cta?: string;
  image?: string;
};

const steps: Step[] = [
  { kind: "hook", title: "Understanding English is easy. Speaking it isn’t.", copy: "If the words freeze when it matters, embark on a journey to start speaking confidently." },
  { kind: "choice", title: "Why are you learning English?", copy: "We’ll consider your choices for building your personal plan.", multi: true, options: [
    { icon: "💼", label: "Work" }, { icon: "✈️", label: "Travel" }, { icon: "🎓", label: "Studying abroad" },
    { icon: "👥", label: "Make friends" }, { icon: "👋", label: "Daily life" }, { icon: "👑", label: "Confidence" },
  ] },
  { kind: "choice", title: "What language feels most like home?", copy: "Maya will explain things using references that click for you.", searchable: true, options: [
    { label: "Spanish" }, { label: "Portuguese" }, { label: "Ukrainian" }, { label: "Mandarin" },
    { label: "Arabic" }, { label: "Hindi" }, { label: "French" }, { label: "Korean" },
    { label: "Russian" }, { label: "Vietnamese" }, { label: "Turkish" }, { label: "Another language" },
  ] },
  { kind: "choice", title: "Which conversations matter most?", copy: "Pick as many as you like — we’ll rehearse these together.", multi: true, options: [
    { icon: "📞", label: "Calling the doctor" }, { icon: "🎓", label: "Talking with a teacher" }, { icon: "💼", label: "A job interview" },
    { icon: "👋", label: "Small talk with neighbors" }, { icon: "🎤", label: "Speaking up at work" },
  ] },
  { kind: "choice", title: "What would you say is your English level?", copy: "Choose the level that feels closest today.", options: [
    { label: "I barely understand English and can’t speak it yet" },
    { label: "I understand a little, but I can’t speak confidently" },
    { label: "I can have simple conversations, but I often get stuck" },
    { label: "I can speak, but I want to sound more natural" },
    { label: "I speak comfortably and want more nuance" },
  ] },
  { kind: "summary", title: "You’re one step closer to being confident in English.", copy: "We’ve got your starting point — now let’s make the plan feel truly yours." },
  { kind: "input", title: "What is your name?", copy: "That’s the name Maya will be addressing you with.", field: "Your first name" },
  { kind: "choice", title: "What is your gender?", copy: "This helps Maya personalise your experience.", options: [
    { label: "Female" }, { label: "Male" }, { label: "Non-binary" }, { label: "Prefer not to say" },
  ] },
  { kind: "choice", title: "What is your age?", copy: "We’ll use this only to make your practice feel more relevant.", options: [
    { label: "Under 18" }, { label: "18–24" }, { label: "25–34" }, { label: "35–44" }, { label: "45–55+" },
  ] },
  { kind: "choice", title: "How long have you been living in the U.S.?", copy: "This helps Maya keep practice relevant to your daily life.", options: [
    { label: "I’m about to move to the U.S." }, { label: "Less than a year" }, { label: "1–3 years" },
    { label: "4–10 years" }, { label: "More than 10 years" },
  ] },
  { kind: "breakout", title: "Let’s prepare a personal plan for you", copy: "We’ll shape your first units around the topics that matter most.", image: "/breakout-cards.png" },
  { kind: "choice", title: "How much time can you give most days?", copy: "Small, steady practice is what builds confidence.", options: [
    { label: "5 minutes" }, { label: "10 minutes" }, { label: "15 minutes" }, { label: "20+ minutes" },
  ] },
  { kind: "choice", title: "What time of day do you prefer to study?", copy: "Maya will make practice fit naturally into your routine.", options: [
    { label: "Morning" }, { label: "Afternoon" }, { label: "Evening" }, { label: "It changes day to day" },
  ] },
  { kind: "choice", title: "What should Maya focus on most?", copy: "Pick up to three areas you want to strengthen.", multi: true, options: [
    { label: "Accent and pronunciation" }, { label: "Grammar" }, { label: "Natural phrasing" }, { label: "Vocabulary depth" }, { label: "Speaking confidence" },
  ] },
  { kind: "choice", title: "How quickly do you want to achieve results?", copy: "We’ll set a pace that feels motivating and realistic.", options: [
    { label: "Within a week" }, { label: "Within a month" }, { label: "Within three months" }, { label: "Over the next year" },
  ] },
  { kind: "breakout", title: "Meet Maya. She’s ready for every level and goal.", copy: "You’re all set — now say hello and start your first conversation together.", image: "/breakout-maya.png" },
  { kind: "voice", title: "Say one sentence with Maya.", copy: `Try: “Hi Maya, I’m ready to speak with confidence.” No score — just a friendly first hello.` },
  { kind: "loader", title: "Building a plan around your life…", copy: "Maya is choosing the first conversations that will make the biggest difference." },
  { kind: "input", title: "To see your personal plan, enter your email address.", copy: "Your plan will be waiting whenever you come back.", field: "Email address", inputType: "email" },
  { kind: "input", title: "Create a strong password", copy: "Use it to securely access your personal plan anytime.", field: "Password", inputType: "password" },
  { kind: "plan", title: "You’re closer than you think.", copy: "Your personal path starts with the conversations you want most.", cta: "Start my first conversation" },
  { kind: "home", title: "Good morning, friend." },
];

export default function Page() {
  const [showWelcome, setShowWelcome] = useState(true);
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);
  const [name, setName] = useState("");
  const [languageQuery, setLanguageQuery] = useState("");
  const [answers, setAnswers] = useState<Record<string, string[]>>({});

  const step = steps[index];
  // Progress applies to the question phase (after the hook, before home).
  const QUESTION_START = 1;
  const QUESTION_END = steps.length - 2; // last index before home
  const questionFrac = Math.min(1, Math.max(0, (index - QUESTION_START + 1) / (QUESTION_END - QUESTION_START + 1)));
  const showProgress = step.kind !== "hook" && step.kind !== "home" && step.kind !== "plan";
  const isNextDisabled =
    (step.kind === "choice" && !picked.length) ||
    (step.kind === "input" && !name.trim());

  useEffect(() => {
    if (step.kind !== "loader") return;
    const t = window.setTimeout(() => setIndex((i) => Math.min(i + 1, steps.length - 1)), 2400);
    return () => window.clearTimeout(t);
  }, [step.kind]);

  const next = (selection = picked) => {
    if (step.kind === "choice" && selection.length) setAnswers((current) => ({ ...current, [step.title]: selection }));
    setPicked([]); setName(""); setLanguageQuery(""); setIndex((i) => Math.min(i + 1, steps.length - 1));
  };
  const back = () => { if (index === 0) setShowWelcome(true); else setIndex((i) => Math.max(0, i - 1)); };
  const select = (label: string) => {
    if (step.multi) {
      setPicked((items) => items.includes(label) ? items.filter((x) => x !== label) : [...items, label].slice(-3));
    } else {
      setPicked([label]);
      setTimeout(() => next([label]), 280);
    }
  };

  const visibleOptions = step.searchable
    ? step.options?.filter((opt) => opt.label.toLowerCase().includes(languageQuery.trim().toLowerCase()))
    : step.options;

  if (showWelcome) return <Welcome onStart={() => setShowWelcome(false)} />;
  if (step.kind === "home") return <Home onRestart={() => { setShowWelcome(true); setIndex(0); setAnswers({}); }} />;

  // Single-choice steps advance on tap, so no Continue button is needed.
  const hideCta = step.kind === "voice" || step.kind === "loader" || step.kind === "plan" || (step.kind === "choice" && !step.multi);

  return (
    <main className="stage">
      <section className={`phone-shell funnel${step.kind === "breakout" || step.kind === "summary" || step.kind === "plan" ? " funnel-breakout" : ""}${step.kind === "voice" ? " funnel-voice" : ""}${step.kind === "plan" ? " funnel-plan" : ""}`}>
        {(step.kind === "breakout" || step.kind === "summary" || step.kind === "plan" || step.kind === "voice") && <img src="/breakout-gradient.png" alt="" className="f-breakout-screenbg" />}
        <header className="f-header">
          <button aria-label="Go back" className="f-back" onClick={back}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="#1e1e1e" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
          <div className="brand">bravel</div>
          {step.kind === "voice" ? (
            <button className="f-skip" onClick={() => next()}>Skip</button>
          ) : (
            <span className="f-header-spacer" />
          )}
        </header>

        {showProgress && (
          <div className="f-progress" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(questionFrac * 100)}>
            {[0, 1, 2, 3].map((seg) => (
              <span key={seg} className="f-seg">
                <i style={{ width: `${Math.min(1, Math.max(0, questionFrac * 4 - seg)) * 100}%` }} />
              </span>
            ))}
          </div>
        )}

        <div className={`f-content${hideCta ? " f-content-tall" : ""}${step.kind === "breakout" ? " f-content-breakout" : ""}${step.kind === "summary" ? " f-content-summary" : ""}${step.kind === "plan" ? " f-content-plan" : ""}${step.kind === "hook" ? " f-content-hook" : ""}${step.kind === "voice" ? " f-content-voice" : ""}`}>
          {step.kind === "breakout" ? (
            <div className="f-breakout">
              <div className={`f-breakout-img ${step.image?.includes("maya") ? "is-maya" : "is-cards"}`}>
                <img src={step.image} alt="" />
              </div>
              <div className="f-copy f-breakout-copy">
                <h1 className="f-title">{step.title}</h1>
                {step.copy && <p className="f-sub">{step.copy}</p>}
              </div>
            </div>
          ) : step.kind === "summary" ? (
            <ProfileSummary answers={answers} title={step.title} copy={step.copy ?? ""} />
          ) : step.kind === "voice" ? (
            <VoiceConversation onDone={() => next()} />
          ) : step.kind === "plan" ? (
            <PlanPreview answers={answers} onStart={() => next()} />
          ) : (
            <div className="f-copy">
              <h1 className={step.kind === "hook" ? "f-title f-title-lg" : "f-title"}>{step.title}</h1>
              {step.copy && <p className="f-sub">{step.copy}</p>}
            </div>
          )}

          {step.kind === "hook" && (
            <div className="f-hook">
              <RatingContainer />
              <ReviewCarousel autoPlay showControls={false} />
            </div>
          )}

          {step.kind === "choice" && (
            <div className={step.searchable ? "f-options f-language-options" : "f-options"}>
              {step.searchable && (
                <label className="f-language-search">
                  <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8"/><path d="m16 16 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
                  <input
                    value={languageQuery}
                    onChange={(e) => setLanguageQuery(e.target.value)}
                    placeholder="Search for a language"
                    aria-label="Search for a language"
                    autoFocus
                  />
                </label>
              )}
              {visibleOptions?.map((opt) => {
                const on = picked.includes(opt.label);
                return (
                  <button key={opt.label} className={on ? "f-option on" : "f-option"} onClick={() => select(opt.label)}>
                    {opt.icon && <span className="f-option-icon">{opt.icon}</span>}
                    <span className="f-option-label">{opt.label}</span>
                    <span className={on ? "f-check on" : "f-check"}>
                      {on && <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </span>
                  </button>
                );
              })}
              {step.searchable && !visibleOptions?.length && <p className="f-language-empty">No language found. Try another search.</p>}
            </div>
          )}

          {step.kind === "input" && (
            <label className="f-field">
              <input type={step.inputType ?? "text"} value={name} onChange={(e) => setName(e.target.value)} placeholder={step.field} autoFocus />
            </label>
          )}

          {step.kind === "loader" && <Loader />}

        </div>

        {!hideCta && (
          <div className="f-footer">
            <button className="f-cta" disabled={isNextDisabled} onClick={() => next()}>
              {step.cta ?? "Continue"}
            </button>
            {step.kind === "hook" && (
              <p className="f-login">Have an account? <a href="#" onClick={(e) => e.preventDefault()}>Log In</a></p>
            )}
          </div>
        )}
      </section>
    </main>
  );
}

function Welcome({ onStart }: { onStart: () => void }) {
  return (
    <main className="stage">
      <section className="phone-shell w-shell">
        <div className="w-scroll">
          {/* ── HERO ── */}
          <div className="w-hero">
            <img src="/hero-bg.png" alt="" className="w-hero-bg" />

            <div className="w-hero-logo">bravel</div>

            {/* Maya — softly masked so she fades into the gradient */}
            <div className="w-hero-maya">
              <img src="/maya-hero.png" alt="Maya, your AI English tutor" />
            </div>

            {/* Floating 3D stickers */}
            <img src="/sticker-19.png" alt="" className="w-st w-st-grad" />
            <img src="/sticker-16.png" alt="" className="w-st w-st-coffee" />
            <img src="/sticker-23.png" alt="" className="w-st w-st-plane" />
            <img src="/sticker-15.png" alt="" className="w-st w-st-bag" />

            {/* Speech bubble */}
            <div className="w-hero-bubble">
              <img src="/hero-bubble.svg" alt="" className="w-hero-bubble-bg" />
              <div className="w-hero-bubble-in">
                <div className="w-maya-badge">
                  <img src={imgAiIcon} alt="" width="12" height="12" />
                  <span>Maya, AI English Tutor</span>
                </div>
                <h1 className="w-headline">You understand English but can’t speak with confidence?</h1>
              </div>
            </div>
          </div>

          {/* ── SOCIAL PROOF ── */}
          <div className="w-social">
            <p className="w-social-copy">More than 5M learners are using Bravel to enhance their speaking skills.</p>
            <RatingContainer />
          </div>

          {/* ── TESTIMONIAL ── */}
          <div className="w-section w-reviews" style={{ padding: "0 24px" }}>
            <ReviewCarousel />
          </div>

          {/* ── HOW IT WORKS ── */}
          <div className="w-section w-how">
            {/* People photos */}
            <div className="w-people">
              <img src="/mascots.png" alt="Three learners practising with Maya" className="w-people-img" />
            </div>

            <h2 className="w-section-title">How it works?</h2>
            <p className="w-section-copy">Tap to start, talk naturally, and get gentle corrections Maya will remember for next time.</p>

            {/* Voice chat mockup */}
            <div className="w-chat">
              <VoiceChatRow
                side="user"
                avatarSrc={imgEllipse10}
                name="You"
                role="Student"
              />
              <VoiceChatRow
                side="maya"
                avatarSrc={imgEllipse8}
                name="Maya"
                role="AI English Tutor"
                reply="Good job with articles this time!"
              />
            </div>
          </div>

          {/* ── BOTTOM: one shared gradient behind Built-for-real-life + pills + CTA + button ── */}
          <div className="w-bottom">
            <img src="/bottom-gradient.png" alt="" className="w-bottom-bg" />

            {/* Built for real life */}
            <div className="w-section w-built">
              <h2 className="w-section-title">Built for real life</h2>
              <p className="w-section-copy" style={{ marginBottom:24 }}>Not just lessons.</p>
              <div className="w-features">
                <FeatureCard label="Maya listens and remembers" imgSrc="/feature-brain.png" imgSide="right" tilt={15} />
                <FeatureCard label="Lessons tailored to match your level" lines={["Lessons tailored", "to match your level"]} imgSrc="/feature-apple.png" imgSide="left" tilt={-15} />
                <FeatureCard label="Up to 100 roleplay games" imgSrc="/feature-face.png" imgSide="right" tilt={-15} />
              </div>
            </div>

            {/* Topic pills */}
            <div className="w-pills">
              <div className="w-pills-row">
                <Pill label="Phone Call" icon="/ic-phone.png" tilt={-60} tint="#3c7714" />
                <Pill label="Job Interview" icon="/ic-briefcase.png" tilt={-15} tint="#775e14" />
                <Pill label="Phone Call" icon="/ic-phone.png" tilt={-60} tint="#3c7714" />
              </div>
              <div className="w-pills-row">
                <Pill label="Doctor Visit" icon="/ic-doctor.png" tilt={15} tint="#141b77" />
                <Pill label="Apartment Tour" icon="/ic-bag.png" tilt={-15} tint="#c6a72a" />
              </div>
            </div>

            {/* Final CTA copy */}
            <div className="w-cta-section">
              <span className="w-logo w-cta-logo">bravel</span>
              <h2 className="w-cta-title">Start speaking today</h2>
              <p className="w-cta-body">And become your better english-speaking self in one week!</p>
            </div>
          </div>

          {/* Get Started — sticky to the bottom while scrolling */}
          <div className="w-btn-wrap">
            <button className="primary" onClick={onStart}>Get Started</button>
          </div>
        </div>
      </section>
    </main>
  );
}

function RatingContainer() {
  return (
    <div className="rating">
      <img src="/rating-container.svg" alt="Rated 4.6 out of 5" className="rating-img" />
      <span className="rating-count">(4.6, 15K Reviews)</span>
    </div>
  );
}

const reviews = [
  { name: "Mario, 24", location: "British Columbia", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80", portrait: false, title: "To be honest I was a bit skeptical...", body: "I was initially skeptical but it exceeded my expectations! The lessons were engaging and tailored to my needs. I couldn't be happier with my progress!" },
  { name: "Amina, 31", location: "New Jersey", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=160&h=160&q=80", portrait: false, title: "I finally speak up at work.", body: "The short conversations feel like real life. Maya helps me find the words without making me feel embarrassed." },
  { name: "Sofia, 28", location: "California", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80", portrait: false, title: "It feels like practice made for me.", body: "I used my first lesson before calling my doctor. I felt calmer, clearer, and ready to talk." },
];

function ReviewCarousel({ autoPlay = false, showControls = true }: { autoPlay?: boolean; showControls?: boolean }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (!autoPlay) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % reviews.length), 5000);
    return () => window.clearInterval(timer);
  }, [autoPlay]);

  return (
    <div className="w-review-carousel" aria-label="Learner reviews">
      <div className="w-review-viewport">
        <div className="w-review-track" style={{ marginLeft: `-${active * 354}px` }}>
          {reviews.map((review) => <ReviewCard key={review.name} {...review} />)}
        </div>
      </div>
      {showControls && (
        <div className="w-review-nav" aria-label="Review navigation">
          <button onClick={() => setActive((current) => (current - 1 + reviews.length) % reviews.length)} aria-label="Previous review"><Chevron direction="left" /></button>
          <button onClick={() => setActive((current) => (current + 1) % reviews.length)} aria-label="Next review"><Chevron direction="right" /></button>
        </div>
      )}
    </div>
  );
}

function Chevron({ direction }: { direction: "left" | "right" }) {
  return <svg aria-hidden="true" width="16" height="16" viewBox="0 0 16 16" fill="none"><path d={direction === "left" ? "M9.5 3 4.5 8l5 5" : "m6.5 3 5 5-5 5"} stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>;
}

function ReviewCard({ name, location, avatar, portrait, title, body }: typeof reviews[number]) {
  return (
    <div className="w-card">
      <div className="w-card-user">
        <span className="w-avatar"><img src={avatar} alt="" className={portrait ? "w-avatar-image w-avatar-portrait" : "w-avatar-image w-avatar-unsplash"} /></span>
        <div>
          <p className="w-user-name">{name}</p>
          <p className="w-user-location">{location}</p>
        </div>
      </div>
      <div className="w-card-copy">
        <p className="w-card-title">{title}</p>
        <p className="w-card-body">{body}</p>
      </div>
    </div>
  );
}

function ProfileSummary({ answers, title, copy }: { answers: Record<string, string[]>; title: string; copy: string }) {
  const first = (question: string, fallback: string) => answers[question]?.[0] ?? fallback;
  const goal = first("Why are you learning English?", "Work");
  const goalMeta = goal === "Travel" ? { icon: "✈️", value: "Travel" }
    : goal === "Studying abroad" ? { icon: "🎓", value: "Study" }
    : goal === "Make friends" ? { icon: "👥", value: "Friends" }
    : goal === "Daily life" ? { icon: "👋", value: "Daily life" }
    : goal === "Confidence" ? { icon: "👑", value: "Confidence" }
    : { icon: "💼", value: "Work" };
  const level = first("What would you say is your English level?", "I understand a little, but I can’t speak confidently");
  const levelMeta = level.startsWith("I barely") ? { icon: "🧊", value: "Just starting" }
    : level.startsWith("I understand") ? { icon: "💬", value: "Building confidence" }
    : level.startsWith("I can have") ? { icon: "🍎", value: "Getting conversational" }
    : level.startsWith("I can speak") ? { icon: "✨", value: "Polishing fluency" }
    : { icon: "🚀", value: "Refining nuance" };
  const summary = [
    { icon: "🌐", label: "Native language", value: first("What language feels most like home?", "Your language") },
    { icon: goalMeta.icon, label: "Your goal", value: goalMeta.value },
    { icon: levelMeta.icon, label: "Starting point", value: levelMeta.value },
    { icon: "💬", label: "First scenario", value: first("Which conversations matter most?", "Real-life talk") },
  ];

  return (
    <div className="f-summary">
      <div className="f-summary-card">
        {summary.map((item, index) => (
          <div className="f-summary-item" key={item.label}>
            <span className="f-summary-icon">{item.icon}</span>
            <span className="f-summary-label">{item.label}</span>
            <strong className="f-summary-value">{item.value}</strong>
            {index % 2 === 0 && <span className="f-summary-divider" />}
          </div>
        ))}
      </div>
      <div className="f-summary-copy">
        <h1>{title}</h1>
        <p>{copy}</p>
      </div>
    </div>
  );
}

function VoiceChatRow({ side, avatarSrc, name, role, reply }: {
  side: "user" | "maya"; avatarSrc: string; name: string; role: string; reply?: string;
}) {
  const isMaya = side === "maya";
  return (
    <div className={`w-chat-row ${isMaya ? "w-chat-maya" : "w-chat-user"}`}>
      <div className={`w-chat-meta ${isMaya ? "w-chat-meta-right" : ""}`}>
        {!isMaya && <span className="w-chat-avatar"><img src={avatarSrc} alt="" /></span>}
        <div className={isMaya ? "w-chat-labels w-chat-labels-right" : "w-chat-labels"}>
          <span className="w-chat-name" style={isMaya ? { color:"#9744db" } : {}}>{isMaya && <img src={imgAiIcon} alt="" className="w-chat-ai-icon" />}{name}</span>
          <span className="w-chat-role">{role}</span>
        </div>
        {isMaya && <span className="w-chat-avatar"><img src={avatarSrc} alt="" /></span>}
      </div>
      <div className={`w-voice-bubble ${isMaya ? "w-bubble-maya" : "w-bubble-user"}`}>
        <div className="w-audio-row">
          <img src={imgAudioPlay} alt="" width="32" height="32" />
          <div className="w-waveform">
            <img src={isMaya ? "/waveform-maya.png" : "/waveform-user.png"} alt="" style={{ width:"100%", height:"100%", objectFit:"fill" }} />
          </div>
          <span className="w-voice-time">{isMaya ? "0:45" : "5:45"}</span>
        </div>
        {reply && <p className="w-maya-reply">{reply}</p>}
      </div>
    </div>
  );
}

function FeatureCard({ label, lines, imgSrc, imgSide, tilt = 0 }: { label: string; lines?: [string, string]; imgSrc: string; imgSide: "left" | "right"; tilt?: number }) {
  return (
    <div className="w-feature-card">
      {imgSide === "left" && (
        <div className="w-feature-img w-feature-img-left">
          <img src={imgSrc} alt="" style={{ transform: `rotate(${tilt}deg)` }} />
        </div>
      )}
      <span className="w-feature-label">{lines ? <>{lines[0]}<br />{lines[1]}</> : label}</span>
      {imgSide === "right" && (
        <div className="w-feature-img w-feature-img-right">
          <img src={imgSrc} alt="" style={{ transform: `rotate(${tilt}deg)` }} />
        </div>
      )}
    </div>
  );
}

function Pill({ label, icon, tilt = 0, tint }: { label: string; icon: string; tilt?: number; tint: string }) {
  return (
    <span className="w-pill" style={{ "--pill-tint": tint } as CSSProperties}>
      <span className="w-pill-label">{label}</span>
      <img src={icon} alt="" className="w-pill-icon" style={{ transform: `rotate(${tilt}deg)` }} />
    </span>
  );
}

/* ── Maya voice-assessment dialogue ── */
const MAYA_QUESTIONS = [
  "Hi! I’m Maya, your tutor. Let’s do a quick level check — there are no wrong answers. To start, where are you from, and what brings you to English?",
  "Lovely. Tell me a little about a normal day for you.",
  "Nice. What do you enjoy doing in your free time?",
  "Great. Describe a place you would really love to visit, and why.",
  "Last one — what is a goal you would like to reach in the next year?",
];
const MAYA_REACTIONS = [
  "Thanks for sharing that!",
  "Got it — that is really helpful.",
  "Lovely, I can already hear your confidence.",
  "Nice, you are doing great.",
];
const MAYA_CLOSING = "Perfect — that is everything I need. I have a good sense of your English now. Let’s build your plan!";

type ConvPhase = "intro" | "speaking" | "prompt" | "listening" | "thinking" | "done";

type ChatMsg = { who: "maya" | "you"; text: string };

function VoiceConversation({ onDone }: { onDone: () => void }) {
  const [phase, setPhase] = useState<ConvPhase>("intro");
  const [qIndex, setQIndex] = useState(0);
  const [messages, setMessages] = useState<ChatMsg[]>([]);
  const [liveText, setLiveText] = useState("");
  const [micError, setMicError] = useState("");

  const logRef = useRef<HTMLDivElement | null>(null);
  const phaseRef = useRef<ConvPhase>("intro");
  const qIndexRef = useRef(0);
  const advancingRef = useRef(false);
  const holdingRef = useRef(false);
  const recogRef = useRef<{ stop: () => void } | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const finalRef = useRef("");
  const voiceRef = useRef<SpeechSynthesisVoice | null>(null);

  const setPhaseBoth = (p: ConvPhase) => { phaseRef.current = p; setPhase(p); };

  // Pick a pleasant English voice for Maya
  useEffect(() => {
    const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
    if (!synth) return;
    const pick = () => {
      const vs = synth.getVoices();
      voiceRef.current =
        vs.find((v) => /en[-_]?US/i.test(v.lang) && /female|samantha|victoria|karen|moira|tessa|zira|aria|jenny/i.test(v.name)) ||
        vs.find((v) => /en[-_]?GB|en[-_]?US/i.test(v.lang)) ||
        vs.find((v) => /^en/i.test(v.lang)) ||
        vs[0] || null;
    };
    pick();
    synth.addEventListener?.("voiceschanged", pick);
    return () => {
      synth.removeEventListener?.("voiceschanged", pick);
      try { synth.cancel(); } catch {}
    };
  }, []);

  const speak = (text: string) =>
    new Promise<void>((resolve) => {
      const synth = typeof window !== "undefined" ? window.speechSynthesis : undefined;
      if (!synth) { window.setTimeout(resolve, 900); return; }
      synth.cancel();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = "en-US"; u.rate = 1; u.pitch = 1.05;
      if (voiceRef.current) u.voice = voiceRef.current;
      u.onend = () => resolve();
      u.onerror = () => resolve();
      synth.speak(u);
    });

  const addMsg = (msg: ChatMsg) => setMessages((m) => [...m, msg]);

  // Scroll the chat to the newest message
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: "smooth" });
  }, [messages, phase]);

  const askQuestion = async (i: number) => {
    qIndexRef.current = i;
    setQIndex(i);
    setLiveText("");
    setMicError("");
    finalRef.current = "";
    const line = i === 0 ? MAYA_QUESTIONS[0] : `${MAYA_REACTIONS[(i - 1) % MAYA_REACTIONS.length]} ${MAYA_QUESTIONS[i]}`;
    addMsg({ who: "maya", text: line });
    setPhaseBoth("speaking");
    await speak(line);
    if (phaseRef.current === "speaking") setPhaseBoth("prompt");
  };

  const startConversation = async () => {
    setMicError("");
    await askQuestion(0);
  };

  const startListening = async () => {
    if (phaseRef.current !== "prompt") return;
    holdingRef.current = true;
    setMicError("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];
      const rec = new MediaRecorder(stream);
      rec.ondataavailable = (e) => { if (e.data.size) chunksRef.current.push(e.data); };
      rec.start();
      recorderRef.current = rec;

      const SR = (window as unknown as { SpeechRecognition?: new () => unknown; webkitSpeechRecognition?: new () => unknown });
      const Ctor = SR.SpeechRecognition || SR.webkitSpeechRecognition;
      if (Ctor) {
        const r = new Ctor() as {
          lang: string; interimResults: boolean; continuous: boolean;
          onresult: (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => void;
          start: () => void; stop: () => void;
        };
        r.lang = "en-US"; r.interimResults = true; r.continuous = true;
        r.onresult = (e) => {
          let txt = "";
          for (let i = 0; i < e.results.length; i++) txt += e.results[i][0].transcript;
          finalRef.current = txt;
          setLiveText(txt);
        };
        r.start();
        recogRef.current = r;
      }

      // If the user already let go before permission resolved, stop immediately.
      if (!holdingRef.current) { stopListening(); return; }
      setPhaseBoth("listening");
    } catch {
      holdingRef.current = false;
      setMicError("I need mic access to hear you. Allow it in your browser, or tap Skip up top.");
    }
  };

  const stopListening = () => {
    holdingRef.current = false;
    if (phaseRef.current !== "listening") {
      // clean up any half-started capture
      try { recorderRef.current?.stop(); } catch {}
      try { recogRef.current?.stop(); } catch {}
      streamRef.current?.getTracks().forEach((t) => t.stop());
      return;
    }
    try { recorderRef.current?.stop(); } catch {}
    try { recogRef.current?.stop(); } catch {}
    streamRef.current?.getTracks().forEach((t) => t.stop());
    // Record the learner's answer in the chat
    addMsg({ who: "you", text: finalRef.current.trim() || "🎙️ Answer recorded" });
    setLiveText("");

    if (advancingRef.current) return;
    advancingRef.current = true;
    setPhaseBoth("thinking");

    window.setTimeout(async () => {
      const current = qIndexRef.current;
      const isLast = current >= MAYA_QUESTIONS.length - 1;
      if (isLast) {
        addMsg({ who: "maya", text: MAYA_CLOSING });
        setPhaseBoth("speaking");
        await speak(MAYA_CLOSING);
        setPhaseBoth("done");
        advancingRef.current = false;
      } else {
        await askQuestion(current + 1);
        advancingRef.current = false;
      }
    }, 650);
  };

  const status =
    phase === "speaking" ? "Wait, Maya’s talking…" :
    phase === "listening" ? "Talk, Maya’s listening…" :
    phase === "thinking" ? "Maya’s thinking…" :
    "Hold the mic button and talk";

  // ── Intro screen ──
  if (phase === "intro") {
    return (
      <div className="f-voice2 f-voice2-intro">
        <div className="f-vintro">
          <span className="f-vintro-avatar"><img src={imgMayaRoomAvatar} alt="Maya" /></span>
          <span className="f-vintro-badge"><i /> Maya Has Joined</span>
          <h1 className="f-vintro-title">Let Maya assess the level of your speaking</h1>
          <p className="f-vintro-desc">Answer a few simple questions with your voice — there are no wrong answers.</p>
        </div>
        <div className="f-voice-dock">
          <button className="f-cta" onClick={startConversation}>Join the room</button>
        </div>
      </div>
    );
  }

  // ── Conversation (chat) screen ──
  return (
    <div className="f-voice2">
      <div className="f-chat-log" ref={logRef}>
        {messages.map((m, i) =>
          m.who === "maya" ? (
            <div className="f-msg f-msg-maya" key={i}>
              <div className="f-msg-head">
                <span className="f-msg-avatar"><img src={imgMaya} alt="" /></span>
                <div>
                  <p className="f-msg-name"><img src={imgAiIcon} alt="" /> Maya</p>
                  <p className="f-msg-role">AI English Tutor</p>
                </div>
              </div>
              <p className="f-msg-maya-text">{m.text}</p>
            </div>
          ) : (
            <div className="f-msg f-msg-you" key={i}>
              <div className="f-msg-you-bubble">{m.text}</div>
            </div>
          )
        )}
        {phase === "listening" && liveText && (
          <div className="f-msg f-msg-you"><div className="f-msg-you-bubble is-live">{liveText}</div></div>
        )}
        {micError && <p className="f-voice-error">{micError}</p>}
      </div>

      <div className="f-voice-dock">
        {phase === "done" ? (
          <button className="f-cta f-voice-continue" onClick={onDone}>See my result</button>
        ) : (
          <>
            <button
              className={`f-dock-mic ${phase === "listening" ? "is-active" : ""} ${phase === "speaking" || phase === "thinking" ? "is-busy" : ""}`}
              disabled={phase !== "prompt" && phase !== "listening"}
              onPointerDown={(e) => { e.preventDefault(); startListening(); }}
              onPointerUp={(e) => { e.preventDefault(); stopListening(); }}
              onPointerLeave={() => { if (holdingRef.current) stopListening(); }}
              onPointerCancel={() => { if (holdingRef.current) stopListening(); }}
              aria-label="Hold to answer"
            >
              <span className="f-dock-mic-ring" />
              <MicIcon />
            </button>
            <p className="f-dock-status" aria-live="polite">{status}</p>
          </>
        )}
      </div>
    </div>
  );
}

function MicIcon() {
  return (
    <svg width="34" height="34" viewBox="0 0 34 34" fill="none" aria-hidden="true">
      <path d="M17 21.25c2.35 0 4.25-1.9 4.25-4.25V9.92c0-2.35-1.9-4.25-4.25-4.25s-4.25 1.9-4.25 4.25V17c0 2.35 1.9 4.25 4.25 4.25Z" fill="white"/>
      <path d="M8.5 15.58V17a8.5 8.5 0 0 0 17 0v-1.42M17 25.5v4.25M12.75 29.75h8.5" stroke="white" strokeWidth="2.4" strokeLinecap="round"/>
    </svg>
  );
}

function VoiceOrb() {
  return (
    <div className="voice-wrap">
      <div className="voice-ring r3" /><div className="voice-ring r2" /><div className="voice-ring r1" />
      <div className="voice-core">✦</div>
      <div className="wave"><i/><i/><i/><i/><i/><i/><i/></div>
    </div>
  );
}

function Loader() {
  return (
    <div className="loader">
      <div className="loader-orb"><span>✦</span></div>
      <div className="loader-track"><i/><i/><i/><i/></div>
    </div>
  );
}

const planUnits = [
  {
    title: "Week 1-8: Survival Basics",
    description: "Handle the first everyday conversations without freezing.",
    tint: "brown",
    chips: ["👋 Meeting someone new", "☕ Ordering at a café", "🗺️ Asking for directions", "👨‍👩‍👧‍👦 Talking about family", "🌅 My daily routine", "🔢 Numbers, time, days"],
  },
  {
    title: "Week 8-12: Confidence",
    description: "Practice the higher-stakes moments you actually need.",
    tint: "gold",
    chips: ["💼 Job interview — first round", "🏠 Signing a lease", "🩺 Describing a chronic health issue", "🎒 Parent–teacher conference", "📋 Disputing a bill or charge", "☕ Smalltalk with a coworker", "📅 Booking and rescheduling appointments"],
  },
  {
    title: "Week 12-16: Native-peer register",
    description: "Sound more natural, nuanced, and socially fluent.",
    tint: "blue",
    chips: ["🍷 Witty banter at dinner", "🧠 Nuanced disagreement at a meeting", "🎙️ Telling a story that lands", "🥂 Short impromptu remarks", "📚 Discussing film or literature", "☺️ Navigating US humour", "🔥 Hosting a heated discussion"],
  },
];

function PlanPreview({ answers, onStart }: { answers: Record<string, string[]>; onStart: () => void }) {
  const first = (question: string, fallback: string) => answers[question]?.[0] ?? fallback;
  const timeAnswer = first("How much time can you give most days?", "20+ minutes");
  const periodAnswer = first("How quickly do you want to achieve results?", "Within three months");
  const perDay = timeAnswer === "20+ minutes" ? "20 min" : timeAnswer.replace("minutes", "min");
  const period = periodAnswer === "Within a week" ? "1 week"
    : periodAnswer === "Within a month" ? "1 month"
    : periodAnswer === "Over the next year" ? "1 year"
    : "3 months";

  return (
    <div className="plan-page">
      <div className="plan-hero">
        <h1>Your personal plan<br />is ready</h1>
        <p>Here’s what we suggest based on your quiz results:</p>
      </div>

      <div className="plan-stat-card">
        <div className="plan-stat">
          <span className="plan-stat-icon">📆</span>
          <span className="plan-stat-label">Period</span>
          <strong>{period}</strong>
        </div>
        <span className="plan-stat-divider" />
        <div className="plan-stat">
          <span className="plan-stat-icon">🕝</span>
          <span className="plan-stat-label">Per day</span>
          <strong>{perDay}</strong>
        </div>
      </div>

      <div className="plan-graph-card" aria-label="Confidence growth over time">
        <img src="/plan-graphs.png" alt="" className="plan-graph-img" />
      </div>

      <div className="plan-units">
        {planUnits.map((unit) => (
          <section className={`plan-unit plan-unit-${unit.tint}`} key={unit.title}>
            <div className="plan-unit-overlay" />
            <div className="plan-unit-copy">
              <h2>{unit.title}</h2>
              <p>{unit.description}</p>
            </div>
            <div className="plan-chip-list">
              {unit.chips.slice(0, 4).map((chip) => <span className="plan-chip" key={chip}>{chip}</span>)}
              <span className="plan-chip">+{Math.max(0, 10 - unit.chips.length)} more</span>
            </div>
          </section>
        ))}
      </div>

      <div className="plan-bottom-spacer" />
      <div className="plan-sticky-cta">
        <button className="f-cta" onClick={onStart}>Get Started</button>
      </div>
    </div>
  );
}

function Home({ onRestart }: { onRestart: () => void }) {
  return (
    <main className="stage">
      <section className="phone-shell home">
        <div className="ambient ambient-one"/><div className="ambient ambient-two"/>
        <header><div className="brand">bravel</div><button className="avatar">M</button></header>
        <div className="home-copy">
          <p className="eyebrow">YOUR DAILY PRACTICE</p>
          <h1>Good morning,<br/><em>friend.</em></h1>
          <p>One small conversation today can make tomorrow feel easier.</p>
        </div>
        <div className="maya-home">
          <div className="maya-home-glow" />
          <img src="/maya-hero.png" alt="Maya" className="maya-home-img" />
        </div>
        <section className="today-card">
          <p>UP NEXT</p>
          <h2>Call the doctor<br/>with confidence</h2>
          <div><span>5 min with Maya</span><button>Start <b>→</b></button></div>
        </section>
        <section className="streak">
          <div><span>YOUR STREAK</span><b>1 day <em>✦</em></b></div>
          <div className="days"><i className="done">M</i><i>T</i><i>W</i><i>T</i><i>F</i><i>S</i><i>S</i></div>
        </section>
        <button className="restart" onClick={onRestart}>Preview onboarding again</button>
      </section>
    </main>
  );
}
