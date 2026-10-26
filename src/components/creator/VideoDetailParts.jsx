import React, { memo, useState } from "react";
import {
  Play, ExternalLink, AlertCircle, LineChart, Clock, Gift,
} from "lucide-react";
import { Card, CodeBox } from "./creatorUi.jsx";
import {
  LOW_TIERS, TIERS, estimateReward, likeWord, vn,
} from "../../lib/videoReward.js";

const YT_RE = /(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/;
const timeFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short", timeStyle: "medium" });
const dayFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "medium" });

/* ---------- PLAYER: hiện ảnh bìa, bấm mới nạp iframe ---------- */
export const VideoPlayer = memo(function VideoPlayer({ video }) {
  const [play, setPlay] = useState(false);
  const { platform, url, thumbnail_url: thumb, external_id: ext } = video;

  let embed = null;
  let poster = thumb;
  if (platform === "youtube") {
    const id = url?.match(YT_RE)?.[1] || (ext && ext.length === 11 ? ext : null);
    if (id) {
      embed = `https://www.youtube.com/embed/${id}?autoplay=1`;
      poster = poster || `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
    }
  } else if (platform === "tiktok") {
    const id = url?.match(/\/video\/(\d+)/)?.[1] || (/^\d+$/.test(ext || "") ? ext : null);
    if (id) embed = `https://www.tiktok.com/embed/v2/${id}`;
  }

  const tall = platform === "tiktok";
  const box = tall
    ? "mx-auto w-full max-w-[315px] aspect-[9/16]"
    : "w-full aspect-video";

  if (!embed) {
    return (
      <div className={`${box} flex flex-col items-center justify-center rounded-3xl bg-slate-900 p-5 text-center text-white/60`}>
        <AlertCircle size={32} className="mb-2" />
        <p className="text-sm">Không thể nhúng video này trực tiếp.</p>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden rounded-3xl bg-black shadow-sm ${box}`}>
      {play ? (
        <iframe
          src={embed}
          title="Video player"
          className="h-full w-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <button
          onClick={() => setPlay(true)}
          className="relative block h-full w-full"
          aria-label="Phát video"
        >
          {poster && (
            <img
              src={poster}
              alt=""
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="h-full w-full object-cover"
            />
          )}
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-black/60 text-white">
              <Play size={30} fill="currentColor" />
            </span>
          </span>
        </button>
      )}
    </div>
  );
});

/* ---------- ƯỚC TÍNH THƯỞNG ---------- */
function Bar({ label, cur, target }) {
  const pct = Math.min((cur / target) * 100, 100);
  const done = cur >= target;
  return (
    <div>
      <div className="mb-1 flex items-center justify-between text-[11px] font-bold text-slate-600">
        <span>{label}</span>
        <span className={done ? "text-emerald-600" : ""}>
          {vn(cur)}/{vn(target)}
        </span>
      </div>
      <div className="h-1.5 w-full rounded-full bg-slate-200">
        <div
          className={`h-full rounded-full ${done ? "bg-emerald-500" : "bg-cyan-500"}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

export const RewardCard = memo(function RewardCard({ video }) {
  const views = Number(video.views) || 0;
  const likes = Number(video.likes) || 0;
  const lw = likeWord(video.platform);
  const table = TIERS[video.platform] || TIERS.tiktok;

  const pub = new Date(video.video_published_at || video.published_at || video.created_at);
  const due = new Date(pub.getTime() + 7 * 86400e3);
  const daysLeft = Math.ceil((due.getTime() - Date.now()) / 86400e3);

  if (video.status === "rejected") {
    return (
      <Card>
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
          ▸ ƯỚC TÍNH THƯỞNG
        </p>
        <p className="mt-3 text-sm font-semibold text-slate-500">
          Video bị từ chối nên không được tính thưởng.
        </p>
      </Card>
    );
  }

  const est = estimateReward(video.platform, views, likes);
  const real = video.status === "approved" && video.gift_code;

  return (
    <Card>
      <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
        ▸ ƯỚC TÍNH THƯỞNG
      </p>

      <div className="mt-3 flex items-end gap-2">
        <Gift size={26} className="mb-1 text-amber-500" />
        <p className="text-4xl font-black text-amber-500">{vn(est.xu)}</p>
        <p className="mb-1 text-sm font-bold text-slate-500">xu</p>
      </div>
      <p className="mt-1 text-xs font-medium text-slate-500">{est.label}</p>

      <div className="mt-3 flex items-center gap-1.5 text-[11px] font-semibold text-slate-500">
        <Clock size={13} className="text-cyan-600" />
        {daysLeft > 0
          ? `Chốt thưởng sau ${daysLeft} ngày nữa (${dayFmt.format(due)})`
          : `Đã đủ 7 ngày (${dayFmt.format(due)}), chờ admin chốt thưởng`}
      </div>

      {est.next ? (
        <div className="mt-4 space-y-3 rounded-2xl border border-slate-100 bg-slate-50 p-3">
          <p className="text-xs font-bold text-slate-700">
            Mốc kế tiếp: <span className="text-amber-600">{vn(est.next.xu)} xu</span>
          </p>
          <Bar label="Lượt xem" cur={views} target={est.next.views} />
          <Bar label={lw[0].toUpperCase() + lw.slice(1)} cur={likes} target={est.next.likes} />
          <p className="text-[11px] text-slate-400">
            Cần đạt đồng thời cả lượt xem và {lw}. Các mốc không cộng dồn.
          </p>
        </div>
      ) : (
        <p className="mt-3 text-xs font-bold text-emerald-600">Bạn đã đạt mốc thưởng cao nhất 🎉</p>
      )}

      {real ? (
        <CodeBox code={video.gift_code} coins={video.coins} />
      ) : (
        <p className="mt-3 text-[11px] leading-relaxed text-slate-400">
          Đây là ước tính theo số liệu hiện tại. Thưởng thực nhận do admin chốt sau khi video đủ 7 ngày
          và mỗi video chỉ nhận thưởng một lần.
        </p>
      )}

      <details className="mt-3">
        <summary className="cursor-pointer text-xs font-bold text-cyan-600">Xem bảng thưởng</summary>
        <div className="mt-2 space-y-1 text-[12px] text-slate-600">
          {LOW_TIERS.map((t) => (
            <div key={t.label} className="flex justify-between">
              <span>{t.label}</span>
              <b>{vn(t.xu)} xu</b>
            </div>
          ))}
          <div className="my-1 h-px bg-slate-100" />
          {table.map((t) => (
            <div key={t.views} className="flex justify-between">
              <span>
                {vn(t.views)} xem + {vn(t.likes)} {lw.replace("lượt ", "")}
              </span>
              <b>{vn(t.xu)} xu</b>
            </div>
          ))}
        </div>
      </details>
    </Card>
  );
});

/* ---------- BIỂU ĐỒ + BẢNG MẪU ---------- */
const MetricChart = memo(function MetricChart({ samples, metric }) {
  const pts = samples.map((s) => Number(s[metric]) || 0);
  const W = 300, H = 110, P = 8;
  const max = Math.max(...pts);
  const min = Math.min(...pts);
  const span = max - min || 1;
  const xy = pts.map((v, i) => [
    P + (i / (pts.length - 1)) * (W - 2 * P),
    H - P - ((v - min) / span) * (H - 2 * P),
  ]);
  const line = xy.map((p) => p.join(",")).join(" ");
  const last = xy[xy.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-32 w-full">
      <polygon points={`${P},${H - P} ${line} ${W - P},${H - P}`} fill="#0891b2" opacity="0.12" />
      <polyline points={line} fill="none" stroke="#0891b2" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" />
      <circle cx={last[0]} cy={last[1]} r="4" fill="#0891b2" />
    </svg>
  );
});

const METRICS = [
  ["views", "Lượt xem"],
  ["likes", "Lượt thích"],
  ["comments", "Bình luận"],
];

export const HistoryCard = memo(function HistoryCard({ samples }) {
  const [metric, setMetric] = useState("views");
  const label = METRICS.find((m) => m[0] === metric)[1].toUpperCase();
  const last = samples[samples.length - 1];
  const recent = samples.slice(-8).reverse();

  return (
    <Card>
      <p className="mb-2 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
        ▸ LỊCH SỬ CHỈ SỐ
      </p>
      <div className="mb-3 flex flex-wrap gap-2">
        {METRICS.map(([k, l]) => (
          <button
            key={k}
            onClick={() => setMetric(k)}
            className={`rounded-full border px-3 py-1 text-xs font-bold ${
              metric === k ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-slate-200 text-slate-500"
            }`}
          >
            {l}
          </button>
        ))}
      </div>
      <p className="text-sm font-bold text-slate-800">
        {label} ({samples.length} MẪU)
      </p>
      {last && (
        <p className="mb-3 font-mono text-[10px] text-slate-400">
          LẦN CUỐI: {timeFmt.format(new Date(last.sampled_at))}
        </p>
      )}

      {samples.length < 2 ? (
        <div className="mb-4 flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 p-8 text-center">
          <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
            <LineChart size={20} />
          </div>
          <p className="text-[13px] font-bold uppercase tracking-widest text-slate-600">ĐANG CHỜ THÊM MẪU</p>
          <p className="mt-1 text-[12px] text-slate-500">
            Cần ít nhất 2 mẫu để vẽ biểu đồ xu hướng. Mẫu mới sẽ có khi hệ thống cập nhật số liệu.
          </p>
        </div>
      ) : (
        <div className="mb-4 rounded-xl bg-slate-50 p-2">
          <MetricChart samples={samples} metric={metric} />
        </div>
      )}

      <p className="mb-2 mt-5 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
        ▸ MẪU GẦN ĐÂY
      </p>
      {recent.length === 0 ? (
        <p className="text-xs text-slate-400">Chưa có mẫu nào.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="border-b border-slate-100 text-slate-400">
              <tr>
                <th className="pb-2 font-bold uppercase">Thời điểm</th>
                <th className="pb-2 text-center font-bold uppercase">Xem</th>
                <th className="pb-2 text-center font-bold uppercase">Thích</th>
                <th className="pb-2 text-center font-bold uppercase">BL</th>
              </tr>
            </thead>
            <tbody>
              {recent.map((m, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="py-2.5 font-mono text-[10px] text-slate-500">
                    {timeFmt.format(new Date(m.sampled_at))}
                  </td>
                  <td className="py-2.5 text-center font-bold text-slate-700">{vn(m.views || 0)}</td>
                  <td className="py-2.5 text-center font-bold text-slate-700">{vn(m.likes || 0)}</td>
                  <td className="py-2.5 text-center font-bold text-slate-700">{vn(m.comments || 0)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Card>
  );
});

export const OpenButton = memo(function OpenButton({ url, platform }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-sm"
    >
      Mở trên {platform} <ExternalLink size={15} />
    </a>
  );
});
