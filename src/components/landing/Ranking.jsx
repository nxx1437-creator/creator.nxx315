import React, { useEffect, useState } from "react";
import { Timer, Trophy, Gift, Flame, Users, Video } from "lucide-react";
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
    <img src={src} alt="" referrerPolicy="no-referrer" onError={() => setBad(true)} className="h-12 w-12 shrink-0 rounded-full border border-white/10 object-cover" />
  ) : (
    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-emerald-500 to-teal-700 text-sm font-bold text-white">
      {(name || "?").trim().charAt(0).toUpperCase()}
    </span>
  );
}

export default function Ranking({ stats }) {
  const left = useMonthEnd();
  const vn = new Date(Date.now() + 7 * 3600e3);
  const month = `${vn.getUTCMonth() + 1}/${vn.getUTCFullYear()}`;
  const prize = stats?.settings?.event_prize_text || "700K VNĐ + 150H VIP";
  const top = stats?.top || [];
  const recent = stats?.recent || [];

  return (
    <section id="ranking" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      {/* Campaign Banner */}
      <GlassCard className="overflow-hidden mb-8 border-emerald-500/20">
        <div className="bg-emerald-500/5 px-6 py-3 border-b border-emerald-500/10 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-emerald-400">
          <span className="flex items-center gap-2"><span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Chiến dịch đang diễn ra</span>
          <span className="hidden sm:inline">Minh bạch · Tự động</span>
        </div>
        
        <div className="grid grid-cols-3 divide-x divide-white/5 border-b border-white/5 bg-black/20">
          <div className="p-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase"><Users size={12} /> Người tham gia</p>
            <p className="mt-2 text-2xl font-black text-white">8.1K</p>
          </div>
          <div className="p-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase"><Video size={12} /> Video duyệt</p>
            <p className="mt-2 text-2xl font-black text-white">11.2K</p>
          </div>
          <div className="p-5 text-center">
            <p className="flex items-center justify-center gap-1.5 text-[10px] font-bold text-slate-500 uppercase"><Trophy size={12} /> Tổng giải thưởng</p>
            <p className="mt-2 text-xl font-black text-emerald-400">1.8M<span className="text-sm text-slate-400">đ</span> + 900h</p>
          </div>
        </div>

        <div className="p-6 md:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Chiến dịch tháng {month}</p>
            <h3 className="text-2xl font-black text-white">Tháng 10 - Bứt phá giới hạn</h3>
          </div>
          <div className="flex gap-4">
             <div className="rounded-2xl border border-white/5 bg-black/30 px-5 py-3 flex items-center gap-4">
                <Timer className="text-emerald-400" size={24} />
                <div>
                  <p className="text-[10px] font-bold text-slate-500 uppercase">Kết thúc sau</p>
                  <p className="text-lg font-black text-white">{left ? `${left.d} ngày ${left.h} giờ` : "--"}</p>
                </div>
             </div>
             <div className="rounded-2xl border border-amber-500/20 bg-amber-500/10 px-5 py-3">
                <p className="text-[10px] font-bold text-amber-500/70 uppercase">Giải nhất</p>
                <p className="text-lg font-black text-amber-400">{prize}</p>
             </div>
          </div>
        </div>
      </GlassCard>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Bảng Vừa Nhận Thưởng */}
        <GlassCard className="p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <p className="flex items-center gap-2 text-sm font-bold text-white"><Gift size={16} className="text-emerald-400" /> Vừa nhận thưởng</p>
            <span className="text-[10px] text-slate-500 uppercase font-bold">Tổng: {fmtNum(82716)} giờ</span>
          </div>
          {recent.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-8">Chưa có ai nhận thưởng tháng này.</p>
          ) : (
            <ul className="space-y-4">
              {recent.slice(0, 5).map((r, i) => (
                <li key={i} className="flex items-center gap-3">
                  <Avatar name={r.name} src={r.avatar} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-white truncate">{r.name}</p>
                    <p className="text-[11px] text-slate-500 truncate mt-0.5">{r.desc || "Video review Nxx315..."}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="inline-block rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-bold text-emerald-400 border border-emerald-500/20">
                      +{fmtNum(r.coins)} giờ
                    </span>
                    <p className="text-[10px] text-slate-500 mt-1">{timeAgo(r.at)}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </GlassCard>

        {/* Top Bảng Xếp Hạng */}
        <GlassCard className="p-6 lg:col-span-3 relative overflow-hidden">
          {/* Background Graphic */}
          <div className="absolute top-0 right-0 p-8 opacity-5 pointer-events-none">
            <Trophy size={150} />
          </div>

          <div className="flex items-center justify-between mb-6 relative z-10">
            <p className="flex items-center gap-2 text-sm font-bold text-white"><Trophy size={16} className="text-amber-400" /> Bảng Xếp Hạng</p>
            <span className="text-[10px] text-slate-400">Cập nhật: 00:00 hằng ngày</span>
          </div>

          {top.length === 0 ? (
            <div className="py-20 text-center relative z-10">
              <Flame size={40} className="mx-auto text-slate-700 mb-3" />
              <p className="text-sm text-slate-400">Bảng xếp hạng đang trống. Hãy là người đầu tiên!</p>
            </div>
          ) : (
            <div className="space-y-3 relative z-10">
              {/* Top 1 Highlight */}
              {top[0] && (
                <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-amber-500/10 to-transparent p-4 border border-amber-500/20">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-400 text-xl shadow-[0_0_15px_rgba(251,191,36,0.5)]">
                    🥇
                  </div>
                  <Avatar src={top[0].avatar} name={top[0].name} />
                  <div className="flex-1 min-w-0">
                    <p className="text-base font-black text-white truncate">{top[0].name}</p>
                    <p className="text-[11px] text-slate-400">{top[0].approved} video được duyệt</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-black text-amber-400">{fmtNum(top[0].points)}</p>
                    <p className="text-[10px] font-bold text-amber-500/70 uppercase">Điểm</p>
                  </div>
                </div>
              )}
              
              {/* Top 2, 3, 4, 5 */}
              <div className="divide-y divide-white/5">
                {top.slice(1).map((it) => (
                  <div key={it.rank} className="flex items-center gap-4 px-4 py-3">
                    <span className="w-6 text-center text-sm font-bold text-slate-500">
                      {MEDAL[it.rank] || `#${it.rank}`}
                    </span>
                    <Avatar src={it.avatar} name={it.name} />
                    <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-300">{it.name}</span>
                    <span className="text-right">
                      <b className="block text-sm text-emerald-400">{fmtNum(it.points)}</b>
                      <span className="text-[10px] text-slate-500">{it.approved} video</span>
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
