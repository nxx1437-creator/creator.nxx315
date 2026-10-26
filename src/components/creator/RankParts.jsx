import React, { memo } from "react";
import {
  Eye, Heart, MessageCircle, Film, CheckCircle2, Clock, XCircle, Flame, Gift,
} from "lucide-react";
import { Card, Avatar } from "./creatorUi.jsx";
import { Countdown } from "./OverviewParts.jsx";

export const nf = new Intl.NumberFormat("vi-VN");

export const prizeFor = (prizes, rank) =>
  (prizes || []).find((p) => rank >= p.from && rank <= p.to) || null;

const prizeLabel = (p) => (p.from === p.to ? `Top ${p.from}` : `Top ${p.from}–${p.to}`);

/* ---------- ĐẦU TRANG ---------- */
export const Hero = memo(function Hero({ total }) {
  return (
    <Card>
      <div className="flex flex-wrap items-center gap-2">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-emerald-600">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> SEASON · LIVE
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-slate-500">
          <Flame size={12} className="text-orange-500" /> {total} CREATOR
        </span>
      </div>
      <h1 className="mt-3 bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-4xl font-black text-transparent">
        Bảng xếp hạng
      </h1>
      <p className="mt-1 text-sm text-slate-500">
        Điểm = lượt xem + lượt thích + bình luận của mỗi video đã duyệt.
      </p>
      <div className="mt-4 flex items-center justify-between border-t border-slate-200/60 pt-4">
        <span className="text-[10px] font-bold uppercase text-slate-500">KẾT THÚC SAU</span>
        <Countdown />
      </div>
    </Card>
  );
});

/* ---------- HẠNG CỦA BẠN ---------- */
export const MyRankCard = memo(function MyRankCard({ me, ov, avatar, name, tierName }) {
  const stats = [
    ["VIDEO", Film, ov?.total],
    ["LƯỢT XEM", Eye, ov?.total_views],
    ["LƯỢT THÍCH", Heart, ov?.total_likes],
    ["BÌNH LUẬN", MessageCircle, ov?.total_comments],
  ];
  const status = [
    ["ĐÃ DUYỆT", CheckCircle2, ov?.approved, "border-emerald-200 bg-emerald-50 text-emerald-600"],
    ["ĐANG CHỜ", Clock, ov?.pending, "border-blue-200 bg-blue-50 text-blue-600"],
    ["BỊ LOẠI", XCircle, ov?.rejected, "border-rose-200 bg-rose-50 text-rose-600"],
  ];

  return (
    <Card>
      <div className="flex flex-col items-center">
        <div className="relative">
          <Avatar src={avatar} name={name} size={92} />
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-700 px-2 py-0.5 text-[9px] font-bold uppercase tracking-widest text-white">
            {tierName}
          </span>
        </div>

        <p className="mt-5 font-mono text-[11px] font-bold uppercase tracking-widest text-emerald-600">
          ▸ HẠNG CỦA BẠN
        </p>
        <p className="text-6xl font-black italic text-slate-700">{me ? `#${me.rank}` : "—"}</p>
        <p className="mt-1 truncate text-lg font-bold text-slate-800">{name}</p>
        {!me && (
          <p className="mt-1 text-center text-xs text-slate-500">
            Cần ít nhất 1 video được duyệt trong tháng để lên bảng.
          </p>
        )}
      </div>

      <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 text-center">
        <div>
          <p className="text-[11px] font-bold text-slate-500">ĐIỂM SỐ</p>
          <p className="text-3xl font-black text-cyan-500">{nf.format(me?.points || 0)}</p>
        </div>
        <div>
          <p className="flex items-center justify-center gap-1 text-[11px] font-bold text-slate-500">
            <Gift size={12} /> XU THƯỞNG
          </p>
          <p className="text-3xl font-black text-amber-500">{nf.format(me?.coins || 0)}</p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-4 gap-2 border-t border-slate-100 pt-4">
        {stats.map(([label, Icon, v]) => (
          <div key={label} className="min-w-0">
            <p className="flex items-center gap-1 truncate font-mono text-[9px] font-bold text-slate-400">
              <Icon size={11} className="shrink-0" /> {label}
            </p>
            <p className="mt-1 text-lg font-black text-slate-800">{nf.format(v || 0)}</p>
          </div>
        ))}
      </div>

      <p className="mb-2 mt-5 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
        ▸ TRẠNG THÁI VIDEO
      </p>
      <div className="grid grid-cols-3 gap-2">
        {status.map(([label, Icon, v, cls]) => (
          <div key={label} className={`rounded-2xl border p-3 ${cls}`}>
            <Icon size={16} />
            <p className="mt-1 text-xl font-black leading-none">{v || 0}</p>
            <p className="mt-1 font-mono text-[9px] font-bold">{label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
});

/* ---------- THÔNG TIN GIẢI THƯỞNG ---------- */
const PRIZE_STYLE = [
  "border-amber-300 bg-amber-50 text-amber-600",
  "border-slate-300 bg-slate-50 text-slate-500",
  "border-orange-300 bg-orange-50 text-orange-600",
];

export const PrizeList = memo(function PrizeList({ prizes }) {
  if (!prizes || prizes.length === 0) return null;
  return (
    <Card>
      <p className="mb-3 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
        THÔNG TIN GIẢI THƯỞNG
      </p>
      <div className="space-y-2.5">
        {prizes.map((p, i) => (
          <div
            key={`${p.from}-${p.to}`}
            className={`flex items-center justify-between rounded-2xl border px-4 py-3 ${
              PRIZE_STYLE[i] || "border-emerald-200 bg-emerald-50 text-emerald-700"
            }`}
          >
            <div>
              <p className="font-mono text-[10px] font-bold opacity-70">
                #{p.from === p.to ? p.from : `${p.from}-${p.to}`}
              </p>
              <p className="text-base font-extrabold">{prizeLabel(p)}</p>
            </div>
            <p className="text-xl font-black">{nf.format(p.xu)} xu</p>
          </div>
        ))}
      </div>
    </Card>
  );
});
