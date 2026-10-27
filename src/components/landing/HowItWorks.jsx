import React from "react";
import { Link2, Video, ShieldCheck } from "lucide-react";
import { SectionTitle, GlassCard, INK } from "./theme.jsx";

const STEPS = [
  {
    id: "OP · 01",
    Icon: Link2,
    title: "Kết nối kênh mạng xã hội",
    text: "Dán link kênh TikTok hoặc YouTube của bạn. Hệ thống AI sẽ tự động nhận diện trong 30s, bạn giữ toàn quyền kiểm soát kênh của mình.",
  },
  {
    id: "OP · 02",
    Icon: Video,
    title: "Sáng tạo Clip & Trải nghiệm",
    text: "Quay video review, đánh giá độ mượt mà của Nxx315 Studio. Đăng tải kèm các hashtag bắt buộc để hệ thống tự động theo dõi lượt xem.",
  },
  {
    id: "OP · 03",
    Icon: ShieldCheck,
    title: "Duyệt nội dung & Nhận thưởng",
    text: "Đội ngũ Admin duyệt thủ công. Video đạt chuẩn sẽ được cộng ngay Gift Code. Đua top Bảng Xếp Hạng để nhận tiền mặt mỗi tháng.",
  },
];

export default function HowItWorks() {
  return (
    <section id="cach-lam" className="mx-auto max-w-6xl scroll-mt-20 px-4 py-16">
      <SectionTitle
        eyebrow="Hành trình Creator"
        title="Ba bước để cày rank"
        sub="Quy trình tinh gọn, minh bạch và không giới hạn số lượng video."
      />
      <div className="relative mt-12 grid gap-5 md:grid-cols-3">
        <div className="absolute left-[16%] right-[16%] top-14 hidden h-px bg-gradient-to-r from-transparent via-emerald-500/40 to-transparent md:block" />
        {STEPS.map(({ id, Icon, title, text }) => (
          <GlassCard key={id} className="group relative overflow-hidden p-6 transition hover:-translate-y-1.5">
            <div className="flex items-center gap-3">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400 to-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                <Icon size={26} />
              </span>
              <span className="font-mono text-xs font-bold tracking-[0.2em] text-emerald-700">{id}</span>
            </div>
            <h3 className={`mt-5 text-xl font-extrabold ${INK}`}>{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{text}</p>
            <span className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-cyan-400 to-emerald-500" />
          </GlassCard>
        ))}
      </div>
    </section>
  );
}

