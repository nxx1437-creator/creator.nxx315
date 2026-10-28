import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate, NavLink } from "react-router-dom";
import { LayoutDashboard, Trophy, Film, Gift, Settings as SettingsIcon } from "lucide-react"; // Sửa thành Settings as SettingsIcon
import useSession from "./hooks/useSession.js";
import { supabase } from "./lib/supabaseClient.js";

// Import các trang
import VideoDetail from "./pages/app/VideoDetail.jsx";
import CreatorProfile from "./pages/app/CreatorProfile.jsx";
import PublicVideo from "./pages/app/PublicVideo.jsx";
import Help from "./pages/app/Help.jsx";
import Payout from "./pages/app/Payout.jsx";
import Rules from "./pages/app/Rules.jsx";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import Onboarding from "./pages/Onboarding.jsx";
import AppLayout from "./pages/app/AppLayout.jsx";
import Overview from "./pages/app/Overview.jsx";
import Ranking from "./pages/app/Ranking.jsx";
import Videos from "./pages/app/Videos.jsx";
import Rewards from "./pages/app/Rewards.jsx";
import Settings from "./pages/app/Settings.jsx"; // Trang Settings vẫn giữ nguyên tên này

// Menu điều hướng dưới cùng
function BottomNav() {
  const TABS = [
    { to: "/app", end: true, label: "TỔNG QUAN", Icon: LayoutDashboard },
    { to: "/app/ranking", label: "XẾP HẠNG", Icon: Trophy },
    { to: "/app/videos", label: "VIDEO", Icon: Film },
    { to: "/app/rewards", label: "PHẦN THƯỞNG", Icon: Gift },
    { to: "/app/settings", label: "THÊM", Icon: SettingsIcon }, // Dùng SettingsIcon ở đây
  ];

  return (
    <nav className="fixed inset-x-3 bottom-3 z-40 mx-auto max-w-md rounded-[2rem] border border-white bg-white/95 px-2 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl md:max-w-xl">
      <div className="grid grid-cols-5">
        {TABS.map(({ to, end, label, Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex flex-col items-center gap-1 rounded-2xl py-2.5 text-[9px] font-bold tracking-wide transition-colors ${
                isActive ? "text-emerald-600" : "text-slate-400 hover:text-slate-600"
              }`
            }
          >
            <Icon size={20} strokeWidth={2.5} />
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}

// Component bảo vệ Onboarding
function OnboardingProtected({ children }) {
  const { session, loading } = useSession();
  if (loading) return <div className="min-h-screen bg-[#f4fbf9]"></div>;
  if (!session) return <Navigate to="/login" replace />;
  return children;
}

// Component bảo vệ App
function AppProtected({ children }) {
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
          setCheckingStatus(false);
          return;
        }

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

  if (loading || checkingStatus) {
    return <div className="min-h-screen bg-[#f4fbf9]"></div>;
  }

  if (!session) return <Navigate to="/login" replace />;
  if (needsOnboarding) return <Navigate to="/onboarding" replace />;

  return children;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Navigate to="/login" replace />} />

        {/* Trang Onboarding (Độc lập, không có Layout) */}
        <Route 
          path="/onboarding" 
          element={
            <OnboardingProtected>
              <Onboarding />
            </OnboardingProtected>
          } 
        />

        {/* Các trang trong App (Có Layout và Menu dưới) */}
        <Route 
          path="/app" 
          element={
            <AppProtected>
              <div className="relative">
                <AppLayout />
                <BottomNav />
              </div>
            </AppProtected>
          }
        >
          <Route index element={<Overview />} />
          <Route path="ranking" element={<Ranking />} />
          <Route path="videos" element={<Videos />} />
          <Route path="rewards" element={<Rewards />} />
          <Route path="settings" element={<Settings />} />
          <Route path="payout" element={<Payout />} />
          <Route path="help" element={<Help />} />
          <Route path="videos/:id" element={<VideoDetail />} />
          <Route path="creator/:uid" element={<CreatorProfile />} />
          <Route path="creator/:uid/video/:id" element={<PublicVideo />} />
          <Route path="rules" element={<Rules />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
  }
