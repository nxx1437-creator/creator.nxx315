 import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, AlertCircle, Eye, Heart, MessageSquare, Share2, Calendar } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, StatusPill } from "../../components/creator/creatorUi.jsx";
import {
  VideoPlayer, RewardCard, HistoryCard, OpenButton,
} from "../../components/creator/VideoDetailParts.jsx";
import { vn, videoPoints } from "../../lib/videoReward.js";

const dayFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short" });

function StatBox({ label, value, Icon, hint }) {
  return (
    <Card className="!p-4">
      <div className="mb-2 flex items-center justify-between text-slate-400">
        <span className="font-mono text-[10px] font-bold uppercase tracking-widest">{label}</span>
        <Icon size={15} />
      </div>
      <p className="text-3xl font-black text-cyan-600">{value}</p>
      {hint && <p className="mt-1 text-[10px] font-medium text-slate-400">{hint}</p>}
    </Card>
  );
}

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const ctx = useOutletContext() || {};
  const hashtagsRaw = ctx.ov?.settings?.hashtags || "#Nxx315Studio";

  const [video, setVideo] = useState(null);
  const [samples, setSamples] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let off = false;
    (async () => {
      const [v, s] = await Promise.all([
        supabase.from("intro_video_submissions").select("*").eq("id", id).maybeSingle(),
        supabase
          .from("video_metric_samples")
          .select("sampled_at, views, likes, comments, shares")
          .eq("video_id", id)
          .order("sampled_at", { ascending: true })
          .limit(200),
      ]);
      if (off) return;
      setVideo(v.data || null);
      setSamples(s.data || []);
      setLoading(false);
    })();
    return () => {
      off = true;
    };
  }, [id]);

  // Nếu chưa có mẫu nào nhưng video đã có số liệu -> dùng số liệu hiện tại làm 1 mẫu
  const rows = useMemo(() => {
    if (samples.length || !video || video.views == null) return samples;
    return [
      {
        sampled_at: video.stats_updated_at || video.created_at,
        views: video.views,
        likes: video.likes,
        comments: video.comments,
        shares: video.shares,
      },
    ];
  }, [samples, video]);

  const tags = useMemo(
    () => (hashtagsRaw.match(/#[^\s,#]+/g) || ["#Nxx315Studio"]),
    [hashtagsRaw]
  );

  if (loading) return <div className="h-screen" />;
  if (!video) {
    return <div className="mt-10 p-5 text-center text-slate-500">Không tìm thấy video này.</div>;
  }

  const content = ((video.title || "") + " " + (video.url || "")).toLowerCase();
  const pf = video.platform?.toUpperCase();

  return (
    <div className="space-y-4 pb-10">
      <button
        onClick={() => navigate("/app/videos")}
        className="mt-2 flex items-center gap-2 px-1 font-semibold text-slate-600"
      >
        <ArrowLeft size={18} /> Quay lại danh sách
      </button>

      <div className="px-1">
        <p className="mb-1 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400">
          ▸ CHI TIẾT VIDEO {pf}
        </p>
        <h1 className="line-clamp-3 break-words text-2xl font-extrabold text-slate-900">
          {video.title || "Video không có tiêu đề"}
        </h1>
        <p className="mt-1 text-[13px] text-slate-500">
          Theo dõi từ {dayFmt.format(new Date(video.created_at))}.
        </p>
        <div className="mt-3">
          <StatusPill status={video.status} />
        </div>
      </div>

      <VideoPlayer video={video} />

      <Card className="!p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <Calendar size={14} />
          {dayFmt.format(new Date(video.video_published_at || video.published_at || video.created_at))}
          <span>·</span>
          {pf}
        </div>
        {video.title && <p className="mt-2 break-words text-sm text-slate-700">{video.title}</p>}
        <div className="mt-3">
          <OpenButton url={video.url} platform={video.platform} />
        </div>
      </Card>

      {video.status === "rejected" && (
        <div className="rounded-3xl border border-rose-200 bg-rose-50 p-5">
          <div className="mb-2 flex items-center gap-2 text-sm font-bold text-rose-600">
            <AlertCircle size={16} /> LÝ DO TỪ CHỐI
          </div>
          <p className="mb-3 text-sm font-medium text-rose-700">
            {video.admin_note || "Video không đáp ứng yêu cầu của chương trình."}
          </p>
          <div className="mb-3 h-px w-full bg-rose-200" />
          <p className="text-xs italic text-rose-600/70">
            Lý do này không thể sửa — vui lòng gửi video khác.
          </p>
        </div>
      )}

      <RewardCard video={video} />

      <Card>
        <p className="mb-3 font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
          ▸ HASHTAG BẮT BUỘC
        </p>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => {
            const missing = !content.includes(tag.toLowerCase());
            return (
              <span
                key={tag}
                className={`rounded-full border px-3 py-1 text-xs font-bold ${
                  missing
                    ? "border-amber-200 bg-amber-50 text-amber-600"
                    : "border-emerald-200 bg-emerald-50 text-emerald-600"
                }`}
              >
                {tag} {missing ? "(Thiếu)" : "(Đã có)"}
              </span>
            );
          })}
        </div>
      </Card>

      <div className="grid grid-cols-2 gap-3">
        <StatBox label="LƯỢT XEM" value={vn(video.views || 0)} Icon={Eye} />
        <StatBox label="LƯỢT THÍCH" value={vn(video.likes || 0)} Icon={Heart} />
        <StatBox label="BÌNH LUẬN" value={vn(video.comments || 0)} Icon={MessageSquare} />
        <StatBox
  label="ĐIỂM"
  value={
    video.status === "approved"
      ? vn(videoPoints(video.views, video.likes, video.comments))
      : 0
  }
  Icon={Share2}
  hint={
    video.status === "approved"
      ? "Cộng vào xếp hạng tháng"
      : "Tính khi video được duyệt"
  }
/>
      </div>

      <HistoryCard samples={rows} />
    </div>
  );
                                            }
