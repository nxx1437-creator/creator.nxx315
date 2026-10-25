import React, { useEffect, useRef, useState } from "react";
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

// Skeleton Loading giả lập nút Google
function GoogleButtonSkeleton() {
  return (
    <div className="relative flex w-full animate-pulse items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm">
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/50 to-transparent"></div>
      <GoogleG />
      <span className="text-[14px] font-medium text-slate-700">Đang kết nối Google...</span>
    </div>
  );
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
        const w = boxRef.current.clientWidth || 300;
        google.accounts.id.renderButton(boxRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          text: "continue_with",
          shape: "pill", // Bo tròn giống Google chuẩn
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

  // Nếu Google lỗi hoàn toàn, hiện nút Fallback
  if (failed) {
    return (
      <div className="mt-5">
        <button
          onClick={onFallback}
          className="flex w-full items-center justify-center gap-3 rounded-full border border-slate-200 bg-white px-4 py-3 shadow-sm transition hover:bg-slate-50 active:scale-[0.98]"
        >
          <GoogleG />
          <span className="text-[14px] font-medium text-slate-700">Tiếp tục với Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="w-full min-h-[44px]">
        {/* Hiển thị Skeleton khi nút thật chưa load xong */}
        {!ready && <GoogleButtonSkeleton />}
        
        {/* Nút thật của Google sẽ render vào đây và tự động đè lên Skeleton khi ready */}
        <div ref={boxRef} className={`w-full flex justify-center ${!ready ? 'hidden' : ''}`} />
      </div>
      
      {/* Nút dự phòng nhỏ bên dưới */}
      <button
        onClick={onFallback}
        className="mt-3 text-center text-[11px] font-medium text-slate-500 transition hover:text-cyan-400"
      >
        Không thấy tài khoản? Dùng cách đăng nhập khác
      </button>
    </div>
  );
}

/* ---------- Hình trang trí ở các góc (Thu gọn lại) ---------- */
function OrnScan() {
  return (
    <svg width="60" height="60" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="34" stroke="#22D3EE" strokeOpacity=".3" strokeWidth="2" strokeDasharray="2 7" />
      <circle cx="48" cy="48" r="21" stroke="#38BDF8" strokeOpacity=".4" />
      <path d="M43 39l16 9-16 9z" fill="#22D3EE" fillOpacity=".6" />
    </svg>
  );
}

function OrnSparkle() {
  return (
    <svg width="70" height="70" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="spk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <path
        d="M60 6C64 38 82 56 114 60 82 64 64 82 60 114 56 82 38 64 6 60 38 56 56 38 60 6Z"
        fill="url(#spk)"
        fillOpacity=".15"
        stroke="url(#spk)"
        strokeOpacity=".4"
        strokeWidth="1.5"
      />
    </svg>
  );
}

function OrnGem() {
  return (
    <svg width="50" height="60" viewBox="0 0 84 96" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path d="M42 6l32 26-32 58L10 32z" fill="url(#gm)" fillOpacity=".3" stroke="#BAE6FD" strokeOpacity=".4" />
    </svg>
  );
}

function OrnCoin() {
  return (
    <svg width="60" height="60" viewBox="0 0 104 104" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M52 6l40 22v48L52 98 12 76V28z" fill="#0B1322" stroke="#FBBF24" strokeOpacity=".3" strokeWidth="1.5" />
      <circle cx="52" cy="52" r="26" fill="url(#cn)" fillOpacity=".6" />
    </svg>
  );
}

/* ---------- Hình lục giác giữa thẻ ---------- */
function Emblem() {
  return (
    <div className="relative mx-auto h-20 w-20">
      <span className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-cyan-400/20" />
      <span className="absolute inset-2 animate-[spin_34s_linear_infinite_reverse] rounded-full border border-dotted border-cyan-400/20" />
      <span className="absolute inset-5 rounded-full bg-cyan-400/10 blur-md" />
      <svg viewBox="0 0 100 100" className="absolute inset-[1.2rem]" fill="none" aria-hidden="true">
        <path
          d="M50 4l38 22v48L50 96 12 74V26z"
          fill="#0E2236"
          stroke="#22D3EE"
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <path d="M43 36l22 14-22 14z" fill="#22D3EE" />
      </svg>
    </div>
  );
}

const PERKS = [
  [Film, "Quét kênh"],
  [Trophy, "Xếp hạng"],
  [Gift, "Code xu"],
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#070B14] text-slate-100 font-sans">
      {/* Background Grid & Glow */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[350px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.15),transparent_60%)]" />

      <header className="relative mx-auto flex max-w-md items-center justify-between px-5 py-4">
        <Link to="/" className="text-[17px] font-extrabold tracking-tight text-white hover:opacity-80 transition">
          Nxx315 <span className="text-cyan-400">Creator</span>
        </Link>
        <div className="flex items-center gap-4 text-slate-400">
          <Link to="/" aria-label="Trang chủ" className="transition hover:text-white">
            <Home size={20} />
          </Link>
          <a href={MAIN_SITE} aria-label="Website chính" className="transition hover:text-white">
            <Globe size={20} />
          </a>
        </div>
      </header>

      <main className="relative mx-auto flex max-w-md flex-col justify-center px-5 pb-8 pt-2">
        <div className="relative mt-2">
          {/* Trang trí góc */}
          <span className="pointer-events-none absolute -left-2 top-8 z-0 opacity-80"><OrnScan /></span>
          <span className="pointer-events-none absolute -right-2 -top-4 z-0"><OrnSparkle /></span>
          <span className="pointer-events-none absolute -left-3 bottom-24 z-0"><OrnGem /></span>
          <span className="pointer-events-none absolute -bottom-3 -right-2 z-0"><OrnCoin /></span>

          {/* Thẻ chính */}
          <div className="relative z-10 rounded-3xl border border-white/10 bg-[#0A111E]/95 px-6 pb-6 pt-7 shadow-2xl shadow-black/50 backdrop-blur-md">
            <Emblem />

            <div className="mt-4 flex justify-center">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-400/20 bg-emerald-400/5 px-3 py-1 font-mono text-[9px] uppercase tracking-[0.15em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" /> Kết nối an toàn
              </span>
            </div>

            <h1 className="mt-3 text-center font-mono text-xl font-medium uppercase tracking-[0.1em] text-white">
              Lối vào Creator
            </h1>
            <p className="mx-auto mt-1.5 max-w-[16rem] text-center text-[13px] leading-relaxed text-slate-400">
              Đăng nhập một chạm để tiếp tục.
            </p>

            {/* Các tính năng */}
            <div className="mt-5 grid grid-cols-3 gap-2.5">
              {PERKS.map(([Icon, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-1.5 rounded-2xl border border-white/5 bg-white/[0.02] px-1 py-3 transition hover:bg-white/[0.04]"
                >
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                    <Icon size={16} />
                  </span>
                  <span className="text-[11px] font-medium text-slate-300">{label}</span>
                </div>
              ))}
            </div>

            {/* Nút Đăng nhập */}
            <GoogleSignIn setBusy={setBusy} setError={setError} onFallback={google} />

            {/* Trạng thái & Lỗi */}
            <div className="mt-3 min-h-[20px]">
              {busy && (
                <p className="flex items-center justify-center gap-2 text-xs text-cyan-300">
                  <Loader2 size={14} className="animate-spin" /> Đang xác thực...
                </p>
              )}
              {error && <p className="text-center text-xs font-semibold text-rose-400">{error}</p>}
            </div>

            {/* Bảo mật */}
            <div className="mt-2 flex items-start gap-2 rounded-xl bg-slate-800/30 p-3">
              <ShieldCheck size={16} className="mt-0.5 shrink-0 text-cyan-400/80" />
              <p className="text-[11px] leading-relaxed text-slate-400">
                Chỉ dùng để xác minh danh tính. Hệ thống tuyệt đối không đọc email hay đăng bài thay bạn.
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-6 max-w-[240px] text-center text-[11px] leading-relaxed text-slate-500">
          Bằng việc đăng nhập, bạn đồng ý dùng chung tài khoản với{" "}
          <a href={MAIN_SITE} className="font-semibold text-cyan-400/80 hover:text-cyan-300 transition">
            Nxx315 Studio
          </a>.
        </p>
      </main>
    </div>
  );
      }
