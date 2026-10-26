import React, { memo, useEffect, useState } from "react";
import { Trophy } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { Card } from "../../components/creator/creatorUi.jsx";

const MEDAL = { 1: "🥇", 2: "🥈", 3: "🥉" };
const nf = new Intl.NumberFormat("vi-VN");

const Row = memo(function Row({ it }) {
  return (
    <div className={`flex items-center gap-3 rounded-2xl px-3 py-3 ${it.is_me ? "bg-cyan-50" : ""}`}>
      <span className="w-8 text-center text-lg font-black text-slate-400">
        {MEDAL[it.rank] || it.rank}
      </span>
      <span className="min-w-0 flex-1 truncate text-sm font-bold text-slate-800">
        {it.name} {it.is_me && <span className="text-xs text-cyan-600">(bạn)</span>}
      </span>
      <b className="text-sm text-cyan-600">{nf.format(it.points || 0)}</b>
    </div>
  );
});

export default function Ranking() {
  const [data, setData] = useState(null);

  useEffect(() => {
    let off = false;
    supabase.rpc("get_creator_leaderboard").then(({ data: d }) => {
      if (!off) setData(d?.ok ? d : { items: [], me: null });
    });
    return () => {
      off = true;
    };
  }, []);

  if (!data) return <div className="h-screen" />;

  const { me, items = [] } = data;

  return (
    <div className="space-y-4">
      <h1 className="px-1 text-3xl font-extrabold text-cyan-600">Bảng xếp hạng</h1>

      <Card>
        {me ? (
          <div className="text-center">
            <p className="text-6xl font-black italic text-cyan-600">#{me.rank}</p>
            <p className="mt-2 truncate text-lg font-bold text-slate-800">{me.name}</p>

            <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
              <div>
                <p className="text-xs font-bold text-slate-500">ĐIỂM SỐ</p>
                <p className="text-2xl font-black text-cyan-500">{nf.format(me.points || 0)}</p>
              </div>
              <div>
                <p className="text-xs font-bold text-slate-500">XU THƯỞNG</p>
                <p className="text-2xl font-black text-amber-500">{nf.format(me.coins || 0)}</p>
              </div>
            </div>
          </div>
        ) : (
          <p className="py-6 text-center text-sm text-slate-500">
            Bạn chưa có video nào được duyệt trong tháng này.
          </p>
        )}
      </Card>

      <Card className="!p-3">
        {items.length === 0 ? (
          <div className="py-10 text-center">
            <Trophy size={28} className="mx-auto text-slate-300" />
            <p className="mt-2 text-sm text-slate-500">Chưa có ai trên bảng xếp hạng tháng này.</p>
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {items.map((it) => (
              <Row key={it.rank} it={it} />
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
