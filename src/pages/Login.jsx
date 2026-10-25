import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Film, Trophy, Gift, ShieldCheck, Home, Globe } from "lucide-react";
import { supabase, MAIN_SITE } from "../lib/supabaseClient.js";

// Icon Google SVG
function GoogleG() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.3-.4-3.9z" />
    </svg>
  );
}

/* ---------- Hình trang trí (Phóng to, làm mờ, giống ảnh mẫu) ---------- */
function OrnTarget() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-40">
      <circle cx="50" cy="50" r="40" stroke="#34D399" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="50" cy="50" r="20" stroke="#34D399" strokeWidth="1.5" />
      <path d="M50 0v20M50 80v20M0 50h20M80 50h20" stroke="#34D399" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="#34D399" />
    </svg>
  );
}

function OrnStar() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" fill="none" className="opacity-80">
      <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z" fill="#3B82F6" fillOpacity="0.2" stroke="#60A5FA" strokeWidth="3" />
      <path d="M60 30 L68 52 L90 60 L68 68 L60 90 L52 68 L30 60 L52 52 Z" fill="#E0F2FE" fillOpacity="0.5" />
    </svg>
  );
}

function OrnGem() {
  return (
    <svg width="90" height="100" viewBox="0 0 84 96" fill="none" className="opacity-90 -rotate-12">
      <path d="M42 6l32 26-32 58L10 32z" fill="#22D3EE" fillOpacity=".3" stroke="#67E8F9" strokeWidth="2" />
      <path d="M10 32h64M42 6l-14 26 14 58 14-58z" stroke="#CFFAFE" strokeOpacity=".6" strokeWidth="1.5" />
    </svg>
  );
}

function OrnHex() {
  return (
    <svg width="90" height="100" viewBox="0 0 100 100" fill="none" className="opacity-90 rotate-12">
      <path d="M50 5l40 25v40L50 95 10 70V30z" fill="#F59E0B" fillOpacity=".15" stroke="#FCD34D" strokeWidth="2.5" />
      <path d="M50 25l20 12.5v25L50 75 30 62.5v-25z" fill="#FDE68A" fillOpacity=".3" stroke="#FCD34D" strokeWidth="1.5" />
    </svg>
  );
}

function Emblem() {
  return (
    <div className="relative mx-auto h-24 w-24">
      <span className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-emerald-400/30" />
      <span className="absolute inset-2 animate-[spin_34s_linear_infinite_reverse] rounded-full border border-dotted border-emerald-400/30" />
      <svg viewBox="0 0 100 100" className="absolute inset-4" fill="none">
        <path d="M50 4l38 22v48L50 96 12 74V26z" fill="#0B131E" stroke="#34D399" strokeWidth="3" strokeLinejoin="round" />
        <text x="50" y="60" textAnchor="middle" fill="#34D399" fontSize="28" fontWeight="bold" fontFamily="monospace">XC</text>
      </svg>
    </div>
  );
}

const PERKS = [
  [Film, "Tự động đo\nchỉ số video"],
  [Trophy, "Leo bảng\nxếp hạng"],
  [Gift, "Đổi thưởng\ngiờ cloud"],
];

export default function Login() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  // Mock state để hiển thị nút giống ảnh mẫu (vì chúng ta đang dùng luồng Redirect)
  const [mockProfile, setMockProfile] = useState({
    name: "Tên của bạn",
    email: "email@gmail.com",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" // Ảnh đại diện mẫu
  });

  useEffect(() => {
    const p = new URLSearchParams(window.location.search + "&" + window.location.hash.replace(/^#/, ""));
    const msg = p.get("error_description");
    if (msg) setError(msg);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/app", { replace: true });
    });
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, s) => {
      if (s) navigate("/app", { replace: true });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  // Đăng nhập bằng luồng chuyển trang của Supabase
  const handleLogin = async () => {
    setBusy(true);
    setError("");
    const { error: err } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    });
    if (err) {
      setBusy(false);
      setError(err.message || "Không đăng nhập được bằng Google.");
    }
  };

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#05090F] text-slate-100 font-sans selection:bg-emerald-500/30">
      {/* Background hiệu ứng */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.15]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.15),transparent_60%)]" />

      <header className="relative mx-auto flex max-w-md items-center justify-between px-6 py-5">
        <div className="text-[20px] font-extrabold tracking-tight text-white flex items-center gap-2">
          <span className="text-emerald-400 text-2xl">☁</span> CloudPhone
        </div>
        <div className="flex items-center gap-4 text-slate-300">
          <Globe size={20} className="transition hover:text-white cursor-pointer" />
          <div className="h-5 w-5 rounded-full border-2 border-slate-300 flex items-center justify-center cursor-pointer">
            <div className="h-2 w-2 rounded-full bg-slate-300"></div>
          </div>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-md flex-col justify-center px-5 pb-8 pt-4">
        <div className="relative">
          {/* Các hình trang trí đè lên viền thẻ */}
          <div className="absolute -top-12 -left-8 z-20 pointer-events-none"><OrnTarget /></div>
          <div className="absolute -top-10 -right-8 z-20 pointer-events-none"><OrnStar /></div>
          <div className="absolute bottom-32 -left-10 z-20 pointer-events-none"><OrnGem /></div>
          <div className="absolute bottom-10 -right-8 z-20 pointer-events-none"><OrnHex /></div>

          {/* Thẻ chính (Glassmorphism) */}
          <div className="relative z-10 rounded-[2rem] border border-emerald-500/20 bg-[#0A131C]/80 px-6 pb-8 pt-8 shadow-[0_0_50px_-12px_rgba(16,185,129,0.15)] backdrop-blur-xl">
            <Emblem />

            <div className="mt-6 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Đăng nhập an toàn
              </span>
            </div>

            <h1 className="mt-6 text-center font-mono text-[26px] font-semibold uppercase tracking-[0.1em] text-white leading-tight">
              Cổng Đăng Nhập<br/>Creator
            </h1>
            <p className="mx-auto mt-3 max-w-[18rem] text-center text-[13px] leading-relaxed text-slate-300">
              Đăng nhập để xem thống kê,<br/>gửi video và nhận thưởng.
            </p>

            {/* Các tính năng */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {PERKS.map(([Icon, label], idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.02] px-1 py-4 text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
                    <Icon size={18} />
                  </span>
                  <span className="whitespace-pre-line text-[11px] font-medium leading-tight text-slate-300">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Nút Đăng nhập Custom (Giống ảnh mẫu) */}
            <div className="mt-10">
              <button
                onClick={handleLogin}
                disabled={busy}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-full bg-white p-1.5 pr-4 shadow-lg transition-all hover:bg-slate-50 active:scale-[0.98] disabled:opacity-70"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-emerald-600 text-white font-bold text-lg">
                    {/* Ảnh đại diện giả lập chữ cái đầu */}
                    {mockProfile.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-semibold text-slate-900 leading-tight">
                      Tiếp tục bằng tên {mockProfile.name.split(' ')[0]}
                    </span>
                    <span className="text-[12px] text-slate-500 leading-tight">
                      {mockProfile.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  <div className="ml-1 h-6 w-px bg-slate-200"></div>
                  <div className="ml-2"><GoogleG /></div>
                </div>
              </button>
            </div>

            {/* Lỗi / Trạng thái */}
            {error && <p className="mt-3 text-center text-xs font-semibold text-rose-400">{error}</p>}
            {busy && (
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-emerald-400">
                <Loader2 size={14} className="animate-spin" /> Đang chuyển hướng...
              </p>
            )}

            {/* Bảo mật */}
            <div className="mt-6 flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-slate-500" />
              <p className="text-[11px] text-slate-400">
                Chỉ dùng Google để xác thực danh tính — không cần nhớ mật khẩu.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
