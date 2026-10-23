import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, Film, Trophy, Gift, ShieldCheck, Play, Home, Globe } from "lucide-react";
import { supabase, MAIN_SITE } from "../lib/supabaseClient.js";
import { Logo } from "../components/landing/ui.jsx";

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

/* ---------- Hình trang trí ở các góc ---------- */
function OrnScan() {
  return (
    <svg width="92" height="92" viewBox="0 0 96 96" fill="none" aria-hidden="true">
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
    <svg width="118" height="118" viewBox="0 0 120 120" fill="none" aria-hidden="true">
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
    <svg width="84" height="96" viewBox="0 0 84 96" fill="none" aria-hidden="true">
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
    <svg width="104" height="104" viewBox="0 0 104 104" fill="none" aria-hidden="true">
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

/* ---------- Emblem giữa thẻ ---------- */
function Emblem() {
  return (
    <div className="relative mx-auto h-36 w-36">
      <span className="absolute inset-0 animate-[spin_50s_linear_infinite] rounded-full border border-dashed border-cyan-400/25" />
      <span className="absolute inset-3 animate-[spin_34s_linear_infinite_reverse] rounded-full border border-dotted border-cyan-400/25" />
      <span className="absolute inset-8 rounded-full bg-cyan-400/10 blur-xl" />
      <svg viewBox="0 0 100 100" className="absolute inset-[2.4rem]" fill="none" aria-hidden="true">
        <path
          d="M50 4l38 22v48L50 96 12 74V26z"
          fill="#0E2236"
          stroke="#22D3EE"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        <path d="M43 36l22 14-22 14z" fill="#22D3EE" />
      </svg>
    </div>
  );
}

const PERKS = [
  [Film, "Tự quét kênh YouTube"],
  [Trophy, "Leo xếp hạng tháng"],
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
    <div className="relative min-h-screen overflow-x-hidden bg-[#070B14] text-slate-100">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "34px 34px",
        }}
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[520px] bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.14),transparent_65%)]" />

      {/* Thanh trên cùng */}
      <header className="relative mx-auto flex max-w-md items-center justify-between px-6 py-6">
        <Link to="/">
          <Logo size={34} />
        </Link>
        <div className="flex items-center gap-4 text-slate-300">
          <Link to="/" aria-label="Trang giới thiệu" className="transition hover:text-white">
            <Home size={22} />
          </Link>
          <a href={MAIN_SITE} aria-label="Nxx315 Studio" className="transition hover:text-white">
            <Globe size={22} />
          </a>
        </div>
      </header>

      <main className="relative mx-auto max-w-md px-6 pb-14 pt-4">
        <div className="relative">
          {/* Hình trang trí các góc */}
          <span className="pointer-events-none absolute -left-4 top-8 z-0 opacity-90">
            <OrnScan />
          </span>
          <span className="pointer-events-none absolute -right-5 -top-6 z-0">
            <OrnSparkle />
          </span>
          <span className="pointer-events-none absolute -left-6 bottom-20 z-0">
            <OrnGem />
          </span>
          <span className="pointer-events-none absolute -bottom-7 -right-4 z-0">
            <OrnCoin />
          </span>

          <div className="relative z-10 rounded-[2rem] border border-white/10 bg-[#0A111E]/85 px-5 pb-7 pt-9 backdrop-blur-sm">
            <Emblem />

            <div className="mt-3 flex justify-center">
              <span className="inline-flex items-center gap-2.5 rounded-full border border-emerald-400/30 bg-emerald-400/5 px-5 py-2 font-mono text-[11px] uppercase tracking-[0.22em] text-emerald-300">
                <span className="h-2 w-2 rounded-full bg-emerald-400" /> Kết nối an toàn
              </span>
            </div>

            <h1 className="mt-6 text-center font-mono text-[1.65rem] font-light uppercase leading-snug tracking-[0.14em] text-white">
              Lối vào
              <br />
              Creator
            </h1>
            <p className="mx-auto mt-4 max-w-[17rem] text-center text-[15px] leading-relaxed text-slate-400">
              Đăng nhập hoặc tạo tài khoản bằng một lần chạm.
            </p>

            <div className="mt-7 grid grid-cols-3 gap-2.5">
              {PERKS.map(([Icon, label]) => (
                <div
                  key={label}
                  className="flex flex-col items-center gap-3 rounded-[1.75rem] border border-white/10 px-2 pb-5 pt-5 text-center"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                    <Icon size={21} />
                  </span>
                  <span className="text-[12px] font-medium leading-tight text-slate-300">{label}</span>
                </div>
              ))}
            </div>

            <button
              onClick={google}
              disabled={busy}
              className="mt-7 flex w-full items-center justify-between rounded-full bg-white py-4 pl-7 pr-5 text-left shadow-lg shadow-black/30 transition hover:bg-slate-100 disabled:opacity-60"
            >
              <span className="text-[15px] font-bold text-slate-900">
                {busy ? "Đang chuyển sang Google..." : "Tiếp tục với Google"}
              </span>
              {busy ? <Loader2 size={20} className="animate-spin text-slate-500" /> : <GoogleG />}
            </button>

            {error && <p className="mt-3 text-center text-xs font-semibold text-rose-300">{error}</p>}

            <div className="mt-6 flex items-start gap-3 pr-10">
              <ShieldCheck size={20} className="mt-0.5 shrink-0 text-cyan-400" />
              <p className="text-[13px] leading-relaxed text-slate-400">
                Chỉ dùng Google để biết bạn là ai. Không đọc email, không đăng bài thay bạn, không mật khẩu nào phải
                nhớ.
              </p>
            </div>
          </div>
        </div>

        <p className="mx-auto mt-10 max-w-xs text-center text-[11px] leading-relaxed text-slate-500">
          Lần đầu đăng nhập, hệ thống tự tạo tài khoản. Tài khoản dùng chung với{" "}
          <a href={MAIN_SITE} className="font-semibold text-cyan-300">
            Nxx315 Studio
          </a>
          .
        </p>
      </main>
    </div>
  );
        }
