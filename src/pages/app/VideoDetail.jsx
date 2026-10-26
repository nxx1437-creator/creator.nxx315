import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  ArrowLeft, ExternalLink, Eye, Heart, MessageSquare, Share2, 
  AlertCircle, LineChart
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";

export default function VideoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideo = async () => {
      const { data, error } = await supabase
        .from("intro_video_submissions")
        .select("*")
        .eq("id", id)
        .single();
      
      if (!error && data) {
        setVideo(data);
      }
      setLoading(false);
    };
    fetchVideo();
  }, [id]);

  if (loading) return <div className="h-screen bg-[#f4fbf9]"></div>;
  if (!video) return <div className="p-5 text-center mt-10">Không tìm thấy video này.</div>;

  // CHỈ CÒN 1 HASHTAG DUY NHẤT
  const requiredTags = ["#Nxx315Studio"];
  const videoContent = ((video.title || "") + " " + (video.url || "")).toLowerCase();
  
  // Hàm lấy ID video để nhúng iframe
  const getEmbedUrl = (url, platform) => {
    if (!url) return null;
    if (platform === 'youtube') {
      const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|shorts\/|embed\/))([A-Za-z0-9_-]{11})/);
      return match ? `https://www.youtube.com/embed/${match[1]}` : null;
    }
    if (platform === 'tiktok') {
      const match = url.match(/\/video\/(\d+)/);
      return match ? `https://www.tiktok.com/embed/v2/${match[1]}` : null;
    }
    return null;
  };

  const embedUrl = getEmbedUrl(video.url, video.platform);

  const metrics = [
    { 
      time: new Date(video.created_at).toLocaleString("vi-VN"), 
      views: video.views || 0, 
      likes: video.likes || 0, 
      comments: video.comments || 0 
    }
  ];

  return (
    <div className="space-y-4 pb-10">
      <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-slate-600 font-semibold px-1 mb-2 mt-2">
        <ArrowLeft size={18} /> Quay lại danh sách
      </button>

      <div className="px-1">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-400 mb-1">
          ▸ CHI TIẾT VIDEO {video.platform?.toUpperCase()}
        </p>
        <h1 className="text-xl font-extrabold text-slate-900 line-clamp-2">{video.title || "Video không có tiêu đề"}</h1>
        <p className="text-[13px] text-slate-500 mt-1">Theo dõi từ {new Date(video.created_at).toLocaleDateString("vi-VN")}.</p>
        
        <div className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-bold uppercase ${
            video.status === 'approved' ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 
            video.status === 'rejected' ? 'border-rose-200 bg-rose-50 text-rose-600' : 
            'border-amber-200 bg-amber-50 text-amber-600'
          }`}>
          <span className={`h-2 w-2 rounded-full ${video.status === 'approved' ? 'bg-emerald-500' : video.status === 'rejected' ? 'bg-rose-500' : 'bg-amber-500'}`}></span>
          {video.status}
        </div>
      </div>

      {/* KHUNG VIDEO TỰ ĐỘNG CO GIÃN THEO TỶ LỆ NỀN TẢNG */}
      <div className="w-full flex justify-center bg-black rounded-2xl overflow-hidden shadow-sm">
        {embedUrl ? (
          <div className={`w-full ${video.platform === 'tiktok' ? 'aspect-[9/16] max-h-[600px]' : 'aspect-video'}`}>
            <iframe 
              src={embedUrl} 
              className="w-full h-full" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              title="Video player"
            ></iframe>
          </div>
        ) : (
          <div className="aspect-video w-full flex flex-col items-center justify-center text-white/50 bg-slate-900 p-5 text-center">
            <AlertCircle size={32} className="mb-2" />
            <p className="text-sm">Không thể nhúng video này trực tiếp.</p>
            <a href={video.url} target="_blank" rel="noreferrer" className="mt-3 text-cyan-400 font-bold hover:underline">Bấm vào đây để mở trên {video.platform}</a>
          </div>
        )}
      </div>

      <div className="px-1 flex items-center justify-between text-xs text-slate-500 font-mono mt-2">
        <span>{new Date(video.created_at).toLocaleDateString("vi-VN")} · {video.platform?.toUpperCase()}</span>
        <a href={video.url} target="_blank" rel="noreferrer" className="flex items-center gap-1 rounded-full bg-emerald-500 px-4 py-2 text-white font-bold text-xs shadow-sm hover:bg-emerald-600 transition">
          Mở trên {video.platform} <ExternalLink size={14} />
        </a>
      </div>

      {video.status === 'rejected' && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-5 mt-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-2">
            <AlertCircle size={16} /> LÝ DO TỪ CHỐI
          </div>
          <p className="text-sm text-rose-700 font-medium mb-3">
            {video.admin_note || "Video không đáp ứng yêu cầu của chương trình."}
          </p>
          <div className="h-px w-full bg-rose-200 mb-3"></div>
          <p className="text-xs text-rose-600/70 italic">
            Lý do reject này không thể sửa — vui lòng upload video khác.
          </p>
        </div>
      )}

      {/* HASHTAG ĐÃ ĐƯỢC SỬA THÀNH #NXX315STUDIO */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mt-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3">▸ HASHTAG</p>
        <p className="text-xs font-bold text-slate-600 mb-2">BẮT BUỘC</p>
        <div className="flex flex-wrap gap-2">
          {requiredTags.map(tag => {
            const isMissing = !videoContent.includes(tag.toLowerCase());
            return (
              <span key={tag} className={`rounded-full border px-3 py-1 text-xs font-bold ${
                isMissing ? 'border-amber-200 bg-amber-50 text-amber-600' : 'border-emerald-200 bg-emerald-50 text-emerald-600'
              }`}>
                {tag} {isMissing ? "(Thiếu)" : "(Đã có)"}
              </span>
            );
          })}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 mt-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase">LƯỢT XEM</span> <Eye size={14}/>
          </div>
          <p className="text-3xl font-black text-cyan-600">{video.views || 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase">LƯỢT THÍCH</span> <Heart size={14}/>
          </div>
          <p className="text-3xl font-black text-cyan-600">{video.likes || 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase">BÌNH LUẬN</span> <MessageSquare size={14}/>
          </div>
          <p className="text-3xl font-black text-cyan-600">{video.comments || 0}</p>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between text-slate-400 mb-2">
            <span className="text-[10px] font-bold uppercase">ĐIỂM</span> <Share2 size={14}/>
          </div>
          <p className="text-3xl font-black text-cyan-600">{video.status === 'approved' ? 100 : 0}</p>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm mt-4">
        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2">▸ LỊCH SỬ CHỈ SỐ</p>
        <p className="text-sm font-bold text-slate-800 mb-1">LƯỢT XEM ({metrics.length} MẪU)</p>
        <p className="text-[10px] text-slate-400 font-mono mb-4">LẦN CUỐI: {new Date(video.created_at).toLocaleString("vi-VN")}</p>
        
        {metrics.length < 2 ? (
           <div className="rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50/50 p-8 text-center flex flex-col items-center justify-center mb-4">
             <div className="h-10 w-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-3">
                <LineChart size={20} />
             </div>
             <p className="text-[13px] font-bold tracking-widest text-slate-600 uppercase">ĐANG CHỜ THÊM MẪU</p>
             <p className="text-[12px] text-slate-500 mt-1">Cần ít nhất 2 mẫu để vẽ biểu đồ xu hướng.</p>
           </div>
        ) : (
           <div className="h-32 w-full bg-slate-50 rounded-xl mb-4"></div>
        )}

        <p className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-2 mt-6">▸ MẪU GẦN ĐÂY</p>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[11px]">
            <thead className="text-slate-400 border-b border-slate-100">
              <tr>
                <th className="pb-2 font-bold uppercase">Thời điểm</th>
                <th className="pb-2 font-bold uppercase text-center">Lượt xem</th>
                <th className="pb-2 font-bold uppercase text-center">Lượt thích</th>
                <th className="pb-2 font-bold uppercase text-center">Bình luận</th>
              </tr>
            </thead>
            <tbody>
              {metrics.map((m, i) => (
                <tr key={i} className="border-b border-slate-50 last:border-0">
                  <td className="py-3 font-mono text-[10px] text-slate-500">{m.time}</td>
                  <td className="py-3 text-center font-bold text-slate-700">{m.views}</td>
                  <td className="py-3 text-center font-bold text-slate-700">{m.likes}</td>
                  <td className="py-3 text-center font-bold text-slate-700">{m.comments}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
      }
