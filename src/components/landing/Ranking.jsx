import React, { useEffect, useState } from "react";
import { Timer, Trophy, Gift, Flame, Users, Video } from "lucide-react";
import { SectionTitle, GlassCard, INK, fmtNum, timeAgo } from "./ui.jsx";


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
      className="h-12 w-12 shrink-0 rounded-full border-2 border-white object-cover shadow-md"
    />
  ) : (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-400 to-teal-600 text-sm font-bold text-white shadow-md">
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

export default function Ranking({ stats }) {
  const left = useMonthEnd();
  const vn = new Date(Date.now() + 7 * 3600e3);
  const monthNum = vn.getUTCMonth() + 1;
  const month = `${monthNum}/${vn.getUTCFullYear()}`;
  const prize = stats?.settings?.event_prize_text || "700K VNĐ + 150H VIP";
  const top = stats?.top || [];
  const recent = stats?.recent || [];

  return (
    <section id="ranking" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <SectionTitle
        eyebrow="Đang diễn ra"
        title="Top bảng xếp hạng"
        sub="Cập nhật hằng ngày lúc 00:00 giờ Việt Nam."
      />

      {/* Campaign banner */}
      <GlassCard className="mb-8 mt-10 overflow-hidden">
        <div className="flex items-center justify-between border-b border-emerald-900/10 bg-emerald-500/10 px-6 py-3 font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-500" /> Chiến dịch đang diễn ra
          </span>
          <span className="hidden sm:inline">Minh bạch · Tự động</span>
        </div>

        <div className="grid grid-cols-3 divide-x divide-emerald-900/10 border-b border-emerald-900/10 bg-white/50">
          <div className="p-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase text-slate-500"><Users size={13} /> Người tham gia</p>
            <p className={`mt-2 text-2xl font-black ${INK}`}>{stats ? fmtNum(stats.creators) : "—"}</p>
          </div>
          <div className="p-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase text-slate-500"><Video size={13} /> Video duyệt</p>
            <p className={`mt-2 text-2xl font-black ${INK}`}>{stats ? fmtNum(stats.videos) : "—"}</p>
          </div>
          <div className="p-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold uppercase text-slate-500"><Trophy size={13} /> Tổng giải thưởng</p>
            <p className="mt-2 text-xl font-black text-emerald-600">
              1.8M<span className="text-sm text-slate-500">đ</span> + 900h
            </p>
          </div>
        </div>

        <div className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center md:p-8">
          <div>
            <p className="mb-1 font-mono text-xs font-bold uppercase tracking-widest text-slate-500">Chiến dịch tháng {month}</p>
            <h3 className={`text-2xl font-black ${INK}`}>
              {stats?.settings?.event_title || `Tháng ${monthNum} - Bứt phá giới hạn`}
            </h3>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
            <div className="flex items-center gap-4 rounded-2xl border border-emerald-900/10 bg-white/80 px-5 py-3">
              <Timer className="text-emerald-600" size={24} />
              <div>
                <p className="text-[11px] font-bold uppercase text-slate-500">Kết thúc sau</p>
                <p className={`text-lg font-black ${INK}`}>{left ? `${left.d} ngày ${left.h} giờ` : "--"}</p>
              </div>
            </div>
            <div className="rounded-2xl border border-amber-300/60 bg-gradient-to-br from-amber-100 to-amber-50 px-5 py-3">
              <p className="text-[11px] font-bold uppercase text-amber-700/80">Giải nhất</p>
              <p className="text-lg font-black text-amber-600">{prize}</p>
            </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Vừa nhận thưởng */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <p className={`flex items-center gap-2 text-sm font-bold ${INK}`}><Gift size={16} className="text-emerald-600" /> Vừa nhận thưởng</p>
            <span className="text-[11px] font-bold uppercase text-slate-500">Tổng: {fmtNum(82716)} giờ</span>
          </div>
          {recent.length === 0 ? (
            <p className="py-8 text-center text-sm text-slate-500">Chưa có ai nhận thưởng tháng này.</p>
          ) : (
            <ul className="space-y-4">
              {recent.slice(0, 5).map((r, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Avatar name={r.name} src={r.avatar} />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-sm font-bold ${INK}`}>{r.name}</p>
                    <p className="mt-0.5 truncate text-[12px] text-slate-500">{r.desc || "Video review Nxx315..."}</p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className="inline-block rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-700">
                      +{fmtNum(r.coins)} giờ
                    </span>
                    <p className="mt-1 text-[11px] text-slate-500">{timeAgo(r.at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        {/* Bảng xếp hạng */}
        <GlassCard className="relative overflow-hidden p-6 lg:col-span-3">
          <Trophy size={150} className="pointer-events-none absolute right-4 top-4 text-amber-500/10" />

          <div className="relative z-10 mb-6 flex items-center justify-between">
            <p className={`flex items-center gap-2 text-sm font-bold ${INK}`}><Trophy size={16} className="text-amber-500" /> Bảng Xếp Hạng</p>
            <span className="text-[11px] text-slate-500">Cập nhật: 00:00 hằng ngày</span>
          </div>

          {top.length === 0 ? (
            <div className="relative z-10 py-20 text-center">
              <Flame size={40} className="mx-auto mb-3 text-emerald-300" />
              <p className="text-sm text-slate-500">Bảng xếp hạng đang trống. Hãy là người đầu tiên!</p>
            </div>
          ) : (
            <div className="relative z-10 space-y-3">
              {top[0] && (
                <div className="flex items-center gap-4 rounded-2xl border border-amber-300/60 bg-gradient-to-r from-amber-100 via-amber-50 to-white/0 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xl shadow-[0_0_18px_rgba(251,191,36,0.6)]">
                    🥇
                  </div>
                  <Avatar src={top[0].avatar} name={top[0].name} />
                  <div className="min-w-0 flex-1">
                    <p className={`truncate text-base font-black ${INK}`}>{top[0].name}</p>
                    <p className="text-[12px] text-slate-500">{top[0].approved} video được duyệt</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-amber-600">{fmtNum(top[0].points)}</p>
                    <p className="text-[11px] font-bold uppercase text-amber-700/70">Điểm</p>
                  </div>
                </div>
              )}

              <div className="divide-y divide-emerald-900/10">
                {top.slice(1).map((it) => (
                  <div key={it.rank} className="flex items-center gap-4 px-4 py-3">
                    <span className="w-6 text-center text-sm font-bold text-slate-500">
                      {MEDAL[it.rank] || `#${it.rank}`}
                    </span>
                    <Avatar src={it.avatar} name={it.name} />
                    <span className={`min-w-0 flex-1 truncate text-sm font-bold ${INK}`}>{it.name}</span>
                    <span className="text-right">
                      <b className="block text-sm text-emerald-600">{fmtNum(it.points)}</b>
                      <span className="text-[11px] text-slate-500">{it.approved} video</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassCard>
      </div>
    </section>
  );
                  }
              
