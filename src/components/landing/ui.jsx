import React from "react";

export const fmtNum = (n) => Number(n || 0).toLocaleString("vi-VN");

export const timeAgo = (iso) => {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "vừa xong";
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  return `${Math.floor(s / 86400)} ngày trước`;
};

export function Logo() {
  return (
    <span className="text-xl font-black tracking-tight text-white flex items-center gap-2">
      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>
      </span>
      Nxx315 <span className="text-emerald-400">Creator</span>
    </span>
  );
}

export function SectionTitle({ eyebrow, title, sub, center = true }) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-emerald-500">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-4xl lg:text-5xl">{title}</h2>
      {sub && <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">{sub}</p>}
    </div>
  );
}

export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-[2rem] border border-white/5 bg-gradient-to-b from-[#0f1c1e] to-[#0a1214] shadow-xl shadow-black/50 ${className}`}
    >
      {children}
    </div>
  );
}
