import React from "react";
import { Gamepad2 } from "lucide-react";

export const fmtNum = (n) => Number(n || 0).toLocaleString("vi-VN");

export const timeAgo = (iso) => {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "vừa xong";
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  return `${Math.floor(s / 86400)} ngày trước`;
};

/* Design tokens dùng chung */
export const INK = "text-[#06251f]";
export const GLASS =
  "border border-white/80 bg-white/70 backdrop-blur-xl shadow-[0_12px_40px_-14px_rgba(6,78,59,0.25)]";
export const GRAD_TEXT =
  "bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 bg-clip-text text-transparent";

export function Logo() {
  return (
    <span className="flex shrink-0 items-center gap-2 whitespace-nowrap">
      <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
        <Gamepad2 size={19} />
      </span>
      <span className={`text-base font-black tracking-tight sm:text-lg ${INK}`}>
        Nxx315 <span className="text-emerald-600">Creator</span>
      </span>
    </span>
  );
}

export function Eyebrow({ children, className = "" }) {
  return (
    <span className={`inline-flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-[0.22em] text-emerald-700 ${className}`}>
      <span className="h-px w-7 bg-emerald-600/50" />
      {children}
    </span>
  );
}

export function SectionTitle({ eyebrow, title, sub, center = true }) {
  return (
    <div className={center ? "mx-auto max-w-2xl text-center" : "max-w-2xl"}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className={`mt-4 text-3xl font-black tracking-tight sm:text-5xl ${INK}`}>{title}</h2>
      {sub && <p className="mt-4 text-sm leading-relaxed text-slate-600 md:text-base">{sub}</p>}
    </div>
  );
}

export function GlassCard({ children, className = "" }) {
  return <div className={`${GLASS} rounded-[1.75rem] ${className}`}>{children}</div>;
}



