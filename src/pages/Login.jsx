import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Film, Trophy, Gift, ShieldCheck, Play } from "lucide-react";
import { supabase, MAIN_SITE } from "../lib/supabaseClient.js";
import { Logo } from "../components/landing/ui.jsx";

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

function Emblem() {
  return (
    <div className="relative mx-auto h-40 w-40">
      <span className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border border-dashed border-cyan-400/30" />
      <span className="absolute inset-4 animate-[spin_28s_linear_infinite_reverse] rounded-full border border-cyan-400/20" />
      <span className="absolute inset-9 rounded-full bg-cyan-400/10 blur-xl" />
      <span className="absolute inset-[3.25rem] flex items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white shadow-xl shadow-cyan-500/30">
        <Play size={26} fill="currentColor" />
      </span>
    </div>
  );
}

const PERKS = [
  [Film, "Theo dõi video"],
  [Trophy, "Leo xếp hạng"],
  [Gift, "Nhận code xu"],
];

export default function Login() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  // Báo lỗi nếu Google trả về lỗi trên đường dẫn
  useEffect(() => {
    const p = new URLSearchParams(window.location.search + "&" + window.location.hash.replace(/^#/, ""));
    const msg = p.get("error_description");
    if (msg) setError(msg);
  }, []);

  // Đã đăng nhập thì vào khu làm việc
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
    <div className="relative min-h-screen overflow-hidden bg-[#070B14] text-slate-100">
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "36px 36px",
        }}
      />
      <div className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full bg-cyan-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-72 w-72 rounded-full bg-blue-600/20 blur-3xl" />

      <header className="relative mx-auto flex max-w-md items-center justify-between px-5 py-5">
        <Link to="/">
          <Logo size={32} />
        </Link>
        <Link to="/" className="flex items-center gap-1.5 text-xs font-semibold text-slate-400">
          <ArrowLeft size={14} /> Trang giới thiệu
        </Link>
      </header>

      <main className="relative mx-auto max-w-md px-5 pb-12 pt-2">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-[#111C30]/95 to-[#0B1322]/95 p-6 shadow-2xl backdrop-blur">
          <Emblem />

          <div className="mt-2 flex justify-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-400/10 px-3.5 py-1.5 text-[11px] font-bold uppercase tracking-widest text-emerald-300">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" /> Kết nối an toàn
            </span>
          </div>

          <h1 className="mt-4 text-center text-3xl font-black tracking-tight text-white">Vào khu Creator</h1>
          <p className="mx-auto mt-3 max-w-xs text-center text-sm leading-relaxed text-slate-400">
            Đăng nhập hoặc tạo tài khoản chỉ với một lần chạm. Theo dõi video, leo bảng xếp hạng và nhận code xu.
          </p>

          <div className="mt-6 grid grid-cols-3 gap-2.5">
            {PERKS.map(([Icon, label]) => (
              <div
                key={label}
                className="flex flex-col items-center gap-2 rounded-2xl border border-white/10 bg-black/20 px-2 py-3.5 text-center"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 text-cyan-300">
                  <Icon size={17} />
                </span>
                <span className="text-[11px] font-semibold leading-tight text-slate-300">{label}</span>
              </div>
            ))}
          </div>

          <button
            onClick={google}
            disabled={busy}
            className="mt-6 flex w-full items-center justify-center gap-3 rounded-full bg-white py-3.5 text-sm font-bold text-slate-900 shadow-lg shadow-black/20 transition hover:bg-slate-100 disabled:opacity-60"
          >
            {busy ? <Loader2 size={18} className="animate-spin" /> : <GoogleG />}
            {busy ? "Đang chuyển sang Google..." : "Tiếp tục với Google"}
          </button>

          {error && <p className="mt-3 text-center text-xs font-semibold text-rose-300">{error}</p>}

          <div className="mt-5 flex items-start gap-2.5 rounded-2xl bg-black/20 px-4 py-3">
            <ShieldCheck size={17} className="mt-0.5 shrink-0 text-cyan-400" />
            <p className="text-[12px] leading-relaxed text-slate-400">
              Chúng tôi chỉ dùng Google để biết bạn là ai. Không đọc email, không đăng bài thay bạn và không có mật
              khẩu nào phải nhớ.
            </p>
          </div>
        </div>

        <p className="mx-auto mt-5 max-w-xs text-center text-[11px] leading-relaxed text-slate-500">
          Lần đầu đăng nhập, hệ thống tự tạo tài khoản cho bạn. Tài khoản dùng chung với{" "}
          <a href={MAIN_SITE} className="font-semibold text-cyan-300">
            Nxx315 Studio
          </a>
          .
        </p>
      </main>
    </div>
  );
      }
