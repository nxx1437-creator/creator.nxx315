import React, {
  memo, useCallback, useEffect, useMemo, useRef, useState,
} from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import {
  Plus, Send, Loader2, ExternalLink, Film, Eye, Heart, MessageCircle, RefreshCw, CheckCircle2,
} from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { supabase } from "../../lib/supabaseClient.js";
import {
  Card, Eyebrow, StatusPill, CodeBox, PLATFORMS, useMyVideos, fmt,
} from "../../components/creator/creatorUi.jsx";

const PAGE = 20;
const AUTO_GAP = 10 * 60 * 1000; // tự làm mới tối đa 10 phút/lần
const KEY = "nxx_videos_last_refresh";
const MAX_ROUNDS = 3; // khớp với hệ thống duyệt của admin

function RoundSteps({ status, round }) {
  if (status === "rejected") return null;
  const done = status === "approved" ? Math.max(round || 1, 1) : 0;
  return (
    <div className="mt-3">
      <div className="flex flex-wrap items-center gap-1.5">
        {Array.from({ length: MAX_ROUNDS }, (_, i) => {
          const n = i + 1;
          const ok = n <= done;
          const current = n === done + 1;
          return (
            <span
              key={n}
              className={`flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${
                ok
                  ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                  : current
                  ? "border-cyan-200 bg-cyan-50 text-cyan-700"
                  : "border-slate-200 bg-white text-slate-400"
              }`}
            >
              {ok && <CheckCircle2 size={11} />}
              Duyệt lần {n}
            </span>
          );
        })}
      </div>
      <p className="mt-1.5 text-[11px] text-slate-400">
        {status === "pending"
          ? "Đang chờ duyệt lần 1."
          : done < MAX_ROUNDS
          ? "Video tăng lượt xem sẽ được duyệt lại và cộng thêm xu."
          : "Video đã duyệt đủ các lần."}
      </p>
    </div>
  );
}

// Tạo 1 lần, dùng chung cho mọi video
const dateFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "short" });

const lastRefresh = () => {
  try { return Number(sessionStorage.getItem(KEY)) || 0; } catch { return 0; }
};
const stampRefresh = () => {
  try { sessionStorage.setItem(KEY, String(Date.now())); } catch { /* bỏ qua */ }
};

const STATUS_TABS = [
  ["all", "Tất cả"],
  ["pending", "Đang chờ"],
  ["approved", "Đã duyệt"],
  ["rejected", "Bị từ chối"],
];

function Chip({ active, onClick, dot, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold ${
        active ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-200 bg-white text-slate-500"
      }`}
    >
      {dot && <span className={`h-2 w-2 rounded-full ${dot}`} />}
      {label}
      <span className="font-mono text-xs opacity-70">{count}</span>
    </button>
  );
}

export function Stats({ it }) {
  if (it.views == null && it.likes == null && it.comments == null) return null;
  const rows = [
    [Eye, it.views],
    [Heart, it.likes],
    [MessageCircle, it.comments],
  ];
  return (
    <div className="mt-2 flex items-center gap-4">
      {rows.map(([Icon, v], i) => (
        <span key={i} className="flex items-center gap-1 text-xs font-semibold text-slate-500">
          <Icon size={13} className="text-cyan-500" /> {fmt(v)}
        </span>
      ))}
    </div>
  );
}

const VideoItem = memo(function VideoItem({ it, onOpen, legacyCode, round }) {
  return (
    <div onClick={() => onOpen(it.id)} className="cursor-pointer transition-transform active:scale-[0.98]">
      <Card className="!p-4">
        <div className="flex gap-3">
          {it.thumbnail_url ? (
            <img
              src={it.thumbnail_url}
              alt=""
              width={56}
              height={80}
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              onError={(e) => (e.currentTarget.style.display = "none")}
              className="h-20 w-14 shrink-0 rounded-xl border border-slate-200 object-cover shadow-sm"
            />
          ) : null}
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <span className="flex items-center gap-2 text-sm font-bold text-slate-800">
                <span className={`h-2.5 w-2.5 rounded-full ${PLATFORMS[it.platform]?.dot}`} />
                {PLATFORMS[it.platform]?.name}
              </span>
              <StatusPill status={it.status} />
            </div>
            {it.title && (
              <p className="mt-1.5 line-clamp-2 text-sm font-medium text-slate-600">{it.title}</p>
            )}
            <Stats it={it} />
            <a
              href={it.url}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="mt-2 flex items-center gap-1.5 text-xs font-medium text-cyan-600"
            >
              <ExternalLink size={12} className="shrink-0" />
              <span className="truncate">{it.url}</span>
            </a>
            <p className="mt-1 text-[11px] text-slate-400">{dateFmt.format(new Date(it.created_at))}</p>
          </div>
        </div>

                <RoundSteps status={it.status} round={round} />

        {it.status === "approved" && legacyCode && it.gift_code && (
          <div onClick={(e) => e.stopPropagation()}>
          <div onClick={(e) => e.stopPropagation()}>
            <p className="mt-3 text-xs font-semibold text-amber-600">
              Code cũ chưa nhập: chép code rồi nhập ở Ví trên web chính.
            </p>
            <CodeBox code={it.gift_code} coins={it.coins} />
          </div>
        )}
        {it.status === "approved" && !legacyCode && it.coins > 0 && (
          <div className="mt-3 flex items-center justify-between rounded-2xl bg-emerald-50 px-4 py-2.5">
            <span className="flex items-center gap-2 text-sm font-bold text-emerald-700">
              <CheckCircle2 size={17} /> Đã cộng vào ví{round > 1 ? ` (${round} lần duyệt)` : ""}
            </span>
            <span className="text-base font-extrabold text-emerald-700">
              +{Number(it.coins).toLocaleString("vi-VN")} xu
            </span>
          </div>
        )}
        {it.status === "rejected" && it.admin_note && (
          <p className="mt-3 rounded-xl border border-rose-100 bg-rose-50 px-3 py-2 text-xs font-medium text-rose-600">
            Lý do: {it.admin_note}
          </p>
        )}
      </Card>
    </div>
  );
});

export default function Videos() {
  const { session } = useSession();
  const { ov, reload: reloadOv } = useOutletContext();
  const uid = session?.user?.id;
  const { items, loading, reload } = useMyVideos(uid);
  const hashtags = ov?.settings?.hashtags || "#Nxx315Studio";
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pf, setPf] = useState("all");
  const [st, setSt] = useState("all");
  const [limit, setLimit] = useState(PAGE);
  const [legacy, setLegacy] = useState(() => new Set());
  const [rounds, setRounds] = useState({});

  const alive = useRef(true);
  const running = useRef(false);
  useEffect(() => () => { alive.current = false; }, []);

  // Tìm các video cũ còn code chưa nhập (video mới được cộng xu thẳng nên không có trong danh sách này)
  useEffect(() => {
    if (!uid) return;
    let on = true;
    (async () => {
      const [{ data: subs }, { data: reds }] = await Promise.all([
        supabase
          .from("intro_video_submissions")
          .select("id,gift_code_id")
          .eq("user_id", uid)
          .eq("status", "approved"),
        supabase.from("gift_code_redemptions").select("code_id").eq("user_id", uid),
      ]);
      if (!on) return;
      const done = new Set((reds || []).map((r) => r.code_id));
      setLegacy(
        new Set((subs || []).filter((s) => s.gift_code_id && !done.has(s.gift_code_id)).map((s) => s.id))
      );
    })();
    return () => { on = false; };
  }, [uid, items]);

  const refresh = useCallback(async () => {
    if (running.current) return;
    running.current = true;
    setRefreshing(true);
    try {
      await supabase.functions.invoke("creator-scan", { body: { action: "scan_me" } });
      const { data } = await supabase.functions.invoke("creator-verify", {
        body: { action: "refresh_stats" },
      });
      if (alive.current && data?.youtube_skipped > 0) {
        setNotice({
          kind: "error",
          text: "Chưa lấy được số liệu YouTube vì hệ thống chưa có khóa YouTube API.",
        });
      }
      await reload();
    } catch {
      /* bỏ qua, giữ dữ liệu cũ */
    } finally {
      stampRefresh();
      running.current = false;
      if (alive.current) setRefreshing(false);
    }
  }, [reload]);

  useEffect(() => {
  if (!uid) return;
  let on = true;
  supabase
    .from("intro_video_submissions")
    .select("id,review_round")
    .eq("user_id", uid)
    .eq("status", "approved")
    .then(({ data }) => {
      if (on) setRounds(Object.fromEntries((data || []).map((r) => [r.id, r.review_round])));
    });
  return () => { on = false; };
}, [uid, items]);

  // Tự làm mới khi vào trang, nhưng tối đa 10 phút/lần
  useEffect(() => {
    if (!uid) return;
    if (Date.now() - lastRefresh() > AUTO_GAP) refresh();
  }, [uid, refresh]);

  const submit = async () => {
    if (sending || !url.trim() || !confirmed) return;
    setSending(true);
    setNotice(null);
    const { data, error } = await supabase.functions.invoke("creator-verify", {
      body: { action: "submit_video", url },
    });
    setSending(false);
    if (error || !data) {
      setNotice({ kind: "error", text: "Có lỗi xảy ra, vui lòng thử lại." });
      return;
    }
    if (!data.ok) {
      setNotice({ kind: "error", text: data.message });
      return;
    }
    setNotice({
      kind: data.status === "rejected" ? "error" : "ok",
      text: data.status === "rejected" ? "Video bị từ chối: " + data.message : data.message,
    });
    setUrl("");
    setConfirmed(false);
    setOpen(false);
    reload();
    reloadOv();
  };

  const counts = useMemo(() => {
    const c = { pf: {}, st: {} };
    for (const i of items) {
      c.pf[i.platform] = (c.pf[i.platform] || 0) + 1;
      c.st[i.status] = (c.st[i.status] || 0) + 1;
    }
    return c;
  }, [items]);

  const shown = useMemo(
    () =>
      items.filter(
        (i) => (pf === "all" || i.platform === pf) && (st === "all" || i.status === st)
      ),
    [items, pf, st]
  );

  const openVideo = useCallback((id) => navigate(`/app/videos/${id}`), [navigate]);
  const pickPf = (k) => { setPf(k); setLimit(PAGE); };
  const pickSt = (k) => { setSt(k); setLimit(PAGE); };

  return (
    <div className="space-y-4">
      <div className="px-1">
        <h1 className="text-3xl font-extrabold text-cyan-600">Video của tôi</h1>
        <p className="mt-1 text-sm text-slate-500">Tất cả video được theo dõi tại đây.</p>
      </div>

      {notice && (
        <p
          className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
            notice.kind === "ok" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600"
          }`}
        >
          {notice.text}
        </p>
      )}

      {!open ? (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if ((ov?.channels || []).length === 0) {
                setNotice({
                  kind: "error",
                  text: "Bạn cần liên kết kênh TikTok hoặc YouTube trước khi gửi video.",
                });
                return;
              }
              setOpen(true);
              setNotice(null);
            }}
            className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3.5 text-base font-bold text-white shadow-sm"
          >
            <Plus size={20} /> Gửi video
          </button>
          <button
            onClick={refresh}
            disabled={refreshing}
            className="flex h-12 w-12 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-sm disabled:opacity-50"
            aria-label="Làm mới số liệu"
          >
            <RefreshCw size={18} className={refreshing ? "animate-spin" : ""} />
          </button>
        </div>
      ) : (
        <Card>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Dán link video YouTube hoặc TikTok của bạn"
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            maxLength={300}
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white"
          />
          <label className="mt-3 flex cursor-pointer items-start gap-2.5 text-xs text-slate-600">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="mt-0.5 h-4 w-4 shrink-0 accent-cyan-600"
            />
            <span>
              Video đã có hashtag <b className="text-cyan-600">{hashtags}</b> trong tiêu đề hoặc mô tả
            </span>
          </label>
          <div className="mt-4 flex gap-2">
            <button
              onClick={submit}
              disabled={sending || !url.trim() || !confirmed}
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm disabled:opacity-40"
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              {sending ? "Đang kiểm tra..." : "Gửi"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600"
            >
              Huỷ
            </button>
          </div>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-slate-400">
            Hệ thống tự kiểm tra video có thuộc kênh bạn đã liên kết và có hashtag không. Video hợp lệ sẽ
            chờ admin duyệt lần 1, được duyệt là xu cộng thẳng vào ví. Video tăng lượt xem sẽ được duyệt
            lại (tối đa 3 lần) và cộng thêm phần xu chênh lệch.
          </p>
        </Card>
      )}

      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <Eyebrow className="mr-1 font-bold text-slate-500">▸ NỀN TẢNG</Eyebrow>
          <Chip active={pf === "all"} onClick={() => pickPf("all")} label="Tất cả" count={items.length} />
          {Object.entries(PLATFORMS).map(([k, v]) => (
            <Chip
              key={k}
              active={pf === k}
              onClick={() => pickPf(k)}
              dot={v.dot}
              label={v.name}
              count={counts.pf[k] || 0}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {STATUS_TABS.map(([k, label]) => (
            <Chip
              key={k}
              active={st === k}
              onClick={() => pickSt(k)}
              label={label}
              count={k === "all" ? items.length : counts.st[k] || 0}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="h-40" />
      ) : shown.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white px-5 py-14 text-center">
          <Film size={36} className="mx-auto text-slate-400" />
          <p className="mt-3 text-lg font-bold text-slate-600">Chưa có video.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {shown.slice(0, limit).map((it) => (
            <VideoItem key={it.id} it={it} onOpen={openVideo} legacyCode={legacy.has(it.id)} round={rounds[it.id] || 0} />
          ))}
          {shown.length > limit && (
            <button
              onClick={() => setLimit((n) => n + PAGE)}
              className="w-full rounded-full border border-slate-200 bg-white py-3 text-sm font-bold text-slate-600 shadow-sm"
            >
              Xem thêm ({shown.length - limit})
            </button>
          )}
        </div>
      )}
    </div>
  );
      }
