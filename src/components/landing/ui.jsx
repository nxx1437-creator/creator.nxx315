import React from "react";
import { Play } from "lucide-react";

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
    <span className="text-lg font-extrabold tracking-tight text-white">
      Nxx315 <span className="text-cyan-400">Creator</span>
    </span>
  );
}
export function SectionTitle({ eyebrow, title, sub, center = true }) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className="text-xs font-bold uppercase tracking-[0.22em] text-cyan-400">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-black tracking-tight text-white md:text-4xl">{title}</h2>
      {sub && <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-slate-400 md:text-base">{sub}</p>}
    </div>
  );
}

export function GlassCard({ children, className = "" }) {
  return (
    <div
      className={`rounded-3xl border border-white/10 bg-gradient-to-b from-[#111C30] to-[#0B1322] ${className}`}
    >
      {children}
    </div>
  );
        }
