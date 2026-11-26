import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, Loader2 } from "lucide-react";
import { supabase } from "../lib/supabaseClient.js";
import { Logo } from "../components/landing/theme.jsx";

const TOTAL_STEPS = 2;

// Hiển thị thông tin kênh sau khi xác minh
function ChannelPreview({ data }) {
  if (!data) return null;

  const name = data.display_name || data.name || data.channel_name || data.handle || "Kênh đã liên kết";
  const handle = data.handle || data.channel_url || "";
  const followers = data.followers || data.subscriber_count || 0;
  const avatar = data.avatar_url || data.avatar || data.thumbnail || "";
  const initial = name.charAt(0).toUpperCase();

  return (
    <div className="mt-3 flex items-center gap-3 rounded border border-rule bg-white p-3">
      {avatar ? (
        <img src={avatar} alt="" referrerPolicy="no-referrer" className="h-10 w-10 shrink-0 rounded-full border border-rule object-cover" />
      ) : (
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-stone text-[14px]">{initial}</div>
      )}
      <div className="min-w-0 flex-1">
        <p className="truncate text-[14px]" style={{ fontWeight: 450 }}>{name}</p>
        {handle && (
          <p className="t-cap truncate text-mute">
            {handle} · {followers.toLocaleString("vi-VN")} người theo dõi
          </p>
        )}
      </div>
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ink text-canvas" aria-label="Đã xác minh">
        <Check size={13} />
      </span>
    </div>
  );
}

const FIELD =
  "mt-1.5 h-12 w-full rounded border border-rule bg-white px-3 text-[15px] text-ink outline-none transition-colors placeholder:text-[#9a9a98] focus:border-ink";

export default function Onboarding() {
  const navigate = useNavigate();

  // Người dùng cũ có thể đang lưu bước 3-4 từ luồng cũ: gom về bước 2
  const savedStep = parseInt(localStorage.getItem("onboarding_step") || "1", 10);
  const [step, setStep] = useState(Math.min(TOTAL_STEPS, Math.max(1, Number.isNaN(savedStep) ? 1 : savedStep)));

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [ytPreview, setYtPreview] = useState(null);
  const [ttPreview, setTtPreview] = useState(null);

  const changeStep = (n) => {
    setStep(n);
    localStorage.setItem("onboarding_step", n);
  };

  // Xác minh kênh, rồi lấy lại thông tin chuẩn (avatar, tên) từ database
  const verifyChannel = async (platform, url) => {
    if (!url) return null;
    setLoading(true);
    setErrorMsg("");
    try {
      const { data: resData, error: resError } = await supabase.functions.invoke("creator-verify", {
        body: { action: "link_channel", platform, url },
      });
      if (resError) throw resError;
      if (resData && resData.ok === false) throw new Error(resData.message || "Kênh không hợp lệ.");

      const { data: ovData, error: ovError } = await supabase.rpc("get_creator_overview");
      if (ovError) throw ovError;

      const linkedChannel = ovData.channels?.find((c) => c.platform === platform);
      if (linkedChannel) return linkedChannel;
      return resData.channel || resData;
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

  const markDone = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (user) localStorage.setItem(`onboarded_${user.id}`, "true");
    localStorage.removeItem("onboarding_step");
    navigate("/app", { replace: true });
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
    await markDone();
  };

  return (
    <div className="flex min-h-screen flex-col bg-canvas px-5 text-ink md:px-10">
      <header className="flex h-14 items-center justify-between">
        <Link to="/" aria-label="Nxx315 Creator"><Logo /></Link>
        <p className="t-cap text-mute" aria-live="polite">Bước {step} / {TOTAL_STEPS}</p>
      </header>

      <main className="mx-auto w-full max-w-[420px] flex-1 py-10 md:py-16">
        <div className="mb-8 flex gap-1.5" aria-hidden="true">
          {[1, 2].map((n) => (
            <span key={n} className={`h-[3px] flex-1 rounded-full ${n <= step ? "bg-ink" : "bg-rule"}`} />
          ))}
        </div>

        {step === 1 && (
          <section>
            <h1 className="t-head">Chào mừng đến với Nxx315 Creator</h1>
            <p className="mt-3 text-[15px] leading-[1.6] text-mute">
              Đăng video TikTok hoặc YouTube về Nxx315. Hệ thống tự ghi nhận, admin duyệt, bạn nhận thưởng.
            </p>

            <ul className="mt-8">
              <li className="rule-t py-4">
                <p className="text-[15px]" style={{ fontWeight: 450 }}>Liên kết kênh</p>
                <p className="mt-1 text-[14px] leading-[1.55] text-mute">Hệ thống quét video bạn đăng và ghi nhận video có hashtag yêu cầu.</p>
              </li>
              <li className="rule-t rule-b py-4">
                <p className="text-[15px]" style={{ fontWeight: 450 }}>Nhận thưởng</p>
                <p className="mt-1 text-[14px] leading-[1.55] text-mute">Mỗi video được duyệt nhận code xu. Top tháng nhận tiền mặt.</p>
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row">
              <button onClick={() => changeStep(2)} className="btn btn-primary">Bắt đầu</button>
              <button onClick={markDone} className="btn btn-quiet">Để sau</button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section>
            <h1 className="t-head">Liên kết kênh của bạn</h1>
            <p className="mt-3 text-[15px] leading-[1.6] text-mute">
              Chỉ cần một kênh là đủ. Hệ thống quét kênh mỗi ngày, video mới có hashtag yêu cầu sẽ tự được ghi nhận.
            </p>

            <div className="mt-8 space-y-6">
              <div>
                <label htmlFor="yt" className="text-[14px]" style={{ fontWeight: 450 }}>YouTube</label>
                <input
                  id="yt"
                  type="url"
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={youtubeUrl}
                  onChange={(e) => {
                    setYoutubeUrl(e.target.value);
                    if (ytPreview) setYtPreview(null);
                  }}
                  onBlur={handleYoutubeBlur}
                  placeholder="https://youtube.com/@ten-kenh"
                  className={FIELD}
                />
                <ChannelPreview data={ytPreview} />
              </div>

              <div>
                <label htmlFor="tt" className="text-[14px]" style={{ fontWeight: 450 }}>TikTok</label>
                <input
                  id="tt"
                  type="url"
                  inputMode="url"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={tiktokUrl}
                  onChange={(e) => {
                    setTiktokUrl(e.target.value);
                    if (ttPreview) setTtPreview(null);
                  }}
                  onBlur={handleTiktokBlur}
                  placeholder="https://tiktok.com/@ten-nguoi-dung"
                  className={FIELD}
                />
                <ChannelPreview data={ttPreview} />
              </div>
            </div>

            <p className="mt-4 min-h-[20px] text-[13px] text-rose-600" aria-live="polite">{errorMsg}</p>

            <div className="mt-4 flex items-center gap-2">
              <button
                onClick={() => changeStep(1)}
                disabled={loading}
                aria-label="Quay lại"
                className="btn btn-quiet w-11 shrink-0 px-0"
              >
                <ArrowLeft size={16} />
              </button>
              <button onClick={handleFinish} disabled={loading} className="btn btn-primary flex-1">
                {loading ? <><Loader2 size={15} className="animate-spin" /> Đang xử lý</> : "Hoàn tất"}
              </button>
            </div>
            <button
              onClick={markDone}
              disabled={loading}
              className="mt-3 min-h-[44px] w-full text-center text-[14px] text-mute underline decoration-rule underline-offset-4 hover:text-ink disabled:opacity-50"
            >
              Để sau, vào trang chính
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
