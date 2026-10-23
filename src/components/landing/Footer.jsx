import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Logo } from "./ui.jsx";
import { MAIN_SITE } from "../../lib/supabaseClient.js";

export function FinalCta() {
  return (
    <section className="mx-auto max-w-4xl px-4 py-14">
      <div className="relative overflow-hidden rounded-[2rem] border border-cyan-400/20 bg-gradient-to-br from-[#0E2236] to-[#0B1322] px-6 py-12 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(34,211,238,0.14),transparent_65%)]" />
        <h2 className="relative text-3xl font-black text-white md:text-4xl">Video đầu tiên của bạn là gì?</h2>
        <p className="relative mx-auto mt-3 max-w-lg text-sm text-slate-300">
          Đăng nhập bằng Google, liên kết kênh và gửi video. Mất chưa tới vài phút để bắt đầu.
        </p>
        <Link
          to="/login"
          className="relative mt-7 inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-base font-bold text-slate-900"
        >
          Bắt đầu ngay <ArrowRight size={18} />
        </Link>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/10 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-center md:flex-row md:text-left">
        <Logo size={30} />
        <p className="text-xs text-slate-500">
          © {new Date().getFullYear()} Nxx315 Creator · Một phần của{" "}
          <a href={MAIN_SITE} className="font-semibold text-cyan-300">
            Nxx315 Studio
          </a>
        </p>
      </div>
    </footer>
  );
}
