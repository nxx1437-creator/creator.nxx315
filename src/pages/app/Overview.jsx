import React, { memo, useMemo } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Send, Trophy, Film, ArrowRight, Play } from "lucide-react";
import { Card, Avatar, PLATFORMS, getTier } from "../../components/creator/creatorUi.jsx";
import {
  CARD, EventCard, RequirementCard, StatsCard,
} from "../../components/creator/OverviewParts.jsx";

const UserCard = memo(function UserCard({ username, avatar, tierName, greet, onVideos, onRanking }) {
  return (
    <Card className={CARD}>
      <div className="flex items-center gap-4">
        <div className="relative shrink-0">
          <Avatar src={avatar} name={username} size={80} />
          <span className="absolute -bottom-1 left-1/2 z-10 -translate-x-1/2 whitespace-nowrap rounded-md bg-slate-700 px-2 py-0.5 text-[9px] font-bold uppercase text-white shadow-sm">
            🔍 {tierName}
          </span>
        </div>

        <div className="min-w-0 flex-1">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[9px] font-bold text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> CREATOR HQ · LIVE
          </span>
          <p className="mt-1.5 text-[13px] text-slate-500">{greet}</p>
          <h1 className="truncate text-2xl font-extrabold text-cyan-600">{username || "Creator"}</h1>
          <p className="mt-1.5 font-mono text-[9px] font-bold text-slate-400">
            ▸ HUD NHIỆM VỤ CỦA BẠN —<br />30 NGÀY GẦN NHẤT.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={onVideos}
          className="flex w-full items-center justify-between rounded-full bg-emerald-500 py-3 pl-6 pr-3 text-sm font-bold text-white shadow-md shadow-emerald-500/20"
        >
          Liên kết kênh / Gửi video
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
            <Send size={16} />
          </span>
        </button>
        <button
          onClick={onRanking}
          className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-white py-3 pl-5 pr-3 text-sm font-semibold text-slate-700 shadow-sm"
        >
          <span className="flex items-center gap-2">
            <Trophy size={18} className="text-amber-500" /> Bảng xếp hạng
          </span>
          <ArrowRight size={18} className="text-slate-400" />
        </button>
      </div>
    </Card>
  );
});

const RecentVideos = memo(function RecentVideos({ recent, onAll }) {
  return (
    <div>
      <div className="mb-3 flex items-center justify-between px-1">
        <span className="flex items-center gap-2 font-mono text-[11px] font-bold uppercase text-slate-500">
          <Play size={14} /> VIDEO GẦN ĐÂY
        </span>
        <button onClick={onAll} className="font-mono text-[11px] font-bold text-cyan-600">
          XEM TẤT CẢ →
        </button>
      </div>

      {recent && recent.length === 0 ? (
        <div className="rounded border-2 border-dashed border-slate-300 bg-white px-5 py-8 text-center">
          <Film size={32} className="mx-auto mb-3 text-slate-300" />
          <p className="text-[15px] font-bold text-slate-800">
            Chưa có video. Đăng video đầu tiên để bắt đầu tích điểm.
          </p>
          <p className="mb-4 mt-1 text-[13px] text-slate-500">
            Kết nối TikTok hoặc YouTube để bot phát hiện video của bạn.
          </p>
          <button onClick={onAll} className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm">
            Liên kết kênh
          </button>
        </div>
      ) : (
        <div className="space-y-2">
          {recent?.map((v) => (
            <div key={v.id} className="flex items-center justify-between rounded-2xl border border-white bg-white p-3 shadow-sm">
              <div className="min-w-0">
                <p className="text-sm font-bold text-slate-800">{PLATFORMS[v.platform]?.name}</p>
                <p className="truncate text-xs text-slate-500">{v.title || v.url}</p>
              </div>
              <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">
                {v.status}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
});

export default function Overview() {
  const navigate = useNavigate();
  const { ov } = useOutletContext();

  const { greet, monthLabel } = useMemo(() => {
    const hour = new Date().getHours();
    const vn = new Date(Date.now() + 7 * 3600e3);
    return {
      greet: hour < 11 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối",
      monthLabel: `THÁNG ${vn.getUTCMonth() + 1} ${vn.getUTCFullYear()}`,
    };
  }, []);

  const goVideos = useMemo(() => () => navigate("/app/videos"), [navigate]);
  const goRanking = useMemo(() => () => navigate("/app/ranking"), [navigate]);
  const goRules = useMemo(() => () => navigate("/app/rules"), [navigate]);

  if (!ov) return <div className="h-screen bg-canvas" />;

  const tier = getTier(ov.approved || 0);

  return (
    <div className="space-y-4 pb-10">
      <UserCard
        username={ov.username}
        avatar={ov.avatar}
        tierName={tier.name}
        greet={greet}
        onVideos={goVideos}
        onRanking={goRanking}
      />
      <EventCard monthLabel={monthLabel} />
      <RequirementCard approved={ov.month_approved} onRules={goRules} />
      <StatsCard ov={ov} />
      <RecentVideos recent={ov.recent} onAll={goVideos} />
    </div>
  );
}
