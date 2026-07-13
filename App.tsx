import React, { useState, useRef, useEffect } from "react";
import {
  Home, LayoutGrid, MessageSquare, Folder, User, Search, Bell, Sparkles,
  Image as ImageIcon, Type, FileText, Wand2, Hash, Mail, Briefcase, Palette,
  Calendar, TrendingUp, Mic, Paperclip, Send, Plus, Settings, LogOut,
  ChevronRight, ChevronLeft, Check, X, Copy, Trash2, Crown, Zap, ArrowLeft,
  Youtube, Instagram, Linkedin, BarChart3, CreditCard, Eye, EyeOff, Flame,
  Sparkle, RefreshCw, Bookmark, MoreVertical, Twitter, Facebook, Video,
  MessageCircle, ScanLine, Layers, Star
} from "lucide-react";

/* ---------------------------------------------------------
   CREOVA AI — mobile prototype
   Design tokens live in <GlobalStyle/>. Swap AI_PROVIDER logic
   in generateWithAI() for a real backend call — see comment there.
--------------------------------------------------------- */

const TOOLS = [
  { id: "thumb-idea", name: "Thumbnail Idea Generator", cat: "Video", icon: ImageIcon, deep: true },
  { id: "yt-title", name: "YouTube Title Generator", cat: "Video", icon: Youtube, deep: true },
  { id: "ig-caption", name: "Instagram Caption Generator", cat: "Social", icon: Instagram, deep: true },
  { id: "thumb-gen", name: "Thumbnail Generator", cat: "Video", icon: ImageIcon },
  { id: "thumb-analyze", name: "Thumbnail Analyzer", cat: "Video", icon: ScanLine },
  { id: "yt-desc", name: "YouTube Description Generator", cat: "Video", icon: FileText },
  { id: "script", name: "Script Writer", cat: "Video", icon: FileText },
  { id: "hook", name: "Hook Generator", cat: "Video", icon: Flame },
  { id: "video-idea", name: "Video Idea Generator", cat: "Video", icon: Video },
  { id: "linkedin", name: "LinkedIn Post Generator", cat: "Social", icon: Linkedin },
  { id: "blog", name: "Blog Writer", cat: "Writing", icon: FileText },
  { id: "logo-idea", name: "Logo Idea Generator", cat: "Brand", icon: Sparkle },
  { id: "brand-name", name: "Brand Name Generator", cat: "Brand", icon: Star },
  { id: "palette", name: "Color Palette Generator", cat: "Brand", icon: Palette },
  { id: "calendar", name: "Content Calendar Generator", cat: "Growth", icon: Calendar },
  { id: "seo", name: "SEO Keyword Assistant", cat: "Growth", icon: TrendingUp },
  { id: "hashtag", name: "Hashtag Generator", cat: "Social", icon: Hash },
  { id: "ad-copy", name: "Ad Copy Generator", cat: "Growth", icon: Zap },
  { id: "email", name: "Email Writer", cat: "Writing", icon: Mail },
  { id: "resume", name: "Resume Generator", cat: "Writing", icon: Briefcase },
  { id: "prompt", name: "Prompt Generator", cat: "Writing", icon: Wand2 },
];

const CATEGORIES = ["Video", "Social", "Writing", "Brand", "Growth"];

const SEED_PROJECTS = [
  { id: 1, title: "Why I Quit My 9-5", tool: "Script Writer", folder: "YouTube", updated: "2h ago", accent: "#C81E3A" },
  { id: 2, title: "Fitness Reel — Day 12", tool: "Hook Generator", folder: "Reels", updated: "5h ago", accent: "#E8B54A" },
  { id: 3, title: "Studio Rebrand", tool: "Logo Idea Generator", folder: "Brand", updated: "1d ago", accent: "#7C6BFF" },
  { id: 4, title: "Q3 Product Launch", tool: "Ad Copy Generator", folder: "Marketing", updated: "2d ago", accent: "#3BB6A6" },
  { id: 5, title: "\"Van Life\" Thumbnail Set", tool: "Thumbnail Generator", folder: "YouTube", updated: "3d ago", accent: "#C81E3A" },
];

const TEMPLATES = [
  { id: 1, name: "Faceless YT Shorts Pack", platform: "Shorts", uses: "12.4k" },
  { id: 2, name: "Carousel: 5 Myths", platform: "Instagram", uses: "9.1k" },
  { id: 3, name: "Founder Story Hook", platform: "LinkedIn", uses: "6.8k" },
  { id: 4, name: "Product Drop Countdown", platform: "X", uses: "4.2k" },
];

/* ---------- mock AI layer ---------- */
function generateWithAI(toolId, input) {
  // AI_PROVIDER: swap this block for a real call, e.g.
  // return fetch('/api/ai/generate', { method:'POST', body: JSON.stringify({ toolId, input })}).then(r=>r.json())
  return new Promise((resolve) => {
    setTimeout(() => {
      if (toolId === "thumb-idea") {
        resolve(thumbIdeas(input));
      } else if (toolId === "yt-title") {
        resolve(ytTitles(input));
      } else if (toolId === "ig-caption") {
        resolve(igCaptions(input));
      } else {
        resolve(genericOutput(toolId, input));
      }
    }, 1400);
  });
}

function thumbIdeas(input) {
  const topic = input.topic || "your video";
  const palettes = [
    ["#C81E3A", "#0A0A0F", "#FFFFFF"],
    ["#E8B54A", "#0A0A0F", "#FF3355"],
    ["#3BB6A6", "#0A0A0F", "#FFFFFF"],
    ["#7C6BFF", "#0A0A0F", "#E8B54A"],
  ];
  const concepts = [
    { headline: "Shocked face + red arrow to result", desc: `Extreme close-up reaction shot, bold 4-word overlay on ${topic}, high-contrast crop.` },
    { headline: "Before / after split screen", desc: `Diagonal split showing the transformation behind ${topic}, numbers overlaid in a bold sans.` },
    { headline: "Bold text-only, no face", desc: `Oversized 3-word claim on a gradient plate — lets curiosity about ${topic} carry the click.` },
    { headline: "Mystery object + question mark", desc: `Tight crop on the key prop from ${topic}, partially obscured, warm rim-light.` },
  ];
  return concepts.map((c, i) => ({ id: i, ...c, palette: palettes[i] }));
}

function ytTitles(input) {
  const topic = input.topic || "this topic";
  const templates = [
    { tag: "Curiosity", text: `I Tried ${topic} For 30 Days (Unexpected Result)` },
    { tag: "Bold Claim", text: `${topic} Is Broken — Here's What Actually Works` },
    { tag: "Number Hook", text: `7 Things Nobody Tells You About ${topic}` },
    { tag: "Personal", text: `Why I Almost Quit ${topic} (Honest Story)` },
    { tag: "Contrarian", text: `Stop Doing ${topic} Like This` },
    { tag: "Urgency", text: `${topic}: What Changes This Year` },
  ];
  return templates.map((t, i) => ({ id: i, ...t }));
}

function igCaptions(input) {
  const topic = input.topic || "this post";
  const tone = input.tone || "Friendly";
  const bodies = {
    Friendly: `Okay real talk — ${topic} taught me more than I expected. Saving this one for future me 🤍`,
    Bold: `${topic}. No filter, no fluff — just what actually happened.`,
    Witty: `${topic} said "grow" and I said "say less" 😅`,
  };
  const base = bodies[tone] || bodies.Friendly;
  const variants = [
    { style: "Short & punchy", text: base.split(".")[0] + "." },
    { style: "Story format", text: `${base} Here's the full story in the caption 👇` },
    { style: "CTA-forward", text: `${base} Drop a 🔥 if you needed this today.` },
  ];
  const hashtags = ["#creatorlife", "#contentcreator", `#${(topic || "growth").replace(/\s+/g, "").toLowerCase()}`, "#smallcreator", "#growthmindset"];
  return { variants, hashtags };
}

function genericOutput(toolId, input) {
  const tool = TOOLS.find((t) => t.id === toolId);
  const topic = input.topic || "your input";
  return {
    text: `Here's a first draft from the ${tool?.name || "tool"} based on "${topic}". This workspace is fully wired — connect a real model in the AI service layer to replace this templated draft with live generation tuned to ${tool?.name || "this tool"}.`,
  };
}

/* ---------- shared UI atoms ---------- */
function GlassCard({ children, style, className = "", onClick }) {
  return (
    <div className={`glass-card ${className}`} style={style} onClick={onClick}>
      {children}
    </div>
  );
}

function PrimaryButton({ children, onClick, disabled, style, full }) {
  return (
    <button
      className="btn-primary"
      style={{ width: full ? "100%" : undefined, ...style }}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

function IconBadge({ icon: Icon, size = 18, active }) {
  return (
    <div className={`icon-badge ${active ? "icon-badge-active" : ""}`}>
      <Icon size={size} />
    </div>
  );
}

function PulseCore({ size = 64 }) {
  return (
    <div className="pulse-core" style={{ width: size, height: size }}>
      <div className="pulse-ring r1" />
      <div className="pulse-ring r2" />
      <div className="pulse-dot"><Sparkles size={size * 0.34} color="#fff" /></div>
    </div>
  );
}

/* ---------- Auth ---------- */
function AuthScreen({ onDone }) {
  const [mode, setMode] = useState("login"); // login | signup | otp
  const [showPw, setShowPw] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const otpRefs = useRef([]);

  const handleOtpChange = (i, val) => {
    if (!/^[0-9]?$/.test(val)) return;
    const next = [...otp];
    next[i] = val;
    setOtp(next);
    if (val && i < 5) otpRefs.current[i + 1]?.focus();
  };

  return (
    <div className="screen auth-screen">
      <div className="auth-hero">
        <div className="brand-mark">
          <PulseCore size={56} />
        </div>
        <h1 className="brand-title">CREOVA AI</h1>
        <p className="brand-sub">Your all-in-one AI creator studio</p>
      </div>

      <GlassCard className="auth-card">
        {mode !== "otp" ? (
          <>
            <div className="tab-switch">
              <button className={mode === "login" ? "tab-active" : ""} onClick={() => setMode("login")}>Log In</button>
              <button className={mode === "signup" ? "tab-active" : ""} onClick={() => setMode("signup")}>Sign Up</button>
            </div>

            {mode === "signup" && (
              <label className="field">
                <span>Full name</span>
                <input type="text" placeholder="Alex Rivera" />
              </label>
            )}
            <label className="field">
              <span>Email</span>
              <input type="email" placeholder="you@creova.ai" />
            </label>
            <label className="field">
              <span>Password</span>
              <div className="pw-wrap">
                <input type={showPw ? "text" : "password"} placeholder="••••••••" />
                <button className="pw-toggle" onClick={() => setShowPw(!showPw)}>
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </label>

            {mode === "login" && <div className="forgot-link">Forgot password?</div>}

            <PrimaryButton full onClick={() => setMode(mode === "signup" ? "otp" : "otp")}>
              {mode === "signup" ? "Create account" : "Log in"}
            </PrimaryButton>

            <div className="divider"><span>or continue with</span></div>

            <button className="google-btn" onClick={() => onDone()}>
              <span className="g-mark">G</span> Continue with Google
            </button>
          </>
        ) : (
          <div className="otp-block">
            <button className="back-mini" onClick={() => setMode("signup")}><ArrowLeft size={16} /> Back</button>
            <h3>Verify your email</h3>
            <p className="otp-sub">Enter the 6-digit code we sent to your inbox</p>
            <div className="otp-row">
              {otp.map((v, i) => (
                <input
                  key={i}
                  ref={(el) => (otpRefs.current[i] = el)}
                  className="otp-box"
                  maxLength={1}
                  value={v}
                  onChange={(e) => handleOtpChange(i, e.target.value)}
                />
              ))}
            </div>
            <PrimaryButton full onClick={onDone}>Verify & continue</PrimaryButton>
            <div className="resend">Didn't get a code? <span>Resend</span></div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}

/* ---------- Home ---------- */
function HomeScreen({ setTab, openTool, projects }) {
  return (
    <div className="screen">
      <div className="home-header">
        <div>
          <p className="eyebrow">Good evening</p>
          <h2 className="home-name">Alex</h2>
        </div>
        <div className="header-icons">
          <IconBadge icon={Search} />
          <div className="badge-wrap">
            <IconBadge icon={Bell} />
            <span className="dot" />
          </div>
        </div>
      </div>

      <GlassCard className="assistant-card" onClick={() => setTab("chat")}>
        <PulseCore size={44} />
        <div className="assistant-copy">
          <p className="assistant-title">Ask Creova anything</p>
          <p className="assistant-sub">"Give me 5 hooks for a productivity video"</p>
        </div>
        <ChevronRight size={18} color="var(--text-muted)" />
      </GlassCard>

      <SectionHeader title="Quick Actions" />
      <div className="quick-grid">
        {[TOOLS[0], TOOLS[1], TOOLS[2], TOOLS.find(t=>t.id==="script")].map((t) => (
          <button key={t.id} className="quick-tile" onClick={() => openTool(t.id)}>
            <div className="quick-icon"><t.icon size={20} /></div>
            <span>{t.name.split(" ").slice(0, 2).join(" ")}</span>
          </button>
        ))}
      </div>

      <SectionHeader title="Recent Projects" action="See all" onAction={() => setTab("projects")} />
      <div className="hscroll">
        {projects.slice(0, 4).map((p) => (
          <GlassCard key={p.id} className="project-mini" style={{ borderTop: `3px solid ${p.accent}` }}>
            <p className="pm-title">{p.title}</p>
            <p className="pm-meta">{p.tool}</p>
            <p className="pm-time">{p.updated}</p>
          </GlassCard>
        ))}
      </div>

      <SectionHeader title="Trending Templates" />
      <div className="hscroll">
        {TEMPLATES.map((t) => (
          <GlassCard key={t.id} className="template-mini">
            <span className="plat-chip">{t.platform}</span>
            <p className="pm-title">{t.name}</p>
            <p className="pm-meta">{t.uses} uses</p>
          </GlassCard>
        ))}
      </div>

      <SectionHeader title="Creator Dashboard" />
      <div className="dash-row">
        <GlassCard className="dash-tile">
          <Zap size={16} color="var(--crimson-bright)" />
          <p className="dash-num">72</p>
          <p className="dash-label">Credits left</p>
        </GlassCard>
        <GlassCard className="dash-tile">
          <Folder size={16} color="var(--crimson-bright)" />
          <p className="dash-num">18</p>
          <p className="dash-label">Projects</p>
        </GlassCard>
        <GlassCard className="dash-tile">
          <TrendingUp size={16} color="var(--crimson-bright)" />
          <p className="dash-num">+34%</p>
          <p className="dash-label">Output pace</p>
        </GlassCard>
      </div>
    </div>
  );
}

function SectionHeader({ title, action, onAction }) {
  return (
    <div className="section-header">
      <h3>{title}</h3>
      {action && <span className="section-action" onClick={onAction}>{action}</span>}
    </div>
  );
}

/* ---------- Tools list ---------- */
function ToolsScreen({ openTool }) {
  const [query, setQuery] = useState("");
  const filtered = TOOLS.filter((t) => t.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="screen">
      <h2 className="page-title">AI Tools</h2>
      <div className="search-bar">
        <Search size={16} color="var(--text-muted)" />
        <input placeholder="Search 21 tools..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      {CATEGORIES.map((cat) => {
        const items = filtered.filter((t) => t.cat === cat);
        if (!items.length) return null;
        return (
          <div key={cat}>
            <SectionHeader title={cat} />
            <div className="tool-grid">
              {items.map((t) => (
                <button key={t.id} className="tool-card" onClick={() => openTool(t.id)}>
                  <div className="tool-icon"><t.icon size={20} /></div>
                  <span>{t.name}</span>
                  {t.deep && <span className="deep-chip">Featured</span>}
                </button>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- Tool workspace ---------- */
function ToolScreen({ toolId, onBack, credits, spendCredit, addProject }) {
  const tool = TOOLS.find((t) => t.id === toolId);
  const [topic, setTopic] = useState("");
  const [tone, setTone] = useState("Friendly");
  const [style, setStyle] = useState("Bold");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [saved, setSaved] = useState(false);

  const run = async () => {
    if (!topic.trim() || credits <= 0) return;
    setLoading(true);
    setResult(null);
    setSaved(false);
    spendCredit();
    const r = await generateWithAI(toolId, { topic, tone, style });
    setResult(r);
    setLoading(false);
  };

  const save = () => {
    addProject({ title: topic || tool.name, tool: tool.name });
    setSaved(true);
  };

  return (
    <div className="screen">
      <div className="tool-header">
        <button className="back-mini" onClick={onBack}><ArrowLeft size={18} /></button>
        <div className="tool-icon lg"><tool.icon size={20} /></div>
        <div>
          <h3 className="tool-name">{tool.name}</h3>
          <p className="tool-cat">{tool.cat} tool · 1 credit / generation</p>
        </div>
      </div>

      <GlassCard className="input-card">
        <label className="field">
          <span>{toolId === "ig-caption" ? "What's the post about?" : "Topic / description"}</span>
          <input value={topic} onChange={(e) => setTopic(e.target.value)} placeholder="e.g. how I doubled my savings in a year" />
        </label>

        {toolId === "ig-caption" && (
          <div className="chip-row">
            {["Friendly", "Bold", "Witty"].map((o) => (
              <button key={o} className={`chip ${tone === o ? "chip-active" : ""}`} onClick={() => setTone(o)}>{o}</button>
            ))}
          </div>
        )}
        {toolId === "thumb-idea" && (
          <div className="chip-row">
            {["Bold", "Minimal", "Cinematic"].map((o) => (
              <button key={o} className={`chip ${style === o ? "chip-active" : ""}`} onClick={() => setStyle(o)}>{o}</button>
            ))}
          </div>
        )}

        <PrimaryButton full onClick={run} disabled={loading || !topic.trim()}>
          {loading ? "Generating..." : <><Sparkles size={16} /> Generate</>}
        </PrimaryButton>
        <p className="credits-note">{credits} credits remaining</p>
      </GlassCard>

      {loading && (
        <GlassCard className="loading-card">
          <PulseCore size={40} />
          <p>Creova is thinking…</p>
          <div className="scanline" />
        </GlassCard>
      )}

      {result && !loading && (
        <ResultBlock toolId={toolId} result={result} onSave={save} saved={saved} />
      )}
    </div>
  );
}

function ResultBlock({ toolId, result, onSave, saved }) {
  if (toolId === "thumb-idea") {
    return (
      <div className="result-stack">
        {result.map((c) => (
          <GlassCard key={c.id} className="result-card">
            <div className="palette-row">
              {c.palette.map((hex, i) => <span key={i} className="swatch" style={{ background: hex }} />)}
            </div>
            <p className="result-title">{c.headline}</p>
            <p className="result-body">{c.desc}</p>
          </GlassCard>
        ))}
        <SaveRow onSave={onSave} saved={saved} />
      </div>
    );
  }
  if (toolId === "yt-title") {
    return (
      <div className="result-stack">
        {result.map((t) => (
          <GlassCard key={t.id} className="result-card row-card">
            <span className="tag-chip">{t.tag}</span>
            <p className="result-body strong">{t.text}</p>
            <Copy size={15} color="var(--text-muted)" />
          </GlassCard>
        ))}
        <SaveRow onSave={onSave} saved={saved} />
      </div>
    );
  }
  if (toolId === "ig-caption") {
    return (
      <div className="result-stack">
        {result.variants.map((v, i) => (
          <GlassCard key={i} className="result-card">
            <span className="tag-chip">{v.style}</span>
            <p className="result-body">{v.text}</p>
          </GlassCard>
        ))}
        <GlassCard className="result-card">
          <p className="result-title">Suggested hashtags</p>
          <div className="chip-row wrap">
            {result.hashtags.map((h) => <span key={h} className="chip">{h}</span>)}
          </div>
        </GlassCard>
        <SaveRow onSave={onSave} saved={saved} />
      </div>
    );
  }
  return (
    <div className="result-stack">
      <GlassCard className="result-card">
        <p className="result-body">{result.text}</p>
      </GlassCard>
      <SaveRow onSave={onSave} saved={saved} />
    </div>
  );
}

function SaveRow({ onSave, saved }) {
  return (
    <button className={`save-row ${saved ? "saved" : ""}`} onClick={onSave} disabled={saved}>
      {saved ? <><Check size={16} /> Saved to Projects</> : <><Bookmark size={16} /> Save as project</>}
    </button>
  );
}

/* ---------- Chat ---------- */
function ChatScreen() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Hey Alex — what are we creating today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => { scrollRef.current?.scrollTo(0, scrollRef.current.scrollHeight); }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", text: input };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages((m) => [...m, { role: "ai", text: replyFor(userMsg.text) }]);
    }, 1200);
  };

  const replyFor = (text) => {
    return `Got it — here's a starting point for "${text.slice(0, 60)}". Want me to open this in a dedicated tool so you can refine and save it as a project?`;
  };

  const suggestions = ["5 hooks for a podcast clip", "Rewrite my bio, punchier", "Ideas for a Q&A video"];

  return (
    <div className="screen chat-screen">
      <h2 className="page-title">AI Assistant</h2>
      <div className="chat-scroll" ref={scrollRef}>
        {messages.map((m, i) => (
          <div key={i} className={`bubble-row ${m.role}`}>
            {m.role === "ai" && <div className="ai-avatar"><Sparkles size={13} color="#fff" /></div>}
            <div className={`bubble ${m.role}`}>{m.text}</div>
          </div>
        ))}
        {typing && (
          <div className="bubble-row ai">
            <div className="ai-avatar"><Sparkles size={13} color="#fff" /></div>
            <div className="bubble ai typing"><span /><span /><span /></div>
          </div>
        )}
      </div>

      {messages.length < 2 && (
        <div className="suggest-row">
          {suggestions.map((s) => (
            <button key={s} className="suggest-chip" onClick={() => setInput(s)}>{s}</button>
          ))}
        </div>
      )}

      <div className="chat-input-bar">
        <button className="icon-btn"><Paperclip size={18} /></button>
        <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Message Creova AI..." />
        <button className="icon-btn"><Mic size={18} /></button>
        <button className="icon-btn send" onClick={send}><Send size={16} /></button>
      </div>
    </div>
  );
}

/* ---------- Projects ---------- */
function ProjectsScreen({ projects, addProject, removeProject, duplicateProject }) {
  const [query, setQuery] = useState("");
  const [folder, setFolder] = useState("All");
  const folders = ["All", ...Array.from(new Set(projects.map((p) => p.folder)))];
  const filtered = projects.filter(
    (p) => (folder === "All" || p.folder === folder) && p.title.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="screen">
      <div className="row-between">
        <h2 className="page-title">Projects</h2>
        <button className="icon-btn add" onClick={() => addProject({ title: "Untitled project", tool: "Blank" })}>
          <Plus size={18} />
        </button>
      </div>
      <div className="search-bar">
        <Search size={16} color="var(--text-muted)" />
        <input placeholder="Search projects..." value={query} onChange={(e) => setQuery(e.target.value)} />
      </div>
      <div className="chip-row">
        {folders.map((f) => (
          <button key={f} className={`chip ${folder === f ? "chip-active" : ""}`} onClick={() => setFolder(f)}>{f}</button>
        ))}
      </div>

      <div className="result-stack">
        {filtered.length === 0 && <p className="empty-note">No projects here yet. Create one from any AI tool.</p>}
        {filtered.map((p) => (
          <GlassCard key={p.id} className="project-row" style={{ borderLeft: `3px solid ${p.accent}` }}>
            <div className="project-row-main">
              <p className="pm-title">{p.title}</p>
              <p className="pm-meta">{p.tool} · {p.folder} · {p.updated}</p>
            </div>
            <div className="project-actions">
              <button className="icon-btn sm" onClick={() => duplicateProject(p.id)}><Copy size={14} /></button>
              <button className="icon-btn sm" onClick={() => removeProject(p.id)}><Trash2 size={14} /></button>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

/* ---------- Profile / Subscription ---------- */
function ProfileScreen({ plan, setPlan, credits }) {
  const plans = [
    { id: "free", name: "Free", price: "$0", perks: ["20 credits / mo", "3 saved projects", "Core tools"] },
    { id: "pro", name: "Pro", price: "$19/mo", perks: ["500 credits / mo", "Unlimited projects", "All AI tools", "Priority generation"] },
    { id: "business", name: "Business", price: "$49/mo", perks: ["2000 credits / mo", "Team seats", "Brand kits", "API access"] },
  ];
  const billing = [
    { id: 1, label: "Pro — Monthly", date: "Jun 12, 2026", amount: "$19.00" },
    { id: 2, label: "Pro — Monthly", date: "May 12, 2026", amount: "$19.00" },
  ];

  return (
    <div className="screen">
      <h2 className="page-title">Profile</h2>
      <GlassCard className="profile-card">
        <div className="avatar">AR</div>
        <div>
          <p className="pm-title">Alex Rivera</p>
          <p className="pm-meta">alex@creova.ai</p>
        </div>
        <span className={`plan-chip ${plan}`}>{plan === "free" ? "Free" : <><Crown size={12} /> {plan}</>}</span>
      </GlassCard>

      <SectionHeader title="Usage & Analytics" />
      <div className="dash-row">
        <GlassCard className="dash-tile"><Zap size={16} color="var(--crimson-bright)" /><p className="dash-num">{credits}</p><p className="dash-label">Credits left</p></GlassCard>
        <GlassCard className="dash-tile"><Folder size={16} color="var(--crimson-bright)" /><p className="dash-num">18</p><p className="dash-label">Saved</p></GlassCard>
        <GlassCard className="dash-tile"><BarChart3 size={16} color="var(--crimson-bright)" /><p className="dash-num">41</p><p className="dash-label">This week</p></GlassCard>
      </div>
      <GlassCard className="usage-bar-card">
        <div className="usage-bar"><div className="usage-fill" style={{ width: `${credits}%` }} /></div>
        <p className="pm-meta">{credits}/100 monthly credits used</p>
      </GlassCard>

      <SectionHeader title="Subscription" />
      <div className="plan-stack">
        {plans.map((p) => (
          <GlassCard key={p.id} className={`plan-card ${plan === p.id ? "plan-selected" : ""}`}>
            <div className="row-between">
              <p className="result-title">{p.name}</p>
              <p className="plan-price">{p.price}</p>
            </div>
            <ul className="perk-list">
              {p.perks.map((perk) => <li key={perk}><Check size={13} color="var(--crimson-bright)" /> {perk}</li>)}
            </ul>
            <PrimaryButton full style={{ opacity: plan === p.id ? 0.5 : 1 }} disabled={plan === p.id} onClick={() => setPlan(p.id)}>
              {plan === p.id ? "Current plan" : "Upgrade"}
            </PrimaryButton>
          </GlassCard>
        ))}
      </div>

      <SectionHeader title="Billing History" />
      <div className="result-stack">
        {billing.map((b) => (
          <GlassCard key={b.id} className="billing-row">
            <CreditCard size={16} color="var(--text-muted)" />
            <div className="project-row-main">
              <p className="pm-title">{b.label}</p>
              <p className="pm-meta">{b.date}</p>
            </div>
            <p className="pm-title">{b.amount}</p>
          </GlassCard>
        ))}
      </div>

      <button className="logout-row"><LogOut size={16} /> Log out</button>
    </div>
  );
}

/* ---------- Bottom nav ---------- */
function BottomNav({ tab, setTab }) {
  const items = [
    { id: "home", icon: Home, label: "Home" },
    { id: "tools", icon: LayoutGrid, label: "Tools" },
    { id: "chat", icon: MessageSquare, label: "Chat" },
    { id: "projects", icon: Folder, label: "Projects" },
    { id: "profile", icon: User, label: "Profile" },
  ];
  return (
    <div className="bottom-nav">
      {items.map((it) => (
        <button key={it.id} className={`nav-item ${tab === it.id ? "nav-active" : ""}`} onClick={() => setTab(it.id)}>
          <it.icon size={it.id === "chat" ? 20 : 19} />
          <span>{it.label}</span>
        </button>
      ))}
    </div>
  );
}

/* ---------- Root ---------- */
export default function CreovaApp() {
  const [authed, setAuthed] = useState(false);
  const [tab, setTab] = useState("home");
  const [activeTool, setActiveTool] = useState(null);
  const [credits, setCredits] = useState(72);
  const [plan, setPlan] = useState("free");
  const [projects, setProjects] = useState(
    SEED_PROJECTS.map((p) => ({ ...p }))
  );

  const addProject = (p) => {
    const accents = ["#C81E3A", "#E8B54A", "#7C6BFF", "#3BB6A6"];
    setProjects((prev) => [
      { id: Date.now(), title: p.title, tool: p.tool, folder: "Unsorted", updated: "just now", accent: accents[prev.length % accents.length] },
      ...prev,
    ]);
  };
  const removeProject = (id) => setProjects((prev) => prev.filter((p) => p.id !== id));
  const duplicateProject = (id) => {
    setProjects((prev) => {
      const found = prev.find((p) => p.id === id);
      if (!found) return prev;
      return [{ ...found, id: Date.now(), title: found.title + " (copy)", updated: "just now" }, ...prev];
    });
  };
  const spendCredit = () => setCredits((c) => Math.max(0, c - 1));

  return (
    <div className="creova-root">
      <GlobalStyle />
      <div className="phone-frame">
        <div className="phone-notch" />
        <div className="phone-content">
          {!authed ? (
            <AuthScreen onDone={() => setAuthed(true)} />
          ) : activeTool ? (
            <ToolScreen
              toolId={activeTool}
              onBack={() => setActiveTool(null)}
              credits={credits}
              spendCredit={spendCredit}
              addProject={addProject}
            />
          ) : (
            <>
              {tab === "home" && <HomeScreen setTab={setTab} openTool={setActiveTool} projects={projects} />}
              {tab === "tools" && <ToolsScreen openTool={setActiveTool} />}
              {tab === "chat" && <ChatScreen />}
              {tab === "projects" && (
                <ProjectsScreen
                  projects={projects}
                  addProject={addProject}
                  removeProject={removeProject}
                  duplicateProject={duplicateProject}
                />
              )}
              {tab === "profile" && <ProfileScreen plan={plan} setPlan={setPlan} credits={credits} />}
            </>
          )}
        </div>
        {authed && !activeTool && <BottomNav tab={tab} setTab={setTab} />}
      </div>
    </div>
  );
}

/* ---------- Global styles ---------- */
function GlobalStyle() {
  return (
    <style>{`
      @import url('https://api.fontshare.com/v2/css?f[]=clash-display@600,700&f[]=general-sans@400,500,600&display=swap');

      .creova-root {
        --bg: #08070A;
        --surface: rgba(255,255,255,0.045);
        --surface-2: rgba(255,255,255,0.07);
        --border: rgba(255,255,255,0.09);
        --crimson: #C81E3A;
        --crimson-bright: #FF3355;
        --crimson-deep: #530B18;
        --gold: #E8B54A;
        --text: #F5F3F2;
        --text-muted: #9C949B;
        font-family: 'General Sans', sans-serif;
        display: flex;
        justify-content: center;
        padding: 24px 0;
        background: radial-gradient(ellipse at top, #17070c 0%, #08070A 55%);
        min-height: 100vh;
        color: var(--text);
      }
      .phone-frame {
        width: 390px;
        max-width: 100vw;
        height: 820px;
        max-height: 92vh;
        background: linear-gradient(180deg, #0C0A0E 0%, #08070A 100%);
        border-radius: 44px;
        border: 1px solid rgba(255,255,255,0.08);
        box-shadow: 0 0 0 8px #050406, 0 30px 80px rgba(0,0,0,0.6), inset 0 0 40px rgba(200,30,58,0.04);
        position: relative;
        overflow: hidden;
        display: flex;
        flex-direction: column;
      }
      .phone-notch {
        position: absolute; top: 10px; left: 50%; transform: translateX(-50%);
        width: 120px; height: 22px; background: #000; border-radius: 14px; z-index: 30;
      }
      .phone-content {
        flex: 1; overflow-y: auto; padding: 40px 18px 96px;
        scrollbar-width: none;
      }
      .phone-content::-webkit-scrollbar { display: none; }

      .screen { display: flex; flex-direction: column; gap: 14px; animation: fadein .35s ease; }
      @keyframes fadein { from { opacity: 0; transform: translateY(6px);} to { opacity:1; transform:none; } }

      h1,h2,h3 { font-family: 'Clash Display', sans-serif; margin: 0; letter-spacing: -0.01em; }
      .page-title { font-size: 22px; font-weight: 600; }

      .glass-card {
        background: var(--surface);
        border: 1px solid var(--border);
        backdrop-filter: blur(18px);
        border-radius: 18px;
        padding: 16px;
      }

      .btn-primary {
        background: linear-gradient(135deg, var(--crimson) 0%, var(--crimson-bright) 100%);
        color: #fff; border: none; border-radius: 14px; padding: 13px 18px;
        font-family: 'General Sans'; font-weight: 600; font-size: 14px;
        display: flex; align-items: center; justify-content: center; gap: 6px;
        box-shadow: 0 8px 24px rgba(200,30,58,0.35);
        cursor: pointer; transition: transform .15s ease, opacity .15s ease;
      }
      .btn-primary:active { transform: scale(0.97); }
      .btn-primary:disabled { opacity: 0.45; box-shadow: none; cursor: not-allowed; }

      .icon-badge {
        width: 38px; height: 38px; border-radius: 12px;
        background: var(--surface-2); border: 1px solid var(--border);
        display: flex; align-items: center; justify-content: center;
      }
      .header-icons { display: flex; gap: 10px; }
      .badge-wrap { position: relative; }
      .dot { position: absolute; top: 8px; right: 8px; width: 7px; height: 7px; background: var(--crimson-bright); border-radius: 50%; box-shadow: 0 0 6px var(--crimson-bright); }

      /* pulse core */
      .pulse-core { position: relative; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .pulse-ring { position: absolute; inset: 0; border-radius: 50%; border: 1.5px solid var(--crimson-bright); opacity: 0; animation: pulseOut 2.6s ease-out infinite; }
      .pulse-ring.r2 { animation-delay: 1.3s; }
      @keyframes pulseOut { 0% { transform: scale(0.5); opacity: 0.6; } 100% { transform: scale(1.5); opacity: 0; } }
      .pulse-dot { width: 62%; height: 62%; border-radius: 50%; background: radial-gradient(circle at 35% 30%, var(--crimson-bright), var(--crimson) 70%); display:flex; align-items:center; justify-content:center; box-shadow: 0 0 24px rgba(255,51,85,0.5); }

      /* auth */
      .auth-hero { text-align: center; margin-top: 10px; }
      .brand-mark { display: flex; justify-content: center; margin-bottom: 10px; }
      .brand-title { font-size: 26px; font-weight: 700; letter-spacing: 0.02em; }
      .brand-sub { color: var(--text-muted); font-size: 13px; margin-top: 4px; }
      .auth-card { margin-top: 18px; }
      .tab-switch { display: flex; background: var(--surface-2); border-radius: 12px; padding: 4px; margin-bottom: 16px; }
      .tab-switch button { flex: 1; padding: 9px; border: none; background: transparent; color: var(--text-muted); font-weight: 600; font-size: 13px; border-radius: 9px; cursor: pointer; }
      .tab-switch .tab-active { background: var(--crimson); color: #fff; }
      .field { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; font-size: 12px; color: var(--text-muted); }
      .field input { background: var(--surface-2); border: 1px solid var(--border); border-radius: 11px; padding: 11px 12px; color: var(--text); font-size: 14px; font-family: inherit; outline: none; }
      .field input:focus { border-color: var(--crimson); }
      .pw-wrap { position: relative; }
      .pw-toggle { position: absolute; right: 10px; top: 50%; transform: translateY(-50%); background: none; border: none; color: var(--text-muted); cursor: pointer; }
      .forgot-link { text-align: right; font-size: 12px; color: var(--crimson-bright); margin: -4px 0 14px; cursor: pointer; }
      .divider { display: flex; align-items: center; text-align: center; color: var(--text-muted); font-size: 11px; margin: 16px 0; }
      .divider::before, .divider::after { content: ""; flex: 1; height: 1px; background: var(--border); }
      .divider span { padding: 0 10px; }
      .google-btn { width: 100%; background: var(--surface-2); border: 1px solid var(--border); border-radius: 14px; padding: 12px; color: var(--text); font-weight: 600; font-size: 13px; display: flex; align-items: center; justify-content: center; gap: 8px; cursor: pointer; }
      .g-mark { width: 18px; height: 18px; border-radius: 50%; background: conic-gradient(#EA4335 0deg 90deg, #4285F4 90deg 180deg, #34A853 180deg 270deg, #FBBC05 270deg 360deg); display:inline-flex; align-items:center; justify-content:center; font-size: 10px; font-weight: 800; color: #fff; }
      .otp-block { text-align: center; }
      .back-mini { display: flex; align-items: center; gap: 4px; background: none; border: none; color: var(--text-muted); font-size: 12px; cursor: pointer; margin-bottom: 6px; }
      .otp-sub { color: var(--text-muted); font-size: 12px; margin: 6px 0 18px; }
      .otp-row { display: flex; gap: 8px; justify-content: center; margin-bottom: 20px; }
      .otp-box { width: 42px; height: 50px; text-align: center; font-size: 18px; background: var(--surface-2); border: 1px solid var(--border); border-radius: 10px; color: var(--text); outline: none; }
      .otp-box:focus { border-color: var(--crimson); }
      .resend { font-size: 12px; color: var(--text-muted); margin-top: 14px; }
      .resend span { color: var(--crimson-bright); cursor: pointer; }

      /* home */
      .home-header { display: flex; justify-content: space-between; align-items: flex-start; }
      .eyebrow { font-size: 12px; color: var(--text-muted); margin: 0; }
      .home-name { font-size: 24px; font-weight: 700; }
      .assistant-card { display: flex; align-items: center; gap: 12px; cursor: pointer; border-color: rgba(200,30,58,0.3); }
      .assistant-copy { flex: 1; }
      .assistant-title { font-weight: 600; font-size: 14px; margin: 0; }
      .assistant-sub { font-size: 12px; color: var(--text-muted); margin: 2px 0 0; }
      .section-header { display: flex; justify-content: space-between; align-items: center; margin-top: 4px; }
      .section-header h3 { font-size: 15px; font-weight: 600; }
      .section-action { font-size: 12px; color: var(--crimson-bright); cursor: pointer; }
      .quick-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px; }
      .quick-tile { background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 12px 6px; display: flex; flex-direction: column; align-items: center; gap: 6px; cursor: pointer; }
      .quick-tile span { font-size: 10px; color: var(--text-muted); text-align: center; line-height: 1.2; }
      .quick-icon { width: 34px; height: 34px; border-radius: 10px; background: linear-gradient(135deg, var(--crimson-deep), var(--crimson)); display: flex; align-items: center; justify-content: center; }
      .hscroll { display: flex; gap: 10px; overflow-x: auto; padding-bottom: 4px; scrollbar-width: none; }
      .hscroll::-webkit-scrollbar { display: none; }
      .project-mini, .template-mini { min-width: 150px; flex-shrink: 0; }
      .pm-title { font-size: 13px; font-weight: 600; margin: 0; }
      .pm-meta { font-size: 11px; color: var(--text-muted); margin: 3px 0 0; }
      .pm-time { font-size: 10px; color: var(--text-muted); margin-top: 6px; }
      .plat-chip { font-size: 10px; background: var(--surface-2); padding: 3px 8px; border-radius: 20px; color: var(--crimson-bright); }
      .dash-row { display: flex; gap: 8px; }
      .dash-tile { flex: 1; display: flex; flex-direction: column; gap: 6px; align-items: flex-start; }
      .dash-num { font-size: 17px; font-weight: 700; margin: 0; }
      .dash-label { font-size: 10px; color: var(--text-muted); margin: 0; }

      /* tools */
      .search-bar { display: flex; align-items: center; gap: 8px; background: var(--surface); border: 1px solid var(--border); border-radius: 12px; padding: 10px 12px; }
      .search-bar input { background: none; border: none; outline: none; color: var(--text); font-size: 13px; width: 100%; font-family: inherit; }
      .tool-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 8px; }
      .tool-card { position: relative; background: var(--surface); border: 1px solid var(--border); border-radius: 14px; padding: 14px 10px; display: flex; flex-direction: column; gap: 8px; cursor: pointer; text-align: left; }
      .tool-card span { font-size: 11.5px; font-weight: 600; line-height: 1.25; }
      .tool-icon { width: 34px; height: 34px; border-radius: 10px; background: var(--surface-2); display: flex; align-items: center; justify-content: center; color: var(--crimson-bright); }
      .tool-icon.lg { width: 42px; height: 42px; border-radius: 12px; }
      .deep-chip { position: absolute; top: 8px; right: 8px; font-size: 8px; background: var(--crimson); padding: 2px 6px; border-radius: 20px; font-weight: 700; letter-spacing: 0.03em; }

      /* tool workspace */
      .tool-header { display: flex; align-items: center; gap: 10px; }
      .tool-name { font-size: 15px; font-weight: 600; }
      .tool-cat { font-size: 11px; color: var(--text-muted); margin: 2px 0 0; }
      .input-card { display: flex; flex-direction: column; gap: 4px; }
      .chip-row { display: flex; gap: 6px; margin-bottom: 12px; flex-wrap: wrap; }
      .chip-row.wrap { flex-wrap: wrap; }
      .chip { background: var(--surface-2); border: 1px solid var(--border); border-radius: 20px; padding: 6px 12px; font-size: 11px; color: var(--text-muted); cursor: pointer; }
      .chip-active { background: var(--crimson); color: #fff; border-color: var(--crimson); }
      .credits-note { text-align: center; font-size: 10.5px; color: var(--text-muted); margin: 8px 0 0; }
      .loading-card { display: flex; flex-direction: column; align-items: center; gap: 10px; padding: 26px 16px; position: relative; overflow: hidden; }
      .loading-card p { font-size: 12px; color: var(--text-muted); }
      .scanline { position: absolute; left: 0; right: 0; height: 2px; background: linear-gradient(90deg, transparent, var(--crimson-bright), transparent); animation: scan 1.6s linear infinite; }
      @keyframes scan { 0% { top: 0; } 100% { top: 100%; } }
      .result-stack { display: flex; flex-direction: column; gap: 10px; }
      .result-card { display: flex; flex-direction: column; gap: 6px; }
      .result-card.row-card { flex-direction: row; align-items: center; gap: 10px; }
      .result-title { font-size: 13px; font-weight: 600; margin: 0; }
      .result-body { font-size: 12.5px; color: var(--text-muted); line-height: 1.5; margin: 0; }
      .result-body.strong { color: var(--text); flex: 1; font-weight: 500; }
      .tag-chip { align-self: flex-start; font-size: 9.5px; background: var(--surface-2); color: var(--crimson-bright); padding: 3px 9px; border-radius: 20px; font-weight: 700; letter-spacing: 0.03em; }
      .palette-row { display: flex; gap: 6px; }
      .swatch { width: 22px; height: 22px; border-radius: 6px; border: 1px solid var(--border); }
      .save-row { display: flex; align-items: center; justify-content: center; gap: 6px; background: var(--surface); border: 1px dashed var(--border); border-radius: 14px; padding: 12px; font-size: 12.5px; font-weight: 600; color: var(--text); cursor: pointer; }
      .save-row.saved { color: var(--crimson-bright); border-style: solid; border-color: var(--crimson); }

      /* chat */
      .chat-screen { height: calc(100vh - 200px); }
      .chat-scroll { flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 12px; padding: 4px 2px; scrollbar-width: none; }
      .chat-scroll::-webkit-scrollbar { display: none; }
      .bubble-row { display: flex; align-items: flex-end; gap: 8px; }
      .bubble-row.user { justify-content: flex-end; }
      .ai-avatar { width: 24px; height: 24px; border-radius: 8px; background: linear-gradient(135deg, var(--crimson-deep), var(--crimson)); display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
      .bubble { max-width: 76%; padding: 10px 13px; border-radius: 16px; font-size: 13px; line-height: 1.45; }
      .bubble.ai { background: var(--surface); border: 1px solid var(--border); border-bottom-left-radius: 4px; }
      .bubble.user { background: linear-gradient(135deg, var(--crimson) 0%, var(--crimson-bright) 100%); color: #fff; border-bottom-right-radius: 4px; }
      .bubble.typing { display: flex; gap: 4px; padding: 14px; }
      .bubble.typing span { width: 5px; height: 5px; background: var(--text-muted); border-radius: 50%; animation: blink 1.2s infinite; }
      .bubble.typing span:nth-child(2) { animation-delay: 0.2s; }
      .bubble.typing span:nth-child(3) { animation-delay: 0.4s; }
      @keyframes blink { 0%,80%,100% { opacity: 0.2; } 40% { opacity: 1; } }
      .suggest-row { display: flex; gap: 6px; overflow-x: auto; scrollbar-width: none; }
      .suggest-chip { flex-shrink: 0; background: var(--surface); border: 1px solid var(--border); border-radius: 20px; padding: 8px 12px; font-size: 11px; color: var(--text-muted); cursor: pointer; }
      .chat-input-bar { display: flex; align-items: center; gap: 6px; background: var(--surface); border: 1px solid var(--border); border-radius: 16px; padding: 8px; margin-top: auto; }
      .chat-input-bar input { flex: 1; background: none; border: none; outline: none; color: var(--text); font-size: 13px; padding: 4px 6px; font-family: inherit; }
      .icon-btn { width: 32px; height: 32px; border-radius: 10px; background: var(--surface-2); border: none; display: flex; align-items: center; justify-content: center; color: var(--text-muted); cursor: pointer; flex-shrink: 0; }
      .icon-btn.send { background: var(--crimson); color: #fff; }
      .icon-btn.add { background: var(--crimson); color: #fff; width: 36px; height: 36px; }
      .icon-btn.sm { width: 26px; height: 26px; }

      /* projects */
      .row-between { display: flex; justify-content: space-between; align-items: center; }
      .empty-note { color: var(--text-muted); font-size: 12.5px; text-align: center; padding: 30px 10px; }
      .project-row { display: flex; align-items: center; gap: 10px; }
      .project-row-main { flex: 1; }
      .project-actions { display: flex; gap: 6px; }

      /* profile */
      .profile-card { display: flex; align-items: center; gap: 12px; }
      .avatar { width: 44px; height: 44px; border-radius: 14px; background: linear-gradient(135deg, var(--crimson-deep), var(--crimson)); display: flex; align-items: center; justify-content: center; font-weight: 700; font-size: 14px; }
      .plan-chip { margin-left: auto; font-size: 10px; text-transform: capitalize; background: var(--surface-2); padding: 5px 10px; border-radius: 20px; display: flex; align-items: center; gap: 4px; color: var(--gold); font-weight: 700; }
      .usage-bar-card { display: flex; flex-direction: column; gap: 8px; }
      .usage-bar { height: 8px; border-radius: 20px; background: var(--surface-2); overflow: hidden; }
      .usage-fill { height: 100%; background: linear-gradient(90deg, var(--crimson), var(--crimson-bright)); }
      .plan-stack { display: flex; flex-direction: column; gap: 10px; }
      .plan-card { border-color: var(--border); }
      .plan-selected { border-color: var(--crimson); background: rgba(200,30,58,0.08); }
      .plan-price { font-weight: 700; color: var(--crimson-bright); font-size: 13px; }
      .perk-list { list-style: none; padding: 0; margin: 10px 0 14px; display: flex; flex-direction: column; gap: 6px; }
      .perk-list li { display: flex; align-items: center; gap: 6px; font-size: 12px; color: var(--text-muted); }
      .billing-row { display: flex; align-items: center; gap: 10px; }
      .logout-row { display: flex; align-items: center; justify-content: center; gap: 8px; background: none; border: 1px solid var(--border); border-radius: 14px; padding: 12px; color: var(--text-muted); font-size: 13px; font-weight: 600; cursor: pointer; margin-top: 6px; }

      /* bottom nav */
      .bottom-nav {
        position: absolute; bottom: 0; left: 0; right: 0;
        display: flex; justify-content: space-around; align-items: center;
        padding: 12px 8px 20px; background: rgba(8,7,10,0.85); backdrop-filter: blur(20px);
        border-top: 1px solid var(--border); z-index: 20;
      }
      .nav-item { display: flex; flex-direction: column; align-items: center; gap: 3px; background: none; border: none; color: var(--text-muted); cursor: pointer; }
      .nav-item span { font-size: 9.5px; font-weight: 600; }
      .nav-active { color: var(--crimson-bright); }
    `}</style>
  );
}
