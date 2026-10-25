import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { 
  Send, Trophy, Timer, CheckCircle2, Film, Bell, Eye, Heart, MessageSquare, Clock, AlertCircle, Gift, ArrowRight, Link as LinkIcon
} from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { Card, PLATFORMS, getTier } from "../../components/creator/creatorUi.jsx";

const pad = (n) => String(n).padStart(2, "0");

function useMonthEnd() {
  const [left, setLeft] = useState(null);
  useEffect(() => {
    const tick = () => {
      const vn = new Date(Date.now() + 7 * 3600e3);
      const end = Date.UTC(vn.getUTCFullYear(), vn.getUTCMonth() + 1, 1) - 7 * 3600e3;
      const s = Math.max(0, Math.floor((end - Date.now()) / 1000));
      setLeft({
        d: Math.floor(s / 86400), h: Math.floor((s % 86400) / 3600),
        m: Math.floor((s % 3600) / 60), s: s % 60,
      });
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return left;
}

export default function Overview() {
  const navigate = useNavigate();
  const { ov } = useOutletContext(); 
  const { profile } = useSession();
  const left = useMonthEnd();

  const hour = new Date().getHours();
  const greet = hour < 11 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";
  const tier = ov ? getTier(ov.approved) : null;
  const vn = new Date(Date.now() + 7 * 3600e3);
  const monthLabel = `THÁNG ${vn.getUTCMonth() + 1} ${vn.getUTCFullYear()}`;
  const prize = ov?.settings?.event_prize_text || "Chưa cập nhật giải thưởng tháng này";

  if (!ov) return <div className="h-screen bg-[#f4fbf9]"></div>;

  const totalViews = ov.recent?.reduce((sum, v) => sum + (v.views || 0), 0) || 0;
  const totalLikes = ov.recent?.reduce((sum, v) => sum + (v.likes || 0), 0) || 0;

  return (
    <div className="space-y-4 pb-10">
      
      {/* 1. THẺ THÔNG TIN CREATOR */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-full border-[3px] border-slate-100 overflow-hidden bg-white shadow-sm flex items-center justify-center relative">
              <img 
                src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${profile?.username || 'Nxx315'}&radius=50`} 
                alt="Avatar" 
                className="h-full w-full object-cover" 
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-slate-700 px-2 py-0.5 text-[9px] font-bold tracking-widest text-white uppercase shadow-sm whitespace-nowrap z-10">
              🔍 {tier?.name || "COMMON"}
            </span>
          </div>

          <div className="flex-1">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 font-mono text-[9px] font-bold tracking-widest text-emerald-600">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> CREATOR NXX315
            </span>
            <p className="mt-1.5 text-[13px] text-slate-500">{greet}</p>
            <h1 className="text-2xl font-extrabold text-cyan-600 truncate">{profile?.username || "Creator"}</h1>
          </div>
        </div>

        <div className="mt-5 flex flex-col sm:flex-row gap-2">
          <button onClick={() => navigate("/app/videos")} className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-600">
            <Send size={16} /> Gửi video mới
          </button>
          <button onClick={() => navigate("/app/settings")} className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <LinkIcon size={16} /> Liên kết kênh
          </button>
        </div>
      </Card>

      {/* 2. NHIỆM VỤ & TIẾN ĐỘ */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <CheckCircle2 size={14} className="text-cyan-500"/> Nhiệm vụ tháng này
          </h2>
          <span className="text-[10px] font-bold text-cyan-600 bg-cyan-50 px-2 py-1 rounded-md border border-cyan-100">
            {ov.month_approved}/5 video
          </span>
        </div>
        
        <div className="h-2 w-full rounded-full bg-slate-100 mb-2 overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${Math.min((ov.month_approved / 5) * 100, 100)}%` }}></div>
        </div>
        <p className="text-[12px] text-slate-500 mb-4">Cố gắng đạt 5 video được duyệt để nhận thưởng top tháng.</p>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Video đã duyệt</p>
            <p className="text-xl font-black text-emerald-500">{ov.approved || 0}</p>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <p className="text-[10px] font-bold text-slate-400 uppercase">Đang chờ duyệt</p>
            <p className="text-xl font-black text-amber-500">{ov.pending || 0}</p>
          </div>
        </div>
      </Card>

      {/* 3. SỰ KIỆN ĐANG DIỄN RA */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-2 w-2 rounded-full bg-rose-500 animate-pulse"></span>
          <h2 className="text-[13px] font-bold text-slate-700">Sự kiện Creator {monthLabel}</h2>
        </div>
        
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 mb-4">
          <p className="text-[11px] font-bold text-amber-800 uppercase mb-1">🏆 Giải thưởng</p>
          <p className="text-[13px] font-medium text-amber-700">{prize}</p>
        </div>

        <div className="flex items-center justify-between border-t border-slate-100 pt-4">
          <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Clock size={12}/> Kết thúc sau</div>
          <div className="flex gap-2">
            {left && [[left.d, "NGÀY"], [left.h, "GIỜ"], [left.m, "PHÚT"], [left.s, "GIÂY"]].map(([v, l]) => (
              <div key={l} className="flex flex-col items-center justify-center h-11 w-11 rounded-xl border border-slate-200 bg-white shadow-sm">
                <p className="text-[14px] font-black text-slate-800 leading-none">{pad(v)}</p>
                <p className="text-[8px] font-bold text-slate-400 mt-1">{l}</p>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* 4. THỐNG KÊ TƯƠNG TÁC */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
          <Eye size={14} className="text-cyan-500"/> Tương tác tích lũy
        </h2>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="h-10 w-10 mx-auto rounded-full bg-cyan-50 flex items-center justify-center text-cyan-600 mb-2">
              <Eye size={18} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Lượt xem</p>
            <p className="text-lg font-black text-slate-800">{totalViews.toLocaleString()}</p>
          </div>
          <div>
            <div className="h-10 w-10 mx-auto rounded-full bg-rose-50 flex items-center justify-center text-rose-500 mb-2">
              <Heart size={18} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Lượt thích</p>
            <p className="text-lg font-black text-slate-800">{totalLikes.toLocaleString()}</p>
          </div>
          <div>
            <div className="h-10 w-10 mx-auto rounded-full bg-amber-50 flex items-center justify-center text-amber-500 mb-2">
              <Gift size={18} />
            </div>
            <p className="text-[10px] font-bold text-slate-400 uppercase">Giờ nhận</p>
            <p className="text-lg font-black text-slate-800">{ov.total_coins || 0}h</p>
          </div>
        </div>
      </Card>

      {/* 5. VIDEO GẦN ĐÂY */}
      <div>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Film size={14}/> Video gần đây</h2>
          <button onClick={() => navigate("/app/videos")} className="text-[10px] font-bold text-cyan-600 flex items-center gap-1">Xem tất cả <ArrowRight size={12}/></button>
        </div>
        
        {ov.recent.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 px-5 py-8 text-center">
            <Film size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-[14px] font-bold text-slate-700">Bạn chưa có video nào</p>
            <p className="mt-1 text-[12px] text-slate-500 mb-4">Hãy gửi video đầu tiên để bắt đầu tích điểm và nhận thưởng.</p>
            <button onClick={() => navigate("/app/videos")} className="rounded-full bg-cyan-600 px-6 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-cyan-700">
              Gửi video ngay
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {ov.recent.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-2xl border border-white bg-white p-3 shadow-sm">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="h-10 w-10 rounded-xl bg-slate-100 flex items-center justify-center shrink-0">
                    <Film size={18} className="text-slate-400" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[13px] font-bold text-slate-800">{PLATFORMS[v.platform]?.name}</p>
                    <p className="truncate text-[11px] text-slate-500">{v.title || v.url}</p>
                  </div>
                </div>
                <span className={`shrink-0 ml-2 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider ${
                  v.status === 'approved' ? 'bg-emerald-50 text-emerald-600 border border-emerald-200' : 
                  v.status === 'rejected' ? 'bg-rose-50 text-rose-600 border border-rose-200' : 
                  'bg-amber-50 text-amber-600 border border-amber-200'
                }`}>
                  {v.status === 'approved' ? 'Đã duyệt' : v.status === 'rejected' ? 'Từ chối' : 'Chờ duyệt'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
              }
