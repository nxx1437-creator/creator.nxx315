import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import useSession from "./hooks/useSession.js";
import Landing from "./pages/Landing.jsx";
import Login from "./pages/Login.jsx";
import AppLayout from "./pages/app/AppLayout.jsx";
import Overview from "./pages/app/Overview.jsx";
import Ranking from "./pages/app/Ranking.jsx";
import Videos from "./pages/app/Videos.jsx";
import Rewards from "./pages/app/Rewards.jsx";
import Settings from "./pages/app/Settings.jsx";

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
