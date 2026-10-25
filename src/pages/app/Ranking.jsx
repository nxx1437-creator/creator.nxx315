import React, { useEffect, useState } from "react";
import { Loader2, Trophy } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, Eyebrow } from "../../components/creator/creatorUi.jsx";

const MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };

export default function Ranking() {
  const [data, setData] = useState(null);

  useEffect(() => {
    supabase.rpc("get_creator_leaderboard").then(({ data: d }) => setData(d?.ok ? d : { items: [], me: null }));
  }, []);

  if (!data) {
    return <div className="flex justify-center py-20"><Loader2 size={24} className="animate-spin text-cyan-600" /></div>;
  }

  return (
    <div className="space-y-4">
      <div className="px-1">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-emerald-600">
           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SEASON · LIVE
        </span>
        <h1 className="mt-2 text-3xl font-extrabold text-cyan-600">Bảng xếp hạng</h1>
        <p className="mt-1 text-sm text-slate-500">Cập nhật trực tiếp — refresh lúc 00:00 ICT mỗi ngày.</p>
      </div>

      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <Eyebrow className="flex items-center gap-2 font-bold"><Trophy size={14} className="text-amber-500"/> Hạng của bạn</Eyebrow>
        </div>
        {data.me ? (
          <div className="text-center">
             <p className="text-6xl font-black italic text-cyan-600">#{data.me.rank}</p>
             <p className="mt-1 text-sm font-bold text-slate-600">TOP 9385% · 87 CREATOR</p>
             <p className="mt-2 text-lg font-bold text-slate-800">Xx315 N</p>
             
             <div className="mt-6 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
                <div>
                  <p className="text-xs font-bold text-slate-500">⭐ ĐIỂM SỐ</p>
                  <p className="text-2xl font-black text-cyan-500">{data.me.points}</p>
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-500">🎁 GIỜ THƯỞNG</p>
                  <p className="text-2xl font-black text-emerald-500">0h</p>
                </div>
             </div>
          </div>
        ) : (
          <p className="text-center text-sm text-slate-500 py-6">Bạn chưa có video nào được duyệt trong tháng này.</p>
        )}
      </Card>

      <Card className="!p-3 rounded-[2rem] border-white bg-white/80 shadow-sm">
        {data.items.length === 0 ? (
          <div className="py-10 text-center">
            <Trophy size={28} className="mx-auto text-slate-300" />
            <p className="mt-2 text-sm text-slate-500">Chưa có ai trên bảng xếp hạng tháng này.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {data.items.map((it) => (
              <div key={it.rank} className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${it.is_me ? "bg-cyan-50" : ""}`}>
                <span className="w-8 text-center text-lg font-black text-slate-400">{MEDAL[it.rank] || it.rank}</span>
                <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">{it.name} {it.is_me && <span className="text-xs text-cyan-600">(bạn)</span>}</span>
                <span className="text-right">
                  <b className="block text-sm text-cyan-600">{it.points}</b>
                  <span className="text-[10px] text-slate-500">{it.approved} video</span>
                </span>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
                  }
