import React, { memo, useEffect, useState } from "react";
import {
  Bell, Clock, Gift, Trophy, Film, Eye, Heart, MessageSquare,
  CheckCircle2, AlertCircle, ArrowRight,
} from "lucide-react";
import { Card } from "./creatorUi.jsx";

// Nền trắng đặc, không blur -> nhẹ hơn nhiều trên điện thoại
export const CARD =
  "relative overflow-hidden rounded-[2rem] border-white bg-white p-5 shadow-sm";

const pad = (n) => String(n).padStart(2, "0");

function calcLeft() {
  const vn = new Date(Date.now() + 7 * 3600e3);
  const end = Date.UTC(vn.getUTCFullYear(), vn.getUTCMonth() + 1, 1) - 7 * 3600e3;
  const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
  return {
    d: Math.floor(s / 86400),
    h: Math.floor((s % 86400) / 3600),
    m: Math.floor((s % 3600) / 60),
    s: s % 60,
  };
}

// Chỉ component này render lại mỗi giây, phần còn lại của trang đứng yên
export const Countdown = memo(function Countdown() {
  const [left, setLeft] = useState(calcLeft);

  useEffect(() => {
    let id;
    const start = () => {
      setLeft(calcLeft());
      id = setInterval(() => setLeft(calcLeft()), 1000);
    };
    const onVis = () => {
      clearInterval(id);
      if (!document.hidden) start();
    };
    start();
    document.addEventListener("visibilitychange", onVis);
    return () => {
      clearInterval(id);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return (
    <div className="flex gap-2">
      {[[left.d, "NGÀY"], [left.h, "GIỜ"], [left.m, "PHÚT"], [left.s, "GIÂY"]].map(
        ([v, l]) => (
          <div
            key={l}
            className="flex h-12 w-12 flex-col items-center justify-center rounded-full border border-cyan-300 bg-white shadow-sm"
          >
            <p className="text-[13px] font-black leading-none text-cyan-600">{pad(v)}</p>
            <p className="mt-0.5 text-[8px] font-bold text-slate-400">{l}</p>
          </div>
        )
      )}
    </div>
  );
});

export const NotifyBanner = memo(function NotifyBanner({ onClose }) {
  return (
    <div className="relative rounded-3xl border border-emerald-100 bg-[#e6f7f2] p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
          <Bell size={18} />
        </div>
        <div className="pr-4">
          <h3 className="text-[15px] font-bold text-slate-800">Bật thông báo đẩy</h3>
          <p className="mt-1 text-[13px] leading-relaxed text-slate-600">
            Nhận tin ngay khi video được duyệt, có phần thưởng hoặc thông báo mới — kể cả khi không mở web.
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center gap-3">
        <button className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-sm">
          <Bell size={16} /> Bật ngay
        </button>
        <button onClick={onClose} className="text-slate-400">✕</button>
      </div>
    </div>
  );
});

export const EventCard = memo(function EventCard({ monthLabel }) {
  return (
    <Card className={CARD}>
      <div className="mb-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-cyan-600">
          <span className="h-1.5 w-1.5 rounded-full bg-cyan-500" /> SỰ KIỆN ĐANG DIỄN RA
        </span>
      </div>
      <h2 className="mb-4 text-3xl font-black text-cyan-600">{monthLabel}</h2>

      <div className="mb-4 flex items-center justify-between rounded-xl border border-amber-200 bg-amber-50 p-3">
        <div className="flex items-center gap-2 text-xs font-bold text-amber-700">
          <Gift size={16} /> TỔNG GIẢI THƯỞNG
        </div>
        <span className="text-sm font-bold text-amber-700">35,000 xu</span>
      </div>
      <div className="mb-6 flex items-center justify-between rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <div className="flex items-center gap-2 text-xs font-bold text-emerald-700">
          <Trophy size={16} /> TOP 1
        </div>
        <span className="text-sm font-bold text-emerald-700">700,000Đ + 150H</span>
      </div>

      <div className="flex items-center justify-between border-t border-slate-200/60 pt-4">
        <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-slate-500">
          <Clock size={12} /> KẾT THÚC SAU
        </div>
        <Countdown />
      </div>
    </Card>
  );
});

const RULES = [
  "Thời lượng tối thiểu 1 phút",
  "Đăng công khai trên TikTok hoặc YouTube",
  "Tiêu đề/mô tả phải có nội dung thật, không chỉ mỗi hashtag",
  "Gắn đủ hashtag #Nxx315Studio trong tiêu đề hoặc mô tả",
];

export const RequirementCard = memo(function RequirementCard({ approved, onRules }) {
  const n = approved || 0;
  const ok = n >= 5;
  return (
    <Card className={CARD}>
      <div className="mb-3 flex items-center justify-between">
        <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">
          ▸ YÊU CẦU NHẬN THƯỞNG
        </span>
        <button onClick={onRules} className="flex items-center gap-1 text-[10px] font-bold text-cyan-600">
          XEM THỂ LỆ <ArrowRight size={12} />
        </button>
      </div>

      <div className={`rounded-2xl border p-4 ${ok ? "border-emerald-200 bg-emerald-50" : "border-rose-200 bg-rose-50"}`}>
        <div className={`mb-2 flex items-center gap-2 text-sm font-bold ${ok ? "text-emerald-600" : "text-rose-600"}`}>
          {ok ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
          {ok ? "Đã đủ điều kiện nhận thưởng" : "Chưa đủ điều kiện nhận thưởng"}
        </div>
        <p className={`mb-3 text-xs ${ok ? "text-emerald-600/80" : "text-rose-600/80"}`}>
          Bạn mới có {n}/5 video được duyệt — cần tối thiểu 5 video được duyệt mới nhận thưởng.
        </p>
        <div className="mb-1 flex items-center justify-between text-xs font-bold text-slate-700">
          <span className="flex items-center gap-1"><Film size={14} /> Video được duyệt</span>
          <span>{n}/5</span>
        </div>
        <div className="h-1.5 w-full rounded-full bg-slate-200">
          <div
            className="h-full rounded-full bg-emerald-500"
            style={{ width: `${Math.min((n / 5) * 100, 100)}%` }}
          />
        </div>
      </div>

      <p className="mt-4 text-[11px] font-bold uppercase tracking-widest text-slate-500">
        YÊU CẦU MỖI VIDEO
      </p>
      <ul className="mt-2 space-y-2">
        {RULES.map((r) => (
          <li key={r} className="flex items-start gap-2 text-[13px] font-medium text-slate-700">
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {r}
          </li>
        ))}
      </ul>
    </Card>
  );
});

const TOTALS = [
  ["TỔNG VIDEO", Film, "total"],
  ["LƯỢT XEM", Eye, "total_views"],
  ["LƯỢT THÍCH", Heart, "total_likes"],
  ["BÌNH LUẬN", MessageSquare, "total_comments"],
];

// [nhãn, icon, field, class khung, class icon, class chữ]
const STATUSES = [
  ["ĐÃ DUYỆT", CheckCircle2, "approved", "border-emerald-200 bg-emerald-50/50", "text-emerald-500", "text-emerald-600"],
  ["ĐANG CHỜ", Clock, "pending", "border-blue-200 bg-blue-50/50", "text-blue-500", "text-blue-600"],
  ["NGHI VẤN", AlertCircle, "suspicious", "border-amber-200 bg-amber-50/50", "text-amber-500", "text-amber-600"],
  ["BỊ LOẠI", AlertCircle, "rejected", "border-rose-200 bg-rose-50/50", "text-rose-500", "text-rose-600"],
];

export const StatsCard = memo(function StatsCard({ ov }) {
  return (
    <Card className={CARD}>
      <div className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-emerald-600">
        <Trophy size={12} /> ĐIỂM THÁNG NÀY
      </div>
      <p className="mb-2 text-6xl font-black text-emerald-500">{ov.points_month || 0}</p>
      <div className="mb-6 h-1.5 w-full rounded-full bg-slate-200">
        <div className="h-full w-0 rounded-full bg-emerald-500" />
      </div>

      <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400">▸ TỔNG TÍCH LŨY</p>
      <div className="grid grid-cols-2 gap-4">
        {TOTALS.map(([label, Icon, key]) => (
          <div key={key} className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Icon size={14} />
            </div>
            <div>
              <p className="text-[9px] font-bold uppercase text-slate-400">{label}</p>
              <p className="text-sm font-black text-slate-800">{ov[key] || 0}</p>
            </div>
          </div>
        ))}
      </div>

      <p className="mb-3 mt-6 text-[10px] font-bold uppercase tracking-widest text-slate-400">▸ TRẠNG THÁI VIDEO</p>
      <div className="grid grid-cols-2 gap-2">
        {STATUSES.map(([label, Icon, key, box, ic, tx]) => (
          <div key={label} className={`flex items-center gap-2 rounded-2xl border p-3 ${box}`}>
            <Icon size={16} className={ic} />
            <div>
              <p className={`text-[9px] font-bold uppercase ${tx}`}>{label}</p>
              <p className={`text-lg font-black leading-none ${tx}`}>{ov[key] || 0}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
});
