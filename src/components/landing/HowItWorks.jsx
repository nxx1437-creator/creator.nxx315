import React from "react";
import { Link2, Video, Gift } from "lucide-react";
import { SectionTitle, GlassCard } from "./ui.jsx";

const STEPS = [
  {
    Icon: Link2,
    title: "Liên kết kênh của bạn",
    text: "Dán link kênh TikTok hoặc YouTube. Hệ thống kiểm tra kênh có thật và lấy ảnh đại diện, bạn không phải cấp thêm quyền gì.",
  },
  {
    Icon: Video,
    title: "Đăng video kèm hashtag",
    text: "Quay video giới thiệu Nxx315 Studio theo phong cách của bạn, gắn hashtag bắt buộc. Kênh YouTube được quét tự động, TikTok thì dán link video.",
  },
  {
    Icon: Gift,
    title: "Admin duyệt, nhận code xu",
    text: "Mỗi video được xem tay. Đạt yêu cầu thì code xu hiện ngay trong lịch sử, nhập ở Ví trên Nxx315 Studio là nhận xu.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cach-lam" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-14">
      <SectionTitle
        eyebrow="Cách làm"
        title="Ba bước, gọn nhẹ"
        sub="Không cần đăng ký phức tạp. Liên kết kênh một lần, sau đó chỉ việc làm video."
      />
      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {STEPS.map(({ Icon, title, text }, i) => (
          <GlassCard key={title} className="relative overflow-hidden p-6">
            <span className="pointer-events-none absolute -right-2 -top-4 text-8xl font-black text-white/[0.04]">
              {i + 1}
            </span>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-blue-600 text-white">
              <Icon size={22} />
            </span>
            <h3 className="mt-5 text-lg font-bold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{text}</p>
          </GlassCard>
        ))}
      </div>
    </section>
  );
}
