import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Play, Trophy, Gift, ShieldCheck, Zap, 
  Smartphone, Users, CheckCircle2, Globe, LogIn, Link as LinkIcon, 
  Rocket, MessageSquare, Flame
} from "lucide-react";
import { MAIN_SITE } from "../lib/supabaseClient.js";

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#e6f7f2] via-[#f4fbf9] to-[#e6f7f2] font-sans text-slate-800 overflow-x-hidden">
      
      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/40 bg-[#e6f7f2]/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-3">
          <div className="flex items-center gap-2 text-[20px] font-extrabold tracking-tight text-slate-900">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-500">
              <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
            </svg>
            CloudPhone
          </div>
          <div className="flex items-center gap-4">
            <a href={MAIN_SITE} className="hidden sm:flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-emerald-600 transition">
              <Globe size={18} /> Web chính
            </a>
            <Link 
              to="/login" 
              className="flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-emerald-500/20 transition hover:bg-emerald-600 active:scale-95"
            >
              <LogIn size={16} /> Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-4xl px-5 pt-12 pb-16">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-[#d1f0e5] px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-6">
          <Flame size={12} className="fill-emerald-500 text-emerald-500" /> Sân chơi dành riêng cho Gaming Creator
        </div>
        
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl mb-6">
          Chơi game. Quay clip.<br />
          Biến view thành <span className="text-emerald-500">phần thưởng.</span>
        </h1>
        
        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 mb-6">
          Dành cho các <strong>Gamer và Creator</strong> hệ Roblox, Free Fire, Genshin... Làm video review/trải nghiệm game trên CloudPhone kèm hashtag:
        </p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          <span className="rounded-full border border-emerald-300 bg-emerald-100/50 px-3 py-1 text-sm font-bold text-emerald-700">#cloudphone</span>
          <span className="rounded-full border border-emerald-300 bg-emerald-100/50 px-3 py-1 text-sm font-bold text-emerald-700">#cloudgaming</span>
        </div>

        <p className="max-w-2xl text-[15px] leading-relaxed text-slate-600 mb-10">
          Lên TikTok/YouTube để nhận ngay <strong>dùng VIP</strong> và <strong>tiền mặt cực khủng</strong> mỗi tháng. Clip chất lượng + View càng cao = Thưởng nặng!
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link 
            to="/login" 
            className="flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-8 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 hover:-translate-y-0.5"
          >
            <Rocket size={20} /> Gia nhập Biệt Đội <ArrowRight size={18} />
          </Link>
          <Link 
            to="/login"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-emerald-200 bg-white px-8 py-4 text-base font-bold text-emerald-700 shadow-sm transition hover:bg-emerald-50"
          >
            <Trophy size={18} className="text-amber-500" /> Xem Bảng Xếp Hạng
          </Link>
        </div>
      </section>

      {/* SỐ LIỆU CHIẾN DỊCH */}
      <section className="mx-auto max-w-4xl px-5 pb-16">
        <div className="rounded-[2rem] border border-white bg-white/60 p-6 shadow-sm backdrop-blur-sm">
          <div className="flex items-center justify-between mb-6">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
               <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span> CHIẾN DỊCH ĐANG DIỄN RA
            </span>
          </div>
          
          <div className="grid grid-cols-3 gap-2 mb-8 divide-x divide-slate-200">
            <div className="text-center px-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Người chơi</p>
              <p className="text-xl font-black text-slate-800">8.2K</p>
            </div>
            <div className="text-center px-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Video</p>
              <p className="text-xl font-black text-slate-800">11.3K</p>
            </div>
            <div className="text-center px-1">
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Giải thưởng</p>
              <p className="text-xl font-black text-emerald-500 leading-none">1.8Mđ<br/><span className="text-sm">+900h</span></p>
            </div>
          </div>

          <div className="h-px w-full bg-slate-200 mb-6"></div>

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-1">Chiến dịch đang diễn ra</p>
          <h2 className="text-2xl font-black text-slate-900 mb-4">Tháng 10 2026</h2>
          
          <div className="grid grid-cols-2 gap-3">
             <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4">
                <p className="text-[10px] font-bold text-emerald-600 uppercase mb-1 flex items-center gap-1"><ClockIcon/> Kết thúc sau</p>
                <p className="text-lg font-black text-slate-800">6 ngày</p>
             </div>
             <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-4">
                <p className="text-[10px] font-bold text-amber-600 uppercase mb-1 flex items-center gap-1"><Gift size={12}/> Giải nhất</p>
                <p className="text-lg font-black text-amber-600 leading-tight">700Kđ<br/>+150h</p>
             </div>
          </div>
        </div>
      </section>

      {/* VÌ SAO CHỌN (TÍNH NĂNG) */}
      <section className="relative bg-white py-16">
        <div className="mx-auto max-w-4xl px-5">
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">— VÌ SAO PRO PLAYER CHỌN CLOUDPHONE?</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-8">Hệ sinh thái dành riêng cho Gaming Creator</h2>

          <div className="space-y-4">
            {[
              { icon: Zap, title: "Cloud Phone cấu hình khủng", desc: "Mỗi clip đạt chuẩn = nhận ngay ngày dùng Cloud Phone VIP. Treo game Roblox, cắm acc Free Fire 24/7 không hao pin, không nóng máy." },
              { icon: Gift, title: "Phần thưởng tiền mặt hàng tháng", desc: "Top Creator có lượt view + tương tác khủng nhất sẽ nhận thưởng thẳng vào tài khoản ngân hàng hoặc MoMo. Leo rank nhận tiền thật." },
              { icon: ShieldCheck, title: "Hệ thống AI & Admin kiểm duyệt", desc: "Bot AI tự động quét kênh và cập nhật view/tương tác 24/7. Admin duyệt thủ công 100% video để chặn spam." },
              { icon: CheckCircle2, title: "Leaderboard minh bạch", desc: "Hệ thống lọc view ảo, bot like bằng thuật toán cực gắt. Đảm bảo sân chơi công bằng cho các creator chân chính." },
            ].map((item, idx) => (
              <div key={idx} className="rounded-[2rem] border border-slate-100 bg-[#f4fbf9] p-6 flex flex-col sm:flex-row gap-4 items-start">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-md">
                  <item.icon size={26} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUY TRÌNH 3 BƯỚC */}
      <section className="relative mx-auto max-w-4xl px-5 py-16 text-center">
        <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-500 mb-2">— HÀNH TRÌNH CREATOR</p>
        <h2 className="text-3xl font-extrabold text-slate-900 mb-10">Ba bước để cày rank & lượm lúa</h2>

        <div className="space-y-4 text-left">
          {[
            { step: "01", icon: LinkIcon, title: "Gắn kênh TikTok/YouTube", desc: "Kết nối nhanh kênh của bạn. Chỉ mất 30s để hệ thống AI nhận diện, không cần cấp quyền rườm rà." },
            { step: "02", icon: Play, title: "Làm Clip Review & Trải Nghiệm", desc: "Quay video giới thiệu CloudPhone, test độ mượt khi chơi game... Đăng kèm hashtag để bot tự động track view." },
            { step: "03", icon: Gift, title: "Chờ duyệt & Lượm lúa", desc: "Admin duyệt nội dung video thủ công. Clip đạt chuẩn = cộng ngay giờ dùng Cloud Phone. Đua top nhận tiền mặt." },
          ].map((item, idx) => (
            <div key={idx} className="relative rounded-[2rem] border border-white bg-white p-6 shadow-sm">
              <div className="flex flex-col sm:flex-row items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-emerald-500 text-white shadow-sm relative">
                  <item.icon size={22} />
                </div>
                <div>
                  <p className="font-mono text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-1">OP . {item.step}</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
                  <p className="text-[14px] leading-relaxed text-slate-600">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="relative mx-auto max-w-4xl px-5 pb-20">
        <div className="relative overflow-hidden rounded-[2.5rem] border border-emerald-200 bg-gradient-to-br from-[#d1f0e5] to-[#e6f7f2] p-8 sm:p-12 text-center shadow-xl shadow-emerald-900/5">
          <div className="mx-auto mb-4 h-16 w-16 bg-white rounded-2xl flex items-center justify-center shadow-md">
             <Trophy className="text-amber-500" size={32} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-emerald-700 mb-2">🏆 CHINH PHỤC ĐỈNH CAO</p>
          <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Sẵn sàng lên sóng?</h2>
          <p className="text-slate-600 mb-8 max-w-md mx-auto text-[15px]">
            Tham gia cộng đồng Gaming Creator mạnh nhất. Đăng ký miễn phí. Không giới hạn số video. Khẳng định đẳng cấp ngay hôm nay.
          </p>
          <div className="flex flex-col items-center gap-3 w-full max-w-xs mx-auto">
            <Link 
              to="/login" 
              className="flex w-full items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-4 text-base font-bold text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-600 hover:-translate-y-0.5"
            >
              <Rocket size={20} /> Gia nhập ngay <ArrowRight size={18} />
            </Link>
            <Link 
              to="/login"
              className="flex w-full items-center justify-center gap-2 rounded-full border-2 border-white bg-white/50 px-6 py-4 text-base font-bold text-emerald-800 shadow-sm transition hover:bg-white"
            >
              <LogIn size={20} /> Đăng nhập
            </Link>
          </div>
          
          <div className="mt-8 flex items-center justify-center gap-2 text-[11px] font-bold text-emerald-800/60 uppercase tracking-widest">
            <MessageSquare size={14} /> THAM GIA DISCORD TRƯỚC
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-emerald-200/50 bg-[#e6f7f2] py-8">
        <div className="mx-auto max-w-4xl px-5 text-center">
          <p className="text-[12px] font-semibold text-slate-500">
            © CloudPhone · Chương trình Creator
          </p>
        </div>
      </footer>
    </div>
  );
}

// Component phụ cho icon đồng hồ
function ClockIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
}
