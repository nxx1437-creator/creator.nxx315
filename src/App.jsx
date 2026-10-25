import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useSession from "./hooks/useSession.js";
import { supabase } from "./lib/supabaseClient.js";

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

    const checkUserStatus = async () => {
      try {
        // 1. Kiểm tra xem trình duyệt này đã lưu cờ hoàn thành Onboarding chưa
        const localOnboarded = localStorage.getItem(`onboarded_${session.user.id}`);
        
        // 2. Nếu chưa có trong localStorage, kiểm tra xem DB đã có kênh chưa (dự phòng)
        if (localOnboarded === "true") {
          setNeedsOnboarding(false);
        } else {
          // Kiểm tra bảng creator_channels
          const { data: channels, error } = await supabase
            .from("creator_channels")
            .select("platform")
            .eq("user_id", session.user.id)
            .limit(1);

          if (error) throw error;

          if (!channels || channels.length === 0) {
            // Nếu chưa có kênh và chưa có cờ -> Cần Onboarding
            setNeedsOnboarding(true);
          } else {
            // Đã có kênh -> Đánh dấu hoàn thành và cho vào App
            localStorage.setItem(`onboarded_${session.user.id}`, "true");
            setNeedsOnboarding(false);
          }
        }
      } catch (err) {
        console.error("Lỗi kiểm tra trạng thái:", err);
        // Nếu lỗi mạng, cứ cho vào App để tránh chặn người dùng
        setNeedsOnboarding(false);
      } finally {
        setCheckingStatus(false);
      }
    };

    checkUserStatus();
  }, [session]);

  if (loading || checkingStatus) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f4fbf9]">
        <Loader2 size={26} className="animate-spin text-cyan-600" />
      </div>
    );
  }

  if (!session) return <Navigate to="/login" replace />;

  // Nếu cần onboarding thì đẩy sang đó
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;

  return children;
}

// Component bảo vệ cho Onboarding (Yêu cầu đăng nhập, nhưng không cần kênh)
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
        
        <Route
          path="/onboarding"
          element={
            <OnboardingProtected>
              <Onboarding />
            </OnboardingProtected>
          }
        />

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
