import React, { memo } from "react";
import { Eye, Heart, MessageCircle, Crown, Gift } from "lucide-react";
import { Card, Avatar, fmt } from "./creatorUi.jsx";
import { nf, prizeFor } from "./RankParts.jsx";

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
      {nf.format(prize.xu)} xu
    </span>
  ) : null;

/* ---------- VINH DANH THÁNG TRƯỚC ---------- */
export const PrevTop = memo(function PrevTop({ prev, prizes }) {
  if (!prev || prev.length === 0) return null;
  return (
    <Card>
      <p className="mb-3 flex items-center justify-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500">
        <Crown size={14} className="text-amber-500" /> VINH DANH THÁNG TRƯỚC
      </p>
      <div className="space-y-2.5">
        {prev.map((it) => (
          <div key={it.rank} className={`flex items-center gap-3 rounded-2xl border p-3 ${MEDAL_BOX[it.rank]}`}>
            <span className="text-2xl">{MEDAL[it.rank]}</span>
            <Avatar src={it.avatar} name={it.name} size={40} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-extrabold text-slate-800">{it.name}</p>
              <p className="text-[11px] font-semibold text-slate-500">{nf.format(it.points)} điểm</p>
            </div>
            <PrizePill prize={prizeFor(prizes, it.rank)} />
          </div>
        ))}
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
      <div className="mb-3 flex items-center justify-between">
        <div>
          <p className="text-lg font-extrabold text-slate-800">Vừa nhận thưởng</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            XU VỪA ĐƯỢC CỘNG CHO CREATOR
          </p>
        </div>
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
const TopCard = memo(function TopCard({ it, prize }) {
  return (
    <div className={`rounded-3xl border p-4 ${MEDAL_BOX[it.rank]} ${it.is_me ? "ring-2 ring-cyan-400" : ""}`}>
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

const Row = memo(function Row({ it, prize }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${it.is_me ? "bg-cyan-50" : ""}`}>
      <span className="w-7 text-center text-base font-black text-slate-400">{it.rank}</span>
      <Avatar src={it.avatar} name={it.name} size={36} />
      <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">
        {it.name} {it.is_me && <span className="text-xs text-cyan-600">(bạn)</span>}
      </span>
      <span className="text-right">
        <b className="block text-sm text-cyan-600">{nf.format(it.points)}</b>
        {prize && <span className="text-[10px] font-bold text-amber-600">{nf.format(prize.xu)} xu</span>}
      </span>
    </div>
  );
});

export const LiveBoard = memo(function LiveBoard({ items, total, monthLabel, prizes }) {
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
              <TopCard key={it.rank} it={it} prize={prizeFor(prizes, it.rank)} />
            ))}
          </div>
          {rest.length > 0 && (
            <div className="mt-4 divide-y divide-slate-100">
              {rest.map((it) => (
                <Row key={it.rank} it={it} prize={prizeFor(prizes, it.rank)} />
              ))}
            </div>
          )}
        </>
      )}
    </Card>
  );
});
