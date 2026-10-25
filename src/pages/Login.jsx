import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Film, Trophy, Gift, ShieldCheck, Home, Globe, Moon } from "lucide-react";
import { supabase, MAIN_SITE } from "../lib/supabaseClient.js";

function GoogleG() {
  return (
    <svg width="22" height="22" viewBox="0 0 48 48" aria-hidden="true">
      <path fill="#FFC107" d="M43.6 20.1H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.9z" />
      <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 8 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z" />
      <path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-7.9l-6.5 5C9.5 39.6 16.2 44 24 44z" />
      <path fill="#1976D2" d="M43.6 20.1H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.3-.4-3.9z" />
    </svg>
  );
}

/* ---------- Nút đăng nhập Google do chính Google hiển thị ---------- */
const GIS_SRC = "https://accounts.google.com/gsi/client";

function loadGis() {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) return resolve(window.google);
    const done = () =>
      window.google?.accounts?.id ? resolve(window.google) : reject(new Error("gis"));
    const existing = document.querySelector(`script[src="${GIS_SRC}"]`);
    if (existing) {
      existing.addEventListener("load", done);
      existing.addEventListener("error", () => reject(new Error("gis")));
      return;
    }
    const s = document.createElement("script");
    s.src = GIS_SRC;
    s.async = true;
    s.defer = true;
    s.onload = done;
    s.onerror = () => reject(new Error("gis"));
    document.head.appendChild(s);
  });
}

function GoogleSignIn({ setBusy, setError, onFallback }) {
  const boxRef = useRef(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let alive = true;
    (async () => {
      try {
        let clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
        if (!clientId) {
          const { data } = await supabase.functions.invoke("public-config");
          clientId = data?.google_client_id;
        }
        if (!clientId) throw new Error("no client id");
        const google = await loadGis();
        if (!alive || !boxRef.current) return;

        google.accounts.id.initialize({
          client_id: clientId,
          ux_mode: "popup",
          auto_select: false,
          callback: async (resp) => {
            setBusy(true);
            setError("");
            const { error } = await supabase.auth.signInWithIdToken({
              provider: "google",
              token: resp.credential,
            });
            if (error) {
              setBusy(false);
              setError(error.message || "Không đăng nhập được bằng Google.");
            }
          },
        });
        const w = boxRef.current.clientWidth || boxRef.current.parentElement?.clientWidth || 300;
        google.accounts.id.renderButton(boxRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill",
          logo_alignment: "left",
          locale: "vi",
          width: Math.max(200, Math.min(400, Math.floor(w))),
        });
        setReady(true);
      } catch {
        if (alive) setFailed(true);
      }
    })();
    return () => {
      alive = false;
    };
  }, [setBusy, setError]);

  // Nếu Google lỗi
  if (failed) {
    return (
      <div className="mt-5">
        <button
          onClick={onFallback}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
        >
          <GoogleG />
          <span className="text-[14px] font-bold text-slate-700">Đăng nhập bằng Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col items-center">
      {/* Vùng chứa nút Google */}
      <div className="relative w-full min-h-[44px] flex justify-center">
        {/* Nút giả lập (Skeleton) khi Google chưa tải xong */}
        {!ready && (
          <div className="absolute inset-0 flex w-full animate-pulse items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-2.5 shadow-sm">
            <GoogleG />
            <span className="text-[14px] font-bold text-slate-700">Đăng nhập bằng Google</span>
          </div>
        )}
        
        {/* Nút thật của Google (sẽ đè lên trên khi tải xong) */}
        <div ref={boxRef} className={`w-full flex justify-center ${!ready ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
      </div>

      <button
        onClick={onFallback}
        className="mt-3 text-center text-[11px] font-medium text-slate-500 transition hover:text-cyan-600"
      >
        Không thấy tài khoản? Dùng cách đăng nhập khác
      </button>
    </div>
  );
}

/* ---------- Hình trang trí ở các góc (Xanh nước biển) ---------- */
function OrnScan() {
  return (
    <svg width="80" height="80" viewBox="0 0 100 100" fill="none" className="opacity-40 text-cyan-500">
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
      <path d="M50 0v20M50 80v20M0 50h20M80 50h20" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

function OrnSparkle() {
  return (
    <svg width="100" height="100" viewBox="0 0 120 120" fill="none" className="opacity-70">
      <defs>
        <linearGradient id="spk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#a5f3fc" />
          <stop offset="1" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z" fill="url(#spk)" fillOpacity="0.6" />
      <path d="M60 30 L68 52 L90 60 L68 68 L60 90 L52 68 L30 60 L52 52 Z" fill="#ffffff" fillOpacity="0.9" />
    </svg>
  );
}

function OrnGem() {
  return (
    <svg width="80" height="90" viewBox="0 0 84 96" fill="none" className="opacity-60 -rotate-12">
      <path d="M42 6l32 26-32 58L10 32z" fill="#22D3EE" fillOpacity=".4" stroke="#06B6D4" strokeWidth="2.5" />
      <path d="M10 32h64M42 6l-14 26 14 58 14-58z" stroke="#ffffff" strokeOpacity=".8" strokeWidth="1.5" />
    </svg>
  );
}

function OrnCoin() {
  return (
    <svg width="80" height="80" viewBox="0 0 104 104" fill="none" className="opacity-60 rotate-12">
      <path d="M52 6l40 22v48L52 98 12 76V28z" fill="#60A5FA" fillOpacity=".2" stroke="#3B82F6" strokeWidth="3" />
      <circle cx="52" cy="52" r="26" fill="#BFDBFE" fillOpacity=".6" />
      <text x="52" y="59" textAnchor="middle" fontSize="20" fontWeight="800" fill="#1E3A8A" fontFamily="sans-serif">xu</text>
    </svg>
  );
}

/* ---------- Hình lục giác giữa thẻ ---------- */
function Emblem() {
  return (
    <div className="relative mx-auto h-24 w-24 flex items-center justify-center">
      <span className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full border-2 border-dashed border-cyan-200/60" />
      <span className="absolute inset-2 animate-[spin_34s_linear_infinite_reverse] rounded-full border-2 border-dotted border-cyan-200/60" />
      <svg viewBox="0 0 100 100" className="relative h-16 w-16 drop-shadow-sm" fill="none">
        <path d="M50 4l38 22v48L50 96 12 74V26z" fill="#E0F2FE" stroke="#0891B2" strokeWidth="3" strokeLinejoin="round" />
        <text x="50" y="60" textAnchor="middle" fill="#0E7490" fontSize="28" fontWeight="bold" fontFamily="sans-serif">XC</text>
      </svg>
    </div>
  );
}

const PERKS = [
  [Film, "Tự quét kênh"],
  [Trophy, "Leo xếp hạng"],
  [Gift, "Nhận code xu"],
];

export default function Login() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

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

  const google = async () => {
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
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] text-slate-800 font-sans">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <header className="relative mx-auto flex max-w-md items-center justify-between px-6 py-4 z-20">
        {/* ĐÃ KHÔI PHỤC LOGO NXX315 CREATOR CHUẨN CỦA BẠN */}
        <Link to="/" className="text-[20px] font-extrabold tracking-tight text-slate-900">
          Nxx315 <span className="text-cyan-600">Creator</span>
        </Link>
        <div className="flex items-center gap-4 text-slate-500">
          <Link to="/" aria-label="Trang giới thiệu" className="transition hover:text-slate-900">
            <Home size={20} />
          </Link>
          <a href={MAIN_SITE} aria-label="Nxx315 Studio" className="transition hover:text-slate-900">
            <Globe size={20} />
          </a>
        </div>
      </header>

      {/* Thu gọn khoảng cách */}
      <main className="relative mx-auto flex max-w-md flex-col justify-center px-5 pb-6 pt-2 z-10">
        <div className="relative mt-2">
          {/* Trang trí */}
          <div className="absolute top-10 -left-6 z-0 pointer-events-none"><OrnScan /></div>
          <div className="absolute -top-6 -right-6 z-0 pointer-events-none"><OrnSparkle /></div>
          <div className="absolute bottom-20 -left-6 z-0 pointer-events-none"><OrnGem /></div>
          <div className="absolute -bottom-4 -right-6 z-0 pointer-events-none"><OrnCoin /></div>

          {/* Thẻ chính */}
          <div className="relative z-10 rounded-[2rem] border border-white bg-white/85 px-5 pb-6 pt-8 shadow-[0_8px_30px_rgba(0,0,0,0.05)] backdrop-blur-xl">
            <Emblem />

            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-600/20 bg-cyan-50 px-3 py-1 font-mono text-[9px] font-bold uppercase tracking-[0.15em] text-cyan-700">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" /> Kết nối an toàn
              </span>
            </div>

            <h1 className="mt-4 text-center font-mono text-[22px] font-semibold uppercase tracking-[0.1em] text-slate-900">
              Lối vào Creator
            </h1>
            <p className="mx-auto mt-2 max-w-[16rem] text-center text-[13px] leading-relaxed text-slate-600">
              Đăng nhập hoặc tạo tài khoản bằng một lần chạm.
            </p>

            <div className="mt-6 grid grid-cols-3 gap-2.5">
              {PERKS.map(([Icon, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-white/60 px-1.5 py-3 text-center shadow-sm"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-100/80 text-cyan-600">
                    <Icon size={18} />
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-slate-700">{label}</span>
                </div>
              ))}
            </div>

            <GoogleSignIn setBusy={setBusy} setError={setError} onFallback={google} />

            <div className="mt-2 min-h-[20px]">
              {busy && (
                <p className="flex items-center justify-center gap-2 text-xs font-medium text-cyan-600">
                  <Loader2 size={14} className="animate-spin" /> Đang đăng nhập...
                </p>
              )}
              {error && <p className="text-center text-xs font-semibold text-rose-500">{error}</p>}
            </div>

            <div className="mt-2 flex items-center justify-center gap-2">
              <ShieldCheck size={16} className="text-cyan-600" />
              <p className="text-[11px] text-slate-500">
                Chỉ dùng Google để xác minh bạn là ai.
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-[260px] text-center text-[10px] leading-relaxed text-slate-500">
          Lần đầu đăng nhập, hệ thống tự tạo tài khoản, dùng chung với{" "}
          <a href={MAIN_SITE} className="font-semibold text-cyan-600 hover:text-cyan-700">
            Nxx315 Studio
          </a>
          .
        </p>
      </main>
    </div>
  );
      }
