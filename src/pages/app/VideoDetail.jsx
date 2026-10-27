import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import { ArrowLeft, AlertCircle, Eye, Heart, MessageSquare, Share2, Calendar, ListChecks, RefreshCw, CheckCircle2, XCircle, Clock, ChevronDown } from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, StatusPill } from "../../components/creator/creatorUi.jsx";
import {
  VideoPlayer, RewardCard, HistoryCard, OpenButton,
} from "../../components/creator/VideoDetailParts.jsx";
import { vn, videoPoints } from "../../lib/videoReward.js";

const dayFmt = new Intl.DateTimeFormat("vi-VN", { dateStyle: "short" });

// Ngày lỗi/null thì không làm sập cả trang
const fmtDay = (d) => {
  const t = d ? new Date(d) : null;
  return t && !Number.isNaN(t.getTime()) ? dayFmt.format(t) : "—";
};

/* ====== YÊU CẦU VIDEO (lấy từ Thể lệ chương trình) ====== */
const REQUIREMENTS = [
  "Đăng công khai trên kênh TikTok/YouTube đã liên kết với tài khoản Creator của bạn.",
  "Nội dung giới thiệu NXX315 Studio, rõ ràng, dễ hiểu và trung thực.",
  "Gắn đủ hashtag bắt buộc (xem phần Hashtag ở trên) trong tiêu đề hoặc mô tả.",
  "Có tiêu đề và mô tả phù hợp với nội dung video.",
  "Do bạn tự làm hoặc có quyền sử dụng hợp pháp, không sao chép hay đăng lại nội dung của người khác.",
  "Chưa từng được gửi nhận thưởng trước đó, mỗi video chỉ được xét thưởng một lần.",
  "Không mua lượt xem, lượt thích, bình luận và không dùng bot hay tương tác giả.",
  "Tuân thủ quy định của nền tảng đăng tải và pháp luật hiện hành.",
  "Số liệu được chốt sau 7 ngày kể từ lúc đăng công khai, cần đạt đồng thời lượt xem và lượt thích/tim của mốc thưởng.",
];

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

function Skeleton() {
  return (
    <div className="space-y-4 pb-10" aria-busy="true">
      <div className="mt-2 h-5 w-40 animate-pulse rounded-full bg-slate-200/70" />
      <div className="space-y-2 px-1">
        <div className="h-3 w-32 animate-pulse rounded-full bg-slate-200/70" />
        <div className="h-7 w-4/5 animate-pulse rounded-xl bg-slate-200/70" />
      </div>
      <div className="aspect-[9/16] max-h-[60vh] w-full animate-pulse rounded-3xl bg-slate-200/70" />
      <div className="h-28 animate-pulse rounded-3xl bg-slate-200/70" />
    </div>
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
  const [failed, setFailed] = useState(false);
  const [attempt, setAttempt] = useState(0);
  
  // KHAI BÁO STATE CHO PHẦN THU GỌN YÊU CẦU
  const [showRequirements, setShowRequirements] = useState(false);

  useEffect(() => {
    let off = false;
    setLoading(true);
    setFailed(false);
    (async () => {
      try {
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
        if (v.error) throw v.error; 
        setVideo(v.data || null);
        setSamples(s.data || []);
      } catch (e) {
        if (!off) setFailed(true);
      } finally {
        if (!off) setLoading(false);
      }
    })();
    return () => {
      off = true;
    };
  }, [id, attempt]);

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

  if (loading) return <Skeleton />;

  if (failed) {
    return (
      <div className="mt-10 space-y-4 p-5 text-center">
        <p className="text-slate-600">Không tải được video. Kiểm tra mạng rồi thử lại nhé.</p>
        <button
          onClick={() => setAttempt((n) => n + 1)}
          className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white"
        >
          <RefreshCw size={16} /> Thử lại
        </button>
      </div>
    );
  }

  if (!video) {
    return <div className="mt-10 p-5 text-center text-slate-500">Không tìm thấy video này.</div>;
  }

  const content = ((video.title || "") + " " + (video.url || "")).toLowerCase();
  const pf = video.platform?.toUpperCase();

  // Hàm kiểm tra trạng thái từng yêu cầu
  const getRequirementStatus = (reqText, index) => {
    if (video.status === 'rejected') {
      if (video.admin_note?.toLowerCase().includes('hashtag') && index === 2) {
        return <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />;
      }
      return <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />;
    }

    if (video.status === 'approved') {
      return <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />;
    }

    if (video.status === 'pending') {
      if (index === 2) {
        const hasAllTags = tags.every(tag => content.includes(tag.toLowerCase()));
        return hasAllTags 
          ? <CheckCircle2 size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          : <XCircle size={16} className="text-rose-500 shrink-0 mt-0.5" />;
      }
      return <Clock size={16} className="text-amber-500 shrink-0 mt-0.5" />;
    }

    return <Clock size={16} className="text-slate-400 shrink-0 mt-0.5" />;
  };

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
          Theo dõi từ {fmtDay(video.created_at)}.
        </p>
        <div className="mt-3">
          <StatusPill status={video.status} />
        </div>
      </div>

      <VideoPlayer key={video.id} video={video} />

      <Card className="!p-4">
        <div className="flex items-center gap-2 font-mono text-[11px] text-slate-500">
          <Calendar size={14} />
          {fmtDay(video.video_published_at || video.published_at || video.created_at)}
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

      {/* PHẦN YÊU CẦU VIDEO (DẠNG THU GỌN) */}
      <Card>
        <button 
          onClick={() => setShowRequirements(!showRequirements)}
          className="flex w-full items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500"
        >
          <span className="flex items-center gap-2">
            <ListChecks size={14} /> ▸ YÊU CẦU VIDEO
          </span>
          <ChevronDown size={16} className={`transition-transform ${showRequirements ? 'rotate-180' : ''}`} />
        </button>

        {showRequirements && (
          <div className="mt-4 pt-4 border-t border-slate-100 animate-in fade-in slide-in-from-top-2">
            {REQUIREMENTS.length === 0 ? (
              <p className="text-sm text-slate-500">Các yêu cầu sẽ được cập nhật sau.</p>
            ) : (
              <ul className="space-y-3">
                {REQUIREMENTS.map((r, i) => (
                  <li key={i} className="flex items-start gap-2.5 text-sm text-slate-700">
                    {getRequirementStatus(r, i)}
                    <span className="min-w-0 break-words">{r}</span>
                  </li>
                ))}
              </ul>
            )}
            <p className="mt-3 text-[11px] text-slate-400">Chi tiết đầy đủ xem ở mục Thể lệ chương trình.</p>
          </div>
        )}
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
