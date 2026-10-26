import React, { useEffect, useMemo, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { supabase } from "../../lib/supabaseClient.js";
import useSession from "../../hooks/useSession.js";
import { getTier } from "../../components/creator/creatorUi.jsx";
import { Hero, MyRankCard, PrizeList } from "../../components/creator/RankParts.jsx";
import { PrevTop, RecentRewards, LiveBoard } from "../../components/creator/RankBoard.jsx";

export default function Ranking() {
  const { ov } = useOutletContext() || {};
  const { session, profile } = useSession();
  const [data, setData] = useState(null);
  const [pub, setPub] = useState(null);

  useEffect(() => {
    let off = false;
    Promise.all([
      supabase.rpc("get_creator_leaderboard"),
      supabase.rpc("get_creator_public_stats"),
    ]).then(([lb, ps]) => {
      if (off) return;
      setData(lb.data?.ok ? lb.data : { items: [], me: null, total: 0, prev: [], prizes: null });
      setPub(ps.data?.ok ? ps.data : null);
    });
    return () => {
      off = true;
    };
  }, []);

  const monthLabel = useMemo(() => {
    const vn = new Date(Date.now() + 7 * 3600e3);
    return `THÁNG ${vn.getUTCMonth() + 1} ${vn.getUTCFullYear()}`;
  }, []);

  if (!data) return <div className="h-screen" />;

  const prizes = Array.isArray(data.prizes) ? data.prizes : null;
  const user = session?.user;
  const name = data.me?.name || profile?.username || "Creator";
  const tier = getTier(ov?.approved || 0);

  // Chưa có tháng trước thì vinh danh Top 3 tháng này
  const hasPrev = data.prev?.length > 0;
  const podium = hasPrev ? data.prev : (data.items || []).slice(0, 3);

  return (
    <div className="space-y-4 pb-10">
      <Hero total={data.total || 0} />
      <MyRankCard
        me={data.me}
        ov={ov}
        avatar={user?.user_metadata?.avatar_url}
        name={name}
        tierName={tier.name}
      />
      <PrizeList prizes={prizes} />
      <PrevTop
        prev={podium}
        prizes={prizes}
        title={hasPrev ? "VINH DANH THÁNG TRƯỚC" : "VINH DANH THÁNG NÀY"}
      />
      <RecentRewards stats={pub} />
      <LiveBoard
        items={data.items || []}
        total={data.total || 0}
        monthLabel={monthLabel}
        prizes={prizes}
      />
    </div>
  );
}
