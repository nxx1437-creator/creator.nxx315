import React from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Sparkles,
  Trophy,
  MessageSquare,
} from "lucide-react";
import { Logo } from "./ui.jsx";
import { MAIN_SITE } from "../../lib/supabaseClient.js";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-5xl px-4 py-16">
      <div className="relative isolate overflow-hidden rounded-[2rem] border border-emerald-400/20 bg-gradient-to-br from-[#063b2e] via-[#092c2b] to-[#08252d] px-5 py-16 text-center shadow-2xl shadow-emerald-950/40 sm:px-10 sm:py-20">

        {/* Ánh sáng nền */}
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_left,rgba(16,185,129,0.3),transparent_55%),radial-gradient(ellipse_at_bottom_right,rgba(6,182,212,0.2),transparent_55%)]" />

        {/* Họa tiết trang trí */}
        <Sparkles
          size={150}
          className="pointer-events-none absolute -left-8 -top-8 -z-10 text-emerald-300/[0.08]"
        />

        <div className="relative z-10">
          {/* Biểu tượng */}
          <Trophy
            size={42}
            className="mx-auto mb-5 text-amber-400"
          />

          {/* Tiêu đề phụ */}
          <p className="mb-5 text-xs font-extrabold uppercase tracking-[0.3em] text-emerald-300 sm:text-sm">
            Chinh phục đỉnh cao
          </p>

          {/* Tiêu đề chính */}
          <h2 className="whitespace-nowrap text-center text-[clamp(1.65rem,6vw,3.75rem)] font-bold tracking-tight text-white">
  Sẵn sàng{" "}
  <span className="bg-gradient-to-r from-emerald-300 via-teal-200 to-cyan-300 bg-clip-text text-transparent">
    lên sóng?
  </span>
</h2>

          {/* Mô tả */}
          <p className="mx-auto mt-7 max-w-xl text-base leading-relaxed text-slate-300 sm:text-lg">
            Tham gia cộng đồng Creator.
            Đăng ký miễn phí, không giới hạn số video.
            Khẳng định đẳng cấp của bạn ngay hôm nay.
          </p>

          {/* Nút hành động */}
          <div className="mx-auto mt-10 flex max-w-lg flex-col items-center gap-4">
            <Link
              to="/login"
              className="group flex min-h-[68px] w-full items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-5 text-lg font-extrabold text-white shadow-lg shadow-emerald-950/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-500/20"
            >
              <Sparkles size={22} />

              <span>Gia nhập ngay</span>

              <ArrowRight
                size={23}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="flex min-h-[64px] w-full items-center justify-center gap-3 rounded-2xl border border-white/15 bg-white/[0.04] px-6 py-4 text-lg font-bold text-white transition-all duration-300 hover:border-emerald-400/40 hover:bg-white/[0.08]"
            >
              <span>Đăng nhập</span>
            </Link>
          </div>

          {/* Thông điệp cuối */}
          <div className="mt-12 flex items-center justify-center gap-3 text-xs font-bold uppercase tracking-[0.2em] text-emerald-200/60 sm:text-sm">
            <MessageSquare size={18} />

            <span>Cùng nhau phát triển</span>
          </div>
        </div>

        {/* Đường sáng phía dưới */}
        <div className="pointer-events-none absolute inset-x-8 bottom-0 h-[3px] rounded-full bg-gradient-to-r from-transparent via-cyan-400 to-transparent" />
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0a1214] py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <Logo />

        <p className="text-xs font-medium text-slate-500">
          © {new Date().getFullYear()} Nxx315 Creator · Một phần của hệ sinh thái{" "}
          <a
            href={MAIN_SITE}
            className="font-bold text-emerald-400 transition-colors hover:text-emerald-300"
          >
            Nxx315 Studio
          </a>
        </p>
      </div>
    </footer>
  );
          }
