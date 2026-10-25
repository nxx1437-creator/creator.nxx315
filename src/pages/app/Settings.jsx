import React from "react";
import { useOutletContext, useNavigate } from "react-router-dom";
import { LogOut, Bell, Sparkles, BookOpen, HelpCircle, Settings as SettingsIcon, X } from "lucide-react";
import useSession from "../../hooks/useSession.js";
import { supabase } from "../../lib/supabaseClient.js";
import { Card, Eyebrow, ChannelLinkCard, GuideVideo } from "../../components/creator/creatorUi.jsx";

// Component menu giả lập theo ảnh 14
const MenuSidebar = ({ onClose }) => (
  <div className="fixed inset-0 z-50 flex">
    <div className="w-[280px] bg-[#f4fbf9] h-full shadow-2xl p-4 flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="text-xl font-extrabold text-slate-900 flex items-center gap-2">
            <span className="text-emerald-500 text-2xl">☁</span> CloudPhone
          </div>
          <button onClick={onClose}><X size={20} className="text-slate-400" /></button>
        </div>
        
        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2 px-3">Sân chơi</p>
        <div className="space-y-1">
          {[ {i: <LayoutDashboard size={18}/>, t: "Tổng quan"}, {i: <Trophy size={18}/>, t: "Xếp hạng"}, {i: <Film size={18}/>, t: "Video"} ].map((item, idx) => (
             <div key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-200/50 cursor-pointer">
               {item.i} {item.t}
             </div>
          ))}
        </div>

        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2 mt-6 px-3">Phần thưởng</p>
        <div className="space-y-1">
          {[ {i: <Gift size={18}/>, t: "Phần thưởng", active: true}, {i: <Coins size={18}/>, t: "Nhận tiền"} ].map((item, idx) => (
             <div key={idx} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-semibold text-sm cursor-pointer ${item.active ? 'bg-emerald-100 text-emerald-700' : 'text-slate-600 hover:bg-slate-200/50'}`}>
               {item.i} {item.t}
             </div>
          ))}
        </div>

        <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase mb-2 mt-6 px-3">Tài khoản</p>
        <div className="space-y-1">
          {[ {i: <Bell size={18}/>, t: "Thông báo"}, {i: <Sparkles size={18}/>, t: "Coach X"}, {i: <BookOpen size={18}/>, t: "Thể lệ"}, {i: <HelpCircle size={18}/>, t: "Trợ giúp"}, {i: <SettingsIcon size={18}/>, t: "Cài đặt"} ].map((item, idx) => (
             <div key={idx} className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-600 font-semibold text-sm hover:bg-slate-200/50 cursor-pointer">
               {item.i} {item.t}
             </div>
          ))}
        </div>
      </div>
      <div>
         <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300 bg-emerald-50 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-emerald-600">
           <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> SYSTEM ONLINE
         </span>
      </div>
    </div>
    <div className="flex-1 bg-black/40 backdrop-blur-sm" onClick={onClose}></div>
  </div>
);

export default function Settings() {
  const { ov, reload } = useOutletContext();
  const { session } = useSession();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = React.useState(false);
  
  const by = Object.fromEntries((ov?.channels || []).map((c) => [c.platform, c]));

  const signOut = async () => {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  };

  return (
    <>
      {showMenu && <MenuSidebar onClose={() => setShowMenu(false)} />}

      <div className="space-y-4">
        <div className="px-1 flex justify-between items-center">
          <div>
            <Eyebrow>▸ Settings</Eyebrow>
            <h1 className="mt-1 text-3xl font-extrabold text-cyan-600">Cài đặt</h1>
            <p className="mt-1 text-sm text-slate-500">Liên kết kênh và thông tin tài khoản.</p>
          </div>
          <button onClick={() => setShowMenu(true)} className="p-2 bg-white rounded-full shadow-sm text-slate-600 border border-slate-200">
            <SettingsIcon size={24} />
          </button>
        </div>

        <GuideVideo url={ov?.settings?.link_guide_video} />

        <Eyebrow className="px-1 font-bold text-slate-500 mt-4">▸ Kênh liên kết</Eyebrow>
        <div className="bg-white/80 rounded-[2rem] p-2 shadow-sm border border-white">
           <ChannelLinkCard platform="youtube" channel={by.youtube} onChanged={reload} />
           <div className="h-px bg-slate-100 mx-4"></div>
           <ChannelLinkCard platform="tiktok" channel={by.tiktok} onChanged={reload} />
        </div>

        <Card className="relative overflow-hidden rounded-[2rem] border-white bg-white/80 p-5 shadow-sm">
          <Eyebrow className="font-bold text-slate-500">▸ Tài khoản</Eyebrow>
          <div className="mt-4">
            <Eyebrow>Email hiện tại</Eyebrow>
            <p className="mt-1 break-all font-mono text-sm text-slate-800 font-semibold">{session?.user?.email}</p>
          </div>
          <div className="mt-4">
            <Eyebrow>Điểm mỗi video được duyệt</Eyebrow>
            <p className="mt-1 font-mono text-sm text-slate-800 font-semibold">100 điểm</p>
          </div>
          <button onClick={signOut} className="mt-6 flex items-center justify-center w-full gap-2 rounded-full border border-rose-200 bg-rose-50 px-5 py-3 text-sm font-bold text-rose-500 shadow-sm transition hover:bg-rose-100">
            <LogOut size={15} /> Đăng xuất
          </button>
        </Card>
      </div>
    </>
  );
               }
