import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Loader2 } from "lucide-react";
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
        const localOnboarded = localStorage.getItem(`onboarded_${session.user.id}`);
        if (localOnboarded === "true") {
          setNeedsOnboarding(false);
        } else {
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
        }
      } catch (err) {
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
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;
  return children;
}

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

// Bọc ngoài cùng để bắt sự kiện chuyển trang và thêm hiệu ứng mượt
function AppRoutes() {
  const location = useLocation();
  
  return (
    <div key={location.pathname} className="animate-in fade-in duration-300">
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
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}
