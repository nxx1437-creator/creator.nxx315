import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  LogIn,
  ArrowRight,
  Sparkles,
  Users,
  Film,
  Coins,
  Eye,
  Heart,
  MessageCircle,
  Gift,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";
import { Logo, fmtNum } from "../components/landing/ui.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import Features from "../components/landing/Features.jsx";
import Ranking from "../components/landing/Ranking.jsx";
import Faq from "../components/landing/Faq.jsx";
import { FinalCta, Footer } from "../components/landing/Footer.jsx";

function usePublicStats() {
  const [stats, setStats] = useState(null);
  useEffect(() => {
    let alive = true;
    supabase.rpc("get_creator_public_stats").then(({ data }) => {
      if (alive && data?.ok) setStats(data);
    });
    return () => {
      alive = false;
    };
  }, []);
  return stats;
}

function Header() {
  const links = [
    ["#cach-lam", "Cách làm"],
    ["#quyen-loi", "Quyền lợi"],
    ["#ranking", "Xếp hạng"],
    ["#hoi-dap", "Hỏi đáp"],
  ];
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#070B14]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition hover:text-white">
              {label}
            </a>
          ))}
        </nav>
        <Link
          to="/login"
          className="flex items-center gap-2 rounded-full border border-cyan-400/40 bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 transition hover:bg-cyan-400/20"
        >
          <LogIn size={15} /> Đăng nhập
        </Link>
      </div>
    </header>
  );
}

function TicketMock() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -inset-6 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/25 via-transparent to-blue-600/25 blur-2xl" />
      <div className="relative rotate-2 rounded-3xl border border-white/10 bg-gradient-to-b from-[#111C30] to-[#0B1322] p-5 shadow-2xl">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500" /> YouTube
          </span>
          <span className="rounded-full border border-emerald-400/30 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-bold text-emerald-300">
            Đã duyệt
          </span>
        </div>
        <p className="mt-3 text-sm font-medium text-slate-200">
          Mình thử Nxx315 Studio và đây là kết quả #Nxx315Studio
        </p>
        <div className="mt-3 flex gap-4 text-xs font-semibold text-slate-400">
          <span className="flex items-center gap-1">
            <Eye size={13} className="text-cyan-400" /> 12,4K
          </span>
          <span className="flex items-center gap-1">
            <Heart size={13} className="text-cyan-400" /> 860
          </span>
          <span className="flex items-center gap-1">
            <MessageCircle size={13} className="text-cyan-400" /> 42
          </span>
        </div>
        <div className="mt-4 rounded-2xl border border-dashed border-emerald-400/40 bg-emerald-400/5 p-3">
          <div className="flex items-center justify-between text-xs">
            <span className="flex items-center gap-1.5 font-semibold text-emerald-300">
              <Gift size={14} /> Code nhận xu
            </span>
            <span className="rounded-full bg-amber-400/15 px-2 py-0.5 font-bold text-amber-300">+100 xu</span>
          </div>
          <p className="mt-2 rounded-xl bg-black/30 px-3 py-2.5 text-center font-mono text-sm font-bold tracking-wider text-white">
            NXX-7K2M9QXP
          </p>
        </div>
        <p className="mt-3 text-center text-[11px] text-slate-500">Ví dụ minh hoạ</p>
      </div>
    </div>
  );
}

function Hero({ hashtags }) {
  const tags = String(hashtags || "").split(/[\s,]+/).filter(Boolean);
  return (
    <section className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 pb-10 pt-12 md:grid-cols-2 md:pt-20">
      <div>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300">
          <Sparkles size={13} className="text-amber-300" /> Chương trình Creator của Nxx315 Studio
        </span>
        <h1 className="mt-5 text-4xl font-black leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-6xl">
          Đăng video hay.
          <br />
          <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
            Nhận code xu.
          </span>
        </h1>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-slate-300">
          Giới thiệu Nxx315 Studio trên kênh TikTok hoặc YouTube của bạn. Mỗi video được duyệt sẽ nhận một code
          xu, và đua top mỗi tháng để rinh thêm giải.
        </p>

        {tags.length > 0 && (
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-slate-500">Gắn hashtag</span>
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 font-mono text-xs font-bold text-cyan-200"
              >
                {t.startsWith("#") ? t : "#" + t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/login"
            className="flex items-center justify-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-blue-600 px-7 py-3.5 text-base font-bold text-white shadow-lg shadow-cyan-500/20"
          >
            Tham gia bằng Google <ArrowRight size={18} />
          </Link>
          <a
            href="#ranking"
            className="flex items-center justify-center rounded-full border border-white/15 px-7 py-3.5 text-base font-semibold text-slate-200 transition hover:bg-white/5"
          >
            Xem bảng xếp hạng
          </a>
        </div>
        <p className="mt-4 text-xs text-slate-500">Miễn phí tham gia · Admin xem từng video · Code xu hiện ngay khi được duyệt</p>
      </div>
      <TicketMock />
    </section>
  );
}

function StatsStrip({ stats }) {
  const items = [
    [Users, "Creator tham gia", stats?.creators],
    [Film, "Video đã duyệt", stats?.videos],
    [Coins, "Xu đã tặng", stats?.coins],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-3 gap-3 rounded-3xl border border-white/10 bg-white/[0.03] p-3 md:gap-6 md:p-5">
        {items.map(([Icon, label, value]) => (
          <div key={label} className="rounded-2xl bg-black/20 px-3 py-4 text-center">
            <Icon size={20} className="mx-auto text-cyan-400" />
            <p className="mt-2 text-2xl font-black text-white md:text-3xl">{stats ? fmtNum(value) : "—"}</p>
            <p className="mt-1 text-[11px] font-medium uppercase tracking-wider text-slate-500">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Landing() {
  const stats = usePublicStats();
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#070B14] text-slate-100">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[600px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.16),transparent_60%)]" />
      <Header />
      <main className="relative">
        <Hero hashtags={stats?.settings?.hashtags || "#Nxx315Studio"} />
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
