import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { LogIn, ArrowRight, Sparkles, Users, Film, Coins, Trophy, Hash } from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";
import { fmtNum } from "../components/landing/ui.jsx";
import { Logo, INK, GLASS, GRAD_TEXT } from "../components/landing/theme.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import Features from "../components/landing/Features.jsx";
import Ranking from "../components/landing/Ranking.jsx";
import Faq from "../components/landing/Faq.jsx";
import { FinalCta, Footer } from "../components/landing/Footer.jsx";

/* ---------- helpers ---------- */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
.nx-root { font-family: 'Plus Jakarta Sans', ui-sans-serif, system-ui, sans-serif; }
.nx-root h1, .nx-root h2 { font-family: 'Montserrat', 'Plus Jakarta Sans', sans-serif; font-weight: 900; letter-spacing: -0.025em; }
.nx-root h3 { font-family: 'Montserrat', 'Plus Jakarta Sans', sans-serif; }
@keyframes nx-marquee { to { transform: translateX(-50%); } }
@keyframes nx-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }
@keyframes nx-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
.nx-marquee { animation: nx-marquee 28s linear infinite; }
.nx-float { animation: nx-float 5s ease-in-out infinite; }
.nx-float-2 { animation: nx-float 6.5s ease-in-out -2s infinite; }
.nx-rise { animation: nx-rise .8s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) {
  .nx-marquee, .nx-float, .nx-float-2, .nx-rise { animation: none; }
}
`;

function usePublicStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let alive = true;
    supabase.rpc("get_creator_public_stats").then(({ data }) => {
      if (alive && data?.ok) setStats(data);
    });
    return () => { alive = false; };
  }, []);
  return stats;
}

/* ---------- header ---------- */
function Header() {
  const links = [
    ["#cach-lam", "Cách làm"],
    ["#quyen-loi", "Quyền lợi"],
    ["#ranking", "Xếp hạng"],
    ["#hoi-dap", "Hỏi đáp"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-emerald-600">{label}</a>
          ))}
        </nav>
        <Link
          to="/login"
          className="flex shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-sm font-bold sm:px-5 sm:py-2.5 text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/50"
        >
          <LogIn size={16} /> Đăng nhập
        </Link>
      </div>
    </header>
  );
}

/* ---------- game art (SVG tự vẽ) ---------- */
function GameBlock({ className = "" }) {
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nx-gb" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fef08a" />
          <stop offset="1" stopColor="#facc15" />
        </linearGradient>
      </defs>
      <ellipse cx="50" cy="92" rx="34" ry="6" fill="#064e3b" opacity=".14" />
      <polygon points="50,10 90,31 50,52 10,31" fill="url(#nx-gb)" />
      <polygon points="10,31 50,52 50,90 10,69" fill="#f59e0b" />
      <polygon points="90,31 50,52 50,90 90,69" fill="#d97706" />
      <polygon points="50,10 90,31 50,52 10,31" fill="none" stroke="#fff" strokeOpacity=".5" strokeWidth="1.5" />
      <circle cx="28" cy="58" r="3.4" fill="#78350f" />
      <circle cx="40" cy="64" r="3.4" fill="#78350f" />
      <path d="M26 70 Q35 78 44 73" stroke="#78350f" strokeWidth="3" fill="none" strokeLinecap="round" />
    </svg>
  );
}

function BoltDrop({ className = "" }) {
  return (
    <svg viewBox="0 0 100 120" className={className} aria-hidden="true">
      <defs>
        <linearGradient id="nx-bd-o" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fdba74" />
          <stop offset="1" stopColor="#ef4444" />
        </linearGradient>
        <linearGradient id="nx-bd-c" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#cffafe" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <path d="M50 6C50 6 90 46 90 76A40 40 0 0 1 10 76C10 46 50 6 50 6Z" fill="url(#nx-bd-o)" />
      <path d="M50 24C50 24 78 52 78 76A28 28 0 0 1 22 76C22 52 50 24 50 24Z" fill="url(#nx-bd-c)" />
      <path d="M55 42L35 78H49L44 104L67 66H52Z" fill="#fff" />
    </svg>
  );
}

/* ---------- hero ---------- */
function Hero({ hashtags }) {
  const tags = String(hashtags || "").split(/[\s,]+/).filter(Boolean).map((t) => t.replace(/^#/, ""));
  return (
    <section className="relative mx-auto max-w-4xl px-4 pb-8 pt-10 md:pt-24 md:text-center">
      <div className="nx-rise relative z-10 flex flex-col items-start md:items-center">
        <span className="relative inline-flex w-full items-center gap-2 whitespace-nowrap rounded-full border border-emerald-700/25 bg-white/50 py-2.5 pl-4 pr-4 font-mono text-[10.5px] font-bold uppercase tracking-[0.1em] text-emerald-800 backdrop-blur sm:w-auto sm:text-[11px] sm:tracking-[0.16em]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-600" />
          Sân chơi dành riêng cho Gaming Creator
          <GameBlock className="nx-float pointer-events-none absolute -left-4 -top-7 z-20 h-14 w-14 -rotate-6" />
        </span>

        <div className="relative mt-7 w-full md:w-auto">
          <BoltDrop className="nx-float-2 pointer-events-none absolute -right-2 top-[46%] z-0 h-20 w-16 sm:h-28 sm:w-24 md:-right-28 md:top-1/2 md:-translate-y-1/2" />
          <h1 className={`relative z-10 text-[2.3rem] leading-[1.14] sm:text-6xl md:text-7xl ${INK}`}>
            Chơi game. Quay clip.
            <span className={`block ${GRAD_TEXT}`}>Biến view thành tiền.</span>
          </h1>
        </div>

        <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.95] text-slate-600 md:text-lg">
          Dành cho các <b className={INK}>Gamer</b> và <b className={INK}>Creator</b>. Làm video review/trải nghiệm
          game trên <b className={INK}>Nxx315 Studio</b> kèm hashtag{" "}
          {tags.map((t) => (
            <span
              key={t}
              className="mx-0.5 my-0.5 inline-flex items-center gap-0.5 rounded-xl border border-emerald-700/25 bg-white/50 px-3 py-1 align-middle font-mono text-sm font-bold text-emerald-800"
            >
              <Hash size={14} />{t}
            </span>
          ))}{" "}
          lên TikTok/YouTube để nhận <b className={INK}>Gift Code VIP</b> và <b className={INK}>tiền mặt</b> mỗi tháng.
          Clip chất lượng + view căng = thưởng nặng!
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-3 rounded-[1.25rem] bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-4 text-lg font-extrabold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/50"
          >
            <Sparkles size={20} /> Gia nhập ngay
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#ranking"
            className={`${GLASS} flex items-center justify-center gap-2 rounded-[1.25rem] px-8 py-4 text-lg font-semibold ${INK} transition hover:-translate-y-0.5`}
          >
            <Trophy size={20} className="text-amber-500" /> Xem bảng xếp hạng
          </a>
        </div>

        <p className="mt-6 font-mono text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
          ▸ Miễn phí · Không giới hạn số video · Trả thưởng minh bạch
        </p>
      </div>
    </section>
  );
}

/* ---------- ticker + stats ---------- */
function Ticker() {
  const games = ["Roblox", "Free Fire", "Genshin Impact", "Liên Quân", "PUBG Mobile", "Minecraft", "Mobile Legends", "Honkai Star Rail"];
  const row = [...games, ...games];
  return (
    <div className="relative my-6 overflow-hidden border-y border-emerald-900/10 bg-white/50 py-4 backdrop-blur">
      <div style={{ maskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)", WebkitMaskImage: "linear-gradient(90deg,transparent,#000 10%,#000 90%,transparent)" }}>
      <div className="nx-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((g, i) => (
          <span key={i} className="flex items-center gap-10 text-xl font-black text-emerald-900/30 sm:text-2xl">
            {g}
            <Sparkles size={18} className="text-emerald-500/60" />
          </span>
        ))}
      </div>
      </div>
    </div>
  );
}

function StatsStrip({ stats }) {
  const items = [
    [Users, "Người tham gia", stats?.creators],
    [Film, "Video đã duyệt", stats?.videos],
    [Coins, "Giải thưởng đã tặng", stats?.coins],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className={`${GLASS} grid grid-cols-3 divide-x divide-emerald-900/10 rounded-[2rem] py-6 md:py-9`}>
        {items.map(([Icon, label, value]) => (
          <div key={label} className="flex flex-col items-center px-2 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-500/30">
              <Icon size={19} />
            </span>
            <p className={`text-2xl font-black sm:text-4xl ${INK}`}>{stats ? fmtNum(value) : "—"}</p>
            <p className="mt-1 text-[11px] font-semibold leading-tight text-slate-500 sm:text-sm">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ---------- page ---------- */
export default function Landing() {
  const stats = usePublicStats();
  return (
    <div className="relative min-h-screen overflow-x-hidden nx-root bg-[#eaf6f3] text-slate-800 selection:bg-emerald-300/50">
      <style>{CSS}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0" style={{ background: "linear-gradient(180deg,#a7d2c2 0,#e3f3ee 900px,#eaf6f3 55%,#cdeaf0 100%)" }} />
        <div className="absolute left-1/2 top-24 h-[380px] w-[380px] -translate-x-1/2 rounded-full bg-white/60 blur-[100px]" />
        <div className="absolute -right-32 top-[30rem] h-[460px] w-[460px] rounded-full bg-[#9edbe6]/60 blur-[120px]" />
        <div className="absolute -left-32 top-[70rem] h-[460px] w-[460px] rounded-full bg-[#a7d2c2]/60 blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: "radial-gradient(rgba(6,78,59,.18) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
        />
      </div>

      <Header />
      <main className="relative z-10">
        <Hero hashtags={stats?.settings?.hashtags || "#Nxx315Studio"} />
        <Ticker />
        <StatsStrip stats={stats} />
        <HowItWorks />
        <Features />
        <Ranking stats={stats} />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </div>
  );
              }
      
