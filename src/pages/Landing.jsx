import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LogIn, ArrowRight, Sparkles, Users, Film, Coins,
  Gift, Play, ShieldCheck, Trophy, Hash, Gamepad2, Zap,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";
import { Logo, fmtNum, INK, GLASS, GRAD_TEXT } from "../components/landing/ui.jsx";
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

/* ---------- HEADER (SỬA LẠI NÚT ĐĂNG NHẬP) ---------- */
function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/"><Logo /></Link>
        {/* Bỏ thanh menu, chỉ giữ nút đăng nhập nhỏ gọn */}
        <Link
          to="/login"
          className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5"
        >
          <LogIn size={14} /> Đăng nhập
        </Link>
      </div>
    </header>
  );
}

/* ---------- HERO (SỬA LẠI CHỮ KHÔNG BỊ VỠ) ---------- */
function Hero({ hashtags }) {
  const tags = String(hashtags || "").split(/[\s,]+/).filter(Boolean);
  return (
    <section className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-8 pt-8 sm:pt-12 text-center">
      <Gamepad2 className="pointer-events-none absolute left-0 top-6 h-24 w-24 rotate-12 text-emerald-700/[0.06]" />
      <Zap className="pointer-events-none absolute right-0 top-40 h-32 w-32 -rotate-12 text-teal-600/[0.07]" />

      <div className="nx-rise relative z-10 flex flex-col items-center w-full">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-white/70 px-3.5 py-1.5 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] text-emerald-700 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Sân chơi dành riêng cho Gaming Creator
        </span>

        <h1 className={`mt-6 text-[2.6rem] sm:text-6xl font-black leading-[1.15] tracking-tight ${INK}`}>
          Chơi game. Quay clip.
          <span className={`mt-1 block ${GRAD_TEXT}`}>Biến view thành tiền.</span>
        </h1>

        <p className="mt-5 max-w-[90%] sm:max-w-xl text-[15px] sm:text-base leading-relaxed text-slate-600">
          Làm video review, trải nghiệm game trên <strong className={INK}>Nxx315 Studio</strong>, gắn hashtag
          rồi đua top bảng xếp hạng để nhận <strong className={INK}>ngày dùng VIP</strong> và{" "}
          <strong className={INK}>tiền mặt</strong> mỗi tháng. Clip chất lượng + view căng = thưởng nặng.
        </p>

        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1 font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-slate-500">
              <Hash size={12} /> Gắn hashtag
            </span>
            {tags.map((t) => (
              <span key={t} className="rounded-xl border border-emerald-600/20 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-bold text-emerald-800">
                {t.startsWith("#") ? t : "#" + t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex w-full max-w-xs flex-col gap-3">
          <Link
            to="/login"
            className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5"
          >
            <Sparkles size={18} /> Gia nhập ngay
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#ranking"
            className={`${GLASS} flex w-full items-center justify-center gap-2 rounded-2xl px-6 py-4 text-base font-bold ${INK} transition hover:-translate-y-0.5`}
          >
            <Trophy size={18} className="text-amber-500" /> Xem bảng xếp hạng
          </a>
        </div>

        <p className="mt-5 flex flex-wrap items-center justify-center gap-2 font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Miễn phí · Không giới hạn số video · Trả thưởng minh bạch
        </p>
      </div>
    </section>
  );
}

/* ---------- TICKER & STATS (GIỮ NGUYÊN) ---------- */
function Ticker() {
  const games = ["Roblox", "Free Fire", "Genshin Impact", "Liên Quân", "PUBG Mobile", "Minecraft", "Mobile Legends", "Honkai Star Rail"];
  const row = [...games, ...games];
  return (
    <div className="relative my-4 overflow-hidden border-y border-emerald-900/10 bg-white/50 py-3 backdrop-blur">
      <div className="nx-marquee flex w-max items-center gap-8 whitespace-nowrap">
        {row.map((g, i) => (
          <span key={i} className="flex items-center gap-8 text-lg font-black text-emerald-900/30 sm:text-2xl">
            {g}
            <Sparkles size={16} className="text-emerald-500/60" />
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
    <section className="mx-auto max-w-6xl px-4 py-4">
      <div className={`${GLASS} grid grid-cols-3 divide-x divide-emerald-900/10 rounded-[2rem] py-5 md:py-8`}>
        {items.map(([Icon, label, value]) => (
          <div key={label} className="flex flex-col items-center px-2 text-center">
            <span className="mb-2 flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 text-white shadow-md shadow-emerald-500/30">
              <Icon size={16} />
            </span>
            <p className={`text-xl sm:text-3xl font-black ${INK}`}>{stats ? fmtNum(value) : "—"}</p>
            <p className="mt-1 text-[10px] sm:text-xs font-semibold leading-tight text-slate-500">{label}</p>
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#e6f6f0] font-sans text-slate-800 selection:bg-emerald-300/50">
      <style>{CSS}</style>

      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[600px] bg-gradient-to-b from-emerald-200/70 via-teal-100/50 to-transparent" />
        <div className="absolute -left-24 top-10 h-[300px] w-[300px] rounded-full bg-emerald-300/40 blur-[80px]" />
        <div className="absolute -right-24 top-[20rem] h-[300px] w-[300px] rounded-full bg-sky-300/40 blur-[80px]" />
        <div
          className="absolute inset-0 opacity-[0.3]"
          style={{ backgroundImage: "radial-gradient(rgba(6,78,59,.15) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
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

