import React, { useEffect, useState, useCallback } from "react";
import { NavLink, Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import {
  LayoutDashboard, Trophy, Film, Gift, Settings, ArrowLeft, Loader2, AlertTriangle,
} from "lucide-react";
import { supabase, MAIN_SITE } from "../../lib/supabaseClient.js";

const TABS = [
  { to: "/app", end: true, label: "Tổng quan", Icon: LayoutDashboard },
  { to: "/app/ranking", label: "Xếp hạng", Icon: Trophy },
  { to: "/app/videos", label: "Video", Icon: Film },
  { to: "/app/rewards", label: "Thưởng", Icon: Gift },
  { to: "/app/settings", label: "Thêm", Icon: Settings },
];

function LinkBanner({ showButton, onGo }) {
  return (
    <div className="flex items-start gap-3 rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-sm">
      <AlertTriangle size={22} className="mt-0.5 shrink-0 text-amber-500" />
      <div className="min-w-0 flex-1">
        <p className="font-mono text-xs font-bold uppercase tracking-widest text-amber-900">
          Bạn chưa liên kết kênh
        </p>
        <p className="mt-1 font-mono text-[11px] uppercase leading-relaxed tracking-wide text-amber-700">
          Liên kết kênh TikTok hoặc YouTube để bắt đầu gửi video và nhận thưởng.
        </p>
      </div>
      {showButton && (
        <button
          onClick={onGo}
          className="shrink-0 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-white shadow-sm"
        >
          Liên kết ngay
        </button>
      )}
    </div>
  );
}

export default function AppLayout() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [ov, setOv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [synced, setSynced] = useState(false);

  const reload = useCallback(async () => {
    const { data } = await supabase.rpc("get_creator_overview");
    if (data?.ok) setOv(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    if (!ov || synced) return;
    setSynced(true);
    const missing = (ov.channels || []).some((c) => !c.avatar || !c.name);
    if (missing) {
      supabase.functions
        .invoke("creator-verify", { body: { action: "refresh_channels" } })
        .then(() => reload());
    }
  }, [ov, synced, reload]);

  const linked = (ov?.channels || []).length > 0;
  const onSettings = pathname.startsWith("/app/settings");

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] pb-28 text-slate-800 font-sans">
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <header className="sticky top-0 z-30 border-b border-white/50 bg-[#f4fbf9]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 md:max-w-3xl">
          <a
            href={`${MAIN_SITE}/dashboard`}
            className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 shadow-sm"
          >
            <ArrowLeft size={14} /> Web chính
          </a>
          <Link to="/" className="text-base font-bold text-slate-900">
            CloudPhone <span className="text-emerald-500">Creator</span>
          </Link>
        </div>
      </header>

      <main className="relative mx-auto max-w-md space-y-4 px-4 py-5 md:max-w-3xl">
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 size={24} className="animate-spin text-cyan-600" />
          </div>
        ) : !ov ? (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-500">Không tải được dữ liệu.</p>
            <button
              onClick={() => { setLoading(true); reload(); }}
              className="mt-3 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <>
            {!linked && (
              <LinkBanner showButton={!onSettings} onGo={() => navigate("/app/settings")} />
            )}
            <Outlet context={{ ov, reload }} />
          </>
        )}
      </main>

      {/* Thanh điều hướng dưới cùng */}
      <nav className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-md rounded-3xl border border-white bg-white/90 px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:max-w-xl">
        <div className="grid grid-cols-5">
          {TABS.map(({ to, end, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl py-2 text-[10px] font-semibold uppercase tracking-wide transition-colors ${
                  isActive ? "bg-emerald-50 text-emerald-600" : "text-slate-400 hover:text-slate-600"
                }`
              }
            >
              <Icon size={19} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
        }
