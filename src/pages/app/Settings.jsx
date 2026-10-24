import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { LogOut } from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, Eyebrow, ChannelLinkCard, GuideVideo } from "../../components/creator/creatorUi.jsx";

export default function Settings() {
  const { ov, reload } = useOutletContext();
  const { session } = useSession();
  const navigate = useNavigate();
  const by = Object.fromEntries((ov?.channels || []).map((c) => [c.platform, c]));

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <>
      <div className="px-1">
        <Eyebrow>▸ Settings</Eyebrow>
        <h1 className="mt-1 text-3xl font-extrabold text-white">Cài đặt</h1>
        <p className="mt-1 text-sm text-slate-400">Liên kết kênh và thông tin tài khoản.</p>
      </div>

      <GuideVideo url={ov?.settings?.link_guide_video} />

      <Eyebrow className="px-1">▸ Kênh liên kết</Eyebrow>
      <ChannelLinkCard platform="youtube" channel={by.youtube} onChanged={reload} />
      <ChannelLinkCard platform="tiktok" channel={by.tiktok} onChanged={reload} />

      <Card>
        <Eyebrow>▸ Tài khoản</Eyebrow>
        <div className="mt-4">
          <Eyebrow>Email hiện tại</Eyebrow>
          <p className="mt-1 break-all font-mono text-sm text-white">{session?.user?.email}</p>
        </div>
        <div className="mt-4">
          <Eyebrow>Điểm mỗi video được duyệt</Eyebrow>
          <p className="mt-1 font-mono text-sm text-white">100 điểm</p>
        </div>
        <button
          onClick={signOut}
          className="mt-5 flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-slate-300"
        >
          <LogOut size={15} /> Đăng xuất
        </button>
      </Card>
    </>
  );
      }
