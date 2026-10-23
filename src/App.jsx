import React from "react";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";

// Tạm thời: khu làm việc của creator sẽ làm ở bước sau
function AppSoon() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#070B14] px-6 text-center text-slate-100">
      <p className="text-2xl font-extrabold">Bạn đã đăng nhập</p>
      <p className="mt-2 max-w-sm text-sm text-slate-400">
        Khu làm việc của creator đang được hoàn thiện, sẽ có ở bản cập nhật tiếp theo.
      </p>
      <Link to="/" className="mt-5 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-slate-200">
        Về trang chủ
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<AppSoon />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
