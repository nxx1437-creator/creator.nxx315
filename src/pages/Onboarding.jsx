import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, ArrowLeft, Check, Sparkles, User, MessageSquare, Youtube, AlertCircle, Loader2
} from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";

// Component hiển thị thông tin kênh sau khi kiểm tra thành công
function ChannelPreview({ data, platform }) {
  if (!data) return null;
  return (
    <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
      <img 
        src={data.avatar || "https://ui-avatars.com/api/?name=" + (data.name || "User")} 
        alt="Avatar" 
        className="h-10 w-10 rounded-full object-cover border border-emerald-200" 
      />
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-slate-900 truncate">{data.name || data.handle}</p>
        <p className="text-[11px] text-slate-500 truncate">{data.handle} • {data.followers?.toLocaleString() || 0} followers</p>
      </div>
      <div className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-white">
        <Check size={14} />
      </div>
    </div>
  );
}

function StepCard({ children, iconBg }) {
  return (
    <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white bg-white/90 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      <div className="pointer-events-none absolute -right-4 -top-4 text-[150px] text-cyan-500/5">
        {iconBg}
      </div>
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  // States cho Kênh (Step 4)
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [ytPreview, setYtPreview] = useState(null); // Lưu thông tin kênh YT sau khi check
  const [ttPreview, setTtPreview] = useState(null); // Lưu thông tin kênh TT sau khi check

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  // Hàm gọi API để kiểm tra (và lấy thông tin) kênh
  const verifyChannel = async (platform, url) => {
    if (!url) return null;
    setLoading(true);
    setErrorMsg("");
    try {
      // Gọi hàm link_channel. Theo tài liệu, hàm này tự lưu vào DB và trả về thông tin kênh
      const { data, error } = await supabase.functions.invoke("creator-verify", {
        body: { action: "link_channel", platform, url }
      });

      if (error) throw error;
      if (!data.ok) throw new Error(data.message || "Kênh không hợp lệ");

      // Trả về data để hiển thị Preview (giả sử API trả về data.channel hoặc data trực tiếp)
      return data.channel || data; 
    } catch (err) {
      setErrorMsg(`Lỗi kiểm tra kênh ${platform}: ${err.message}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  // Xử lý khi người dùng nhập xong link YouTube và bấm ra ngoài
  const handleYoutubeBlur = async () => {
    if (youtubeUrl && !ytPreview) {
      const res = await verifyChannel("youtube", youtubeUrl);
      if (res) setYtPreview(res);
    }
  };

  // Xử lý khi người dùng nhập xong link TikTok
  const handleTiktokBlur = async () => {
    if (tiktokUrl && !ttPreview) {
      const res = await verifyChannel("tiktok", tiktokUrl);
      if (res) setTtPreview(res);
    }
  };

  // Hàm hoàn tất
  const handleFinish = async () => {
    // Nếu có link nhưng chưa verify (chưa có preview), verify lần cuối
    if (youtubeUrl && !ytPreview) {
      const res = await verifyChannel("youtube", youtubeUrl);
      if (!res) return; // Lỗi thì dừng
    }
    if (tiktokUrl && !ttPreview) {
      const res = await verifyChannel("tiktok", tiktokUrl);
      if (!res) return;
    }

    // Mọi thứ OK, chuyển vào App
    navigate("/app", { replace: true });
  };

  // --- GIAO DIỆN CÁC BƯỚC ---

  const renderStep1 = () => (
    <StepCard iconBg={<Sparkles />}>
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-600/20 bg-cyan-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-700">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" /> Onboarding
      </div>
      
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
        Chào mừng đến<br/>với <span className="text-cyan-600">Nxx315 Creator</span>
      </h1>
      
      <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
        Đăng video TikTok/YouTube quảng bá Nxx315 → bot tự scrape → admin duyệt → bạn nhận thưởng (giờ dùng cloud phone + tiền cho top tháng).
      </p>

      <div className="mt-6 space-y-3">
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="text-[13px] font-bold text-cyan-600">01 . LIÊN KẾT KÊNH</h3>
          <p className="mt-1 text-[13px] text-slate-600">Liên kết YouTube/TikTok để bot scrape video bạn đăng.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="text-[13px] font-bold text-cyan-600">02 . NHẬN THƯỞNG</h3>
          <p className="mt-1 text-[13px] text-slate-600">Mỗi video duyệt = +X giờ cloud phone. Top tháng nhận tiền mặt.</p>
        </div>
        <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm">
          <h3 className="text-[13px] font-bold text-cyan-600">03 . LEO BẢNG XẾP HẠNG</h3>
          <p className="mt-1 text-[13px] text-slate-600">Bảng xếp hạng live theo lượt xem + lượt thích + bình luận.</p>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={nextStep} className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-[14px] font-bold text-white transition hover:bg-cyan-700 active:scale-95 shadow-md shadow-cyan-600/20">
          Bắt đầu <ArrowRight size={16} />
        </button>
        <button onClick={() => navigate("/app")} className="text-[14px] font-semibold text-slate-500 hover:text-slate-800">
          Bỏ qua
        </button>
      </div>
    </StepCard>
  );

  const renderStep2 = () => (
    <StepCard iconBg={<User />}>
      <p className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">Step 02 . Profile</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Hồ sơ của bạn</h2>
      
      <div className="mt-6 rounded-xl border border-cyan-100 bg-cyan-50/50 p-4">
        <p className="text-[13px] leading-relaxed text-cyan-800">
          Tài khoản của bạn đã được đồng bộ với <strong>Nxx315 Studio</strong>. Bạn không cần tạo lại hồ sơ ở đây.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={prevStep} className="flex items-center gap-2 text-[14px] font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft size={16} /> Quay lại
        </button>
        <button onClick={nextStep} className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-[14px] font-bold text-white transition hover:bg-cyan-700 active:scale-95 shadow-md shadow-cyan-600/20">
          Tiếp tục <ArrowRight size={16} />
        </button>
      </div>
    </StepCard>
  );

  const renderStep3 = () => (
    <StepCard iconBg={<MessageSquare />}>
      <p className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">Step 03 . Discord</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Liên kết Discord</h2>

      <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
        Chương trình creator chạy trên Discord: thông báo, hỗ trợ, thể lệ và các kèo riêng đều ở đó.
      </p>

      <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3 items-start">
        <AlertCircle size={18} className="text-amber-500 shrink-0 mt-0.5" />
        <p className="text-[13px] leading-relaxed text-amber-700">
          Tính năng liên kết Discord sẽ sớm được cập nhật. Bạn có thể bỏ qua bước này và liên kết sau trong phần Cài đặt.
        </p>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <button onClick={prevStep} className="flex items-center gap-2 text-[14px] font-semibold text-slate-500 hover:text-slate-900">
          <ArrowLeft size={16} /> Quay lại
        </button>
        <button onClick={nextStep} className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-[14px] font-bold text-white transition hover:bg-cyan-700 active:scale-95 shadow-md shadow-cyan-600/20">
          Tiếp tục <ArrowRight size={16} />
        </button>
      </div>
    </StepCard>
  );

  const renderStep4 = () => (
    <StepCard iconBg={<Youtube />}>
      <p className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">Step 04 . Channel</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Liên kết kênh của bạn</h2>
      <p className="mt-2 text-[13px] text-slate-600">Bot quét cả hai kênh mỗi ngày, video mới có hashtag yêu cầu sẽ tự được ghi nhận.</p>

      <div className="mt-6 space-y-4">
        {/* YouTube Input */}
        <div>
          <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
            <Youtube size={16} className="text-red-500" /> YouTube
          </label>
          <input 
            type="text" 
            value={youtubeUrl}
            onChange={(e) => {
              setYoutubeUrl(e.target.value);
              if (ytPreview) setYtPreview(null); // Reset preview nếu đổi link
            }}
            onBlur={handleYoutubeBlur} // Kích hoạt check khi bấm ra ngoài
            placeholder="https://youtube.com/@ten"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
          <ChannelPreview data={ytPreview} platform="youtube" />
        </div>
        
        {/* TikTok Input */}
        <div>
          <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2 mt-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg> TikTok
          </label>
          <input 
            type="text" 
            value={tiktokUrl}
            onChange={(e) => {
              setTiktokUrl(e.target.value);
              if (ttPreview) setTtPreview(null);
            }}
            onBlur={handleTiktokBlur}
            placeholder="https://tiktok.com/@handle"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
          <ChannelPreview data={ttPreview} platform="tiktok" />
        </div>
      </div>

      <p className="mt-4 text-[11px] font-medium text-slate-500">
        ▸ LIÊN KẾT YOUTUBE VÀ/HOẶC TIKTOK. BẠN CÓ THỂ THÊM/ĐỔI KÊNH SAU TRONG SETTINGS.
      </p>

      {errorMsg && <p className="mt-3 text-xs font-semibold text-rose-500">{errorMsg}</p>}

      {/* FIX LỖI NÚT BỊ TẬT */}
      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button 
            onClick={prevStep} 
            disabled={loading} 
            className="flex items-center justify-center h-12 px-4 rounded-full border border-slate-200 text-[14px] font-semibold text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 shrink-0"
          >
            <ArrowLeft size={16} />
          </button>
          
          <button 
            onClick={handleFinish} 
            disabled={loading} 
            className="flex-1 flex items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 h-12 text-[14px] font-bold text-white transition hover:bg-cyan-700 active:scale-95 shadow-md shadow-cyan-600/20 disabled:opacity-70"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Đang xử lý...</>
            ) : (
              <>Hoàn tất <Check size={16} /></>
            )}
          </button>
        </div>
        
        <button 
          onClick={() => navigate("/app")} 
          disabled={loading} 
          className="w-full text-center text-[13px] font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-50"
        >
          Bỏ qua & hoàn tất
        </button>
      </div>
    </StepCard>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] text-slate-800 font-sans flex flex-col items-center pt-8 px-4 pb-12">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex flex-wrap gap-2">
          {[1, 2, 3, 4].map((num) => {
            const isActive = step === num;
            const isPast = step > num;
            return (
              <div 
                key={num} 
                className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors
                  ${isActive ? 'border-cyan-600 bg-cyan-50 text-cyan-700' : 
                    isPast ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 
                    'border-slate-200 bg-white text-slate-400'}`}
              >
                {isPast ? <Check size={14} /> : <span>{num}.</span>}
                {num === 1 && "BẮT ĐẦU"}
                {num === 2 && "HỒ SƠ"}
                {num === 3 && "DISCORD"}
                {num === 4 && "KÊNH"}
              </div>
            );
          })}
        </div>

        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
            }
