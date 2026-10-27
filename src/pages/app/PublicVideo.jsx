import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Eye, Heart, MessageSquare, Trophy, Calendar } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, Avatar, StatusPill } from "../../components/creator/creatorUi.jsx";
import {
  VideoPlayer, HistoryCard, OpenButton,
} from "../../components/creator/VideoDetailParts.jsx";

const nf = new Intl.NumberFormat("vi-VN");
const dayFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short" });

function StatBox({ label, value, Icon }) {
  return (
    <Card className="!p-4">
      <div className="mb-2 flex items-center justify-between text-slate-400">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">{label}</span>
        <Icon size={15} />
      </div>
      <p className="text-3xl font-black text-cyan-600">{value}</p>
    </Card>
  );
}

export default function PublicVideo() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState("loading");
  const [video, setVideo] = useState(null);
  const [samples, setSamples] = useState([]);

  useEffect(() => {
    let off = false;
    setState("loading");
    supabase.rpc("get_creator_video", { p_id: id }).then(({ data }) => {
      if (off) return;
      if (!data?.ok) return setState("missing");
      // Video của chính mình thì chuyển sang trang chi tiết đầy đủ
      if (data.video.is_owner) {
        navigate(`/app/videos/${id}`, { replace: true });
        return;
      }
      setVideo(data.video);
      setSamples(data.samples || []);
      setState("ok");
    });
    return () => {
      off = true;
    };
  }, [id, navigate]);

  const rows = useMemo(() => {
    if (samples.length || !video || video.views == null) return samples;
    return [
      {
        sampled_at: video.stats_updated_at || video.created_at,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
      },
    ];
  }, [samples, video]);

  const back = (
    <button
      onClick={() => navigate(-1)}
      className="mt-2 flex items-center gap-2 px-1 font-semibold text-slate-600"
    >
      <ArrowLeft size={18} /> Quay lại hồ sơ
    </button>
  );

  if (state === "loading") return <div className="h-screen" />;
  if (state === "missing") {
    return (
      <div>
        {back}
        <p className="mt-10 text-center text-slate-500">Không tìm thấy video này.</p>
      </div>
    );
  }

  const pf = video.platform?.toUpperCase();
  const points =
    (Number(video.views) || 0) + (Number(video.likes) || 0) + (Number(video.comments) || 0);
  const pubDate = new Date(video.video_published_at || video.published_at || video.created_at);

  return (
    <div className="space-y-4 pb-10">
      {back}

      <div className="px-1">
        <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
          ▸ CHI TIẾT VIDEO {pf}
        </p>
        <h1 className="line-clamp-3 break-words text-2xl font-extrabold text-slate-900">
          {video.title || "Video không có tiêu đề"}
        </h1>
        <p className="mt-1 flex items-center gap-1.5 text-[13px] text-slate-500">
          <Calendar size={13} /> Đăng ngày {dayFmt.format(pubDate)}
        </p>
        <div className="mt-3">
          <StatusPill status={video.status} />
        </div>
      </div>

      <button
        onClick={() => navigate(`/app/creator/${video.uid}`)}
        className="flex w-full items-center gap-3 rounded-2xl border border-slate-100 bg-white p-3 text-left shadow-sm"
      >
        <Avatar src={video.owner_avatar} name={video.owner_name} size={40} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-extrabold text-slate-800">{video.owner_name}</p>
          <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
            XEM HỒ SƠ CREATOR →
          </p>
        </div>
      </button>

      <VideoPlayer video={video} />

      <Card className="!p-4">
        <OpenButton url={video.url} platform={video.platform} />
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatBox label="LƯỢT XEM" value={nf.format(video.views || 0)} Icon={Eye} />
        <StatBox label="LƯỢT THÍCH" value={nf.format(video.likes || 0)} Icon={Heart} />
        <StatBox label="BÌNH LUẬN" value={nf.format(video.comments || 0)} Icon={MessageSquare} />
        <StatBox label="ĐIỂM" value={nf.format(points)} Icon={Trophy} />
      </div>

      <HistoryCard samples={rows} />
    </div>
  );
    }
