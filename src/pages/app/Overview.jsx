import React, { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { Send, Trophy, Timer, ScrollText, CheckCircle2, ChevronRight, Film, AlertCircle } from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { Card, Eyebrow, StatusPill, PLATFORMS, getTier } from "../../components/creator/creatorUi.jsx";

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
  const tier = getTier(ov.approved);
  const vn = new Date(Date.now() + 7 * 3600e3);
  const monthLabel = `THÁNG ${vn.getUTCMonth() + 1} ${vn.getUTCFullYear()}`;
  const hashtags = ov.settings?.hashtags || "#Nxx315Studio";
  const prize = ov.settings?.event_prize_text;

  const rules = [
    "Đăng công khai trên kênh TikTok hoặc YouTube bạn đã liên kết",
    "Giới thiệu rõ website Nxx315 Studio (nxx315.top)",
    "Tiêu đề/mô tả có nội dung thật, không chỉ mỗi hashtag",
    `Gắn hashtag ${hashtags} trong tiêu đề hoặc mô tả`,
  ];

  return (
    <div className="space-y-4">
      {/* Card Profile & Quick Actions */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center gap-4">
          
          {/* KHỐI AVATAR MẪU - BOTTS NEUTRAL */}
          <div className="relative shrink-0">
            <div className="h-20 w-20 rounded-full border-[3px] border-slate-200 overflow-hidden bg-cyan-50 shadow-sm">
              <img 
                // Đã đổi sang API Bottts Neutral và cài đặt màu xanh cho hợp theme
                src="https://api.dicebear.com/7.x/bottts-neutral/svg?seed=Nxx315&backgroundColor=transparent&baseColor=cyan" 
                alt="Avatar" 
                className="h-full w-full object-cover"
              />
            </div>
            {/* Nhãn COMMON đè lên dưới */}
            <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-md bg-slate-600 px-2 py-0.5 text-[9px] font-bold tracking-widest text-white uppercase shadow-sm whitespace-nowrap">
              🔍 COMMON
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

        <div className="mt-5 flex flex-wrap gap-2">
          {ov.channels.length > 0 ? (
             ov.channels.map((c) => (
              <span key={c.platform} className="flex items-center gap-2 rounded-full border border-slate-200 bg-white py-1 pl-1 pr-3 text-xs text-slate-700 shadow-sm">
                <div className="h-6 w-6 rounded-full overflow-hidden border border-slate-200">
                  <img src={c.avatar || `https://api.dicebear.com/7.x/initials/svg?seed=${c.name}`} alt="" className="h-full w-full object-cover" />
                </div>
                <span className="max-w-[130px] truncate">{c.name || c.handle}</span>
              </span>
            ))
          ) : (
            <p className="text-xs text-slate-500 italic">Chưa có kênh liên kết.</p>
          )}
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

      {/* Card Rank */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <Eyebrow className="!text-slate-500 font-bold">{tier.name}</Eyebrow>
          <span className={`rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest ${ov.pending > 0 ? "border-amber-200 bg-amber-50 text-amber-600" : "border-emerald-200 bg-emerald-50 text-emerald-600"}`}>
            {ov.pending > 0 ? "● ĐANG CHỜ DUYỆT" : "● IDLE"}
          </span>
        </div>
        <div className="mt-3 flex items-end justify-between">
          <div>
            <Eyebrow>Hạng hiện tại</Eyebrow>
            <p className="mt-1 text-5xl font-black italic text-slate-700">{ov.rank ? `#${ov.rank}` : "—"}</p>
          </div>
          <span className={`flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${tier.cls} text-white shadow-lg`}>
            <Trophy size={30} />
          </span>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4 border-t border-slate-100 pt-4">
          <div>
            <Eyebrow>Điểm tháng này</Eyebrow>
            <p className="mt-1 text-2xl font-extrabold text-emerald-500">{ov.points_month}</p>
          </div>
          <div>
            <Eyebrow>Video tháng này</Eyebrow>
            <p className="mt-1 text-2xl font-extrabold text-slate-800">{ov.month_approved}</p>
          </div>
        </div>
      </Card>

      {/* Card Event */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <Eyebrow className="flex items-center gap-2 !text-emerald-600 font-bold">
          <span className="h-2 w-2 rounded-full bg-emerald-500" /> Sự kiện đang diễn ra
        </Eyebrow>
        <h2 className="mt-1 text-2xl font-black text-cyan-600">{monthLabel}</h2>
        
        {prize ? (
          <p className="mt-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-2.5 font-mono text-xs text-amber-700">
            🏆 {prize}
          </p>
        ) : null}
        
        <Eyebrow className="mt-4 flex items-center gap-2 font-bold"><Timer size={13} className="text-cyan-500" /> Kết thúc sau</Eyebrow>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {left && [[left.d, "NGÀY"], [left.h, "GIỜ"], [left.m, "PHÚT"], [left.s, "GIÂY"]].map(([v, l]) => (
            <div key={l} className="rounded-xl border border-slate-200 bg-slate-50 py-2 text-center">
              <p className="text-xl font-black text-cyan-600">{pad(v)}</p>
              <p className="font-mono text-[9px] tracking-widest text-slate-500">{l}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Card Rules */}
      <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
        <div className="mb-3 flex items-center justify-between">
          <Eyebrow className="flex items-center gap-2 font-bold"><ScrollText size={14} className="text-cyan-500" /> Yêu cầu nhận thưởng</Eyebrow>
          <button className="text-[10px] font-bold text-cyan-600">XEM THỂ LỆ →</button>
        </div>
        
        <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4">
          <div className="flex items-center gap-2 text-rose-600 font-bold text-sm mb-2">
            <AlertCircle size={16} /> Chưa đủ điều kiện nhận thưởng
          </div>
          <p className="text-xs text-rose-600/80 mb-3">Bạn mới có 0/5 video được duyệt — cần tối thiểu 5 video được duyệt mới nhận thưởng.</p>
          
          <div className="flex items-center justify-between text-xs font-bold text-slate-700">
            <span className="flex items-center gap-1"><Film size={14}/> Video được duyệt</span>
            <span>0/5</span>
          </div>
          <div className="mt-1 h-1.5 w-full rounded-full bg-slate-200"><div className="h-full w-0 rounded-full bg-emerald-500"></div></div>
        </div>

        <p className="mt-4 text-[11px] font-bold tracking-widest text-slate-500 uppercase">Yêu cầu mỗi video</p>
        <ul className="mt-2 space-y-2">
          {rules.map((r) => (
            <li key={r} className="flex items-start gap-2 text-xs text-slate-600">
              <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-500" /> {r}
            </li>
          ))}
        </ul>
      </Card>

      {/* Recent Videos */}
      <div>
        <div className="mb-2 flex items-center justify-between px-1">
          <Eyebrow className="font-bold text-slate-500">Video gần đây</Eyebrow>
          <button onClick={() => navigate("/app/videos")} className="font-mono text-[11px] font-bold tracking-widest text-cyan-600">XEM TẤT CẢ →</button>
        </div>
        {ov.recent.length === 0 ? (
          <div className="rounded-[2rem] border border-dashed border-slate-300 bg-white/50 px-5 py-8 text-center">
            <Film size={26} className="mx-auto text-slate-400" />
            <p className="mt-2 text-sm font-semibold text-slate-600">Chưa có video. Đăng video đầu tiên nhé!</p>
          </div>
        ) : (
          <div className="space-y-2">
            {ov.recent.map((v) => (
              <div key={v.id} className="flex items-center justify-between rounded-2xl border border-white bg-white p-3 shadow-sm">
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-800">{PLATFORMS[v.platform]?.name}</p>
                  <p className="truncate text-xs text-slate-500">{v.title || v.url}</p>
                </div>
                <StatusPill status={v.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
  }
