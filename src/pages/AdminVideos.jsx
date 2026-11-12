import React, { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  Check, X, ExternalLink, RefreshCw, ShieldAlert, Loader2, ArrowLeft, TrendingUp,
} from "lucide-react";
import useSession from "../hooks/useSession.js";
import { supabase } from "../lib/supabaseClient.js";
import { estimateReward } from "../lib/videoReward.js";

const DEFAULT_COINS = 1000; // số xu gợi ý khi không tính được mốc
const MAX_ROUNDS = 3; // phải khớp v_max trong hàm admin_bonus_intro_video

const TABS = [
  ["pending", "Chờ duyệt"],
  ["bonus", "Duyệt lại"],
  ["approved", "Đã duyệt"],
  ["rejected", "Từ chối"],
  ["all", "Tất cả"],
];

const BADGE = {
  pending: "bg-amber-100 text-amber-700",
  approved: "bg-emerald-100 text-emerald-700",
  rejected: "bg-rose-100 text-rose-700",
};
const LABEL = { pending: "Chờ duyệt", approved: "Đã duyệt", rejected: "Từ chối" };

const num = (v) => (v == null ? "—" : Number(v).toLocaleString("vi-VN"));
const when = (d) => (d ? new Date(d).toLocaleString("vi-VN") : "—");

// Thông tin duyệt thêm xu của video đã duyệt
const bonusInfo = (it) => {
  if (it.status !== "approved") return null;
  const round = it.review_round || 1;
  const tier = estimateReward(it.platform, it.views || 0, it.likes || 0).xu || 0;
  const paid = it.coins || 0;
  return { round, tier, paid, diff: tier - paid, canRound: round < MAX_ROUNDS };
};
const needsBonus = (it) => {
  const b = bonusInfo(it);
  return !!b && b.canRound && b.diff > 0;
};

function ReviewCard({ item, name, rounds, onDone }) {
  const [coins, setCoins] = useState(
    () => (item.status === "pending" ? estimateReward(item.platform, item.views || 0, item.likes || 0).xu : 0) || DEFAULT_COINS
  );
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState("");
  const pending = item.status === "pending";
  const info = bonusInfo(item);

  // Duyệt / từ chối lần 1
  const run = async (approve) => {
    if (approve && !window.confirm(`Duyệt lần 1 và cộng ${Number(coins).toLocaleString("vi-VN")} xu cho creator?`)) return;
    if (!approve && !window.confirm("Từ chối video này?")) return;
    setBusy(true);
    setErr("");
    const { data, error } = await supabase.rpc("admin_review_intro_video", {
      p_id: item.id,
      p_approve: approve,
      p_coins: approve ? Number(coins) : null,
      p_note: note || null,
    });
    setBusy(false);
    if (error) return setErr(error.message);
    if (!data?.ok) return setErr(data?.message || "Có lỗi xảy ra.");
    onDone();
  };

  // Duyệt lần 2, 3: cộng phần chênh lệch
  const runBonus = async () => {
    if (!window.confirm(`Duyệt lần ${info.round + 1} và cộng thêm ${num(info.diff)} xu cho creator?`)) return;
    setBusy(true);
    setErr("");
    const { data, error } = await supabase.rpc("admin_bonus_intro_video", {
      p_id: item.id,
      p_note: note || null,
    });
    setBusy(false);
    if (error) return setErr(error.message);
    if (!data?.ok) return setErr(data?.message || "Có lỗi xảy ra.");
    onDone();
  };

  return (
    <div className="rounded-2xl border border-emerald-900/10 bg-white p-4 shadow-sm">
      <div className="flex gap-3">
        {item.thumbnail_url ? (
          <img src={item.thumbnail_url} alt="" className="h-20 w-14 shrink-0 rounded-lg bg-slate-100 object-cover" />
        ) : (
          <div className="h-20 w-14 shrink-0 rounded-lg bg-slate-100" />
        )}
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className={`rounded-full px-2.5 py-0.5 text-xs font-bold ${BADGE[item.status] || "bg-slate-100 text-slate-600"}`}>
              {LABEL[item.status] || item.status}
            </span>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold uppercase text-slate-600">{item.platform}</span>
            {item.duration_seconds != null && (
              <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-semibold text-slate-600">{item.duration_seconds}s</span>
            )}
            {info && (
              <span className="rounded-full bg-cyan-50 px-2.5 py-0.5 text-xs font-bold text-cyan-700">
                Lần {info.round}/{MAX_ROUNDS}
              </span>
            )}
          </div>
          <p className="mt-1.5 line-clamp-2 text-sm font-bold text-slate-800">{item.title || "(chưa có tiêu đề)"}</p>
          <p className="mt-0.5 text-xs text-slate-500">
            {name || item.user_id.slice(0, 8)} · {when(item.created_at)}
          </p>
        </div>
      </div>

      <a
        href={item.url}
        target="_blank"
        rel="noreferrer"
        className="mt-3 flex items-center gap-1.5 break-all text-sm font-semibold text-emerald-700 hover:underline"
      >
        <ExternalLink size={15} className="shrink-0" /> {item.url}
      </a>

      <div className="mt-3 grid grid-cols-4 gap-2 text-center text-xs">
        {[["Views", item.views], ["Tim", item.likes], ["Cmt", item.comments], ["Share", item.shares]].map(([l, v]) => (
          <div key={l} className="rounded-xl bg-slate-50 py-2">
            <p className="font-extrabold text-slate-800">{num(v)}</p>
            <p className="text-slate-500">{l}</p>
          </div>
        ))}
      </div>
      <p className="mt-1.5 text-[11px] text-slate-400">Số liệu cập nhật: {when(item.stats_updated_at)}</p>

      {item.ai_check && (
        <details className="mt-3 text-xs text-slate-600">
          <summary className="cursor-pointer font-semibold">Kết quả AI kiểm tra</summary>
          <pre className="mt-1 max-h-40 overflow-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-2">
            {JSON.stringify(item.ai_check, null, 2)}
          </pre>
        </details>
      )}

      {pending && (
        <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
          <p className="text-xs font-extrabold uppercase tracking-wide text-emerald-700">Duyệt lần 1</p>
          <div>
            <input
              type="number"
              min="1"
              value={coins}
              onChange={(e) => setCoins(e.target.value)}
              placeholder="Số xu thưởng"
              className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm font-bold outline-none focus:border-emerald-500"
            />
            <p className="mt-1 text-xs text-slate-500">
              Đã điền sẵn theo mốc hiện tại, bạn sửa được. Bấm Duyệt là xu cộng thẳng vào tài khoản creator.
            </p>
          </div>
          <input
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Ghi chú cho creator (không bắt buộc, khi từ chối nên ghi lý do)"
            className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
          />
          {err && <p className="text-sm font-semibold text-rose-600">{err}</p>}
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              disabled={busy}
              onClick={() => run(true)}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 py-2.5 text-sm font-extrabold text-white disabled:opacity-60"
            >
              {busy ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />} Duyệt lần 1
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => run(false)}
              className="flex items-center justify-center gap-1.5 rounded-xl border border-rose-200 bg-rose-50 py-2.5 text-sm font-extrabold text-rose-600 disabled:opacity-60"
            >
              <X size={16} /> Từ chối
            </button>
          </div>
        </div>
      )}

      {item.status === "approved" && info && (
        <div className="mt-4 space-y-2.5 border-t border-slate-100 pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="font-extrabold text-slate-700">
              Đã duyệt {info.round}/{MAX_ROUNDS} lần
            </span>
            <span className="text-slate-500">
              Tổng đã nhận <b className="text-slate-800">{num(info.paid)}</b> xu
            </span>
          </div>

          {rounds.length > 0 && (
            <div className="space-y-1 rounded-xl bg-slate-50 p-2.5 text-xs text-slate-600">
              {rounds.map((r) => (
                <div key={r.round} className="flex items-start justify-between gap-2">
                  <span>
                    Lần {r.round} · {num(r.views)} xem · {num(r.likes)} tim · {when(r.created_at)}
                  </span>
                  <b className="shrink-0 text-emerald-700">+{num(r.paid_xu)}</b>
                </div>
              ))}
            </div>
          )}

          {info.canRound ? (
            <>
              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 text-xs text-amber-800">
                Mốc hiện tại: <b>{num(info.tier)}</b> xu · đã nhận <b>{num(info.paid)}</b> xu →{" "}
                {info.diff > 0 ? (
                  <>cộng thêm <b>{num(info.diff)}</b> xu</>
                ) : (
                  "chưa lên mốc mới"
                )}
              </div>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Ghi chú (không bắt buộc)"
                className="w-full rounded-xl border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-500"
              />
              {err && <p className="text-sm font-semibold text-rose-600">{err}</p>}
              <button
                type="button"
                disabled={busy || info.diff <= 0}
                onClick={runBonus}
                className="flex w-full items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 py-2.5 text-sm font-extrabold text-white disabled:opacity-40"
              >
                {busy ? <Loader2 size={16} className="animate-spin" /> : <TrendingUp size={16} />}
                Duyệt lần {info.round + 1}
                {info.diff > 0 ? ` · +${num(info.diff)} xu` : ""}
              </button>
            </>
          ) : (
            <p className="text-xs font-semibold text-slate-500">Video đã duyệt đủ {MAX_ROUNDS} lần.</p>
          )}

          {item.admin_note && <p className="text-xs text-slate-600">Ghi chú: {item.admin_note}</p>}
          <p className="text-xs text-slate-500">Duyệt lần 1 lúc: {when(item.reviewed_at)}</p>
        </div>
      )}

      {item.status === "rejected" && (
        <div className="mt-3 space-y-1 border-t border-slate-100 pt-3 text-xs text-slate-600">
          {item.admin_note && <p>Ghi chú: {item.admin_note}</p>}
          <p>Từ chối lúc: {when(item.reviewed_at)}</p>
        </div>
      )}
    </div>
  );
}

export default function AdminVideos() {
  const { session, loading } = useSession();
  const [isAdmin, setIsAdmin] = useState(null);
  const [items, setItems] = useState([]);
  const [names, setNames] = useState({});
  const [roundMap, setRoundMap] = useState({});
  const [tab, setTab] = useState("pending");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // kiểm tra quyền admin
  useEffect(() => {
    if (loading) return;
    if (!session) { setIsAdmin(false); return; }
    supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", session.user.id)
      .maybeSingle()
      .then(({ data }) => setIsAdmin(data?.is_admin === true));
  }, [session, loading]);

  const load = useCallback(async () => {
    setBusy(true);
    setError("");
    const { data, error } = await supabase
      .from("intro_video_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(300);
    if (error) {
      setError(error.message);
      setBusy(false);
      return;
    }
    setItems(data || []);

    const ids = [...new Set((data || []).map((d) => d.user_id))];
    if (ids.length) {
      const { data: ps } = await supabase.from("profiles").select("id,username").in("id", ids);
      const map = {};
      (ps || []).forEach((p) => { map[p.id] = p.username; });
      setNames(map);
    }

    // lịch sử từng lần duyệt
    const { data: rs } = await supabase
      .from("video_reward_rounds")
      .select("video_id,round,views,likes,paid_xu,created_at")
      .order("round", { ascending: true })
      .limit(1500);
    const rm = {};
    (rs || []).forEach((r) => { (rm[r.video_id] = rm[r.video_id] || []).push(r); });
    setRoundMap(rm);

    setBusy(false);
  }, []);

  useEffect(() => {
    if (isAdmin) load();
  }, [isAdmin, load]);

  const counts = useMemo(() => {
    const c = { all: items.length, pending: 0, approved: 0, rejected: 0, bonus: 0 };
    items.forEach((i) => {
      if (c[i.status] != null) c[i.status]++;
      if (needsBonus(i)) c.bonus++;
    });
    return c;
  }, [items]);

  const shown =
    tab === "all" ? items
    : tab === "bonus" ? items.filter(needsBonus)
    : items.filter((i) => i.status === tab);

  if (loading || isAdmin === null) return <div className="min-h-screen bg-[#f4fbf9]" />;

  if (!session || !isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-3 bg-[#f4fbf9] px-6 text-center">
        <ShieldAlert size={40} className="text-rose-500" />
        <p className="text-lg font-extrabold text-slate-800">Chỉ admin mới vào được trang này</p>
        <Link to={session ? "/app" : "/login"} className="font-semibold text-emerald-700 underline">
          {session ? "Về trang chính" : "Đăng nhập"}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4fbf9] pb-16">
      <header className="sticky top-0 z-30 border-b border-emerald-900/10 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-2">
            <Link to="/app" className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"><ArrowLeft size={18} /></Link>
            <h1 className="text-base font-extrabold text-slate-800">Duyệt video Creator</h1>
          </div>
          <button
            type="button"
            onClick={load}
            disabled={busy}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-sm font-semibold text-slate-600 hover:bg-slate-50 disabled:opacity-60"
          >
            <RefreshCw size={15} className={busy ? "animate-spin" : ""} /> Tải lại
          </button>
        </div>
        <div className="mx-auto flex max-w-3xl gap-2 overflow-x-auto px-4 pb-3">
          {TABS.map(([k, label]) => (
            <button
              key={k}
              type="button"
              onClick={() => setTab(k)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-bold transition ${
                tab === k ? "bg-emerald-600 text-white" : "bg-white text-slate-600 ring-1 ring-slate-200"
              }`}
            >
              {label} <span className="opacity-70">({counts[k]})</span>
            </button>
          ))}
        </div>
      </header>

      <main className="mx-auto max-w-3xl space-y-3 px-4 pt-4">
        {error && <p className="rounded-xl bg-rose-50 p-3 text-sm font-semibold text-rose-600">{error}</p>}
        {!error && !busy && shown.length === 0 && (
          <p className="py-16 text-center text-sm font-semibold text-slate-400">Không có video nào.</p>
        )}
        {shown.map((it) => (
          <ReviewCard
            key={it.id}
            item={it}
            name={names[it.user_id]}
            rounds={roundMap[it.id] || []}
            onDone={load}
          />
        ))}
      </main>
    </div>
  );
            }
