import React, { useEffect, useMemo, useRef } from "react";
import { Bell, X, ArrowRight, Flame, Info, Trophy, CheckCheck } from "lucide-react";

const ICONS = {
  task_reminder: { Icon: Flame, cls: "bg-orange-50 text-orange-500" },
  streak_complete: { Icon: Trophy, cls: "bg-amber-50 text-amber-500" },
  system: { Icon: Info, cls: "bg-sky-50 text-sky-500" },
};
const DEFAULT_ICON = { Icon: Bell, cls: "bg-slate-100 text-slate-500" };

function timeAgo(iso) {
  const s = Math.max(0, (Date.now() - new Date(iso).getTime()) / 1000);
  if (s < 60) return "vừa xong";
  if (s < 3600) return `${Math.floor(s / 60)} phút trước`;
  if (s < 86400) return `${Math.floor(s / 3600)} giờ trước`;
  return `${Math.floor(s / 86400)} ngày trước`;
}

// Gộp các thông báo giống hệt nhau (cùng loại, tiêu đề, nội dung) thành 1 dòng
function groupNotifications(list) {
  const map = new Map();
  for (const n of list) {
    const body = n.body ?? n.message ?? "";
    const key = `${n.type || ""}|${n.title || ""}|${body}`;
    const g = map.get(key);
    if (!g) {
      map.set(key, { ...n, body, ids: [n.id], count: 1, unread: !n.is_read });
    } else {
      g.ids.push(n.id);
      g.count += 1;
      g.unread = g.unread || !n.is_read;
    }
  }
  return [...map.values()];
}

export default function NotificationDropdown({
  notifications = [], // sắp xếp mới nhất trước
  loading = false,
  onClose,
  onItemClick, // (nhóm) => void  - đánh dấu đã đọc và mở liên kết
  onMarkAllRead, // () => void
  onViewAll, // () => void
}) {
  const ref = useRef(null);
  const closeRef = useRef(onClose);
  closeRef.current = onClose;

  useEffect(() => {
    const onPointerDown = (e) => {
      if (ref.current?.contains(e.target)) return;
      // Bấm vào nút chuông thì để nút chuông tự bật/tắt
      if (e.target.closest?.("[data-notif-toggle]")) return;
      closeRef.current?.();
    };
    const onKey = (e) => {
      if (e.key === "Escape") closeRef.current?.();
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const groups = useMemo(() => groupNotifications(notifications), [notifications]);
  const unread = notifications.filter((n) => !n.is_read).length;

  return (
    <div
      ref={ref}
      role="dialog"
      aria-label="Thông báo"
      className="fixed right-4 top-[64px] z-[100] w-[calc(100vw-32px)] max-w-[340px] overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-2xl"
    >
      <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
        <span className="flex items-center gap-2 text-[11px] font-bold uppercase tracking-widest text-slate-500">
          ▸ Thông báo
          {unread > 0 && (
            <span className="rounded-full bg-rose-500 px-1.5 py-0.5 text-[10px] font-bold leading-none text-white">
              {unread > 99 ? "99+" : unread}
            </span>
          )}
        </span>
        <div className="flex items-center gap-1">
          {unread > 0 && onMarkAllRead && (
            <button
              type="button"
              onClick={onMarkAllRead}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-emerald-600 transition hover:bg-emerald-50"
            >
              <CheckCheck size={14} /> Đã đọc hết
            </button>
          )}
          <button
            type="button"
            aria-label="Đóng"
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      <div className="max-h-[min(60vh,340px)] overflow-y-auto overscroll-contain">
        {loading ? (
          <p className="py-8 text-center text-sm text-slate-400">Đang tải...</p>
        ) : groups.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Bell size={36} className="mb-3 text-slate-200" />
            <p className="text-sm font-medium text-slate-500">Chưa có thông báo.</p>
          </div>
        ) : (
          groups.map((g) => {
            const { Icon, cls } = ICONS[g.type] || DEFAULT_ICON;
            return (
              <button
                key={g.id}
                type="button"
                onClick={() => onItemClick?.(g)}
                className={`flex w-full gap-3 border-b border-slate-50 px-4 py-3 text-left transition last:border-0 hover:bg-slate-50 ${
                  g.unread ? "bg-emerald-50/40" : ""
                }`}
              >
                <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${cls}`}>
                  <Icon size={16} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="flex items-start justify-between gap-2">
                    <span className="break-words text-sm font-semibold text-slate-800">
                      {g.title}
                      {g.count > 1 && <span className="ml-1 text-xs font-bold text-slate-400">×{g.count}</span>}
                    </span>
                    {g.unread && <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-rose-500" />}
                  </span>
                  {g.body && <span className="mt-0.5 block break-words text-xs text-slate-500">{g.body}</span>}
                  <span className="mt-1 block text-[10px] text-slate-400">{timeAgo(g.created_at)}</span>
                </span>
              </button>
            );
          })
        )}
      </div>

      {onViewAll && (
        <div className="border-t border-slate-100 px-4 py-3">
          <button
            type="button"
            onClick={onViewAll}
            className="flex w-full items-center justify-between text-sm font-semibold text-slate-700 transition hover:text-cyan-600"
          >
            Xem tất cả
            <ArrowRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
  }
