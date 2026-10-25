import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import useSession from "./hooks/useSession.js";
import { supabase } from "./lib/supabaseClient.js";

import Rules from "./pages/app/Rules.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import AppLayout from "./pages/app/AppLayout.jsx";
import Overview from "./pages/app/Overview.jsx";
import Ranking from "./pages/app/Ranking.jsx";
import Videos from "./pages/app/Videos.jsx";
import Rewards from "./pages/app/Rewards.jsx";
import Settings from "./pages/app/Settings.jsx";

// Component bảo vệ: Yêu cầu đăng nhập
function Protected({ children }) {
  const { session, loading } = useSession();
  const [checkingStatus, setCheckingStatus] = useState(true);
  const [needsOnboarding, setNeedsOnboarding] = useState(false);

  useEffect(() => {
    if (!session) {
      setCheckingStatus(false);
      return;
    }

    // Đọc cờ từ localStorage trước để có kết quả ngay lập tức
    const localOnboarded = localStorage.getItem(`onboarded_${session.user.id}`);
    
    if (localOnboarded === "true") {
      setNeedsOnboarding(false);
      setCheckingStatus(false);
      return; // Thoát sớm, không cần chờ API
    }

    // Nếu chưa có cờ mới gọi API kiểm tra
    const checkUserStatus = async () => {
      try {
        const { data: channels, error } = await supabase
          .from("creator_channels")
          .select("platform")
          .eq("user_id", session.user.id)
          .limit(1);

        if (error) throw error;

        if (!channels || channels.length === 0) {
          setNeedsOnboarding(true); 
        } else {
          localStorage.setItem(`onboarded_${session.user.id}`, "true");
          setNeedsOnboarding(false);
        }
      } catch (err) {
        setNeedsOnboarding(false);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkUserStatus();
  }, [session]);

  // Chỉ hiện màn hình chờ (hoặc để trống) khi đang tải session lần đầu
  if (loading || checkingStatus) {
    return (
      <div className="min-h-screen bg-[#f4fbf9] flex items-center justify-center">
        <div className="animate-pulse flex space-x-4">
          <div className="rounded-full bg-slate-200 h-10 w-10"></div>
          <div className="flex-1 space-y-6 py-1">
            <div className="h-2 bg-slate-200 rounded"></div>
            <div className="space-y-3">
              <div className="grid grid-cols-3 gap-4">
                <div className="h-2 bg-slate-200 rounded col-span-2"></div>
                <div className="h-2 bg-slate-200 rounded col-span-1"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;

  return children;
}

// Component bảo vệ cho Onboarding
function OnboardingProtected({ children }) {
  const { session, loading } = useSession();
  
  if (loading) {
    return <div className="min-h-screen bg-[#f4fbf9]"></div>;
  }
  
  if (!session) return <Navigate to="/login" replace />;
  
  return children;
}

function AppRoutes() {
  const location = useLocation();
  
  return (
    <Routes location={location}>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Navigate to="/login" replace />} />
      
      <Route path="/onboarding" element={<OnboardingProtected><Onboarding /></OnboardingProtected>} />

      <Route path="/app" element={<Protected><AppLayout /></Protected>}>
        <Route index element={<Overview />} />
        <Route path="ranking" element={<Ranking />} />
        <Route path="videos" element={<Videos />} />
        <Route path="rewards" element={<Rewards />} />
        <Route path="settings" element={<Settings />} />
        <Route path="rules" element={<Rules />} />
      </Route>
      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
          }
