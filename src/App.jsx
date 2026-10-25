import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useSession from "./hooks/useSession.js";
import { supabase } from "./lib/supabaseClient.js"; // Nhớ import supabase

import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Onboarding from "./pages/Onboarding.jsx"; // Import trang Onboarding vừa tạo
import AppLayout from "./pages/app/AppLayout.jsx";
import Overview from "./pages/app/Overview.jsx";
import Ranking from "./pages/app/Ranking.jsx";
import Videos from "./pages/app/Videos.jsx";
import Rewards from "./pages/app/Rewards.jsx";
import Settings from "./pages/app/Settings.jsx";

// Component bảo vệ: Yêu cầu đăng nhập VÀ yêu cầu đã hoàn thành Onboarding
function Protected({ children }) {
  const { session, loading } = useSession();
  const [checkingProfile, setCheckingProfile] = useState(true);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    if (!session) {
      setCheckingProfile(false);
      return;
    }

    // Kiểm tra xem user này đã có hồ sơ (username) trong DB chưa
    const checkProfile = async () => {
      try {
        const { data, error } = await supabase
          .from("profiles") // Tên bảng chứa thông tin user của bạn
          .select("username")
          .eq("id", session.user.id)
          .single();

        // Nếu có data và có username thì coi như đã onboard
        if (data && data.username) {
          setHasProfile(true);
        } else {
          setHasProfile(false);
        }
      } catch (err) {
        // Nếu lỗi (vd: chưa có row nào trong bảng), coi như chưa onboard
        setHasProfile(false);
      } finally {
        setCheckingProfile(false);
      }
    };

    checkProfile();
  }, [session]);

  if (loading || checkingProfile) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4fbf9]">
        <Loader2 size={26} className="animate-spin text-cyan-600" />
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  // Nếu đã đăng nhập nhưng chưa có hồ sơ -> Đẩy sang trang Onboarding
  if (!hasProfile) return <Navigate to="/onboarding" replace />;

  return children;
}

// Component bảo vệ riêng cho trang Onboarding (Bắt buộc đăng nhập, nhưng KHÔNG cần có profile)
function OnboardingProtected({ children }) {
  const { session, loading } = useSession();
  
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4fbf9]">
        <Loader2 size={26} className="animate-spin text-cyan-600" />
      </div>
    );
  }
  
  if (!session) return <Navigate to="/login" replace />;
  
  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Navigate to="/login" replace />} />
        
        {/* Route cho trang Onboarding */}
        <Route
          path="/onboarding"
          element={
            <OnboardingProtected>
              <Onboarding />
            </OnboardingProtected>
          }
        />

        {/* Route cho App chính */}
        <Route
          path="/app"
          element={
            <Protected>
              <AppLayout />
            </Protected>
          }
        >
          <Route index element={<Overview />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="videos" element={<Videos />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
        }
