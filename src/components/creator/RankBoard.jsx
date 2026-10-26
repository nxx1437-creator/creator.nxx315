import React, { memo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, Heart, MessageCircle, Crown, Gift, Sparkles } from "lucide-react";
import { Card, Avatar, fmt } from "./creatorUi.jsx";
import { nf, prizeFor } from "./RankParts.jsx";

const prizeText = (p) =>
  p.unit === "vnd" ? `${nf.format(p.amount)}đ` : `${nf.format(p.amount ?? p.xu)} xu`;

const MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };
const MEDAL_BOX = {
  1: "border-amber-300 bg-amber-50",
  2: "border-slate-300 bg-slate-50",
  3: "border-orange-300 bg-orange-50",
};

const ago = (iso) => {
  const d = Math.floor((Date.now() - new Date(iso).getTime()) / 86400e3);
  return d <= 0 ? "Hôm nay" : d === 1 ? "Hôm qua" : `${d} ngày trước`;
};

const PrizePill = ({ prize }) =>
  prize ? (
    <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 font-mono text-[10px] font-bold text-amber-600">
      {prizeText(prize)}
    </span>
  ) : null;

const useOpenProfile = () => {
  const nav = useNavigate();
  return useCallback((uid) => uid && nav(`/app/creator/${uid}`), [nav]);
};

/* ---------- VINH DANH THÁNG TRƯỚC (BỤC) ---------- */
const PODIUM = {
  1: {
    ring: "from-amber-300 to-amber-500",
    glow: "shadow-[0_0_28px_rgba(251,191,36,0.55)]",
    badge: "from-amber-300 to-amber-500 text-amber-900",
    block: "from-amber-100 to-white border-amber-400 text-amber-300",
    size: 104, h: "h-24", label: "text-amber-500",
  },
  2: {
    ring: "from-slate-200 to-slate-400",
    glow: "",
    badge: "from-slate-200 to-slate-400 text-slate-700",
    block: "from-slate-100 to-white border-slate-300 text-slate-300",
    size: 72, h: "h-16", label: "text-slate-500",
  },
  3: {
    ring: "from-orange-300 to-orange-600",
    glow: "shadow-[0_0_20px_rgba(234,88,12,0.35)]",
    badge: "from-orange-300 to-orange-500 text-orange-900",
    block: "from-orange-100 to-white border-orange-500 text-orange-300",
    size: 72, h: "h-12", label: "text-orange-600",
  },
};

const PodiumCol = memo(function PodiumCol({ it, prize, onOpen }) {
  const s = PODIUM[it.rank];
  const first = it.rank === 1;
  return (
    <button onClick={() => onOpen(it.uid)} className="relative z-10 flex min-w-0 flex-col items-center">
      {first && (
        <Crown size={40} className="mb-1 text-amber-400 drop-shadow" fill="currentColor" />
      )}
      <div className="relative">
        <div className={`rounded-full bg-gradient-to-b p-1 ${s.ring} ${s.glow}`}>
          <div className="rounded-full bg-white p-0.5">
            <Avatar src={it.avatar} name={it.name} size={s.size} />
          </div>
        </div>
        <span
          className={`absolute -bottom-1 -right-1 flex items-center justify-center rounded-full bg-gradient-to-br font-black shadow ${s.badge} ${
            first ? "h-9 w-9 text-lg" : "h-7 w-7 text-sm"
          }`}
        >
          {it.rank}
        </span>
      </div>

      <p className={`mt-3 font-mono text-[10px] font-bold tracking-[0.3em] ${s.label}`}>
        TOP {it.rank}
      </p>
      <p className="max-w-full truncate px-1 text-sm font-extrabold text-slate-800">{it.name}</p>
      {prize && (
        <span className="mt-1.5 rounded-2xl border border-amber-200 bg-amber-50 px-2.5 py-1 text-center font-mono text-[11px] font-bold text-amber-600">
          {prizeText(prize)}
        </span>
      )}
      <p className="mt-1.5 font-mono text-[11px] text-slate-500">{nf.format(it.points)} điểm</p>

      <div
        className={`mt-3 flex w-full items-start justify-center rounded-t-[2rem] border-t-2 bg-gradient-to-b pt-2 text-4xl font-black ${s.block} ${s.h}`}
      >
        {it.rank}
      </div>
    </button>
  );
});

export const PrevTop = memo(function PrevTop({ prev, prizes, title = "VINH DANH THÁNG TRƯỚC" }) {
  const open = useOpenProfile();
  if (!prev || prev.length === 0) return null;
  const slots = [2, 1, 3].map((r) => prev.find((i) => i.rank === r));
  return (
    <Card className="!px-2 !pb-0">
      {/* Quầng sáng vàng phía sau Top 1 */}
      <div
        className="pointer-events-none absolute left-1/2 top-12 h-72 w-72 -translate-x-1/2"
        style={{
          background:
            "radial-gradient(circle, rgba(251,191,36,0.35) 0%, rgba(251,191,36,0) 70%)",
        }}
      />
      <Sparkles size={18} className="absolute left-[26%] top-24 text-amber-400" />
      <Sparkles size={14} className="absolute right-[28%] top-20 text-amber-300" />
      <Sparkles size={12} className="absolute left-[30%] top-44 text-amber-300" />

      <p className="relative mb-5 text-center font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-slate-500">
                {title}
      </p>

      <div className="grid grid-cols-3 items-end gap-1">
        {slots.map((it, i) =>
          it ? (
            <PodiumCol key={it.rank} it={it} prize={prizeFor(prizes, it.rank)} onOpen={open} />
          ) : (
            <div key={i} />
          )
        )}
      </div>
    </Card>
  );
});

/* ---------- VỪA NHẬN THƯỞNG ---------- */
export const RecentRewards = memo(function RecentRewards({ stats }) {
  const list = stats?.recent || [];
  if (list.length === 0) return null;
  return (
    <Card>
      <div className="mb-3">
        <p className="text-lg font-extrabold text-slate-800">Vừa nhận thưởng</p>
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
          XU VỪA ĐƯỢC CỘNG CHO CREATOR
        </p>
      </div>

      <div className="mb-3 flex items-center justify-between rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-emerald-700">
          TỔNG XU ĐÃ TẶNG
        </span>
        <span className="text-2xl font-black text-emerald-600">{nf.format(stats?.coins || 0)}</span>
      </div>

      <div className="divide-y divide-slate-100">
        {list.map((r, i) => (
          <div key={i} className="flex items-center gap-3 py-2.5">
            <Avatar name={r.name} size={36} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold text-slate-800">{r.name}</p>
              <p className="text-[11px] text-slate-400">
                {r.platform === "youtube" ? "YouTube" : "TikTok"} · {ago(r.at)}
              </p>
            </div>
            <span className="flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-1 text-xs font-bold text-amber-600">
              <Gift size={12} /> +{nf.format(r.coins || 0)}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
});

/* ---------- BẢNG XẾP HẠNG TRỰC TIẾP ---------- */
const TopCard = memo(function TopCard({ it, prize, onOpen }) {
  return (
    <div
      onClick={() => onOpen(it.uid)}
      className={`cursor-pointer rounded-3xl border p-4 ${MEDAL_BOX[it.rank]} ${it.is_me ? "ring-2 ring-cyan-400" : ""}`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{MEDAL[it.rank]}</span>
        <Avatar src={it.avatar} name={it.name} size={48} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-base font-extrabold text-slate-800">
            {it.name} {it.is_me && <span className="text-xs text-cyan-600">(bạn)</span>}
          </p>
          <p className="font-mono text-[11px] font-bold text-slate-500">{it.approved} VIDEO</p>
        </div>
        <p className="text-xl font-black text-cyan-600">{nf.format(it.points)}</p>
      </div>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-semibold text-slate-500">
        <span className="flex items-center gap-1"><Eye size={13} className="text-cyan-500" /> {fmt(it.views)}</span>
        <span className="flex items-center gap-1"><Heart size={13} className="text-cyan-500" /> {fmt(it.likes)}</span>
        <span className="flex items-center gap-1"><MessageCircle size={13} className="text-cyan-500" /> {fmt(it.comments)}</span>
        <PrizePill prize={prize} />
      </div>
    </div>
  );
});

const Row = memo(function Row({ it, prize, onOpen }) {
  return (
    <div
      onClick={() => onOpen(it.uid)}
      className={`flex cursor-pointer items-center gap-3 rounded-2xl px-3 py-3 ${it.is_me ? "bg-cyan-50" : ""}`}
    >
      <span className="w-7 text-center text-base font-black text-slate-400">{it.rank}</span>
      <Avatar src={it.avatar} name={it.name} size={36} />
      <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">
        {it.name} {it.is_me && <span className="text-xs text-cyan-600">(bạn)</span>}
      </span>
      <span className="text-right">
        <b className="block text-sm text-cyan-600">{nf.format(it.points)}</b>
        {prize && <span className="text-[10px] font-bold text-amber-600">{prizeText(prize)}</span>}
      </span>
    </div>
  );
});

export const LiveBoard = memo(function LiveBoard({ items, total, monthLabel, prizes }) {
  const open = useOpenProfile();
  const top = items.filter((i) => i.rank <= 3);
  const rest = items.filter((i) => i.rank > 3);
  return (
    <Card className="!p-4">
      <p className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-600">
        BẢNG XẾP HẠNG TRỰC TIẾP
      </p>
      <p className="mt-1 font-mono text-[10px] tracking-widest text-slate-400">{total} CREATOR</p>
      <span className="mt-3 inline-block rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[11px] font-bold tracking-widest text-emerald-700">
        {monthLabel}
      </span>

      {items.length === 0 ? (
        <p className="py-10 text-center text-sm text-slate-500">
          Chưa có ai trên bảng xếp hạng tháng này.
        </p>
      ) : (
        <>
          <p className="mb-2 mt-5 flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-amber-600">
            <Crown size={14} /> TOP 3 THÁNG NÀY
          </p>
          <div className="space-y-2.5">
            {top.map((it) => (
              <TopCard key={it.rank} it={it} prize={prizeFor(prizes, it.rank)} onOpen={open} />
            ))}
          </div>
          {rest.length > 0 && (
            <div className="mt-4 divide-y divide-slate-100">
              {rest.map((it) => (
                <Row key={it.rank} it={it} prize={prizeFor(prizes, it.rank)} onOpen={open} />
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
});
