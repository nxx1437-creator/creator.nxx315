import React from "react";
import { Link } from "react-router-dom";
import { 
  ArrowRight, Play, Trophy, Gift, ShieldCheck, Zap, 
  Smartphone, Users, Star, CheckCircle2, ChevronRight 
} from "lucide-react";
import { MAIN_SITE } from "../lib/supabaseClient.js";

export default function Landing() {
  return (
    <div className="min-h-screen bg-[#f4fbf9] font-sans text-slate-800 overflow-x-hidden">
      
      {/* BACKGROUND GRID MỜ */}
      <div className="pointer-events-none fixed inset-0 opacity-[0.03]" style={{ backgroundImage: "linear-gradient(rgba(0,0,0,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,1) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />

      {/* HEADER */}
      <header className="sticky top-0 z-50 border-b border-white/50 bg-[#f4fbf9]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-4">
          <Link to="/" className="text-[20px] font-extrabold tracking-tight text-slate-900">
            Nxx315 <span className="text-cyan-600">Creator</span>
          </Link>
          <div className="flex items-center gap-4">
            <a href={MAIN_SITE} className="hidden sm:block text-sm font-semibold text-slate-600 hover:text-cyan-600 transition">
              Web chính
            </a>
            <Link 
              to="/login" 
              className="rounded-full bg-cyan-600 px-5 py-2.5 text-sm font-bold text-white shadow-md shadow-cyan-600/20 transition hover:bg-cyan-700 active:scale-95"
            >
              Đăng nhập
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative mx-auto max-w-5xl px-5 pt-16 pb-20 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-cyan-700 mb-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          <Star size={14} className="fill-cyan-500 text-cyan-500" /> Chương trình Creator chính thức
        </div>
        
        <h1 className="mx-auto max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-slate-900 sm:text-5xl md:text-6xl animate-in fade-in slide-in-from-bottom-6 duration-700">
          Sáng tạo nội dung.<br />
          Nhận <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-600">thưởng lớn.</span>
        </h1>
        
        <p className="mx-auto mt-6 max-w-2xl text-[15px] leading-relaxed text-slate-600 sm:text-lg animate-in fade-in slide-in-from-bottom-8 duration-700 delay-100">
          Tham gia chương trình Creator của Nxx315 Studio. Quay video giới thiệu, nhận code xu theo hiệu quả video và đua top bảng xếp hạng hàng tháng để nhận tiền mặt.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
          <Link 
            to="/login" 
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-cyan-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-700 hover:-translate-y-0.5"
          >
            Bắt đầu ngay <ArrowRight size={18} />
          </Link>
          <Link 
            to="/login" // Hoặc link tới trang Thể lệ nếu có
            className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border-2 border-slate-200 bg-white px-8 py-4 text-base font-bold text-slate-700 shadow-sm transition hover:bg-slate-50 hover:border-slate-300"
          >
            <Play size={18} className="text-cyan-600" /> Xem thể lệ
          </Link>
        </div>

        {/* SỐ LIỆU NỔI BẬT */}
        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-4 sm:gap-6">
          {[
            { label: "Creator tham gia", value: "1,200+", icon: Users },
            { label: "Video đã duyệt", value: "15,000+", icon: Play },
            { label: "Tổng giải thưởng", value: "50M+", icon: Gift },
            { label: "Tỉ lệ duyệt", value: "98%", icon: CheckCircle2 },
          ].map((item, i) => (
            <div key={i} className="rounded-2xl border border-white bg-white/60 p-4 shadow-sm backdrop-blur-sm">
              <item.icon size={20} className="mx-auto text-cyan-500 mb-2" />
              <p className="text-2xl font-black text-slate-900">{item.value}</p>
              <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TÍNH NĂNG */}
      <section className="relative mx-auto max-w-5xl px-5 py-16">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Tại sao chọn Nxx315 Creator?</h2>
          <p className="mt-2 text-slate-500 text-sm sm:text-base">Nền tảng minh bạch, quy trình rõ ràng, thưởng liền tay.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[
            { 
              icon: Zap, 
              title: "Duyệt video tự động", 
              desc: "Hệ thống bot tự động quét video mới, kiểm tra hashtag và kênh liên kết cực nhanh." 
            },
            { 
              icon: Gift, 
              title: "Thưởng theo hiệu quả", 
              desc: "Video càng nhiều lượt xem, lượt thích, mức thưởng code xu bạn nhận được càng cao." 
            },
            { 
              icon: Trophy, 
              title: "Đua top nhận tiền mặt", 
              desc: "Bảng xếp hạng cập nhật liên tục. Lọt top tháng, nhận ngay phần thưởng tiền mặt giá trị." 
            },
            { 
              icon: ShieldCheck, 
              title: "Minh bạch & An toàn", 
              desc: "Mọi quy trình từ đăng ký, duyệt video đến trả thưởng đều được công khai rõ ràng." 
            },
            { 
              icon: Smartphone, 
              title: "Quản lý mọi lúc mọi nơi", 
              desc: "Giao diện tối ưu cho điện thoại, giúp bạn theo dõi tiến độ và nhận thông báo dễ dàng." 
            },
            { 
              icon: Users, 
              title: "Cộng đồng Creator", 
              desc: "Tham gia Discord giao lưu, học hỏi kinh nghiệm làm video và nhận hỗ trợ trực tiếp từ team." 
            },
          ].map((feature, idx) => (
            <div key={idx} className="group rounded-[2rem] border border-white bg-white p-6 shadow-sm transition hover:shadow-md hover:-translate-y-1 duration-300">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white transition-colors">
                <feature.icon size={24} />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-[13px] leading-relaxed text-slate-500">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* QUY TRÌNH */}
      <section className="relative bg-white py-20">
        <div className="mx-auto max-w-5xl px-5">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">Cách thức hoạt động</h2>
            <p className="mt-2 text-slate-500 text-sm sm:text-base">Chỉ mất 3 bước để bắt đầu nhận thưởng.</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3">
            {[
              { step: "01", title: "Đăng nhập & Liên kết", desc: "Đăng nhập bằng Google, vào Cài đặt để liên kết kênh TikTok hoặc YouTube của bạn." },
              { step: "02", title: "Gửi video giới thiệu", desc: "Sáng tạo video về Nxx315 Studio, nhớ gắn hashtag #Nxx315Studio và gửi link lên web." },
              { step: "03", title: "Chờ duyệt & Nhận thưởng", desc: "Admin duyệt video, điểm tự động cộng vào bảng xếp hạng. Nhận code xu ngay khi duyệt xong." },
            ].map((item, idx) => (
              <div key={idx} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-cyan-50 text-2xl font-black text-cyan-600 border-4 border-white shadow-sm relative z-10">
                  {item.step}
                </div>
                {idx !== 2 && (
                  <div className="absolute top-8 left-1/2 hidden w-full border-t-2 border-dashed border-slate-200 sm:block" />
                )}
                <h3 className="text-base font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-[13px] text-slate-500 px-4">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BOTTOM */}
      <section className="relative mx-auto max-w-4xl px-5 py-20 text-center">
        <div className="rounded-[3rem] border border-cyan-100 bg-gradient-to-br from-cyan-50 to-blue-50 p-10 shadow-xl shadow-cyan-900/5">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl mb-4">Sẵn sàng trở thành Creator?</h2>
          <p className="text-slate-600 mb-8 max-w-lg mx-auto text-sm sm:text-base">
            Đừng bỏ lỡ cơ hội kiếm thêm thu nhập từ niềm đam mê sáng tạo nội dung. Tham gia ngay hôm nay!
          </p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 rounded-full bg-cyan-600 px-8 py-4 text-base font-bold text-white shadow-lg shadow-cyan-600/30 transition hover:bg-cyan-700 hover:scale-105"
          >
            Đăng nhập bằng Google <ArrowRight size={18} />
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="mx-auto max-w-5xl px-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <p className="text-[17px] font-extrabold text-slate-900">
              Nxx315 <span className="text-cyan-600">Creator</span>
            </p>
            <p className="text-[12px] text-slate-500 mt-1">Nền tảng dành cho những nhà sáng tạo nội dung.</p>
          </div>
          <div className="flex items-center gap-6 text-sm font-semibold text-slate-600">
            <a href={MAIN_SITE} className="hover:text-cyan-600 transition">Web chính</a>
            <a href="https://discord.gg/your-invite-link" target="_blank" rel="noreferrer" className="hover:text-cyan-600 transition">Discord</a>
            <Link to="/login" className="hover:text-cyan-600 transition">Đăng nhập</Link>
          </div>
        </div>
      </footer>
    </div>
  );
        }
