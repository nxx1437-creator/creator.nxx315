import React, { useEffect, useState, useCallback, useRef } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Trophy, Film, Gift, Settings, Loader2, AlertTriangle,
  Download, Search, Bell, Globe, LogOut, User, RefreshCw
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import useSession from "../../hooks/useSession.js";
import useAppVersion from "../../hooks/useAppVersion.js"; 

const TABS = [
  { to: "/app", end: true, label: "TỔNG QUAN", Icon: LayoutDashboard },
  { to: "/app/ranking", label: "XẾP HẠNG", Icon: Trophy },
  { to: "/app/videos", label: "VIDEO", Icon: Film },
  { to: "/app/rewards", label: "PHẦN THƯỞNG", Icon: Gift },
  { to: "/app/settings", label: "THÊM", Icon: Settings },
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

function Nxx315Logo() {
  return (
    <div className="flex items-center gap-1 text-[18px] font-extrabold tracking-tight text-slate-900">
      Nxx315 <span className="text-cyan-600">Creator</span>
    </div>
  );
}

export default function AppLayout() {
  const navigate = useNavigate();
  const { session } = useSession();
  const { hasUpdate } = useAppVersion(); 
  
  const [ov, setOv] = useState(null);
  const [loading, setLoading] = useState(true);
  const [synced, setSynced] = useState(false);

  const [showLang, setShowLang] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  
  const langRef = useRef(null);
  const profileRef = useRef(null);

  // TỰ ĐỘNG TẢI LẠI SAU 3 GIÂY KHI CÓ BẢN CẬP NHẬT
  useEffect(() => {
    if (hasUpdate) {
      const timer = setTimeout(() => {
        window.location.reload();
      }, 3000); 
      return () => clearTimeout(timer);
    }
  }, [hasUpdate]);

  const reload = useCallback(async () => {
    const { data } = await supabase.rpc("get_creator_overview");
    if (data?.ok) setOv(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (langRef.current && !langRef.current.contains(event.target)) setShowLang(false);
      if (profileRef.current && !profileRef.current.contains(event.target)) setShowProfile(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] pb-28 text-slate-800 font-sans">
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      {/* TOAST THÔNG BÁO CẬP NHẬT */}
      {hasUpdate && (
        <div className="fixed top-16 left-1/2 z-[100] -translate-x-1/2 w-[90%] max-w-sm animate-in slide-in-from-top-4 fade-in">
          <div className="relative overflow-hidden rounded-2xl bg-slate-900 px-4 py-3 shadow-2xl flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 text-white">
              <RefreshCw size={16} className="animate-spin text-cyan-400" />
              <span className="text-[13px] font-semibold">Đang cập nhật phiên bản mới...</span>
            </div>
            {/* Thanh loading chạy ngang 3 giây */}
            <div className="absolute bottom-0 left-0 h-[3px] bg-cyan-400" style={{ width: "0%", animation: "progress 3s linear forwards" }} />
          </div>
        </div>
      )}

      <header className="sticky top-0 z-50 border-b border-white/50 bg-[#f4fbf9]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center justify-between px-4 py-3 md:max-w-3xl">
          
          <Nxx315Logo />

          <div className="flex items-center gap-3 sm:gap-4 text-slate-600">
            <button className="hidden sm:block hover:text-slate-900"><Download size={20} /></button>
            <button className="hover:text-slate-900"><Search size={20} /></button>
            <button className="hover:text-slate-900"><Bell size={20} /></button>
            
            <div className="relative" ref={langRef}>
              <button onClick={() => setShowLang(!showLang)} className="hover:text-slate-900 flex items-center">
                <Globe size={20} />
              </button>
              {showLang && (
                <div className="absolute right-0 mt-3 w-40 rounded-2xl border border-slate-100 bg-white p-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 rounded-lg">EN — English</button>
                  <button className="w-full text-left px-3 py-2 text-sm font-medium text-emerald-600 bg-emerald-50 rounded-lg">VI — Tiếng Việt</button>
                </div>
              )}
            </div>

            <div className="relative" ref={profileRef}>
              <button onClick={() => setShowProfile(!showProfile)} className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full border border-slate-200 shadow-sm">
                {session?.user?.user_metadata?.avatar_url ? (
                  <img src={session.user.user_metadata.avatar_url} alt="Avatar" className="h-full w-full object-cover" />
                ) : (
                  <div className="h-full w-full bg-cyan-600 text-white flex items-center justify-center font-bold text-xs uppercase">
                    {session?.user?.email?.charAt(0) || "U"}
                  </div>
                )}
              </button>
              
              {showProfile && (
                <div className="absolute right-0 mt-3 w-56 rounded-2xl border border-slate-100 bg-white py-2 shadow-xl animate-in fade-in slide-in-from-top-2">
                  <div className="px-4 py-2 border-b border-slate-100 mb-1">
                    <p className="font-bold text-slate-800 truncate">{session?.user?.user_metadata?.full_name || "Creator"}</p>
                    <p className="text-xs text-slate-500 truncate">{session?.user?.email}</p>
                  </div>
                  <button onClick={() => { setShowProfile(false); navigate("/app/settings"); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <Settings size={16} /> Cài đặt
                  </button>
                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50">
                    <User size={16} /> Tài khoản
                  </button>
                  <div className="h-px bg-slate-100 my-1"></div>
                  <button onClick={signOut} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-50">
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
              <LinkBanner showButton={true} onGo={() => navigate("/app/settings")} />
            )}
            <Outlet context={{ ov, reload }} />
          </>
        )}
      </main>

      <nav className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-md rounded-[2rem] border border-white bg-white/95 px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:max-w-xl">
        <div className="grid grid-cols-5">
          {TABS.map(({ to, end, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-2xl py-2.5 text-[9px] font-bold tracking-wide transition-colors ${
                  isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
                }`
              }
            >
              <Icon size={20} strokeWidth={2.5} />
              {label}
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
      }
