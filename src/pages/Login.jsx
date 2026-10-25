import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Film, Trophy, Gift, ShieldCheck, Globe, Moon } from "lucide-react";
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

/* ---------- Hình trang trí (Màu Xanh Nước Biển) ---------- */
function OrnTarget() {
  return (
    <svg width="100" height="100" viewBox="0 0 100 100" fill="none" className="opacity-40 text-cyan-500">
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1" strokeDasharray="4 8" />
      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="1.5" />
      <path d="M50 0v20M50 80v20M0 50h20M80 50h20" stroke="currentColor" strokeWidth="2" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  );
}

function OrnStar() {
  return (
    <svg width="130" height="130" viewBox="0 0 120 120" fill="none" className="opacity-70">
      <defs>
        <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z" fill="url(#starGrad)" fillOpacity="0.6" />
      <path d="M60 30 L68 52 L90 60 L68 68 L60 90 L52 68 L30 60 L52 52 Z" fill="#ffffff" fillOpacity="0.8" />
    </svg>
  );
}

function OrnGem() {
  return (
    <svg width="100" height="110" viewBox="0 0 84 96" fill="none" className="opacity-60 -rotate-12">
      <path d="M42 6l32 26-32 58L10 32z" fill="#22D3EE" fillOpacity=".4" stroke="#06B6D4" strokeWidth="2" />
      <path d="M10 32h64M42 6l-14 26 14 58 14-58z" stroke="#ffffff" strokeOpacity=".8" strokeWidth="1.5" />
    </svg>
  );
}

function OrnHex() {
  return (
    <svg width="100" height="110" viewBox="0 0 100 100" fill="none" className="opacity-60 rotate-12">
      <path d="M50 5l40 25v40L50 95 10 70V30z" fill="#60A5FA" fillOpacity=".2" stroke="#3B82F6" strokeWidth="2.5" />
      <path d="M50 25l20 12.5v25L50 75 30 62.5v-25z" fill="#BFDBFE" fillOpacity=".6" stroke="#60A5FA" strokeWidth="1.5" />
    </svg>
  );
}

/* ---------- Lục giác ở giữa ---------- */
function Emblem() {
  return (
    <div className="relative mx-auto h-28 w-28 flex items-center justify-center">
      {/* Vòng tròn nét đứt xoay xung quanh */}
      <span className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full border-2 border-dashed border-cyan-200/60" />
      
      {/* Lục giác */}
      <svg viewBox="0 0 100 100" className="relative h-20 w-20 drop-shadow-md" fill="none">
        <path d="M50 4l38 22v48L50 96 12 74V26z" fill="#E0F2FE" stroke="#0891B2" strokeWidth="2.5" strokeLinejoin="round" />
        <text x="50" y="60" textAnchor="middle" fill="#0E7490" fontSize="28" fontWeight="bold" fontFamily="sans-serif">XC</text>
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
  
  // Data giả lập để hiển thị lên nút bấm giống ảnh mẫu
  const [mockProfile, setMockProfile] = useState({
    name: "Tên",
    email: "email@gmail.com"
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
    // Nền trắng ngà, chuyển màu nhẹ xuống xanh cyan
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] text-slate-800 font-sans">
      
      {/* Background Grid mờ màu xanh lá/cam nhạt */}
      <div 
        className="pointer-events-none absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.5) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <header className="relative mx-auto flex max-w-md items-center justify-between px-6 py-6 z-20">
        {/* Logo CloudPhone (Dùng icon xanh) */}
        <div className="text-[22px] font-extrabold tracking-tight text-slate-900 flex items-center gap-1.5">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-cyan-600">
            <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
          </svg>
          CloudPhone
        </div>
        <div className="flex items-center gap-4 text-slate-600">
          <Globe size={20} className="transition hover:text-black cursor-pointer" />
          <Moon size={20} className="transition hover:text-black cursor-pointer" />
        </div>
      </header>

      <main className="relative mx-auto flex max-w-md flex-col justify-center px-5 pb-10 pt-2 z-10">
        <div className="relative">
          {/* Các hình trang trí đè lên viền thẻ */}
          <div className="absolute top-10 -left-12 z-0 pointer-events-none"><OrnTarget /></div>
          <div className="absolute -top-8 -right-10 z-0 pointer-events-none"><OrnStar /></div>
          <div className="absolute bottom-24 -left-12 z-0 pointer-events-none"><OrnGem /></div>
          <div className="absolute -bottom-8 -right-8 z-0 pointer-events-none"><OrnHex /></div>

          {/* Thẻ chính (Trắng trong suốt, viền mỏng) */}
          <div className="relative z-10 rounded-[2.5rem] border border-white bg-white/80 px-6 pb-10 pt-10 shadow-[0_8px_40px_rgba(0,0,0,0.06)] backdrop-blur-xl">
            <Emblem />

            <div className="mt-8 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-cyan-600/20 bg-cyan-50 px-4 py-1.5 font-mono text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-700">
                <span className="h-2 w-2 rounded-full bg-cyan-500 animate-pulse" /> Đăng nhập an toàn
              </span>
            </div>

            <h1 className="mt-6 text-center font-sans text-[28px] font-extrabold uppercase tracking-tight text-slate-900 leading-tight">
              Cổng Đăng Nhập<br/>Creator
            </h1>
            <p className="mx-auto mt-3 max-w-[18rem] text-center text-[14px] leading-relaxed text-slate-600">
              Đăng nhập để xem thống kê,<br/>gửi video và nhận thưởng.
            </p>

            {/* Các tính năng */}
            <div className="mt-8 grid grid-cols-3 gap-3">
              {PERKS.map(([Icon, label], idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center justify-center gap-2 rounded-3xl border border-slate-100 bg-white/60 px-1 py-5 text-center shadow-sm"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-100/80 text-cyan-600">
                    <Icon size={18} strokeWidth={2.5} />
                  </span>
                  <span className="whitespace-pre-line text-[11px] font-semibold leading-tight text-slate-700">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            {/* Nút Đăng nhập Custom (Chuẩn ảnh mẫu) */}
            <div className="mt-10">
              <button
                onClick={handleLogin}
                disabled={busy}
                className="group relative flex w-full items-center justify-between overflow-hidden rounded-full border border-slate-200 bg-white p-1.5 pr-4 shadow-md transition-all hover:bg-slate-50 hover:shadow-lg active:scale-[0.98] disabled:opacity-70"
              >
                <div className="flex items-center gap-3">
                  {/* Avatar chữ cái đầu - Màu xanh nước biển */}
                  <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full bg-cyan-600 text-white font-bold text-lg shadow-inner">
                    {mockProfile.name.charAt(0)}
                  </div>
                  <div className="flex flex-col text-left">
                    <span className="text-[14px] font-bold text-slate-800 leading-tight">
                      Tiếp tục bằng tên {mockProfile.name}
                    </span>
                    <span className="text-[12px] text-slate-500 leading-tight mt-0.5">
                      {mockProfile.email}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
                  <div className="ml-1 h-6 w-px bg-slate-200"></div>
                  <div className="ml-2"><GoogleG /></div>
                </div>
              </button>
            </div>

            {/* Lỗi / Trạng thái */}
            {error && <p className="mt-3 text-center text-xs font-semibold text-rose-500">{error}</p>}
            {busy && (
              <p className="mt-3 flex items-center justify-center gap-2 text-xs font-medium text-cyan-600">
                <Loader2 size={14} className="animate-spin" /> Đang chuyển hướng...
              </p>
            )}

            {/* Bảo mật */}
            <div className="mt-8 flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-cyan-600" />
              <p className="text-[12px] text-slate-500">
                Chỉ dùng Google để xác thực danh tính —<br/>không cần nhớ mật khẩu.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
                }
