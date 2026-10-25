import React from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Send, Trophy, Film, Gift, ArrowRight } from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { Card, PLATFORMS, getTier } from "../../components/creator/creatorUi.jsx";

export default function Overview() {
  const navigate = useNavigate();
  const { ov } = useOutletContext(); 
  const { profile } = useSession();

  // Nếu chưa có dữ liệu, trả về một khoảng trắng (không hiện vòng xoay)
  if (!ov) {
    return <div className="h-screen bg-[#f4fbf9]"></div>;
  }

  const hour = new Date().getHours();
  const greet = hour < 11 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";
  const tier = getTier(ov.approved || 0);
  const vn = new Date(Date.now() + 7 * 3600e3);
  const monthLabel = `THÁNG ${vn.getUTCMonth() + 1} ${vn.getUTCFullYear()}`;

  return (
    <div className="space-y-4 pb-10">
      
      {/* 1. THẺ THÔNG TIN CREATOR */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="h-16 w-16 rounded-full border-[3px] border-slate-100 overflow-hidden bg-white shadow-sm">
              <img 
                src={`https://api.dicebear.com/7.x/bottts-neutral/svg?seed=${profile?.username || 'Nxx315'}&radius=50`} 
                alt="Avatar" 
                className="h-full w-full object-cover" 
              />
            </div>
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-slate-700 px-2 py-0.5 text-[8px] font-bold tracking-widest text-white uppercase shadow-sm whitespace-nowrap z-10">
              {tier.name}
            </span>
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-[12px] text-slate-500">{greet}</p>
            <h1 className="text-xl font-extrabold text-cyan-600 truncate">{profile?.username || "Creator"}</h1>
          </div>
        </div>

        <button onClick={() => navigate("/app/videos")} className="mt-5 flex w-full items-center justify-between rounded-full bg-emerald-500 py-3 pl-6 pr-3 text-[14px] font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-600">
          Gửi video mới
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><Send size={16} /></span>
        </button>
      </Card>

      {/* 2. THỐNG KÊ NHANH */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-mono text-[10px] font-bold uppercase tracking-widest text-slate-500">
            Tổng quan {monthLabel}
          </h2>
          <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md border border-emerald-100">
            ● IDLE
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Hạng */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Trophy size={12} />
              <p className="text-[9px] font-bold uppercase">Hạng hiện tại</p>
            </div>
            <p className="text-2xl font-black text-slate-800">{ov.rank ? `#${ov.rank}` : "—"}</p>
          </div>

          {/* Điểm */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <span className="font-bold text-[10px]">★</span>
              <p className="text-[9px] font-bold uppercase">Điểm tháng</p>
            </div>
            <p className="text-2xl font-black text-cyan-600">{ov.points_month || 0}</p>
          </div>

          {/* Video tháng */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Film size={12} />
              <p className="text-[9px] font-bold uppercase">Video tháng</p>
            </div>
            <p className="text-2xl font-black text-slate-800">{ov.month_approved || 0}</p>
          </div>

          {/* Giờ nhận */}
          <div className="rounded-2xl border border-slate-100 bg-slate-50 p-3">
            <div className="flex items-center gap-1.5 text-slate-400 mb-1">
              <Gift size={12} />
              <p className="text-[9px] font-bold uppercase">Giờ đã nhận</p>
            </div>
            <p className="text-2xl font-black text-emerald-500">{ov.total_coins || 0}h</p>
          </div>
        </div>
      </Card>

      {/* 3. VIDEO GẦN ĐÂY */}
      <div>
        <div className="mb-3 flex items-center justify-between px-1">
          <h2 className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
            <Film size={14} className="text-cyan-500" /> Video gần đây
          </h2>
          <button onClick={() => navigate("/app/videos")} className="text-[10px] font-bold text-cyan-600 flex items-center gap-1">
            Xem tất cả <ArrowRight size={12}/>
          </button>
        </div>
        
        {(!ov.recent || ov.recent.length === 0) ? (
          <div className="rounded-[2rem] border-2 border-dashed border-slate-200 bg-white/50 px-5 py-8 text-center">
            <Film size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-[14px] font-bold text-slate-700">Chưa có video nào</p>
            <p className="mt-1 text-[12px] text-slate-500">Hãy gửi video đầu tiên để bắt đầu tích điểm.</p>
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
                    <p className="text-[13px] font-bold text-slate-800">{PLATFORMS[v.platform]?.name || v.platform}</p>
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
