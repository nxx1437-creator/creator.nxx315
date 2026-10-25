import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Plus, Send, Loader2, ExternalLink, Film, Eye, Heart, MessageCircle, RefreshCw,
} from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { supabase } from "../../lib/supabaseClient.js";
import {
  Card, Eyebrow, StatusPill, CodeBox, PLATFORMS, useMyVideos, fmt,
} from "../../components/creator/creatorUi.jsx";

function Chip({ active, onClick, dot, label, count }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-200 bg-white text-slate-500 hover:bg-slate-50"
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

export default function Videos() {
  const { session } = useSession();
  const { ov, reload: reloadOv } = useOutletContext();
  const { items, loading, reload } = useMyVideos(session?.user?.id);
  const hashtags = ov?.settings?.hashtags || "#Nxx315Studio";

  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [confirmed, setConfirmed] = useState(false);
  const [sending, setSending] = useState(false);
  const [notice, setNotice] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [pf, setPf] = useState("all");
  const [st, setSt] = useState("all");

  const refresh = async () => {
    setRefreshing(true);
    await supabase.functions.invoke("creator-scan", { body: { action: "scan_me" } });
    const { data } = await supabase.functions.invoke("creator-verify", {
      body: { action: "refresh_stats" },
    });
    if (data?.youtube_skipped > 0) {
      setNotice({
        kind: "error",
        text: "Chưa lấy được số liệu YouTube vì hệ thống chưa có khóa YouTube API.",
      });
    }
    await reload();
    setRefreshing(false);
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const count = (fn) => items.filter(fn).length;
  const shown = items.filter(
    (i) => (pf === "all" || i.platform === pf) && (st === "all" || i.status === st)
  );

  return (
    <div className="space-y-4">
      <div className="px-1">
        <h1 className="text-3xl font-extrabold text-cyan-600">Video của tôi</h1>
        <p className="mt-1 text-sm text-slate-500">Tất cả video được theo dõi tại đây.</p>
      </div>

      {notice && (
        <p className={`rounded-2xl px-4 py-3 text-sm font-semibold ${
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
            className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3.5 text-base font-bold text-white shadow-sm transition hover:bg-cyan-700"
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
            className="w-full rounded-full border border-slate-200 bg-slate-50 px-5 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white transition-colors"
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
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 disabled:opacity-40"
            >
              {sending ? <Loader2 size={16} className="animate-spin" /> : <Send size={15} />}
              {sending ? "Đang kiểm tra..." : "Gửi"}
            </button>
            <button
              onClick={() => setOpen(false)}
              className="rounded-full border border-slate-200 bg-white px-6 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Huỷ
            </button>
          </div>
          <p className="mt-3 font-mono text-[11px] leading-relaxed text-slate-400">
            Hệ thống tự kiểm tra video có thuộc kênh bạn đã liên kết và có hashtag không. Video hợp lệ sẽ
            chờ admin duyệt rồi gửi code xu.
          </p>
        </Card>
      )}

      <div className="space-y-2.5">
        <div className="flex flex-wrap items-center gap-2">
          <Eyebrow className="mr-1 text-slate-500 font-bold">▸ NỀN TẢNG</Eyebrow>
          <Chip active={pf === "all"} onClick={() => setPf("all")} label="Tất cả" count={items.length} />
          {Object.entries(PLATFORMS).map(([k, v]) => (
            <Chip
              key={k}
              active={pf === k}
              onClick={() => setPf(k)}
              dot={v.dot}
              label={v.name}
              count={count((i) => i.platform === k)}
            />
          ))}
        </div>
        <div className="flex flex-wrap gap-2">
          {[
            ["all", "Tất cả"],
            ["pending", "Đang chờ"],
            ["approved", "Đã duyệt"],
            ["rejected", "Bị từ chối"],
          ].map(([k, label]) => (
            <Chip
              key={k}
              active={st === k}
              onClick={() => setSt(k)}
              label={label}
              count={k === "all" ? items.length : count((i) => i.status === k)}
            />
          ))}
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-10">
          <Loader2 size={22} className="animate-spin text-cyan-600" />
        </div>
      ) : shown.length === 0 ? (
        <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/50 px-5 py-14 text-center">
          <Film size={36} className="mx-auto text-slate-400" />
          <p className="mt-3 text-lg font-bold text-slate-600">Chưa có video.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {shown.map((it) => (
            <Card key={it.id} className="!p-4">
              <div className="flex gap-3">
                {it.thumbnail_url ? (
                  <img
                    src={it.thumbnail_url}
                    alt=""
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
                    className="mt-2 flex items-center gap-1.5 text-xs font-medium text-cyan-600"
                  >
                    <ExternalLink size={12} className="shrink-0" />
                    <span className="truncate">{it.url}</span>
                  </a>
                  <p className="mt-1 text-[11px] text-slate-400">
                    {new Date(it.created_at).toLocaleString("vi-VN")}
                  </p>
                </div>
              </div>

              {it.status === "approved" && it.gift_code && (
                <CodeBox code={it.gift_code} coins={it.coins} />
              )}
              {it.status === "rejected" && it.admin_note && (
                <p className="mt-3 rounded-xl bg-rose-50 border border-rose-100 px-3 py-2 text-xs font-medium text-rose-600">
                  Lý do: {it.admin_note}
                </p>
              )}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
                }
