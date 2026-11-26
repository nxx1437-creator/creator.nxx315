import React, { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { NavLink, Link, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Trophy, Film, Gift, Settings, Search, Bell, LogOut } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import useSession from "../../hooks/useSession.js";
import SearchModal from "../../components/SearchModal.jsx";
import NotificationDropdown from "../../components/NotificationDropdown.jsx";

const TABS = [
  { to: "/app", end: true, label: "Tổng quan", Icon: LayoutDashboard },
  { to: "/app/ranking", label: "Xếp hạng", Icon: Trophy },
  { to: "/app/videos", label: "Video", Icon: Film },
  { to: "/app/rewards", label: "Phần thưởng", Icon: Gift },
  { to: "/app/settings", label: "Cài đặt", Icon: Settings },
];

const LinkBanner = memo(function LinkBanner({ onGo }) {
  return (
    <div className="flex flex-col gap-3 border-y border-rule py-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-[15px]" style={{ fontWeight: 450 }}>Bạn chưa liên kết kênh</p>
        <p className="mt-0.5 text-[14px] leading-[1.5] text-mute">
          Liên kết kênh TikTok hoặc YouTube để gửi video và nhận thưởng.
        </p>
      </div>
      <button onClick={onGo} className="btn btn-primary shrink-0">Liên kết kênh</button>
    </div>
  );
});

function Wordmark() {
  return (
    <Link to="/app" className="flex items-center gap-2 text-[15px] tracking-head" style={{ fontWeight: 450 }}>
      <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden="true">
        <rect width="18" height="18" rx="3" fill="#1a1a1a" />
        <path d="M6.5 5l6 4-6 4z" fill="#f8f8f7" />
      </svg>
      <span>nxx315 <span className="text-mute">creator</span></span>
    </Link>
  );
}

/* Điện thoại: thanh tab dưới đáy, nền đặc, một đường kẻ mảnh phía trên */
const BottomNav = memo(function BottomNav() {
  return (
    <nav
      aria-label="Điều hướng chính"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-rule bg-canvas md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="mx-auto grid max-w-md grid-cols-5">
        {TABS.map(({ to, end, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-h-[56px] flex-col items-center justify-center gap-1 text-[11px] ${isActive ? "text-ink" : "text-mute"}`
            }
            style={({ isActive }) => ({ fontWeight: isActive ? 500 : 400 })}
          >
            <Icon size={20} strokeWidth={1.75} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
});

/* Máy tính: tab nằm ngay thanh trên */
function TopTabs() {
  return (
    <nav aria-label="Điều hướng chính" className="hidden items-center gap-1 md:flex">
      {TABS.map(({ to, end, label }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            `rounded px-3 py-1.5 text-[13px] transition-colors ${isActive ? "bg-stone text-ink" : "text-navgray hover:text-ink"}`
          }
        >
          {label}
        </NavLink>
      ))}
    </nav>
  );
}

const Skeleton = memo(function Skeleton() {
  return (
    <div className="animate-pulse space-y-6" aria-hidden="true">
      <div className="flex gap-4 border-b border-rule pb-6">
        <div className="h-16 w-16 rounded-full bg-stone" />
        <div className="flex-1 space-y-3 py-2">
          <div className="h-4 w-1/3 rounded bg-stone" />
          <div className="h-5 w-2/3 rounded bg-stone" />
        </div>
      </div>
      <div className="h-40 rounded bg-stone" />
    </div>
  );
});

export default function AppLayout() {
  const navigate = useNavigate();
  const { session } = useSession();

  const [ov, setOv] = useState(null);
  const [loading, setLoading] = useState(true);
  const syncedRef = useRef(false);

  const [showProfile, setShowProfile] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [showNotify, setShowNotify] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [notifLoading, setNotifLoading] = useState(false);

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
    if (!showProfile) return;
    const onDown = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setShowProfile(false);
    };
    document.addEventListener("pointerdown", onDown);
    return () => document.removeEventListener("pointerdown", onDown);
  }, [showProfile]);

  const linked = (ov?.channels || []).length > 0;

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  const goSettings = useCallback(() => navigate("/app/settings"), [navigate]);

  // Giữ nguyên tham chiếu để trang con không render lại khi mở dropdown
  const outletCtx = useMemo(() => ({ ov, reload }), [ov, reload]);

  const user = session?.user;
  // Ảnh lấy từ phiên đăng nhập, chưa có thì dùng ảnh server đã trả sẵn
  const avatarUrl = user?.user_metadata?.avatar_url || ov?.avatar;

  return (
    <div className="min-h-screen bg-canvas pb-24 text-ink md:pb-10">
      {showSearch && <SearchModal onClose={() => setShowSearch(false)} />}

      <header className="sticky top-0 z-50 border-b border-rule bg-canvas">
        <div className="mx-auto flex h-14 max-w-md items-center justify-between gap-3 px-4 md:max-w-3xl">
          <Wordmark />
          <TopTabs />

          <div className="flex items-center gap-1 text-navgray">
            <button
              onClick={() => setShowSearch(true)}
              aria-label="Tìm kiếm"
              className="flex h-11 w-11 items-center justify-center rounded transition-colors hover:bg-stone hover:text-ink md:h-9 md:w-9"
            >
              <Search size={19} strokeWidth={1.75} />
            </button>

            <button
              data-notif-toggle
              aria-label="Thông báo"
              onClick={() => {
                setShowNotify(!showNotify);
                if (!showNotify) fetchNotifications();
              }}
              className="relative flex h-11 w-11 items-center justify-center rounded transition-colors hover:bg-stone hover:text-ink md:h-9 md:w-9"
            >
              <Bell size={19} strokeWidth={1.75} />
              {unreadCount > 0 && (
                <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-rose-500 md:right-2 md:top-2" />
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

            <div className="relative ml-1" ref={profileRef}>
              <button
                onClick={() => setShowProfile(!showProfile)}
                aria-label="Menu tài khoản"
                aria-expanded={showProfile}
                className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-rule bg-stone"
              >
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt=""
                    width={36}
                    height={36}
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <span className="text-[13px] text-ink">{(user?.email?.charAt(0) || "U").toUpperCase()}</span>
                )}
              </button>

              {showProfile && (
                <div className="absolute right-0 mt-2 w-60 rounded border border-rule bg-canvas py-1">
                  <div className="border-b border-rule px-4 py-3">
                    <p className="truncate text-[14px]" style={{ fontWeight: 450 }}>
                      {ov?.username || user?.user_metadata?.full_name || "Creator"}
                    </p>
                    <p className="t-cap truncate text-mute">{user?.email}</p>
                  </div>
                  <button
                    onClick={() => {
                      setShowProfile(false);
                      goSettings();
                    }}
                    className="flex min-h-[44px] w-full items-center gap-3 px-4 text-[14px] transition-colors hover:bg-stone"
                  >
                    <Settings size={16} strokeWidth={1.75} /> Cài đặt
                  </button>
                  <button
                    onClick={signOut}
                    className="flex min-h-[44px] w-full items-center gap-3 px-4 text-[14px] text-rose-600 transition-colors hover:bg-stone"
                  >
                    <LogOut size={16} strokeWidth={1.75} /> Đăng xuất
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto max-w-md space-y-5 px-4 py-6 md:max-w-3xl">
        {loading ? (
          <Skeleton />
        ) : !ov ? (
          <div className="py-16 text-center">
            <p className="text-[14px] text-mute">Không tải được dữ liệu.</p>
            <button
              onClick={() => {
                setLoading(true);
                reload();
              }}
              className="btn btn-quiet mt-4"
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
