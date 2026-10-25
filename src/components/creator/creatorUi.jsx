import React, { useState, useEffect, useCallback } from "react";
import { Clock, CheckCircle2, XCircle, Loader2, Copy, Check, Gift, PlayCircle } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";

export const PLATFORMS = {
  youtube: { name: "YouTube", dot: "bg-red-500", ph: "https://youtube.com/@ten-kenh-cua-ban" },
  tiktok: { name: "TikTok", dot: "bg-cyan-500", ph: "https://tiktok.com/@ten-nguoi-dung" },
};

export const STATUS = {
  pending: { label: "Đang chờ", cls: "border-amber-200 bg-amber-50 text-amber-600", Icon: Clock },
  approved: { label: "Đã duyệt", cls: "border-emerald-200 bg-emerald-50 text-emerald-600", Icon: CheckCircle2 },
  rejected: { label: "Bị từ chối", cls: "border-rose-200 bg-rose-50 text-rose-600", Icon: XCircle },
};

export const getTier = (n) =>
  n >= 30
    ? { name: "ELITE", cls: "from-fuchsia-500 to-purple-600" }
    : n >= 15
    ? { name: "PRO", cls: "from-amber-400 to-orange-500" }
    : n >= 5
    ? { name: "RISING", cls: "from-cyan-400 to-blue-500" }
    : { name: "COMMON", cls: "from-slate-400 to-slate-600" };

export const fmt = (n) => {
  if (n === null || n === undefined) return "—";
  const v = Number(n);
  if (v >= 1e6) return (v / 1e6).toFixed(1).replace(/\.0$/, "") + "M";
  if (v >= 1e3) return (v / 1e3).toFixed(1).replace(/\.0$/, "") + "K";
  return String(v);
};

// 1. CARD: Đổi sang nền trắng, viền xám nhạt, bóng đổ nhẹ
export function Card({ children, className = "" }) {
  return (
    <div
      className={`relative overflow-hidden rounded-[2rem] border border-white bg-white/80 p-5 shadow-sm backdrop-blur-sm ${className}`}
    >
      {children}
      {/* Đường kẻ màu xanh dưới đáy thẻ */}
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] bg-gradient-to-r from-cyan-400/0 via-cyan-400/50 to-blue-500/0" />
    </div>
  );
}

// 2. EYEBROW (Chữ nhỏ trên tiêu đề)
export function Eyebrow({ children, className = "" }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[0.18em] text-slate-500 font-semibold ${className}`}>
      {children}
    </p>
  );
}

// 3. STATUS PILL (Nhãn trạng thái)
export function StatusPill({ status }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-bold ${s.cls}`}>
      <s.Icon size={11} /> {s.label}
    </span>
  );
}

// 4. AVATAR
export function Avatar({ src, name, size = 48 }) {
  const [bad, setBad] = useState(false);
  const letter = (name || "?").trim().charAt(0).toUpperCase();
  return src && !bad ? (
    <img
      src={src}
      alt=""
      referrerPolicy="no-referrer"
      onError={() => setBad(true)}
      style={{ width: size, height: size }}
      className="shrink-0 rounded-full border border-slate-200 object-cover shadow-sm"
    />
  ) : (
    <span
      style={{ width: size, height: size }}
      className="flex shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 font-bold text-white shadow-sm"
    >
      {letter}
    </span>
  );
}

// 5. CODE BOX (Hộp nhập Gift Code)
export function CodeBox({ code, coins }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setDone(true);
      setTimeout(() => setDone(false), 1500);
    } catch {
      /* bỏ qua */
    }
  };
  return (
    <div className="mt-3 rounded-2xl border border-dashed border-emerald-300 bg-emerald-50 p-3">
      <div className="flex items-center justify-between text-xs">
        <span className="flex items-center gap-1.5 font-bold text-emerald-600">
          <Gift size={14} /> Code nhận xu
        </span>
        <span className="rounded-full bg-amber-100 px-2 py-0.5 font-bold text-amber-600">
          +{Number(coins || 0).toLocaleString("vi-VN")} xu
        </span>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <code className="min-w-0 flex-1 truncate rounded-xl border border-emerald-200 bg-white px-3 py-2.5 text-center font-mono text-sm font-bold tracking-wider text-slate-800">
          {code}
        </code>
        <button
          onClick={copy}
          className="flex shrink-0 items-center gap-1 rounded-xl bg-emerald-500 px-3 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-emerald-600"
        >
          {done ? <Check size={13} /> : <Copy size={13} />} {done ? "Đã chép" : "Chép"}
        </button>
      </div>
      <p className="mt-2 text-[11px] font-medium text-emerald-600">
        Vào web chính → Ví → Nhập Gift Code để nhận xu.
      </p>
    </div>
  );
}

// Hook lấy danh sách video (Giữ nguyên logic)
export function useMyVideos(userId) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const load = useCallback(async () => {
    if (!userId) return;
    const { data } = await supabase
      .from("intro_video_submissions")
      .select(
        "id, url, platform, status, admin_note, gift_code, coins, created_at, title, thumbnail_url, views, likes, comments, shares"
      )
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);
    setItems(data || []);
    setLoading(false);
  }, [userId]);
  useEffect(() => {
    load();
  }, [load]);
  return { items, loading, reload: load };
}

// 6. CHANNEL LINK CARD (Thẻ liên kết kênh)
export function ChannelLinkCard({ platform, channel, onChanged }) {
  const meta = PLATFORMS[platform];
  const [url, setUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState(null);

  const done = (data, error) => {
    setBusy(false);
    if (error || !data) {
      setMsg({ ok: false, text: "Có lỗi xảy ra, vui lòng thử lại." });
      return;
    }
    setMsg({ ok: !!data.ok, text: data.message });
    if (data.ok) {
      setUrl("");
      onChanged?.();
    }
  };

  const link = async () => {
    setBusy(true);
    setMsg(null);
    const { data, error } = await supabase.functions.invoke("creator-verify", {
      body: { action: "link_channel", platform, url },
    });
    done(data, error);
  };

  const unlink = async () => {
    setBusy(true);
    setMsg(null);
    const { data, error } = await supabase.rpc("unlink_creator_channel", { p_platform: platform });
    done(data, error);
  };

  return (
    <div className="py-3 px-1">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={`h-3 w-3 rounded-full ${meta.dot}`} />
          <span className="text-base font-bold text-slate-800">{meta.name}</span>
        </div>
        <span
          className={`rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-widest ${
            channel
              ? "border-emerald-200 bg-emerald-50 text-emerald-600"
              : "border-slate-200 bg-slate-50 text-slate-500"
          }`}
        >
          {channel ? "✓ ĐÃ LIÊN KẾT" : "CHƯA LIÊN KẾT"}
        </span>
      </div>

      {channel ? (
        <>
          <div className="mt-4 flex items-center gap-3">
            <Avatar src={channel.avatar} name={channel.name} size={56} />
            <div className="min-w-0">
              <p className="truncate text-base font-bold text-slate-800">{channel.name || channel.handle}</p>
              <p className="truncate font-mono text-xs text-slate-500">{channel.handle}</p>
              {channel.followers !== null && channel.followers !== undefined && (
                <p className="text-xs font-semibold text-cyan-600">{fmt(channel.followers)} người theo dõi</p>
              )}
            </div>
          </div>
          <button
            onClick={unlink}
            disabled={busy}
            className="mt-4 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-600 shadow-sm disabled:opacity-50"
          >
            {busy ? "Đang xử lý..." : "Huỷ liên kết"}
          </button>
        </>
      ) : (
        <>
          <input
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={meta.ph}
            inputMode="url"
            autoComplete="off"
            spellCheck={false}
            maxLength={200}
            className="mt-3 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400 focus:border-cyan-500 focus:bg-white transition-colors"
          />
          <button
            onClick={link}
            disabled={busy || !url.trim()}
            className="mt-3 flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700 disabled:opacity-50"
          >
            {busy && <Loader2 size={15} className="animate-spin" />}
            {busy ? "Đang kiểm tra kênh..." : "Liên kết kênh"}
          </button>
        </>
      )}

      {msg && (
        <p className={`mt-3 text-xs font-semibold ${msg.ok ? "text-emerald-600" : "text-rose-500"}`}>
          {msg.text}
        </p>
      )}
    </div>
  );
}

// 7. GUIDE VIDEO
export function GuideVideo({ url }) {
  const u = (url || "").trim();
  const yt = u.match(
    /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/
  )?.[1];
  return (
    <Card>
      <Eyebrow className="flex items-center gap-2 !text-slate-600">
        <PlayCircle size={14} className="text-cyan-600" /> Hướng dẫn liên kết kênh
      </Eyebrow>
      <div className="mt-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
        {yt ? (
          <iframe
            title="Hướng dẫn liên kết kênh"
            src={`https://www.youtube.com/embed/${yt}`}
            className="aspect-video w-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : /\.(mp4|webm)(\?|$)/i.test(u) ? (
          <video src={u} controls playsInline className="aspect-video w-full" />
        ) : (
          <div className="flex aspect-video flex-col items-center justify-center gap-2 text-center">
            <PlayCircle size={34} className="text-slate-300" />
            <p className="text-sm font-semibold text-slate-500">Video hướng dẫn sắp có</p>
            <p className="px-6 text-xs text-slate-400">Dán link kênh ở bên dưới để liên kết nhé.</p>
          </div>
        )}
      </div>
    </Card>
  );
    }
