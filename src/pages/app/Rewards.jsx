import React, { useEffect, useState } from "react";
import { Gift, Coins, Clock, CheckCircle2, Film } from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, Eyebrow, CodeBox, PLATFORMS } from "../../components/creator/creatorUi.jsx";

function Stat({ icon: Icon, label, value }) {
  return (
    <Card className="!p-4">
      <div className="flex items-start justify-between">
        <Eyebrow className="!text-slate-500">{label}</Eyebrow>
        <Icon size={18} className="text-slate-400" />
      </div>
      <p className="mt-3 text-3xl font-extrabold text-cyan-600">{value}</p>
    </Card>
  );
}

export default function Rewards() {
  const { session } = useSession();
  const uid = session?.user?.id;
  const [items, setItems] = useState([]);
  const [redeemed, setRedeemed] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!uid) return;
    let alive = true;
    (async () => {
      const [{ data: subs }, { data: reds }] = await Promise.all([
        supabase
          .from("intro_video_submissions")
          .select("id,platform,title,url,status,coins,gift_code,gift_code_id,created_at,reviewed_at")
          .eq("user_id", uid)
          .order("created_at", { ascending: false }),
        supabase.from("gift_code_redemptions").select("code_id").eq("user_id", uid),
      ]);
      if (!alive) return;
      setItems(subs || []);
      setRedeemed(new Set((reds || []).map((r) => r.code_id)));
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [uid]);

  const approved = items.filter((i) => i.status === "approved");
  const totalCoins = approved.reduce((s, i) => s + (i.coins || 0), 0);
  const pending = items.filter((i) => i.status === "pending").length;

  return (
    <div className="space-y-4">
      <div className="px-1">
        <Eyebrow>▸ REWARDS</Eyebrow>
        <h1 className="mt-1 text-3xl font-extrabold text-cyan-600">Lịch sử thưởng</h1>
        <p className="mt-1 text-sm text-slate-500">
          Mỗi video được duyệt sẽ được cộng xu thẳng vào ví của bạn, không cần nhập code.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Stat icon={Coins} label="TỔNG XU THƯỞNG" value={totalCoins.toLocaleString("vi-VN")} />
        <Stat icon={Film} label="VIDEO ĐƯỢC DUYỆT" value={approved.length} />
        <Stat icon={Clock} label="ĐANG XỬ LÝ" value={pending} />
      </div>

      {loading ? (
        <div className="h-40"></div>
      ) : approved.length === 0 ? (
        <Card>
          <div className="rounded-2xl border border-dashed border-slate-300 px-4 py-10 text-center">
            <Gift size={34} className="mx-auto text-slate-300" />
            <p className="mt-3 text-lg font-bold text-slate-700">Chưa có thưởng nào</p>
            <p className="mt-1 text-sm text-slate-500">
              Đăng video chất lượng lên TikTok/YouTube để bắt đầu nhận thưởng.
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-3">
          {approved.map((it) => {
            const claimed = !it.gift_code_id || redeemed.has(it.gift_code_id);
            return (
              <Card key={it.id} className="!p-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-bold text-slate-800">
                    <span className={`h-2.5 w-2.5 rounded-full ${PLATFORMS[it.platform]?.dot}`} />
                    {PLATFORMS[it.platform]?.name}
                  </span>
                  <span className="text-[11px] font-medium text-slate-400">
                    {new Date(it.reviewed_at || it.created_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>

                {it.title && <p className="mt-2 line-clamp-1 text-xs text-slate-500">{it.title}</p>}

                {claimed ? (
                  <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-3">
                    <span className="flex items-center gap-2 text-sm font-bold text-emerald-700">
                      <CheckCircle2 size={18} /> Đã cộng vào ví
                    </span>
                    <span className="text-lg font-extrabold text-emerald-700">
                      +{(it.coins || 0).toLocaleString("vi-VN")} xu
                    </span>
                  </div>
                ) : (
                  <>
                    <p className="mt-3 text-xs font-semibold text-amber-600">
                      Code cũ chưa nhập: chép code rồi nhập ở Ví trên web chính.
                    </p>
                    <CodeBox code={it.gift_code} coins={it.coins} />
                  </>
                )}
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
        }
