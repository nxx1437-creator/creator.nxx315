import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { 
  Send, Trophy, Timer, CheckCircle2, Film, Bell, Play, Eye, Heart, MessageSquare, Share2, Clock, AlertCircle, Gift 
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
  const [showNotifyBanner, setShowNotifyBanner] = useState(true);

  const hour = new Date().getHours();
  const greet = hour < 11 ? "Chào buổi sáng" : hour < 18 ? "Chào buổi chiều" : "Chào buổi tối";
  const tier = ov ? getTier(ov.approved) : null;
  const vn = new Date(Date.now() + 7 * 3600e3);
  const monthLabel = `THÁNG ${vn.getUTCMonth() + 1} ${vn.getUTCFullYear()}`;

  if (!ov) return <div className="h-screen bg-[#f4fbf9]"></div>;

  // Lấy tổng số liệu (giả lập từ API hoặc mặc định là 0)
  const totalViews = ov.recent?.reduce((sum, v) => sum + (v.views || 0), 0) || 0;
  const totalLikes = ov.recent?.reduce((sum, v) => sum + (v.likes || 0), 0) || 0;
  const totalComments = ov.recent?.reduce((sum, v) => sum + (v.comments || 0), 0) || 0;

  return (
    <div className="space-y-4 pb-10">
      
      {/* 1. BANNER BẬT THÔNG BÁO */}
      {showNotifyBanner && (
        <div className="relative rounded-3xl border border-emerald-100 bg-[#e6f7f2] p-5 shadow-sm">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white shadow-sm">
              <Bell size={18} />
            </div>
            <div className="pr-4">
              <h3 className="text-[15px] font-bold text-slate-800">Bật thông báo đẩy</h3>
              <p className="mt-1 text-[13px] text-slate-600 leading-relaxed">
                Nhận tin ngay khi video được duyệt, có phần thưởng hoặc thông báo mới — kể cả khi không mở web.
              </p>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <button className="rounded-full bg-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600 flex items-center gap-2">
              <Bell size={16} /> Bật ngay
            </button>
            <button onClick={() => setShowNotifyBanner(false)} className="text-slate-400 hover:text-slate-600">
              ✕
            </button>
          </div>
        </div>
      )}

      {/* 2. CARD THÔNG TIN USER (Giống ảnh 1) */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-full border-[3px] border-slate-200 overflow-hidden bg-white shadow-sm flex items-center justify-center relative">
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
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" /> CREATOR HQ · LIVE
            </span>
            <p className="mt-1.5 text-[13px] text-slate-500">{greet}</p>
            <h1 className="text-2xl font-extrabold text-cyan-600 truncate">{profile?.username || "Creator"}</h1>
            
            <p className="mt-1.5 font-mono text-[9px] font-bold tracking-widest text-slate-400">
              ▸ HUD NHIỆM VỤ CỦA BẠN —<br/>30 NGÀY GẦN NHẤT.
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2">
          <button onClick={() => navigate("/app/videos")} className="flex w-full items-center justify-between rounded-full bg-emerald-500 py-3 pl-6 pr-3 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-600">
            Liên kết kênh / Gửi video
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white/20"><Send size={16} /></span>
          </button>
          <button onClick={() => navigate("/app/ranking")} className="flex w-full items-center justify-between rounded-full border border-slate-200 bg-white py-3 pl-5 pr-3 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50">
            <span className="flex items-center gap-2"><Trophy size={18} className="text-amber-500" /> Bảng xếp hạng</span>
            <ChevronRight size={18} className="text-slate-400" />
          </button>
        </div>
      </Card>

      {/* 3. CARD SỰ KIỆN (Giống ảnh 2) */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-cyan-600">
             <span className="h-1.5 w-1.5 rounded-full bg-cyan-500"></span> SỰ KIỆN ĐANG DIỄN RA
          </span>
        </div>
        <h2 className="text-3xl font-black text-cyan-600 mb-4">{monthLabel}</h2>
        
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 mb-4 flex items-center justify-between">
           <div className="flex items-center gap-2 text-amber-700 text-xs font-bold">
             <Gift size={16} /> TỔNG GIẢI THƯỞNG
           </div>
           <span className="text-sm font-bold text-amber-700">1,750,000Đ + 900H</span>
        </div>
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3 mb-6 flex items-center justify-between">
           <div className="flex items-center gap-2 text-emerald-700 text-xs font-bold">
             <Trophy size={16} /> TOP 1
           </div>
           <span className="text-sm font-bold text-emerald-700">700,000Đ + 150H</span>
        </div>

        <div className="flex items-center justify-between border-t border-slate-200/60 pt-4">
           <div className="text-[10px] font-bold text-slate-500 uppercase flex items-center gap-1"><Clock size={12}/> KẾT THÚC SAU</div>
           <div className="flex gap-2">
              {left && [[left.d, "NGÀY"], [left.h, "GIỜ"], [left.m, "PHÚT"], [left.s, "GIÂY"]].map(([v, l]) => (
                <div key={l} className="flex flex-col items-center justify-center h-12 w-12 rounded-full border border-cyan-300 bg-white shadow-sm">
                  <p className="text-[13px] font-black text-cyan-600 leading-none">{pad(v)}</p>
                  <p className="text-[8px] font-bold text-slate-400 mt-0.5">{l}</p>
                </div>
              ))}
           </div>
        </div>
      </Card>

      {/* 4. CARD YÊU CẦU NHẬN THƯỞNG */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
         <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-bold uppercase tracking-widest text-slate-500">▸ YÊU CẦU NHẬN THƯỞNG</span>
          <button onClick={() => navigate("/app/rules")} className="text-[10px] font-bold text-cyan-600 flex items-center gap-1">XEM THỂ LỆ <ChevronRight size={12}/></button>
        </div>
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-2">
            <AlertCircle size={16} /> Chưa đủ điều kiện nhận thưởng
          </div>
          <p className="text-xs text-rose-600/80 mb-3">Bạn mới có 0/5 video được duyệt — cần tối thiểu 5 video được duyệt mới nhận thưởng.</p>
          <div className="flex items-center justify-between text-xs font-bold text-slate-700 mb-1">
            <span className="flex items-center gap-1"><Film size={14}/> Video được duyệt</span>
            <span>0/5</span>
          </div>
          <div className="h-1.5 w-full rounded-full bg-slate-200"><div className="h-full w-0 rounded-full bg-emerald-500"></div></div>
        </div>

        <p className="mt-4 text-[11px] font-bold tracking-widest text-slate-500 uppercase">YÊU CẦU MỖI VIDEO</p>
        <ul className="mt-2 space-y-2">
          {[
            "Thời lượng tối thiểu 1 phút",
            "Đăng công khai trên TikTok hoặc YouTube",
            "Tiêu đề/mô tả phải có nội dung thật, không chỉ mỗi hashtag",
            "Gắn đủ hashtag #Nxx315Studio trong tiêu đề hoặc mô tả"
          ].map((r) => (
            <li key={r} className="flex items-start gap-2 text-[13px] text-slate-700 font-medium">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {r}
            </li>
          ))}
        </ul>
      </Card>

      {/* 5. CARD ĐIỂM THÁNG NÀY & TỔNG TÍCH LŨY (Giống ảnh 3, 4) */}
      <div className="grid grid-cols-1 gap-4">
         {/* Điểm tháng này */}
         <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-emerald-600 mb-4">
               <Trophy size={12}/> ĐIỂM THÁNG NÀY
            </div>
            <p className="text-6xl font-black text-emerald-500 mb-2">{ov.points_month || 0}</p>
            <div className="h-1.5 w-full bg-slate-200 rounded-full mb-6"><div className="h-full w-0 bg-emerald-500 rounded-full"></div></div>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-3">▸ TỔNG TÍCH LŨY</p>
            <div className="grid grid-cols-2 gap-4">
               <div className="flex items-center gap-2">
                 <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Film size={14}/></div>
                 <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase">TỔNG VIDEO</p>
                   <p className="text-sm font-black text-slate-800">{ov.total || 0}</p>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Eye size={14}/></div>
                 <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase">LƯỢT XEM</p>
                   <p className="text-sm font-black text-slate-800">{totalViews}</p>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><Heart size={14}/></div>
                 <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase">LƯỢT THÍCH</p>
                   <p className="text-sm font-black text-slate-800">{totalLikes}</p>
                 </div>
               </div>
               <div className="flex items-center gap-2">
                 <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500"><MessageSquare size={14}/></div>
                 <div>
                   <p className="text-[9px] font-bold text-slate-400 uppercase">BÌNH LUẬN</p>
                   <p className="text-sm font-black text-slate-800">{totalComments}</p>
                 </div>
               </div>
            </div>

            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-6 mb-3">▸ TRẠNG THÁI VIDEO</p>
            <div className="grid grid-cols-2 gap-2">
               <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-3 flex items-center gap-2">
                 <CheckCircle2 size={16} className="text-emerald-500"/>
                 <div>
                   <p className="text-[9px] font-bold text-emerald-600 uppercase">ĐÃ DUYỆT</p>
                   <p className="text-lg font-black text-emerald-600 leading-none">{ov.approved || 0}</p>
                 </div>
               </div>
               <div className="rounded-2xl border border-blue-200 bg-blue-50/50 p-3 flex items-center gap-2">
                 <Clock size={16} className="text-blue-500"/>
                 <div>
                   <p className="text-[9px] font-bold text-blue-600 uppercase">ĐANG CHỜ</p>
                   <p className="text-lg font-black text-blue-600 leading-none">{ov.pending || 0}</p>
                 </div>
               </div>
               <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-3 flex items-center gap-2">
                 <AlertCircle size={16} className="text-amber-500"/>
                 <div>
                   <p className="text-[9px] font-bold text-amber-600 uppercase">NGHI VẤN</p>
                   <p className="text-lg font-black text-amber-600 leading-none">0</p>
                 </div>
               </div>
               <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-3 flex items-center gap-2">
                 <AlertCircle size={16} className="text-rose-500"/>
                 <div>
                   <p className="text-[9px] font-bold text-rose-600 uppercase">BỊ LOẠI</p>
                   <p className="text-lg font-black text-rose-600 leading-none">{ov.rejected || 0}</p>
                 </div>
               </div>
            </div>
         </Card>

         {/* Giờ đã nhận */}
         <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md flex items-center justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-emerald-600 mb-2">
                 <Gift size={12}/> GIỜ ĐÃ NHẬN
              </div>
              <div className="flex items-end gap-1">
                <p className="text-4xl font-black text-emerald-500">{ov.total_coins || 0}</p>
                <p className="text-lg font-bold text-slate-500 mb-1">h</p>
              </div>
            </div>
            <button className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">CLAIM</button>
         </Card>

         {/* Video tháng này */}
         <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-cyan-600 mb-4">
               # VIDEO THÁNG NÀY
            </div>
            <p className="text-4xl font-black text-cyan-600">{ov.month_approved || 0}</p>
         </Card>
      </div>

      {/* 6. VỪA NHẬN THƯỞNG (Giống ảnh 4) */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
             <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-500"><Gift size={16}/></div>
             <div>
               <h3 className="text-sm font-bold text-slate-800">Vừa nhận thưởng</h3>
               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">GIỜ VỪA ĐƯỢC CỘNG CHO CREATOR</p>
             </div>
          </div>
          <button className="text-[10px] font-bold text-cyan-600 flex items-center gap-1">XEM TẤT CẢ <ChevronRight size={12}/></button>
        </div>

        <div className="rounded-xl border border-cyan-200 bg-cyan-50/50 p-4 flex items-center justify-between mb-4">
           <div className="flex items-center gap-2 text-cyan-700 text-xs font-bold">
             <Trophy size={16} /> TỔNG GIỜ ĐÃ TĂNG
           </div>
           <div className="flex items-end gap-1">
             <span className="text-xl font-black text-cyan-600">83.250</span>
             <span className="text-[10px] font-bold text-cyan-600 mb-1">GIỜ</span>
           </div>
        </div>

        <div className="space-y-3">
           {[
             {name: "quan0806", initial: "Q", color: "bg-blue-600", time: "+6 giờ", date: "Hôm qua", title: "Quân Văn hahh #xcloudphone #clo..."},
             {name: "phunggay", initial: "H", color: "bg-fuchsia-500", time: "+6 giờ", date: "Hôm qua", title: "HiyH ai đang tìm giải pháp ..."},
             {name: "phunggay", initial: "H", color: "bg-fuchsia-500", time: "+6 giờ", date: "Hôm qua", title: "HiyH xcloudphone là giải phá..."},
             {name: "phunggay", initial: "H", color: "bg-fuchsia-500", time: "+6 giờ", date: "Hôm qua", title: "HiyH treo steal an egg trên..."}
           ].map((item, idx) => (
             <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className={`h-10 w-10 rounded-full flex items-center justify-center text-white font-bold text-sm ${item.color}`}>
                      {item.initial}
                   </div>
                   <div className="min-w-0">
                      <p className="text-sm font-bold text-slate-800">{item.name}</p>
                      <p className="text-[11px] text-slate-500 truncate max-w-[150px]">{item.title}</p>
                   </div>
                </div>
                <div className="text-right shrink-0">
                   <span className="inline-block rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">{item.time}</span>
                   <p className="text-[9px] text-slate-400 mt-1">{item.date}</p>
                </div>
             </div>
           ))}
        </div>
      </Card>

      {/* 7. VÀO DISCORD */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/70 p-5 shadow-sm backdrop-blur-md">
         <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#5865F2] text-white shadow-sm">
              <MessageSquare size={20} />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">CỘNG ĐỒNG</p>
              <h3 className="text-[15px] font-bold text-slate-800">Vào Discord creator XCloudPhone</h3>
              <p className="mt-1 text-[13px] text-slate-600 leading-relaxed mb-4">
                Thông báo campaign, tin trả thưởng và hỗ trợ trực tiếp từ team — kèm /rank và /stats ngay trong Discord sau khi bạn liên kết tài khoản.
              </p>
              <button className="w-full flex items-center justify-center gap-2 rounded-xl bg-emerald-500 py-3 text-sm font-bold text-white shadow-md transition hover:bg-emerald-600">
                Vào Discord <ExternalLink size={16} />
              </button>
            </div>
         </div>
      </Card>

      {/* 8. VIDEO GẦN ĐÂY */}
      <div>
        <div className="mb-3 flex items-center justify-between px-1">
          <span className="font-mono text-[11px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2"><Play size={14}/> VIDEO GẦN ĐÂY</span>
          <button onClick={() => navigate("/app/videos")} className="font-mono text-[11px] font-bold tracking-widest text-cyan-600">XEM TẤT CẢ →</button>
        </div>
        {ov.recent.length === 0 ? (
          <div className="rounded-[2rem] border-2 border-dashed border-slate-300 bg-white/40 px-5 py-8 text-center">
            <Film size={32} className="mx-auto text-slate-300 mb-3" />
            <p className="text-[15px] font-bold text-slate-800">Chưa có video. Đăng video đầu tiên để bắt đầu tích điểm.</p>
            <p className="mt-1 text-[13px] text-slate-500 mb-4">Kết nối TikTok hoặc YouTube để bot phát hiện video của bạn.</p>
            <button onClick={() => navigate("/app/videos")} className="rounded-full bg-emerald-500 px-6 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-emerald-600">
              Liên kết kênh
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            {ov.recent.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-2xl border border-white bg-white p-3 shadow-sm">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">{PLATFORMS[v.platform]?.name}</p>
                  <p className="truncate text-xs text-slate-500">{v.title || v.url}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-600">{v.status}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
