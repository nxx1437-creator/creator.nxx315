import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, Trophy, MessageSquare, Gamepad2, LogIn } from "lucide-react";
import { Logo } from "./ui.jsx";
import { MAIN_SITE } from "../../lib/supabaseClient.js";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 px-5 py-16 text-center text-white shadow-2xl shadow-emerald-500/30 sm:px-10 sm:py-20">
        <Gamepad2 className="pointer-events-none absolute -left-6 -top-6 -z-10 h-44 w-44 rotate-12 text-white/10" />
        <Trophy className="pointer-events-none absolute -bottom-8 -right-6 -z-10 h-52 w-52 -rotate-12 text-white/10" />

        <div className="relative z-10">
          <span className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-white/20 backdrop-blur">
            <Trophy size={34} className="text-amber-300" />
          </span>

          <p className="mb-4 font-mono text-xs font-bold uppercase tracking-[0.3em] text-emerald-50 sm:text-sm">
            Chinh phục đỉnh cao
          </p>

          <h2 className="whitespace-nowrap text-center text-[clamp(1.9rem,7vw,4rem)] font-black tracking-tight">
            Sẵn sàng lên sóng?
          </h2>

          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-emerald-50 sm:text-lg">
            Tham gia cộng đồng Creator. Đăng ký miễn phí, không giới hạn số video.
            Khẳng định đẳng cấp của bạn ngay hôm nay.
          </p>

          <div className="mx-auto mt-9 flex max-w-lg flex-col items-center gap-3">
            <Link
              to="/login"
              className="group flex min-h-[60px] w-full items-center justify-center gap-3 rounded-2xl bg-white px-6 py-4 text-lg font-extrabold text-emerald-700 shadow-xl transition hover:-translate-y-1"
            >
              <Sparkles size={21} />
              <span>Gia nhập ngay</span>
              <ArrowRight size={22} className="transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
            <Link
              to="/login"
              className="flex min-h-[56px] w-full items-center justify-center gap-2 rounded-2xl border border-white/50 bg-white/10 px-6 py-3 text-lg font-bold backdrop-blur transition hover:bg-white/20"
            >
              <LogIn size={19} /> Đăng nhập
            </Link>
          </div>

          <div className="mt-10 flex items-center justify-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.2em] text-emerald-50/80 sm:text-sm">
            <MessageSquare size={18} />
            <span>Cùng nhau phát triển</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-emerald-900/10 bg-white/60 py-8 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <Logo />
        <p className="text-xs font-medium text-slate-500">
          © {new Date().getFullYear()} Nxx315 Creator · Một phần của hệ sinh thái{" "}
          <a href={MAIN_SITE} className={"font-bold text-emerald-600 transition-colors hover:text-emerald-500"}>
            Nxx315 Studio
          </a>
        </p>
      </div>
    </footer>
  );
              }
