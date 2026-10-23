import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft } from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";
import { Logo } from "../components/landing/ui.jsx";

export default function Login() {
  const navigate = useNavigate();
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate("/app", { replace: true });
    });
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
    <div className="relative flex min-h-screen items-center justify-center bg-[#070B14] px-4 text-slate-100">
      <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.14),transparent_55%)]" />
      <div className="relative w-full max-w-sm rounded-3xl border border-white/10 bg-gradient-to-b from-[#111C30] to-[#0B1322] p-6 text-center">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-xl font-bold text-white">Đăng nhập để bắt đầu</h1>
        <p className="mt-2 text-sm text-slate-400">Đăng nhập một chạm bằng Google, không cần nhớ mật khẩu.</p>
        <button
          onClick={google}
          disabled={busy}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full bg-white py-3 text-sm font-bold text-slate-900 disabled:opacity-60"
        >
          {busy && <Loader2 size={16} className="animate-spin" />} Tiếp tục với Google
        </button>
        {error && <p className="mt-3 text-xs font-semibold text-rose-300">{error}</p>}
        <Link to="/" className="mt-5 inline-flex items-center gap-1.5 text-xs text-slate-500">
          <ArrowLeft size={13} /> Về trang giới thiệu
        </Link>
      </div>
    </div>
  );
        }
