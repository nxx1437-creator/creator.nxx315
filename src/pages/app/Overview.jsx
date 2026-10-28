import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  ArrowRight, ArrowLeft, Check, Sparkles, User, MessageSquare, Youtube, Loader2
} from "lucide-react";
import { supabase } from "../../lib/supabaseClient.js";

// Component hiển thị thông tin kênh
function ChannelPreview({ data }) {
  if (!data) return null;
  
  const name = data.display_name || data.name || data.channel_name || data.handle || "Kênh đã liên kết";
  const handle = data.handle || data.channel_url || "";
  const followers = data.followers || data.subscriber_count || 0;
  const avatar = data.avatar_url || data.avatar || data.thumbnail || "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-200 bg-emerald-50 p-3">
      {avatar ? (
        <img src={avatar} alt="Avatar" className="h-10 w-10 rounded-full object-cover border border-emerald-200" />
      ) : (
        <div className="h-10 w-10 rounded-full bg-emerald-200 flex items-center justify-center text-emerald-700 font-bold">
          {initial}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[13px] font-bold text-slate-900 truncate">{name}</p>
        {handle && (
          <p className="text-[11px] text-slate-500 truncate">
            {handle} • {followers.toLocaleString()} followers
          </p>
        )}
      </div>
      <div className="shrink-0 flex items-center justify-center h-6 w-6 rounded-full bg-emerald-500 text-white">
        <Check size={14} />
      </div>
    </div>
  );
}

/* ---------- CÁC HÌNH TRANG TRÍ 4 GÓC ---------- */
function OrnTarget() {
  return (
    <svg width="90" height="90" viewBox="0 0 100 100" fill="none" className="opacity-40 text-cyan-500">
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 8" />
      <circle cx="50" cy="50" r="20" stroke="currentColor" strokeWidth="2" />
      <path d="M50 0v20M50 80v20M0 50h20M80 50h20" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="50" cy="50" r="4" fill="currentColor" />
    </svg>
  );
}

function OrnStar() {
  return (
    <svg width="110" height="110" viewBox="0 0 120 120" fill="none" className="opacity-70">
      <defs>
        <linearGradient id="starGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a5f3fc" />
          <stop offset="100%" stopColor="#60a5fa" />
        </linearGradient>
      </defs>
      <path d="M60 10 L75 45 L110 60 L75 75 L60 110 L45 75 L10 60 L45 45 Z" fill="url(#starGrad)" fillOpacity="0.8" />
      <path d="M60 30 L68 52 L90 60 L68 68 L60 90 L52 68 L30 60 L52 52 Z" fill="#ffffff" fillOpacity="0.9" />
    </svg>
  );
}

function OrnGem() {
  return (
    <svg width="90" height="100" viewBox="0 0 84 96" fill="none" className="opacity-60 -rotate-12">
      <path d="M42 6l32 26-32 58L10 32z" fill="#22D3EE" fillOpacity=".4" stroke="#06B6D4" strokeWidth="2.5" />
      <path d="M10 32h64M42 6l-14 26 14 58 14-58z" stroke="#ffffff" strokeOpacity=".8" strokeWidth="1.5" />
    </svg>
  );
}

function OrnHex() {
  return (
    <svg width="90" height="100" viewBox="0 0 100 100" fill="none" className="opacity-60 rotate-12">
      <path d="M50 5l40 25v40L50 95 10 70V30z" fill="#60A5FA" fillOpacity=".2" stroke="#3B82F6" strokeWidth="3" />
      <path d="M50 25l20 12.5v25L50 75 30 62.5v-25z" fill="#BFDBFE" fillOpacity=".6" stroke="#60A5FA" strokeWidth="2" />
    </svg>
  );
}

function StepCard({ children, bgIcon }) {
  return (
    <div className="relative z-10 rounded-[2rem] border border-white bg-white/95 p-6 shadow-[0_8px_30px_rgba(0,0,0,0.08)] backdrop-blur-xl overflow-hidden">
      <div className="pointer-events-none absolute -right-6 top-0 text-[160px] text-cyan-500/[0.04] rotate-12 z-0">
        {bgIcon}
      </div>
      <div className="relative z-20">
        {children}
      </div>
    </div>
  );
}

export default function Onboarding() {
  const navigate = useNavigate();
  
  const savedStep = localStorage.getItem("onboarding_step");
  const [step, setStep] = useState(savedStep ? parseInt(savedStep) : 1);
  
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [ytPreview, setYtPreview] = useState(null); 
  const [ttPreview, setTtPreview] = useState(null); 
  
  const [discordData, setDiscordData] = useState(null);
  const [userProfile, setUserProfile] = useState(null);

  const changeStep = (newStep) => {
    setStep(newStep);
    localStorage.setItem("onboarding_step", newStep);
  };

  const nextStep = () => changeStep(Math.min(step + 1, 4));
  const prevStep = () => changeStep(Math.max(step - 1, 1));

  useEffect(() => {
    const checkUserData = async () => {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const { data: { user } } = await supabase.auth.getUser();
      
      if (user) {
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();
        
        if (profile) setUserProfile(profile);
        else setUserProfile(user.user_metadata);

        const discordIdentity = user?.identities?.find(id => id.provider === 'discord');
        if (discordIdentity) {
          setDiscordData(discordIdentity.identity_data);
          if (step < 4) {
            changeStep(4);
          }
        }
      }
      setIsCheckingAuth(false);
    };
    
    checkUserData();
  }, []);

  const handleLinkDiscord = async () => {
    setLoading(true);
    setErrorMsg("");
    try {
      const { error } = await supabase.auth.linkIdentity({
        provider: 'discord',
        options: { 
          redirectTo: `${window.location.origin}/onboarding` 
        },
      });
      if (error) throw error;
    } catch (err) {
      setErrorMsg("Không thể kết nối Discord: " + err.message);
      setLoading(false);
    }
  };

  const verifyChannel = async (platform, url) => {
    if (!url) return null;
    setLoading(true);
    setErrorMsg("");
    try {
      const { data, error } = await supabase.functions.invoke("creator-verify", {
        body: { action: "link_channel", platform, url }
      });
      
      if (error) throw error;
      if (data && data.ok === false) throw new Error(data.message || "Kênh không hợp lệ.");
      
      return data.channel || data; 
    } catch (err) {
      setErrorMsg(`Lỗi kênh ${platform}: ${err.message || "Không thể xác minh"}`);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const handleYoutubeBlur = async () => {
    if (youtubeUrl && !ytPreview) {
      const res = await verifyChannel("youtube", youtubeUrl);
      if (res) setYtPreview(res);
    }
  };

  const handleTiktokBlur = async () => {
    if (tiktokUrl && !ttPreview) {
      const res = await verifyChannel("tiktok", tiktokUrl);
      if (res) setTtPreview(res);
    }
  };

  const handleFinish = async () => {
    setErrorMsg("");
    if (youtubeUrl && !ytPreview) {
      const res = await verifyChannel("youtube", youtubeUrl);
      if (!res) return; 
    }
    if (tiktokUrl && !ttPreview) {
      const res = await verifyChannel("tiktok", tiktokUrl);
      if (!res) return; 
    }
    localStorage.removeItem("onboarding_step");
    navigate("/app", { replace: true });
  };

  const skipAndFinish = () => {
    localStorage.removeItem("onboarding_step");
    navigate("/app", { replace: true });
  };

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa]">
        <Loader2 size={32} className="animate-spin text-cyan-600" />
      </div>
    );
        }
    const renderStep1 = () => (
    <StepCard bgIcon={<Sparkles />}>
      <div className="inline-flex items-center gap-2 rounded-full border border-cyan-600/20 bg-cyan-50 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-cyan-700">
        <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" /> ONBOARDING
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
      </div>
      <div className="mt-8 flex items-center justify-between">
        <button onClick={nextStep} className="flex items-center gap-2 rounded-full bg-cyan-600 px-6 py-3 text-[14px] font-bold text-white transition hover:bg-cyan-700 active:scale-95 shadow-md shadow-cyan-600/20">
          Bắt đầu <ArrowRight size={16} />
        </button>
        <button onClick={skipAndFinish} className="text-[14px] font-semibold text-slate-500 hover:text-slate-800">
          Bỏ qua
        </button>
      </div>
    </StepCard>
  );

  const renderStep2 = () => (
    <StepCard bgIcon={<User />}>
      <p className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">STEP 02 . PROFILE</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Hồ sơ của bạn</h2>
      
      <div className="mt-6 flex items-center gap-4 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        {userProfile?.avatar_url || userProfile?.picture ? (
          <img src={userProfile.avatar_url || userProfile.picture} alt="Avatar" className="h-14 w-14 rounded-full object-cover border border-slate-200" />
        ) : (
          <div className="h-14 w-14 rounded-full bg-cyan-100 text-cyan-700 flex items-center justify-center font-bold text-xl">
            {userProfile?.username?.charAt(0) || userProfile?.full_name?.charAt(0) || "U"}
          </div>
        )}
        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-bold text-slate-900 truncate">
            {userProfile?.username || userProfile?.full_name || "Người dùng Nxx315"}
          </p>
          <p className="text-[13px] text-slate-500 truncate">
            {userProfile?.email || "Chưa cập nhật email"}
          </p>
          <p className="mt-1 text-[10px] font-semibold text-emerald-600 bg-emerald-50 inline-block px-2 py-0.5 rounded-md">
            Đã đồng bộ với Web chính
          </p>
        </div>
      </div>
      
      <p className="mt-4 text-[13px] text-slate-500 italic">
        Bạn có thể thay đổi ảnh đại diện và tên hiển thị trong phần Cài đặt của web chính.
      </p>

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
    <StepCard bgIcon={<MessageSquare />}>
      <p className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">STEP 03 . DISCORD</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Liên kết Discord</h2>
      
      {!discordData ? (
        <p className="mt-3 text-[14px] leading-relaxed text-slate-600">
          Chương trình creator chạy trên Discord: thông báo, hỗ trợ, thể lệ và các kèo riêng đều ở đó. Bạn cần liên kết tài khoản và tham gia server cộng đồng mới tiếp tục được.
        </p>
      ) : (
        <p className="mt-3 text-[14px] leading-relaxed text-emerald-600 font-medium">
          Tuyệt vời! Tài khoản Discord của bạn đã được liên kết thành công.
        </p>
      )}

      {discordData ? (
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-indigo-200 bg-indigo-50 p-4">
          {discordData.avatar_url ? (
            <img src={discordData.avatar_url} alt="Discord" className="h-12 w-12 rounded-full object-cover border-2 border-indigo-200" />
          ) : (
            <div className="h-12 w-12 rounded-full bg-indigo-500 text-white flex items-center justify-center font-bold text-lg">
              {discordData.full_name?.charAt(0) || discordData.name?.charAt(0) || "D"}
            </div>
          )}
          <div className="flex-1">
            <p className="text-[14px] font-bold text-indigo-900">{discordData.full_name || discordData.name || "Discord User"}</p>
            <p className="text-[12px] text-indigo-600">@{discordData.preferred_username || discordData.user_name || "unknown"}</p>
          </div>
          <div className="h-6 w-6 rounded-full bg-emerald-500 text-white flex items-center justify-center">
            <Check size={14} />
          </div>
        </div>
      ) : (
        <button 
          onClick={handleLinkDiscord}
          disabled={loading}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-full border border-[#5865F2] bg-[#5865F2]/10 px-5 py-3 text-[14px] font-bold text-[#5865F2] transition hover:bg-[#5865F2] hover:text-white disabled:opacity-70"
        >
          {loading ? <><Loader2 size={18} className="animate-spin" /> Đang kết nối...</> : <><MessageSquare size={18} /> Liên kết Discord</>}
        </button>
      )}
      
      {errorMsg && <p className="mt-3 text-center text-xs font-semibold text-rose-500">{errorMsg}</p>}
      
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
    <StepCard bgIcon={<Youtube />}>
      <p className="font-mono text-[10px] font-bold tracking-widest text-slate-400 uppercase">STEP 04 . CHANNEL</p>
      <h2 className="mt-2 text-2xl font-extrabold text-slate-900">Liên kết kênh của bạn</h2>
      <p className="mt-2 text-[13px] text-slate-600">Bot quét cả hai kênh mỗi ngày, video mới có hashtag yêu cầu sẽ tự được ghi nhận.</p>

      <div className="mt-6 space-y-4">
        <div>
          <label className="text-[13px] font-semibold text-slate-700 flex items-center gap-2">
            <Youtube size={16} className="text-red-500" /> YouTube
          </label>
          <input 
            type="text" 
            value={youtubeUrl}
            onChange={(e) => {
              setYoutubeUrl(e.target.value);
              if (ytPreview) setYtPreview(null); 
            }}
            onBlur={handleYoutubeBlur} 
            placeholder="https://youtube.com/@ten"
            className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-[14px] text-slate-900 outline-none transition focus:border-cyan-500 focus:bg-white"
          />
          <ChannelPreview data={ytPreview} />
        </div>
        
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
          <ChannelPreview data={ttPreview} />
        </div>
      </div>

      {errorMsg && <p className="mt-3 text-xs font-semibold text-rose-500">{errorMsg}</p>}

      <div className="mt-8 flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <button onClick={prevStep} disabled={loading} className="flex items-center justify-center h-12 w-12 rounded-full border border-slate-200 text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 shrink-0">
            <ArrowLeft size={16} />
          </button>
          <button onClick={handleFinish} disabled={loading} className="flex-1 flex items-center justify-center gap-2 rounded-full bg-cyan-600 px-4 h-12 text-[14px] font-bold text-white transition hover:bg-cyan-700 active:scale-95 shadow-md shadow-cyan-600/20 disabled:opacity-70">
            {loading ? <><Loader2 size={16} className="animate-spin" /> Đang xử lý...</> : <>Hoàn tất <Check size={16} /></>}
          </button>
        </div>
        <button onClick={skipAndFinish} disabled={loading} className="w-full text-center text-[13px] font-semibold text-slate-500 hover:text-slate-800 disabled:opacity-50">
          Bỏ qua & hoàn tất
        </button>
      </div>
    </StepCard>
  );

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-gradient-to-b from-[#f4fbf9] to-[#e6f7fa] text-slate-800 font-sans flex flex-col items-center pt-8 px-4 pb-12">
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,0.8) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.8) 1px, transparent 1px)", backgroundSize: "30px 30px" }} />

      <div className="w-full max-w-md relative z-10">
        <div className="mb-6 flex flex-wrap gap-2 relative z-20">
          {[1, 2, 3, 4].map((num) => {
            const isPast = step > num || (num === 3 && discordData);
            const isActive = step === num && !isPast;
            
            return (
              <div key={num} className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-semibold transition-colors ${isActive ? 'border-cyan-600 bg-cyan-50 text-cyan-700' : isPast ? 'border-emerald-200 bg-emerald-50 text-emerald-600' : 'border-slate-200 bg-white text-slate-400'}`}>
                {isPast ? <Check size={14} /> : <span>{num}.</span>}
                {num === 1 && "BẮT ĐẦU"}
                {num === 2 && "HỒ SƠ"}
                {num === 3 && "DISCORD"}
                {num === 4 && "KÊNH"}
              </div>
            );
          })}
        </div>

        <div className="relative mt-2">
          <div className="absolute -top-10 -left-8 z-0 pointer-events-none"><OrnTarget /></div>
          <div className="absolute -top-12 -right-8 z-0 pointer-events-none"><OrnStar /></div>
          <div className="absolute -bottom-8 -left-8 z-0 pointer-events-none"><OrnGem /></div>
          <div className="absolute -bottom-10 -right-8 z-0 pointer-events-none"><OrnHex /></div>

          <div className="relative z-10">
            {step === 1 && renderStep1()}
            {step === 2 && renderStep2()}
            {step === 3 && renderStep3()}
            {step === 4 && renderStep4()}
          </div>
        </div>
      </div>
    </div>
  );
      }
