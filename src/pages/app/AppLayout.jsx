import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Trophy, Film, Gift, Settings, AlertTriangle,
  Download, Search, Bell, Globe, LogOut, User,
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import useSession from "../../hooks/useSession.js";
import SearchModal from "../../components/SearchModal.jsx";
import NotificationDropdown from "../../components/NotificationDropdown.jsx";

const TABS = [
  { to: "/app", end: true, label: "TỔNG QUAN", Icon: LayoutDashboard },
  { to: "/app/ranking", label: "XẾP HẠNG", Icon: Trophy },
  { to: "/app/videos", label: "VIDEO", Icon: Film },
  { to: "/app/rewards", label: "PHẦN THƯỞNG", Icon: Gift },
  { to: "/app/settings", label: "THÊM", Icon: Settings },
];

const LinkBanner = memo(function LinkBanner({ onGo }) {
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
      <button
        onClick={onGo}
        className="shrink-0 rounded-xl bg-amber-500 px-3 py-2 text-xs font-bold text-white shadow-sm"
      >
        Liên kết ngay
      </button>
    </div>
  );
});

function Nxx315Logo() {
  return (
    <div className="flex items-center gap-1 text-[18px] font-extrabold tracking-tight text-slate-900">
      Nxx315 <span className="text-cyan-600">Creator</span>
    </div>
  );
}

// Nền trắng đặc, không blur: thanh dưới đáy luôn nằm trên nội dung đang cuộn
const BottomNav = memo(function BottomNav() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-md rounded-[2rem] border border-white bg-white px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] md:max-w-xl">
      <div className="grid grid-cols-5">
        {TABS.map(({ to, end, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl py-2.5 text-[9px] font-bold tracking-wide ${
                isActive ? "text-emerald-600" : "text-slate-400"
              }`
            }
          >
            <Icon size={20} strokeWidth={2.5} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
});

const Skeleton = memo(function Skeleton() {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-64 rounded-[2rem] border border-white bg-white p-5 shadow-sm">
        <div className="flex gap-4">
          <div className="h-20 w-20 rounded-full bg-slate-200" />
          <div className="flex-1 space-y-3 py-2">
            <div className="h-5 w-1/2 rounded bg-slate-200" />
            <div className="h-6 w-3/4 rounded bg-slate-200" />
          </div>
        </div>
      </div>
      <div className="h-48 rounded-[2rem] border border-white bg-white p-5 shadow-sm">
        <div className="mb-6 h-12 w-1/2 rounded bg-slate-200" />
      </div>
    </div>
  );
});

export default function AppLayout() {
  const navigate = useNavigate();
  const { session } = useSession();

  const [ov, setOv] = useState(null);
  const [loading, setLoading] = useState(true);
  const syncedRef = useRef(false);

  const [showLang, setShowLang] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);

  const langRef = useRef(null);
  const profileRef = useRef(null);

  // reload ổn định (không phụ thuộc ov) và luôn lấy dữ liệu mới
  const reload = useCallback(async () => {
    const { data } = await supabase.rpc("get_creator_overview");
    if (data?.ok) setOv(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  // Tự làm mới thông tin kênh nếu thiếu avatar/tên (chỉ chạy 1 lần)
  useEffect(() => {
    if (!ov || syncedRef.current) return;
    syncedRef.current = true;
    const missing = (ov.channels || []).some((c) => !c.avatar || !c.name);
    if (missing) {
      supabase.functions
        .invoke("creator-verify", { body: { action: "refresh_channels" } })
        .then(() => reload());
    }
  }, [ov, reload]);

  const fetchNotifications = useCallback(async () => {
    setNotifLoading(true);
    const { data } = await supabase
      .from("notifications")
      .select("id, title, body, type, is_read, action_url, created_at")
      .order("created_at", { ascending: false })
      .limit(30);
    setNotifications(data || []);
    setNotifLoading(false);
  }, []);

  const markRead = useCallback(async (ids) => {
    if (!ids || !ids.length) return;
    await supabase.from("notifications").update({ is_read: true }).in("id", ids);
    setNotifications((list) =>
      list.map((n) => (ids.includes(n.id) ? { ...n, is_read: true } : n))
    );
  }, []);

  const unreadCount = useMemo(
    () => notifications.filter((n) => !n.is_read).length,
    [notifications]
  );

  // Chỉ lắng nghe click ngoài khi có dropdown đang mở
  useEffect(() => {
    if (!showLang && !showProfile) return;
    const onDown = (e) => {
      if (langRef.current && !langRef.current.contains(e.target)) setShowLang(false);
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [showLang, showProfile]);

  const linked = (ov?.channels || []).length > 0;

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  const goSettings = useCallback(() => navigate("/app/settings"), [navigate]);

  // Giữ nguyên tham chiếu để trang con không render lại khi mở dropdown
  const outletCtx = useMemo(() => ({ ov, reload }), [ov, reload]);

  const user = session?.user;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] pb-28 font-sans text-slate-800">
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}

      <header className="sticky top-0 z-50 border-b border-white/50 bg-[#f4fbf9]">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 md:max-w-3xl">
          <Nxx315Logo />

          <div className="flex items-center gap-3 text-slate-600 sm:gap-4">
            <button
              onClick={() => alert("Tính năng đang phát triển!")}
              className="hidden sm:block"
            >
              <Download size={20} />
            </button>
            <button onClick={() => setShowSearch(true)} className="flex items-center">
              <Search size={20} />
            </button>

            <button
              data-notif-toggle
              onClick={() => {
                setShowNotify(!showNotify);
                if (!showNotify) fetchNotifications();
              }}
              className="relative flex items-center"
            >
              <Bell size={20} />
              {unreadCount > 0 && (
                <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full border border-white bg-rose-500" />
              )}
            </button>

            {showNotify && (
              <NotificationDropdown
                notifications={notifications}
                loading={notifLoading}
                onClose={() => setShowNotify(false)}
                onItemClick={(g) => {
                  markRead(g.ids);
                  setShowNotify(false);
                  if (g.action_url) navigate(g.action_url);
                }}
                onMarkAllRead={() =>
                  markRead(notifications.filter((n) => !n.is_read).map((n) => n.id))
                }
                onViewAll={() => {
                  setShowNotify(false);
                  navigate("/app/notifications");
                }}
              />
            )}

            <div className="relative" ref={langRef}>
              <button onClick={() => setShowLang(!showLang)} className="flex items-center">
                <Globe size={20} />
              </button>
              {showLang && (
                <div className="absolute right-0 mt-3 w-40 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl">
                  <button className="w-full rounded-lg px-3 py-2 text-left text-sm font-medium text-slate-700">
                    EN — English
                  </button>
                  <button className="w-full rounded-lg bg-emerald-50 px-3 py-2 text-left text-sm font-medium text-emerald-600">
                    VI — Tiếng Việt
                  </button>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-slate-200 bg-slate-100 shadow-sm"
              >
                {user?.user_metadata?.avatar_url ? (
                  <img
                    src={user.user_metadata.avatar_url}
                    alt="Avatar"
                    width={32}
                    height={32}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                                    user ? (
                    <div className="flex h-full w-full items-center justify-center bg-cyan-600 text-xs font-bold uppercase text-white">
                      {user.email?.charAt(0) || "U"}
                    </div>
                  ) : (
                    <div className="h-full w-full bg-slate-200" />
                  )
                )}
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-100 bg-white py-2 shadow-xl">
                  <div className="mb-1 border-b border-slate-100 px-4 py-2">
                    <p className="truncate font-bold text-slate-800">
                      {user?.user_metadata?.full_name || "Creator"}
                    </p>
                    <p className="truncate text-xs text-slate-500">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      goSettings();
                    }}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700"
                  >
                    <Settings size={16} /> Cài đặt
                  </button>
                  <button className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700">
                    <User size={16} /> Tài khoản
                  </button>
                  <div className="my-1 h-px bg-slate-100" />
                  <button
                    onClick={signOut}
                    className="flex w-full items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-500"
                  >
                    <LogOut size={16} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-md space-y-4 px-4 py-5 md:max-w-3xl">
        {loading ? (
          <Skeleton />
        ) : !ov ? (
          <div className="py-16 text-center">
            <p className="text-sm text-slate-500">Không tải được dữ liệu.</p>
            <button
              onClick={() => {
                setLoading(true);
                reload();
              }}
              className="mt-3 rounded-full border border-slate-300 bg-white px-5 py-2 text-sm font-semibold text-slate-700 shadow-sm"
            >
              Thử lại
            </button>
          </div>
        ) : (
          <>
            {!linked && <LinkBanner onGo={goSettings} />}
            <Outlet context={outletCtx} />
          </>
        )}
      </main>

      <BottomNav />
    </div>
  );
    }
