import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";
import { Logo } from "./ui.jsx";
import { MAIN_SITE } from "../../lib/supabaseClient.js";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-500/20 bg-gradient-to-b from-[#0f1c1e] to-[#0a1214] px-6 py-16 text-center shadow-2xl shadow-emerald-900/20">
        {/* Hiệu ứng ánh sáng nền */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]" />
        
        {/* Họa tiết trang trí */}
        <div className="pointer-events-none absolute -left-10 -top-10 text-emerald-500/10">
          <Sparkles size={150} />
        </div>

        <div className="relative z-10">
          <p className="mb-3 text-xs font-bold uppercase tracking-widest text-emerald-400">Chinh phục đỉnh cao</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white drop-shadow-md leading-tight">
         Sẵn sàng lên sóng?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-400 md:text-base">
            Tham gia cộng đồng Creator. Đăng ký miễn phí, không giới hạn số video. Khẳng định đẳng cấp ngay hôm nay.
          </p>
          
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              to="/login"
              className="group flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
            >
              Gia nhập ngay 
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-8 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 py-8 bg-[#0a1214]">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <Logo />
        <p className="text-xs text-slate-500 font-medium">
          © {new Date().getFullYear()} Nxx315 Creator · Một phần của hệ sinh thái{" "}
          <a href={MAIN_SITE} className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
            Nxx315 Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
