import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, ArrowLeft, Check, Sparkles, User, MessageSquare, Youtube, ShieldCheck
} from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";

// Component bọc ngoài để tạo khung thẻ (Card) cho từng bước
function StepCard({ children, iconBg }) {
  return (
    <div className="relative z-10 overflow-hidden rounded-[2rem] border border-white bg-white/90 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)] backdrop-blur-xl">
      {/* Background Icon mờ lớn (giống ảnh mẫu) */}
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
  const [error, setError] = useState("");

  // States lưu trữ dữ liệu người dùng nhập
  const [profile, setProfile] = useState({ username: "", displayName: "", country: "VN" });
  const [channels, setChannels] = useState({ youtube: "", tiktok: "" });

  const nextStep = () => setStep((s) => Math.min(s + 1, 4));
  const prevStep = () => setStep((s) => Math.max(s - 1, 1));

  const handleFinish = async () => {
    setLoading(true);
    setError("");
    try {
      // TODO: Lưu dữ liệu vào Supabase (Bảng profiles hoặc creators)
      // const { error } = await supabase.from('profiles').upsert({...})
      
      // Giả lập lưu thành công thì chuyển vào trang chính /app
      setTimeout(() => {
        navigate("/app", { replace: true });
      }, 1000);
    } catch (err) {
      setError("Có lỗi xảy ra, vui lòng thử lại.");
      setLoading(false);
    }
  };

  // --- RENDER CÁC BƯỚC ---

  const renderStep1 = () => (
    <StepCard iconBg={<Sparkles />}>
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-600/20 bg-cyan-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-700">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" /> Onboarding
      </div>
      
      <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
        Chào mừng đến<br/>với <span className="text-cyan-600">XCloudPhone Creator</span>
      </h1>
      
      <p className="mt-4 text-[14px] leading-relaxed text-slate-600">
        Đăng video TikTok/YouTube quảng bá XCloudPhone → bot tự scrape → admin duyệt → bạn nhận thưởng (giờ dùng cloud phone + tiền cho top tháng).
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
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Kể chúng tôi nghe về bạn</h2>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-[13px] font-semibold text-slate-700">Tên người dùng</label>
          <input 
            type="text" 
            value={profile.username}
            onChange={(e) => setProfile({...profile, username: e.target.value})}
            placeholder="xx315_n"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
          />
          {profile.username && (
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-medium text-emerald-600">
              <Check size={12} /> @{profile.username.toUpperCase()} — KHẢ DỤNG
            </p>
          )}
        </div>
        
        <div>
          <label className="text-[13px] font-semibold text-slate-700">Tên hiển thị</label>
          <input 
            type="text" 
            value={profile.displayName}
            onChange={(e) => setProfile({...profile, displayName: e.target.value})}
            placeholder="Xx315 N"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
          />
        </div>

        <div>
          <label className="text-[13px] font-semibold text-slate-700">Quốc gia</label>
          <select 
            value={profile.country}
            onChange={(e) => setProfile({...profile, country: e.target.value})}
            className="mt-1.5 w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white focus:ring-2 focus:ring-cyan-500/20"
          >
            <option value="VN">🇻🇳 VN — Vietnam</option>
            <option value="US">🇺🇸 US — United States</option>
            <option value="JP">🇯🇵 JP — Japan</option>
          </select>
        </div>
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
        Chương trình creator chạy trên Discord: thông báo, hỗ trợ, thể lệ và các kèo riêng đều ở đó. Bạn cần liên kết tài khoản và tham gia server cộng đồng mới tiếp tục được.
      </p>

      <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#5865F2] bg-[#5865F2]/10 px-5 py-3 text-[14px] font-bold text-[#5865F2] transition hover:bg-[#5865F2] hover:text-white">
        <MessageSquare size={18} /> Liên kết Discord
      </button>

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
        <div>
          <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
            <Youtube size={16} className="text-red-500" /> YouTube
          </label>
          <input 
            type="text" 
            value={channels.youtube}
            onChange={(e) => setChannels({...channels, youtube: e.target.value})}
            placeholder="https://youtube.com/@kenh-cua-ban"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
        </div>
        
        <div>
          <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg> TikTok
          </label>
          <input 
            type="text" 
            value={channels.tiktok}
            onChange={(e) => setChannels({...channels, tiktok: e.target.value})}
            placeholder="https://tiktok.com/@handle-cua-ban"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
        </div>
      </div>

      <p className="mt-4 text-[11px] font-medium text-slate-500">
        ▸ LIÊN KẾT YOUTUBE VÀ/HOẶC TIKTOK. BẠN CÓ THỂ THÊM/ĐỔI KÊNH SAU TRONG SETTINGS.
      </p>

      <div className="mt-8 flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <button onClick={prevStep} className="flex items-center gap-2 text-[14px] font-semibold text-slate-500 hover:text-slate-900">
            <ArrowLeft size={16} /> Quay lại
          </button>
          <button onClick={handleFinish} disabled={loading} className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-[14px] font-bold text-white transition hover:bg-cyan-700 active:scale-95 shadow-md shadow-cyan-600/20 disabled:opacity-70">
            {loading ? "Đang lưu..." : "Liên kết & hoàn tất"} <Check size={16} />
          </button>
        </div>
        <button onClick={handleFinish} className="w-full text-center text-[13px] font-semibold text-slate-500 hover:text-slate-800 mt-2">
          Bỏ qua & hoàn tất
        </button>
      </div>
      
      {error && <p className="mt-3 text-center text-xs font-semibold text-rose-500">{error}</p>}
    </StepCard>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] text-slate-800 font-sans flex flex-col items-center pt-8 px-4 pb-12">
      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />

      <div className="w-full max-w-md relative z-10">
        {/* Thanh Progress (Các bước) - Giống ảnh mẫu */}
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
                {num === 1 && "CHÀO MỪNG"}
                {num === 2 && "HỒ SƠ"}
                {num === 3 && "DISCORD"}
                {num === 4 && "KÊNH"}
              </div>
            );
          })}
        </div>

        {/* Nội dung thay đổi theo Step */}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
        
      </div>
    </div>
  );
}
