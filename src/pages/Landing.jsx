import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LogIn, ArrowRight, Sparkles, Users, Film, Coins,
  Gift, Play, ShieldCheck, Trophy, Hash, Gamepad2, Zap, Home
} from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";
// Vẫn giữ nguyên import các component con
import HowItWorks from "../components/landing/HowItWorks.jsx";
import Features from "../components/landing/Features.jsx";
import Ranking from "../components/landing/Ranking.jsx";
import Faq from "../components/landing/Faq.jsx";
import { FinalCta, Footer } from "../components/landing/Footer.jsx";

/* ---------- helpers ---------- */
const CSS = `
@keyframes nx-marquee { to { transform: translateX(-50%); } }
@keyframes nx-rise { from { opacity: 0; transform: translateY(22px); } to { opacity: 1; transform: none; } }
.nx-marquee { animation: nx-marquee 28s linear infinite; }
.nx-rise { animation: nx-rise .8s cubic-bezier(.2,.7,.2,1) both; }
@media (prefers-reduced-motion: reduce) {
  .nx-marquee, .nx-rise { animation: none; }
}
`;

const INK = "text-[#064e3b]";
const GLASS = "border border-white/60 bg-white/60 backdrop-blur-xl";
const GRAD_TEXT = "bg-gradient-to-r from-cyan-500 to-blue-500 bg-clip-text text-transparent";

function fmtNum(n) {
  if (!n) return "0";
  if (n >= 1000000) return (n / 1000000).toFixed(1) + "M";
  if (n >= 1000) return (n / 1000).toFixed(1) + "K";
  return String(n);
}

function usePublicStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    supabase.rpc("get_creator_public_stats").then(({ data }) => {
      if (data?.ok) setStats(data);
    });
  }, []);
  return stats;
}

/* ---------- HEADER (ĐÃ RÚT GỌN) ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="flex items-center gap-2 text-[20px] font-extrabold tracking-tight text-slate-900">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-md">
            <Gamepad2 size={18} />
          </div>
          Nxx315 <span className="text-cyan-600">Creator</span>
        </Link>
        
        {/* Chỉ giữ lại nút Đăng nhập, bỏ hết link thừa */}
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:shadow-cyan-500/50"
        >
          <LogIn size={16} /> Đăng nhập
        </Link>
      </div>
    </header>
  );
}

/* ---------- HERO (ĐÃ RÚT GỌN, XÓA TICKETMOCK) ---------- */
function Hero({ hashtags }) {
  const tags = String(hashtags || "").split(/[\s,]+/).filter(Boolean);
  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-center px-4 pb-12 pt-12 text-center md:pt-20">
      <Gamepad2 className="pointer-events-none absolute left-0 top-6 h-32 w-32 rotate-12 text-cyan-700/[0.04]" />
      <Zap className="pointer-events-none absolute right-0 top-48 h-40 w-40 -rotate-12 text-blue-600/[0.05]" />

      <div className="nx-rise relative z-10 flex flex-col items-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-cyan-600/25 bg-white/70 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-700 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
          </span>
          Sân chơi dành riêng cho Creator
        </span>

        <h1 className={`mt-6 text-[2.7rem] font-black leading-[1.1] tracking-tight sm:text-6xl ${INK}`}>
          Sáng tạo. Kết nối.<br />
          <span className={`mt-1 block ${GRAD_TEXT}`}>Nhận thu nhập.</span>
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-relaxed text-slate-600">
          Làm video review, trải nghiệm trên <strong className={INK}>Nxx315 Studio</strong>, gắn hashtag
          rồi đua top bảng xếp hạng để nhận <strong className={INK}>code xu</strong> và{" "}
          <strong className={INK}>tiền mặt</strong> mỗi tháng.
        </p>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <Hash size={12} /> Gắn hashtag
            </span>
            {tags.map((t) => (
              <span key={t} className="rounded-xl border border-cyan-600/20 bg-cyan-500/10 px-3 py-1.5 font-mono text-xs font-bold text-cyan-800">
                {t.startsWith("#") ? t : "#" + t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-500 px-8 py-4 text-base font-extrabold text-white shadow-xl shadow-cyan-500/30 transition hover:-translate-y-0.5 hover:shadow-cyan-500/50"
          >
            <Sparkles size={18} /> Gia nhập ngay
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#ranking"
            className={`${GLASS} flex items-center justify-center gap-2 rounded-2xl px-8 py-4 text-base font-bold ${INK} transition hover:-translate-y-0.5`}
          >
            <Trophy size={18} className="text-amber-500" /> Xem bảng xếp hạng
          </a>
        </div>

        <p className="mt-6 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" />
          Miễn phí · Không giới hạn số video · Trả thưởng minh bạch
        </p>
      </div>
    </section>
  );
}

/* ---------- TICKER & STATS (Giữ nguyên) ---------- */
function Ticker() {
  const games = ["Roblox", "Free Fire", "Genshin Impact", "Liên Quân", "PUBG Mobile", "Minecraft", "Mobile Legends", "Honkai Star Rail"];
  const row = [...games, ...games];
  return (
    <div className="relative my-6 overflow-hidden border-y border-cyan-900/10 bg-white/50 py-4 backdrop-blur">
      <div className="nx-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((g, i) => (
          <span key={i} className="flex items-center gap-10 text-xl font-black text-cyan-900/30 sm:text-2xl">
            {g}
            <Sparkles size={18} className="text-cyan-500/60" />
          </span>
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#e6f6f0] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#e6f6f0] to-transparent" />
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
    <section className="mx-auto max-w-4xl px-4 py-6">
      <div className={`${GLASS} grid grid-cols-3 divide-x divide-cyan-900/10 rounded-[2rem] py-6 md:py-9`}>
        {items.map(([Icon, label, value]) => (
          <div key={label} className="flex flex-col items-center px-2 text-center">
            <span className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-md shadow-cyan-500/30">
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

/* ---------- PAGE ---------- */
export default function Landing() {
  const stats = usePublicStats();
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#e6f6f0] font-sans text-slate-800 selection:bg-cyan-300/50">
      <style>{CSS}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[900px] bg-gradient-to-b from-cyan-200/70 via-blue-100/50 to-transparent" />
        <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-cyan-300/40 blur-[110px]" />
        <div className="absolute -right-24 top-[28rem] h-[420px] w-[420px] rounded-full bg-blue-300/40 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
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

