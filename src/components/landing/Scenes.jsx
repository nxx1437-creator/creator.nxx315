import React, { useEffect, useState } from "react";
import { Play } from "lucide-react";

/* "Thời tiết" nền: mảng màu có hướng, viền nhòe — màu nằm trong vật thể, không tô cả trang */
const STREAK = "repeating-linear-gradient(104deg, rgba(255,255,255,.09) 0 1px, transparent 1px 7px)";
const TONES = {
  grass: `${STREAK}, linear-gradient(118deg,#27511f 0%,#5d8c3a 38%,#2c5a2a 64%,#86a94f 100%)`,
  sky: `${STREAK}, linear-gradient(160deg,#0a74a6 0%,#00a2c7 38%,#6fd0ea 72%,#d9f4fb 100%)`,
  rose: `${STREAK}, linear-gradient(135deg,#6e1029 0%,#b3213f 52%,#e0707f 100%)`,
  sand: `${STREAK}, linear-gradient(150deg,#7d6347 0%,#cfa982 50%,#f0dcc2 100%)`,
  blue: `${STREAK}, linear-gradient(140deg,#0035b8 0%,#0052ff 50%,#6f9bff 100%)`,
};

export function Scene({ tone = "grass", className = "", delay = 0, children }) {
  return (
    <div className={`scene-in relative ${className}`} style={{ animationDelay: `${delay}ms` }}>
      <div
        aria-hidden="true"
        className="absolute -inset-2 rounded-[32px]"
        style={{ background: TONES[tone], filter: "blur(9px)" }}
      />
      <div className="relative flex h-full w-full items-center justify-center p-4 sm:p-5">{children}</div>
    </div>
  );
}

const CARD = "w-full max-w-[220px] rounded-[10px] bg-white p-3 text-[12px] leading-[1.35] text-ink";

export function VideoCard() {
  return (
    <div className={CARD}>
      <div className="relative flex aspect-video items-center justify-center rounded-[6px] bg-[#1a1a1a]">
        <Play size={18} className="text-white" fill="currentColor" />
      </div>
      <p className="mt-2 tracking-head" style={{ fontWeight: 450 }}>Review Nxx315 Studio</p>
      <p className="mt-1 flex items-center gap-1.5 text-mute">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2f9e5f]" /> Đã duyệt
      </p>
    </div>
  );
}

export function CodeCard() {
  return (
    <div className={CARD}>
      <p className="text-mute">Gift Code VIP</p>
      <p className="mt-1.5 rounded-[6px] bg-stone px-2.5 py-2 text-center font-mono text-[13px]">••••-••••-••••</p>
      <div className="mt-2 flex h-8 items-center justify-center rounded-[6px] bg-ink text-[12px] text-canvas" style={{ fontWeight: 450 }}>
        Chép code
      </div>
    </div>
  );
}

export function RankCard() {
  const rows = [["Hạng 1", "100%"], ["Hạng 2", "78%"], ["Hạng 3", "56%"]];
  return (
    <div className={CARD}>
      <p className="text-mute">Bảng xếp hạng</p>
      <div className="mt-2 space-y-2">
        {rows.map(([l, w]) => (
          <div key={l}>
            <p className="t-idx text-mute">{l}</p>
            <div className="mt-1 h-1.5 rounded-full bg-stone">
              <div className="h-full rounded-full bg-ink" style={{ width: w }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LinkCard() {
  return (
    <div className={CARD}>
      <p className="text-mute">Liên kết kênh</p>
      <p className="mt-1.5 truncate rounded-[6px] border border-rule px-2.5 py-2 text-mute">tiktok.com/@kenh-cua-ban</p>
      <div className="mt-2 flex h-8 items-center justify-center rounded-[6px] bg-ink text-[12px] text-canvas" style={{ fontWeight: 450 }}>
        Liên kết
      </div>
    </div>
  );
}

export function useMonthEnd() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const tick = () => {
      const vn = new Date(Date.now() + 7 * 3600e3);
      const end = Date.UTC(vn.getUTCFullYear(), vn.getUTCMonth() + 1, 1) - 7 * 3600e3;
      const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setLeft({ d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600), m: Math.floor((s % 3600) / 60), s: s % 60 });
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export function CountdownCard() {
  const left = useMonthEnd();
  return (
    <div className={CARD}>
      <p className="text-mute">Chốt thưởng sau</p>
      <p className="mt-1 text-[22px] leading-[1.1] tracking-head tabular-nums">
        {left ? `${left.d} ngày ${left.h} giờ` : "—"}
      </p>
      <p className="mt-2 text-mute">Top xếp hạng nhận tiền mặt</p>
    </div>
  );
}

export function CoinCard() {
  return (
    <div className={CARD}>
      <p className="text-mute">Xu thưởng</p>
      <div className="mt-2 flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ink text-[11px] text-canvas">xu</span>
        <p className="tracking-head" style={{ fontWeight: 450 }}>Cộng ngay khi video được duyệt</p>
      </div>
    </div>
  );
}
