import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { Logo } from "../components/landing/theme.jsx";
import { Scene, VideoCard, RankCard } from "../components/landing/Scenes.jsx";
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

/* ---------- Nút đăng nhập Google ---------- */
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
          shape: "rectangular",
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
      <div className="mt-5">
        <button
          onClick={onFallback}
          className="flex h-12 w-full items-center justify-center gap-3 rounded border border-rule bg-white px-4 transition hover:bg-stone active:scale-[0.98]"
        >
          <GoogleG />
          <span className="text-[14px] text-ink" style={{ fontWeight: 450 }}>Tiếp tục với Google</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mt-5 flex flex-col items-center">
      <div className="relative w-full min-h-[44px] flex justify-center">
        {!ready && (
          <div className="absolute inset-0 flex w-full animate-pulse items-center justify-center gap-3 rounded border border-rule bg-white px-4 py-2.5">
            <GoogleG />
            <span className="text-[14px] text-ink" style={{ fontWeight: 450 }}>Tiếp tục với Google</span>
          </div>
        )}
        <div ref={boxRef} className={`w-full flex justify-center ${!ready ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} />
      </div>

      <button
        onClick={onFallback}
        className="mt-4 min-h-[44px] text-center text-[13px] text-mute underline decoration-rule underline-offset-4 transition hover:text-ink hover:decoration-ink"
      >
        Không thấy nút Google? Dùng cách đăng nhập khác
      </button>
    </div>
  );
}

const PERKS = [
  ["Liên kết kênh", "Dán link TikTok hoặc YouTube, hệ thống tự nhận diện kênh."],
  ["Đăng video", "Quay review Nxx315 Studio, kèm hashtag bắt buộc."],
  ["Nhận thưởng", "Video được duyệt nhận Gift Code, top tháng nhận tiền mặt."],
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
    <div className="min-h-screen bg-canvas text-ink lg:grid lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      <div className="flex min-h-screen flex-col px-5 md:px-10">
        <header className="flex h-14 items-center justify-between">
          <Link to="/" aria-label="Nxx315 Creator"><Logo /></Link>
          <a href={MAIN_SITE} className="text-[13px] text-navgray transition-colors hover:text-ink">Nxx315 Studio</a>
        </header>

        <main className="mx-auto flex w-full max-w-[380px] flex-1 flex-col justify-center py-10">
          <h1 className="t-head">Đăng nhập</h1>
          <p className="mt-3 text-[15px] leading-[1.6] text-mute">
            Một lần chạm với Google. Lần đầu đăng nhập, hệ thống tự tạo tài khoản và dùng chung với Nxx315 Studio.
          </p>

          <GoogleSignIn setBusy={setBusy} setError={setError} onFallback={google} />

          <div className="mt-2 min-h-[24px]" aria-live="polite">
            {busy && (
              <p className="flex items-center justify-center gap-2 text-[13px] text-mute">
                <Loader2 size={14} className="animate-spin" /> Đang đăng nhập...
              </p>
            )}
            {error && <p className="text-center text-[13px] text-rose-600">{error}</p>}
          </div>

          <ul className="mt-10">
            {PERKS.map(([t, d]) => (
              <li key={t} className="rule-t py-4">
                <p className="text-[15px]" style={{ fontWeight: 450 }}>{t}</p>
                <p className="mt-1 text-[14px] leading-[1.55] text-mute">{d}</p>
              </li>
            ))}
          </ul>

          <p className="t-cap mt-6 text-mute">Chỉ dùng Google để xác minh bạn là ai.</p>
        </main>
      </div>

      <aside className="relative hidden overflow-hidden lg:block" aria-hidden="true">
        <Scene tone="grass" className="absolute left-[12%] top-[16%] h-[250px] w-[300px]" delay={150}><VideoCard /></Scene>
        <Scene tone="sky" className="absolute bottom-[14%] right-[12%] h-[230px] w-[290px]" delay={350}><RankCard /></Scene>
      </aside>
    </div>
  );
}
