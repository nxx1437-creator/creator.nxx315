import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LogIn, ArrowRight, Sparkles, Users, Film, Coins, Eye, Heart, MessageCircle,
  Gift, Play, ShieldCheck, Trophy, Hash, Gamepad2, Zap, Crown,
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
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/"><Logo /></Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-600 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-emerald-600">{label}</a>
          ))}
        </nav>
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 px-5 py-2.5 text-sm font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/50"
        >
          <LogIn size={16} /> Đăng nhập
        </Link>
      </div>
    </header>
  );
}

/* ---------- hero ---------- */
function TicketMock() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 rounded-[3rem] bg-gradient-to-tr from-emerald-300/50 via-teal-200/40 to-sky-300/40 blur-3xl" />

      <div className="nx-float absolute -left-3 -top-5 z-20 flex items-center gap-2 rounded-2xl border border-white bg-white/90 px-3 py-2 shadow-xl sm:-left-8">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-100 text-amber-600"><Crown size={15} /></span>
        <span className="text-xs font-extrabold text-slate-800">Top 1 tháng</span>
      </div>
      <div className="nx-float-2 absolute -bottom-4 -right-2 z-20 flex items-center gap-2 rounded-2xl border border-white bg-white/90 px-3 py-2 shadow-xl sm:-right-6">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600"><Zap size={15} /></span>
        <span className="text-xs font-extrabold text-slate-800">Bot cập nhật 24/7</span>
      </div>

      <div className={`${GLASS} relative rotate-1 rounded-[2rem] p-5 transition-transform duration-300 hover:rotate-0 sm:p-6`}>
        <div className="flex items-center justify-between">
          <span className={`flex items-center gap-2 text-sm font-extrabold ${INK}`}>
            <span className="flex h-6 w-6 items-center justify-center rounded-md bg-red-100 text-red-500">
              <Play size={10} fill="currentColor" />
            </span>
            TikTok Video
          </span>
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-700">
            <ShieldCheck size={12} /> Đã duyệt
          </span>
        </div>

        <div className="relative mt-4 flex aspect-video items-center justify-center overflow-hidden rounded-2xl bg-gradient-to-br from-[#0b2e27] to-[#0f4a40]">
          <Gamepad2 className="absolute -right-4 -top-4 h-24 w-24 rotate-12 text-white/5" />
          <p className="relative z-10 line-clamp-2 px-5 text-center text-xs font-medium text-emerald-50 sm:text-sm">
            "Trải nghiệm Nxx315 Studio cực mượt, anh em creator nên thử ngay! #Nxx315Creator"
          </p>
        </div>

        <div className="mt-4 flex justify-between px-1 text-xs font-bold text-slate-500">
          <span className="flex items-center gap-1.5"><Eye size={14} className="text-emerald-500" /> 124.5K</span>
          <span className="flex items-center gap-1.5"><Heart size={14} className="text-emerald-500" /> 8.6K</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-emerald-500" /> 420</span>
        </div>

        <div className="relative mt-5 rounded-2xl border border-dashed border-emerald-500/40 bg-emerald-50/80 p-4">
          <span className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#e6f6f0]" />
          <span className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#e6f6f0]" />
          <div className="mb-2 flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-700">
              <Gift size={14} /> Phần thưởng
            </span>
            <span className="rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 font-extrabold text-amber-600">+100 Xu</span>
          </div>
          <p className="rounded-xl bg-white py-2.5 text-center font-mono text-sm font-bold tracking-[0.2em] text-slate-800 shadow-inner">
            NXX-7K2M9QXP
          </p>
        </div>
      </div>
    </div>
  );
}

function Hero({ hashtags }) {
  const tags = String(hashtags || "").split(/[\s,]+/).filter(Boolean);
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-10 pt-10 md:grid-cols-2 md:gap-16 md:pt-20">
      <Gamepad2 className="pointer-events-none absolute -left-6 top-6 h-32 w-32 rotate-12 text-emerald-700/[0.06]" />
      <Zap className="pointer-events-none absolute right-4 top-48 h-40 w-40 -rotate-12 text-teal-600/[0.07]" />

      <div className="nx-rise relative z-10 flex flex-col items-start">
        <span className="inline-flex items-center gap-2 rounded-full border border-emerald-600/25 bg-white/70 px-3.5 py-1.5 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 backdrop-blur">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
          </span>
          Sân chơi dành riêng cho Gaming Creator
        </span>

        <h1 className={`mt-6 text-[2.7rem] font-black leading-[1.05] tracking-tight sm:text-6xl ${INK}`}>
          Chơi game. Quay clip.
          <span className={`mt-1 block ${GRAD_TEXT}`}>Biến view thành tiền.</span>
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-600">
          Làm video review, trải nghiệm game trên <strong className={INK}>Nxx315 Studio</strong>, gắn hashtag
          rồi đua top bảng xếp hạng để nhận <strong className={INK}>ngày dùng VIP</strong> và{" "}
          <strong className={INK}>tiền mặt</strong> mỗi tháng. Clip chất lượng + view căng = thưởng nặng.
        </p>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            <span className="flex w-full items-center gap-1 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 sm:w-auto">
              <Hash size={12} /> Gắn hashtag
            </span>
            {tags.map((t) => (
              <span key={t} className="rounded-xl border border-emerald-600/20 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-bold text-emerald-800">
                {t.startsWith("#") ? t : "#" + t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-7 py-4 text-base font-extrabold text-white shadow-xl shadow-emerald-500/30 transition hover:-translate-y-0.5 hover:shadow-emerald-500/50"
          >
            <Sparkles size={18} /> Gia nhập ngay
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#ranking"
            className={`${GLASS} flex items-center justify-center gap-2 rounded-2xl px-7 py-4 text-base font-bold ${INK} transition hover:-translate-y-0.5`}
          >
            <Trophy size={18} className="text-amber-500" /> Xem bảng xếp hạng
          </a>
        </div>

        <p className="mt-5 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-500">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
          Miễn phí · Không giới hạn số video · Trả thưởng minh bạch
        </p>
      </div>

      <div className="relative z-10 w-full">
        <TicketMock />
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
      <div className="nx-marquee flex w-max items-center gap-10 whitespace-nowrap">
        {row.map((g, i) => (
          <span key={i} className="flex items-center gap-10 text-xl font-black text-emerald-900/30 sm:text-2xl">
            {g}
            <Sparkles size={18} className="text-emerald-500/60" />
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#e6f6f0] font-sans text-slate-800 selection:bg-emerald-300/50">
      <style>{CSS}</style>

      {/* nền mint gradient + chấm lưới */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-x-0 top-0 h-[900px] bg-gradient-to-b from-emerald-200/70 via-teal-100/50 to-transparent" />
        <div className="absolute -left-24 top-10 h-[420px] w-[420px] rounded-full bg-emerald-300/40 blur-[110px]" />
        <div className="absolute -right-24 top-[28rem] h-[420px] w-[420px] rounded-full bg-sky-300/40 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{ backgroundImage: "radial-gradient(rgba(6,78,59,.18) 1px, transparent 1px)", backgroundSize: "26px 26px" }}
        />
      </div>

      <Header />
      <main className="relative z-10">
        <Hero hashtags={stats?.settings?.hashtags || "#Nxx315Creator #Nxx315Studio"} />
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

