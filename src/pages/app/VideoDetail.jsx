import React, { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, useOutletContext } from "react-router-dom";
import {
  ArrowLeft, AlertCircle, Eye, Heart, MessageSquare, Share2, Calendar,
  ListChecks, RefreshCw, ChevronDown,
} from "lucide-react";
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

/* ====== YÊU CẦU VIDEO (rút gọn từ Thể lệ) ====== */
const OK = "ok";
const FAIL = "fail";
const WAIT = "wait";
const NA = "na";

// words: từ khóa trong ghi chú từ chối của admin để biết mục nào không đạt
const REQUIREMENTS = [
  { key: "channel", text: "Đăng công khai trên kênh đã liên kết", words: ["kênh", "liên kết", "riêng tư", "công khai"] },
  { key: "duration", text: "Thời lượng tối thiểu 1 phút", words: ["ngắn", "thời lượng"] },
  { key: "content", text: "Nội dung giới thiệu NXX315 Studio", words: ["không liên quan", "nội dung", "sai sự thật", "gây hiểu lầm"] },
  { key: "hashtag", text: "Có đủ hashtag bắt buộc", words: ["hashtag"] },
  { key: "title", text: "Có tiêu đề và mô tả phù hợp", words: ["tiêu đề", "mô tả"] },
  { key: "original", text: "Tự làm hoặc có quyền sử dụng", words: ["sao chép", "đăng lại", "bản quyền", "quyền sử dụng"] },
  { key: "unique", text: "Chưa gửi nhận thưởng trước đó", words: ["đã gửi", "trùng", "một lần"] },
  { key: "fake", text: "Không mua tương tác, không dùng bot", words: ["bot", "gian lận", "mua", "tương tác giả", "spam"] },
  { key: "rules", text: "Tuân thủ quy định nền tảng và pháp luật", words: ["vi phạm", "quy định", "pháp luật"] },
];

// Trả về trạng thái từng yêu cầu: OK (✓) / FAIL (✕) / WAIT (° đang duyệt) / NA (không rõ)
function evaluate(video, tags, content, minSec = 60) {
  const note = (video.admin_note || "").toLowerCase();
  const hit = (r) => r.words.some((w) => note.includes(w));
  const plainTitle = (video.title || "").replace(/#[^\s#]+/g, "").trim();
  const dur = video.duration_seconds;
  const verdict = video.ai_check?.content?.verdict;

  // Các mục hệ thống tự kiểm tra được
  const auto = {
    channel: OK, // đã qua bước kiểm tra kênh khi gửi
    unique: OK, // mỗi link chỉ gửi được một lần
    hashtag: tags.every((t) => content.includes(t.toLowerCase())) ? OK : FAIL,
    title: plainTitle.length >= 3 ? OK : FAIL,
  };
  // Thời lượng: có số liệu thì kết luận luôn
  if (dur !== null && dur !== undefined) auto.duration = dur >= minSec ? OK : FAIL;
  // Nội dung: AI chỉ kết luận khi chắc, còn lại để admin xem
  if (verdict === "ok") auto.content = OK;
  else if (verdict === "fail") auto.content = FAIL;

  return REQUIREMENTS.map((r) => {
    if (video.status === "approved") return OK;
    if (video.status === "rejected") {
      if (hit(r)) return FAIL;
      if (r.key in auto) return auto[r.key];
      return NA; // chưa được xét thì không báo đạt
    }
    // đang chờ duyệt
    return r.key in auto ? auto[r.key] : WAIT;
  });
}

function StateIcon({ s }) {
  const base = "mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full";
  if (s === OK) {
    return <span className={`${base} bg-emerald-500 text-[10px] font-black leading-none text-white`}>✓</span>;
  }
  if (s === FAIL) {
    return <span className={`${base} bg-rose-500 text-[10px] font-black leading-none text-white`}>✕</span>;
  }
  if (s === WAIT) {
    return <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border-[3px] border-amber-400" />;
  }
  return <span className={`${base} bg-slate-200 text-[10px] font-black leading-none text-slate-500`}>–</span>;
}

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
  const minSec = Number(ctx.ov?.settings?.min_video_seconds) || 60;
  const states = evaluate(video, tags, content, minSec);
  const aiReason = video.ai_check?.content?.reason;
  const okCount = states.filter((s) => s === OK).length;

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

      {/* YÊU CẦU VIDEO (THU GỌN) */}
      <Card>
        <button
          onClick={() => setShowRequirements(!showRequirements)}
          className="flex w-full items-center justify-between font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500"
        >
          <span className="flex items-center gap-2">
            <ListChecks size={14} /> ▸ YÊU CẦU VIDEO
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] text-slate-600">
              {okCount}/{REQUIREMENTS.length}
            </span>
          </span>
          <ChevronDown
            size={16}
            className={`transition-transform ${showRequirements ? "rotate-180" : ""}`}
          />
        </button>

        {showRequirements && (
          <div className="mt-4 border-t border-slate-100 pt-4">
            <ul className="space-y-2.5">
              {REQUIREMENTS.map((r, i) => (
                <li key={r.key} className="flex items-start gap-2.5 text-sm">
                  <StateIcon s={states[i]} />
                  <span className="min-w-0 break-words">
                    <span
                      className={states[i] === FAIL ? "font-semibold text-rose-600" : "text-slate-700"}
                    >
                      {r.text}
                    </span>
                    {r.key === "content" && aiReason && (
                      <span className="mt-0.5 block text-[11px] text-slate-400">AI: {aiReason}</span>
                    )}
                  </span>
                </li>
              ))}
            </ul>

            <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-500">
              <span className="flex items-center gap-1.5">
                <StateIcon s={OK} /> Đạt
              </span>
              <span className="flex items-center gap-1.5">
                <StateIcon s={FAIL} /> Không đạt
              </span>
               <span className="flex items-center gap-1.5">
                <StateIcon s={NA} /> Chưa xét
              </span>
            </div>
            <p className="mt-2 text-[11px] text-slate-400">
              Chi tiết đầy đủ xem ở mục Thể lệ chương trình.
            </p>
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
