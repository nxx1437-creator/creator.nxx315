import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Film, Trophy, Gift, ShieldCheck, Home, Globe } from "lucide-react";
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

  if (failed) {
    return (
      <button
        onClick={onFallback}
        className="mt-5 flex w-full items-center justify-between rounded-md border border-slate-300 bg-white px-5 py-3.5 text-left shadow-md shadow-black/30"
      >
        <span className="text-[15px] font-bold text-slate-900">Tiếp tục với Google</span>
        <GoogleG />
      </button>
    );
  }

  return (
    <div className="mt-5">
      <div className="rounded-md bg-white p-2.5 shadow-md shadow-black/30">
        <div ref={boxRef} className="flex min-h-[44px] w-full justify-center" />
        {!ready && (
          <p className="pb-1 text-center text-xs text-slate-500">Đang tải đăng nhập Google...</p>
        )}
      </div>
      <button
        onClick={onFallback}
        className="mt-2 w-full text-center text-[11px] text-slate-500 underline"
      >
        Không thấy tài khoản? Dùng cách đăng nhập khác
      </button>
    </div>
  );
}

/* ---------- Hình trang trí ở các góc ---------- */
function OrnScan() {
  return (
    <svg width="72" height="72" viewBox="0 0 96 96" fill="none" aria-hidden="true">
      <circle cx="48" cy="48" r="34" stroke="#22D3EE" strokeOpacity=".4" strokeWidth="2" strokeDasharray="2 7" />
      <circle cx="48" cy="48" r="21" stroke="#38BDF8" strokeOpacity=".5" />
      <path d="M43 39l16 9-16 9z" fill="#22D3EE" fillOpacity=".75" />
      <circle cx="48" cy="12" r="2.6" fill="#F472B6" />
      <circle cx="84" cy="48" r="2.6" fill="#FBBF24" />
      <circle cx="12" cy="48" r="2.6" fill="#34D399" />
    </svg>
  );
}

function OrnSparkle() {
  return (
    <svg width="92" height="92" viewBox="0 0 120 120" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="spk" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#67E8F9" />
          <stop offset="1" stopColor="#6366F1" />
        </linearGradient>
      </defs>
      <path
        d="M60 6C64 38 82 56 114 60 82 64 64 82 60 114 56 82 38 64 6 60 38 56 56 38 60 6Z"
        fill="url(#spk)"
        fillOpacity=".3"
        stroke="url(#spk)"
        strokeWidth="2"
      />
      <path
        d="M60 30C62 48 72 58 90 60 72 62 62 72 60 90 58 72 48 62 30 60 48 58 58 48 60 30Z"
        fill="url(#spk)"
        fillOpacity=".55"
      />
    </svg>
  );
}

function OrnGem() {
  return (
    <svg width="64" height="74" viewBox="0 0 84 96" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="gm" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#A5F3FC" />
          <stop offset="1" stopColor="#3B82F6" />
        </linearGradient>
      </defs>
      <path d="M42 6l32 26-32 58L10 32z" fill="url(#gm)" fillOpacity=".55" stroke="#BAE6FD" strokeOpacity=".6" />
      <path d="M10 32h64M42 6l-14 26 14 58 14-58z" stroke="#E0F2FE" strokeOpacity=".5" />
    </svg>
  );
}

function OrnCoin() {
  return (
    <svg width="80" height="80" viewBox="0 0 104 104" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id="cn" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#FDE68A" />
          <stop offset="1" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <path d="M52 6l40 22v48L52 98 12 76V28z" fill="#0B1322" stroke="#FBBF24" strokeOpacity=".55" strokeWidth="2" />
      <circle cx="52" cy="52" r="26" fill="url(#cn)" fillOpacity=".9" />
      <circle cx="52" cy="52" r="19" stroke="#92400E" strokeOpacity=".55" strokeWidth="2" />
      <text x="52" y="59" textAnchor="middle" fontSize="20" fontWeight="800" fill="#78350F" fontFamily="sans-serif">
        xu
      </text>
    </svg>
  );
}

/* ---------- Hình lục giác giữa thẻ ---------- */
function Emblem() {
  return (
    <div className="relative mx-auto h-24 w-24">
      <span className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-cyan-400/25" />
      <span className="absolute inset-2 animate-[spin_34s_linear_infinite_reverse] rounded-full border border-dotted border-cyan-400/25" />
      <span className="absolute inset-6 rounded-full bg-cyan-400/10 blur-lg" />
      <svg viewBox="0 0 100 100" className="absolute inset-[1.6rem]" fill="none" aria-hidden="true">
        <path
          d="M50 4l38 22v48L50 96 12 74V26z"
          fill="#0E2236"
          stroke="#22D3EE"
          strokeWidth="3.5"
          strokeLinejoin="round"
        />
        <path d="M43 36l22 14-22 14z" fill="#22D3EE" />
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

  // Đường dự phòng: chuyển trang sang Google rồi quay lại
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#070B14] text-slate-100">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[420px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.14),transparent_65%)]" />

      <header className="relative mx-auto flex max-w-md items-center justify-between px-6 py-4">
        <Link to="/" className="text-lg font-extrabold tracking-tight text-white">
          Nxx315 <span className="text-cyan-400">Creator</span>
        </Link>
        <div className="flex items-center gap-4 text-slate-300">
          <Link to="/" aria-label="Trang giới thiệu" className="transition hover:text-white">
            <Home size={21} />
          </Link>
          <a href={MAIN_SITE} aria-label="Nxx315 Studio" className="transition hover:text-white">
            <Globe size={21} />
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-md px-6 pb-8 pt-3">
        <div className="relative">
          <span className="pointer-events-none absolute -left-3 top-5 z-0 opacity-90">
            <OrnScan />
          </span>
          <span className="pointer-events-none absolute -right-4 -top-5 z-0">
            <OrnSparkle />
          </span>
          <span className="pointer-events-none absolute -left-4 bottom-16 z-0">
            <OrnGem />
          </span>
          <span className="pointer-events-none absolute -bottom-5 -right-3 z-0">
            <OrnCoin />
          </span>

          <div className="relative z-10 rounded-[1.75rem] border border-white/10 bg-[#0A111E]/90 px-5 pb-6 pt-6 backdrop-blur-sm">
            <Emblem />

            <div className="mt-3 flex justify-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-4 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Kết nối an toàn
              </span>
            </div>

            <h1 className="mt-4 text-center font-mono text-xl font-light uppercase tracking-[0.12em] text-white">
              Lối vào Creator
            </h1>
            <p className="mx-auto mt-2 max-w-[16rem] text-center text-[13px] leading-relaxed text-slate-400">
              Đăng nhập hoặc tạo tài khoản bằng một lần chạm.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {PERKS.map(([Icon, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 px-1.5 pb-3 pt-3.5 text-center"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                    <Icon size={18} />
                  </span>
                  <span className="text-[11px] font-medium leading-tight text-slate-300">{label}</span>
                </div>
              ))}
            </div>

            <GoogleSignIn setBusy={setBusy} setError={setError} onFallback={google} />

            {busy && (
              <p className="mt-3 flex items-center justify-center gap-2 text-xs text-slate-400">
                <Loader2 size={14} className="animate-spin" /> Đang đăng nhập...
              </p>
            )}
            {error && <p className="mt-3 text-center text-xs font-semibold text-rose-300">{error}</p>}

            <div className="mt-4 flex items-start gap-2.5">
              <ShieldCheck size={18} className="mt-0.5 shrink-0 text-cyan-400" />
              <p className="text-[12px] leading-relaxed text-slate-400">
                Chỉ dùng Google để xác minh bạn là ai. Không đọc email, không đăng bài thay bạn.
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-7 max-w-xs text-center text-[11px] leading-relaxed text-slate-500">
          Lần đầu đăng nhập, hệ thống tự tạo tài khoản, dùng chung với{" "}
          <a href={MAIN_SITE} className="font-semibold text-cyan-300">
            Nxx315 Studio
          </a>
          .
        </p>
      </main>
    </div>
  );
}
