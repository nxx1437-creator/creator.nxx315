import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useSession from "./hooks/useSession.js";
import { supabase } from "./lib/supabaseClient.js";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";

function Protected({ children }) {
  const { session, loading } = useSession();
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#070B14]">
        <Loader2 size={26} className="animate-spin text-cyan-400" />
      </div>
    );
  }
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

// Tạm thời: khu làm việc của creator sẽ làm ở bước sau
function AppSoon() {
  const { session, profile } = useSession();
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#070B14] px-6 text-center text-slate-100">
      <p className="text-2xl font-extrabold">Xin chào {profile?.username || "creator"}</p>
      <p className="mt-1 text-xs text-slate-500">{session?.user?.email}</p>
      <p className="mt-4 max-w-sm text-sm text-slate-400">
        Đăng nhập thành công. Khu làm việc của creator đang được hoàn thiện, sẽ có ở bản cập nhật tiếp theo.
      </p>
      <div className="mt-6 flex gap-3">
        <Link to="/" className="rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-slate-200">
          Về trang chủ
        </Link>
        <button
          onClick={() => supabase.auth.signOut()}
          className="rounded-full border border-rose-400/40 px-5 py-2 text-sm font-semibold text-rose-300"
        >
          Đăng xuất
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Navigate to="/login" replace />} />
        <Route
          path="/app"
          element={
            <Protected>
              <AppSoon />
            </Protected>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
