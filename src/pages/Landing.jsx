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
  Play,
  ShieldCheck,
  Trophy,
  Hash,
  Gamepad2,
  Zap
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
    <header className="sticky top-0 z-40 border-b border-white/5 bg-[#0a1214]/90 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <Link to="/" className="transition-transform hover:scale-105">
          <Logo />
        </Link>
        <nav className="hidden items-center gap-8 text-sm font-semibold text-slate-300 md:flex">
          {links.map(([href, label]) => (
            <a key={href} href={href} className="transition-colors hover:text-emerald-400">
              {label}
            </a>
          ))}
        </nav>
        <Link
          to="/login"
          className="flex items-center gap-1.5 whitespace-nowrap rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs sm:text-sm font-bold text-emerald-400 transition-all hover:bg-emerald-500 hover:text-white"
        >
          <LogIn size={15} /> Đăng nhập
        </Link>
      </div>
    </header>
  );
}

function TicketMock() {
  return (
    <div className="relative mx-auto w-full max-w-sm group perspective-1000 mt-8 md:mt-0">
      <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-emerald-500/30 via-teal-500/10 to-transparent blur-2xl transition-all group-hover:bg-emerald-500/40" />
      
      <div className="relative rotate-1 rounded-3xl border border-white/10 bg-gradient-to-b from-[#0f1c1e] to-[#0a1214] p-5 sm:p-6 shadow-2xl transition-transform duration-300 group-hover:rotate-0">
        <div className="flex items-center justify-between">
          <span className="flex items-center gap-2 text-sm font-bold text-white">
            <span className="flex h-6 w-6 items-center justify-center rounded bg-red-500/20 text-red-500">
               <Play size={10} fill="currentColor" />
            </span>
            TikTok Video
          </span>
          <span className="flex items-center gap-1 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] sm:text-[11px] font-bold text-emerald-400">
            <ShieldCheck size={12} /> Đã duyệt
          </span>
        </div>
        
        <div className="mt-4 aspect-[4/3] sm:aspect-video rounded-xl bg-black/40 border border-white/5 flex items-center justify-center relative overflow-hidden">
           <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
           <p className="relative z-10 px-4 text-center text-xs sm:text-sm font-medium text-slate-300 line-clamp-2">
             "Trải nghiệm Nxx315 Studio cực mượt, anh em creator nên thử ngay! #Nxx315Creator"
           </p>
        </div>

        <div className="mt-4 flex justify-between text-xs font-semibold text-slate-400 px-1">
          <span className="flex items-center gap-1.5"><Eye size={14} className="text-emerald-400" /> 124.5K</span>
          <span className="flex items-center gap-1.5"><Heart size={14} className="text-emerald-400" /> 8.6K</span>
          <span className="flex items-center gap-1.5"><MessageCircle size={14} className="text-emerald-400" /> 420</span>
        </div>

        <div className="mt-5 rounded-2xl border border-dashed border-emerald-500/30 bg-emerald-500/[0.03] p-4 relative overflow-hidden">
          <div className="absolute -left-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#0a1214]"></div>
          <div className="absolute -right-2 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full bg-[#0a1214]"></div>
          
          <div className="flex items-center justify-between text-xs mb-2">
            <span className="flex items-center gap-1.5 font-bold text-emerald-400 uppercase tracking-wider">
              <Gift size={14} /> Phần thưởng
            </span>
            <span className="rounded-full bg-amber-400/10 px-2 py-0.5 font-bold text-amber-400 border border-amber-400/20">+100 Xu</span>
          </div>
          <p className="rounded-xl bg-black/50 py-2.5 text-center font-mono text-xs sm:text-sm font-bold tracking-[0.2em] text-white border border-white/5">
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
    <section className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 pb-12 pt-10 md:grid-cols-2 md:pt-20 md:gap-16">
      
      {/* HỌA TIẾT NỀN MỜ (Giống ảnh mẫu) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-0">
        <Gamepad2 className="absolute -left-10 top-10 h-32 w-32 text-white/[0.03] rotate-12" />
        <Zap className="absolute right-10 top-40 h-40 w-40 text-emerald-500/[0.03] -rotate-12" />
      </div>

      <div className="relative z-10 flex flex-col items-start">
        {/* Badge có thêm icon nhỏ xíu giống ảnh 2 */}
        <span className="relative inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1.5 text-[10px] sm:text-[11px] font-bold uppercase tracking-widest text-emerald-400">
          <Sparkles size={13} /> 
          Hệ sinh thái Gaming Creator
          <span className="absolute -left-2 -top-2 text-emerald-500/50">
            <Gamepad2 size={16} />
          </span>
        </span>
        
        <h1 className="mt-6 font-black tracking-tight text-white relative flex flex-col gap-1">
  <span className="text-[8vw] sm:text-5xl lg:text-6xl leading-[1.1] whitespace-nowrap">
    Chơi game. Quay clip.
  </span>
  <span className="text-[2.1rem] sm:text-5xl lg:text-6xl leading-[1.15] bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(16,185,129,0.2)]">
    Biến view thành <br className="sm:hidden" /> tiền.
  </span>
</h1>
      
        <p className="mt-5 max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base">
          Dành cho các Gamer và Creator đam mê sáng tạo. Làm video review/trải nghiệm trên Nxx315 Studio, đua top bảng xếp hạng để nhận <strong className="text-white">ngày dùng VIP</strong> và <strong className="text-white">tiền mặt cực khủng</strong> mỗi tháng.
        </p>

        {tags.length > 0 && (
          <div className="mt-6 flex flex-wrap items-center gap-2">
            {/* Thêm icon Hash nhỏ trước chữ GẮN HASHTAG */}
            <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-widest text-slate-500 w-full sm:w-auto mb-1 sm:mb-0">
              <Hash size={12} /> Gắn hashtag:
            </span>
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-1.5 font-mono text-xs font-bold text-emerald-300"
              >
                {t.startsWith("#") ? t : "#" + t}
              </span>
            ))}
          </div>
        )}

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:w-auto">
          <Link
            to="/login"
            className="group flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3.5 text-sm sm:text-base font-bold text-white shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all hover:bg-emerald-400 hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] w-full sm:w-auto"
          >
            {/* Thêm icon Sparkles giống nút "Gia nhập Biệt Đội" ở ảnh 2 */}
            <Sparkles size={18} className="text-white" />
            Gia nhập ngay 
            <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="#ranking"
            className="flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-3.5 text-sm sm:text-base font-bold text-white transition-colors hover:bg-white/10 w-full sm:w-auto"
          >
            {/* Thêm icon Cúp Vàng giống nút "Xem Bảng Xếp Hạng" ở ảnh 2 */}
            <Trophy size={18} className="text-amber-400" />
            Xem Bảng Xếp Hạng
          </a>
        </div>
        
        <p className="mt-4 text-[11px] font-medium text-slate-500 flex flex-wrap items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
          Đăng ký miễn phí · Không giới hạn số video
        </p>
      </div>
      
      <div className="relative z-10 w-full">
        <TicketMock />
      </div>
    </section>
  );
}

function StatsStrip({ stats }) {
  const items = [
    [Users, "Người tham gia", stats?.creators],
    [Film, "Video đã duyệt", stats?.videos],
    [Coins, "Giải thưởng đã tặng", stats?.coins],
  ];
  return (
    <section className="mx-auto max-w-6xl px-4 py-8 relative z-10">
      <div className="grid grid-cols-3 gap-2 sm:gap-4 rounded-[2rem] border border-white/5 bg-gradient-to-b from-[#0f1c1e] to-[#0a1214] p-4 md:p-8 shadow-xl">
        {items.map(([Icon, label, value]) => (
          <div key={label} className="flex flex-col items-center justify-center text-center">
            <Icon size={20} className="text-emerald-500 mb-2 sm:mb-3 sm:w-6 sm:h-6" />
            <p className="text-xl sm:text-3xl md:text-4xl font-black text-white">{stats ? fmtNum(value) : "—"}</p>
            <p className="mt-1 text-[9px] sm:text-[10px] md:text-xs font-bold uppercase tracking-widest text-slate-500 leading-tight">{label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function Landing() {
  const stats = usePublicStats();
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#0a1214] text-slate-100 font-sans selection:bg-emerald-500/30">
      
      {/* Nền chuyển màu xanh thẫm (Gradient) giống ảnh mẫu 2, thay vì màu đen tuyền */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-to-b from-[#0d211d] to-[#0a1214] opacity-80" />
        <div className="absolute top-[-10%] left-[-10%] h-[300px] w-[300px] sm:h-[500px] sm:w-[500px] rounded-full bg-emerald-500/10 blur-[100px] sm:blur-[120px]" />
        <div className="absolute top-[20%] right-[-10%] h-[300px] w-[300px] sm:h-[400px] sm:w-[400px] rounded-full bg-teal-500/10 blur-[80px] sm:blur-[100px]" />
      </div>
      
      <Header />
      
      <main className="relative z-10">
        <Hero hashtags={stats?.settings?.hashtags || "#Nxx315Creator #Nxx315Studio"} />
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
