import React, { useEffect, useState } from "react";
import { Timer, Trophy, Gift } from "lucide-react";
import { SectionTitle, GlassCard, fmtNum, timeAgo } from "./ui.jsx";

const pad = (n) => String(n).padStart(2, "0");

function useMonthEnd() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const tick = () => {
      const vn = new Date(Date.now() + 7 * 3600e3);
      const end = Date.UTC(vn.getUTCFullYear(), vn.getUTCMonth() + 1, 1) - 7 * 3600e3;
      const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setLeft({
        d: Math.floor(s / 86400),
        h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60),
        s: s % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

const MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };

function Avatar({ src, name }) {
  const [bad, setBad] = useState(false);
  return src && !bad ? (
    <img
      src={src}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setBad(true)}
      className="h-10 w-10 shrink-0 rounded-full border border-white/15 object-cover"
    />
  ) : (
    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white">
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

export default function Ranking({ stats }) {
  const left = useMonthEnd();
  const vn = new Date(Date.now() + 7 * 3600e3);
  const month = `${vn.getUTCMonth() + 1}/${vn.getUTCFullYear()}`;
  const prize = stats?.settings?.event_prize_text;
  const top = stats?.top || [];
  const recent = stats?.recent || [];

  return (
    <section id="ranking" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
      <SectionTitle
        eyebrow="Bảng xếp hạng"
        title={`Cuộc đua tháng ${month}`}
        sub="Điểm tính theo số video được duyệt trong tháng, làm mới khi sang tháng mới (giờ Việt Nam)."
      />

      <div className="mt-10 grid gap-5 lg:grid-cols-5">
        <GlassCard className="p-6 lg:col-span-2">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-emerald-300">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" /> Đang diễn ra
          </p>
          {prize ? (
            <p className="mt-4 rounded-2xl border border-amber-400/30 bg-amber-400/10 px-4 py-3 text-sm font-semibold text-amber-300">
              🏆 {prize}
            </p>
          ) : null}
          <p className="mt-5 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <Timer size={13} className="text-cyan-400" /> Kết thúc sau
          </p>
          <div className="mt-2 grid grid-cols-4 gap-2">
            {left &&
              [
                [left.d, "NGÀY"],
                [left.h, "GIỜ"],
                [left.m, "PHÚT"],
                [left.s, "GIÂY"],
              ].map(([v, l]) => (
                <div key={l} className="rounded-2xl border border-white/10 bg-black/30 py-3 text-center">
                  <p className="text-2xl font-black text-cyan-300">{pad(v)}</p>
                  <p className="text-[9px] font-bold tracking-widest text-slate-500">{l}</p>
                </div>
              ))}
          </div>

          <p className="mt-6 flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-slate-500">
            <Gift size={13} className="text-cyan-400" /> Vừa được duyệt
          </p>
          {recent.length === 0 ? (
            <p className="mt-3 text-sm text-slate-500">Chưa có video nào được duyệt.</p>
          ) : (
            <ul className="mt-3 space-y-2">
              {recent.slice(0, 4).map((r, i) => (
                <li
                  key={i}
                  className="flex items-center justify-between rounded-2xl bg-black/20 px-4 py-2.5 text-sm"
                >
                  <span className="text-slate-300">
                    <b className="text-white">{r.name}</b> · {timeAgo(r.at)}
                  </span>
                  <span className="rounded-full bg-amber-400/15 px-2.5 py-0.5 text-xs font-bold text-amber-300">
                    +{fmtNum(r.coins)} xu
                  </span>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        <GlassCard className="p-4 lg:col-span-3">
          <p className="flex items-center gap-2 px-2 pt-2 text-xs font-bold uppercase tracking-widest text-slate-400">
            <Trophy size={14} className="text-amber-400" /> Top 5 tháng này
          </p>
          {top.length === 0 ? (
            <div className="px-4 py-14 text-center">
              <Trophy size={30} className="mx-auto text-slate-600" />
              <p className="mt-3 text-sm text-slate-400">Chưa có ai trên bảng. Hãy là người đầu tiên!</p>
            </div>
          ) : (
            <div className="mt-3 divide-y divide-white/5">
              {top.map((it) => (
                <div key={it.rank} className="flex items-center gap-3 px-2 py-3.5">
                  <span className="w-8 text-center text-xl font-black text-slate-300">
                    {MEDAL[it.rank] || it.rank}
                  </span>
                  <Avatar src={it.avatar} name={it.name} />
                  <span className="min-w-0 flex-1 truncate text-sm font-bold text-white">{it.name}</span>
                  <span className="text-right">
                    <b className="block text-base text-cyan-300">{fmtNum(it.points)}</b>
                    <span className="text-[10px] text-slate-500">{it.approved} video</span>
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
}
